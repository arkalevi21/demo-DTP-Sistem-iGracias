'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Users, Trophy, Tag, Clock, CheckCircle2, UserPlus, Shield } from 'lucide-react';
import clsx from 'clsx';
import { useSidebar } from '@/components/SidebarContext';

const CHALLENGES_DETAIL: Record<string, {
    id: number; title: string; level: string; deadline: string; image: string; tags: string[];
    description: string; rules: string[]; prizes: string[];
    participants: { id: string; name: string; class: string; status: string; avatar: string; joinDate: string }[];
    related: { id: number; title: string; level: string }[];
}> = {
    '1': {
        id: 1, title: 'LKS Web Technology 2026', level: 'Hard', deadline: '15 Maret 2026',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1200',
        tags: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL'],
        description: 'Lomba Kompetensi Siswa bidang Web Technology tingkat provinsi Jawa Timur. Peserta akan diminta membangun aplikasi web fullstack dalam waktu 8 jam dengan spesifikasi yang diberikan pada hari H.',
        rules: [
            'Peserta wajib siswa aktif SMK kelas XI atau XII',
            'Membawa laptop sendiri dengan software yang sudah terinstall',
            'Dilarang menggunakan AI tools atau code generator',
            'Waktu pengerjaan: 8 jam (08:00 - 16:00)',
            'Penilaian: Fungsionalitas (40%), UI/UX (30%), Code Quality (30%)',
        ],
        prizes: ['Juara 1: Rp 5.000.000 + Sertifikat + Tiket Nasional', 'Juara 2: Rp 3.000.000 + Sertifikat', 'Juara 3: Rp 1.500.000 + Sertifikat'],
        participants: [
            { id: '1', name: 'Alexander Grahambell', class: 'XI DTP 1', status: 'Registered', avatar: 'Alexander+Grahambell', joinDate: '2025-10-01' },
            { id: '2', name: 'Harvey Specter', class: 'XI DTP 1', status: 'Registered', avatar: 'Harvey+Specter', joinDate: '2025-10-05' },
            { id: '3', name: 'Jessica Pearson', class: 'XI DTP 1', status: 'In Progress', avatar: 'Jessica+Pearson', joinDate: '2025-10-08' },
        ],
        related: [
            { id: 2, title: 'Hackathon IoT Challenge', level: 'Medium' },
            { id: 3, title: 'UI/UX Design Sprint', level: 'Easy' },
        ],
    },
    '2': {
        id: 2, title: 'Hackathon IoT Challenge', level: 'Medium', deadline: '20 April 2026',
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=1200',
        tags: ['Arduino', 'ESP32', 'MQTT', 'Sensor'],
        description: 'Kompetisi Internet of Things dimana peserta membangun prototype perangkat IoT untuk menyelesaikan masalah nyata di lingkungan sekolah atau masyarakat sekitar.',
        rules: [
            'Tim terdiri dari 2-3 orang',
            'Wajib menggunakan minimal 1 microcontroller dan 2 sensor',
            'Presentasi prototype: 15 menit + 5 menit tanya jawab',
            'Penilaian: Inovasi (35%), Fungsionalitas (35%), Presentasi (30%)',
        ],
        prizes: ['Juara 1: Rp 3.000.000 + Kit Arduino', 'Juara 2: Rp 2.000.000 + Kit Sensor', 'Juara 3: Rp 1.000.000 + Sertifikat'],
        participants: [
            { id: '1', name: 'Sarah Connor', class: 'XI DTP 1', status: 'In Progress', avatar: 'Sarah+Connor', joinDate: '2025-10-10' },
            { id: '4', name: 'Donna Paulsen', class: 'XI DTP 1', status: 'Registered', avatar: 'Donna+Paulsen', joinDate: '2025-10-12' },
        ],
        related: [
            { id: 1, title: 'LKS Web Technology 2026', level: 'Hard' },
        ],
    },
};

const levelStyles = {
    Easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Hard: 'bg-red-100 text-red-700 border-red-200',
};

