'use client';

import { useState } from 'react';
import { StudentProfile } from '@/types';
import { getProfileManager } from '@/lib/studentProfile';

interface StudentProfileSetupProps {
  onProfileCreated: (profile: StudentProfile) => void;
  onCancel?: () => void;
}

export default function StudentProfileSetup({ onProfileCreated, onCancel }: StudentProfileSetupProps) {
  const [formData, setFormData] = useState({
    name: '',
    gradeLevel: 'Grade 5',
    interests: '',
    learningStyle: 'visual' as const,
    performanceLevel: 'at' as const,
    strengths: '',
    challenges: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profileManager = getProfileManager();
    const profile = profileManager.createProfile({
      name: formData.name,
      gradeLevel: formData.gradeLevel,
      interests: formData.interests.split(',').map((s) => s.trim()).filter(Boolean),
      learningStyle: formData.learningStyle,
      performanceLevel: formData.performanceLevel,
      strengths: formData.strengths.split(',').map((s) => s.trim()).filter(Boolean),
      challenges: formData.challenges.split(',').map((s) => s.trim()).filter(Boolean),
    });

    onProfileCreated(profile);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🦗</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meet Jiminy!</h1>
        <p className="text-gray-600">
          Your personal virtual teacher. Let's set up your learning profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        {/* Grade Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade Level *
          </label>
          <select
            value={formData.gradeLevel}
            onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Kindergarten</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1}>Grade {i + 1}</option>
            ))}
          </select>
        </div>

        {/* Learning Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Learning Style *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'visual', label: 'Visual', icon: '👁️', desc: 'Learn by seeing' },
              { value: 'auditory', label: 'Auditory', icon: '👂', desc: 'Learn by hearing' },
              { value: 'kinesthetic', label: 'Kinesthetic', icon: '✋', desc: 'Learn by doing' },
              { value: 'reading', label: 'Reading/Writing', icon: '📖', desc: 'Learn by reading' },
            ].map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => setFormData({ ...formData, learningStyle: style.value as any })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.learningStyle === style.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{style.icon}</div>
                <div className="font-medium">{style.label}</div>
                <div className="text-xs text-gray-600">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Performance Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Performance Level *
          </label>
          <div className="flex gap-3">
            {[
              { value: 'below', label: 'Below Grade Level' },
              { value: 'at', label: 'At Grade Level' },
              { value: 'above', label: 'Above Grade Level' },
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, performanceLevel: level.value as any })}
                className={`flex-1 py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                  formData.performanceLevel === level.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interests (comma-separated)
          </label>
          <input
            type="text"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., dinosaurs, space, art, music"
          />
          <p className="text-xs text-gray-500 mt-1">
            Jiminy will relate lessons to your interests!
          </p>
        </div>

        {/* Strengths */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strengths (comma-separated)
          </label>
          <input
            type="text"
            value={formData.strengths}
            onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., reading comprehension, math problem solving"
          />
        </div>

        {/* Challenges */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Areas for Growth (comma-separated)
          </label>
          <input
            type="text"
            value={formData.challenges}
            onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., writing essays, memorization"
          />
          <p className="text-xs text-gray-500 mt-1">
            Jiminy will provide extra support in these areas
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Start Learning with Jiminy!
          </button>
        </div>
      </form>
    </div>
  );
}
