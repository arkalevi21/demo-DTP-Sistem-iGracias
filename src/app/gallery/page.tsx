'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Eye, ExternalLink, Github, Figma, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { PROJECTS, INITIAL_COMMENTS } from '@/data/gallery';

const ALL_CLASSES = ['Semua Kelas', 'XI DTP 1', 'XI DTP 2', 'XII DTP 1', 'XII DTP 2'];
const ALL_CATEGORIES = ['Semua', 'Web Dev', 'Mobile', 'UI/UX', 'IoT'];

const CATEGORY_MAP: Record<string, string[]> = {
    'Web Dev': ['React', 'Tailwind', 'Recharts', 'Next.js', 'HTML', 'CSS', 'GSAP', 'Vue.js', 'Laravel', 'MySQL'],
    'Mobile': ['Flutter', 'Dart', 'Firebase'],
    'UI/UX': ['Figma', 'UI/UX', 'Mobile Design'],
    'IoT': ['IoT', 'MQTT']
};

export default function GalleryPage() {
    const [classFilter, setClassFilter] = useState('Semua Kelas');
    const [categoryFilter, setCategoryFilter] = useState('Semua');
    const [likedProjects, setLikedProjects] = useState<Record<number, boolean>>({});
    const [projectLikes, setProjectLikes] = useState<Record<number, number>>(
        Object.fromEntries(PROJECTS.map(p => [p.id, p.likes]))
    );

    const toggleLike = (e: React.MouseEvent, projectId: number) => {
        e.preventDefault(); // prevent Link navigation
        e.stopPropagation();
        setLikedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] }));
        setProjectLikes(prev => ({
            ...prev,
            [projectId]: prev[projectId] + (likedProjects[projectId] ? -1 : 1)
        }));
    };

    const filteredProjects = PROJECTS.filter(project => {
        const matchesClass = classFilter === 'Semua Kelas' || project.class === classFilter;
        const matchesCategory = categoryFilter === 'Semua' ||
            (CATEGORY_MAP[categoryFilter]?.some(tag => project.tags.includes(tag)) ?? false);
        return matchesClass && matchesCategory;
    });

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Galeri Karya Siswa</h1>
                <p className="text-neutral-500 text-sm md:text-base mt-1">Showcase project terbaik dari talenta digital SMK Telkom Sidoarjo</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
                {/* Category Pills (mobile-friendly) */}
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                    {ALL_CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setCategoryFilter(cat)}
                            className={clsx("px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all border",
                                categoryFilter === cat
                                    ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                            )}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="sm:ml-auto">
                    <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs md:text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none shadow-sm">
                        {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {/* Project Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProjects.map((project) => {
                        const commentCount = (INITIAL_COMMENTS[project.id] || []).length;
                        const hasOfficialReview = (INITIAL_COMMENTS[project.id] || []).some(c => c.isOfficial);

                        return (
                            <Link href={`/gallery/${project.id}`} key={project.id}
                                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col">

                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Overlay on hover (desktop) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end p-4">
                                        <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            Lihat Detail <ArrowRight className="h-3 w-3" />
                                        </span>
                                    </div>

                                    {/* Official Review Badge */}
                                    {hasOfficialReview && (
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500 text-white rounded-lg text-[10px] font-bold shadow-lg">
                                                ⭐ Official Review
                                            </span>
                                        </div>
                                    )}

                                    {/* Tags overlay (mobile) */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent md:hidden">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[9px] font-bold rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-neutral-900 text-sm md:text-base group-hover:text-brand-red transition-colors mb-1">
                                        {project.title}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center text-white text-[8px] md:text-[9px] font-bold shadow-sm">
                                            {project.student.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <p className="text-[11px] md:text-xs text-neutral-500">
                                            <span className="font-medium text-neutral-700">{project.student}</span> • {project.class}
                                        </p>
                                    </div>

                                    <p className="text-xs md:text-sm text-neutral-500 line-clamp-2 mb-auto leading-relaxed">{project.description}</p>

                                    {/* Tags (desktop only) */}
                                    <div className="hidden md:flex flex-wrap gap-1.5 mt-3 mb-3">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-neutral-100 text-neutral-500 text-[10px] font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer: Stats */}
                                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-100">
                                        <div className="flex items-center gap-3 text-[11px] md:text-xs text-neutral-400">
                                            <button onClick={(e) => toggleLike(e, project.id)}
                                                className={clsx("flex items-center gap-1 transition-colors",
                                                    likedProjects[project.id] ? "text-rose-500" : "hover:text-rose-500"
                                                )}>
                                                <Heart className={clsx("h-3.5 w-3.5", likedProjects[project.id] && "fill-rose-500")} />
                                                {projectLikes[project.id]}
                                            </button>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="h-3.5 w-3.5" /> {commentCount}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3.5 w-3.5" /> {project.views}
                                            </span>
                                        </div>

                                        {/* Quick links (desktop) */}
                                        <div className="hidden md:flex items-center gap-1.5">
                                            {project.links.demo && (
                                                <span className="p-1.5 rounded-lg bg-neutral-50 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                </span>
                                            )}
                                            {project.links.github && (
                                                <span className="p-1.5 rounded-lg bg-neutral-50 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                                                    <Github className="h-3.5 w-3.5" />
                                                </span>
                                            )}
                                            {project.links.figma && (
                                                <span className="p-1.5 rounded-lg bg-neutral-50 text-neutral-400 group-hover:text-neutral-600 transition-colors">
                                                    <Figma className="h-3.5 w-3.5" />
                                                </span>
                                            )}
                                        </div>

                                        {/* "Lihat" on mobile */}
                                        <span className="md:hidden text-[11px] text-brand-red font-bold flex items-center gap-1">
                                            Lihat <ArrowRight className="h-3 w-3" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50">
                    <p className="text-neutral-500 font-medium">Tidak ada project ditemukan untuk filter ini.</p>
                </div>
            )}
        </div>
    );
}
