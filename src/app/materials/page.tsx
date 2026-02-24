'use client';

import { useState, useMemo } from 'react';
import {
    Plus, Calendar as CalendarIcon, FileText, Link as LinkIcon,
    Video, BookOpen, ChevronRight, ChevronLeft, Check, Eye,
    Star, ArrowRight, Upload, X, Sparkles, Clock, Users
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSidebar } from '@/components/SidebarContext';
import {
    Material, MaterialContentType, TeachingDay, MOCK_MATERIALS,
    MOCK_SCORES, SCORE_LABELS, getLearnerPace, getLearnerPaceColor,
    ComprehensionScore
} from '@/data/materials';

// --- Date Utility ---
function getAvailableDates(allowedDay: 'Rabu' | 'Kamis' | 'both'): { date: string; label: string }[] {
    const dates: { date: string; label: string }[] = [];
    const start = new Date('2025-08-01');
    const end = new Date('2026-06-30');
    const dayMap: Record<string, number> = { 'Rabu': 3, 'Kamis': 4 };

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        const isAllowed = allowedDay === 'both'
            ? (dayOfWeek === 3 || dayOfWeek === 4)
            : dayOfWeek === dayMap[allowedDay];

        if (isAllowed) {
            // Use manual formatting to avoid timezone shift from toISOString()
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const isoDate = `${yyyy}-${mm}-${dd}`;
            const dayName = dayOfWeek === 3 ? 'Rabu' : 'Kamis';
            const label = `${dayName}, ${d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;
            dates.push({ date: isoDate, label });
        }
    }
    return dates;
}

const CONTENT_TYPES: { value: MaterialContentType; label: string; icon: any; desc: string }[] = [
    { value: 'pdf', label: 'PDF / Dokumen', icon: FileText, desc: 'Google Drive PDF' },
    { value: 'video', label: 'Video', icon: Video, desc: 'YouTube / Video URL' },
    { value: 'document', label: 'Google Docs', icon: BookOpen, desc: 'Dokumen online' },
    { value: 'link', label: 'Link Lain', icon: LinkIcon, desc: 'Website / Resource' },
];

const SUBJECTS = ['Fiber Optic', 'Web Development', 'UI/UX Design'];

export default function MaterialsPage() {
    const { userRole } = useSidebar();
    const isTeacher = userRole === 'internal_mentor' || userRole === 'industry_mentor' || userRole === 'admin';
    const isStudent = userRole === 'student';

    // Materials state (simulating local state)
    const [materials, setMaterials] = useState<Material[]>(MOCK_MATERIALS);
    const [scores] = useState<ComprehensionScore[]>(MOCK_SCORES);
    const [showForm, setShowForm] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    // Form state
    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState(SUBJECTS[0]);
    const [contentUrl, setContentUrl] = useState('');
    const [contentType, setContentType] = useState<MaterialContentType>('pdf');

    // Determine which day this user can pick
    const allowedDay: 'Rabu' | 'Kamis' | 'both' = useMemo(() => {
        if (userRole === 'internal_mentor') return 'Rabu';
        if (userRole === 'industry_mentor') return 'Kamis';
        return 'both'; // admin
    }, [userRole]);

    const availableDates = useMemo(() => getAvailableDates(allowedDay), [allowedDay]);

    // Filtered materials based on role
    const visibleMaterials = useMemo(() => {
        if (userRole === 'internal_mentor') return materials.filter(m => m.type === 'Internal');
        if (userRole === 'industry_mentor') return materials.filter(m => m.type === 'Industrial');
        return materials;
    }, [materials, userRole]);

    // Score stats per material
    const getMatScoreStats = (matId: string) => {
        const matScores = scores.filter(s => s.materialId === matId);
        if (matScores.length === 0) return null;
        const avg = matScores.reduce((s, c) => s + c.score, 0) / matScores.length;
        return { count: matScores.length, avg };
    };

    const resetForm = () => {
        setStep(1); setSelectedDate(''); setTitle(''); setDescription('');
        setSubject(SUBJECTS[0]); setContentUrl(''); setContentType('pdf');
        setShowForm(false);
    };

    // Parse date string safely without timezone issues
    const parseDateParts = (dateStr: string) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    };

    const handleSubmit = () => {
        const dateObj = parseDateParts(selectedDate);
        const dayOfWeek: TeachingDay = dateObj.getDay() === 3 ? 'Rabu' : 'Kamis';
        const typeVal = dayOfWeek === 'Rabu' ? 'Internal' : 'Industrial';
        const teacherName = userRole === 'internal_mentor' ? 'Bu Rina' :
            userRole === 'industry_mentor' ? 'Pak Bagus' : 'Admin DTP';
        const teacherRole = userRole === 'internal_mentor' ? 'Pengajar Internal' :
            userRole === 'industry_mentor' ? 'Mentor Industri' : 'Admin';

        const newMaterial: Material = {
            id: `mat-${Date.now()}`, title, description, date: selectedDate,
            dayOfWeek, type: typeVal, teacherName, teacherRole,
            subject, contentUrl, contentType,
            createdAt: new Date().toISOString(),
        };
        setMaterials(prev => [newMaterial, ...prev]);
        resetForm();
    };

    const canGoNext = () => {
        if (step === 1) return !!selectedDate;
        if (step === 2) return title.trim().length > 0 && description.trim().length > 0;
        if (step === 3) return contentUrl.trim().length > 0;
        return true;
    };

    // --- RENDER ---
    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                            {isStudent ? 'Materi Belajar' : 'Input Materi'}
                        </h1>
                        {userRole === 'internal_mentor' && (
                            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                🗓️ Rabu • Internal
                            </span>
                        )}
                        {userRole === 'industry_mentor' && (
                            <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                🗓️ Kamis • Industri
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-neutral-500">
                        {isStudent
                            ? 'Preview materi dan beri skor pemahamanmu'
                            : 'Upload materi pelajaran untuk siswa'
                        }
                    </p>
                </div>
                {isTeacher && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-brand-dark transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Materi
                    </button>
                )}
            </div>

            {/* === STEPPER FORM (Teacher/Mentor) === */}
            {showForm && isTeacher && (
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl mb-8 overflow-hidden">
                    {/* Progress Bar */}
                    <div className="bg-neutral-50 border-b border-neutral-200 px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-brand-red" />
                                Input Materi Baru
                            </h2>
                            <button onClick={resetForm} className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                                <X className="h-4 w-4 text-neutral-400" />
                            </button>
                        </div>
                        {/* Step indicators */}
                        <div className="flex gap-2">
                            {[
                                { num: 1, label: 'Pilih Tanggal' },
                                { num: 2, label: 'Detail Materi' },
                                { num: 3, label: 'Lampirkan' },
                                { num: 4, label: 'Review' },
                            ].map(s => (
                                <div key={s.num} className="flex-1">
                                    <div className={clsx(
                                        "h-1.5 rounded-full mb-1.5 transition-all duration-300",
                                        step >= s.num ? "bg-brand-red" : "bg-neutral-200"
                                    )} />
                                    <p className={clsx(
                                        "text-[10px] font-bold transition-colors",
                                        step >= s.num ? "text-brand-red" : "text-neutral-400"
                                    )}>
                                        {s.num}. {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        {/* STEP 1: Date */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-700 mb-1">
                                        Pilih Tanggal Mengajar
                                    </label>
                                    <p className="text-xs text-neutral-500 mb-3">
                                        {allowedDay === 'Rabu' && '📌 Guru internal hanya mengajar hari Rabu'}
                                        {allowedDay === 'Kamis' && '📌 Mentor industri hanya mengajar hari Kamis'}
                                        {allowedDay === 'both' && '📌 Admin dapat memilih Rabu atau Kamis'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-2">
                                    {availableDates.slice(0, 24).map(d => (
                                        <button
                                            key={d.date}
                                            onClick={() => setSelectedDate(d.date)}
                                            className={clsx(
                                                "text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
                                                selectedDate === d.date
                                                    ? "bg-brand-red text-white border-brand-red shadow-md"
                                                    : "bg-white border-neutral-200 text-neutral-700 hover:border-brand-red hover:bg-red-50"
                                            )}
                                        >
                                            <CalendarIcon className={clsx("h-3.5 w-3.5 mb-0.5 inline mr-1.5", selectedDate === d.date ? "text-white" : "text-neutral-400")} />
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Details */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">Bidang Pelajaran</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {SUBJECTS.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setSubject(s)}
                                                className={clsx(
                                                    "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all",
                                                    subject === s
                                                        ? "bg-neutral-900 text-white border-neutral-900"
                                                        : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400"
                                                )}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">Judul Materi</label>
                                    <input
                                        type="text" placeholder="Contoh: Pengenalan Komponen Fiber Optic"
                                        className="w-full p-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none"
                                        value={title} onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">Deskripsi Singkat</label>
                                    <textarea
                                        rows={3} placeholder="Jelaskan apa yang akan dipelajari siswa..."
                                        className="w-full p-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none resize-none"
                                        value={description} onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Content Attachment */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-2">Tipe Konten</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {CONTENT_TYPES.map(ct => {
                                            const Icon = ct.icon;
                                            return (
                                                <button
                                                    key={ct.value}
                                                    onClick={() => setContentType(ct.value)}
                                                    className={clsx(
                                                        "p-3 rounded-xl border text-center transition-all",
                                                        contentType === ct.value
                                                            ? "bg-brand-red/5 border-brand-red text-brand-red shadow-sm"
                                                            : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400"
                                                    )}
                                                >
                                                    <Icon className="h-5 w-5 mx-auto mb-1" />
                                                    <p className="text-xs font-bold">{ct.label}</p>
                                                    <p className="text-[10px] text-neutral-400 mt-0.5">{ct.desc}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">URL Materi</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                        <input
                                            type="url"
                                            placeholder={
                                                contentType === 'pdf' ? "https://drive.google.com/file/d/.../preview" :
                                                    contentType === 'video' ? "https://www.youtube.com/embed/..." :
                                                        contentType === 'document' ? "https://docs.google.com/document/..." :
                                                            "https://..."
                                            }
                                            className="w-full pl-10 p-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none"
                                            value={contentUrl} onChange={e => setContentUrl(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-[10px] text-neutral-400 mt-1.5">
                                        💡 Tip: Untuk Google Drive, gunakan link &quot;/preview&quot; agar bisa ditampilkan langsung
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Review */}
                        {step === 4 && (
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-neutral-700 mb-2">Preview Materi Sebelum Disimpan:</p>
                                <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-4 space-y-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{subject}</span>
                                        <span className={clsx(
                                            "text-[10px] font-bold px-2 py-0.5 rounded border",
                                            parseDateParts(selectedDate).getDay() === 3
                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                : "bg-orange-50 text-orange-700 border-orange-200"
                                        )}>
                                            {parseDateParts(selectedDate).getDay() === 3 ? '🗓️ Rabu (Internal)' : '🗓️ Kamis (Industri)'}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-neutral-900">{title}</h3>
                                    <p className="text-sm text-neutral-600">{description}</p>
                                    <div className="text-xs text-neutral-500 flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <CalendarIcon className="h-3 w-3" />
                                            {parseDateParts(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="pt-2 border-t border-neutral-200 flex items-center gap-2">
                                        {CONTENT_TYPES.find(c => c.value === contentType)?.icon && (() => {
                                            const Icon = CONTENT_TYPES.find(c => c.value === contentType)!.icon;
                                            return <Icon className="h-4 w-4 text-brand-red" />;
                                        })()}
                                        <span className="text-xs text-neutral-600 truncate">{contentUrl}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-100">
                            <button
                                onClick={() => step > 1 ? setStep(step - 1) : resetForm()}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                {step > 1 ? 'Kembali' : 'Batal'}
                            </button>
                            {step < totalSteps ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    disabled={!canGoNext()}
                                    className="flex items-center gap-1 px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Lanjut
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-red text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200 hover:bg-brand-dark transition-all"
                                >
                                    <Check className="h-4 w-4" />
                                    Simpan Materi
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* === MATERIAL LIST === */}
            <div className="space-y-3">
                {visibleMaterials.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-neutral-200 rounded-2xl bg-neutral-50">
                        <BookOpen className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-neutral-700">Belum ada materi</h3>
                        <p className="text-sm text-neutral-500 mt-1">
                            {isTeacher ? 'Klik "Tambah Materi" untuk memulai.' : 'Materi akan muncul di sini setelah guru mengupload.'}
                        </p>
                    </div>
                ) : (
                    visibleMaterials.map(mat => {
                        const stats = getMatScoreStats(mat.id);
                        const pace = stats ? getLearnerPace(stats.avg) : null;
                        const paceColor = pace ? getLearnerPaceColor(pace) : null;

                        return (
                            <Link
                                key={mat.id}
                                href={`/materials/${mat.id}`}
                                className="block bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all p-4 group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    {/* Icon */}
                                    <div className={clsx(
                                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                                        mat.contentType === 'pdf' ? "bg-red-50" :
                                            mat.contentType === 'video' ? "bg-purple-50" :
                                                mat.contentType === 'document' ? "bg-blue-50" : "bg-neutral-50"
                                    )}>
                                        {mat.contentType === 'pdf' && <FileText className="h-5 w-5 text-red-500" />}
                                        {mat.contentType === 'video' && <Video className="h-5 w-5 text-purple-500" />}
                                        {mat.contentType === 'document' && <BookOpen className="h-5 w-5 text-blue-500" />}
                                        {mat.contentType === 'link' && <LinkIcon className="h-5 w-5 text-neutral-500" />}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">{mat.subject}</span>
                                            <span className={clsx(
                                                "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                                                mat.type === 'Internal' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-orange-50 text-orange-700 border-orange-100"
                                            )}>
                                                {mat.dayOfWeek}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 group-hover:text-brand-red transition-colors">{mat.title}</h3>
                                        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{mat.description}</p>
                                        <div className="flex items-center gap-3 mt-2 text-[10px] text-neutral-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {new Date(mat.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                            <span>•</span>
                                            <span>{mat.teacherName}</span>
                                        </div>
                                    </div>

                                    {/* Score Badge (teacher view) */}
                                    {isTeacher && stats && (
                                        <div className="flex items-center gap-3 shrink-0">
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 justify-end mb-0.5">
                                                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                    <span className="text-sm font-bold text-neutral-900">{stats.avg.toFixed(1)}</span>
                                                    <span className="text-[10px] text-neutral-400">/5</span>
                                                </div>
                                                <div className="flex items-center gap-1 justify-end">
                                                    <Users className="h-3 w-3 text-neutral-400" />
                                                    <span className="text-[10px] text-neutral-500">{stats.count} siswa</span>
                                                </div>
                                            </div>
                                            {paceColor && (
                                                <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-lg border", paceColor.bg, paceColor.text, paceColor.border)}>
                                                    {pace}
                                                </span>
                                            )}
                                            <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-brand-red transition-colors" />
                                        </div>
                                    )}

                                    {/* Student view — simple arrow */}
                                    {isStudent && (
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-xs font-bold text-brand-red flex items-center gap-1 group-hover:underline">
                                                <Eye className="h-3.5 w-3.5" />
                                                Preview
                                            </span>
                                            <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-brand-red transition-colors" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}
