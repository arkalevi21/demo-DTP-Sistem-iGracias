'use client';

import { useState } from 'react';
import { BarChart3, Users, TrendingUp, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';
import clsx from 'clsx';

// Types
type Subject = 'Fiber Optic' | 'Web Development' | 'IoT System';

type StudentReport = {
    id: number;
    name: string;
    class: string;
    attendance: number;
    avgScore: number;
    status: 'Lulus' | 'Remidi' | 'Warning';
};

// Mock Data Source
const MOCK_DATA: Record<Subject, StudentReport[]> = {
    'Fiber Optic': [
        { id: 1, name: 'Arka Levi', class: 'XI TJKT 1', attendance: 98, avgScore: 92, status: 'Lulus' },
        { id: 2, name: 'Budi Santoso', class: 'XI TJKT 1', attendance: 85, avgScore: 78, status: 'Lulus' },
        { id: 3, name: 'Charlie Puth', class: 'XI TJKT 2', attendance: 65, avgScore: 45, status: 'Warning' },
        { id: 4, name: 'Doni Tata', class: 'XI TJKT 1', attendance: 72, avgScore: 60, status: 'Remidi' },
        { id: 5, name: 'Eka Gustiwana', class: 'XI TJKT 2', attendance: 90, avgScore: 88, status: 'Lulus' },
    ],
    'Web Development': [
        { id: 1, name: 'Sarah Connor', class: 'XI RPL 1', attendance: 95, avgScore: 94, status: 'Lulus' },
        { id: 2, name: 'John Doe', class: 'XI RPL 1', attendance: 92, avgScore: 85, status: 'Lulus' },
        { id: 3, name: 'Jane Smith', class: 'XI RPL 2', attendance: 88, avgScore: 82, status: 'Lulus' },
        { id: 4, name: 'Michael Ross', class: 'XI RPL 2', attendance: 70, avgScore: 55, status: 'Remidi' },
    ],
    'IoT System': [
        { id: 1, name: 'Harvey Specter', class: 'XI SIJA 1', attendance: 96, avgScore: 90, status: 'Lulus' },
        { id: 2, name: 'Mike Ross', class: 'XI SIJA 1', attendance: 80, avgScore: 75, status: 'Lulus' },
        { id: 3, name: 'Rachel Zane', class: 'XI SIJA 1', attendance: 92, avgScore: 88, status: 'Lulus' },
    ]
};

export default function ReportsPage() {
    const [selectedSubject, setSelectedSubject] = useState<Subject>('Fiber Optic');
    const [searchTerm, setSearchTerm] = useState('');

    const students = MOCK_DATA[selectedSubject];
    const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Stats Calculation
    const avgAttendance = Math.round(students.reduce((acc, curr) => acc + curr.attendance, 0) / students.length);
    const avgScore = Math.round(students.reduce((acc, curr) => acc + curr.avgScore, 0) / students.length);
    const passRate = Math.round((students.filter(s => s.status === 'Lulus').length / students.length) * 100);
    const warningCount = students.filter(s => s.status === 'Warning' || s.status === 'Remidi').length;

    return (
        <div className="space-y-8">
            {/* Header & Filter */}
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-red-600" />
                        Laporan Bidang Studi
                    </h1>
                    <p className="text-neutral-500">Analisa performa siswa per mata pelajaran DTP.</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-neutral-500">Pilih Bidang:</span>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value as Subject)}
                        className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-bold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="Fiber Optic">Fiber Optic</option>
                        <option value="Web Development">Web Development</option>
                        <option value="IoT System">IoT System</option>
                    </select>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg"><Users className="h-5 w-5 text-blue-600" /></div>
                        <p className="text-sm font-bold text-neutral-500">Total Siswa</p>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{students.length}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-100 rounded-lg"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
                        <p className="text-sm font-bold text-neutral-500">Pass Rate</p>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{passRate}%</p>
                    <p className="text-xs text-emerald-600 font-bold">Lulus Kompetensi</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded-lg"><TrendingUp className="h-5 w-5 text-orange-600" /></div>
                        <p className="text-sm font-bold text-neutral-500">Rata-rata Nilai</p>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{avgScore}</p>
                    <div className="w-full bg-neutral-100 h-1.5 rounded-full mt-2">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${avgScore}%` }}></div>
                    </div>
                </div>

                <div className={clsx("bg-white p-6 rounded-xl border shadow-sm", warningCount > 0 ? "border-red-200 bg-red-50" : "border-neutral-200")}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-lg"><AlertCircle className={clsx("h-5 w-5", warningCount > 0 ? "text-red-600" : "text-neutral-400")} /></div>
                        <p className={clsx("text-sm font-bold", warningCount > 0 ? "text-red-700" : "text-neutral-500")}>Perlu Perhatian</p>
                    </div>
                    <p className={clsx("text-3xl font-bold", warningCount > 0 ? "text-red-700" : "text-neutral-900")}>{warningCount}</p>
                    <p className="text-xs text-neutral-500 font-medium">Siswa (Remidi/Warning)</p>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="font-bold text-lg text-neutral-900">Detail Performa Siswa</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Cari siswa..."
                            className="pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase text-neutral-500 font-bold tracking-wider">
                                <th className="px-6 py-4">Nama Siswa</th>
                                <th className="px-6 py-4">Kelas</th>
                                <th className="px-6 py-4 text-center">Kehadiran</th>
                                <th className="px-6 py-4 text-center">Nilai Rata-rata</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-neutral-900 text-sm">{student.name}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-600 whitespace-nowrap">{student.class}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={clsx("px-2 py-1 rounded text-xs font-bold",
                                                student.attendance >= 90 ? "bg-emerald-100 text-emerald-700" :
                                                    student.attendance >= 75 ? "bg-neutral-100 text-neutral-700" : "bg-red-100 text-red-700"
                                            )}>
                                                {student.attendance}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-bold text-neutral-900">{student.avgScore}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={clsx("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                                                student.status === 'Lulus' ? "bg-white border-emerald-200 text-emerald-700" :
                                                    student.status === 'Remidi' ? "bg-white border-red-200 text-red-700" :
                                                        "bg-white border-amber-200 text-amber-700"
                                            )}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-xs font-bold text-blue-600 hover:underline">Detail</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                                        Tidak ada data siswa ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
