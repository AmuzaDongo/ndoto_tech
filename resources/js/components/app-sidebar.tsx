import { Link } from '@inertiajs/react';
import { BookOpen, Folder, Forklift, Handshake, HandPlatter, LayoutGrid, MessageCircleHeart, ShieldCheck, SwatchBook, ListOrdered} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard,projects } from '@/routes';
import consultations from '@/routes/admin/consultations';
import type { NavItem } from '@/types';;
import admin from '@/wayfinder/routes/admin';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        href: admin.projects.index(),
        icon: ShieldCheck,
    },
    
    {
        title: 'Orders',
        href: projects(),
        icon: ListOrdered,
    },
    {
        title: 'Services',
        href: admin.services.index(),
        icon: HandPlatter,
    },
    {
        title: 'Clients',
        href: admin.clients.index(),
        icon: HandPlatter,
    },
    {
        title: 'Consultation',
        href: consultations.index(),
        icon: Handshake,
    },
    {
        title: 'Industries',
        href: dashboard(),
        icon: Forklift,
    },
    {
        title: 'Testimonials',
        href: dashboard(),
        icon: MessageCircleHeart,
    },
    {
        title: 'Jobs',
        href: dashboard(),
        icon: SwatchBook,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
