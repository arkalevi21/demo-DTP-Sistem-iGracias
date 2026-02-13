'use client';

import { useState } from 'react';
import {
    Search,
    TrendingUp,
    AlertTriangle,
    Clock,
    CheckCircle2,
    MoreHorizontal,
    User,
    Briefcase,
    BarChart3,
    X
} from 'lucide-react';
import clsx from 'clsx';
import { STUDENTS_DATA } from '@/data/mockStudents';
import { analyzeStudent, LearnerCategory } from '@/utils/studentLogic';
import Image from 'next/image';

export default function StudentMappingPage() {
    const [filter, setFilter] = useState<'All' | LearnerCategory | 'Ready'>('All');
    const [search, setSearch] = useState('');

    // Process Students with Logic
    const processedStudents = STUDENTS_DATA.map(student => {
        const analysis = analyzeStudent(student);
        return { ...student, ...analysis };
    });

    // Filter Logic
    const filteredStudents = processedStudents.filter(student => {
        const matchesFilter =
            filter === 'All' ? true :
                filter === 'Ready' ? student.isReadyToHire :
                    student.category === filter;

        const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Stats Calculation
    const counts = {
        Fast: processedStudents.filter(s => s.category === 'Fast').length,
        Middle: processedStudents.filter(s => s.category === 'Middle').length,
        Slow: processedStudents.filter(s => s.category === 'Slow').length,
        Ready: processedStudents.filter(s => s.isReadyToHire).length,
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Student Mapping Intelligence</h1>
                    <p className="text-neutral-500">Analisis otomatis performa siswa berbasis data jurnal & absensi.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 shadow-sm">
                        Export Laporan
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow-sm shadow-red-200">
                        Sync Data Terbaru
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Fast Card */}
                <div
                    onClick={() => setFilter('Fast')}
                    className={clsx(
                        "p-6 rounded-xl border shadow-sm relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02]",
                        filter === 'Fast' ? "border-emerald-500 ring-2 ring-emerald-500 bg-emerald-50" : "bg-white border-neutral-200 hover:border-emerald-300"
                    )}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp className="h-24 w-24 text-emerald-600" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-500 mb-1 uppercase tracking-wider">Fast Learners</h3>
                    <p className="text-4xl font-black text-neutral-900">{counts.Fast}</p>
                    <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Qualified for Competition Track
                    </p>
                </div>

                {/* Middle Card */}
                <div
                    onClick={() => setFilter('Middle')}
                    className={clsx(
                        "p-6 rounded-xl border shadow-sm relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02]",
                        filter === 'Middle' ? "border-amber-500 ring-2 ring-amber-500 bg-amber-50" : "bg-white border-neutral-200 hover:border-amber-300"
                    )}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Clock className="h-24 w-24 text-amber-500" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-500 mb-1 uppercase tracking-wider">Middle Learners</h3>
                    <p className="text-4xl font-black text-neutral-900">{counts.Middle}</p>
                    <p className="text-xs text-amber-700 font-bold mt-2 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Perlu maintain konsistensi
                    </p>
                </div>

                {/* Slow Card */}
                <div
                    onClick={() => setFilter('Slow')}
                    className={clsx(
                        "p-6 rounded-xl border shadow-sm relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02]",
                        filter === 'Slow' ? "border-red-500 ring-2 ring-red-500 bg-red-50" : "bg-white border-neutral-200 hover:border-red-300"
                    )}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle className="h-24 w-24 text-red-500" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-500 mb-1 uppercase tracking-wider">Slow Learners</h3>
                    <p className="text-4xl font-black text-neutral-900">{counts.Slow}</p>
                    <p className="text-xs text-red-700 font-bold mt-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Wajib Recovery Clinic
                    </p>
                </div>
            </div>

            {/* Industrial Readiness Banner */}
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Briefcase className="h-40 w-40 text-white" />
                </div>
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded bg-amber-500 text-black text-xs font-bold uppercase tracking-wider">
                                New Feature
                            </span>
                            <span className="text-neutral-400 text-sm font-medium">Industrial Readiness Tracker</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Siap Kerja: {counts.Ready} Siswa Qualified</h2>
                        <p className="text-neutral-300 max-w-xl">
                            Sistem mendeteksi siswa yang memenuhi standar industri berdasarkan absensi (90%+),
                            green flags (80%+), dan performa project.
                        </p>
                    </div>
                    <button
                        onClick={() => setFilter('Ready')}
                        className="px-6 py-3 bg-white text-neutral-900 font-bold rounded-lg hover:bg-neutral-100 transition-colors shadow-lg flex items-center gap-2"
                    >
                        <Briefcase className="h-5 w-5 text-amber-600" />
                        Lihat Kandidat Siap Kerja
                    </button>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Cari nama siswa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow"
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto ml-auto">
                    {(['All', 'Fast', 'Middle', 'Slow'] as const).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all",
                                filter === cat
                                    ? "bg-neutral-900 text-white shadow-md transform scale-105"
                                    : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                    {filter !== 'All' && (
                        <button
                            onClick={() => { setFilter('All'); setSearch('') }}
                            className="px-3 py-2 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-1"
                        >
                            <X className="h-3 w-3" /> Reset
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Nama Siswa</th>
                                <th className="px-6 py-4 font-bold text-center">Kehadiran</th>
                                <th className="px-6 py-4 font-bold text-center">Jurnal (H/K/M)</th>
                                <th className="px-6 py-4 font-bold">Analisis Sistem</th>
                                <th className="px-6 py-4 font-bold text-center">Readiness Score</th>
                                <th className="px-6 py-4 font-bold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-neutral-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-neutral-200 relative overflow-hidden ring-2 ring-white shadow-sm">
                                                <Image
                                                    src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random`}
                                                    alt={student.name} fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-neutral-900">{student.name}</div>
                                                <div className="text-xs text-neutral-500">{student.class}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={clsx(
                                            "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold",
                                            student.attendance >= 90 ? "bg-green-100 text-green-700" :
                                                student.attendance >= 75 ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-red-100 text-red-700"
                                        )}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-1 text-xs font-medium">
                                            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100" title="Hijau">{student.journal.green}</span>
                                            <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100" title="Kuning">{student.journal.yellow}</span>
                                            <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100" title="Merah">{student.journal.red}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={clsx(
                                                "inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                student.category === 'Fast' ? "bg-emerald-100 text-emerald-700" :
                                                    student.category === 'Middle' ? "bg-amber-100 text-amber-700" :
                                                        "bg-red-100 text-red-700"
                                            )}>
                                                <span className={clsx("h-2 w-2 rounded-full",
                                                    student.category === 'Fast' ? "bg-emerald-600" :
                                                        student.category === 'Middle' ? "bg-amber-600" :
                                                            "bg-red-600"
                                                )} />
                                                {student.category}
                                            </span>
                                            <span className="text-[10px] text-neutral-400 font-medium">
                                                {student.reason}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="relative h-10 w-10 flex items-center justify-center">
                                                <svg className="h-full w-full -rotate-90 text-neutral-200" viewBox="0 0 36 36">
                                                    <path className="stroke-current" fill="none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                    <path
                                                        className={clsx("stroke-current transition-all duration-1000 ease-out",
                                                            student.readinessScore >= 80 ? "text-amber-500" :
                                                                student.readinessScore >= 60 ? "text-blue-500" : "text-neutral-400"
                                                        )}
                                                        strokeDasharray={`${student.readinessScore}, 100`}
                                                        fill="none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                </svg>
                                                <span className="absolute text-[10px] font-bold text-neutral-700">{student.readinessScore}</span>
                                            </div>
                                            {student.isReadyToHire && (
                                                <span className="px-1.5 py-0.5 rounded-[4px] bg-amber-100 text-amber-700 text-[9px] font-bold uppercase border border-amber-200">
                                                    Siap Kerja
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-white border border-transparent hover:border-neutral-200 hover:shadow-sm transition-all">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStudents.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <User className="h-12 w-12 text-neutral-200 mb-4" />
                        <h3 className="text-lg font-bold text-neutral-900">Tidak ada data ditemukan</h3>
                        <p className="text-neutral-500">Coba ubah filter atau kata kunci pencarian.</p>
                        <button
                            onClick={() => { setFilter('All'); setSearch('') }}
                            className="mt-4 text-sm font-bold text-red-600 hover:underline"
                        >
                            Reset Filter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
