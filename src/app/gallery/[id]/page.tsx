'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Figma, Heart, Eye, MessageCircle, Send, Shield, User } from 'lucide-react';
import clsx from 'clsx';
import { useSidebar } from '@/components/SidebarContext';
import { PROJECTS, INITIAL_COMMENTS, Comment } from '@/data/gallery';

export default function GalleryDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { userRole } = useSidebar();
    const isIndustryMentor = userRole === 'industry_mentor';

    const project = PROJECTS.find(p => p.id === Number(id));

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(project?.likes ?? 0);
    const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS[Number(id)] || []);
    const [newComment, setNewComment] = useState('');

    if (!project) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <p className="text-neutral-500 text-lg">Project tidak ditemukan.</p>
                <button onClick={() => router.push('/gallery')} className="mt-4 text-brand-red font-bold hover:underline">← Kembali ke Galeri</button>
            </div>
        );
    }

    const toggleLike = () => {
        setLiked(prev => !prev);
        setLikeCount(prev => prev + (liked ? -1 : 1));
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const c: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            author: isIndustryMentor ? 'Pak David' : (userRole === 'internal_mentor' ? 'Pak Adi' : 'Anda'),
            avatar: isIndustryMentor ? 'David+Beck' : (userRole === 'internal_mentor' ? 'Adi+Nugroho' : 'User'),
            text: newComment,
            timestamp: 'Baru saja',
            isOfficial: isIndustryMentor,
        };
        setComments(prev => [...prev, c]);
        setNewComment('');
    };

    // Sort: official pinned first
    const officialComments = comments.filter(c => c.isOfficial);
    const regularComments = comments.filter(c => !c.isOfficial);

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Back button */}
            <button onClick={() => router.push('/gallery')}
                className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Galeri
            </button>

            {/* Hero Image */}
            <div className="relative aspect-video md:aspect-[16/8] rounded-2xl overflow-hidden bg-neutral-100 mb-6 shadow-lg">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider border border-white/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{project.title}</h1>
                </div>
            </div>

            {/* Project Info + Actions */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Left: Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md">
                            {project.student.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900 text-sm md:text-base">{project.student}</p>
                            <p className="text-xs md:text-sm text-neutral-500">{project.class}</p>
                        </div>
                    </div>
                    <p className="text-neutral-600 text-sm md:text-base leading-relaxed">{project.description}</p>
                </div>

                {/* Right: Actions */}
                <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0">
                    {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-xs md:text-sm font-bold hover:bg-black transition-colors shadow-md w-full justify-center">
                            <ExternalLink className="h-4 w-4" /> Live Demo
                        </a>
                    )}
                    {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-700 rounded-xl text-xs md:text-sm font-bold hover:bg-neutral-50 transition-colors w-full justify-center">
                            <Github className="h-4 w-4" /> Source Code
                        </a>
                    )}
                    {project.links.figma && (
                        <a href={project.links.figma} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 text-neutral-700 rounded-xl text-xs md:text-sm font-bold hover:bg-neutral-50 transition-colors w-full justify-center">
                            <Figma className="h-4 w-4" /> Figma Design
                        </a>
                    )}
                </div>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm mb-8">
                <button onClick={toggleLike} className={clsx("flex items-center gap-2 transition-colors", liked ? "text-rose-500" : "text-neutral-500 hover:text-rose-500")}>
                    <Heart className={clsx("h-5 w-5 md:h-6 md:w-6", liked && "fill-rose-500")} />
                    <div>
                        <p className="text-lg md:text-xl font-black">{likeCount}</p>
                        <p className="text-[10px] md:text-xs text-neutral-400">Likes</p>
                    </div>
                </button>
                <div className="w-px h-10 bg-neutral-200" />
                <div className="flex items-center gap-2 text-neutral-500">
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                    <div>
                        <p className="text-lg md:text-xl font-black text-neutral-900">{comments.length}</p>
                        <p className="text-[10px] md:text-xs text-neutral-400">Komentar</p>
                    </div>
                </div>
                <div className="w-px h-10 bg-neutral-200" />
                <div className="flex items-center gap-2 text-neutral-500">
                    <Eye className="h-5 w-5 md:h-6 md:w-6" />
                    <div>
                        <p className="text-lg md:text-xl font-black text-neutral-900">{project.views}</p>
                        <p className="text-[10px] md:text-xs text-neutral-400">Views</p>
                    </div>
                </div>
            </div>

            {/* Comments Section — Full Width */}
            <div>
                <h2 className="text-lg md:text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-brand-red" />
                    Komentar & Review
                </h2>

                {/* Official Reviews (pinned) */}
                {officialComments.length > 0 && (
                    <div className="mb-4 space-y-3">
                        {officialComments.map(c => (
                            <div key={c.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5 relative">
                                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 border border-amber-300 rounded-full text-[10px] md:text-xs font-bold text-amber-700">
                                        <Shield className="h-3 w-3" /> Official Review
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Image
                                        src={`https://ui-avatars.com/api/?name=${c.avatar}&background=F59E0B&color=fff&size=40`}
                                        alt="" width={40} height={40} className="rounded-full shrink-0 shadow-sm" />
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-sm font-bold text-neutral-900">{c.author}</span>
                                            <span className="text-[10px] md:text-xs text-amber-600 font-medium">Mentor Industri</span>
                                            <span className="text-[10px] md:text-xs text-neutral-400">• {c.timestamp}</span>
                                        </div>
                                        <p className="text-sm md:text-base text-neutral-700 leading-relaxed">{c.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Regular Comments */}
                <div className="space-y-1 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                    {regularComments.length > 0 ? regularComments.map((c, i) => (
                        <div key={c.id} className={clsx("p-4 md:p-5 flex items-start gap-3", i !== regularComments.length - 1 && "border-b border-neutral-100")}>
                            <Image
                                src={`https://ui-avatars.com/api/?name=${c.avatar}&background=random&color=fff&size=36`}
                                alt="" width={36} height={36} className="rounded-full shrink-0 shadow-sm" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                    <span className="text-sm font-bold text-neutral-900">{c.author}</span>
                                    <span className="text-[10px] md:text-xs text-neutral-400">{c.timestamp}</span>
                                </div>
                                <p className="text-sm text-neutral-600 leading-relaxed">{c.text}</p>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center">
                            <MessageCircle className="h-8 w-8 text-neutral-200 mx-auto mb-2" />
                            <p className="text-sm text-neutral-400">Belum ada komentar. Jadilah yang pertama!</p>
                        </div>
                    )}
                </div>

                {/* Comment Input */}
                <div className="mt-4 bg-white rounded-xl border border-neutral-200 shadow-sm p-3 md:p-4">
                    {isIndustryMentor && (
                        <div className="flex items-center gap-1.5 mb-3 text-[10px] md:text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 w-fit">
                            <Shield className="h-3 w-3" /> Komentar Anda akan ditampilkan sebagai Official Review
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-neutral-500 shrink-0">
                            <User className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <input
                            type="text"
                            placeholder={isIndustryMentor ? "Tulis official review untuk project ini..." : "Tulis komentar..."}
                            className="flex-1 p-2.5 md:p-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red/20 transition-all"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
                        />
                        <button onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className={clsx("p-2.5 md:p-3 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md",
                                isIndustryMentor
                                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200"
                                    : "bg-brand-red text-white hover:bg-brand-dark shadow-red-200"
                            )}>
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
