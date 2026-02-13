'use client';

import Image from 'next/image';
import { ExternalLink, Github, Figma, Eye, Heart } from 'lucide-react';

const PROJECTS = [
    {
        id: 1,
        title: 'Modern E-Commerce Dashboard',
        student: 'Alexander Grahambell',
        class: 'XI RPL 1',
        description: 'Dashboard admin responsif dengan chart interaktif dan manajemen stok real-time.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        tags: ['React', 'Tailwind', 'Recharts'],
        links: { github: '#', demo: '#' }
    },
    {
        id: 2,
        title: 'Travel Booking App UI',
        student: 'Sarah Connor',
        class: 'XI RPL 1',
        description: 'Desain antarmuka aplikasi travel dengan fokus pada pengalaman pengguna mobile.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        tags: ['Figma', 'UI/UX', 'Mobile Design'],
        links: { figma: '#' }
    },
    {
        id: 3,
        title: 'Smart Home Controller',
        student: 'Harvey Specter',
        class: 'XI RPL 1',
        description: 'Aplikasi IoT untuk mengontrol lampu dan pendingin ruangan via web.',
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=800',
        tags: ['Next.js', 'IoT', 'MQTT'],
        links: { github: '#', demo: '#' }
    },
    {
        id: 4,
        title: 'Learning Management System',
        student: 'John Doe',
        class: 'XI RPL 2',
        description: 'Platform pembelajaran online dengan fitur kuis dan tracking progress siswa.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        tags: ['Vue.js', 'Laravel', 'MySQL'],
        links: { github: '#', demo: '#' }
    },
    {
        id: 5,
        title: 'Finance Tracker Mobile',
        student: 'Jane Smith',
        class: 'XI RPL 2',
        description: 'Aplikasi pencatat keuangan pribadi dengan fitur scan struk otomatis.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        tags: ['Flutter', 'Dart', 'Firebase'],
        links: { github: '#', demo: '#' }
    },
    {
        id: 6,
        title: 'Coffee Shop Landing Page',
        student: 'Michael Ross',
        class: 'XI RPL 1',
        description: 'Landing page promosi kedai kopi dengan animasi scroll yang menarik.',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800',
        tags: ['HTML', 'CSS', 'GSAP'],
        links: { github: '#', demo: '#' }
    }
];

export default function GalleryPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Galeri Karya Siswa</h1>
                    <p className="text-neutral-500">Showcase project terbaik dari talenta digital SMK Telkom Sidoarjo.</p>
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option>Semua Kelas</option>
                        <option>XI RPL 1</option>
                        <option>XI RPL 2</option>
                    </select>
                    <select className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <option>Semua Kategori</option>
                        <option>Web Dev</option>
                        <option>Mobile Dev</option>
                        <option>UI/UX</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project) => (
                    <div key={project.id} className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden bg-neutral-100">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={800}
                                height={450}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                {project.links.demo && (
                                    <button className="p-2 bg-white rounded-full text-neutral-900 hover:text-red-600 hover:scale-110 transition-all" title="View Demo">
                                        <ExternalLink className="h-5 w-5" />
                                    </button>
                                )}
                                {project.links.github && (
                                    <button className="p-2 bg-white rounded-full text-neutral-900 hover:text-red-600 hover:scale-110 transition-all" title="View Code">
                                        <Github className="h-5 w-5" />
                                    </button>
                                )}
                                {project.links.figma && (
                                    <button className="p-2 bg-white rounded-full text-neutral-900 hover:text-red-600 hover:scale-110 transition-all" title="View Design">
                                        <Figma className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-bold text-neutral-900 group-hover:text-red-600 transition-colors">{project.title}</h3>
                                    <p className="text-xs text-neutral-500 mt-1">{project.student} • {project.class}</p>
                                </div>
                            </div>

                            <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-[10px] font-medium rounded-full uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-neutral-400">
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1 hover:text-rose-500 cursor-pointer transition-colors">
                                        <Heart className="h-4 w-4" /> 24
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" /> 142
                                    </span>
                                </div>
                                <button className="text-sm text-red-600 font-medium hover:underline">Detail Project</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
