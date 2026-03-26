<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

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
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}