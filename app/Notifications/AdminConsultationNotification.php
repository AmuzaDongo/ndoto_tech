<?php

namespace App\Notifications;

use App\Models\Consultation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class AdminConsultationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $consultation;

    public $tries = 3;
    public $timeout = 120;

    public function __construct(Consultation $consultation)
    {
        $this->consultation = $consultation;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Consultation Request')
            ->greeting('New Consultation Booking')
            ->line('A new consultation request has been submitted.')
            ->line('Name: ' . $this->consultation->name)
            ->line('Email: ' . $this->consultation->email)
            ->line('Phone: ' . $this->consultation->phone)
            ->line('Company: ' . ($this->consultation->company ?? 'N/A'))
            ->line('Service: ' . $this->consultation->service)
            ->line('Budget: ' . ($this->consultation->budget ?? 'N/A'))
            ->line('Consultation Date: ' . $this->consultation->preferred_date)
            ->line('Message: ' . $this->consultation->message)
            ->action('View Dashboard', url('/admin/consultations'))
            ->line('Please follow up with the client as soon as possible.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'consultation_id' => $this->consultation->id,
            'name' => $this->consultation->name,
            'email' => $this->consultation->email,
        ];
    }
}