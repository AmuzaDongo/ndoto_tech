<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConsultationSlot extends Model
{
    use HasFactory;

    protected $table = 'consultation_slots';

    protected $fillable = [
        'professional_id',
        'start_time',
        'end_time',
        'status',
        'booking_id',
        'duration_minutes',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];


    public static function getAvailableSlots($professionalId, $date = null)
    {
        $query = self::where('professional_id', $professionalId)
                    ->where('status', 'available')
                    ->where('start_time', '>=', now());

        if ($date) {
            $query->whereDate('start_time', $date);
        }

        return $query->orderBy('start_time')->get();
    }

    public static function isTimeAvailable($professionalId, $startTime, $endTime)
    {
        return !self::where('professional_id', $professionalId)
                    ->where('status', '!=', 'cancelled')  // ignore cancelled slots
                    ->where(function ($query) use ($startTime, $endTime) {
                        $query->whereBetween('start_time', [$startTime, $endTime])
                            ->orWhereBetween('end_time', [$startTime, $endTime])
                            ->orWhere(function ($q) use ($startTime, $endTime) {
                                $q->where('start_time', '<', $startTime)
                                    ->where('end_time', '>', $endTime);
                            });
                    })
                    ->exists();
    }

    // Relationships
    public function professional(): BelongsTo
    {
        return $this->belongsTo(User::class, 'professional_id');
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    // Scopes
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeForProfessional($query, $professionalId)
    {
        return $query->where('professional_id', $professionalId);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>', now());
    }
}