
import { Student } from '@/data/mockStudents';

export type LearnerCategory = 'Fast' | 'Middle' | 'Slow';

export type StudentAnalysis = {
    category: LearnerCategory;
    reason: string;
    isReadyToHire: boolean;
    readinessScore: number;
};

export const analyzeStudent = (student: Student): StudentAnalysis => {
    const { attendance, journal } = student;
    const totalEntries = journal.green + journal.yellow + journal.red;

    // Safety check for empty data
    if (totalEntries === 0) return { category: 'Middle', reason: 'Belum cukup data', isReadyToHire: false, readinessScore: 0 };

    const greenPercentage = (journal.green / totalEntries) * 100;
    const redPercentage = (journal.red / totalEntries) * 100;

    // --- Industrial Readiness Logic (KF-15) ---
    // Criteria for Ready To Hire:
    // 1. Attendance > 90%
    // 2. Green Flags > 80%
    // 3. Avg Score > 85
    // 4. Has Project Portfolio

    // Default values if fields missing
    const projectCount = student.projectCount || 0;

    const isReadyToHire =
        attendance >= 90 &&
        greenPercentage >= 80 &&
        student.avgScore >= 85 &&
        projectCount >= 2;

    const readinessScore = Math.round(
        (attendance * 0.3) +
        (greenPercentage * 0.3) +
        (student.avgScore * 0.2) +
        (Math.min(projectCount, 5) * 4) // Max 20 points for projects
    );

    // 1. SLOW LEARNER Condition
    // - Attendance < 70% OR High Red Flags (> 30%)
    if (attendance < 70) {
        return { category: 'Slow', reason: 'Kehadiran di bawah 70% (Kritis)', isReadyToHire, readinessScore };
    }
    if (redPercentage > 30) {
        return { category: 'Slow', reason: `Capaian Merah Dominan (${redPercentage.toFixed(0)}%)`, isReadyToHire, readinessScore };
    }

    // 2. FAST LEARNER Condition
    // - Attendance > 90% AND High Green Flags (> 70%)
    if (attendance >= 90 && greenPercentage > 70) {
        return { category: 'Fast', reason: 'Absensi & Capaian Excellent', isReadyToHire, readinessScore };
    }

    // 3. MIDDLE LEARNER (Default)
    return { category: 'Middle', reason: 'Performa Stabil / Cukup', isReadyToHire, readinessScore };
};
