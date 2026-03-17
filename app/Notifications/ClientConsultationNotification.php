<?php

namespace App\Notifications;

use App\Models\Consultation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Contracts\Queue\ShouldQueue; // <-- semicolon added

class ClientConsultationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $consultation;

    public function __construct(Consultation $consultation)
    {
        $this->consultation = $consultation;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Consultation Request Received')
            ->greeting('Hello ' . $this->consultation->name)
            ->line('Your consultation request has been received.')
            ->line('Service: ' . $this->consultation->service)
            ->line('Scheduled Date: ' . $this->consultation->preferred_date)
            ->line('Our team will contact you shortly.')
            ->line('Thank you for choosing us.');
    }
}