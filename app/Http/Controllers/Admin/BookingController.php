<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\BookingService;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::query()
            ->with(['professional', 'service', 'client'])   // Eager load relationships
            ->select('bookings.*');                         // Explicit selection for clarity

        $query->when($request->search, function ($q, $search) {
            $q->where(function ($qq) use ($search) {
                $qq->where('guest_name', 'like', "%{$search}%")
                ->orWhere('guest_email', 'like', "%{$search}%")
                ->orWhere('guest_company', 'like', "%{$search}%")
                ->orWhereHas('client', function ($clientQuery) use ($search) {
                    $clientQuery->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                })
                ->orWhereHas('professional', function ($proQuery) use ($search) {
                    $proQuery->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('service', function ($serviceQuery) use ($search) {
                    $serviceQuery->where('name', 'like', "%{$search}%");
                });
            });
        });

        // Filter by status
        $query->when($request->filled('status'), function ($q, $status) {
            $q->where('status', $status);
        });

        // Filter by professional (very useful for admin)
        $query->when($request->filled('professional_id'), function ($q, $professionalId) {
            $q->where('professional_id', $professionalId);
        });

        // Sorting
        if ($request->filled('sort') && $request->filled('direction')) {
            $allowedSorts = ['start_time', 'created_at', 'guest_name', 'status'];

            if (in_array($request->sort, $allowedSorts)) {
                $direction = in_array(strtolower($request->direction), ['asc', 'desc']) 
                            ? $request->direction 
                            : 'desc';

                if ($request->sort === 'guest_name') {
                    $query->orderBy('guest_name', $direction);
                } else {
                    $query->orderBy($request->sort, $direction);
                }
            }
        } else {
            // Default sorting: newest first
            $query->orderBy('start_time', 'desc');
        }

        $perPage = (int) $request->get('per_page', 15);

        $bookings = $query->paginate($perPage)->withQueryString();

        // Updated stats (more relevant to your current structure)
        $stats = [
            'total'          => Booking::count(),
            'pending'        => Booking::where('status', 'pending')->count(),
            'confirmed'      => Booking::where('status', 'confirmed')->count(),
            'completed'      => Booking::where('status', 'completed')->count(),
            'cancelled'      => Booking::where('status', 'cancelled')->count(),
            'total_revenue'  => Booking::whereNotNull('price')
                                    ->whereIn('status', ['confirmed', 'completed'])
                                    ->sum('price'),
            'upcoming'       => Booking::where('start_time', '>', now())
                                    ->whereIn('status', ['pending', 'confirmed'])
                                    ->count(),
        ];

        return Inertia::render('admin/Bookings/Index', [
            'bookings' => $bookings,
            'stats'    => $stats,
            'filters'  => $request->only([
                'search',
                'status',
                'professional_id',
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
