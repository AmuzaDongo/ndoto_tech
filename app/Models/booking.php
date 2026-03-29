<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'professional_id',
        'service_id',
        'start_time',
        'end_time',
        'status',
        'price',
        'currency',
        'guest_name',
        'guest_email',
        'guest_company',
        'client_notes',
        'internal_notes',
        'meeting_link',
        'meeting_password',
        'cancelled_at',
        'cancellation_reason',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'cancelled_at' => 'datetime',
        'price' => 'decimal:2',
    ];

    // Relationships
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function professional(): BelongsTo
    {
        return $this->belongsTo(User::class, 'professional_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function consultation(): BelongsTo   // if it came from an inquiry
    {
        return $this->belongsTo(Consultation::class, 'consultation_id');
    }

    // Helper Scopes
    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>', now());
    }

    public function scopeForProfessional($query, $professionalId)
    {
        return $query->where('professional_id', $professionalId);
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }
}