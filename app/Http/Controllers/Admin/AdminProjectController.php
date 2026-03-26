<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Client;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::with(['client:id,name', 'service:id,title', 'owner:id,name'])
        ->latest()
        ->paginate(15);

        $clients = Client::select('id', 'name')->orderBy('name')->get();
        $services = Service::select('id', 'title')->orderBy('title')->get();

        return Inertia::render('admin/Projects/Index', [
            'projects' => $projects,
            'clients'  => $clients,
            'services' => $services,
            'filters'  => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Display a single project
     */
    public function show(Project $project)
    {
        $project->load([
            'client:id,name,industry,logo',
            'service:id,title,slug',
            'owner:id,name,email'
        ]);

        return Inertia::render('Admin/Projects/Show', [
            'project' => $project
        ]);
    }

    /**
     * Show the form for creating a new project
     */
    public function create()
    {
        return Inertia::render('Admin/Projects/Create', [
            'clients' => \App\Models\Client::select('id', 'name')->get(),
            'services' => \App\Models\Service::select('id', 'title')->get(),
        ]);
    }

    /**
     * Store a newly created project
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'client_id'      => 'required|exists:clients,id',
            'service_id'     => 'required|exists:services,id',
            'description'    => 'required|string',
            'challenge'      => 'nullable|string',
            'solution'       => 'nullable|string',
            'status'         => 'required|in:Planning,In Progress,Review,Testing,Deployment,Completed,On Hold,Cancelled',
            'stage'          => 'nullable|in:Discovery,Design,Development,Testing,Deployment,Maintenance',
            'progress'       => 'integer|min:0|max:100',
            'start_date'     => 'nullable|date',
            'end_date'       => 'nullable|date|after_or_equal:start_date',
            'budget'         => 'nullable|numeric|min:0',
        ]);

        $project = Project::create($validated);

        return redirect()->route('admin.projects.index')
                         ->with('success', 'Project created successfully.');
    }

    // You can add edit(), update(), destroy() later
}