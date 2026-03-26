<?php

namespace App\Http\Controllers;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index() {
        $projects = Project::with(['client:id,name', 'service:id,title', 'owner:id,name'])
            ->select('id', 'title', 'slug', 'status', 'stage', 'progress', 'image', 'client_id', 'service_id', 'project_owner_id')
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function show(Project $project)
    {
        $project->load([
            'client:id,name,logo,industry',
            'service:id,title,slug',
            'owner:id,name,email'
        ]);

        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }
}
