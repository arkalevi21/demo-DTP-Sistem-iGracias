'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Briefcase, GraduationCap, Users, Edit3, Trash2, Check, X, BarChart3, FileText, Link as LinkIcon, Upload } from 'lucide-react';
import clsx from 'clsx';
import { useSidebar } from '@/components/SidebarContext';
import Image from 'next/image';

import { ScheduleItem, ScheduleType, Mentor, ALL_MENTORS, INITIAL_FO_SCHEDULE, MONTHS } from '@/data/schedule';

// --- TS Types ---
// Imported from @/data/schedule

// --- Initial Mock Data ---
// Imported from @/data/schedule


type Subject = 'Fiber Optic' | 'Web Development' | 'UI/UX Design' | string;

export default function PlannerPage() {
    const { userRole } = useSidebar();
    const isAdmin = userRole === 'admin';
    const isMentor = userRole === 'internal_mentor' || userRole === 'industry_mentor';
    const canEditContent = isAdmin || isMentor;

    // State
    const [activeMonthIndex, setActiveMonthIndex] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState<Subject>('Fiber Optic');
    const [subjects, setSubjects] = useState<Subject[]>(['Fiber Optic', 'Web Development', 'UI/UX Design']);
    const [scheduleData, setScheduleData] = useState(INITIAL_FO_SCHEDULE);

    // Teaching Team State
    const [subjectTeams, setSubjectTeams] = useState<Record<string, string[]>>({
        'Fiber Optic': ['m1', 'm3', 'm4'], // Initial team
        'Web Development': ['m2', 'm3']
    });

    // Modal States
    const [showAddTopic, setShowAddTopic] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newTopic, setNewTopic] = useState({
        code: '', topic: '', goal: '', assessment: '', assessmentScore: 80,
        teacher: '', type: 'Internal', weeks: [] as number[],
        materialUrl: '', materialType: 'link' as 'pdf' | 'link'
    });

    const activeMonth = MONTHS[activeMonthIndex];
    const schedule = scheduleData[activeMonth] || [];
    const currentTeamIds = subjectTeams[selectedSubject] || [];
    const currentTeam = ALL_MENTORS.filter(m => currentTeamIds.includes(m.id));

    // Filter Logic
    const isInternalUser = userRole === 'internal_mentor';
    const isIndustrialUser = userRole === 'industry_mentor';

    // Filtered mentors for dropdown based on session type
    const filteredMentors = ALL_MENTORS.filter(m => {
        if (newTopic.type === 'Internal') return m.role === 'Internal';
        if (newTopic.type === 'Industrial') return m.role === 'Industri';
        return true;
    });

    const handlePrevMonth = () => { if (activeMonthIndex > 0) setActiveMonthIndex(prev => prev - 1); };
    const handleNextMonth = () => { if (activeMonthIndex < MONTHS.length - 1) setActiveMonthIndex(prev => prev + 1); };

    // Admin Actions
    const handleAddSubject = () => {
        setShowAddSubjectModal(true);
    };

    const handleAddSubjectSubmit = () => {
        if (newSubjectName.trim() && !subjects.includes(newSubjectName.trim())) {
            setSubjects([...subjects, newSubjectName.trim()]);
            setSelectedSubject(newSubjectName.trim());
        }
        setNewSubjectName('');
        setShowAddSubjectModal(false);
    };

    const toggleMentorInTeam = (mentorId: string) => {
        setSubjectTeams(prev => {
            const current = prev[selectedSubject] || [];
            if (current.includes(mentorId)) {
                return { ...prev, [selectedSubject]: current.filter(id => id !== mentorId) };
            } else {
                return { ...prev, [selectedSubject]: [...current, mentorId] };
            }
        });
    };

    const handleAddTopicSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: ScheduleItem = {
            id: Math.random().toString(36).substr(2, 9),
            code: newTopic.code,
            topic: newTopic.topic,
            goal: newTopic.goal,
            assessment: newTopic.assessment,
            assessmentScore: newTopic.assessmentScore,
            teacher: newTopic.teacher || (userRole === 'industry_mentor' ? 'Mentor Industri' : 'Guru Internal'),
            type: newTopic.type as ScheduleType,
            weeks: [1, 2, 3, 4], // Default all weeks for demo
            materialUrl: newTopic.materialUrl || undefined,
            materialType: newTopic.materialUrl ? newTopic.materialType : undefined,
        };

        setScheduleData(prev => ({
            ...prev,
            [activeMonth]: [...(prev[activeMonth] || []), newItem]
        }));
        setShowAddTopic(false);
        setNewTopic({ code: '', topic: '', goal: '', assessment: '', assessmentScore: 80, teacher: '', type: 'Internal', weeks: [], materialUrl: '', materialType: 'link' });
    };

    // Score color helper
    const scoreColor = (score?: number) => {
        if (!score) return 'text-neutral-400';
        if (score >= 85) return 'text-emerald-600';
        if (score >= 70) return 'text-amber-600';
        return 'text-red-600';
    };
    const scoreBg = (score?: number) => {
        if (!score) return 'bg-neutral-50';
        if (score >= 85) return 'bg-emerald-50';
        if (score >= 70) return 'bg-amber-50';
        return 'bg-red-50';
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 relative">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h1 className="text-xl md:text-3xl font-bold text-neutral-900">
                            {isAdmin ? 'Input Kurikulum & Syllabus' : 'Perencanaan Kurikulum'}
                        </h1>
                        {isAdmin && <span className="bg-brand-red/10 text-brand-red border border-brand-red/20 text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-wider">Admin Mode</span>}
                        {isMentor && <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-wider">Editor Mode</span>}
                    </div>
                    <p className="text-sm md:text-lg text-neutral-500 font-medium">Peta jalan pembelajaran tahun ajaran 2025/2026</p>
                </div>

                {/* Subject Selector (Dropdown) */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full appearance-none bg-white border border-neutral-200 text-neutral-900 text-sm rounded-lg focus:ring-brand-red focus:border-brand-red block p-2.5 pr-8 shadow-sm font-medium"
                        >
                            {subjects.map((subj) => (
                                <option key={subj} value={subj}>
                                    {subj}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
                            <ChevronRight className="h-4 w-4 rotate-90" />
                        </div>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={handleAddSubject}
                            className="p-2.5 rounded-lg border border-dashed border-neutral-300 text-neutral-400 hover:border-brand-red hover:text-brand-red transition-colors bg-white"
                            title="Tambah Bidang DTP Baru"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* --- TEAM TEACHING SECTION --- */}
            <div className="bg-white p-3 md:p-4 rounded-xl border border-neutral-200 shadow-sm mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg shrink-0">
                        <Users className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm font-bold text-neutral-900">Tim Pengajar {selectedSubject}</h3>
                        <p className="text-[10px] md:text-xs text-neutral-500">
                            {currentTeam.length > 0
                                ? `${currentTeam.length} Mentor aktif (Industri & Internal)`
                                : 'Belum ada pengajar ditugaskan'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex -space-x-2 mr-2">
                        {currentTeam.map(mentor => (
                            <div key={mentor.id} className="relative w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-neutral-100 overflow-hidden" title={`${mentor.name} (${mentor.role})`}>
                                <Image src={`https://ui-avatars.com/api/?name=${mentor.avatar}&background=random&color=fff`} alt={mentor.name} fill className="object-cover" />
                            </div>
                        ))}
                        {currentTeam.length === 0 && <span className="text-[10px] text-neutral-400 italic">-- Empty --</span>}
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => setShowTeamModal(true)}
                            className="px-3 py-1.5 bg-neutral-900 text-white text-[10px] md:text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shrink-0"
                        >
                            <Edit3 className="h-3 w-3" />
                            Kelola Tim
                        </button>
                    )}
                </div>
            </div>

            {/* Readiness Indicator (Admin Only) */}
            {isAdmin && (
                <div className="bg-indigo-50 border border-indigo-100 p-3 md:p-4 rounded-xl mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 md:p-3 bg-white rounded-full shadow-sm shrink-0">
                            <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-sm md:text-base font-bold text-indigo-900">Kesiapan Materi: {activeMonth}</h3>
                            <p className="text-[10px] md:text-xs text-indigo-600">
                                {schedule.length} dari 4 Sesi Mingguan terisi ({Math.round((schedule.length / 4) * 100)}%)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:w-24 md:w-32 h-2 bg-indigo-200 rounded-full overflow-hidden">
                            <div
                                className={clsx("h-full rounded-full transition-all duration-500",
                                    schedule.length >= 4 ? "bg-green-500" : "bg-indigo-600"
                                )}
                                style={{ width: `${Math.min((schedule.length / 4) * 100, 100)}%` }}
                            />
                        </div>
                        <span className={clsx("px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold border shrink-0",
                            schedule.length >= 4 ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        )}>
                            {schedule.length >= 4 ? 'Siap Ajar' : 'Belum Lengkap'}
                        </span>
                    </div>
                </div>
            )}

            {/* Month Navigation & Admin Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <div className="flex items-center gap-1 md:gap-2 bg-white px-3 md:px-4 py-2 rounded-xl border border-neutral-200 shadow-sm flex-1 max-w-md">
                    <button onClick={handlePrevMonth} disabled={activeMonthIndex === 0} className="p-1.5 md:p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-30" title="Bulan Sebelumnya"><ChevronLeft className="h-5 w-5 md:h-6 md:w-6" /></button>
                    <div className="flex-1 text-center font-bold text-base md:text-xl text-neutral-900 flex items-center justify-center gap-1.5 md:gap-2">
                        <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 text-brand-red" /> {activeMonth}
                    </div>
                    <button onClick={handleNextMonth} disabled={activeMonthIndex === MONTHS.length - 1} className="p-1.5 md:p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors disabled:opacity-30" title="Bulan Berikutnya"><ChevronRight className="h-5 w-5 md:h-6 md:w-6" /></button>
                </div>

                {canEditContent && (
                    <button
                        onClick={() => setShowAddTopic(true)}
                        className="bg-brand-red text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-brand-dark transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Input Materi
                    </button>
                )}
            </div>

            {/* Main Content */}
            {selectedSubject !== 'Fiber Optic' && schedule.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50">
                    <Briefcase className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-neutral-900">Belum ada kurikulum</h3>
                    <p className="text-neutral-500">Silakan input materi untuk memulai kurikulum {selectedSubject}.</p>
                    {canEditContent && (
                        <button
                            onClick={() => setShowAddTopic(true)}
                            className="mt-4 text-brand-red font-bold hover:underline"
                        >
                            + Tambah Materi Pertama
                        </button>
                    )}
                </div>
            ) : (
                <>
                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                        {schedule.map((item) => {
                            const isRelevant = (userRole === 'admin' || userRole === 'student') ||
                                (isInternalUser && item.type === 'Internal') ||
                                (isIndustrialUser && item.type === 'Industrial');

                            return (
                                <div key={item.id} className={clsx("bg-white rounded-xl border border-neutral-200 shadow-sm p-4 transition-colors relative", !isRelevant && "opacity-40 grayscale bg-neutral-50")}>
                                    {canEditContent && (
                                        <div className="absolute right-3 top-3 flex gap-1">
                                            <button className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-400 hover:text-blue-600"><Edit3 className="h-3.5 w-3.5" /></button>
                                            <button className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-400 hover:text-brand-red"><Trash2 className="h-3.5 w-3.5" /></button>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-1.5 mb-2 flex-wrap pr-16">
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">{item.code}</span>
                                        <span className={clsx("px-1.5 py-0.5 rounded text-[10px] font-bold border", item.type === 'Internal' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-orange-50 text-orange-700 border-orange-100")}>
                                            {item.type === 'Internal' ? 'Internal' : 'Industri'}
                                        </span>
                                        {item.assessmentScore !== undefined && (
                                            <span className={clsx("px-1.5 py-0.5 rounded text-[10px] font-bold", scoreBg(item.assessmentScore), scoreColor(item.assessmentScore))}>
                                                {item.assessmentScore}/100
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-sm font-bold text-neutral-900 mb-1">{item.topic}</h3>
                                    <p className="text-xs text-neutral-500 mb-2">{item.goal}</p>

                                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                                        <div className="flex items-center gap-2">
                                            <div className={clsx("h-6 w-6 rounded-full flex items-center justify-center text-[10px] text-white font-bold", item.type === 'Internal' ? "bg-blue-500" : "bg-orange-500")}>
                                                {item.teacher.charAt(0)}
                                            </div>
                                            <span className="text-xs font-medium text-neutral-700">{item.teacher}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map(week => (
                                                <div key={week} className={clsx("h-6 w-6 rounded text-[9px] font-bold flex items-center justify-center",
                                                    item.weeks.includes(week)
                                                        ? (item.type === 'Internal' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700")
                                                        : "bg-neutral-50 text-neutral-300"
                                                )}>
                                                    {week}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-[10px] text-neutral-400 font-medium">Asesmen: {item.assessment}</div>
                                        {item.materialUrl && (
                                            <a href={item.materialUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700">
                                                {item.materialType === 'pdf' ? <FileText className="h-3 w-3" /> : <LinkIcon className="h-3 w-3" />}
                                                {item.materialType === 'pdf' ? 'PDF' : 'Link'}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden overflow-x-auto">
                        <div className="min-w-[900px]">
                            <div className="grid grid-cols-12 bg-neutral-50 border-b border-neutral-200 divide-x divide-neutral-200">
                                <div className="col-span-4 px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Materi & Capaian</div>
                                <div className="col-span-1 px-2 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-center">Nilai</div>
                                <div className="col-span-2 px-4 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-center">Pengajar</div>
                                <div className="col-span-1 px-2 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-center">Materi</div>
                                {[1, 2, 3, 4].map(w => <div key={w} className="col-span-1 px-2 py-4 text-center text-xs font-bold text-neutral-500 uppercase">Mg {w}</div>)}
                            </div>

                            {schedule.map((item) => {
                                const isRelevant = (userRole === 'admin' || userRole === 'student') ||
                                    (isInternalUser && item.type === 'Internal') ||
                                    (isIndustrialUser && item.type === 'Industrial');

                                return (
                                    <div key={item.id} className={clsx("grid grid-cols-12 border-b border-neutral-100 divide-x divide-neutral-100 transition-colors group relative", !isRelevant && "opacity-40 grayscale bg-neutral-50")}>
                                        {canEditContent && (
                                            <div className="absolute right-2 top-2 hidden group-hover:flex gap-1 z-10">
                                                <button className="p-1 bg-white border border-neutral-200 rounded text-neutral-500 hover:text-blue-600"><Edit3 className="h-3 w-3" /></button>
                                                <button className="p-1 bg-white border border-neutral-200 rounded text-neutral-500 hover:text-brand-red"><Trash2 className="h-3 w-3" /></button>
                                            </div>
                                        )}

                                        <div className="col-span-4 px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">{item.code}</span>
                                                <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold border", item.type === 'Internal' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-orange-50 text-orange-700 border-orange-100")}>
                                                    {item.type === 'Internal' ? 'Rabu (Internal)' : 'Kamis (Industri)'}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-bold text-neutral-900">{item.topic}</h3>
                                            <p className="text-xs text-neutral-500 mt-1">{item.goal}</p>
                                            <div className="mt-2 text-[10px] text-neutral-400 font-medium">Asesmen: {item.assessment}</div>
                                        </div>

                                        {/* Score Column */}
                                        <div className="col-span-1 px-2 py-4 flex items-center justify-center">
                                            {item.assessmentScore !== undefined ? (
                                                <div className={clsx("px-2 py-1 rounded-lg text-center", scoreBg(item.assessmentScore))}>
                                                    <p className={clsx("text-lg font-black", scoreColor(item.assessmentScore))}>{item.assessmentScore}</p>
                                                    <p className="text-[9px] text-neutral-400">/100</p>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-neutral-300">—</span>
                                            )}
                                        </div>

                                        <div className="col-span-2 px-4 py-4 flex items-center justify-center text-center">
                                            <div>
                                                <div className={clsx("h-8 w-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs text-white font-bold", item.type === 'Internal' ? "bg-blue-500" : "bg-orange-500")}>
                                                    {item.teacher.charAt(0)}
                                                </div>
                                                <p className="text-xs font-medium text-neutral-700">{item.teacher}</p>
                                            </div>
                                        </div>

                                        {/* Material Column */}
                                        <div className="col-span-1 px-2 py-4 flex items-center justify-center">
                                            {item.materialUrl ? (
                                                <a href={item.materialUrl} target="_blank" rel="noopener noreferrer"
                                                    className={clsx("flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-neutral-50 transition-colors",
                                                        item.materialType === 'pdf' ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-600"
                                                    )}>
                                                    {item.materialType === 'pdf' ? <FileText className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
                                                    <span className="text-[9px] font-bold uppercase">{item.materialType === 'pdf' ? 'PDF' : 'Link'}</span>
                                                </a>
                                            ) : (
                                                <span className="text-xs text-neutral-300">—</span>
                                            )}
                                        </div>

                                        {[1, 2, 3, 4].map(week => (
                                            <div key={week} className="col-span-1 p-2 relative">
                                                {item.weeks.includes(week) && (
                                                    <div className={clsx("absolute inset-2 rounded-lg shadow-sm border flex items-center justify-center text-[10px] font-bold cursor-help", item.type === 'Internal' ? "bg-blue-100 border-blue-200 text-blue-700" : "bg-orange-100 border-orange-200 text-orange-700")}>
                                                        {item.type === 'Internal' ? 'Rabu' : 'Kamis'}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}

            {/* --- MODALS --- */}

            {/* 1. Add Topic Modal */}
            {showAddTopic && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-neutral-900 mb-6">Input Materi Kurikulum Baru</h2>
                        <form onSubmit={handleAddTopicSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1">Kode Materi</label>
                                    <input required type="text" placeholder="MT-X" className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                        value={newTopic.code} onChange={e => setNewTopic({ ...newTopic, code: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1">Tipe Sesi</label>
                                    <select className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                        value={newTopic.type} onChange={e => setNewTopic({ ...newTopic, type: e.target.value, teacher: '' })} >
                                        <option value="Internal">Rabu (Internal)</option>
                                        <option value="Industrial">Kamis (Industri)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Teacher Dropdown (Revision 2) */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1">Pengajar</label>
                                <select required className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                    value={newTopic.teacher} onChange={e => setNewTopic({ ...newTopic, teacher: e.target.value })}>
                                    <option value="">-- Pilih Pengajar --</option>
                                    {filteredMentors.map(m => (
                                        <option key={m.id} value={m.name}>{m.name} ({m.role})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1">Topik Pembelajaran</label>
                                <input required type="text" placeholder="Judul Materi..." className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                    value={newTopic.topic} onChange={e => setNewTopic({ ...newTopic, topic: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1">Tujuan / Goal</label>
                                <input required type="text" placeholder="Capaian siswa..." className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                    value={newTopic.goal} onChange={e => setNewTopic({ ...newTopic, goal: e.target.value })} />
                            </div>

                            {/* Assessment with Score (Revision 1) */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-neutral-500 mb-1">Metode Asesmen</label>
                                    <input required type="text" placeholder="Contoh: Tes Lisan, Project..." className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                        value={newTopic.assessment} onChange={e => setNewTopic({ ...newTopic, assessment: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1">Nilai Target</label>
                                    <div className="relative">
                                        <input required type="number" min={0} max={100} placeholder="80"
                                            className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none pr-10"
                                            value={newTopic.assessmentScore} onChange={e => setNewTopic({ ...newTopic, assessmentScore: parseInt(e.target.value) || 0 })} />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">/100</span>
                                    </div>
                                </div>
                            </div>

                            {/* Material Upload (Revision 4) */}
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-2">Lampiran Materi <span className="text-neutral-400 font-normal">(opsional)</span></label>
                                <div className="flex items-center gap-3 mb-2">
                                    <label className={clsx("flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all",
                                        newTopic.materialType === 'pdf' ? "bg-red-50 border-red-200 text-red-700" : "bg-white border-neutral-200 text-neutral-500 hover:border-red-200")}>
                                        <input type="radio" name="materialType" value="pdf" checked={newTopic.materialType === 'pdf'}
                                            onChange={() => setNewTopic({ ...newTopic, materialType: 'pdf' })} className="hidden" />
                                        <FileText className="h-3.5 w-3.5" /> PDF / File
                                    </label>
                                    <label className={clsx("flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all",
                                        newTopic.materialType === 'link' ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-neutral-200 text-neutral-500 hover:border-blue-200")}>
                                        <input type="radio" name="materialType" value="link" checked={newTopic.materialType === 'link'}
                                            onChange={() => setNewTopic({ ...newTopic, materialType: 'link' })} className="hidden" />
                                        <LinkIcon className="h-3.5 w-3.5" /> Link URL
                                    </label>
                                </div>
                                <input type="url" placeholder={newTopic.materialType === 'pdf' ? "https://drive.google.com/file/..." : "https://docs.google.com/..."}
                                    className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                    value={newTopic.materialUrl} onChange={e => setNewTopic({ ...newTopic, materialUrl: e.target.value })} />
                            </div>

                            <div className="pt-4 flex items-center gap-3">
                                <button type="button" onClick={() => setShowAddTopic(false)} className="flex-1 py-3 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200">
                                    Batal
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-red-200">
                                    Simpan Materi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 2. Manage Team Modal */}
            {showTeamModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-neutral-900">Kelola Tim Pengajar</h2>
                            <button onClick={() => setShowTeamModal(false)} className="p-2 hover:bg-neutral-100 rounded-full"><X className="h-5 w-5 text-neutral-400" /></button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-neutral-500 mb-2">Pilih mentor yang bertugas untuk mata pelajaran <strong>{selectedSubject}</strong>:</p>
                        </div>

                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                            {ALL_MENTORS.map(mentor => {
                                const isSelected = currentTeamIds.includes(mentor.id);
                                return (
                                    <div
                                        key={mentor.id}
                                        onClick={() => toggleMentorInTeam(mentor.id)}
                                        className={clsx("flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all", isSelected ? "bg-indigo-50 border-indigo-200" : "bg-white border-neutral-200 hover:border-indigo-200")}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-neutral-100 overflow-hidden relative border border-neutral-200">
                                            <Image src={`https://ui-avatars.com/api/?name=${mentor.avatar}&background=random&color=fff`} alt={mentor.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-neutral-900">{mentor.name}</p>
                                            <p className="text-xs text-neutral-500">{mentor.role}</p>
                                        </div>
                                        <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center border", isSelected ? "bg-indigo-600 border-indigo-600" : "bg-white border-neutral-300")}>
                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pt-6 border-t border-neutral-100 mt-6">
                            <button onClick={() => setShowTeamModal(false)} className="w-full py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black">
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. Add Subject Modal */}
            {showAddSubjectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-neutral-900">Tambah Bidang Baru</h2>
                            <button onClick={() => { setShowAddSubjectModal(false); setNewSubjectName(''); }} className="p-2 hover:bg-neutral-100 rounded-full">
                                <X className="h-5 w-5 text-neutral-400" />
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-neutral-500 mb-2">Nama Bidang / Jurusan</label>
                            <input
                                type="text"
                                placeholder="Contoh: Cloud Computing"
                                className="w-full p-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none"
                                value={newSubjectName}
                                onChange={e => setNewSubjectName(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => { setShowAddSubjectModal(false); setNewSubjectName(''); }}
                                className="flex-1 py-3 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleAddSubjectSubmit}
                                disabled={!newSubjectName.trim()}
                                className="flex-1 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
