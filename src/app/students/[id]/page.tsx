'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft, TrendingUp, AlertTriangle, Clock, CheckCircle2,
    BarChart3, Briefcase, GraduationCap, Calendar, BookOpen,
    Award, ExternalLink, Github
} from 'lucide-react';
import clsx from 'clsx';
import { STUDENTS_DATA, Student } from '@/data/mockStudents';
import { analyzeStudent } from '@/utils/studentLogic';

// Mock extra data
const JOURNAL_HISTORY = [
    { id: 1, date: '2025-08-20', subject: 'Fiber Optic', topic: 'Komponen SKSO', category: 'green' as const, note: 'Siswa memahami materi dengan baik' },
    { id: 2, date: '2025-08-27', subject: 'Fiber Optic', topic: 'K3 Fiber Optic', category: 'green' as const, note: 'Praktik K3 sukses dilakukan' },
    { id: 3, date: '2025-09-03', subject: 'Web Development', topic: 'HTML & CSS Basics', category: 'green' as const, note: 'Mengerjakan tugas dengan baik' },
    { id: 4, date: '2025-09-10', subject: 'Fiber Optic', topic: 'Instalasi Kabel', category: 'yellow' as const, note: 'Perlu perbaikan teknik kupas kabel' },
    { id: 5, date: '2025-09-17', subject: 'Web Development', topic: 'JavaScript Fundamentals', category: 'green' as const, note: 'Mengerti konsep variabel dan fungsi' },
    { id: 6, date: '2025-10-01', subject: 'Fiber Optic', topic: 'Splicing Dasar', category: 'yellow' as const, note: 'Masih perlu latihan penyambungan' },
    { id: 7, date: '2025-10-08', subject: 'UI/UX Design', topic: 'Figma Basics', category: 'green' as const, note: 'Desain UI pertama berhasil' },
    { id: 8, date: '2025-10-15', subject: 'Web Development', topic: 'React.js Intro', category: 'red' as const, note: 'Kesulitan memahami state management' },
];

