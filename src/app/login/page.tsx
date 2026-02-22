'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side - Brand & Hero (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red to-brand-dark opacity-90 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
                    alt="SMK Telkom Building"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
                    <div>
                        <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-6 shadow-xl">
                            <Image src="/logo-telkom.png" alt="Logo" width={40} height={40} className="object-contain" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            Digital Talent Program <br />
                            <span className="text-neutral-800">Management System</span>
                        </h1>
                        <p className="text-red-100/80 text-lg max-w-md">
                            Platform terintegrasi untuk monitoring perkembangan talenta digital SMK Telkom Sidoarjo.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="p-2 bg-brand-purple/20 rounded-lg">
                                <ShieldCheck className="h-6 w-6 text-brand-accent" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Secure & Integrated</h3>
                                <p className="text-xs text-white/60">Single Sign-On with IGracias Account</p>
                            </div>
                        </div>
                        <p className="text-xs text-white/40">
                            &copy; 2026 SMK Telkom Sidoarjo. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-32">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-flex lg:hidden h-16 w-16 bg-brand-red/5 rounded-2xl items-center justify-center mb-6">
                            <Image src="/logo-telkom.png" alt="Logo" width={40} height={40} className="object-contain" />
                        </div>
                        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Selamat Datang! 👋</h2>
                        <p className="text-neutral-500">Silakan login menggunakan akun IGracias Anda.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-neutral-700 ml-1">Email / NIK / NIS</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                <input
                                    required
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@smktelkom-sda.sch.id"
                                    className="w-full h-12 rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-neutral-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-12 rounded-xl border border-neutral-200 bg-neutral-50 pl-10 pr-12 text-sm outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 rounded-md"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-brand-red focus:ring-brand-red" />
                                <span className="text-xs text-neutral-600 font-medium">Ingat Saya</span>
                            </label>
                            <a href="#" className="text-xs font-bold text-brand-red hover:text-brand-dark hover:underline">
                                Lupa Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <>
                                    Masuk ke Dashboard
                                    <ArrowRight className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                        <p className="text-xs text-neutral-500">
                            Belum punya akun? <a href="#" className="font-bold text-brand-red hover:underline">Hubungi Admin DTP</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
