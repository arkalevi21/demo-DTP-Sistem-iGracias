'use client';

import { useState } from 'react';
import { Calendar, Search, AlertTriangle, CheckCircle2, Clock, CalendarDays, User } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { STUDENTS_DATA } from '@/data/mockStudents';
import { useSidebar } from '@/components/SidebarContext';

type AttendanceStatus = 'hadir' | 'izin' | 'sakit' | 'alpa';

const STATUS_STYLES: Record<AttendanceStatus, { bg: string; text: string; label: string }> = {
    hadir: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Hadir' },
    izin: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Izin' },
    sakit: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Sakit' },
    alpa: { bg: 'bg-red-100', text: 'text-red-700', label: 'Alpa' },
};

const CLASSES = ['Semua', 'XI DTP 1', 'XI DTP 2', 'XI DTP 3', 'XII DTP 1', 'XII DTP 2'];

// Rabu & Kamis dates in October 2025
const DTP_DATES = [
    { date: '1 Okt', day: 'Rabu' }, { date: '2 Okt', day: 'Kamis' },
    { date: '8 Okt', day: 'Rabu' }, { date: '9 Okt', day: 'Kamis' },
    { date: '15 Okt', day: 'Rabu' }, { date: '16 Okt', day: 'Kamis' },
    { date: '22 Okt', day: 'Rabu' }, { date: '23 Okt', day: 'Kamis' },
    { date: '29 Okt', day: 'Rabu' }, { date: '30 Okt', day: 'Kamis' },
];

const TOTAL_DTP_DAYS = DTP_DATES.length;

// Generate mock attendance for Rabu & Kamis
const generateAttendance = () => {
    return STUDENTS_DATA.map(s => {
        const dailyStatuses = DTP_DATES.map(() => {
            const r = Math.random();
            if (s.attendance >= 95) return 'hadir' as AttendanceStatus;
            if (s.attendance >= 85) return r < 0.85 ? 'hadir' as AttendanceStatus : r < 0.92 ? 'izin' as AttendanceStatus : r < 0.97 ? 'sakit' as AttendanceStatus : 'alpa' as AttendanceStatus;
            if (s.attendance >= 75) return r < 0.75 ? 'hadir' as AttendanceStatus : r < 0.85 ? 'izin' as AttendanceStatus : r < 0.90 ? 'sakit' as AttendanceStatus : 'alpa' as AttendanceStatus;
            return r < 0.55 ? 'hadir' as AttendanceStatus : r < 0.65 ? 'izin' as AttendanceStatus : r < 0.75 ? 'sakit' as AttendanceStatus : 'alpa' as AttendanceStatus;
        });

        const hadir = dailyStatuses.filter(s => s === 'hadir').length;
        const izin = dailyStatuses.filter(s => s === 'izin').length;
        const sakit = dailyStatuses.filter(s => s === 'sakit').length;
        const alpa = dailyStatuses.filter(s => s === 'alpa').length;
        const percent = Math.round((hadir / TOTAL_DTP_DAYS) * 100);

        return { ...s, dailyStatuses, stats: { hadir, izin, sakit, alpa }, percent };
    });
};

