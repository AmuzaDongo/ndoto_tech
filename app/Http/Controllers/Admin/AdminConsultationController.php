<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Consultation;

class AdminConsultationController extends Controller
{
    public function index(Request $request)
    {
        $query = Consultation::query();

        $query->when($request->search, function ($q, $search) {
            $q->where(function ($qq) use ($search) {
                $qq->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('service', 'like', "%{$search}%");
            });
        });

        $query->when($request->filled('status'), function ($q, $status) {
            $q->where('status', $status);
        });

        if ($request->filled('sort') && $request->filled('direction')) {
            $allowed = ['name', 'email', 'service', 'created_at'];

            if (in_array($request->sort, $allowed)) {
                $query->orderBy($request->sort, $request->direction);
            }
        }

        $perPage = (int) $request->get('per_page', 10);

        $consultations = $query->paginate($perPage)->withQueryString();

        $stats = [
            'total'       => Consultation::count(),
            'pending'     => Consultation::where('status', 'pending')->count(),
            'in_progress' => Consultation::where('status', 'in_progress')->count(),
            'completed'   => Consultation::where('status', 'completed')->count(),
            'total_revenue' => Consultation::whereNotNull('amount')
                ->sum('amount'), 
        ];

        return Inertia::render('admin/Consultations/Index', [
            'consultations' => $consultations,
            'stats'         => $stats,
            'filters'       => $request->only([
                'search',
                'status',
                'sort',
                'direction',
                'per_page'
            ]),
        ]);
    }

    public function show(Consultation $consultation)
    {
        return Inertia::render('admin/Consultations/Index', [
            'consultations' => Consultation::orderBy('name')->paginate(10),

            'consultationToShow' => $consultation,

            'selectedConsultationId' => $consultation->id,
        ]);
    }

    public function edit(Consultation $consultation)
    {
        return Inertia::render('admin/Consultations/Index', [
            'consultations' => Consultation::orderBy('name')->get(),
            'consultationToEdit' => $consultation,
        ]);
    }

    public function update(Request $request, Consultation $consultation)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected,in_progress,completed',
        ]);

        $consultation->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function destroy(Consultation $consultation)
    {
        $consultation->delete();
        return redirect()
            ->route('admin.consultations.index')
            ->with('success', 'Consultation deleted successfully.');
    }
}