export default function CompetitionDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const challenge = CHALLENGES_DETAIL[id];
    const { userRole } = useSidebar();
    const isStudent = userRole === 'student';
    const isAdmin = userRole === 'admin';
    const [joined, setJoined] = useState(false);

    if (!challenge) {
        return (
            <div className="max-w-6xl mx-auto py-20 text-center">
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Challenge tidak ditemukan</h2>
                <p className="text-neutral-500 mb-6">Challenge dengan ID ini tidak tersedia.</p>
                <Link href="/competition" className="text-brand-red font-bold hover:underline">← Kembali ke Competition</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <Link href="/competition" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-red font-medium mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Kembali ke Competition
            </Link>

            {/* Hero */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
                <div className="relative h-48 md:h-64">
                    <Image src={challenge.image} alt={challenge.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={clsx('px-2 py-0.5 rounded text-xs font-bold border', levelStyles[challenge.level as keyof typeof levelStyles])}>
                                {challenge.level}
                            </span>
                            {challenge.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-white/20 text-white rounded text-[10px] font-medium backdrop-blur-sm">{tag}</span>)}
                        </div>
                        <h1 className="text-xl md:text-3xl font-bold text-white">{challenge.title}</h1>
                    </div>
                </div>
                <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-200">
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Deadline: <strong className="text-neutral-700">{challenge.deadline}</strong></span>
                        <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {challenge.participants.length} Peserta</span>
                    </div>
                    {isStudent && (
                        <button onClick={() => setJoined(!joined)}
                            className={clsx('inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-colors',
                                joined ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-brand-red text-white hover:bg-brand-dark shadow-sm')}>
                            {joined ? <><CheckCircle2 className="h-4 w-4" /> Terdaftar</> : <><UserPlus className="h-4 w-4" /> Ikut Challenge</>}
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                        <h3 className="font-bold text-neutral-900 mb-3">Deskripsi</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">{challenge.description}</p>
                    </div>

                    {/* Rules */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                        <h3 className="font-bold text-neutral-900 mb-3">Aturan & Ketentuan</h3>
                        <ol className="space-y-2">
                            {challenge.rules.map((rule, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-brand-red/10 text-brand-red text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                                    {rule}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Participants */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-neutral-900">Peserta ({challenge.participants.length})</h3>
                            {isAdmin && <button className="text-xs font-bold text-brand-red hover:underline">Kelola Peserta</button>}
                        </div>
                        <div className="space-y-3">
                            {challenge.participants.map(p => (
                                <div key={p.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                                    <Image src={`https://ui-avatars.com/api/?name=${p.avatar}&background=random&color=fff&size=36`} alt="" width={36} height={36} className="rounded-full" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-neutral-900">{p.name}</h4>
                                        <p className="text-xs text-neutral-500">{p.class} • Daftar: {p.joinDate}</p>
                                    </div>
                                    <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-bold',
                                        p.status === 'Registered' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700')}>
                                        {p.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Prizes */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                        <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-500" /> Hadiah</h3>
                        <div className="space-y-2">
                            {challenge.prizes.map((prize, i) => (
                                <div key={i} className={clsx('p-3 rounded-lg border text-sm',
                                    i === 0 ? 'bg-amber-50 border-amber-200 text-amber-800 font-medium' : 'bg-neutral-50 border-neutral-200 text-neutral-600')}>
                                    {prize}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related */}
                    {challenge.related.length > 0 && (
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
                            <h3 className="font-bold text-neutral-900 mb-3">Challenge Lainnya</h3>
                            <div className="space-y-2">
                                {challenge.related.map(r => (
                                    <Link key={r.id} href={`/competition/${r.id}`} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                                        <span className="text-sm font-medium text-neutral-700">{r.title}</span>
                                        <span className={clsx('px-2 py-0.5 rounded text-[10px] font-bold border', levelStyles[r.level as keyof typeof levelStyles])}>{r.level}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
