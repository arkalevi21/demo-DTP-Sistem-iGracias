
export type MaterialContentType = 'pdf' | 'video' | 'document' | 'link';
export type TeachingDay = 'Rabu' | 'Kamis';
export type LearnerPace = 'Fast Learner' | 'Moderate' | 'Needs Attention';

export type Material = {
    id: string;
    title: string;
    description: string;
    date: string; // ISO string e.g. "2025-10-01"
    dayOfWeek: TeachingDay;
    type: 'Internal' | 'Industrial';
    teacherName: string;
    teacherRole: string;
    subject: string;
    contentUrl: string;
    contentType: MaterialContentType;
    createdAt: string;
};

export type ComprehensionScore = {
    id: string;
    materialId: string;
    studentId: string;
    studentName: string;
    studentClass: string;
    score: number; // 1-5
    submittedAt: string;
};

export const SCORE_LABELS: Record<number, string> = {
    1: 'Belum Paham',
    2: 'Sedikit Paham',
    3: 'Cukup Paham',
    4: 'Paham',
    5: 'Sangat Paham',
};

export const SCORE_EMOJIS: Record<number, string> = {
    1: '😵',
    2: '😕',
    3: '🤔',
    4: '😊',
    5: '🤩',
};

export function getLearnerPace(avgScore: number): LearnerPace {
    if (avgScore >= 4) return 'Fast Learner';
    if (avgScore >= 3) return 'Moderate';
    return 'Needs Attention';
}

