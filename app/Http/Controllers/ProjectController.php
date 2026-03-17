<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index() {
        return Inertia::render('project/index', []);
    }
}
