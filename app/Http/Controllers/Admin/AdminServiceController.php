<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminServiceController extends Controller
{
    public function index()
    {
        $services = Service::withCount('projects')
            ->latest()
            ->get();

        return Inertia::render('admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Services/Index', [
            'services' => Service::withCount('projects')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'approach'     => json_decode($request->approach, true),
            'features'     => json_decode($request->features, true),
            'benefits'     => json_decode($request->benefits, true),
            'technologies' => json_decode($request->technologies, true),
            'faq'          => json_decode($request->faq, true),
        ]);

        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string|max:500',
            'content'      => 'required|string',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',

            'approach'     => 'nullable|array',
            'features'     => 'nullable|array',
            'benefits'     => 'required|array|min:1',
            'technologies' => 'nullable|array',
            'faq'          => 'nullable|array',
        ]);


        $service = Service::create($validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function show(Service $service)
    {
        $service->load('projects');

        return Inertia::render('admin/Services/Index', [
            'services' => Service::withCount('projects')->latest()->get(),
            'serviceToShow' => $service,
        ]);
    }

    public function edit(Service $service)
    {
        return Inertia::render('admin/Services/Index', [
            'services' => Service::withCount('projects')->latest()->get(),
            'serviceToEdit' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $request->merge([
            'approach'     => json_decode($request->approach, true),
            'features'     => json_decode($request->features, true),
            'benefits'     => json_decode($request->benefits, true),
            'technologies' => json_decode($request->technologies, true),
            'faq'          => json_decode($request->faq, true),
        ]);

        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string|max:500',
            'content'      => 'required|string',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',

            'approach'     => 'nullable|array',
            'features'     => 'nullable|array',
            'benefits'     => 'required|array|min:1',
            'technologies' => 'nullable|array',
            'faq'          => 'nullable|array',
        ]);

        $service->update($validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }


    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}