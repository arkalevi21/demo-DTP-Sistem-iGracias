'use client';

import { useState } from 'react';
import { Calendar, Search, AlertTriangle, CheckCircle2, Clock, Users, Filter } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { STUDENTS_DATA } from '@/data/mockStudents';

type AttendanceStatus = 'hadir' | 'izin' | 'sakit' | 'alpa';

const STATUS_STYLES: Record<AttendanceStatus, { bg: string; text: string; label: string }> = {
    hadir: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Hadir' },
    izin: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Izin' },
    sakit: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Sakit' },
    alpa: { bg: 'bg-red-100', text: 'text-red-700', label: 'Alpa' },
};

const CLASSES = ['Semua', 'XI DTP 1', 'XI DTP 2', 'XI DTP 3'];

// Generate mock daily attendance
const generateAttendance = () => {
    const statuses: AttendanceStatus[] = ['hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'hadir', 'izin', 'sakit', 'alpa', 'hadir'];
    return STUDENTS_DATA.map(s => ({
        ...s,
        todayStatus: statuses[Math.floor(Math.random() * statuses.length)] as AttendanceStatus,
        monthlyStats: {
            hadir: Math.floor(s.attendance * 0.22),
            izin: Math.floor(Math.random() * 3),
            sakit: Math.floor(Math.random() * 2),
            alpa: s.attendance < 80 ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 2),
        }
    }));
};

const DAYS_IN_MONTH = Array.from({ length: 22 }, (_, i) => i + 1);

export default function AttendancePage() {
    const [students] = useState(generateAttendance);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState('Semua');
    const [selectedDate, setSelectedDate] = useState('2025-10-15');

    const filtered = students.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchClass = selectedClass === 'Semua' || s.class === selectedClass;
        return matchSearch && matchClass;
    });

    const totalHadir = filtered.filter(s => s.todayStatus === 'hadir').length;
    const totalIzin = filtered.filter(s => s.todayStatus === 'izin').length;
    const totalSakit = filtered.filter(s => s.todayStatus === 'sakit').length;
    const totalAlpa = filtered.filter(s => s.todayStatus === 'alpa').length;
    const lowAttendanceStudents = students.filter(s => s.attendance < 75);

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Rekap Presensi</h1>
                    <p className="text-neutral-500 text-sm">Monitoring kehadiran siswa DTP</p>
                </div>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                    className="h-10 px-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-brand-red" />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Hadir', value: totalHadir, total: filtered.length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
                    { label: 'Izin', value: totalIzin, total: filtered.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
                    { label: 'Sakit', value: totalSakit, total: filtered.length, color: 'text-amber-600', bg: 'bg-amber-50', icon: Calendar },
                    { label: 'Alpa', value: totalAlpa, total: filtered.length, color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={clsx('p-1.5 rounded-lg', stat.bg)}><Icon className={clsx('h-4 w-4', stat.color)} /></div>
                                <span className="text-xs font-medium text-neutral-500">{stat.label}</span>
                            </div>
                            <p className="text-2xl font-bold text-neutral-900">{stat.value}<span className="text-sm text-neutral-400 font-normal">/{stat.total}</span></p>
                        </div>
                    );
                })}
            </div>

            {/* Alert for low attendance */}
            {lowAttendanceStudents.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-red-800 mb-1">Perhatian: {lowAttendanceStudents.length} siswa kehadiran rendah!</h4>
                        <p className="text-xs text-red-600">
                            {lowAttendanceStudents.map(s => s.name).join(', ')} memiliki tingkat kehadiran di bawah 75%.
                        </p>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Cari nama siswa..."
                        className="w-full h-10 pl-10 pr-4 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                </div>
                <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                    className="h-10 px-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-brand-red">
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Attendance Table (Desktop) */}
            <div className="hidden md:block bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50">
                            <th className="text-left text-xs font-bold text-neutral-500 py-3 px-4">Siswa</th>
                            <th className="text-left text-xs font-bold text-neutral-500 py-3 px-4">Kelas</th>
                            <th className="text-center text-xs font-bold text-neutral-500 py-3 px-4">Status Hari Ini</th>
                            <th className="text-center text-xs font-bold text-neutral-500 py-3 px-4">Hadir</th>
                            <th className="text-center text-xs font-bold text-neutral-500 py-3 px-4">Izin</th>
                            <th className="text-center text-xs font-bold text-neutral-500 py-3 px-4">Sakit</th>
                            <th className="text-center text-xs font-bold text-neutral-500 py-3 px-4">Alpa</th>
                            <th className="text-center text-xs font-bold text-neutral-500 py-3 px-4">%</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {filtered.map(student => {
                            const st = STATUS_STYLES[student.todayStatus];
                            return (
                                <tr key={student.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random&color=fff&size=28`} alt="" width={28} height={28} className="rounded-full" />
                                            <span className="text-sm font-medium text-neutral-900">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-neutral-500">{student.class}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-bold', st.bg, st.text)}>{st.label}</span>
                                    </td>
                                    <td className="py-3 px-4 text-center text-sm font-medium text-emerald-600">{student.monthlyStats.hadir}</td>
                                    <td className="py-3 px-4 text-center text-sm font-medium text-blue-600">{student.monthlyStats.izin}</td>
                                    <td className="py-3 px-4 text-center text-sm font-medium text-amber-600">{student.monthlyStats.sakit}</td>
                                    <td className="py-3 px-4 text-center text-sm font-medium text-red-600">{student.monthlyStats.alpa}</td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={clsx('text-sm font-bold', student.attendance >= 90 ? 'text-emerald-600' : student.attendance >= 75 ? 'text-amber-600' : 'text-red-600')}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Attendance Cards (Mobile) */}
            <div className="md:hidden space-y-3">
                {filtered.map(student => {
                    const st = STATUS_STYLES[student.todayStatus];
                    return (
                        <div key={student.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random&color=fff&size=36`} alt="" width={36} height={36} className="rounded-full" />
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-neutral-900">{student.name}</h4>
                                    <p className="text-xs text-neutral-500">{student.class}</p>
                                </div>
                                <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-bold', st.bg, st.text)}>{st.label}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center">
                                <div className="bg-emerald-50 rounded-lg p-1.5"><p className="text-xs font-bold text-emerald-600">{student.monthlyStats.hadir}</p><p className="text-[9px] text-neutral-400">Hadir</p></div>
                                <div className="bg-blue-50 rounded-lg p-1.5"><p className="text-xs font-bold text-blue-600">{student.monthlyStats.izin}</p><p className="text-[9px] text-neutral-400">Izin</p></div>
                                <div className="bg-amber-50 rounded-lg p-1.5"><p className="text-xs font-bold text-amber-600">{student.monthlyStats.sakit}</p><p className="text-[9px] text-neutral-400">Sakit</p></div>
                                <div className="bg-red-50 rounded-lg p-1.5"><p className="text-xs font-bold text-red-600">{student.monthlyStats.alpa}</p><p className="text-[9px] text-neutral-400">Alpa</p></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
