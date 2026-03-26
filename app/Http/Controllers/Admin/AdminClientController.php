<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminClientController extends Controller
{
    public function index()
    {
        $clients = Client::withCount('projects')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/Clients/Index', [
            'clients' => $clients,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Clients/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'industry'        => 'nullable|string|max:100',
            'logo'            => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'website'         => 'nullable|url',
            'email'           => 'nullable|email',
            'phone'           => 'nullable|string|max:20',
            'address'         => 'nullable|string',
            'description'     => 'nullable|string',
            'contact_person'  => 'nullable|string|max:255',
            'contact_email'   => 'nullable|email',
            'contact_phone'   => 'nullable|string|max:20',
            'tags'            => 'nullable|array',
        ]);

        Client::create($validated);

        return redirect()
            ->route('admin.clients.index')
            ->with('success', 'Client created successfully.');
    }

    public function show(Client $client)
    {
        $client->load([
            'projects' => function ($query) {
                $query->select('id', 'title', 'slug', 'status', 'progress', 'image', 'service_id')
                      ->with('service:id,title');
            }
        ]);

        return Inertia::render('admin/Clients/Show', [
            'client' => $client,
        ]);
    }

    public function edit(Client $client)
    {
        return Inertia::render('admin/Clients/Edit', [
            'client' => $client,
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'industry'        => 'nullable|string|max:100',
            'logo'            => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'website'         => 'nullable|url',
            'email'           => 'nullable|email',
            'phone'           => 'nullable|string|max:20',
            'address'         => 'nullable|string',
            'description'     => 'nullable|string',
            'contact_person'  => 'nullable|string|max:255',
            'contact_email'   => 'nullable|email',
            'contact_phone'   => 'nullable|string|max:20',
            'tags'            => 'nullable|array',
        ]);

        $client->update($validated);

        return redirect()
            ->route('admin.clients.index')
            ->with('success', 'Client updated successfully.');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()
            ->route('admin.clients.index')
            ->with('success', 'Client deleted successfully.');
    }
}