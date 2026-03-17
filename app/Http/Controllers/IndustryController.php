<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IndustryController extends Controller
{
    public function index()
    {
        return Inertia::render('industry/index', []);
    }
}