export function getLearnerPaceColor(pace: LearnerPace) {
    switch (pace) {
        case 'Fast Learner': return { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
        case 'Moderate': return { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
        case 'Needs Attention': return { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
    }
}

// --- Mock Materials ---
export const MOCK_MATERIALS: Material[] = [
    {
        id: 'mat-1', title: 'Pengenalan Komponen Fiber Optic',
        description: 'Materi dasar mengenai komponen-komponen fiber optic termasuk kabel, konektor, dan alat ukur. Siswa diharapkan memahami fungsi setiap komponen.',
        date: '2025-10-01', dayOfWeek: 'Rabu', type: 'Internal',
        teacherName: 'Bu Rina', teacherRole: 'Pengajar Internal', subject: 'Fiber Optic',
        contentUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgN8ohm4/preview',
        contentType: 'pdf', createdAt: '2025-09-25T10:00:00Z',
    },
    {
        id: 'mat-2', title: 'Teknik Splicing Fiber Optic',
        description: 'Video tutorial lengkap teknik splicing/penyambungan kabel fiber optic menggunakan fusion splicer.',
        date: '2025-10-02', dayOfWeek: 'Kamis', type: 'Industrial',
        teacherName: 'Pak Bagus', teacherRole: 'Mentor Industri', subject: 'Fiber Optic',
        contentUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        contentType: 'video', createdAt: '2025-09-26T14:00:00Z',
    },
    {
        id: 'mat-3', title: 'HTML & CSS Dasar',
        description: 'Materi fondasi web development mencakup struktur HTML5 dan styling CSS modern.',
        date: '2025-10-08', dayOfWeek: 'Rabu', type: 'Internal',
        teacherName: 'Bu Rina', teacherRole: 'Pengajar Internal', subject: 'Web Development',
        contentUrl: 'https://docs.google.com/document/d/e/2PACX-example/pub',
        contentType: 'document', createdAt: '2025-10-01T09:00:00Z',
    },
    {
        id: 'mat-4', title: 'Instalasi Jaringan FO Real Case',
        description: 'Studi kasus real project instalasi jaringan fiber optic dari PT Telkom Indonesia.',
        date: '2025-10-09', dayOfWeek: 'Kamis', type: 'Industrial',
        teacherName: 'Pak David', teacherRole: 'Mentor Industri', subject: 'Fiber Optic',
        contentUrl: 'https://drive.google.com/file/d/example-fo-install/preview',
        contentType: 'pdf', createdAt: '2025-10-03T08:00:00Z',
    },
    {
        id: 'mat-5', title: 'React.js: Component & Props',
        description: 'Memahami konsep komponen di React.js dan bagaimana cara passing data menggunakan props.',
        date: '2025-10-15', dayOfWeek: 'Rabu', type: 'Internal',
        teacherName: 'Bu Rina', teacherRole: 'Pengajar Internal', subject: 'Web Development',
        contentUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
        contentType: 'video', createdAt: '2025-10-10T11:00:00Z',
    },
    {
        id: 'mat-6', title: 'K3 Lapangan & Safety Procedure',
        description: 'Prosedur keselamatan kerja di lapangan saat melakukan instalasi dan maintenance fiber optic.',
        date: '2025-10-16', dayOfWeek: 'Kamis', type: 'Industrial',
        teacherName: 'Pak Bagus', teacherRole: 'Mentor Industri', subject: 'Fiber Optic',
        contentUrl: 'https://drive.google.com/file/d/k3-safety/preview',
        contentType: 'pdf', createdAt: '2025-10-11T13:00:00Z',
    },
];

// --- Mock Comprehension Scores ---
export const MOCK_SCORES: ComprehensionScore[] = [
    // mat-1 scores
    { id: 's1', materialId: 'mat-1', studentId: '1', studentName: 'Alexander Grahambell', studentClass: 'XI DTP 1', score: 5, submittedAt: '2025-10-01T12:00:00Z' },
    { id: 's2', materialId: 'mat-1', studentId: '2', studentName: 'Sarah Connor', studentClass: 'XI DTP 1', score: 4, submittedAt: '2025-10-01T12:05:00Z' },
    { id: 's3', materialId: 'mat-1', studentId: '3', studentName: 'John Doe', studentClass: 'XI DTP 2', score: 3, submittedAt: '2025-10-01T12:10:00Z' },
    { id: 's4', materialId: 'mat-1', studentId: '5', studentName: 'Michael Ross', studentClass: 'XI DTP 1', score: 2, submittedAt: '2025-10-01T12:15:00Z' },
    { id: 's5', materialId: 'mat-1', studentId: '7', studentName: 'Harvey Specter', studentClass: 'XI DTP 1', score: 5, submittedAt: '2025-10-01T12:20:00Z' },
    { id: 's6', materialId: 'mat-1', studentId: '9', studentName: 'Donna Paulsen', studentClass: 'XI DTP 1', score: 4, submittedAt: '2025-10-01T12:25:00Z' },
    // mat-2 scores
    { id: 's7', materialId: 'mat-2', studentId: '1', studentName: 'Alexander Grahambell', studentClass: 'XI DTP 1', score: 5, submittedAt: '2025-10-02T12:00:00Z' },
    { id: 's8', materialId: 'mat-2', studentId: '2', studentName: 'Sarah Connor', studentClass: 'XI DTP 1', score: 3, submittedAt: '2025-10-02T12:05:00Z' },
    { id: 's9', materialId: 'mat-2', studentId: '3', studentName: 'John Doe', studentClass: 'XI DTP 2', score: 2, submittedAt: '2025-10-02T12:10:00Z' },
    { id: 's10', materialId: 'mat-2', studentId: '5', studentName: 'Michael Ross', studentClass: 'XI DTP 1', score: 1, submittedAt: '2025-10-02T12:15:00Z' },
    // mat-3 scores
    { id: 's11', materialId: 'mat-3', studentId: '1', studentName: 'Alexander Grahambell', studentClass: 'XI DTP 1', score: 4, submittedAt: '2025-10-08T12:00:00Z' },
    { id: 's12', materialId: 'mat-3', studentId: '7', studentName: 'Harvey Specter', studentClass: 'XI DTP 1', score: 5, submittedAt: '2025-10-08T12:05:00Z' },
    { id: 's13', materialId: 'mat-3', studentId: '4', studentName: 'Jane Smith', studentClass: 'XI DTP 2', score: 3, submittedAt: '2025-10-08T12:10:00Z' },
    // mat-4 scores
    { id: 's14', materialId: 'mat-4', studentId: '2', studentName: 'Sarah Connor', studentClass: 'XI DTP 1', score: 4, submittedAt: '2025-10-09T12:00:00Z' },
    { id: 's15', materialId: 'mat-4', studentId: '6', studentName: 'Rachel Zane', studentClass: 'XI DTP 3', score: 2, submittedAt: '2025-10-09T12:05:00Z' },
];