const MOCK_PROJECTS = [
    { id: 1, title: 'E-Commerce Dashboard', tags: ['React', 'Tailwind'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'IoT Monitoring App', tags: ['Flutter', 'MQTT'], image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=400' },
];

const MOCK_COMPETITIONS = [
    { id: 1, name: 'LKS Web Technology 2026', status: 'Terdaftar', date: 'Mar 2026' },
    { id: 2, name: 'Hackathon IoT Challenge', status: 'Selesai - Juara 2', date: 'Nov 2025' },
];

const ATTENDANCE_MONTHS = [
    { month: 'Agu', value: 100 }, { month: 'Sep', value: 95 }, { month: 'Okt', value: 90 },
    { month: 'Nov', value: 88 }, { month: 'Des', value: 92 }, { month: 'Jan', value: 96 },
];

const categoryColor = { green: 'bg-emerald-500', yellow: 'bg-amber-400', red: 'bg-red-500' };
const categoryLabel = { green: 'Baik', yellow: 'Perlu Perbaikan', red: 'Kritis' };

export default function StudentDetailPage() {
    const params = useParams();
    const studentId = params.id as string;
    const student = STUDENTS_DATA.find(s => s.id === studentId);
    const [activeTab, setActiveTab] = useState<'overview' | 'journal' | 'portfolio' | 'competitions'>('overview');

    if (!student) {
        return (
            <div className="max-w-6xl mx-auto py-20 text-center">
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Siswa tidak ditemukan</h2>
                <p className="text-neutral-500 mb-6">ID siswa "{studentId}" tidak valid.</p>
                <Link href="/students" className="text-brand-red font-bold hover:underline">← Kembali ke Student Mapping</Link>
            </div>
        );
    }

    const analysis = analyzeStudent(student);
    const totalJournal = student.journal.green + student.journal.yellow + student.journal.red;
    const greenPct = totalJournal > 0 ? Math.round((student.journal.green / totalJournal) * 100) : 0;
    const yellowPct = totalJournal > 0 ? Math.round((student.journal.yellow / totalJournal) * 100) : 0;
    const redPct = totalJournal > 0 ? Math.round((student.journal.red / totalJournal) * 100) : 0;

    const catStyles = {
        Fast: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: TrendingUp },
        Middle: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
        Slow: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: AlertTriangle },
    };
    const style = catStyles[analysis.category];
    const CatIcon = style.icon;

    const tabs = [
        { key: 'overview' as const, label: 'Overview' },
        { key: 'journal' as const, label: `Jurnal (${totalJournal})` },
        { key: 'portfolio' as const, label: `Portfolio (${student.projectCount})` },
        { key: 'competitions' as const, label: 'Kompetisi' },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Back Button */}
            <Link href="/students" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-red font-medium mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Kembali ke Student Mapping
            </Link>

            {/* Profile Header */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
                <div className="h-24 md:h-32 bg-gradient-to-r from-brand-red to-brand-dark relative" />
                <div className="px-4 md:px-6 pb-5 -mt-10 md:-mt-12">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white shrink-0">
                            <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random&color=fff&size=200`} alt={student.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 pt-2">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h1 className="text-xl md:text-2xl font-bold text-neutral-900">{student.name}</h1>
                                <span className={clsx('px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold border', style.bg, style.text, style.border)}>
                                    <CatIcon className="h-3 w-3 inline mr-1" />{analysis.category} Learner
                                </span>
                                {analysis.isReadyToHire && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                        ✓ Ready to Hire
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-neutral-500">{student.class} • {analysis.reason}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                {[
                    { label: 'Kehadiran', value: `${student.attendance}%`, icon: Calendar, color: student.attendance >= 90 ? 'text-emerald-600' : 'text-amber-600', bg: student.attendance >= 90 ? 'bg-emerald-50' : 'bg-amber-50' },
                    { label: 'Rata-rata Nilai', value: student.avgScore.toString(), icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Total Project', value: student.projectCount.toString(), icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Readiness Score', value: analysis.readinessScore.toString(), icon: TrendingUp, color: 'text-brand-red', bg: 'bg-red-50' },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={clsx('p-1.5 rounded-lg', stat.bg)}><Icon className={clsx('h-4 w-4', stat.color)} /></div>
                                <span className="text-[10px] md:text-xs font-medium text-neutral-500">{stat.label}</span>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-neutral-900">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl border border-neutral-200 shadow-sm p-1 mb-6 overflow-x-auto">
                {tabs.map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={clsx('px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                            activeTab === tab.key ? 'bg-brand-red text-white shadow-sm' : 'text-neutral-600 hover:bg-neutral-50'
                        )}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Attendance Chart */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2"><Calendar className="h-4 w-4 text-brand-red" /> Tren Kehadiran</h3>
                        <div className="flex items-end gap-3 h-40">
                            {ATTENDANCE_MONTHS.map((m) => (
                                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] font-bold text-neutral-500">{m.value}%</span>
                                    <div className="w-full bg-neutral-100 rounded-t-lg relative" style={{ height: '120px' }}>
                                        <div className={clsx('absolute bottom-0 left-0 right-0 rounded-t-lg transition-all', m.value >= 90 ? 'bg-emerald-400' : m.value >= 75 ? 'bg-amber-400' : 'bg-red-400')}
                                            style={{ height: `${m.value}%` }} />
                                    </div>
                                    <span className="text-[10px] font-medium text-neutral-400">{m.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Journal Breakdown */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2"><BookOpen className="h-4 w-4 text-brand-red" /> Distribusi Jurnal</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Baik (Green)', count: student.journal.green, pct: greenPct, color: 'bg-emerald-500' },
                                { label: 'Perbaikan (Yellow)', count: student.journal.yellow, pct: yellowPct, color: 'bg-amber-400' },
                                { label: 'Kritis (Red)', count: student.journal.red, pct: redPct, color: 'bg-red-500' },
                            ].map((item) => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-neutral-700">{item.label}</span>
                                        <span className="text-neutral-500">{item.count} ({item.pct}%)</span>
                                    </div>
                                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className={clsx('h-full rounded-full transition-all', item.color)} style={{ width: `${item.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
                            <span className="text-sm text-neutral-500">Total: <strong className="text-neutral-900">{totalJournal}</strong> entries</span>
                        </div>
                    </div>

                    {/* Readiness Breakdown */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 lg:col-span-2">
                        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-brand-red" /> Industrial Readiness Breakdown</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Kehadiran ≥ 90%', met: student.attendance >= 90, value: `${student.attendance}%` },
                                { label: 'Green ≥ 80%', met: greenPct >= 80, value: `${greenPct}%` },
                                { label: 'Avg Score ≥ 85', met: student.avgScore >= 85, value: student.avgScore.toString() },
                                { label: 'Project ≥ 2', met: student.projectCount >= 2, value: student.projectCount.toString() },
                            ].map((crit) => (
                                <div key={crit.label} className={clsx('p-3 rounded-lg border text-center', crit.met ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')}>
                                    <div className="mb-1">{crit.met ? <CheckCircle2 className="h-5 w-5 text-emerald-600 mx-auto" /> : <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />}</div>
                                    <p className="text-lg font-bold text-neutral-900">{crit.value}</p>
                                    <p className="text-[10px] text-neutral-500">{crit.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'journal' && (
                <div className="space-y-3">
                    {JOURNAL_HISTORY.map((entry) => (
                        <div key={entry.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 flex items-start gap-3">
                            <div className={clsx('w-3 h-3 rounded-full mt-1.5 shrink-0', categoryColor[entry.category])} />
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-neutral-400">{entry.date}</span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-600">{entry.subject}</span>
                                    <span className={clsx('px-2 py-0.5 rounded text-[10px] font-bold', entry.category === 'green' ? 'bg-emerald-100 text-emerald-700' : entry.category === 'yellow' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>
                                        {categoryLabel[entry.category]}
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-neutral-900">{entry.topic}</h4>
                                <p className="text-xs text-neutral-500 mt-1">{entry.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'portfolio' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {student.projectCount > 0 ? MOCK_PROJECTS.slice(0, student.projectCount).map((project) => (
                        <div key={project.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden group">
                            <div className="relative h-40 bg-neutral-100">
                                <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="p-4">
                                <h4 className="text-sm font-bold text-neutral-900 mb-2">{project.title}</h4>
                                <div className="flex flex-wrap gap-1">
                                    {project.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px] font-medium">{tag}</span>)}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="md:col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-neutral-200">
                            <Briefcase className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
                            <p className="text-neutral-500">Belum ada project portfolio</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'competitions' && (
                <div className="space-y-3">
                    {MOCK_COMPETITIONS.map((comp) => (
                        <div key={comp.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 flex items-center gap-4">
                            <div className="p-2 bg-amber-50 rounded-lg"><Award className="h-5 w-5 text-amber-600" /></div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-neutral-900">{comp.name}</h4>
                                <p className="text-xs text-neutral-500">{comp.date}</p>
                            </div>
                            <span className={clsx('px-3 py-1 rounded-full text-xs font-bold', comp.status.includes('Juara') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700')}>
                                {comp.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
