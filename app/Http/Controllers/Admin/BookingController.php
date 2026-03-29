<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\BookingService;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::query();

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

        $bookings = $query->paginate($perPage)->withQueryString();

        $stats = [
            'total'       => Booking::count(),
            'pending'     => Booking::where('status', 'pending')->count(),
            'in_progress' => Booking::where('status', 'in_progress')->count(),
            'completed'   => Booking::where('status', 'completed')->count(),
            'total_revenue' => Booking::whereNotNull('amount')
                ->sum('amount'), 
        ];

        return Inertia::render('admin/Bookings/Index', [
            'bookings' => $bookings,
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


    public function store(Request $request, BookingService $bookingService)
    {
        $validated = $request->validate([
            'slot_id'         => 'required|exists:consultation_slots,id',
            'professional_id' => 'required|exists:users,id',
            'service_id'      => 'required|exists:services,id',
            'start_time'      => 'required|date',
            'end_time'        => 'required|date|after:start_time',
            'guest_name'      => 'required_if:client_id,null|string',
            'guest_email'     => 'required_if:client_id,null|email',
            'client_notes'    => 'nullable|string',
        ]);

        try {
            $booking = $bookingService->createBooking($validated);

            return response()->json([
                'message' => 'Booking created successfully!',
                'booking' => $booking->load('professional', 'service')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function show(Booking $booking)
    {
        return Inertia::render('admin/Bookings/Index', [
            'bookings' => Booking::orderBy('name')->paginate(10),

            'bookingToShow' => $booking,

            'selectedBookingId' => $booking->id,
        ]);
    }

    public function edit(Booking $booking)
    {
        return Inertia::render('admin/Bookings/Index', [
            'bookings' => Booking::orderBy('name')->get(),
            'bookingToEdit' => $booking,
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,contacted,qualified,converted_to_booking,closed',
        ]);

        $booking->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()
            ->route('admin.bookings.index')
            ->with('success', 'Booking deleted successfully.');
    }
}
