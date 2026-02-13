'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { useSidebar } from './SidebarContext';

export default function TopHeader() {
    const { toggleSidebar, userRole } = useSidebar();

    const getRoleLabel = () => {
        switch (userRole) {
            case 'admin': return 'Administrator';
            case 'industry_mentor': return 'Pengajar Industri';
            case 'internal_mentor': return 'Pengajar Internal';
            case 'student': return 'Siswa';
            default: return 'User';
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-neutral-200 bg-white px-6">
            <div className="flex items-center gap-4 lg:hidden">
                <button
                    onClick={toggleSidebar}
                    className="rounded-md p-2 hover:bg-neutral-100"
                >
                    <Menu className="h-6 w-6 text-neutral-600" />
                </button>
                <span className="font-bold text-red-600">DTP System</span>
            </div>

            <div className="hidden lg:block w-full max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Cari siswa, materi, atau jurnal..."
                        className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 hover:bg-neutral-100">
                    <Bell className="h-5 w-5 text-neutral-600" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-neutral-900">{getRoleLabel()}</div>
                    <div className="text-xs text-neutral-500">Tahun Ajaran 2025/2026</div>
                </div>
            </div>
        </header>
    );
}
