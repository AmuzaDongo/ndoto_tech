<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ConsultationSlot;

class AdminConsultationSlotController extends Controller
{
    public function index(Request $request)
    {
        $query = ConsultationSlot::query();

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

        $slots = $query->paginate($perPage)->withQueryString();

        $stats = [
            'total'       => Consultation::count(),
            'pending'     => Consultation::where('status', 'pending')->count(),
            'in_progress' => Consultation::where('status', 'in_progress')->count(),
            'completed'   => Consultation::where('status', 'completed')->count(),
            'total_revenue' => Consultation::whereNotNull('amount')
                ->sum('amount'), 
        ];

        return Inertia::render('admin/ConsultationSlots/Index', [
            'slots' => $slots,
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

    public function show(ConsultationSlot $slot)
    {
        return Inertia::render('admin/ConsultationSlots/Index', [
            'slots' => ConsultationSlot::orderBy('name')->paginate(10),

            'consultationSlotToShow' => $slot,

            'selectedConsultationId' => $slot->id,
        ]);
    }

    public function edit(ConsultationSlot $slot)
    {
        return Inertia::render('admin/ConsultationSlots/Index', [
            'slots' => ConsultationSlot::orderBy('name')->get(),
            'consultationSlotToEdit' => $slot,
        ]);
    }

    public function update(Request $request, ConsultationSlot $slot)
    {
        $validated = $request->validate([
            'status' => 'required|in:available,booked,blocked,completed,cancelled',
        ]);

        $slot->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Slot updated successfully.');
    }

    public function destroy(ConsultationSlot $slot)
    {
        if ($slot->is_booked) {
            return response()->json([
                'message' => 'Cannot delete booked slot'
            ], 422);
        }

        $slot->delete();

        return redirect()
            ->route('admin.consultation_slots.index')
            ->with('success', 'Consultation Slot deleted successfully.');
    }
}