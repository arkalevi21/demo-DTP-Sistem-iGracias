'use client';

import { useState } from 'react';
import { Plus, X, Edit3, Trash2, Check, BookOpen, Users, GraduationCap, Briefcase } from 'lucide-react';
import clsx from 'clsx';
import { useSidebar } from '@/components/SidebarContext';
import Image from 'next/image';
import { ALL_MENTORS } from '@/data/schedule';

type Subject = {
    id: string;
    name: string;
    description: string;
    mentorIds: string[];
    color: string;
};

const COLORS = [
    { value: 'red', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
    { value: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
    { value: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    { value: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500' },
    { value: 'orange', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500' },
    { value: 'indigo', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', dot: 'bg-indigo-500' },
];

const getColor = (c: string) => COLORS.find(co => co.value === c) || COLORS[0];

const INITIAL_SUBJECTS: Subject[] = [
    { id: '1', name: 'Fiber Optic', description: 'Instalasi, splicing, dan terminasi jaringan fiber optic', mentorIds: ['m1', 'm3', 'm4'], color: 'red' },
    { id: '2', name: 'Web Development', description: 'HTML, CSS, JavaScript, React.js dan pengembangan web modern', mentorIds: ['m2', 'm3'], color: 'blue' },
    { id: '3', name: 'UI/UX Design', description: 'Desain antarmuka pengguna dan pengalaman pengguna menggunakan Figma', mentorIds: ['m5'], color: 'purple' },
];

export default function PlannerPage() {
    const { userRole } = useSidebar();
    const isAdmin = userRole === 'admin';

    const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
    const [showAdd, setShowAdd] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showMentorModal, setShowMentorModal] = useState<string | null>(null);

    // Form state
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newColor, setNewColor] = useState('red');

    const resetForm = () => {
        setNewName(''); setNewDesc(''); setNewColor('red');
        setShowAdd(false); setEditingId(null);
    };

    const handleSave = () => {
        if (!newName.trim()) return;
        if (editingId) {
            setSubjects(prev => prev.map(s =>
                s.id === editingId ? { ...s, name: newName, description: newDesc, color: newColor } : s
            ));
        } else {
            setSubjects(prev => [...prev, {
                id: `s-${Date.now()}`, name: newName, description: newDesc,
                mentorIds: [], color: newColor,
            }]);
        }
        resetForm();
    };

    const handleEdit = (subject: Subject) => {
        setNewName(subject.name);
        setNewDesc(subject.description);
        setNewColor(subject.color);
        setEditingId(subject.id);
        setShowAdd(true);
    };

    const handleDelete = (id: string) => {
        setSubjects(prev => prev.filter(s => s.id !== id));
    };

    const toggleMentor = (subjectId: string, mentorId: string) => {
        setSubjects(prev => prev.map(s => {
            if (s.id !== subjectId) return s;
            const has = s.mentorIds.includes(mentorId);
            return { ...s, mentorIds: has ? s.mentorIds.filter(m => m !== mentorId) : [...s.mentorIds, mentorId] };
        }));
    };

    // Non-admin redirect
    if (!isAdmin) {
        return (
            <div className="max-w-6xl mx-auto py-20 text-center">
                <Briefcase className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-neutral-700">Halaman Khusus Admin</h2>
                <p className="text-neutral-500 text-sm mt-2">Halaman ini hanya dapat diakses oleh admin untuk mengelola bidang pelajaran.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Kelola Bidang</h1>
                        <span className="bg-brand-red/10 text-brand-red border border-brand-red/20 text-[10px] font-bold px-2 py-0.5 rounded-full">ADMIN</span>
                    </div>
                    <p className="text-sm text-neutral-500">Atur bidang pelajaran dan tim pengajar DTP</p>
                </div>
                {!showAdd && (
                    <button
                        onClick={() => setShowAdd(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-brand-dark transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Bidang
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {showAdd && (
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-lg mb-6 p-5 md:p-6">
                    <h2 className="text-lg font-bold text-neutral-900 mb-4">
                        {editingId ? 'Edit Bidang' : 'Tambah Bidang Baru'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-1.5">Nama Bidang</label>
                            <input
                                type="text" placeholder="Contoh: Cloud Computing"
                                className="w-full p-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none"
                                value={newName} onChange={e => setNewName(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-1.5">Deskripsi</label>
                            <textarea
                                rows={2} placeholder="Deskripsi singkat bidang pelajaran..."
                                className="w-full p-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none resize-none"
                                value={newDesc} onChange={e => setNewDesc(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-2">Warna Label</label>
                            <div className="flex gap-2">
                                {COLORS.map(c => (
                                    <button
                                        key={c.value}
                                        onClick={() => setNewColor(c.value)}
                                        className={clsx(
                                            "w-8 h-8 rounded-full border-2 transition-all",
                                            c.dot,
                                            newColor === c.value ? "ring-2 ring-offset-2 ring-neutral-400 scale-110" : "opacity-60 hover:opacity-100"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <button onClick={resetForm} className="flex-1 py-3 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200 transition-colors">
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!newName.trim()}
                                className="flex-1 py-3 bg-brand-red text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-brand-dark transition-all disabled:opacity-40"
                            >
                                {editingId ? 'Simpan Perubahan' : 'Tambah Bidang'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subjects Grid */}
            <div className="space-y-3">
                {subjects.map(subject => {
                    const color = getColor(subject.color);
                    const team = ALL_MENTORS.filter(m => subject.mentorIds.includes(m.id));

                    return (
                        <div key={subject.id} className={clsx("bg-white rounded-xl border shadow-sm overflow-hidden transition-all hover:shadow-md", color.border)}>
                            <div className="p-4 md:p-5">
                                <div className="flex items-start gap-3">
                                    <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", color.bg)}>
                                        <BookOpen className={clsx("h-5 w-5", color.text)} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-base font-bold text-neutral-900">{subject.name}</h3>
                                            <div className={clsx("w-2 h-2 rounded-full", color.dot)} />
                                        </div>
                                        <p className="text-sm text-neutral-500">{subject.description}</p>
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                        <button onClick={() => handleEdit(subject)} className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-400 hover:text-blue-600 transition-colors">
                                            <Edit3 className="h-3.5 w-3.5" />
                                        </button>
                                        <button onClick={() => handleDelete(subject.id)} className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Team */}
                                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-neutral-400" />
                                        <span className="text-xs font-medium text-neutral-500">
                                            {team.length > 0 ? `${team.length} Pengajar` : 'Belum ada pengajar'}
                                        </span>
                                        <div className="flex -space-x-1.5 ml-1">
                                            {team.slice(0, 4).map(m => (
                                                <div key={m.id} className="w-6 h-6 rounded-full border-2 border-white bg-neutral-100 overflow-hidden relative" title={m.name}>
                                                    <Image src={`https://ui-avatars.com/api/?name=${m.avatar}&background=random&color=fff`} alt={m.name} fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowMentorModal(subject.id)}
                                        className="text-xs font-bold text-neutral-600 hover:text-brand-red transition-colors flex items-center gap-1"
                                    >
                                        <GraduationCap className="h-3.5 w-3.5" />
                                        Kelola Tim
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mentor Assignment Modal */}
            {showMentorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-neutral-900">Kelola Tim Pengajar</h2>
                            <button onClick={() => setShowMentorModal(null)} className="p-2 hover:bg-neutral-100 rounded-full">
                                <X className="h-5 w-5 text-neutral-400" />
                            </button>
                        </div>
                        <p className="text-sm text-neutral-500 mb-4">
                            Pilih mentor untuk bidang <strong>{subjects.find(s => s.id === showMentorModal)?.name}</strong>:
                        </p>
                        <div className="space-y-2 max-h-[320px] overflow-y-auto">
                            {ALL_MENTORS.map(mentor => {
                                const isSelected = subjects.find(s => s.id === showMentorModal)?.mentorIds.includes(mentor.id);
                                return (
                                    <div
                                        key={mentor.id}
                                        onClick={() => toggleMentor(showMentorModal, mentor.id)}
                                        className={clsx(
                                            "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                            isSelected ? "bg-indigo-50 border-indigo-200" : "bg-white border-neutral-200 hover:border-indigo-200"
                                        )}
                                    >
                                        <div className="w-9 h-9 rounded-full bg-neutral-100 overflow-hidden relative">
                                            <Image src={`https://ui-avatars.com/api/?name=${mentor.avatar}&background=random&color=fff`} alt={mentor.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-neutral-900">{mentor.name}</p>
                                            <p className="text-xs text-neutral-500">{mentor.role}</p>
                                        </div>
                                        <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center border",
                                            isSelected ? "bg-indigo-600 border-indigo-600" : "bg-white border-neutral-300"
                                        )}>
                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="pt-4 mt-4 border-t border-neutral-100">
                            <button onClick={() => setShowMentorModal(null)} className="w-full py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black transition-colors">
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
