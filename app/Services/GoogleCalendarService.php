<?php

namespace App\Services;
use Google_Client;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;

class GoogleCalendarService
{
    public function createEvent($consultation)
    {
        $client = new \Google_Client();
        $client->setAuthConfig(storage_path('google-calendar.json'));

        $service = new \Google_Service_Calendar($client);

        $event = new \Google_Service_Calendar_Event([
            'summary' => 'Consultation with '.$consultation->name,
            'description' => $consultation->message,
            'start' => [
                'dateTime' => $consultation->preferred_date,
            ],
            'end' => [
                'dateTime' => now()->addHour(),
            ],
        ]);

        $service->events->insert('primary', $event);
    }
}