
export type ScheduleType = 'Internal' | 'Industrial';

export type ScheduleItem = {
    id: string;
    code: string;
    topic: string;
    goal: string;
    assessment: string;
    teacher: string;
    type: ScheduleType;
    weeks: number[]; // 1, 2, 3, 4
};

export type Mentor = {
    id: string;
    name: string;
    role: string; // 'Internal' | 'Industri'
    avatar: string;
};

export const ALL_MENTORS: Mentor[] = [
    { id: 'm1', name: 'Pak Adi', role: 'Internal', avatar: 'Adi+Nugroho' },
    { id: 'm2', name: 'Bu Rina', role: 'Internal', avatar: 'Rina+Wati' },
    { id: 'm3', name: 'Pak Bagus', role: 'Industri', avatar: 'Bagus+Santoso' },
    { id: 'm4', name: 'Pak David', role: 'Industri', avatar: 'David+Beck' },
    { id: 'm5', name: 'Bu Susi', role: 'Internal', avatar: 'Susi+Susanti' },
];

export const INITIAL_FO_SCHEDULE: Record<string, ScheduleItem[]> = {
    'Agustus 2025': [
        { id: '1', code: 'MT-1', topic: 'Komponen Fiber Optic', goal: 'Memahami komponen SKSO', assessment: 'Tes Lisan', teacher: 'Pak Adi', type: 'Internal', weeks: [3, 4] },
        { id: '2', code: 'MT-2', topic: 'K3 Fiber Optic', goal: 'Menerapkan K3 Lapangan', assessment: 'Tes Lisan', teacher: 'Pak Adi', type: 'Internal', weeks: [3, 4] },
        { id: '3', code: 'MT-3', topic: 'Instalasi: Kupas Kabel', goal: 'Kupas Feeder & Distribusi', assessment: 'Observasi', teacher: 'Pak Adi', type: 'Internal', weeks: [3, 4] },
    ],
    'September 2025': [
        { id: '4', code: 'MT-1', topic: 'Komponen Fiber Optic', goal: 'Pendalaman Materi', assessment: 'Tes Tulis', teacher: 'Pak Adi', type: 'Internal', weeks: [1, 2] },
    ],
    'Oktober 2025': [
        { id: '5', code: 'MT-1', topic: 'Komponen Fiber Optic', goal: 'Review SKSO', assessment: 'Ujian', teacher: 'Pak Adi', type: 'Internal', weeks: [1, 2, 3, 4] },
        { id: '6', code: 'MT-2', topic: 'K3 Fiber Optic', goal: 'Safety Drill', assessment: 'Praktek', teacher: 'Pak Adi', type: 'Internal', weeks: [1, 2, 3, 4] },
    ],
    'Desember 2025': [
        { id: '7', code: 'MT-4', topic: 'Splicing (Penyambungan)', goal: 'Penyambungan Core FO', assessment: 'Uji Kompetensi', teacher: 'Pak Adi', type: 'Internal', weeks: [1, 2, 3, 4] },
        { id: '8', code: 'MT-5', topic: 'Terminasi ODC', goal: 'Real Case Terminasi', assessment: 'Project', teacher: 'Pak David (Industri)', type: 'Industrial', weeks: [1, 2, 3, 4] },
    ]
};

export const MONTHS = [
    'Agustus 2025', 'September 2025', 'Oktober 2025', 'November 2025',
    'Desember 2025', 'Januari 2026', 'Februari 2026', 'Maret 2026',
    'April 2026', 'Mei 2026', 'Juni 2026'
];
