import React, { useState } from 'react';

function LessonDisplay({ lesson }) {
  const [viewMode, setViewMode] = useState('parent');

  if (!lesson) return null;

  const { parent, kid } = lesson;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="lesson-display">
      <div className="lesson-header">
        <h2>Your Lesson Plan is Ready!</h2>

        <div className="lesson-actions">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'parent' ? 'active' : ''}`}
              onClick={() => setViewMode('parent')}
            >
              👨‍👩‍👧 Parent Version
            </button>
            <button
              className={`toggle-btn ${viewMode === 'kid' ? 'active' : ''}`}
              onClick={() => setViewMode('kid')}
            >
              🧒 Kid Version
            </button>
          </div>

          <button className="button button-secondary" onClick={handlePrint}>
            🖨️ Print Lesson
          </button>
        </div>
      </div>

      {viewMode === 'parent' ? (
        <ParentVersion parent={parent} />
      ) : (
        <KidVersion kid={kid} />
      )}
    </div>
  );
}

function ParentVersion({ parent }) {
  return (
    <div className="parent-version">
      <div className="lesson-metadata">
        <div className="metadata-item">
          <strong>Grade:</strong> {parent.metadata.grade === 'K' ? 'Kindergarten' : `Grade ${parent.metadata.grade}`}
        </div>
        <div className="metadata-item">
          <strong>Subject:</strong> {parent.metadata.subject}
        </div>
        <div className="metadata-item">
          <strong>Week:</strong> {parent.metadata.week}
        </div>
        <div className="metadata-item">
          <strong>Topic:</strong> {parent.metadata.weekTopic}
        </div>
      </div>

      <section className="lesson-section">
        <h3>📋 Learning Objective</h3>
        <p className="objective">{parent.learningObjective}</p>
      </section>

      <section className="lesson-section teks-section">
        <h3>📜 Texas TEKS Standard</h3>
        <div className="teks-code">
          <strong>Code:</strong> {parent.teks.code}
        </div>
        <p className="teks-summary">{parent.teks.summary}</p>
      </section>

      <section className="lesson-section">
        <h3>📅 Weekly Plan (5 Days)</h3>

        {parent.weeklyPlan.map((day, index) => (
          <div key={index} className="day-plan">
            <h4>{day.day}</h4>

            <div className="day-content">
              <div className="instructions-section">
                <h5>👨‍🏫 Teacher Instructions:</h5>
                <p>{day.teacherInstructions}</p>
              </div>

              <div className="instructions-section">
                <h5>🧒 Kid Instructions:</h5>
                <p>{day.kidInstructions}</p>
              </div>

              <div className="resources-section">
                <h5>📚 Resources for Today:</h5>

                {day.resources.reading.length > 0 && (
                  <div className="resource-group">
                    <h6>📖 Reading Materials:</h6>
                    <ul>
                      {day.resources.reading.map((item, i) => (
                        <li key={i}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                          {item.description && <p className="resource-desc">{item.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.resources.videos.length > 0 && (
                  <div className="resource-group">
                    <h6>🎥 Videos:</h6>
                    <ul>
                      {day.resources.videos.map((item, i) => (
                        <li key={i}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                          {item.duration && <span className="duration"> ({item.duration})</span>}
                          {item.description && <p className="resource-desc">{item.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.resources.worksheets.length > 0 && (
                  <div className="resource-group">
                    <h6>📝 Worksheets:</h6>
                    <ul>
                      {day.resources.worksheets.map((item, i) => (
                        <li key={i}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                          {item.description && <p className="resource-desc">{item.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.resources.games.length > 0 && (
                  <div className="resource-group">
                    <h6>🎮 Digital Games:</h6>
                    <ul>
                      {day.resources.games.map((item, i) => (
                        <li key={i}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                          {item.description && <p className="resource-desc">{item.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {day.resources.offlineActivities.length > 0 && (
                  <div className="resource-group">
                    <h6>🎨 Offline Activities:</h6>
                    <ul>
                      {day.resources.offlineActivities.map((item, i) => (
                        <li key={i}>
                          <strong>{item.title}</strong>
                          {item.description && <p className="resource-desc">{item.description}</p>}
                          {item.materials && (
                            <p className="materials">
                              <em>Materials needed:</em> {item.materials.join(', ')}
                            </p>
                          )}
                          {item.duration && (
                            <p className="duration-info">
                              <em>Duration:</em> {item.duration}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function KidVersion({ kid }) {
  return (
    <div className="kid-version">
      <h2 className="kid-title">{kid.title}</h2>

      <section className="kid-section">
        <h3>🎯 What You'll Learn This Week</h3>
        <p className="kid-objective">{kid.objective}</p>
      </section>

      <section className="kid-section">
        <h3>📅 Your Week</h3>

        {kid.days.map((day, index) => (
          <div key={index} className="kid-day">
            <h4>{day.day}</h4>
            <p className="kid-instructions">{day.whatYoullDo}</p>
            {day.fun && (
              <p className="kid-fun">
                <strong>Fun stuff today:</strong> {day.fun}
              </p>
            )}
          </div>
        ))}
      </section>

      <div className="kid-encouragement">
        <p>You've got this! Have an amazing week of learning!</p>
      </div>
    </div>
  );
}

export default LessonDisplay;
