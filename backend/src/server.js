import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { initializeDatabase } from './config/database.js';

// Import routes
// import authRoutes from './routes/auth.js';
import lessonRoutes from './routes/lessons.js';
import teksRoutes from './routes/teks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Homeschool Lesson Builder API is running' });
});

// API routes
// app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/teks', teksRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Homeschool Lesson Builder API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      lessons: '/api/lessons',
      teks: '/api/teks'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    if (process.env.DB_PASSWORD) {
      await initializeDatabase();
    } else {
      console.log('⚠️  Database not configured, running without persistence');
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
