'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, FileText, Video, BookOpen, Link as LinkIcon,
    Star, Calendar, User, Clock, Users,
    ExternalLink
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useSidebar } from '@/components/SidebarContext';
import {
    MOCK_MATERIALS, MOCK_SCORES, SCORE_LABELS, SCORE_EMOJIS,
    getLearnerPace, getLearnerPaceColor
} from '@/data/materials';

export default function MaterialDetailPage() {
    const params = useParams();
    const { userRole } = useSidebar();
    const materialId = params.id as string;

    const material = MOCK_MATERIALS.find(m => m.id === materialId);
    const isStudent = userRole === 'student';
    const isTeacher = userRole === 'internal_mentor' || userRole === 'industry_mentor' || userRole === 'admin';

    // Score data (read-only for display)
    const materialScores = useMemo(() =>
        MOCK_SCORES.filter(s => s.materialId === materialId),
        [materialId]
    );

    const avgScore = useMemo(() => {
        if (materialScores.length === 0) return 0;
        return materialScores.reduce((s, c) => s + c.score, 0) / materialScores.length;
    }, [materialScores]);

    if (!material) {
        return (
            <div className="max-w-6xl mx-auto py-20 text-center">
                <FileText className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-neutral-700">Materi tidak ditemukan</h2>
                <Link href="/materials" className="text-brand-red font-bold text-sm mt-4 inline-block hover:underline">
                    ← Kembali ke Daftar Materi
                </Link>
            </div>
        );
    }

    // Content Preview Component
    const renderPreview = () => {
        if (material.contentType === 'video') {
            return (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                    <iframe
                        src={material.contentUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={material.title}
                    />
                </div>
            );
        }
        if (material.contentType === 'pdf' || material.contentType === 'document') {
            return (
                <div className="relative w-full bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 shadow-lg">
                    <div className="aspect-[4/3] md:aspect-[16/9]">
                        <iframe
                            src={material.contentUrl}
                            className="absolute inset-0 w-full h-full"
                            title={material.title}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white text-xs font-medium flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            Preview dokumen — scroll untuk membaca
                        </p>
                    </div>
                </div>
            );
        }
        // Link type
        return (
            <a href={material.contentUrl} target="_blank" rel="noopener noreferrer"
                className="block bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl border border-neutral-200 p-8 text-center hover:shadow-md transition-all group">
                <ExternalLink className="h-10 w-10 text-neutral-400 mx-auto mb-3 group-hover:text-brand-red transition-colors" />
                <p className="text-sm font-bold text-neutral-700 mb-1">Buka Materi Eksternal</p>
                <p className="text-xs text-neutral-500 truncate max-w-md mx-auto">{material.contentUrl}</p>
            </a>
        );
    };

    // Score distribution
    const scoreDistribution = [5, 4, 3, 2, 1].map(score => ({
        score,
        count: materialScores.filter(s => s.score === score).length,
        percentage: materialScores.length > 0
            ? (materialScores.filter(s => s.score === score).length / materialScores.length) * 100
            : 0,
    }));

    const pace = avgScore > 0 ? getLearnerPace(avgScore) : null;
    const paceColor = pace ? getLearnerPaceColor(pace) : null;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Back Nav */}
            <Link href="/materials" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-4 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Daftar Materi
            </Link>

            {/* Material Header */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 md:p-6 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className={clsx(
                        "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
                        material.contentType === 'pdf' ? "bg-red-50" :
                            material.contentType === 'video' ? "bg-purple-50" :
                                material.contentType === 'document' ? "bg-blue-50" : "bg-neutral-50"
                    )}>
                        {material.contentType === 'pdf' && <FileText className="h-6 w-6 text-red-500" />}
                        {material.contentType === 'video' && <Video className="h-6 w-6 text-purple-500" />}
                        {material.contentType === 'document' && <BookOpen className="h-6 w-6 text-blue-500" />}
                        {material.contentType === 'link' && <LinkIcon className="h-6 w-6 text-neutral-500" />}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">{material.subject}</span>
                            <span className={clsx(
                                "text-[10px] font-bold px-2 py-0.5 rounded border",
                                material.type === 'Internal' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-orange-50 text-orange-700 border-orange-100"
                            )}>
                                {material.dayOfWeek === 'Rabu' ? '🗓️ Rabu (Internal)' : '🗓️ Kamis (Industri)'}
                            </span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">{material.title}</h1>
                        <p className="text-sm text-neutral-600 mb-3">{material.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                            <span className="flex items-center gap-1"><User className="h-3 w-3" />{material.teacherName} ({material.teacherRole})</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(material.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Preview */}
            <div className="mb-6">
                <h2 className="text-sm font-bold text-neutral-700 mb-3 flex items-center gap-2">
                    <span className="h-5 w-5 rounded bg-brand-red/10 flex items-center justify-center">
                        <FileText className="h-3 w-3 text-brand-red" />
                    </span>
                    Preview Materi
                </h2>
                {renderPreview()}
            </div>


            {/* === TEACHER: Comprehension Results === */}
            {isTeacher && materialScores.length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                            <Users className="h-5 w-5 text-indigo-500" />
                            Hasil Pemahaman Siswa
                        </h2>
                        {paceColor && pace && (
                            <span className={clsx("text-xs font-bold px-3 py-1 rounded-lg border", paceColor.bg, paceColor.text, paceColor.border)}>
                                Rata-rata: {pace}
                            </span>
                        )}
                    </div>

                    {/* Score Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                        <div className="bg-neutral-50 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black text-neutral-900">{materialScores.length}</p>
                            <p className="text-[10px] font-bold text-neutral-500">Siswa Mengisi</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                <span className="text-2xl font-black text-neutral-900">{avgScore.toFixed(1)}</span>
                            </div>
                            <p className="text-[10px] font-bold text-neutral-500">Rata-rata Skor</p>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black text-emerald-700">
                                {materialScores.filter(s => s.score >= 4).length}
                            </p>
                            <p className="text-[10px] font-bold text-neutral-500">Paham (≥4)</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3 text-center">
                            <p className="text-2xl font-black text-red-700">
                                {materialScores.filter(s => s.score <= 2).length}
                            </p>
                            <p className="text-[10px] font-bold text-neutral-500">Perlu Bantuan (≤2)</p>
                        </div>
                    </div>

                    {/* Score Distribution Bar */}
                    <div className="mb-5">
                        <p className="text-xs font-bold text-neutral-500 mb-2">Distribusi Skor</p>
                        <div className="space-y-1.5">
                            {scoreDistribution.map(d => (
                                <div key={d.score} className="flex items-center gap-2">
                                    <span className="text-sm w-6 text-right font-bold text-neutral-700">{d.score}</span>
                                    <span className="text-xs w-5">{SCORE_EMOJIS[d.score]}</span>
                                    <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                                        <div
                                            className={clsx("h-full rounded-full transition-all duration-500",
                                                d.score >= 4 ? "bg-emerald-400" : d.score === 3 ? "bg-amber-400" : "bg-red-400"
                                            )}
                                            style={{ width: `${d.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-neutral-500 w-10 text-right">{d.count} siswa</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Individual Student Scores */}
                    <div>
                        <p className="text-xs font-bold text-neutral-500 mb-2">Detail Per Siswa</p>
                        <div className="divide-y divide-neutral-100">
                            {materialScores.map(score => {
                                const scorePace = getLearnerPace(score.score);
                                const sColor = getLearnerPaceColor(scorePace);
                                return (
                                    <div key={score.id} className="flex items-center gap-3 py-2.5">
                                        <div className="w-8 h-8 rounded-full bg-neutral-100 overflow-hidden relative shrink-0">
                                            <Image
                                                src={`https://ui-avatars.com/api/?name=${score.studentName.replace(' ', '+')}&background=random&color=fff`}
                                                alt={score.studentName} fill className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-900 truncate">{score.studentName}</p>
                                            <p className="text-[10px] text-neutral-500">{score.studentClass}</p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-lg">{SCORE_EMOJIS[score.score]}</span>
                                            <span className="text-sm font-bold text-neutral-900">{score.score}/5</span>
                                            <span className={clsx("text-[10px] font-bold px-2 py-0.5 rounded-lg border hidden sm:inline", sColor.bg, sColor.text, sColor.border)}>
                                                {scorePace}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {isTeacher && materialScores.length === 0 && (
                <div className="bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200 p-8 text-center">
                    <Users className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
                    <p className="text-sm font-bold text-neutral-700">Belum ada siswa yang mengisi skor</p>
                    <p className="text-xs text-neutral-500 mt-1">Skor pemahaman akan muncul di sini setelah siswa mengakses materi.</p>
                </div>
            )}
        </div>
    );
}
