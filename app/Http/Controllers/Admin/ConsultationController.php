<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Http\Requests\StoreConsultationRequest;
use App\Services\ConsultationService;
use App\Models\ConsultationSlot;
use App\Models\Consultation;

class ConsultationController extends Controller
{
    public function __construct(
        protected ConsultationService $service
    ) {}

    public function index(Request $request)
    {
        $consultations = Consultation::query()
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/conslutations/Index', [
            'consultations' => $consultations->toArray(),
            'filters' => $request->only(['search', 'status']),
        ]);
    }
}