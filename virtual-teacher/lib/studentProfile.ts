import { StudentProfile, Assessment } from '@/types';

export class StudentProfileManager {
  private storageKey = 'student_profiles';

  // Get all student profiles
  getProfiles(): StudentProfile[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return [];

    try {
      const profiles = JSON.parse(stored);
      return profiles.map((p: StudentProfile) => ({
        ...p,
        lastActive: new Date(p.lastActive),
        assessmentHistory: p.assessmentHistory.map((a: Assessment) => ({
          ...a,
          date: new Date(a.date),
        })),
      }));
    } catch {
      return [];
    }
  }

  // Get a specific profile
  getProfile(id: string): StudentProfile | null {
    const profiles = this.getProfiles();
    return profiles.find((p) => p.id === id) || null;
  }

  // Create a new profile
  createProfile(profile: Omit<StudentProfile, 'id' | 'completedLessons' | 'assessmentHistory' | 'lastActive'>): StudentProfile {
    const newProfile: StudentProfile = {
      ...profile,
      id: this.generateId(),
      completedLessons: [],
      assessmentHistory: [],
      lastActive: new Date(),
    };

    const profiles = this.getProfiles();
    profiles.push(newProfile);
    this.saveProfiles(profiles);

    return newProfile;
  }

  // Update a profile
  updateProfile(id: string, updates: Partial<StudentProfile>): StudentProfile | null {
    const profiles = this.getProfiles();
    const index = profiles.findIndex((p) => p.id === id);

    if (index === -1) return null;

    profiles[index] = {
      ...profiles[index],
      ...updates,
      id, // Ensure ID doesn't change
      lastActive: new Date(),
    };

    this.saveProfiles(profiles);
    return profiles[index];
  }

  // Add completed lesson
  addCompletedLesson(studentId: string, lessonId: string): void {
    const profile = this.getProfile(studentId);
    if (!profile) return;

    if (!profile.completedLessons.includes(lessonId)) {
      profile.completedLessons.push(lessonId);
      this.updateProfile(studentId, { completedLessons: profile.completedLessons });
    }
  }

  // Add assessment
  addAssessment(studentId: string, assessment: Omit<Assessment, 'id'>): void {
    const profile = this.getProfile(studentId);
    if (!profile) return;

    const newAssessment: Assessment = {
      ...assessment,
      id: this.generateId(),
    };

    profile.assessmentHistory.push(newAssessment);
    this.updateProfile(studentId, { assessmentHistory: profile.assessmentHistory });
  }

  // Update performance level based on recent assessments
  updatePerformanceLevel(studentId: string): void {
    const profile = this.getProfile(studentId);
    if (!profile) return;

    const recentAssessments = profile.assessmentHistory
      .filter((a) => a.score !== undefined)
      .slice(-10); // Last 10 graded assessments

    if (recentAssessments.length < 3) return; // Need at least 3 assessments

    const avgScore = recentAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / recentAssessments.length;

    let performanceLevel: StudentProfile['performanceLevel'];
    if (avgScore >= 85) performanceLevel = 'above';
    else if (avgScore >= 70) performanceLevel = 'at';
    else performanceLevel = 'below';

    this.updateProfile(studentId, { performanceLevel });
  }

  // Delete a profile
  deleteProfile(id: string): boolean {
    const profiles = this.getProfiles();
    const filtered = profiles.filter((p) => p.id !== id);

    if (filtered.length === profiles.length) return false;

    this.saveProfiles(filtered);
    return true;
  }

  private saveProfiles(profiles: StudentProfile[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(profiles));
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
let profileManager: StudentProfileManager | null = null;

export function getProfileManager(): StudentProfileManager {
  if (!profileManager) {
    profileManager = new StudentProfileManager();
  }
  return profileManager;
}
