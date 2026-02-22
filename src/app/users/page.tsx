'use client';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, UserPlus, Shield, Users, Filter } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

type UserRole = 'admin' | 'internal_mentor' | 'industry_mentor' | 'student';

type AppUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    class?: string;
    status: 'active' | 'inactive';
    avatar: string;
};

const ROLE_LABELS: Record<UserRole, string> = {
    admin: 'Admin',
    internal_mentor: 'Mentor Internal',
    industry_mentor: 'Mentor Industri',
    student: 'Siswa',
};

const ROLE_STYLES: Record<UserRole, string> = {
    admin: 'bg-red-100 text-red-700',
    internal_mentor: 'bg-blue-100 text-blue-700',
    industry_mentor: 'bg-purple-100 text-purple-700',
    student: 'bg-neutral-100 text-neutral-700',
};

const INITIAL_USERS: AppUser[] = [
    { id: '1', name: 'Admin DTP', email: 'admin@smktelkom-sda.sch.id', role: 'admin', status: 'active', avatar: 'Admin+DTP' },
    { id: '2', name: 'Pak Adi Nugroho', email: 'adi.nugroho@smktelkom-sda.sch.id', role: 'internal_mentor', status: 'active', avatar: 'Adi+Nugroho' },
    { id: '3', name: 'Bu Rina Wati', email: 'rina.wati@smktelkom-sda.sch.id', role: 'internal_mentor', status: 'active', avatar: 'Rina+Wati' },
    { id: '4', name: 'Pak Bagus Santoso', email: 'bagus@industry.co.id', role: 'industry_mentor', status: 'active', avatar: 'Bagus+Santoso' },
    { id: '5', name: 'Pak David Beck', email: 'david@industry.co.id', role: 'industry_mentor', status: 'active', avatar: 'David+Beck' },
    { id: '6', name: 'Bu Susi Susanti', email: 'susi@smktelkom-sda.sch.id', role: 'internal_mentor', status: 'active', avatar: 'Susi+Susanti' },
    { id: '7', name: 'Alexander Grahambell', email: 'alexander@siswa.smktelkom-sda.sch.id', role: 'student', class: 'XI DTP 1', status: 'active', avatar: 'Alexander+Grahambell' },
    { id: '8', name: 'Sarah Connor', email: 'sarah@siswa.smktelkom-sda.sch.id', role: 'student', class: 'XI DTP 1', status: 'active', avatar: 'Sarah+Connor' },
    { id: '9', name: 'John Doe', email: 'john@siswa.smktelkom-sda.sch.id', role: 'student', class: 'XI DTP 2', status: 'inactive', avatar: 'John+Doe' },
    { id: '10', name: 'Jessica Pearson', email: 'jessica@siswa.smktelkom-sda.sch.id', role: 'student', class: 'XI DTP 1', status: 'active', avatar: 'Jessica+Pearson' },
];

