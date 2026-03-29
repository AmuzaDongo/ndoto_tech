<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Http\Requests\StoreConsultationRequest;
use App\Services\ConsultationService;

class ConsultationController extends Controller
{
    public function __construct(
        protected ConsultationService $service
    ) {}

    public function index()
    {
        return Inertia::render('consultation/index');
    }

    public function store(StoreConsultationRequest $request)
    {
        try {

            $consultation = $this->service->create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Consultation request submitted successfully.',
                'data' => $consultation
            ], 201);

        } catch (\Throwable $e) {

            Log::error('Consultation creation failed', [
                'error' => $e->getMessage(),
                'payload' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to submit consultation request. Please try again later.'
            ], 500);
        }
    }
}