'use client';

import { useState } from 'react';
import { useSidebar, UserRole } from '@/components/SidebarContext';
import Image from 'next/image';
import { User, Lock, Shield, CheckCircle2, KeyRound, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

// Simulated Access Rights Data
const ACCESS_RIGHTS: Record<UserRole, string[]> = {
    admin: [
        'Super Admin Access (All Features)',
        'User Management & Roles',
        'Payroll System (Full Access)',
        'System Configuration'
    ],
    industry_mentor: [
        'Subject: Fiber Optic (Industrial Class)',
        'Menu: Jurnal Mengajar & Absensi',
        'Menu: Planning Materi (Fiber Optic)',
        'Feature: Payroll & Gallery'
    ],
    internal_mentor: [
        'Role: Wali Kelas / Internal Mentor',
        'Access: Monitoring Siswa (All Classes)',
        'Menu: Jurnal Kelas & Competition',
        'Feature: Laporan Bidang'
    ],
    student: [
        'Class: XI RPL 1',
        'Enrolled: Fiber Optic (Industrial)',
        'Enrolled: Web Development (Internal)',
        'Feature: Portfolio & Competition Track'
    ]
};

const USER_INFO: Record<UserRole, { name: string; role: string; avatar: string }> = {
    admin: { name: 'Admin DTP', role: 'Super Admin', avatar: 'Admin+DTP' },
    industry_mentor: { name: 'Pak Bagus', role: 'Pengajar Industri', avatar: 'Bagus+Santoso' },
    internal_mentor: { name: 'Bu Rina', role: 'Pengajar Internal', avatar: 'Rina+Wati' },
    student: { name: 'Arka Levi', role: 'Siswa XI RPL 1', avatar: 'Arka+Levi' },
};

export default function SettingsPage() {
    const { userRole } = useSidebar(); // Access global user role context
    // Determine current role based on context or default to 'student' if undefined
    // Similar logic to Sidebar.tsx
    const currentRole = userRole || 'admin';
    const accessList = ACCESS_RIGHTS[currentRole];
    const currentUser = USER_INFO[currentRole];

    const [passwordData, setPasswordData] = useState({ old: '', new: '', confirm: '' });
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'mismatch'>('idle');

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('idle');

        if (!passwordData.old || !passwordData.new || !passwordData.confirm) {
            setStatus('error');
            return;
        }

        if (passwordData.new !== passwordData.confirm) {
            setStatus('mismatch');
            return;
        }

        // Simulate API Call
        setTimeout(() => {
            setStatus('success');
            setPasswordData({ old: '', new: '', confirm: '' });
        }, 1000);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">User Settings & Profile</h1>
                    <p className="text-neutral-500">Kelola informasi profil, keamanan akun, dan hak akses sistem.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile & Access */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
                        <div className="h-24 w-24 mx-auto bg-neutral-100 rounded-full relative mb-4 overflow-hidden border-4 border-white shadow-lg">
                            {/* Note: Simplified avatar logic for demo */}
                            <Image
                                src={`https://ui-avatars.com/api/?name=${currentUser.avatar}&background=random&size=128`}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900">{currentUser.name}</h2>
                        <p className="text-sm text-neutral-500">{currentUser.role}</p>
                        <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-bold mt-2 uppercase tracking-wide">
                            Active User
                        </span>
                    </div>

                    {/* Access Rights */}
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" /> Hak Akses & Mapel
                        </h3>
                        <div className="space-y-3">
                            {accessList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-neutral-600 p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                            <AlertTriangle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-700">
                                Akses dibatasi sesuai role anda. Hubungi admin jika ada ketidaksesuaian mapel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Security Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <h3 className="font-bold text-neutral-900 mb-6 flex items-center gap-2 pb-4 border-b border-neutral-100">
                            <Lock className="h-5 w-5 text-red-600" /> Keamanan Akun
                        </h3>

                        <form onSubmit={handleSavePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Password Saat Ini</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                    <input
                                        type="password"
                                        value={passwordData.old}
                                        onChange={e => setPasswordData({ ...passwordData, old: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Password Baru</label>
                                    <input
                                        type="password"
                                        value={passwordData.new}
                                        onChange={e => setPasswordData({ ...passwordData, new: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Konfirmasi Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirm}
                                        onChange={e => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                                <p className="text-xs text-neutral-500">
                                    Password terakhir diubah: 3 bulan yang lalu
                                </p>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-shadow shadow-md shadow-red-100"
                                >
                                    Update Password
                                </button>
                            </div>

                            {status === 'success' && (
                                <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                    <CheckCircle2 className="h-4 w-4" /> Password berhasil diperbarui!
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                    <AlertTriangle className="h-4 w-4" /> Mohon lengkapi semua field.
                                </div>
                            )}

                            {status === 'mismatch' && (
                                <div className="p-3 bg-amber-50 text-amber-700 text-sm rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                    <AlertTriangle className="h-4 w-4" /> Password baru dan konfirmasi tidak sama.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Login Activity (Mock) */}
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5 text-neutral-400" /> Riwayat Login Terakhir
                        </h3>
                        <div className="text-sm text-neutral-600 space-y-3">
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span>MacBook Pro - Chrome</span>
                                <span className="text-neutral-400">Baru saja</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span>iPhone 13 - Safari</span>
                                <span className="text-neutral-400">2 jam yang lalu</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span>Windows PC - Edge</span>
                                <span className="text-neutral-400">Kemarin, 14:30</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
