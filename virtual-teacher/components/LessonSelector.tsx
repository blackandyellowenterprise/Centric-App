'use client';

import { useState, useEffect } from 'react';
import { CurriculumTopic } from '@/types';
import { getCurriculumManager } from '@/lib/curriculum';

interface LessonSelectorProps {
  gradeLevel: string;
  onLessonSelected: (topic: CurriculumTopic) => void;
}

export default function LessonSelector({ gradeLevel, onLessonSelected }: LessonSelectorProps) {
  const [subjects, setSubjects] = useState<Array<{ code: string; name: string }>>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [topics, setTopics] = useState<CurriculumTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadTopics(selectedSubject);
    }
  }, [selectedSubject, gradeLevel]);

  const loadSubjects = async () => {
    const curriculum = await getCurriculumManager();
    const allSubjects = curriculum.getAllSubjects();
    setSubjects(allSubjects);
    setIsLoading(false);
  };

  const loadTopics = async (subjectCode: string) => {
    const curriculum = await getCurriculumManager();
    const subjectTopics = curriculum.getTopicsBySubject(subjectCode, gradeLevel);
    setTopics(subjectTopics);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Subject</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {isLoading ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Loading subjects...
            </div>
          ) : (
            subjects.map((subject) => (
              <button
                key={subject.code}
                onClick={() => setSelectedSubject(subject.code)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedSubject === subject.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-gray-900">{subject.name}</div>
                <div className="text-xs text-gray-600 mt-1">{gradeLevel}</div>
              </button>
            ))
          )}
        </div>
      </div>

      {selectedSubject && topics.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Select a Topic</h3>
          <div className="space-y-3">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onLessonSelected(topic)}
                className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
              >
                <div className="font-semibold text-gray-900">{topic.chapter}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {topic.standards.length} learning standards
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
