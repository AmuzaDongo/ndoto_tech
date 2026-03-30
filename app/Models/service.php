<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'approach',
        'features',
        'benefits',
        'technologies',
        'faq',
    ];

    protected $casts = [
        'approach'     => 'array',
        'features'     => 'array',
        'benefits'     => 'array',
        'technologies' => 'array',
        'faq'          => 'array',
    ];

    protected $appends = ['image_url'];

    protected static function booted()
    {
        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->title);
            }
        });

        static::updating(function ($service) {
            if ($service->isDirty('title') && empty($service->slug)) {
                $service->slug = Str::slug($service->title);
            }
        });
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function setImageAttribute($value)
    {
        if ($value instanceof UploadedFile) {

            if ($this->image && Storage::disk('public')->exists($this->image)) {
                Storage::disk('public')->delete($this->image);
            }

            $filename = time() . '_' . Str::slug($this->title) . '.' . $value->getClientOriginalExtension();

            $path = $value->storeAs('services/images', $filename, 'public');

            $this->attributes['image'] = $path;
        } 
        elseif (is_string($value)) {
            $this->attributes['image'] = $value;
        }
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image
            ? asset('storage/' . $this->image)
            : null;
    }
}