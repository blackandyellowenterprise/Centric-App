'use client';

import { useState, useEffect } from 'react';
import { StudentProfile, LessonContext, CurriculumTopic, TeacherMessage } from '@/types';
import { getProfileManager } from '@/lib/studentProfile';
import StudentProfileSetup from '@/components/StudentProfileSetup';
import LessonSelector from '@/components/LessonSelector';
import TeacherChat from '@/components/TeacherChat';
import { getCurriculumManager } from '@/lib/curriculum';

export default function Home() {
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [currentLesson, setCurrentLesson] = useState<CurriculumTopic | null>(null);
  const [lessonContext, setLessonContext] = useState<LessonContext | null>(null);
  const [isStartingLesson, setIsStartingLesson] = useState(false);
  const [view, setView] = useState<'select-profile' | 'select-lesson' | 'learning'>('select-profile');

  useEffect(() => {
    // Check for existing profiles
    const profileManager = getProfileManager();
    const profiles = profileManager.getProfiles();
    if (profiles.length > 0) {
      setCurrentStudent(profiles[0]); // Auto-select first profile for simplicity
      setView('select-lesson');
    }
  }, []);

  const handleProfileCreated = (profile: StudentProfile) => {
    setCurrentStudent(profile);
    setView('select-lesson');
  };

  const handleLessonSelected = async (topic: CurriculumTopic) => {
    if (!currentStudent) return;

    setCurrentLesson(topic);
    setIsStartingLesson(true);

    try {
      // Get lesson introduction from Jiminy
      const response = await fetch('/api/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'introduction',
          topic,
          student: currentStudent,
        }),
      });

      const data = await response.json();

      const introMessage: TeacherMessage = {
        role: 'teacher',
        content: data.introduction,
        timestamp: new Date(),
        type: 'lecture',
      };

      const context: LessonContext = {
        currentTopic: topic,
        studentProfile: currentStudent,
        conversationHistory: [introMessage],
        lessonObjectives: topic.standards.map((s) => s.fullStatement),
        progressPercentage: 0,
      };

      setLessonContext(context);
      setView('learning');
    } catch (error) {
      console.error('Error starting lesson:', error);
      alert('Failed to start lesson. Please try again.');
    } finally {
      setIsStartingLesson(false);
    }
  };

  const handleContextUpdate = (newContext: LessonContext) => {
    setLessonContext(newContext);

    // Update progress based on conversation length
    const progress = Math.min(
      Math.floor((newContext.conversationHistory.length / 20) * 100),
      100
    );
    setLessonContext({
      ...newContext,
      progressPercentage: progress,
    });
  };

  const handleBackToLessons = () => {
    setView('select-lesson');
    setCurrentLesson(null);
    setLessonContext(null);
  };

  const handleNewProfile = () => {
    setCurrentStudent(null);
    setView('select-profile');
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🦗 Jiminy Virtual Teacher
          </h1>
          <p className="text-gray-600">
            Your AI-powered guide through Texas homeschool curriculum
          </p>
        </div>

        {/* Profile Info Bar */}
        {currentStudent && view !== 'select-profile' && (
          <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {currentStudent.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{currentStudent.name}</div>
                <div className="text-sm text-gray-600">{currentStudent.gradeLevel}</div>
              </div>
            </div>
            <div className="flex gap-2">
              {view === 'learning' && (
                <button
                  onClick={handleBackToLessons}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  ← Back to Lessons
                </button>
              )}
              <button
                onClick={handleNewProfile}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              >
                Switch Profile
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          {view === 'select-profile' && (
            <StudentProfileSetup onProfileCreated={handleProfileCreated} />
          )}

          {view === 'select-lesson' && currentStudent && (
            <div>
              {isStartingLesson ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 animate-bounce">🦗</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Jiminy is preparing your lesson...
                  </h2>
                  <p className="text-gray-600">This will just take a moment!</p>
                </div>
              ) : (
                <LessonSelector
                  gradeLevel={currentStudent.gradeLevel}
                  onLessonSelected={handleLessonSelected}
                />
              )}
            </div>
          )}

          {view === 'learning' && lessonContext && (
            <div className="h-[70vh]">
              <TeacherChat
                context={lessonContext}
                onContextUpdate={handleContextUpdate}
              />
            </div>
          )}
        </div>

        {/* Features Footer */}
        {view === 'select-profile' && (
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Personalized Learning</h3>
              <p className="text-sm text-gray-600">
                Adapts to your learning style and performance level
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">🔊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Voice-Enabled</h3>
              <p className="text-sm text-gray-600">
                Jiminy speaks lectures and guidance aloud
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Texas TEKS Standards</h3>
              <p className="text-sm text-gray-600">
                Aligned with official Texas curriculum requirements
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
