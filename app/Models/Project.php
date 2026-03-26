<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_id', 
        'client_id',
        'title',
        'slug',
        'tags',
        'description',
        'challenge',
        'solution',
        'results',
        'status',
        'stage',
        'progress',
        'project_owner_id',
        'image',
        'year',
        'start_date',
        'end_date',
        'budget',
        'actual_cost',
    ];

    protected $casts = [
        'tags'          => 'array',
        'results'       => 'array',
        'start_date'    => 'date',
        'end_date'      => 'date',
        'budget'        => 'decimal:2',
        'actual_cost'   => 'decimal:2',
        'progress'      => 'integer',
    ];

    // Relationships
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'project_owner_id');
    }
}