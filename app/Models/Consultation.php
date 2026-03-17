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
        'service',
        'budget',
        'preferred_date',
        'message',
        'status'
    ];
}
