<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('contact/index', []);
    }

    public function send(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'subject' => 'required|string|max:200',
            'message' => 'required|string'
        ]);

        ContactMessage::create($data);

        Mail::raw($data['message'], function ($message) use ($data) {
            $message->to(env('CONTACT_RECEIVER_EMAIL'))
                ->subject($data['subject'])
                ->replyTo($data['email'], $data['name']);
        });

        return back()->with('success', 'Message sent successfully');
    }

    public function show($id)
    {
        $message = ContactMessage::findOrFail($id);

        if ($message->status === 'unread') {
            $message->update([
                'status' => 'read'
            ]);
        }

        return Inertia::render('admin/messages/show', [
            'message' => $message
        ]);
    }
}
