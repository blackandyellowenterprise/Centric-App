import React, { useState } from 'react';
import axios from 'axios';

const GRADES = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const SUBJECTS = [
  'Mathematics',
  'Science',
  'English Language Arts',
  'Social Studies',
  'Fine Arts',
  'Physical Education',
  'Health Education',
  'Technology Applications'
];

function LessonForm({ onLessonGenerated, onError, loading, setLoading }) {
  const [formData, setFormData] = useState({
    grade: 'K',
    subject: 'Mathematics',
    week: '1',
    interests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onError(null);

    try {
      const response = await axios.post('/api/lessons/generate', {
        grade: formData.grade,
        subject: formData.subject,
        week: parseInt(formData.week),
        interests: formData.interests
      });

      if (response.data.success) {
        onLessonGenerated(response.data.lesson);
      } else {
        onError('Failed to generate lesson plan. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      onError(
        error.response?.data?.message ||
        error.message ||
        'Unable to generate lesson. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lesson-form">
      <h2>Generate Your Lesson Plan</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="grade">Grade Level *</label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          >
            {GRADES.map(grade => (
              <option key={grade} value={grade}>
                {grade === 'K' ? 'Kindergarten' : `Grade ${grade}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="week">Week of Year (1-36) *</label>
          <input
            type="number"
            id="week"
            name="week"
            min="1"
            max="36"
            value={formData.week}
            onChange={handleChange}
            required
          />
          <small>Enter the current week of your school year</small>
        </div>

        <div className="form-group">
          <label htmlFor="interests">Student Interests (Optional)</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="e.g., dinosaurs, space, sports, art"
          />
          <small>Separate multiple interests with commas</small>
        </div>

        <button
          type="submit"
          className="button button-primary"
          disabled={loading}
        >
          {loading ? '✨ Generating Your Lesson...' : '🚀 Generate Lesson Plan'}
        </button>
      </form>
    </div>
  );
}

export default LessonForm;
