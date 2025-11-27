import express from 'express';
import { generateLessonPlan } from '../services/lessonGenerator.js';

const router = express.Router();

/**
 * POST /api/lessons/generate
 * Generate a new lesson plan
 */
router.post('/generate', async (req, res) => {
  try {
    const { grade, subject, week, interests } = req.body;

    // Validation
    if (!grade || !subject || !week) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['grade', 'subject', 'week']
      });
    }

    // Validate week range
    const weekNum = parseInt(week);
    if (isNaN(weekNum) || weekNum < 1 || weekNum > 36) {
      return res.status(400).json({
        error: 'Week must be between 1 and 36'
      });
    }

    // Parse interests
    const interestsArray = Array.isArray(interests)
      ? interests
      : typeof interests === 'string'
        ? interests.split(',').map(i => i.trim()).filter(i => i)
        : [];

    console.log(`📝 Generating lesson: Grade ${grade}, ${subject}, Week ${weekNum}`);

    // Generate lesson plan
    const lessonPlan = await generateLessonPlan({
      grade,
      subject,
      week: weekNum,
      interests: interestsArray
    });

    res.json({
      success: true,
      lesson: lessonPlan
    });

  } catch (error) {
    console.error('Error generating lesson:', error);
    res.status(500).json({
      error: 'Failed to generate lesson plan',
      message: error.message
    });
  }
});

/**
 * GET /api/lessons/demo
 * Get a demo lesson plan
 */
router.get('/demo', async (req, res) => {
  try {
    const demoLesson = await generateLessonPlan({
      grade: 'K',
      subject: 'Mathematics',
      week: 1,
      interests: ['dinosaurs', 'building blocks']
    });

    res.json({
      success: true,
      message: 'This is a demo lesson plan',
      lesson: demoLesson
    });
  } catch (error) {
    console.error('Error generating demo:', error);
    res.status(500).json({
      error: 'Failed to generate demo lesson',
      message: error.message
    });
  }
});

export default router;
