<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service_id',
        'budget',
        'preferred_date',
        'message',
        'status'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function booking()
    {
        return $this->hasOne(Booking::class, 'consultation_id');
    }
}