export default function UserManagementPage() {
    const [users, setUsers] = useState<AppUser[]>(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState<AppUser | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'student' as UserRole, class: '', status: 'active' as 'active' | 'inactive' });

    const filteredUsers = users.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchRole = roleFilter === 'all' || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const handleOpenAdd = () => {
        setEditUser(null);
        setFormData({ name: '', email: '', role: 'student', class: '', status: 'active' });
        setShowModal(true);
    };

    const handleOpenEdit = (user: AppUser) => {
        setEditUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role, class: user.class || '', status: user.status });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editUser) {
            setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...formData, avatar: formData.name.split(' ').join('+') } : u));
        } else {
            const newUser: AppUser = {
                id: String(Date.now()), ...formData,
                avatar: formData.name.split(' ').join('+'),
            };
            setUsers(prev => [...prev, newUser]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    const roleCounts = {
        all: users.length,
        admin: users.filter(u => u.role === 'admin').length,
        internal_mentor: users.filter(u => u.role === 'internal_mentor').length,
        industry_mentor: users.filter(u => u.role === 'industry_mentor').length,
        student: users.filter(u => u.role === 'student').length,
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Kelola Pengguna</h1>
                    <p className="text-neutral-500 text-sm">Manajemen akun mentor, siswa, dan admin</p>
                </div>
                <button onClick={handleOpenAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-xl hover:bg-brand-dark transition-colors shadow-sm">
                    <UserPlus className="h-4 w-4" /> Tambah User
                </button>
            </div>

            {/* Role Filter Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {[
                    { key: 'all' as const, label: 'Semua' },
                    { key: 'admin' as const, label: 'Admin' },
                    { key: 'internal_mentor' as const, label: 'Mentor Internal' },
                    { key: 'industry_mentor' as const, label: 'Mentor Industri' },
                    { key: 'student' as const, label: 'Siswa' },
                ].map(tab => (
                    <button key={tab.key} onClick={() => setRoleFilter(tab.key)}
                        className={clsx('px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors',
                            roleFilter === tab.key ? 'bg-brand-red text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                        )}>
                        {tab.label} ({roleCounts[tab.key]})
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Cari nama atau email..."
                    className="w-full h-10 pl-10 pr-4 bg-white border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all" />
            </div>

            {/* User Table (Desktop) */}
            <div className="hidden md:block bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50">
                            <th className="text-left text-xs font-bold text-neutral-500 py-3 px-4">User</th>
                            <th className="text-left text-xs font-bold text-neutral-500 py-3 px-4">Email</th>
                            <th className="text-left text-xs font-bold text-neutral-500 py-3 px-4">Role</th>
                            <th className="text-left text-xs font-bold text-neutral-500 py-3 px-4">Status</th>
                            <th className="text-right text-xs font-bold text-neutral-500 py-3 px-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <Image src={`https://ui-avatars.com/api/?name=${user.avatar}&background=random&color=fff&size=32`} alt="" width={32} height={32} className="rounded-full" />
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                                            {user.class && <p className="text-[10px] text-neutral-400">{user.class}</p>}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-neutral-500">{user.email}</td>
                                <td className="py-3 px-4">
                                    <span className={clsx('px-2 py-0.5 rounded text-[10px] font-bold', ROLE_STYLES[user.role])}>{ROLE_LABELS[user.role]}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={clsx('px-2 py-0.5 rounded-full text-[10px] font-bold', user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-500')}>
                                        {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <button onClick={() => handleOpenEdit(user)} className="p-1.5 text-neutral-400 hover:text-brand-red transition-colors mr-1"><Edit2 className="h-4 w-4" /></button>
                                    <button onClick={() => handleDelete(user.id)} className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* User Cards (Mobile) */}
            <div className="md:hidden space-y-3">
                {filteredUsers.map(user => (
                    <div key={user.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
                        <div className="flex items-start gap-3">
                            <Image src={`https://ui-avatars.com/api/?name=${user.avatar}&background=random&color=fff&size=40`} alt="" width={40} height={40} className="rounded-full shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-sm font-bold text-neutral-900 truncate">{user.name}</h4>
                                    <span className={clsx('px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0', ROLE_STYLES[user.role])}>{ROLE_LABELS[user.role]}</span>
                                </div>
                                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                {user.class && <p className="text-[10px] text-neutral-400 mt-0.5">{user.class}</p>}
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button onClick={() => handleOpenEdit(user)} className="p-1.5 text-neutral-400 hover:text-brand-red"><Edit2 className="h-4 w-4" /></button>
                                <button onClick={() => handleDelete(user.id)} className="p-1.5 text-neutral-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-600"><X className="h-5 w-5" /></button>
                        <h3 className="text-lg font-bold text-neutral-900 mb-4">{editUser ? 'Edit User' : 'Tambah User Baru'}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-neutral-600 block mb-1">Nama Lengkap</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nama lengkap"
                                    className="w-full h-10 px-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-neutral-600 block mb-1">Email</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@domain.com"
                                    className="w-full h-10 px-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-neutral-600 block mb-1">Role</label>
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                                    className="w-full h-10 px-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red">
                                    <option value="admin">Admin</option>
                                    <option value="internal_mentor">Mentor Internal</option>
                                    <option value="industry_mentor">Mentor Industri</option>
                                    <option value="student">Siswa</option>
                                </select>
                            </div>
                            {formData.role === 'student' && (
                                <div>
                                    <label className="text-xs font-bold text-neutral-600 block mb-1">Kelas</label>
                                    <input type="text" value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })} placeholder="XI DTP 1"
                                        className="w-full h-10 px-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red" />
                                </div>
                            )}
                            <div>
                                <label className="text-xs font-bold text-neutral-600 block mb-1">Status</label>
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                                    className="w-full h-10 px-3 border border-neutral-200 rounded-xl text-sm outline-none focus:border-brand-red">
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                </select>
                            </div>
                            <button onClick={handleSave} className="w-full h-10 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-dark transition-colors text-sm">
                                {editUser ? 'Simpan Perubahan' : 'Tambah User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
