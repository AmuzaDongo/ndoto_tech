<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsultationSlot extends Model
{
    protected $fillable = [
        'start_time',
        'end_time',
        'is_booked'
    ];
}
