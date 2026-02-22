'use client';

import { useState } from 'react';
import { Bell, BookOpen, Trophy, Calendar, AlertCircle, CheckCircle2, Info, Clock } from 'lucide-react';
import clsx from 'clsx';

type NotifType = 'jurnal' | 'competition' | 'deadline' | 'system' | 'info';

type Notification = {
    id: number;
    type: NotifType;
    title: string;
    message: string;
    time: string;
    date: string;
    read: boolean;
};

const TYPE_CONFIG: Record<NotifType, { icon: any; color: string; bg: string }> = {
    jurnal: { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    competition: { icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-100' },
    deadline: { icon: Calendar, color: 'text-red-600', bg: 'bg-red-100' },
    system: { icon: AlertCircle, color: 'text-purple-600', bg: 'bg-purple-100' },
    info: { icon: Info, color: 'text-neutral-600', bg: 'bg-neutral-100' },
};

const INITIAL_NOTIFICATIONS: Notification[] = [
    { id: 1, type: 'jurnal', title: 'Jurnal Baru Disubmit', message: 'Pak Adi telah mengisi jurnal Fiber Optic untuk tanggal 15 Oktober 2025.', time: '5 menit lalu', date: 'Hari Ini', read: false },
    { id: 2, type: 'deadline', title: 'Deadline Planner Mendekati!', message: 'Batas pengisian Monthly Planner untuk bulan November adalah tanggal 25 Oktober. Sisa 10 hari.', time: '1 jam lalu', date: 'Hari Ini', read: false },
    { id: 3, type: 'competition', title: 'Peserta Baru: LKS Web Tech', message: 'Alexander Grahambell telah mendaftar untuk kompetisi LKS Web Technology 2026.', time: '2 jam lalu', date: 'Hari Ini', read: false },
    { id: 4, type: 'system', title: 'Presensi Rendah Terdeteksi', message: 'Michael Ross (XI DTP 1) memiliki tingkat kehadiran 60%. Perlu perhatian segera.', time: '3 jam lalu', date: 'Hari Ini', read: true },
    { id: 5, type: 'jurnal', title: 'Review Sesi Selesai', message: 'Bu Rina telah menyelesaikan review sesi Web Development. Hasil: 78% (Perlu Perbaikan).', time: '5 jam lalu', date: 'Hari Ini', read: true },
    { id: 6, type: 'info', title: 'Portfolio Baru Diupload', message: 'Sarah Connor mengupload project "Mobile Banking App" ke portfolio.', time: 'Kemarin, 16:30', date: 'Kemarin', read: true },
    { id: 7, type: 'competition', title: 'Hasil Kompetisi Out!', message: 'Hasil Hackathon IoT Challenge telah diumumkan. Alexander Grahambell meraih Juara 2.', time: 'Kemarin, 10:00', date: 'Kemarin', read: true },
    { id: 8, type: 'deadline', title: 'Payroll Bulan September', message: 'Laporan payroll bulan September sudah tersedia untuk di-download.', time: '2 hari lalu', date: '13 Oktober', read: true },
    { id: 9, type: 'system', title: 'Update Sistem', message: 'Sistem DTP telah diperbarui ke versi 2.1.0 dengan fitur baru:Rekap Presensi dan Jadwal.', time: '3 hari lalu', date: '12 Oktober', read: true },
    { id: 10, type: 'jurnal', title: 'Jurnal Batch Submitted', message: 'Bu Susi telah menginput 3 jurnal mengajar sekaligus untuk mata pelajaran UI/UX Design.', time: '4 hari lalu', date: '11 Oktober', read: true },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const displayed = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleToggleRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
    };

    // Group by date
    const grouped = displayed.reduce((acc, notif) => {
        if (!acc[notif.date]) acc[notif.date] = [];
        acc[notif.date].push(notif);
        return acc;
    }, {} as Record<string, Notification[]>);

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Notifikasi</h1>
                    <p className="text-neutral-500 text-sm">{unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}</p>
                </div>
                {unreadCount > 0 && (
                    <button onClick={handleMarkAllRead} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-sm font-medium text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors">
                        <CheckCircle2 className="h-4 w-4" /> Tandai Semua Dibaca
                    </button>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                <button onClick={() => setFilter('all')}
                    className={clsx('px-4 py-2 rounded-lg text-sm font-bold transition-colors', filter === 'all' ? 'bg-brand-red text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50')}>
                    Semua ({notifications.length})
                </button>
                <button onClick={() => setFilter('unread')}
                    className={clsx('px-4 py-2 rounded-lg text-sm font-bold transition-colors', filter === 'unread' ? 'bg-brand-red text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50')}>
                    Belum Dibaca ({unreadCount})
                </button>
            </div>

            {/* Grouped Notifications */}
            <div className="space-y-6">
                {Object.entries(grouped).map(([date, notifs]) => (
                    <div key={date}>
                        <h3 className="text-xs font-bold text-neutral-400 uppercase mb-3 ml-1">{date}</h3>
                        <div className="space-y-2">
                            {notifs.map(notif => {
                                const config = TYPE_CONFIG[notif.type];
                                const Icon = config.icon;
                                return (
                                    <div key={notif.id} onClick={() => handleToggleRead(notif.id)}
                                        className={clsx('bg-white rounded-xl border shadow-sm p-4 flex items-start gap-3 cursor-pointer transition-all hover:shadow-md',
                                            notif.read ? 'border-neutral-200 opacity-70' : 'border-brand-red/20 bg-red-50/30'
                                        )}>
                                        <div className={clsx('p-2 rounded-lg shrink-0', config.bg)}>
                                            <Icon className={clsx('h-4 w-4', config.color)} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className={clsx('text-sm font-bold', notif.read ? 'text-neutral-600' : 'text-neutral-900')}>{notif.title}</h4>
                                                {!notif.read && <span className="w-2 h-2 rounded-full bg-brand-red shrink-0" />}
                                            </div>
                                            <p className="text-xs text-neutral-500 leading-relaxed">{notif.message}</p>
                                            <p className="text-[10px] text-neutral-400 mt-1.5 flex items-center gap-1"><Clock className="h-3 w-3" />{notif.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {displayed.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-neutral-200">
                        <Bell className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                        <p className="text-neutral-500 font-medium">Tidak ada notifikasi</p>
                    </div>
                )}
            </div>
        </div>
    );
}
