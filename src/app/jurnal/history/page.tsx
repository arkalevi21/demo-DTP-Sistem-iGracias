'use client';

import { useState } from 'react';
import { BookOpen, Calendar, Filter, Search, ChevronDown, Users, CheckCircle2, FileText, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

const SUBJECTS = ['Semua', 'Fiber Optic', 'Web Development', 'UI/UX Design', 'Videography', 'Digital Marketing'];
const SESSION_TYPES = ['Semua', 'Attendance', 'Review'];

const JOURNAL_ENTRIES = [
    {
        id: 1, date: '2025-10-15', subject: 'Fiber Optic', topic: 'Splicing Lanjutan',
        sessionType: 'attendance' as const, mentor: 'Pak Adi', mentorAvatar: 'Adi+Nugroho',
        attendanceCount: 24, totalStudents: 25, notes: 'Praktek penyambungan FO core berhasil. 1 siswa izin sakit.',
        category: 'green' as const
    },
    {
        id: 2, date: '2025-10-14', subject: 'Web Development', topic: 'React State Management',
        sessionType: 'review' as const, mentor: 'Bu Rina', mentorAvatar: 'Rina+Wati',
        reviewScore: 78, reviewCategory: 'yellow' as const,
        notes: 'Beberapa siswa masih kesulitan dengan useEffect. Perlu review ulang.',
        category: 'yellow' as const
    },
    {
        id: 3, date: '2025-10-12', subject: 'Fiber Optic', topic: 'K3 Safety Drill',
        sessionType: 'attendance' as const, mentor: 'Pak Adi', mentorAvatar: 'Adi+Nugroho',
        attendanceCount: 25, totalStudents: 25, notes: 'Semua siswa hadir. Safety drill berjalan lancar.',
        category: 'green' as const
    },
    {
        id: 4, date: '2025-10-10', subject: 'UI/UX Design', topic: 'Usability Testing',
        sessionType: 'review' as const, mentor: 'Bu Susi', mentorAvatar: 'Susi+Susanti',
        reviewScore: 85, reviewCategory: 'green' as const,
        notes: 'Hasil usability testing prototype siswa sangat baik.',
        category: 'green' as const
    },
    {
        id: 5, date: '2025-10-08', subject: 'Digital Marketing', topic: 'Google Analytics',
        sessionType: 'attendance' as const, mentor: 'Pak Bagus', mentorAvatar: 'Bagus+Santoso',
        attendanceCount: 22, totalStudents: 25, notes: '3 siswa tidak hadir tanpa keterangan.',
        category: 'red' as const
    },
    {
        id: 6, date: '2025-10-05', subject: 'Web Development', topic: 'API Integration',
        sessionType: 'attendance' as const, mentor: 'Bu Rina', mentorAvatar: 'Rina+Wati',
        attendanceCount: 24, totalStudents: 25, notes: 'Berhasil integrasikan REST API ke project.',
        category: 'green' as const
    },
    {
        id: 7, date: '2025-10-03', subject: 'Fiber Optic', topic: 'Terminasi ODC',
        sessionType: 'review' as const, mentor: 'Pak David', mentorAvatar: 'David+Beck',
        reviewScore: 60, reviewCategory: 'red' as const,
        notes: 'Sebagian besar siswa belum memenuhi standar terminasi. Perlu sesi tambahan.',
        category: 'red' as const
    },
    {
        id: 8, date: '2025-10-01', subject: 'Videography', topic: 'Color Grading',
        sessionType: 'attendance' as const, mentor: 'Pak Bagus', mentorAvatar: 'Bagus+Santoso',
        attendanceCount: 25, totalStudents: 25, notes: 'Materi color grading DaVinci Resolve.',
        category: 'green' as const
    },
];

const categoryStyles = {
    green: { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', label: 'Baik' },
    yellow: { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400', label: 'Perbaikan' },
    red: { badge: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'Kritis' },
};

export default function JurnalHistoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('Semua');
    const [selectedType, setSelectedType] = useState('Semua');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const filteredEntries = JOURNAL_ENTRIES.filter(entry => {
        const matchesSearch = entry.topic.toLowerCase().includes(searchQuery.toLowerCase()) || entry.mentor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubject === 'Semua' || entry.subject === selectedSubject;
        const matchesType = selectedType === 'Semua' || entry.sessionType === selectedType.toLowerCase();
        return matchesSearch && matchesSubject && matchesType;
    });

    const greenCount = JOURNAL_ENTRIES.filter(e => e.category === 'green').length;
    const yellowCount = JOURNAL_ENTRIES.filter(e => e.category === 'yellow').length;
    const redCount = JOURNAL_ENTRIES.filter(e => e.category === 'red').length;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <Link href="/jurnal" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-red font-medium mb-4 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Kembali ke Input Jurnal
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Riwayat Jurnal</h1>
                    <p className="text-neutral-500 text-sm">Semua jurnal mengajar yang telah disubmit</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                    <p className="text-xs font-medium text-neutral-500 mb-1">Total Jurnal</p>
                    <p className="text-2xl font-bold text-neutral-900">{JOURNAL_ENTRIES.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                    <p className="text-xs font-medium text-neutral-500 mb-1 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Baik</p>
                    <p className="text-2xl font-bold text-emerald-600">{greenCount}</p>
                </div>
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                    <p className="text-xs font-medium text-neutral-500 mb-1 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Perbaikan</p>
                    <p className="text-2xl font-bold text-amber-600">{yellowCount}</p>
                </div>
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                    <p className="text-xs font-medium text-neutral-500 mb-1 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Kritis</p>
                    <p className="text-2xl font-bold text-red-600">{redCount}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Cari topik atau mentor..."
                        className="w-full h-10 pl-10 pr-4 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
                </div>
                <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}
                    className="h-10 px-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-brand-red">
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
                    className="h-10 px-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-700 outline-none focus:border-brand-red">
                    {SESSION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Journal List */}
            <div className="space-y-3">
                {filteredEntries.map(entry => {
                    const s = categoryStyles[entry.category];
                    const isExpanded = expandedId === entry.id;
                    return (
                        <div key={entry.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setExpandedId(isExpanded ? null : entry.id)}>
                            <div className="p-4 flex items-start gap-3">
                                <div className={clsx('w-3 h-3 rounded-full mt-1.5 shrink-0', s.dot)} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="text-xs text-neutral-400 font-medium">{entry.date}</span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-600">{entry.subject}</span>
                                        <span className={clsx('px-2 py-0.5 rounded text-[10px] font-bold', entry.sessionType === 'attendance' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700')}>
                                            {entry.sessionType === 'attendance' ? 'Kehadiran' : 'Review'}
                                        </span>
                                        <span className={clsx('px-2 py-0.5 rounded text-[10px] font-bold', s.badge)}>{s.label}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-neutral-900">{entry.topic}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Image src={`https://ui-avatars.com/api/?name=${entry.mentorAvatar}&background=random&color=fff&size=20`} alt="" width={16} height={16} className="rounded-full" />
                                        <span className="text-xs text-neutral-500">{entry.mentor}</span>
                                        {entry.sessionType === 'attendance' && (
                                            <span className="text-xs text-neutral-400 ml-2 flex items-center gap-1"><Users className="h-3 w-3" />{entry.attendanceCount}/{entry.totalStudents}</span>
                                        )}
                                        {entry.sessionType === 'review' && entry.reviewScore !== undefined && (
                                            <span className="text-xs text-neutral-400 ml-2">Skor: {entry.reviewScore}%</span>
                                        )}
                                    </div>
                                </div>
                                <ChevronDown className={clsx('h-4 w-4 text-neutral-400 shrink-0 transition-transform', isExpanded && 'rotate-180')} />
                            </div>
                            {isExpanded && (
                                <div className="px-4 pb-4 pt-0 border-t border-neutral-100 mx-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="pt-3">
                                        <p className="text-xs font-bold text-neutral-500 mb-1">Catatan Mentor:</p>
                                        <p className="text-sm text-neutral-700 leading-relaxed">{entry.notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredEntries.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-neutral-200">
                        <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                        <p className="text-neutral-500 font-medium">Tidak ada jurnal ditemukan</p>
                        <p className="text-xs text-neutral-400 mt-1">Coba ubah filter pencarian</p>
                    </div>
                )}
            </div>
        </div>
    );
}
