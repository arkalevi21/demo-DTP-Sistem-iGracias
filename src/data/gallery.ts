export type Comment = {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
    isOfficial: boolean;
};

export type Project = {
    id: number;
    title: string;
    student: string;
    class: string;
    description: string;
    image: string;
    tags: string[];
    links: { github?: string; demo?: string; figma?: string };
    likes: number;
    views: number;
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Modern E-Commerce Dashboard',
        student: 'Alexander Grahambell',
        class: 'XI DTP 1',
        description: 'Dashboard admin responsif dengan chart interaktif dan manajemen stok real-time. Dibangun dengan React dan Tailwind CSS untuk performa optimal.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        tags: ['React', 'Tailwind', 'Recharts'],
        links: { github: '#', demo: '#' },
        likes: 24,
        views: 156
    },
    {
        id: 2,
        title: 'Travel Booking App UI',
        student: 'Sarah Connor',
        class: 'XI DTP 1',
        description: 'Desain antarmuka aplikasi travel dengan fokus pada pengalaman pengguna mobile. Prototype interaktif lengkap dengan user flow dan micro-interactions.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        tags: ['Figma', 'UI/UX', 'Mobile Design'],
        links: { figma: '#' },
        likes: 12,
        views: 89
    },
    {
        id: 3,
        title: 'Smart Home Controller',
        student: 'Harvey Specter',
        class: 'XI DTP 2',
        description: 'Aplikasi IoT untuk mengontrol lampu dan pendingin ruangan via web. Menggunakan protokol MQTT untuk komunikasi real-time dengan perangkat.',
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&q=80&w=800',
        tags: ['Next.js', 'IoT', 'MQTT'],
        links: { github: '#', demo: '#' },
        likes: 31,
        views: 203
    },
    {
        id: 4,
        title: 'Learning Management System',
        student: 'John Doe',
        class: 'XI DTP 2',
        description: 'Platform pembelajaran online dengan fitur kuis dan tracking progress siswa. Backend Laravel dengan frontend Vue.js untuk pengalaman belajar interaktif.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        tags: ['Vue.js', 'Laravel', 'MySQL'],
        links: { github: '#', demo: '#' },
        likes: 8,
        views: 67
    },
    {
        id: 5,
        title: 'Finance Tracker Mobile',
        student: 'Jane Smith',
        class: 'XII DTP 1',
        description: 'Aplikasi pencatat keuangan pribadi dengan fitur scan struk otomatis menggunakan OCR. Cross-platform Flutter dengan Firebase backend.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        tags: ['Flutter', 'Dart', 'Firebase'],
        links: { github: '#', demo: '#' },
        likes: 15,
        views: 112
    },
    {
        id: 6,
        title: 'Coffee Shop Landing Page',
        student: 'Michael Ross',
        class: 'XII DTP 1',
        description: 'Landing page promosi kedai kopi dengan animasi scroll yang menarik menggunakan GSAP. Desain minimalis yang memenuhi standar web modern.',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800',
        tags: ['HTML', 'CSS', 'GSAP'],
        links: { github: '#', demo: '#' },
        likes: 18,
        views: 97
    }
];

export const INITIAL_COMMENTS: Record<number, Comment[]> = {
    1: [
        { id: 'c1', author: 'Pak David', avatar: 'David+Beck', text: 'Arsitektur dashboard ini sudah sesuai standar industri. Perlu optimisasi lazy loading untuk skalabilitas. Overall sangat baik — siap untuk portfolio profesional!', timestamp: '2 hari lalu', isOfficial: true },
        { id: 'c2', author: 'Citra Dewi', avatar: 'Citra+Dewi', text: 'Keren banget dashboardnya! Animasinya smooth 🔥', timestamp: '1 hari lalu', isOfficial: false },
        { id: 'c3', author: 'Ahmad Rizky', avatar: 'Ahmad+Rizky', text: 'Inspiratif, mau coba bikin yang mirip untuk project saya', timestamp: '5 jam lalu', isOfficial: false },
        { id: 'c7', author: 'Pak Adi', avatar: 'Adi+Nugroho', text: 'Good job Alexander! Coba tambahkan dark mode toggle dan export ke CSV', timestamp: '3 jam lalu', isOfficial: false },
    ],
    3: [
        { id: 'c4', author: 'Pak Bagus', avatar: 'Bagus+Santoso', text: 'Implementasi MQTT sudah tepat. Saran: tambahkan error handling untuk koneksi terputus dan retry mechanism. Siap untuk demo ke client!', timestamp: '3 hari lalu', isOfficial: true },
        { id: 'c8', author: 'Dian Lestari', avatar: 'Dian+Lestari', text: 'Keren! IoT-nya bisa dikontrol dari mana aja ya?', timestamp: '1 hari lalu', isOfficial: false },
    ],
    5: [
        { id: 'c5', author: 'Pak David', avatar: 'David+Beck', text: 'UI clean dan UX-nya intuitif. Fitur scan struk bisa dikembangkan dengan OCR engine yang lebih akurat. Sangat berpotensi jadi produk komersial — pertimbangkan untuk submit ke Google Play.', timestamp: '1 hari lalu', isOfficial: true },
        { id: 'c6', author: 'Budi Santoso', avatar: 'Budi+Santoso', text: 'Fitur scan struknya beneran jalan? Mau dong diajarin cara bikinnya', timestamp: '8 jam lalu', isOfficial: false },
    ],
    6: [
        { id: 'c9', author: 'Sari Indah', avatar: 'Sari+Indah', text: 'Animasi scrollnya keren! GSAP emang the best 🎨', timestamp: '12 jam lalu', isOfficial: false },
    ],
};
