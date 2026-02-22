'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  Award,
  Image as ImageIcon,
  DollarSign,
  Settings,
  LogOut,
  FileEdit,
  BarChart3,
  X,
  ClipboardList,
  CheckSquare,
  UserCog,
  Bell,
  History
} from 'lucide-react';
import clsx from 'clsx';
import { useSidebar, UserRole } from './SidebarContext';

const MENUS: Record<UserRole, { name: string; href: string; icon: any }[]> = {
  admin: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Input Kurikulum', href: '/planner', icon: FileEdit },
    { name: 'Student Mapping', href: '/students', icon: Users },
    { name: 'Presensi', href: '/attendance', icon: CheckSquare },
    { name: 'Laporan Bidang', href: '/reports', icon: BarChart3 },
    { name: 'Payroll Report', href: '/payroll', icon: DollarSign },
    { name: 'Kelola User', href: '/users', icon: UserCog },
  ],
  industry_mentor: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Jadwal Mengajar', href: '/schedule', icon: ClipboardList },
    { name: 'Jurnal Mengajar', href: '/jurnal', icon: BookOpen },
    { name: 'Riwayat Jurnal', href: '/jurnal/history', icon: History },
    { name: 'Planning Materi', href: '/planner', icon: Calendar },
    { name: 'Payroll Saya', href: '/payroll', icon: DollarSign },
    { name: 'Galeri Karya', href: '/gallery', icon: ImageIcon },
  ],
  internal_mentor: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Planning Materi', href: '/planner', icon: Calendar },
    { name: 'Jadwal Mengajar', href: '/schedule', icon: ClipboardList },
    { name: 'Monitoring Siswa', href: '/students', icon: Users },
    { name: 'Presensi', href: '/attendance', icon: CheckSquare },
    { name: 'Jurnal Kelas', href: '/jurnal', icon: BookOpen },
    { name: 'Riwayat Jurnal', href: '/jurnal/history', icon: History },
    { name: 'Competition', href: '/competition', icon: Award },
    { name: 'Laporan Bidang', href: '/reports', icon: BarChart3 },
    { name: 'Galeri Project', href: '/gallery', icon: ImageIcon },
  ],
  student: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Jadwal Saya', href: '/schedule', icon: ClipboardList },
    { name: 'Presensi Saya', href: '/attendance', icon: CheckSquare },
    { name: 'Galeri Sekolah', href: '/gallery', icon: BookOpen },
    { name: 'Kelola Portofolio', href: '/portfolio', icon: ImageIcon },
    { name: 'Lomba & Project', href: '/competition', icon: Award },
  ]
};

const USER_INFO: Record<UserRole, { name: string; role: string; avatar: string }> = {
  admin: { name: 'Admin DTP', role: 'Super Admin', avatar: 'Admin+DTP' },
  industry_mentor: { name: 'Pak Bagus', role: 'Pengajar Industri', avatar: 'Bagus+Santoso' },
  internal_mentor: { name: 'Bu Rina', role: 'Pengajar Internal', avatar: 'Rina+Wati' },
  student: { name: 'Arka Levi', role: 'Siswa XI RPL 1', avatar: 'Arka+Levi' },
};

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar, userRole, setUserRole } = useSidebar();

  // Safe fallback if userRole is undefined for some reason
  const currentRole = userRole || 'admin';
  const currentMenus = MENUS[currentRole];
  const currentUser = USER_INFO[currentRole];

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      <aside className={clsx(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r border-neutral-200 bg-white transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <Image src="/logo-telkom.png" alt="DTP Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-brand-red leading-tight">DTP System</h1>
              <p className="text-[10px] text-neutral-500 font-medium">SMK Telkom Sidoarjo</p>
            </div>
          </div>
          <button onClick={closeSidebar} className="lg:hidden p-2 text-neutral-500 hover:text-red-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 min-h-0">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Menu Utama
          </div>
          <ul className="space-y-1">
            {currentMenus.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) closeSidebar();
                    }}
                    className={clsx(
                      'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-red/10 text-brand-red'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    )}
                  >
                    <Icon className={clsx('mr-3 h-5 w-5', isActive ? 'text-brand-red' : 'text-neutral-400')} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Role Demo (Switcher)
          </div>
          <div className="px-3 space-y-2">
            <select
              value={currentRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-brand-red cursor-pointer"
            >
              <option value="admin">Admin</option>
              <option value="industry_mentor">Pengajar Industri</option>
              <option value="internal_mentor">Pengajar Internal</option>
              <option value="student">Siswa</option>
            </select>
          </div>
        </div>

        <div className="border-t border-neutral-200 bg-white p-4 shrink-0 max-h-[180px]">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/settings" className="flex items-center gap-3 w-full hover:bg-neutral-50 rounded-lg p-2 -ml-2 transition-colors group">
              <div className={`h-9 w-9 overflow-hidden rounded-full relative ${currentRole === 'admin' ? 'bg-brand-red/10' :
                currentRole === 'student' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                <Image
                  src={`https://ui-avatars.com/api/?name=${currentUser.avatar}&background=random&color=fff`}
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-700 group-hover:text-brand-red transition-colors">{currentUser.name}</p>
                <p className="text-xs text-neutral-500">{currentUser.role}</p>
              </div>
              <Settings className="h-4 w-4 text-neutral-400 group-hover:text-brand-red transition-colors" />
            </Link>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-dashed border-neutral-200">
            <div className="relative h-6 w-6 shrink-0">
              <Image src="/logo-telkom.png" alt="SMK Telkom" fill className="object-contain" />
            </div>
            <span className="text-[10px] text-neutral-400 font-medium">SMK Telkom Sidoarjo</span>
          </div>
        </div>
      </aside>
    </>
  );
}
