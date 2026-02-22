'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { INITIAL_FO_SCHEDULE, MONTHS, ALL_MENTORS } from '@/data/schedule';
import { useSidebar } from '@/components/SidebarContext';

const DAYS = ['Rabu', 'Kamis'];

const WEEKLY_SCHEDULE = [
    { id: 1, day: 'Rabu', time: '07:30 - 09:30', subject: 'Fiber Optic', topic: 'Komponen SKSO', room: 'Lab FO-1', mentor: 'Pak Adi', type: 'Internal' as const },
    { id: 2, day: 'Rabu', time: '10:00 - 12:00', subject: 'Web Development', topic: 'React.js Basics', room: 'Lab Komputer 2', mentor: 'Bu Rina', type: 'Internal' as const },
    { id: 3, day: 'Rabu', time: '13:00 - 15:00', subject: 'Digital Marketing', topic: 'SEO Fundamentals', room: 'Lab Komputer 1', mentor: 'Pak Bagus', type: 'Industrial' as const },
    { id: 4, day: 'Kamis', time: '07:30 - 09:30', subject: 'UI/UX Design', topic: 'Figma Prototyping', room: 'Lab Multimedia', mentor: 'Bu Susi', type: 'Internal' as const },
    { id: 5, day: 'Kamis', time: '10:00 - 12:00', subject: 'Fiber Optic', topic: 'Praktek Splicing', room: 'Workshop FO', mentor: 'Pak David', type: 'Industrial' as const },
    { id: 6, day: 'Kamis', time: '13:00 - 15:00', subject: 'Web Development', topic: 'Project Day', room: 'Lab Komputer 2', mentor: 'Bu Rina', type: 'Internal' as const },
];

const typeColors = {
    Internal: 'bg-blue-100 text-blue-700 border-blue-200',
    Industrial: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function SchedulePage() {
    const { userRole } = useSidebar();
    const [currentWeek, setCurrentWeek] = useState(0);
    const weekLabel = `Minggu ke-${currentWeek + 1}`;
    const isStudent = userRole === 'student';

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">
                        {isStudent ? 'Jadwal Saya' : 'Jadwal Mengajar'}
                    </h1>
                    <p className="text-neutral-500 text-sm">
                        {isStudent ? 'Jadwal kelas peminatan minggu ini' : 'Jadwal sesi kelas peminatan (Rabu & Kamis)'}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm">
                    <button onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                        <ChevronLeft className="h-4 w-4 text-neutral-600" />
                    </button>
                    <span className="text-sm font-bold text-neutral-700 min-w-[140px] text-center">{weekLabel} • Okt 2025</span>
                    <button onClick={() => setCurrentWeek(Math.min(3, currentWeek + 1))} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                        <ChevronRight className="h-4 w-4 text-neutral-600" />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total Sesi', value: WEEKLY_SCHEDULE.length, icon: BookOpen, color: 'text-brand-red', bg: 'bg-red-50' },
                    { label: 'Hari Aktif', value: '2', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Jam Mengajar', value: '12 jam', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Mentor Aktif', value: ALL_MENTORS.length, icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={clsx('p-1.5 rounded-lg', stat.bg)}><Icon className={clsx('h-4 w-4', stat.color)} /></div>
                                <span className="text-xs font-medium text-neutral-500">{stat.label}</span>
                            </div>
                            <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Day-by-Day Schedule */}
            <div className="space-y-4">
                {DAYS.map(day => {
                    const sessions = WEEKLY_SCHEDULE.filter(s => s.day === day);
                    return (
                        <div key={day} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-brand-red" />
                                <h3 className="font-bold text-sm text-neutral-900">{day}</h3>
                                <span className="text-xs text-neutral-400 ml-auto">{sessions.length} sesi</span>
                            </div>
                            {sessions.length > 0 ? (
                                <div className="divide-y divide-neutral-100">
                                    {sessions.map(session => (
                                        <div key={session.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-neutral-50 transition-colors">
                                            <div className="flex items-center gap-3 min-w-[140px]">
                                                <Clock className="h-4 w-4 text-neutral-400 shrink-0" />
                                                <span className="text-sm font-medium text-neutral-700">{session.time}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <h4 className="text-sm font-bold text-neutral-900">{session.subject}</h4>
                                                    <span className={clsx('px-2 py-0.5 rounded text-[10px] font-bold border', typeColors[session.type])}>
                                                        {session.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-neutral-500">{session.topic}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-neutral-500">
                                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{session.room}</span>
                                                <span className="flex items-center gap-1"><User className="h-3 w-3" />{session.mentor}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 text-center text-sm text-neutral-400">Tidak ada sesi</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
