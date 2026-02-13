'use client';

import { usePathname } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <main className="min-h-screen bg-white text-neutral-900">{children}</main>;
    }

    return (
        <div className="min-h-screen">
            <Sidebar />
            <div className="lg:pl-64 transition-all duration-300">
                <TopHeader />
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
