import React, { useState } from 'react';
import LessonForm from './components/LessonForm';
import LessonDisplay from './components/LessonDisplay';
import './App.css';

function App() {
  const [lessonPlan, setLessonPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLessonGenerated = (lesson) => {
    setLessonPlan(lesson);
    setError(null);
  };

  const handleError = (err) => {
    setError(err);
    setLessonPlan(null);
  };

  const handleReset = () => {
    setLessonPlan(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>📚 Homeschool Lesson Builder</h1>
          <p className="subtitle">Texas TEKS-Aligned Lesson Plans for Your Homeschool</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {!lessonPlan ? (
            <>
              <div className="welcome-section">
                <h2>Welcome, Texas Homeschool Parents!</h2>
                <p>
                  Generate complete, ready-to-use lesson plans aligned with Texas Essential
                  Knowledge and Skills (TEKS). Just enter your child's grade, subject,
                  the week of the school year, and their interests.
                </p>
                <div className="features">
                  <div className="feature">
                    <span className="feature-icon">✅</span>
                    <span>TEKS-Aligned Standards</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📖</span>
                    <span>5-Day Weekly Plans</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🎮</span>
                    <span>Free Online Resources</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">👨‍👩‍👧</span>
                    <span>Parent & Kid Versions</span>
                  </div>
                </div>
              </div>

              <LessonForm
                onLessonGenerated={handleLessonGenerated}
                onError={handleError}
                loading={loading}
                setLoading={setLoading}
              />

              {error && (
                <div className="error-message">
                  <h3>Oops! Something went wrong</h3>
                  <p>{error}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <button className="button button-secondary" onClick={handleReset}>
                ← Generate Another Lesson
              </button>
              <LessonDisplay lesson={lessonPlan} />
            </>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 Homeschool Lesson Builder. Empowering Texas Homeschool Families.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
