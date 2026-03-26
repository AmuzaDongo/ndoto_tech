<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

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

    protected static function booted()
    {
        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });

        static::updating(function ($project) {
            if ($project->isDirty('title') && empty($project->slug)) {
                $project->slug = Str::slug($project->title);
            }
        });
    }

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

    public function setImageAttribute($value)
    {
        if ($value instanceof UploadedFile) {
            if ($this->image && file_exists(public_path('storage/' . $this->image))) {
                unlink(public_path('storage/' . $this->image));
            }

            $filename = time() . '_' . Str::slug($this->title) . '.' . $value->getClientOriginalExtension();
            $value->storeAs('projects/images', $filename, 'public');
            
            $this->attributes['image'] = 'projects/images/' . $filename;
        } 
        elseif (is_string($value)) {
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