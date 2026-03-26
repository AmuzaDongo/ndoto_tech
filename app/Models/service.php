<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

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

    public function setImageAttribute($value)
    {
        if ($value instanceof UploadedFile) {
            if ($this->image && file_exists(public_path('storage/' . $this->image))) {
                unlink(public_path('storage/' . $this->image));
            }

            $filename = time() . '_' . Str::slug($this->title) . '.' . $value->getClientOriginalExtension();
            $value->storeAs('services', $filename, 'public');
            
            $this->attributes['image'] = 'services/' . $filename;
        } elseif (is_string($value)) {
            $this->attributes['image'] = $value;
        }
    }

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/' . $this->image);
    }
}