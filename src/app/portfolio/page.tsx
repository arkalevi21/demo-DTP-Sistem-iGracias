'use client';

import { useState } from 'react';
import { Camera, Edit2, Plus, Trash2, Link as LinkIcon, Save, Image as ImageIcon, Github, Figma, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

// Type Definitions
type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    likes: number;
    links?: {
        github?: string;
        figma?: string;
        demo?: string;
    };
};

// Initial Mock Data (Student's Own Projects)
const INITIAL_PROJECTS: Project[] = [
    {
        id: 1,
        title: 'E-Commerce Dashboard UI',
        description: 'Redesign dashboard admin toko online dengan fokus pada kemudahan manajemen stok.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        tags: ['Figma', 'React'],
        likes: 24
    },
    {
        id: 2,
        title: 'Weather App Mobile',
        description: 'Aplikasi cuaca sederhana menggunakan OpenWeatherMap API.',
        image: 'https://images.unsplash.com/photo-1592210454132-3286299f3212?auto=format&fit=crop&q=80&w=800',
        tags: ['Flutter', 'API'],
        likes: 12,
        links: { github: '#' }
    }
];

export default function PortfolioManagerPage() {
    // Profile State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Arka Levi',
        role: 'Siswa XI RPL 1',
        bio: 'Aspiring Full Stack Developer. Loves React, Next.js, and clean code. Currently learning AI integration.',
        skills: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Node.js'],
        avatar: 'https://ui-avatars.com/api/?name=Arka+Levi&background=random&color=fff'
    });

    // Projects State
    const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', tags: '', github: '', figma: '', demo: '' });

    // Handlers
    const handleSaveProfile = () => {
        setIsEditingProfile(false);
        // In a real app, this would save to backend
    };

    const handleAddSkill = () => {
        const skill = prompt("Tambah Skill Baru:");
        if (skill && !profile.skills.includes(skill)) {
            setProfile(prev => ({ ...prev, skills: [...prev.skills, skill] }));
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
    };

    const handleUploadProject = (e: React.FormEvent) => {
        e.preventDefault();
        const project: Project = {
            id: Date.now(),
            title: newProject.title,
            description: newProject.description,
            image: `https://source.unsplash.com/random/800x600?tech,code&sig=${Date.now()}`, // Random tech image
            tags: newProject.tags.split(',').map(t => t.trim()),
            likes: 0,
            links: {
                github: newProject.github,
                figma: newProject.figma,
                demo: newProject.demo
            }
        };
        setProjects([project, ...projects]);
        setShowUploadModal(false);
        setNewProject({ title: '', description: '', tags: '', github: '', figma: '', demo: '' });
    };

    const handleDeleteProject = (id: number) => {
        if (confirm('Yakin ingin menghapus project ini?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 space-y-8">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Profile Card */}
                <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-600 to-red-400"></div>

                    <div className="relative mt-8 mb-4">
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto relative overflow-hidden bg-neutral-100">
                            <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
                            {isEditingProfile && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                                    <Camera className="h-6 w-6 text-white" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center">
                        {isEditingProfile ? (
                            <div className="space-y-3 mb-4">
                                <input
                                    value={profile.name}
                                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full text-center font-bold text-lg border-b border-neutral-300 focus:border-red-500 outline-none pb-1"
                                />
                                <input
                                    value={profile.role}
                                    onChange={e => setProfile({ ...profile, role: e.target.value })}
                                    className="w-full text-center text-sm text-neutral-500 border-b border-neutral-300 focus:border-red-500 outline-none pb-1"
                                />
                                <textarea
                                    value={profile.bio}
                                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                    className="w-full text-center text-xs text-neutral-600 border border-neutral-200 rounded p-2 focus:border-red-500 outline-none"
                                    rows={3}
                                />
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold text-neutral-900">{profile.name}</h2>
                                <p className="text-sm text-neutral-500 mb-3">{profile.role}</p>
                                <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto mb-6">
                                    {profile.bio}
                                </p>
                            </>
                        )}

                        <div className="flex flex-wrap gap-1 justify-center mb-6">
                            {profile.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-bold rounded-full flex items-center gap-1 group">
                                    {skill}
                                    {isEditingProfile && (
                                        <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-600"><Trash2 className="h-2 w-2" /></button>
                                    )}
                                </span>
                            ))}
                            {isEditingProfile && (
                                <button onClick={handleAddSkill} className="px-2 py-1 border border-dashed border-neutral-300 text-neutral-400 text-[10px] font-bold rounded-full hover:border-red-400 hover:text-red-500">
                                    + Add
                                </button>
                            )}
                        </div>

                        <button
                            onClick={isEditingProfile ? handleSaveProfile : () => setIsEditingProfile(true)}
                            className={clsx(
                                "w-full py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2",
                                isEditingProfile
                                    ? "bg-black text-white hover:bg-neutral-800"
                                    : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                            )}
                        >
                            {isEditingProfile ? <><Save className="h-4 w-4" /> Simpan Profil</> : <><Edit2 className="h-4 w-4" /> Edit Profil</>}
                        </button>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="w-full md:w-2/3">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-neutral-900">Project Saya</h2>
                            <p className="text-neutral-500 text-sm">Kelola portofolio karya digital kamu.</p>
                        </div>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="bg-brand-red text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm shadow-red-200 hover:bg-brand-dark transition-all flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Upload Karya
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {projects.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-xl">
                                <ImageIcon className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                                <h3 className="text-neutral-900 font-bold">Belum ada karya</h3>
                                <p className="text-xs text-neutral-500">Yuk upload karya pertamamu sekarang!</p>
                            </div>
                        ) : (
                            projects.map(project => (
                                <div key={project.id} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-neutral-100 relative">
                                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-neutral-900 truncate">{project.title}</h3>
                                        <p className="text-xs text-neutral-500 line-clamp-2 mt-1 mb-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 items-center mt-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] px-2 py-0.5 bg-neutral-50 text-neutral-500 rounded border border-neutral-100">
                                                    {tag}
                                                </span>
                                            ))}
                                            <div className="h-3 w-px bg-neutral-200 mx-1"></div>
                                            {project.links?.github && (
                                                <a href={project.links.github} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900"><Github className="h-3 w-3" /></a>
                                            )}
                                            {project.links?.figma && (
                                                <a href={project.links.figma} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900"><Figma className="h-3 w-3" /></a>
                                            )}
                                            {project.links?.demo && (
                                                <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900"><ExternalLink className="h-3 w-3" /></a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold text-neutral-900 mb-6">Upload Karya Baru</h2>
                        <form onSubmit={handleUploadProject} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1">Judul Project</label>
                                <input required type="text" placeholder="Contoh: Redesign Aplikasi Gojek"
                                    className="w-full p-2 border rounded-lg text-sm focus:border-red-500 outline-none"
                                    value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1">Deskripsi Singkat</label>
                                <textarea required placeholder="Ceritakan sedikit tentang project ini..."
                                    className="w-full p-2 border rounded-lg text-sm focus:border-red-500 outline-none" rows={3}
                                    value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1">Tags / Teknologi</label>
                                <input required type="text" placeholder="React, Figma, IoT (pisahkan koma)"
                                    className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                    value={newProject.tags} onChange={e => setNewProject({ ...newProject, tags: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1">Link GitHub (Opsional)</label>
                                    <input type="text" placeholder="https://github.com/..."
                                        className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                        value={newProject.github} onChange={e => setNewProject({ ...newProject, github: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1">Link Figma (Opsional)</label>
                                    <input type="text" placeholder="https://figma.com/..."
                                        className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                        value={newProject.figma} onChange={e => setNewProject({ ...newProject, figma: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-1">Link Demo (Opsional)</label>
                                    <input type="text" placeholder="https://..."
                                        className="w-full p-2 border rounded-lg text-sm focus:border-brand-red outline-none"
                                        value={newProject.demo} onChange={e => setNewProject({ ...newProject, demo: e.target.value })} />
                                </div>
                            </div>

                            <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center cursor-pointer hover:bg-neutral-100 transition-colors">
                                <ImageIcon className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                                <span className="text-xs font-bold text-neutral-500">Klik untuk upload thumbnail</span>
                            </div>

                            <div className="pt-4 flex items-center gap-3">
                                <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 py-3 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200">
                                    Batal
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-dark shadow-lg shadow-red-200">
                                    Upload & Publish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
