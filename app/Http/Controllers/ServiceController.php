<?php

namespace App\Http\Controllers;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
       $services = Service::select('id', 'title', 'slug', 'description', 'image')
            ->orderBy('title')
            ->get();

        return Inertia::render('Services/Index', [
            'services' => $services
        ]);
    }

    public function show(Service $service)
    {
        $service->load('projects:id,title,slug,image,client_id');

        return Inertia::render('Services/Show', [
            'service' => $service
        ]);
    }
}
