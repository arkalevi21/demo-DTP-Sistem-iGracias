'use client';

import { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { useSidebar } from './SidebarContext';

export default function TopHeader() {
    const { toggleSidebar, userRole } = useSidebar();
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    const NOTIFICATIONS = [
        { id: 1, text: 'Ahmad Rizky mengisi jurnal baru', time: '5 menit lalu', read: false },
        { id: 2, text: 'Deadline LKS Web Tech dalam 3 hari', time: '1 jam lalu', read: false },
        { id: 3, text: 'Laporan bulanan siap didownload', time: 'Kemarin', read: true },
    ];

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-10 pr-10 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative rounded-full p-2 hover:bg-neutral-100"
                    >
                        <Bell className="h-5 w-5 text-neutral-600" />
                        {NOTIFICATIONS.some(n => !n.read) && (
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                                <h4 className="font-bold text-neutral-900">Notifikasi</h4>
                                <button onClick={() => setShowNotifications(false)} className="text-neutral-400 hover:text-neutral-600">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="divide-y divide-neutral-100 max-h-64 overflow-y-auto">
                                {NOTIFICATIONS.map(n => (
                                    <div key={n.id} className={`p-4 hover:bg-neutral-50 cursor-pointer transition-colors ${!n.read ? 'bg-red-50/50' : ''}`}>
                                        <p className="text-sm text-neutral-800">{n.text}</p>
                                        <p className="text-xs text-neutral-500 mt-1">{n.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-t border-neutral-100 text-center">
                                <button className="text-sm text-red-600 font-medium hover:underline">Lihat Semua</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-neutral-900">{getRoleLabel()}</div>
                    <div className="text-xs text-neutral-500">Tahun Ajaran 2025/2026</div>
                </div>
            </div>
        </header>
    );
}
