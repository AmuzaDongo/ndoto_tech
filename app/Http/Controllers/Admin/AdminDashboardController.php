<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Project;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 🔹 Basic Counts
        $totalUsers      = User::count();
        $totalClients    = Client::count();
        $totalServices   = Service::count();
        $totalProjects   = Project::count();

        // 🔹 Active / Completed Projects
        $projectsByStatus = Project::select(
            'status',
            DB::raw('COUNT(*) as total')
        )->groupBy('status')->pluck('total','status');

        $driver = DB::connection()->getDriverName();

        $dateFormat = $driver === 'sqlite'
            ? "strftime('%Y-%m', created_at)"
            : "DATE_FORMAT(created_at, '%Y-%m')";

        $monthlyProjects = Project::select(
            DB::raw("$dateFormat as month"),
            DB::raw("COUNT(*) as total")
        )
        ->where('created_at', '>=', Carbon::now()->subMonths(6))
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->pluck('total','month');

        // 🔹 Service Popularity (Projects count per service)
        $servicesPopularity = Service::withCount('projects')
            ->orderByDesc('projects_count')
            ->take(5)
            ->get(['title', 'projects_count']);

        // 🔹 Users by Role (optional, if you have roles)
        // $usersByRole = User::select('role', DB::raw('COUNT(*) as total'))
        //     ->groupBy('role')
        //     ->pluck('total','role');

        // 🔹 Project Budget vs Actual Cost (for charts)
        $budgetVsActual = Project::select(
            'title',
            'budget',
            'actual_cost'
        )->get();

        // 🔹 Latest 5 Projects
        $latestProjects = Project::latest()->take(5)->get(['title','status','progress','created_at']);

        // 🔹 Clients with Most Projects
        $topClients = Client::withCount('projects')
            ->orderByDesc('projects_count')
            ->take(5)
            ->get(['name','projects_count']);

        return Inertia::render('admin/Dashboard/Index', [
            'stats' => [
                'total_users'     => $totalUsers,
                'total_clients'   => $totalClients,
                'total_services'  => $totalServices,
                'total_projects'  => $totalProjects,
            ],
            'projects_by_status' => $projectsByStatus,
            'monthly_projects'   => $monthlyProjects,
            'services_popularity'=> $servicesPopularity,
            'budget_vs_actual'   => $budgetVsActual,
            'latest_projects'    => $latestProjects,
            'top_clients'        => $topClients,
        ]);
    }
}