// ========== STUDENT PERSONAL VIEW ==========
function StudentAttendanceView({ students }: { students: ReturnType<typeof generateAttendance> }) {
    // Mock: student sees their own data (use first student as "logged in" student)
    const me = students[0];
    const selectedMonth = 'Oktober 2025';

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Presensi Saya</h1>
                    <p className="text-neutral-500 text-sm">Rekap kehadiran kelas peminatan <span className="font-semibold text-brand-red">Rabu &amp; Kamis</span></p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm">
                    <CalendarDays className="h-4 w-4 text-brand-red" />
                    <span className="text-sm font-bold text-neutral-700">{selectedMonth}</span>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Image src={`https://ui-avatars.com/api/?name=${me.avatar}&background=E8384F&color=fff&size=56`} alt="" width={56} height={56} className="rounded-full" />
                    <div>
                        <h2 className="text-lg font-bold text-neutral-900">{me.name}</h2>
                        <p className="text-sm text-neutral-500">{me.class} • Kelas Peminatan DTP</p>
                    </div>
                    <div className="ml-auto text-right">
                        <p className={clsx('text-3xl font-black', me.percent >= 90 ? 'text-emerald-600' : me.percent >= 70 ? 'text-amber-600' : 'text-red-600')}>
                            {me.percent}%
                        </p>
                        <p className="text-xs text-neutral-400">Tingkat Kehadiran</p>
                    </div>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-emerald-50 rounded-xl p-3 text-center">
                        <p className="text-xl font-bold text-emerald-600">{me.stats.hadir}</p>
                        <p className="text-[10px] font-medium text-emerald-500">Hadir</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                        <p className="text-xl font-bold text-blue-600">{me.stats.izin}</p>
                        <p className="text-[10px] font-medium text-blue-500">Izin</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3 text-center">
                        <p className="text-xl font-bold text-amber-600">{me.stats.sakit}</p>
                        <p className="text-[10px] font-medium text-amber-500">Sakit</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 text-center">
                        <p className="text-xl font-bold text-red-600">{me.stats.alpa}</p>
                        <p className="text-[10px] font-medium text-red-500">Alpa</p>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6 flex items-center gap-3">
                <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700">
                    Kelas peminatan diadakan setiap <strong>Rabu &amp; Kamis</strong> — total <strong>{TOTAL_DTP_DAYS} pertemuan</strong> bulan {selectedMonth}.
                </p>
            </div>

            {/* Per-date detail */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50">
                    <h3 className="text-sm font-bold text-neutral-900">Detail Kehadiran Per Pertemuan</h3>
                </div>
                <div className="divide-y divide-neutral-100">
                    {DTP_DATES.map((d, i) => {
                        const status = me.dailyStatuses[i];
                        const st = STATUS_STYLES[status];
                        return (
                            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-neutral-50 transition-colors">
                                <div className="flex items-center gap-3 min-w-[130px]">
                                    <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xs font-bold text-neutral-600">{d.date.split(' ')[0]}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900">{d.day}</p>
                                        <p className="text-[10px] text-neutral-400">{d.date}</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-neutral-500">
                                        {d.day === 'Rabu' ? 'Sesi Pagi & Siang' : 'Sesi Pagi & Siang'}
                                    </p>
                                </div>
                                <span className={clsx('px-3 py-1 rounded-full text-xs font-bold', st.bg, st.text)}>
                                    {st.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Warning if low */}
            {me.percent < 75 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-red-800 mb-1">Perhatian!</h4>
                        <p className="text-xs text-red-600">
                            Tingkat kehadiran kamu {me.percent}%, di bawah batas minimum 75%. Segera perbaiki kehadiran agar tidak mempengaruhi penilaian.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ========== ADMIN/MENTOR VIEW ==========
function AdminAttendanceView({ students }: { students: ReturnType<typeof generateAttendance> }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState('Semua');
    const selectedMonth = 'Oktober 2025';

    const filtered = students.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchClass = selectedClass === 'Semua' || s.class === selectedClass;
        return matchSearch && matchClass;
    });

    const totalHadir = filtered.reduce((sum, s) => sum + s.stats.hadir, 0);
    const totalIzin = filtered.reduce((sum, s) => sum + s.stats.izin, 0);
    const totalSakit = filtered.reduce((sum, s) => sum + s.stats.sakit, 0);
    const totalAlpa = filtered.reduce((sum, s) => sum + s.stats.alpa, 0);
    const totalSlots = filtered.length * TOTAL_DTP_DAYS;
    const overallPercent = totalSlots > 0 ? Math.round((totalHadir / totalSlots) * 100) : 0;
    const lowAttendanceStudents = students.filter(s => s.percent < 70);

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Rekap Presensi DTP</h1>
                    <p className="text-neutral-500 text-sm">Monitoring kehadiran siswa setiap <span className="font-semibold text-brand-red">Rabu &amp; Kamis</span> (hari kelas peminatan)</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm">
                    <CalendarDays className="h-4 w-4 text-brand-red" />
                    <span className="text-sm font-bold text-neutral-700">{selectedMonth}</span>
                </div>
            </div>

            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6 flex items-center gap-3">
                <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700">
                    Presensi dicatat setiap <strong>Rabu &amp; Kamis</strong> — total <strong>{TOTAL_DTP_DAYS} hari</strong> pertemuan DTP bulan {selectedMonth}.
                    Tingkat kehadiran: <strong className={clsx(overallPercent >= 85 ? 'text-emerald-700' : overallPercent >= 70 ? 'text-amber-700' : 'text-red-700')}>{overallPercent}%</strong>
                </p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total Hadir', value: totalHadir, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
                    { label: 'Izin', value: totalIzin, color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
                    { label: 'Sakit', value: totalSakit, color: 'text-amber-600', bg: 'bg-amber-50', icon: Calendar },
                    { label: 'Alpa', value: totalAlpa, color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={clsx('p-1.5 rounded-lg', stat.bg)}><Icon className={clsx('h-4 w-4', stat.color)} /></div>
                                <span className="text-xs font-medium text-neutral-500">{stat.label}</span>
                            </div>
                            <p className="text-2xl font-bold text-neutral-900">{stat.value}<span className="text-sm text-neutral-400 font-normal"> sesi</span></p>
                        </div>
                    );
                })}
            </div>

            {/* Alert */}
            {lowAttendanceStudents.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-red-800 mb-1">Perhatian: {lowAttendanceStudents.length} siswa kehadiran rendah!</h4>
                        <p className="text-xs text-red-600">
                            {lowAttendanceStudents.map(s => `${s.name} (${s.percent}%)`).join(', ')} — kehadiran di bawah 70% pada hari Rabu &amp; Kamis.
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
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-200 bg-neutral-50">
                                <th className="text-left text-xs font-bold text-neutral-500 py-3 px-4 sticky left-0 bg-neutral-50 z-10 min-w-[180px]">Siswa</th>
                                <th className="text-left text-xs font-bold text-neutral-500 py-3 px-3 min-w-[90px]">Kelas</th>
                                {DTP_DATES.map((d, i) => (
                                    <th key={i} className="text-center text-[10px] font-bold text-neutral-500 py-3 px-1.5 min-w-[52px]">
                                        <div>{d.day.slice(0, 3)}</div>
                                        <div className="text-neutral-400 font-normal">{d.date.split(' ')[0]}</div>
                                    </th>
                                ))}
                                <th className="text-center text-xs font-bold text-neutral-500 py-3 px-3 min-w-[50px]">H</th>
                                <th className="text-center text-xs font-bold text-neutral-500 py-3 px-3 min-w-[50px]">%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filtered.map(student => (
                                <tr key={student.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="py-3 px-4 sticky left-0 bg-white z-10">
                                        <div className="flex items-center gap-2">
                                            <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random&color=fff&size=24`} alt="" width={24} height={24} className="rounded-full" />
                                            <span className="text-xs font-medium text-neutral-900 truncate">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3 text-xs text-neutral-500">{student.class}</td>
                                    {student.dailyStatuses.map((status, i) => {
                                        const st = STATUS_STYLES[status];
                                        const dot = status === 'hadir' ? '✓' : status === 'izin' ? 'I' : status === 'sakit' ? 'S' : 'A';
                                        return (
                                            <td key={i} className="py-3 px-1.5 text-center">
                                                <span className={clsx('inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold', st.bg, st.text)}>{dot}</span>
                                            </td>
                                        );
                                    })}
                                    <td className="py-3 px-3 text-center text-xs font-bold text-emerald-600">{student.stats.hadir}/{TOTAL_DTP_DAYS}</td>
                                    <td className="py-3 px-3 text-center">
                                        <span className={clsx('text-xs font-bold', student.percent >= 90 ? 'text-emerald-600' : student.percent >= 70 ? 'text-amber-600' : 'text-red-600')}>
                                            {student.percent}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Attendance Cards (Mobile) */}
            <div className="md:hidden space-y-3">
                {filtered.map(student => (
                    <div key={student.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random&color=fff&size=36`} alt="" width={36} height={36} className="rounded-full" />
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-neutral-900">{student.name}</h4>
                                <p className="text-xs text-neutral-500">{student.class}</p>
                            </div>
                            <span className={clsx('text-sm font-bold', student.percent >= 90 ? 'text-emerald-600' : student.percent >= 70 ? 'text-amber-600' : 'text-red-600')}>
                                {student.percent}%
                            </span>
                        </div>
                        <div className="flex gap-1 mb-3 flex-wrap">
                            {student.dailyStatuses.map((status, i) => {
                                const st = STATUS_STYLES[status];
                                const dot = status === 'hadir' ? '✓' : status === 'izin' ? 'I' : status === 'sakit' ? 'S' : 'A';
                                return (
                                    <div key={i} className="text-center">
                                        <span className={clsx('inline-flex items-center justify-center w-6 h-6 rounded text-[9px] font-bold', st.bg, st.text)}>{dot}</span>
                                        <p className="text-[8px] text-neutral-400 mt-0.5">{DTP_DATES[i].day.slice(0, 3)}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-emerald-50 rounded-lg p-1.5"><p className="text-xs font-bold text-emerald-600">{student.stats.hadir}</p><p className="text-[9px] text-neutral-400">Hadir</p></div>
                            <div className="bg-blue-50 rounded-lg p-1.5"><p className="text-xs font-bold text-blue-600">{student.stats.izin}</p><p className="text-[9px] text-neutral-400">Izin</p></div>
                            <div className="bg-amber-50 rounded-lg p-1.5"><p className="text-xs font-bold text-amber-600">{student.stats.sakit}</p><p className="text-[9px] text-neutral-400">Sakit</p></div>
                            <div className="bg-red-50 rounded-lg p-1.5"><p className="text-xs font-bold text-red-600">{student.stats.alpa}</p><p className="text-[9px] text-neutral-400">Alpa</p></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ========== MAIN COMPONENT ==========
export default function AttendancePage() {
    const { userRole } = useSidebar();
    const [students] = useState(generateAttendance);
    const isStudent = userRole === 'student';

    if (isStudent) {
        return <StudentAttendanceView students={students} />;
    }

    return <AdminAttendanceView students={students} />;
}
