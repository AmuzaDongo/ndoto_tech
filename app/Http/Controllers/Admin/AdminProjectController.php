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
            ->paginate(15)
            ->withQueryString();

        $clients = Client::select('id', 'name')->orderBy('name')->get();
        $services = Service::select('id', 'title')->orderBy('title')->get();

        return Inertia::render('admin/Projects/Index', [
            'projects' => $projects,
            'clients'  => $clients,
            'services' => $services,
            'filters'  => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'client_id'      => 'required|exists:clients,id',
            'service_id'     => 'required|exists:services,id',
            'description'    => 'required|string',
            'challenge'      => 'nullable|string',
            'solution'       => 'nullable|string',
            'results'        => 'nullable|array', 
            'tags'           => 'nullable|array',
            'image'          => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'         => 'required|in:Planning,In Progress,Review,Testing,Deployment,Completed,On Hold,Cancelled',
            'stage'          => 'nullable|in:Discovery,Design,Development,Testing,Deployment,Maintenance',
            'progress'       => 'integer|min:0|max:100',
            'start_date'     => 'nullable|date',
            'end_date'       => 'nullable|date|after_or_equal:start_date',
            'budget'         => 'nullable|numeric|min:0',
        ]);

        if (!isset($validated['tags'])) {
            $validated['tags'] = [];
        }

        Project::create($validated);

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project created successfully.');
    }


    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'client_id'      => 'required|exists:clients,id',
            'service_id'     => 'required|exists:services,id',
            'description'    => 'required|string',
            'challenge'      => 'nullable|string',
            'solution'       => 'nullable|string',
            'results'        => 'nullable|array',
            'tags'           => 'nullable|array', 
            'image'          => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status'         => 'required|in:Planning,In Progress,Review,Testing,Deployment,Completed,On Hold,Cancelled',
            'stage'          => 'nullable|in:Discovery,Design,Development,Testing,Deployment,Maintenance',
            'progress'       => 'integer|min:0|max:100',
            'start_date'     => 'nullable|date',
            'end_date'       => 'nullable|date|after_or_equal:start_date',
            'budget'         => 'nullable|numeric|min:0',
        ]);

        if (!isset($validated['tags'])) {
            $validated['tags'] = [];
        }

        $project->update($validated);

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }


    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()
            ->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}