import { Link } from '@inertiajs/react';
import { MessageCircleMore, Forklift, Handshake, HandPlatter, LayoutGrid, MessageCircleHeart, ShieldCheck, SwatchBook, ListOrdered, UserPlus, User2Icon} from 'lucide-react';
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
        href: admin.dashboard(),
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
        icon: UserPlus,
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
    {
        title: 'Users',
        href: admin.users.index(),
        icon: User2Icon,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Messages',
        href: '/messages',
        icon: MessageCircleMore,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard()} prefetch>
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
