'use client';

import { useState } from 'react';
import { Download, Calculator, DollarSign, Calendar, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';


const PAYROLL_DATA = [
    { id: 1, mentor: 'John Wick', role: 'Mentor Industri', sessions: 4, bonus: 0 },
    { id: 2, mentor: 'Tony Stark', role: 'Mentor Industri', sessions: 3, bonus: 150000 },
    { id: 3, mentor: 'Bruce Wayne', role: 'Guru Tamu', sessions: 2, bonus: 0 },
    { id: 4, mentor: 'Peter Parker', role: 'Asisten Mentor', sessions: 8, bonus: 50000 },
];

const AVAILABLE_MONTHS = ['Januari 2026', 'Februari 2026', 'Maret 2026', 'April 2026', 'Mei 2026', 'Juni 2026'];

export default function PayrollPage() {
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(1); // Default Februari
    const selectedMonth = AVAILABLE_MONTHS[selectedMonthIndex];
    const [honorRate, setHonorRate] = useState(300000);
    const [showConfig, setShowConfig] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // Dynamic Data Calculation
    const totalHonor = PAYROLL_DATA.reduce((acc, curr) => acc + (curr.sessions * honorRate) + curr.bonus, 0);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 1500);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Laporan Penggajian Mentor</h1>
                    <p className="text-neutral-500">Rekapitulasi honor berdasarkan validasi kehadiran & jurnal.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                    >
                        <Calculator className="h-4 w-4" />
                        {showConfig ? 'Sembunyikan Config' : 'Atur Tarif Honor'}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm max-w-sm mx-auto">
                <button
                    onClick={() => setSelectedMonthIndex(prev => Math.max(0, prev - 1))}
                    disabled={selectedMonthIndex === 0}
                    className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-30"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex-1 text-center font-bold text-lg text-neutral-900 flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-red-600" /> {selectedMonth}
                </div>
                <button
                    onClick={() => setSelectedMonthIndex(prev => Math.min(AVAILABLE_MONTHS.length - 1, prev + 1))}
                    disabled={selectedMonthIndex === AVAILABLE_MONTHS.length - 1}
                    className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-30"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            {/* Admin Configuration Panel */}
            {showConfig && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 animate-in slide-in-from-top-2">
                    <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-neutral-600" />
                        Konfigurasi Tahun Ajaran Baru
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Tarif Honor Pokok (per Sesi/Pertemuan)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">Rp</span>
                                <input
                                    type="number"
                                    value={honorRate}
                                    onChange={(e) => setHonorRate(Number(e.target.value))}
                                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none font-bold text-neutral-900"
                                />
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">
                                *Tarif ini disesuaikan dengan SK Tahun Ajaran Baru (Kenaikan +Rp 300.000).
                            </p>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleSync}
                                disabled={isSyncing}
                                className="w-full py-2 bg-white border border-neutral-300 rounded-lg text-neutral-700 font-bold hover:bg-neutral-50 flex items-center justify-center gap-2"
                            >
                                <Calendar className={clsx("h-4 w-4", isSyncing && "animate-spin")} />
                                {isSyncing ? 'Sinkronisasi Jurnal...' : 'Sync Data Kehadiran Jurnal'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <DollarSign className="h-24 w-24 text-blue-600" />
                    </div>
                    <p className="text-sm font-bold text-neutral-500 mb-1 uppercase tracking-wider">Total Honor</p>
                    <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
                        Rp {totalHonor.toLocaleString('id-ID')}
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                        <DollarSign className="h-3 w-3" />
                        Budget Aman
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-neutral-500 mb-1">Validasi Kehadiran</p>
                            <h2 className="text-3xl font-bold text-neutral-900">
                                {PAYROLL_DATA.reduce((acc, curr) => acc + curr.sessions, 0)} <span className="text-base font-normal text-neutral-500">Sesi</span>
                            </h2>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-neutral-500">
                        <span className="text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded">Verified</span>
                        <span className="ml-2">bersumber dari Jurnal Mengajar</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-100 shadow-sm">
                    <p className="text-sm font-medium text-red-800 mb-1">Rate Aktif (TA 2025/2026)</p>
                    <h2 className="text-3xl font-bold text-red-900">
                        Rp {honorRate.toLocaleString('id-ID')}
                    </h2>
                    <p className="mt-4 text-xs text-red-600 font-medium">
                        *Termasuk Insentif Transport & Makan
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                    <h3 className="font-bold text-neutral-900">Rincian Penerimaan Honor</h3>
                    <div className="text-sm text-neutral-500">
                        Periode: <span className="font-bold text-neutral-900">{selectedMonth}</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold">Nama Mentor</th>
                                <th className="px-6 py-4 font-bold">Role</th>
                                <th className="px-6 py-4 font-bold text-center">Jml Sesi</th>
                                <th className="px-6 py-4 font-bold text-right">Rate/Sesi</th>
                                <th className="px-6 py-4 font-bold text-right">Bonus</th>
                                <th className="px-6 py-4 font-bold text-right">Total Terima</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {PAYROLL_DATA.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/50 transition-colors border-b border-neutral-50 last:border-0">
                                    <td className="px-6 py-5 font-bold text-neutral-900 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 uppercase">
                                            {item.mentor.charAt(0)}
                                        </div>
                                        {item.mentor}
                                    </td>
                                    <td className="px-6 py-5 text-neutral-500 font-medium">{item.role}</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold bg-neutral-100 text-neutral-900 border border-neutral-200">
                                            {item.sessions} Sesi
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right text-neutral-600 font-mono">
                                        Rp {honorRate.toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-5 text-right font-mono">
                                        {item.bonus > 0 ? (
                                            <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                                                + Rp {item.bonus.toLocaleString('id-ID')}
                                            </span>
                                        ) : <span className="text-neutral-300">-</span>}
                                    </td>
                                    <td className="px-6 py-5 text-right font-bold text-lg text-neutral-900 font-mono">
                                        Rp {((item.sessions * honorRate) + item.bonus).toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-neutral-900 text-white">
                            <tr>
                                <td className="px-6 py-4 font-bold" colSpan={5}>Grand Total Transfer</td>
                                <td className="px-6 py-4 text-right font-bold text-lg">Rp {totalHonor.toLocaleString('id-ID')}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
