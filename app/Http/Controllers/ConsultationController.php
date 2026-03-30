<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Service;
use App\Http\Requests\StoreConsultationRequest;
use App\Services\ConsultationService;

class ConsultationController extends Controller
{
    public function __construct(
        protected ConsultationService $service
    ) {}

    public function index()
    {
        return Inertia::render('consultation/index', [
            'services' => Service::select('id', 'title')->get()
        ]);
    }

     public function store(StoreConsultationRequest $request)
    {
        $validated = $request->validated();
        $this->service->create($validated);
        return redirect()
            ->route('consultation')
            ->with('success', 'Consultation created successfully.');
    }
}