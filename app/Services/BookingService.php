<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\ConsultationSlot;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BookingService
{
    public function createBooking(array $data)
    {
        return DB::transaction(function () use ($data) {

            // 1. Verify the slot exists and is still available
            $slot = ConsultationSlot::where('id', $data['slot_id'])
                                    ->where('professional_id', $data['professional_id'])
                                    ->where('status', 'available')
                                    ->firstOrFail();

            // 2. Check for any overlapping confirmed bookings (extra safety)
            $isAvailable = ConsultationSlot::isTimeAvailable(
                $data['professional_id'], 
                $data['start_time'], 
                $data['end_time']
            );

            if (!$isAvailable) {
                throw new \Exception('This time slot is no longer available.');
            }

            // 3. Get service details
            $service = Service::findOrFail($data['service_id']);

            // 4. Create the booking
            $booking = Booking::create([
                'client_id'       => $data['client_id'] ?? null,
                'professional_id' => $data['professional_id'],
                'service_id'      => $data['service_id'],
                'start_time'      => $data['start_time'],
                'end_time'        => $data['end_time'],
                'status'          => 'pending',           // or 'confirmed' depending on your flow
                'price'           => $data['price'] ?? $service->base_price,
                'currency'        => $data['currency'] ?? $service->currency ?? 'USD',
                
                // Guest details (for non-registered users)
                'guest_name'      => $data['guest_name'] ?? null,
                'guest_email'     => $data['guest_email'] ?? null,
                'guest_company'   => $data['guest_company'] ?? null,
                
                'client_notes'    => $data['client_notes'] ?? null,
            ]);

            // 5. Update the slot
            $slot->update([
                'status'     => 'booked',
                'booking_id' => $booking->id,
            ]);

            // Optional: Send confirmation emails, create calendar event, etc.

            return $booking;
        });
    }
}