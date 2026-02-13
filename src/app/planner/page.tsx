'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Briefcase, GraduationCap, Users, Edit3, Trash2, Check, X, BarChart3 } from 'lucide-react';
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
    const [newTopic, setNewTopic] = useState({ code: '', topic: '', goal: '', assessment: '', teacher: '', type: 'Internal', weeks: [] as number[] });

    const activeMonth = MONTHS[activeMonthIndex];
    const schedule = scheduleData[activeMonth] || [];
    const currentTeamIds = subjectTeams[selectedSubject] || [];
    const currentTeam = ALL_MENTORS.filter(m => currentTeamIds.includes(m.id));

    // Filter Logic
    const isInternalUser = userRole === 'internal_mentor';
    const isIndustrialUser = userRole === 'industry_mentor';

    const handlePrevMonth = () => { if (activeMonthIndex > 0) setActiveMonthIndex(prev => prev - 1); };
    const handleNextMonth = () => { if (activeMonthIndex < MONTHS.length - 1) setActiveMonthIndex(prev => prev + 1); };

    // Admin Actions
    const handleAddSubject = () => {
        const newSubj = prompt("Masukkan Nama Bidang/Jurusan Baru:");
        if (newSubj && !subjects.includes(newSubj)) {
            setSubjects([...subjects, newSubj]);
            setSelectedSubject(newSubj);
        }
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
            ...newTopic,
            teacher: newTopic.teacher || (userRole === 'industry_mentor' ? 'Mentor Industri' : 'Guru Internal'),
            type: newTopic.type as ScheduleType,
            weeks: [1, 2, 3, 4] // Default all weeks for demo
        };

        setScheduleData(prev => ({
            ...prev,
            [activeMonth]: [...(prev[activeMonth] || []), newItem]
        }));
        setShowAddTopic(false);
        setNewTopic({ code: '', topic: '', goal: '', assessment: '', teacher: '', type: 'Internal', weeks: [] });
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 relative">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2 mb-2">
                        {isAdmin ? 'Input Kurikulum & Syllabus' : 'Perencanaan Kurikulum'}
                        {isAdmin && <span className="bg-brand-red/10 text-brand-red border border-brand-red/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Admin Mode</span>}
                        {isMentor && <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Editor Mode</span>}
                    </h1>
                    <p className="text-lg text-neutral-500 font-medium">Peta jalan pembelajaran tahun ajaran 2025/2026</p>
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
            <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                        <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-neutral-900">Tim Pengajar {selectedSubject}</h3>
                        <p className="text-xs text-neutral-500">
                            {currentTeam.length > 0
                                ? `${currentTeam.length} Mentor aktif (Industri & Internal)`
                                : 'Belum ada pengajar ditugaskan'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 mr-2">
                        {currentTeam.map(mentor => (
                            <div key={mentor.id} className="relative w-8 h-8 rounded-full border-2 border-white bg-neutral-100 overflow-hidden" title={`${mentor.name} (${mentor.role})`}>
                                <Image src={`https://ui-avatars.com/api/?name=${mentor.avatar}&background=random&color=fff`} alt={mentor.name} fill className="object-cover" />
                            </div>
                        ))}
                        {currentTeam.length === 0 && <span className="text-xs text-neutral-400 italic">-- Empty --</span>}
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => setShowTeamModal(true)}
                            className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
                        >
                            <Edit3 className="h-3 w-3" />
                            Kelola Tim
                        </button>
                    )}
                </div>
            </div>

            {/* Readiness Indicator (Admin Only) */}
            {isAdmin && (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                            <BarChart3 className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-indigo-900">Kesiapan Materi: {activeMonth}</h3>
                            <p className="text-xs text-indigo-600">
                                {schedule.length} dari 4 Sesi Mingguan terisi ({Math.round((schedule.length / 4) * 100)}%)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-32 h-2 bg-indigo-200 rounded-full overflow-hidden">
                            <div
                                className={clsx("h-full rounded-full transition-all duration-500",
                                    schedule.length >= 4 ? "bg-green-500" : "bg-indigo-600"
                                )}
                                style={{ width: `${Math.min((schedule.length / 4) * 100, 100)}%` }}
                            />
                        </div>
                        <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border",
                            schedule.length >= 4 ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        )}>
                            {schedule.length >= 4 ? 'Siap Ajar' : 'Belum Lengkap'}
                        </span>
                    </div>
                </div>
            )}

            {/* Month Navigation & Admin Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm flex-1 max-w-md">
                    <button onClick={handlePrevMonth} disabled={activeMonthIndex === 0} className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors tooltip tooltip-right" title="Bulan Sebelumnya"><ChevronLeft className="h-6 w-6" /></button>
                    <div className="flex-1 text-center font-bold text-xl text-neutral-900 flex items-center justify-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-brand-red" /> {activeMonth}
                    </div>
                    <button onClick={handleNextMonth} disabled={activeMonthIndex === MONTHS.length - 1} className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-neutral-900 transition-colors tooltip tooltip-left" title="Bulan Berikutnya"><ChevronRight className="h-6 w-6" /></button>
                </div>

                {canEditContent && (
                    <button
                        onClick={() => setShowAddTopic(true)}
                        className="bg-brand-red text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-brand-dark transition-all flex items-center gap-2"
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
                /* Timeline Grid */
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="grid grid-cols-12 bg-neutral-50 border-b border-neutral-200 divide-x divide-neutral-200">
                            <div className="col-span-4 px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Materi & Capaian</div>
                            <div className="col-span-2 px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-center">Pengajar</div>
                            {[1, 2, 3, 4].map(w => <div key={w} className="col-span-1.5 px-2 py-4 text-center text-xs font-bold text-neutral-500 uppercase">Mg {w}</div>)}
                        </div>

                        {schedule.map((item) => {
                            const isRelevant = (userRole === 'admin' || userRole === 'student') ||
                                (isInternalUser && item.type === 'Internal') ||
                                (isIndustrialUser && item.type === 'Industrial');

                            return (
                                <div key={item.id} className={clsx("grid grid-cols-12 border-b border-neutral-100 divide-x divide-neutral-100 transition-colors group relative", !isRelevant && "opacity-40 grayscale bg-neutral-50")}>
                                    {/* Admin Edit Overlay (Hover) */}
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

                                    <div className="col-span-2 px-4 py-4 flex items-center justify-center text-center">
                                        <div>
                                            <div className={clsx("h-8 w-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs text-white font-bold", item.type === 'Internal' ? "bg-blue-500" : "bg-orange-500")}>
                                                {item.teacher.charAt(0)}
                                            </div>
                                            <p className="text-xs font-medium text-neutral-700">{item.teacher}</p>
                                        </div>
                                    </div>

                                    {[1, 2, 3, 4].map(week => (
                                        <div key={week} className="col-span-1.5 p-2 relative">
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
            )}

            {/* --- MODALS --- */}

            {/* 1. Add Topic Modal */}
            {showAddTopic && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
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
                                        value={newTopic.type} onChange={e => setNewTopic({ ...newTopic, type: e.target.value })} >
                                        <option value="Internal">Rabu (Internal)</option>
                                        <option value="Industrial">Kamis (Industri)</option>
                                    </select>
                                </div>
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
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1">Metode Asesmen</label>
                                <input required type="text" placeholder="Contoh: Tes Lisan, Project..." className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                    value={newTopic.assessment} onChange={e => setNewTopic({ ...newTopic, assessment: e.target.value })} />
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
        </div>
    );
}
