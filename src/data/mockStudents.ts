
export type Student = {
    id: string;
    name: string;
    class: string;
    avatar: string;
    // Performance Metrics
    attendance: number; // Percentage (0-100)
    journal: {
        green: number;
        yellow: number;
        red: number;
    };
    avgScore: number;
    // Readiness Metrics
    projectCount: number;
    hasInternship: boolean;
};

export const STUDENTS_DATA: Student[] = [
    {
        id: '1', name: 'Alexander Grahambell', class: 'XI DTP 1', avatar: 'Alexander+Grahambell',
        attendance: 98, journal: { green: 15, yellow: 2, red: 0 }, avgScore: 92,
        projectCount: 5, hasInternship: true
    },
    {
        id: '2', name: 'Sarah Connor', class: 'XI DTP 1', avatar: 'Sarah+Connor',
        attendance: 95, journal: { green: 12, yellow: 4, red: 0 }, avgScore: 88,
        projectCount: 3, hasInternship: false
    },
    {
        id: '3', name: 'John Doe', class: 'XI DTP 2', avatar: 'John+Doe',
        attendance: 85, journal: { green: 8, yellow: 6, red: 1 }, avgScore: 78,
        projectCount: 2, hasInternship: false
    },
    {
        id: '4', name: 'Jane Smith', class: 'XI DTP 2', avatar: 'Jane+Smith',
        attendance: 82, journal: { green: 5, yellow: 8, red: 2 }, avgScore: 75,
        projectCount: 1, hasInternship: false
    },
    {
        id: '5', name: 'Michael Ross', class: 'XI DTP 1', avatar: 'Michael+Ross',
        attendance: 60, journal: { green: 2, yellow: 5, red: 8 }, avgScore: 45,
        projectCount: 0, hasInternship: false
    },
    {
        id: '6', name: 'Rachel Zane', class: 'XI DTP 3', avatar: 'Rachel+Zane',
        attendance: 65, journal: { green: 3, yellow: 4, red: 6 }, avgScore: 50,
        projectCount: 1, hasInternship: false
    },
    {
        id: '7', name: 'Harvey Specter', class: 'XI DTP 1', avatar: 'Harvey+Specter',
        attendance: 100, journal: { green: 20, yellow: 0, red: 0 }, avgScore: 98,
        projectCount: 8, hasInternship: true
    },
    {
        id: '8', name: 'Louis Litt', class: 'XI DTP 2', avatar: 'Louis+Litt',
        attendance: 90, journal: { green: 10, yellow: 5, red: 1 }, avgScore: 82,
        projectCount: 4, hasInternship: true
    },
    {
        id: '9', name: 'Donna Paulsen', class: 'XI DTP 1', avatar: 'Donna+Paulsen',
        attendance: 96, journal: { green: 14, yellow: 1, red: 0 }, avgScore: 90,
        projectCount: 6, hasInternship: true
    },
    {
        id: '10', name: 'Jessica Pearson', class: 'XI DTP 1', avatar: 'Jessica+Pearson',
        attendance: 99, journal: { green: 18, yellow: 2, red: 0 }, avgScore: 95,
        projectCount: 10, hasInternship: true
    },
    // Kelas XII
    {
        id: '11', name: 'Rizky Pratama', class: 'XII DTP 1', avatar: 'Rizky+Pratama',
        attendance: 97, journal: { green: 22, yellow: 3, red: 0 }, avgScore: 93,
        projectCount: 7, hasInternship: true
    },
    {
        id: '12', name: 'Anisa Rahma', class: 'XII DTP 1', avatar: 'Anisa+Rahma',
        attendance: 92, journal: { green: 16, yellow: 5, red: 1 }, avgScore: 86,
        projectCount: 4, hasInternship: true
    },
    {
        id: '13', name: 'Bayu Setiawan', class: 'XII DTP 2', avatar: 'Bayu+Setiawan',
        attendance: 88, journal: { green: 10, yellow: 8, red: 2 }, avgScore: 80,
        projectCount: 3, hasInternship: false
    },
    {
        id: '14', name: 'Dinda Ayu', class: 'XII DTP 1', avatar: 'Dinda+Ayu',
        attendance: 94, journal: { green: 18, yellow: 4, red: 0 }, avgScore: 89,
        projectCount: 6, hasInternship: true
    },
    {
        id: '15', name: 'Farhan Maulana', class: 'XII DTP 2', avatar: 'Farhan+Maulana',
        attendance: 72, journal: { green: 5, yellow: 6, red: 7 }, avgScore: 58,
        projectCount: 1, hasInternship: false
    },
    {
        id: '16', name: 'Siti Nurhaliza', class: 'XII DTP 2', avatar: 'Siti+Nurhaliza',
        attendance: 91, journal: { green: 14, yellow: 6, red: 1 }, avgScore: 84,
        projectCount: 5, hasInternship: true
    },
];
