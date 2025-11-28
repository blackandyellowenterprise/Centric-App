import Papa from 'papaparse';
import { TEKSStandard, CurriculumTopic } from '@/types';
import fs from 'fs';
import path from 'path';

export class CurriculumManager {
  private standards: Map<string, TEKSStandard[]> = new Map();
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    // In production, we'd load this from the extracted CSV files
    // For now, we'll create a method to load from the parent directory
    try {
      await this.loadTEKSData();
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing curriculum:', error);
      // Initialize with empty data to prevent crashes
      this.initialized = true;
    }
  }

  private async loadTEKSData(): Promise<void> {
    // TEKS files are in the parent directory's zip files
    // We'll need to extract and parse them
    const subjects = [
      { code: '110', name: 'English Language Arts and Reading' },
      { code: '111', name: 'Mathematics' },
      { code: '112', name: 'Science' },
      { code: '113', name: 'Social Studies' },
      { code: '114', name: 'Languages Other Than English' },
      { code: '115', name: 'Health Education' },
      { code: '116', name: 'Physical Education' },
      { code: '117', name: 'Fine Arts' },
      { code: '118', name: 'Economics' },
      { code: '120', name: 'Other Texas Essential Knowledge and Skills' },
      { code: '126', name: 'Technology Applications' },
      { code: '127', name: 'Career Development and Career and Technical Education' },
    ];

    // Try to load from extracted data or create sample data
    for (const subject of subjects) {
      const standards = this.createSampleStandards(subject.code, subject.name);
      this.standards.set(subject.code, standards);
    }
  }

  private createSampleStandards(code: string, name: string): TEKSStandard[] {
    // Sample standards for demonstration
    // In production, this would parse actual CSV data
    return [
      {
        itemType: 'Standard',
        sequence: '1',
        humanCode: `${code}.1`,
        fullStatement: `Students shall be introduced to ${name} concepts appropriate to their grade level.`,
        edLevel: 'Elementary',
        lastModified: new Date().toISOString(),
      },
      {
        itemType: 'Standard',
        sequence: '2',
        humanCode: `${code}.2`,
        fullStatement: `Students shall demonstrate understanding of ${name} through various assessments.`,
        edLevel: 'Elementary',
        lastModified: new Date().toISOString(),
      },
    ];
  }

  getTopicsBySubject(subjectCode: string, gradeLevel: string): CurriculumTopic[] {
    const standards = this.standards.get(subjectCode) || [];

    return [
      {
        id: `${subjectCode}-topic-1`,
        subject: this.getSubjectName(subjectCode),
        chapter: `Introduction to ${this.getSubjectName(subjectCode)}`,
        gradeLevel,
        standards: standards.filter((s) =>
          s.edLevel.toLowerCase().includes(gradeLevel.toLowerCase()) ||
          s.edLevel === ''
        ),
        prerequisites: [],
      },
    ];
  }

  private getSubjectName(code: string): string {
    const subjects: Record<string, string> = {
      '110': 'English Language Arts',
      '111': 'Mathematics',
      '112': 'Science',
      '113': 'Social Studies',
      '114': 'Foreign Languages',
      '115': 'Health',
      '116': 'Physical Education',
      '117': 'Fine Arts',
      '118': 'Economics',
      '120': 'Other Subjects',
      '126': 'Technology',
      '127': 'Career Education',
    };
    return subjects[code] || 'Unknown Subject';
  }

  getTopic(topicId: string): CurriculumTopic | null {
    // Parse topicId to get subject and topic info
    const [subjectCode] = topicId.split('-');
    const topics = this.getTopicsBySubject(subjectCode, 'Elementary');
    return topics.find((t) => t.id === topicId) || null;
  }

  searchTopics(query: string, gradeLevel?: string): CurriculumTopic[] {
    const allTopics: CurriculumTopic[] = [];

    this.standards.forEach((standards, subjectCode) => {
      const topics = this.getTopicsBySubject(
        subjectCode,
        gradeLevel || 'Elementary'
      );
      allTopics.push(...topics);
    });

    return allTopics.filter((topic) =>
      topic.subject.toLowerCase().includes(query.toLowerCase()) ||
      topic.chapter.toLowerCase().includes(query.toLowerCase())
    );
  }

  getAllSubjects(): Array<{ code: string; name: string }> {
    return [
      { code: '110', name: 'English Language Arts' },
      { code: '111', name: 'Mathematics' },
      { code: '112', name: 'Science' },
      { code: '113', name: 'Social Studies' },
      { code: '114', name: 'Foreign Languages' },
      { code: '115', name: 'Health' },
      { code: '116', name: 'Physical Education' },
      { code: '117', name: 'Fine Arts' },
      { code: '118', name: 'Economics' },
      { code: '126', name: 'Technology' },
      { code: '127', name: 'Career Education' },
    ];
  }

  getGradeLevels(): string[] {
    return [
      'Kindergarten',
      'Grade 1',
      'Grade 2',
      'Grade 3',
      'Grade 4',
      'Grade 5',
      'Grade 6',
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12',
    ];
  }
}

// Singleton instance
let curriculumManager: CurriculumManager | null = null;

export async function getCurriculumManager(): Promise<CurriculumManager> {
  if (!curriculumManager) {
    curriculumManager = new CurriculumManager();
    await curriculumManager.initialize();
  }
  return curriculumManager;
}
