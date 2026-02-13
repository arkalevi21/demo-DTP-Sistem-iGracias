'use client';

import {
  Users,
  BookOpen,
  Map,
  TrendingUp,
  ArrowRight,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/SidebarContext';
import clsx from 'clsx';

export default function Home() {
  const { userRole } = useSidebar();

  // --- 1. ADMIN DASHBOARD ---
  if (userRole === 'admin') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h1>
            <p className="text-neutral-500">Selamat datang kembali, Admin DTP.</p>
          </div>
          <button className="px-4 py-2 bg-brand-red text-white rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors shadow-sm shadow-red-200">
            Download Laporan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Siswa', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Jurnal Bulan Ini', value: '48', icon: BookOpen, color: 'text-brand-red', bg: 'bg-brand-red/10' },
            { label: 'Competition Track', value: '12', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { label: 'Rataan Kehadiran', value: '94%', icon: Map, color: 'text-orange-600', bg: 'bg-orange-100' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                    <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                  <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-neutral-600">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">John Doe mengisi Jurnal Fundamental Web</p>
                    <p className="text-xs text-neutral-500">Baru saja • Kelas X RPL 1</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-brand-red font-medium hover:bg-red-50 rounded-lg transition-colors">
              Lihat Semua Aktivitas
            </button>
          </div>

          <div className="bg-gradient-to-br from-brand-red to-brand-dark p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Siapkan Materi Bulan Depan</h3>
              <p className="text-red-100 text-sm mb-6 max-w-sm">
                Batas pengisian Monthly Planner adalah tanggal 25. Pastikan semua mentor telah submit.
              </p>
              <Link href="/planner" className="inline-flex items-center px-4 py-2 bg-white text-brand-red rounded-lg text-sm font-bold hover:bg-neutral-50 transition-colors">
                Buka Monthly Planner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
              <Calendar className="w-64 h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. INDUSTRY MENTOR DASHBOARD ---
  if (userRole === 'industry_mentor') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Halo, Pak Bagus! 👋</h1>
            <p className="text-neutral-500">Mentor Industri • Fiber Optic & IoT</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">NEXT SESSION</p>
            <p className="text-lg font-bold text-neutral-900">Kamis, 08:00 WIB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Next Class Card */}
          <div className="col-span-2 bg-neutral-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded">COMING UP</span>
                <span className="text-neutral-400 text-xs">SMK Telkom Sidoarjo</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">Terminasi ODC & Splicing</h3>
              <p className="text-neutral-400 text-sm mb-6">XI TJKT 2 • Lab Fiber Optic</p>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-neutral-900 rounded-lg text-sm font-bold hover:bg-neutral-200 transition-colors">
                  Lihat Materi
                </button>
                <button className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-lg text-sm font-bold hover:bg-neutral-700 transition-colors">
                  Input Jurnal
                </button>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
              <BookOpen className="w-48 h-48" />
            </div>
          </div>

          {/* Payroll Estimate */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-sm font-bold text-neutral-500">Estimasi Honor Bulan Ini</p>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-1">Rp 2.450.000</h3>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% dari bulan lalu
            </p>
            <Link href="/payroll" className="mt-4 text-sm text-neutral-500 hover:text-neutral-900 font-medium flex items-center gap-1">
              Lihat detail <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/jurnal" className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm hover:border-red-500 hover:shadow-md transition-all group">
            <BookOpen className="h-6 w-6 text-brand-red mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-neutral-900">Input Jurnal</h4>
            <p className="text-xs text-neutral-500">Catat sesi mengajar</p>
          </Link>
          <Link href="/planner" className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm hover:border-red-500 hover:shadow-md transition-all group">
            <Calendar className="h-6 w-6 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-neutral-900">Planner Materi</h4>
            <p className="text-xs text-neutral-500">Cek silabus tahunan</p>
          </Link>
          <div className="bg-neutral-50 p-4 rounded-xl border border-dashed border-neutral-200 text-center flex flex-col items-center justify-center opacity-50 cursor-not-allowed">
            <p className="text-xs font-bold text-neutral-400">Fitur Lain coming soon</p>
          </div>
          <div className="bg-neutral-50 p-4 rounded-xl border border-dashed border-neutral-200 text-center flex flex-col items-center justify-center opacity-50 cursor-not-allowed">
            <p className="text-xs font-bold text-neutral-400">Fitur Lain coming soon</p>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. INTERNAL MENTOR DASHBOARD ---
  if (userRole === 'internal_mentor') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Dashboard Guru</h1>
            <p className="text-neutral-500">Pantau perkembangan siswa secara real-time.</p>
          </div>
        </div>

        {/* Attention Needed */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-amber-100 rounded-full shrink-0">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-900">3 Siswa Perlu Perhatian (Slow Learners)</h3>
              <p className="text-sm text-amber-800 mt-1 mb-4 max-w-xl">
                Siswa berikut memiliki kehadiran {'<'} 70% atau capaian kompetensi Merah dominan. Segera lakukan konseling.
              </p>
              <Link href="/students?filter=Slow" className="px-4 py-2 bg-white text-amber-900 rounded-lg text-sm font-bold shadow-sm hover:bg-amber-100 transition-colors">
                Lihat Daftar Siswa
              </Link>
            </div>
          </div>
          {/* Background Pattern */}
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
            <AlertTriangle className="w-48 h-48 text-amber-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-neutral-900">Jadwal Mengajar Hari Ini</h3>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">ONGOING</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                <div className="p-2 bg-white rounded shadow-sm text-center min-w-[3rem]">
                  <span className="block text-xs font-bold text-neutral-500">07:00</span>
                  <span className="block text-xs font-bold text-neutral-500">09:00</span>
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Fundamental Web (HTML/CSS)</p>
                  <p className="text-xs text-neutral-500">X RPL 1 • Lab 2</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg opacity-60">
                <div className="p-2 bg-neutral-100 rounded text-center min-w-[3rem]">
                  <span className="block text-xs font-bold text-neutral-500">10:00</span>
                  <span className="block text-xs font-bold text-neutral-500">12:00</span>
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Algoritma Dasar</p>
                  <p className="text-xs text-neutral-500">X RPL 3 • Teori 1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-4">Statistik Jurnal</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-blue-700">24</p>
                <p className="text-xs text-blue-600 font-medium">Jurnal Terisi</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl text-center">
                <p className="text-2xl font-bold text-neutral-400">2</p>
                <p className="text-xs text-neutral-400 font-medium">Draft (Belum Submit)</p>
              </div>
            </div>
            <Link href="/jurnal" className="block mt-4 text-center text-sm font-bold text-brand-red hover:underline">
              Kelola Jurnal Kelas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 4. STUDENT DASHBOARD ---
  if (userRole === 'student') {
    return (
      <div className="space-y-8">
        <div className="bg-neutral-900 text-white p-8 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold mb-4 border border-white/20">
              SEMESTER GENAP 2025/2026
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Semangat Pagi, Arka! 🚀</h1>
            <p className="text-neutral-400 mb-6">Jangan lupa isi logbook hari ini dan cek jadwal materi terbaru.</p>

            <div className="flex gap-3">
              <Link href="/portfolio" className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors shadow-lg shadow-red-900/50">
                Update Portofolio
              </Link>
              <Link href="/competition" className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/10">
                Cek Info Lomba
              </Link>
            </div>
          </div>
          {/* Background Art */}
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
            <TrendingUp className="w-80 h-80" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">95%</h3>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-wide">Kehadiran</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-600">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900">12</h3>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-wide">Project Selesai</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3 text-orange-600">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mb-1">Minggu 3</h3>
            <p className="text-xs text-neutral-500">Materi Saat Ini: <strong>K3 Fiber Optic</strong></p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-neutral-900">Showcase Terbaru via Galeri</h3>
            <Link href="/gallery" className="text-xs font-bold text-brand-red hover:underline">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm">
                <div className="w-20 h-20 bg-neutral-200 rounded-lg shrink-0"></div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Smart Home Dashboard</h4>
                  <p className="text-xs text-neutral-500 mt-1 mb-2">By Sarah Connor • XI RPL 1</p>
                  <span className="text-[10px] bg-neutral-100 px-2 py-1 rounded font-bold text-neutral-600">IOT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback for unknown role
  return <div className="p-10 text-center">Role not recognized</div>;
}
