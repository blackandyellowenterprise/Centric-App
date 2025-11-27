import express from 'express';
import { getSubjects, getGradeLevels, getTEKS, searchTEKS } from '../services/teksService.js';

const router = express.Router();

/**
 * GET /api/teks/subjects
 * Get list of available subjects
 */
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await getSubjects();
    res.json({
      success: true,
      subjects
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch subjects',
      message: error.message
    });
  }
});

/**
 * GET /api/teks/grades
 * Get list of available grade levels
 */
router.get('/grades', async (req, res) => {
  try {
    const grades = await getGradeLevels();
    res.json({
      success: true,
      grades
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch grade levels',
      message: error.message
    });
  }
});

/**
 * GET /api/teks/:subject/:grade
 * Get TEKS standards for specific subject and grade
 */
router.get('/:subject/:grade', async (req, res) => {
  try {
    const { subject, grade } = req.params;

    const teks = await getTEKS(subject, grade);

    if (!teks) {
      return res.status(404).json({
        error: 'TEKS not found',
        message: `No standards found for ${subject} Grade ${grade}`
      });
    }

    res.json({
      success: true,
      subject,
      grade,
      teks
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch TEKS',
      message: error.message
    });
  }
});

/**
 * GET /api/teks/search?q=keyword&subject=Math&grade=5
 * Search TEKS standards
 */
router.get('/search', async (req, res) => {
  try {
    const { q, subject, grade } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Search query required',
        message: 'Please provide a search query with ?q=keyword'
      });
    }

    const results = await searchTEKS(q, subject, grade);

    res.json({
      success: true,
      query: q,
      count: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
});

export default router;
