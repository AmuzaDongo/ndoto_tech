<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ConsultationSlot;
use Illuminate\Http\Request;

class ConsultationSlotController extends Controller
{
    public function index()
    {
        return ConsultationSlot::latest()->paginate(20);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'start_time' => ['required','date'],
            'end_time' => ['required','date','after:start_time'],
        ]);

        return ConsultationSlot::create($data);
    }

    public function destroy($id)
    {
        $slot = ConsultationSlot::findOrFail($id);

        if ($slot->is_booked) {
            return response()->json([
                'message' => 'Cannot delete booked slot'
            ], 422);
        }

        $slot->delete();

        return response()->json([
            'message' => 'Slot deleted'
        ]);
    }
}