<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'industry',
        'logo',              
        'website',
        'email',
        'phone',
        'address',
        'description',
        'contact_person',
        'contact_email',
        'contact_phone',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($client) {
            if (empty($client->slug)) {
                $client->slug = Str::slug($client->name);
            }
        });

        static::updating(function ($client) {
            if ($client->isDirty('name') && empty($client->slug)) {
                $client->slug = Str::slug($client->name);
            }
        });
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function setLogoAttribute($value)
    {
        if ($value instanceof UploadedFile) {
            if ($this->logo && file_exists(public_path('storage/' . $this->logo))) {
                unlink(public_path('storage/' . $this->logo));
            }

            $filename = time() . '_' . Str::slug($this->name) . '.' . $value->getClientOriginalExtension();
            $value->storeAs('clients/logos', $filename, 'public');
            
            $this->attributes['logo'] = 'clients/logos/' . $filename;
        } 
        elseif (is_string($value)) {
            $this->attributes['logo'] = $value;
        }
    }

    public function getLogoUrlAttribute(): ?string
    {
        if (!$this->logo) {
            return null;
        }

        return asset('storage/' . $this->logo);
    }
}