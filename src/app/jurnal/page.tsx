'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Calendar as CalendarIcon, Users, Trophy, Activity, ClipboardList, ArrowRight, ChevronLeft, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import { INITIAL_FO_SCHEDULE, MONTHS } from '@/data/schedule';

type SessionType = 'regular' | 'review';

type Student = {
    id: string;
    name: string;
    avatar: string;
};

const MOCK_STUDENTS: Student[] = [
    { id: '1', name: 'Ahmad Rizky', avatar: 'Ahmad+Rizky' },
    { id: '2', name: 'Budi Santoso', avatar: 'Budi+Santoso' },
    { id: '3', name: 'Citra Dewi', avatar: 'Citra+Dewi' },
    { id: '4', name: 'Dian Permata', avatar: 'Dian+Permata' },
    { id: '5', name: 'Eko Prasetyo', avatar: 'Eko+Prasetyo' },
];

const DTP_SUBJECTS = [
    'Fiber Optic',
    'Web Development',
    'UI/UX Design',
    'Videography',
    'Digital Marketing',
    'Game Development'
];

export default function JurnalPage() {
    const [step, setStep] = useState(1);
    const [sessionType, setSessionType] = useState<SessionType>('regular');
    const [submitted, setSubmitted] = useState(false);

    // Form States
    const [selectedSubject, setSelectedSubject] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [topic, setTopic] = useState('');
    const [notes, setNotes] = useState('');
    const [isAutoFilled, setIsAutoFilled] = useState(false);

    // Smart Jurnal: Auto-fetch Topic based on Date & Subject
    // KF-14 Implementation
    useEffect(() => {
        if (selectedSubject === 'Fiber Optic' && date) {
            const dateObj = new Date(date);
            const day = dateObj.getDate();
            const monthIdx = dateObj.getMonth(); // 0-11
            const year = dateObj.getFullYear();

            // Simple Week Calculation (1-4)
            const week = Math.ceil(day / 7);

            // Construct Month Key (e.g. "Agustus 2025")
            // Note: Our mock data starts from Aug 2025. 
            // For demo purposes, we map correctly if within range, else default/ignore.
            const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const monthKey = `${monthNames[monthIdx]} ${year}`;

            const monthlySchedule = INITIAL_FO_SCHEDULE[monthKey];

            if (monthlySchedule) {
                // Find topic for this week
                const activeTopic = monthlySchedule.find(t => t.weeks.includes(week));
                if (activeTopic) {
                    setTopic(activeTopic.topic);
                    setNotes(`Fokus: ${activeTopic.goal}. Asesmen: ${activeTopic.assessment}`);
                    setIsAutoFilled(true);

                    // Reset auto-filled flag after animation
                    setTimeout(() => setIsAutoFilled(false), 3000);
                } else {
                    // Reset if no specific topic for this week (optional, or keep previous)
                    // setTopic(''); 
                }
            }
        }
    }, [date, selectedSubject]);

    // Regular Session State
    const [attendance, setAttendance] = useState<Record<string, string>>({});

    // Review Session State
    const [competency, setCompetency] = useState<Record<string, 'hijau' | 'kuning' | 'merah'>>({});
    const [portfolio, setPortfolio] = useState<Record<string, 'not_started' | 'in_progress' | 'done'>>({});
    const [candidates, setCandidates] = useState<Record<string, boolean>>({});
    const [recovery, setRecovery] = useState<Record<string, boolean>>({});

    const handleNextStep = () => {
        if (selectedSubject && date) {
            setStep(2);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setStep(1); // Reset to start
            // Reset logic could go here
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Step 1: Session Setup */}
            {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-neutral-900">Mulai Sesi Baru</h1>
                        <p className="text-neutral-500">Pilih mata pelajaran dan tanggal pertemuan untuk melanjutkan.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Subject Selection */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-4">Pilih Bidang DTP</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {DTP_SUBJECTS.map((subject) => (
                                    <button
                                        key={subject}
                                        onClick={() => setSelectedSubject(subject)}
                                        className={clsx(
                                            "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02]",
                                            selectedSubject === subject
                                                ? "border-red-600 bg-red-50 text-red-700 shadow-md"
                                                : "border-neutral-200 bg-white hover:border-red-200 text-neutral-600"
                                        )}
                                    >
                                        <div className={clsx(
                                            "p-2 rounded-lg",
                                            selectedSubject === subject ? "bg-red-200 text-red-700" : "bg-neutral-100 text-neutral-500"
                                        )}>
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <span className="font-semibold">{subject}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="max-w-xs">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Tanggal Pertemuan</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-neutral-200">
                            <button
                                onClick={handleNextStep}
                                disabled={!selectedSubject || !date}
                                className="flex items-center justify-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-200"
                            >
                                Lanjut Isi Jurnal <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Main Form */}
            {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                    <button
                        onClick={() => setStep(1)}
                        className="flex items-center text-sm text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Kembali ke pemilihan sesi
                    </button>

                    <div className="flex items-center justify-between mb-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                        <div>
                            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">SESSION INFO</div>
                            <div className="flex items-center gap-3">
                                <h2 className="font-bold text-neutral-900">{selectedSubject}</h2>
                                <span className="text-neutral-300">|</span>
                                <div className="flex items-center text-neutral-600 gap-1.5">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>{new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setStep(1)} className="text-xs font-medium text-red-600 hover:text-red-700">
                            Ubah
                        </button>
                    </div>

                    {/* Session Type Toggle */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button
                            onClick={() => setSessionType('regular')}
                            className={clsx(
                                "flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all",
                                sessionType === 'regular'
                                    ? "border-red-600 bg-red-50 text-red-700"
                                    : "border-neutral-200 bg-white hover:border-red-200 text-neutral-600"
                            )}
                        >
                            <div className={clsx("p-2 rounded-full", sessionType === 'regular' ? "bg-red-100" : "bg-neutral-100")}>
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold">Sesi Reguler</div>
                                <div className="text-xs opacity-75">Absensi & Topik Harian</div>
                            </div>
                        </button>

                        <button
                            onClick={() => setSessionType('review')}
                            className={clsx(
                                "flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all",
                                sessionType === 'review'
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-neutral-200 bg-white hover:border-blue-200 text-neutral-600"
                            )}
                        >
                            <div className={clsx("p-2 rounded-full", sessionType === 'review' ? "bg-blue-100" : "bg-neutral-100")}>
                                <Activity className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold">Sesi Penilaian</div>
                                <div className="text-xs opacity-75">Capaian & Portofolio</div>
                            </div>
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900">Laporan Tersimpan!</h3>
                                <p className="text-neutral-500 mt-2">Data telah berhasil disinkronisasi ke pusat data.</p>
                                <button
                                    onClick={() => setStep(1)}
                                    className="mt-6 text-red-600 font-medium hover:text-red-700"
                                >
                                    Isi Jurnal Baru
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-8">

                                {/* Regular Session Inputs */}
                                {sessionType === 'regular' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                                                Topik Pembelajaran
                                                {isAutoFilled && (
                                                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                                                        <Zap className="h-3 w-3 fill-amber-500" />
                                                        Auto-filled dari Kurikulum
                                                    </span>
                                                )}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={topic}
                                                    onChange={(e) => setTopic(e.target.value)}
                                                    placeholder="Contoh: Fundamental React Hooks..."
                                                    className={clsx(
                                                        "w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors",
                                                        isAutoFilled ? "border-amber-400 bg-amber-50/50" : "border-neutral-300"
                                                    )}
                                                />
                                                {isAutoFilled && (
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                        <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="border-t border-dashed border-neutral-200"></div>

                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                                <Users className="h-5 w-5 text-red-600" /> Absensi Siswa
                                            </h3>
                                            <div className="border rounded-lg overflow-hidden">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-neutral-50 border-b border-neutral-200">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left font-medium text-neutral-500">Siswa</th>
                                                            <th className="px-4 py-3 text-center font-medium text-neutral-500 w-16">Hadir</th>
                                                            <th className="px-4 py-3 text-center font-medium text-neutral-500 w-16">Izin</th>
                                                            <th className="px-4 py-3 text-center font-medium text-neutral-500 w-16">Sakit</th>
                                                            <th className="px-4 py-3 text-center font-medium text-neutral-500 w-16">Alpha</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-neutral-100">
                                                        {MOCK_STUDENTS.map((student) => (
                                                            <tr key={student.id} className="hover:bg-neutral-50">
                                                                <td className="px-4 py-3 flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden relative">
                                                                        <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random`} alt={student.name} fill />
                                                                    </div>
                                                                    <span className="font-medium text-neutral-700">{student.name}</span>
                                                                </td>
                                                                {['H', 'I', 'S', 'A'].map((status) => (
                                                                    <td key={status} className="px-4 py-3 text-center">
                                                                        <input
                                                                            type="radio"
                                                                            name={`attendance-${student.id}`}
                                                                            value={status}
                                                                            checked={attendance[student.id] === status || (status === 'H' && !attendance[student.id])}
                                                                            onChange={() => setAttendance({ ...attendance, [student.id]: status })}
                                                                            className="w-4 h-4 text-red-600 focus:ring-red-500 border-neutral-300"
                                                                        />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2">Ringkasan Aktivitas & Kendala</label>
                                            <textarea
                                                rows={4}
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Jelaskan progres kelas dan kendala yang dihadapi hari ini..."
                                                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Review Session Content */}
                                {sessionType === 'review' && (
                                    <div className="space-y-8">
                                        {/* 1. Capaian Kompetensi */}
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                                <Activity className="h-5 w-5 text-blue-600" /> Capaian Kompetensi
                                            </h3>
                                            <div className="space-y-3">
                                                {MOCK_STUDENTS.map((student) => (
                                                    <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-blue-200 transition-colors gap-4">
                                                        <div className="flex items-center gap-3 w-48 shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-neutral-200 overflow-hidden relative">
                                                                <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random`} alt={student.name} fill />
                                                            </div>
                                                            <span className="font-medium text-neutral-700">{student.name}</span>
                                                        </div>

                                                        <div className="flex gap-2 flex-1 justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={() => setCompetency({ ...competency, [student.id]: 'hijau' })}
                                                                className={clsx(
                                                                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1",
                                                                    competency[student.id] === 'hijau'
                                                                        ? "bg-green-100 text-green-700 border-green-200 ring-2 ring-green-500 ring-offset-1"
                                                                        : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                                                                )}
                                                            >
                                                                <div className="w-2 h-2 rounded-full bg-green-500" /> tercapai
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setCompetency({ ...competency, [student.id]: 'kuning' })}
                                                                className={clsx(
                                                                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1",
                                                                    competency[student.id] === 'kuning'
                                                                        ? "bg-yellow-100 text-yellow-700 border-yellow-200 ring-2 ring-yellow-400 ring-offset-1"
                                                                        : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                                                                )}
                                                            >
                                                                <div className="w-2 h-2 rounded-full bg-yellow-400" /> Proses
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setCompetency({ ...competency, [student.id]: 'merah' })}
                                                                className={clsx(
                                                                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1",
                                                                    competency[student.id] === 'merah'
                                                                        ? "bg-red-100 text-red-700 border-red-200 ring-2 ring-red-500 ring-offset-1"
                                                                        : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                                                                )}
                                                            >
                                                                <div className="w-2 h-2 rounded-full bg-red-500" /> Pendampingan
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>


                                        {/* 2. Status Portofolio */}
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                                <Trophy className="h-5 w-5 text-yellow-500" /> Status Portofolio
                                            </h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                {MOCK_STUDENTS.map((student) => (
                                                    <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-yellow-200 transition-colors gap-4">
                                                        <div className="flex items-center gap-3 w-48 shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-neutral-200 overflow-hidden relative">
                                                                <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random`} alt={student.name} fill />
                                                            </div>
                                                            <span className="font-medium text-neutral-700">{student.name}</span>
                                                        </div>

                                                        <div className="flex bg-neutral-100 rounded-lg p-1 self-start sm:self-center">
                                                            {([
                                                                { val: 'not_started', label: 'Belum' },
                                                                { val: 'in_progress', label: 'Proses' },
                                                                { val: 'done', label: 'Selesai' }
                                                            ] as const).map((opt) => (
                                                                <button
                                                                    key={opt.val}
                                                                    type="button"
                                                                    onClick={() => setPortfolio({ ...portfolio, [student.id]: opt.val })}
                                                                    className={clsx(
                                                                        "px-4 py-1.5 rounded-md text-sm transition-all",
                                                                        portfolio[student.id] === opt.val
                                                                            ? "bg-white shadow-sm text-neutral-900 font-semibold ring-1 ring-black/5"
                                                                            : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
                                                                    )}
                                                                >
                                                                    {opt.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 3. Kandidat Lomba */}
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                                <Trophy className="h-5 w-5 text-purple-600" /> Kandidat Lomba
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {MOCK_STUDENTS.map((student) => (
                                                    <button
                                                        key={student.id}
                                                        type="button"
                                                        onClick={() => setCandidates({ ...candidates, [student.id]: !candidates[student.id] })}
                                                        className={clsx(
                                                            "flex items-center gap-3 p-3 rounded-lg border transition-all text-left group",
                                                            candidates[student.id]
                                                                ? "border-purple-500 bg-purple-50 ring-1 ring-purple-500"
                                                                : "border-neutral-200 bg-white hover:border-purple-200 hover:bg-neutral-50"
                                                        )}
                                                    >
                                                        <div className={clsx(
                                                            "h-5 w-5 rounded border flex items-center justify-center transition-colors shrink-0",
                                                            candidates[student.id] ? "bg-purple-500 border-purple-500" : "border-neutral-300 bg-white group-hover:border-purple-300"
                                                        )}>
                                                            {candidates[student.id] && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden relative">
                                                                <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random`} alt={student.name} fill />
                                                            </div>
                                                            <span className={clsx("font-medium", candidates[student.id] ? "text-purple-900" : "text-neutral-700")}>
                                                                {student.name}
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 4. Perlu Recovery */}
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                                <AlertCircle className="h-5 w-5 text-red-600" /> Perlu Recovery / Remedial
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {MOCK_STUDENTS.map((student) => (
                                                    <button
                                                        key={student.id}
                                                        type="button"
                                                        onClick={() => setRecovery({ ...recovery, [student.id]: !recovery[student.id] })}
                                                        className={clsx(
                                                            "flex items-center gap-3 p-3 rounded-lg border transition-all text-left group",
                                                            recovery[student.id]
                                                                ? "border-red-500 bg-red-50 ring-1 ring-red-500"
                                                                : "border-neutral-200 bg-white hover:border-red-200 hover:bg-neutral-50"
                                                        )}
                                                    >
                                                        <div className={clsx(
                                                            "h-5 w-5 rounded border flex items-center justify-center transition-colors shrink-0",
                                                            recovery[student.id] ? "bg-red-500 border-red-500" : "border-neutral-300 bg-white group-hover:border-red-300"
                                                        )}>
                                                            {recovery[student.id] && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-neutral-200 overflow-hidden relative">
                                                                <Image src={`https://ui-avatars.com/api/?name=${student.avatar}&background=random`} alt={student.name} fill />
                                                            </div>
                                                            <span className={clsx("font-medium", recovery[student.id] ? "text-red-900" : "text-neutral-700")}>
                                                                {student.name}
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-neutral-200">
                                    <button
                                        type="submit"
                                        className={clsx(
                                            "w-full flex items-center justify-center py-4 px-4 rounded-xl text-white font-bold shadow-lg transition-all transform hover:scale-[1.01]",
                                            sessionType === 'regular'
                                                ? "bg-gradient-to-r from-red-600 to-red-700 hover:shadow-red-200"
                                                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-blue-200"
                                        )}
                                    >
                                        <Save className="mr-2 h-5 w-5" />
                                        Simpan Laporan {sessionType === 'regular' ? 'Harian' : 'Penilaian'}
                                    </button>
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
