'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Github, Figma, ExternalLink, Heart, Mail, MapPin } from 'lucide-react';
import clsx from 'clsx';

const MOCK_PORTFOLIOS: Record<string, {
    name: string; class: string; bio: string; avatar: string;
    skills: string[]; coverImage: string;
    projects: { id: number; title: string; description: string; image: string; tags: string[]; likes: number; links: { github?: string; figma?: string; demo?: string } }[];
}> = {
    '1': {
        name: 'Alexander Grahambell', class: 'XI DTP 1', avatar: 'Alexander+Grahambell',
        bio: 'Siswa program Digital Talent dengan passion di Web Development dan IoT. Suka membangun solusi digital yang berdampak.',
        skills: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Flutter', 'Figma', 'Arduino', 'MQTT'],
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
        projects: [
            { id: 1, title: 'Modern E-Commerce Dashboard', description: 'Dashboard admin untuk manajemen toko online dengan real-time analytics, order tracking, dan inventory management.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', tags: ['React', 'Chart.js', 'REST API'], likes: 42, links: { github: '#', demo: '#' } },
            { id: 2, title: 'IoT Smart Greenhouse', description: 'Sistem monitoring tanaman otomatis menggunakan sensor suhu, kelembaban, dan cahaya dengan dashboard real-time.', image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=600', tags: ['Arduino', 'MQTT', 'Next.js'], likes: 35, links: { github: '#', demo: '#' } },
            { id: 3, title: 'Student Portal Mobile App', description: 'Aplikasi mobile untuk portal siswa dengan fitur jadwal, nilai, dan presensi.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600', tags: ['Flutter', 'Firebase', 'Dart'], likes: 28, links: { github: '#', figma: '#' } },
        ]
    },
    '2': {
        name: 'Sarah Connor', class: 'XI DTP 1', avatar: 'Sarah+Connor',
        bio: 'UI/UX Designer dan Frontend Developer. Fokus pada desain yang accessible dan user-friendly.',
        skills: ['Figma', 'Adobe XD', 'React', 'Tailwind CSS', 'HTML/CSS'],
        coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
        projects: [
            { id: 1, title: 'Learning Management System', description: 'Platform pembelajaran online dengan fitur kuis interaktif dan tracking progress siswa.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600', tags: ['React', 'Node.js', 'MongoDB'], likes: 31, links: { github: '#', demo: '#', figma: '#' } },
            { id: 2, title: 'Food Delivery App Design', description: 'Desain lengkap aplikasi food delivery dari wireframe hingga prototype interaktif.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600', tags: ['Figma', 'Prototyping', 'UI/UX'], likes: 24, links: { figma: '#' } },
        ]
    }
};

export default function PortfolioPublicPage() {
    const params = useParams();
    const id = params.id as string;
    const portfolio = MOCK_PORTFOLIOS[id];

    if (!portfolio) {
        return (
            <div className="max-w-6xl mx-auto py-20 text-center">
                <h2 className="text-xl font-bold text-neutral-900 mb-2">Portfolio tidak ditemukan</h2>
                <p className="text-neutral-500 mb-6">Portfolio dengan ID ini tidak tersedia.</p>
                <Link href="/gallery" className="text-brand-red font-bold hover:underline">← Kembali ke Gallery</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-red font-medium mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Kembali ke Gallery
            </Link>

            {/* Hero / Profile Card */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-8">
                <div className="relative h-40 md:h-56">
                    <Image src={portfolio.coverImage} alt="Cover" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="px-4 md:px-8 pb-6 -mt-12 md:-mt-16 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white shrink-0">
                            <Image src={`https://ui-avatars.com/api/?name=${portfolio.avatar}&background=random&color=fff&size=200`} alt={portfolio.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 pt-2">
                            <h1 className="text-xl md:text-3xl font-bold text-neutral-900">{portfolio.name}</h1>
                            <p className="text-sm text-neutral-500 mb-2">{portfolio.class} • SMK Telkom Sidoarjo</p>
                            <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">{portfolio.bio}</p>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-5 flex flex-wrap gap-2">
                        {portfolio.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium hover:bg-brand-red/10 hover:text-brand-red transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects */}
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Project ({portfolio.projects.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.projects.map(project => (
                    <div key={project.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="relative h-44 bg-neutral-100">
                            <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-sm font-bold text-neutral-900 mb-1">{project.title}</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {project.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px] font-medium">{tag}</span>)}
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                                <span className="flex items-center gap-1 text-xs text-neutral-400"><Heart className="h-3 w-3" />{project.likes}</span>
                                <div className="flex gap-2">
                                    {project.links.github && <a href="#" className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"><Github className="h-3.5 w-3.5 text-neutral-600" /></a>}
                                    {project.links.figma && <a href="#" className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"><Figma className="h-3.5 w-3.5 text-neutral-600" /></a>}
                                    {project.links.demo && <a href="#" className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"><ExternalLink className="h-3.5 w-3.5 text-neutral-600" /></a>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
