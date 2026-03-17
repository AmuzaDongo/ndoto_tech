<?php

namespace App\Services;

use App\Models\Consultation;
use App\Models\ConsultationSlot;
use App\Notifications\ClientConsultationNotification;
use App\Notifications\AdminConsultationNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use App\Services\GoogleCalendarService;

class ConsultationService
{
    public function __construct(
        protected GoogleCalendarService $calendar
    ) {}

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {

            // Lock slot to prevent double booking
            $slot = ConsultationSlot::lockForUpdate()
                ->findOrFail($data['consultation_slot_id']);

            if ($slot->is_booked) {
                throw new \Exception('This time slot has already been booked.');
            }

            $consultation = Consultation::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'company' => $data['company'] ?? null,
                'service' => $data['service'],
                'budget' => $data['budget'] ?? null,
                'message' => $data['message'],
                'preferred_date' => $slot->start_time,
                'consultation_slot_id' => $slot->id,
            ]);

            $slot->update([
                'is_booked' => true
            ]);

            // Notification::route('mail', $consultation->email)
            //     ->notify(new ClientConsultationNotification($consultation));

            // Notification::route('mail', config('mail.admin_address'))
            //     ->notify(new AdminConsultationNotification($consultation));
            DB::afterCommit(function () use ($consultation) {
                Notification::route('mail', $consultation->email)
                    ->notify(new ClientConsultationNotification($consultation));

                Notification::route('mail', config('mail.admin_address'))
                    ->notify(new AdminConsultationNotification($consultation));
            });

            $this->calendar->createEvent($consultation);

            return $consultation;


            
        });
    }
}