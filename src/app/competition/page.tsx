'use client';

import { useState } from 'react';
import { Trophy, Target, ArrowRight, Sword, Cpu, Lock, AlertCircle, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { useSidebar } from '@/components/SidebarContext';

const INITIAL_CHALLENGES = [
    {
        id: 1,
        title: "LKS Web Technologies 2026",
        level: "Expert",
        deadline: "15 April 2026",
        participants: [
            { id: 's1', name: 'Alexander Grahambell', class: 'XI RPL 1', status: 'Reviewing' },
            { id: 's2', name: 'Sarah Connor', class: 'XI RPL 1', status: 'Accepted' }
        ],
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
        tags: ["Fullstack", "Speed Coding"]
    },
    {
        id: 2,
        title: "Hackathon: Smart City Sol.",
        level: "Advanced",
        deadline: "20 Maret 2026",
        participants: [],
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        tags: ["IoT", "Mobile App"]
    },
    {
        id: 3,
        title: "Project: School ERP System",
        level: "Hard",
        deadline: "30 Mei 2026",
        participants: [],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tags: ["System Design", "Database"]
    }
];

const LEADERBOARD = [
    { rank: 1, name: "Alexander Grahambell", points: 2450, class: "XI RPL 1" },
    { rank: 2, name: "Sarah Connor", points: 2100, class: "XI RPL 1" },
    { rank: 3, name: "Harvey Specter", points: 1950, class: "XI RPL 2" },
    { rank: 4, name: "Mike Ross", points: 1800, class: "XI RPL 1" },
    { rank: 5, name: "Rachel Zane", points: 1650, class: "XI RPL 3" },
];

type LearnerStatus = 'Fast' | 'Middle' | 'Slow';

// New Types
type Participant = { id: string; name: string; class: string; status: string; };
type Challenge = {
    id: number;
    title: string;
    level: string;
    deadline: string;
    participants: Participant[];
    image: string;
    tags: string[];
};

export default function CompetitionPage() {
    const { userRole } = useSidebar();

    // Demo State: Default to Fast for Admin/Teacher, Fast for Student (initially)
    // State management for Challenges
    const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showManageModal, setShowManageModal] = useState(false);

    // Form State
    const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({
        title: '', level: 'Expert', deadline: '', tags: [], image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
    });

    // Demo State: Default to Fast for Admin/Teacher, Fast for Student (initially)
    const [studentStatus, setStudentStatus] = useState<LearnerStatus>('Fast');
    const [isDemoControlsVisible, setIsDemoControlsVisible] = useState(false);

    // Guard Logic
    // Admin/Mentors always see "Unlocked" view (simulated as Fast)
    // Students depend on studentStatus
    const isLocked = userRole === 'student' && studentStatus !== 'Fast';
    const canManage = userRole === 'admin' || userRole === 'industry_mentor' || userRole === 'internal_mentor';

    // Handlers
    const handleCreateChallenge = (e: React.FormEvent) => {
        e.preventDefault();
        const id = Math.max(...challenges.map(c => c.id)) + 1;
        const created: Challenge = {
            id,
            title: newChallenge.title || 'New Challenge',
            level: newChallenge.level || 'Advanced',
            deadline: newChallenge.deadline || 'TBA',
            participants: [],
            image: newChallenge.image || '',
            tags: typeof newChallenge.tags === 'string' ? (newChallenge.tags as string).split(',') : ['New'],
        };
        setChallenges([...challenges, created]);
        setShowCreateModal(false);
        setNewChallenge({ title: '', level: 'Expert', deadline: '', tags: [] });
    };

    const handleJoinChallenge = (id: number) => {
        if (userRole !== 'student') return;
        alert("Simulasi: Anda berhasil mendaftar ke kompetisi ini! Menunggu konfirmasi mentor.");
        setChallenges(prev => prev.map(c => {
            if (c.id === id) {
                return {
                    ...c,
                    participants: [...c.participants, { id: 'me', name: 'Anda (Siswa)', class: 'XII RPL', status: 'Pending' }]
                };
            }
            return c;
        }));
    };

    const openManageModal = (challenge: Challenge) => {
        setSelectedChallenge(challenge);
        setShowManageModal(true);
    };

    return (
        <div className="space-y-8 relative">

            {/* --- DEMO CONTROLS (Secret Toggle) --- */}
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setIsDemoControlsVisible(!isDemoControlsVisible)}
                    className="bg-black/80 text-white p-2 rounded-full shadow-lg hover:bg-black transition-all"
                    title="Toggle Demo Controls"
                >
                    <RefreshCw className={clsx("h-4 w-4", isDemoControlsVisible && "animate-spin")} />
                </button>

                {isDemoControlsVisible && (
                    <div className="absolute bottom-12 right-0 bg-white p-4 rounded-xl shadow-2xl border border-neutral-200 w-64 animate-in slide-in-from-bottom-2">
                        <h4 className="text-xs font-bold text-neutral-500 uppercase mb-3">Simulasi Kecerdasan Sistem</h4>
                        <div className="space-y-2">
                            <p className="text-xs text-neutral-400">Set Status Siswa (Demo):</p>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setStudentStatus('Fast')}
                                    className={clsx("text-left px-3 py-2 rounded-lg text-xs font-bold border transition-all", studentStatus === 'Fast' ? "bg-emerald-100 border-emerald-300 text-emerald-700" : "bg-neutral-50 border-neutral-200 text-neutral-600")}
                                >
                                    🟢 Fast Learner (Unlocked)
                                </button>
                                <button
                                    onClick={() => setStudentStatus('Middle')}
                                    className={clsx("text-left px-3 py-2 rounded-lg text-xs font-bold border transition-all", studentStatus === 'Middle' ? "bg-amber-100 border-amber-300 text-amber-700" : "bg-neutral-50 border-neutral-200 text-neutral-600")}
                                >
                                    🟡 Middle Learner (Locked)
                                </button>
                                <button
                                    onClick={() => setStudentStatus('Slow')}
                                    className={clsx("text-left px-3 py-2 rounded-lg text-xs font-bold border transition-all", studentStatus === 'Slow' ? "bg-red-100 border-red-300 text-red-700" : "bg-neutral-50 border-neutral-200 text-neutral-600")}
                                >
                                    🔴 Slow Learner (Locked)
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- LOCKED STATE --- */}
            {isLocked ? (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-neutral-50 rounded-3xl border border-neutral-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-5"></div>

                    <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mb-6 relative z-10">
                        <Lock className="h-10 w-10 text-neutral-400" />
                        <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-2 border-4 border-neutral-50">
                            <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2 relative z-10">
                        Akses Competition Track Terkunci
                    </h1>
                    <p className="text-neutral-500 max-w-md mx-auto mb-8 relative z-10">
                        Fitur ini hanya terbuka untuk siswa dengan predikat <strong>Fast Learner</strong>.
                        Sistem mendeteksi performa Anda saat ini belum memenuhi syarat.
                    </p>

                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm max-w-sm w-full text-left relative z-10">
                        <h3 className="text-sm font-bold text-neutral-900 mb-4 border-b pb-2">Syarat Membuka Fitur:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600 flex items-center gap-2">
                                    <span className={clsx("w-2 h-2 rounded-full", studentStatus === 'Slow' ? "bg-red-500" : "bg-green-500")}></span>
                                    Kehadiran &gt; 90%
                                </span>
                                <span className={clsx("font-bold", studentStatus === 'Slow' ? "text-red-500" : "text-green-500")}>
                                    {studentStatus === 'Slow' ? '65%' : '88%'}
                                </span>
                            </li>
                            <li className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600 flex items-center gap-2">
                                    <span className={clsx("w-2 h-2 rounded-full", studentStatus === 'Slow' ? "bg-red-500" : "bg-amber-500")}></span>
                                    Kompetensi Jurnal
                                </span>
                                <span className={clsx("font-bold", studentStatus === 'Slow' ? "text-red-500" : "text-amber-500")}>
                                    {studentStatus === 'Slow' ? 'Perlu Perbaikan' : 'Cukup Baik'}
                                </span>
                            </li>
                        </ul>
                        <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
                            <p className="text-xs text-neutral-400 mb-2">Tingkatkan keaktifan di kelas untuk membuka fitur ini.</p>
                            <button className="w-full py-2 bg-neutral-900 text-white rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">
                                Request Unlock (Locked)
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* --- UNLOCKED / ORIGINAL CONTENT --- */
                <>
                    {/* Hero Section */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/90 to-brand-dark/50 z-10" />
                        <Image
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"
                            alt="Competition"
                            fill
                            className="object-cover opacity-50"
                        />
                        <div className="relative z-20 p-8 sm:p-12 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Trophy className="h-3 w-3" />
                                    Fast Learners Only
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                                Competition Track <span className="text-red-200">Hub</span>
                            </h1>
                            <p className="text-lg text-red-100 max-w-xl mb-8">
                                Arena khusus talenta terbaik. Akses challenge tingkat lanjut, simulasi LKS, dan proyek real-case dari industri.
                            </p>
                            <button className="px-6 py-3 bg-white text-brand-red rounded-lg font-bold hover:bg-neutral-100 transition-all flex items-center gap-2">
                                Lihat Challenge Aktif
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content: Challenges */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Sword className="h-5 w-5 text-brand-red" />
                                    Active Challenges
                                </h2>
                                {canManage && (
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-brand-dark shadow-lg shadow-red-200 flex items-center gap-2"
                                    >
                                        + Buat Challenge
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {challenges.map((challenge) => (
                                    <div key={challenge.id} className="group flex flex-col sm:flex-row bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:border-red-200 relative">

                                        {canManage && (
                                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openManageModal(challenge)}
                                                    className="bg-white text-slate-700 px-3 py-1 rounded-md text-xs font-bold shadow-sm border border-slate-200 hover:bg-slate-50"
                                                >
                                                    Kelola Peserta
                                                </button>
                                            </div>
                                        )}

                                        <div className="relative h-48 sm:h-auto sm:w-48 shrink-0">
                                            <Image
                                                src={challenge.image}
                                                alt={challenge.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col justify-between flex-grow">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase tracking-wider">
                                                        {challenge.level}
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-500">
                                                        Deadline: {challenge.deadline}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors">
                                                    {challenge.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {challenge.tags.map((tag, idx) => (
                                                        <span key={idx} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <div className="flex -space-x-2 items-center">
                                                    {challenge.participants.slice(0, 3).map((p, i) => (
                                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                            {p.name.charAt(0)}
                                                        </div>
                                                    ))}
                                                    {challenge.participants.length > 3 && (
                                                        <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                            +{challenge.participants.length - 3}
                                                        </div>
                                                    )}
                                                    {challenge.participants.length === 0 && <span className="text-xs text-slate-400 ml-2">Belum ada peserta</span>}
                                                </div>

                                                {!canManage && (
                                                    <button
                                                        onClick={() => handleJoinChallenge(challenge.id)}
                                                        className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-brand-red transition-colors"
                                                    >
                                                        Join Challenge
                                                    </button>
                                                )}
                                                {canManage && (
                                                    <div className="text-xs text-slate-500 font-medium">
                                                        {challenge.participants.length} Pendaftar
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar: Leaderboard */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Target className="h-5 w-5 text-brand-red" />
                                    Top Global Rank
                                </h2>
                                <div className="space-y-4">
                                    {LEADERBOARD.map((student, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0
                    ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                    index === 1 ? 'bg-slate-100 text-slate-700' :
                                                        index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-white text-slate-400 border border-slate-100'}
                  `}>
                                                {student.rank}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-bold text-slate-900 truncate">{student.name}</p>
                                                <p className="text-xs text-slate-500">{student.class}</p>
                                            </div>
                                            <div className="text-sm font-bold text-brand-red">
                                                {student.points} pts
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium">
                                    Lihat Ranking Lengkap
                                </button>
                            </div>

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white relative overflow-hidden">
                                <Cpu className="absolute -bottom-4 -right-4 h-24 w-24 text-white/5" />
                                <h3 className="font-bold text-lg mb-2">Mentor Session</h3>
                                <p className="text-slate-300 text-sm mb-4">
                                    Sesi bimbingan khusus untuk persiapan LKS tingkat provinsi.
                                </p>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center font-bold">M</div>
                                    <div>
                                        <p className="font-medium text-sm">Mas Mentor</p>
                                        <p className="text-xs text-slate-400">Expert Engineer</p>
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors border border-white/10">
                                    Jadwalkan Sesi
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* --- MODALS --- */}

            {/* Create Challenge Modal */}
            {
                showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                        <div className="bg-white rounded-2xl w-full max-w-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Buat Challenge Baru</h2>
                            <form onSubmit={handleCreateChallenge} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Judul Kompetisi</label>
                                    <input required type="text" className="w-full p-2 border rounded-lg" value={newChallenge.title} onChange={e => setNewChallenge({ ...newChallenge, title: e.target.value })} placeholder="Contoh: LKS Web Tech" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Level Difficulty</label>
                                        <select className="w-full p-2 border rounded-lg" value={newChallenge.level} onChange={e => setNewChallenge({ ...newChallenge, level: e.target.value })}>
                                            <option value="Expert">Expert</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="intermediate">Intermediate</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Deadline</label>
                                        <input required type="text" className="w-full p-2 border rounded-lg" value={newChallenge.deadline} onChange={e => setNewChallenge({ ...newChallenge, deadline: e.target.value })} placeholder="DD Month YYYY" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Tags (pisahkan koma)</label>
                                    <input type="text" className="w-full p-2 border rounded-lg" placeholder="React, IoT, Network..." onChange={e => setNewChallenge({ ...newChallenge, tags: e.target.value.split(',') })} />
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-2 bg-slate-100 font-bold rounded-lg">Batal</button>
                                    <button type="submit" className="flex-1 py-2 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-dark">Publish Challenge</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Manage Participants Modal */}
            {
                showManageModal && selectedChallenge && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
                        <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative">
                            <button onClick={() => setShowManageModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"><RefreshCw className="h-5 w-5" /></button>
                            <h2 className="text-xl font-bold mb-1">Kelola Peserta</h2>
                            <p className="text-slate-500 text-sm mb-6">Challenge: {selectedChallenge.title}</p>

                            <div className="border rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 text-slate-500 border-b">
                                        <tr>
                                            <th className="px-4 py-3">Nama Siswa</th>
                                            <th className="px-4 py-3">Kelas</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {selectedChallenge.participants.length === 0 ? (
                                            <tr><td colSpan={4} className="p-8 text-center text-slate-400 italic">Belum ada pendaftar.</td></tr>
                                        ) : (
                                            selectedChallenge.participants.map(p => (
                                                <tr key={p.id}>
                                                    <td className="px-4 py-3 font-bold">{p.name}</td>
                                                    <td className="px-4 py-3 text-slate-500">{p.class}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={clsx("px-2 py-1 rounded text-xs font-bold", p.status === 'Accepted' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <button className="text-blue-600 font-bold hover:underline text-xs">Detail</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6 text-right">
                                <button onClick={() => setShowManageModal(false)} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Tutup</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
