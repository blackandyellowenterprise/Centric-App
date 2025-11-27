# Homeschool Lesson Builder - Architecture

## Overview
The Homeschool Lesson Builder is a subscription-based web application that generates comprehensive, ready-to-use lesson plans for Texas homeschool families.

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (for user data, subscription management)
- **File Storage**: JSON files for TEKS data (lightweight, fast access)
- **AI Integration**: OpenAI API / Anthropic Claude for lesson generation
- **Authentication**: JWT with bcrypt
- **Payment**: Stripe API for subscriptions

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Library**: Tailwind CSS
- **State Management**: React Context API / Zustand
- **PDF Generation**: jsPDF / react-pdf
- **Routing**: React Router v6

### Data Processing
- **CSV Parsing**: Papa Parse
- **TEKS Data**: Structured JSON derived from CSV files
- **Pacing Guides**: Texas PEIMS-based week-by-week curriculum mapping

## Application Structure

```
Centric-App/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, validation, etc.
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   │   ├── teksParser.js
│   │   │   ├── lessonGenerator.js
│   │   │   ├── resourceFinder.js
│   │   │   └── pacingGuide.js
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Main entry point
│   ├── data/
│   │   ├── teks/           # Parsed TEKS JSON
│   │   ├── pacing/         # Week-by-week pacing guides
│   │   └── resources/      # OER resource links
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LessonForm/       # Input form
│   │   │   ├── LessonPlan/       # Output display
│   │   │   ├── KidVersion/       # Kid-friendly view
│   │   │   └── PDFExport/        # PDF generation
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LessonBuilder.tsx
│   │   │   └── Auth/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── state-standards/         # Extracted TEKS data
├── docs/                    # Documentation
└── README.md
```

## Core Features

### 1. Lesson Plan Generation
**Input:**
- Grade level (K-12)
- Subject (Math, Science, ELA, Social Studies, etc.)
- Week of the year (1-36)
- Student interests (comma-separated)

**Output:**
- Learning objective (parent-friendly)
- TEKS code and summary
- 5-day lesson breakdown with:
  - Teacher instructions
  - Kid-facing instructions
  - Reading links (open access)
  - Video links (open access)
  - Worksheet/PDF suggestions
  - Digital games
  - Offline activities

### 2. TEKS Integration
- Parse CSV files into structured JSON
- Map standards to grade levels and subjects
- Connect TEKS to weekly pacing guides

### 3. Open Educational Resources (OER)
- Khan Academy links
- CK-12 Foundation
- OpenStax
- PBS LearningMedia
- NASA Education
- National Geographic Kids
- Smithsonian Learning Lab
- Library of Congress resources

### 4. Dual Output Versions
- **Parent Version**: Detailed instructions, objectives, standards
- **Kid Version**: Simple, engaging, age-appropriate language

### 5. Subscription System
- User registration and login
- Monthly subscription via Stripe
- Access control to lesson generation

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Lesson Generation
- `POST /api/lessons/generate` - Generate lesson plan
- `GET /api/lessons/:id` - Get saved lesson
- `GET /api/lessons/user` - Get user's lesson history
- `POST /api/lessons/save` - Save generated lesson

### TEKS Data
- `GET /api/teks/subjects` - Get available subjects
- `GET /api/teks/grades` - Get grade levels
- `GET /api/teks/:subject/:grade` - Get TEKS for subject/grade

### Resources
- `GET /api/resources/search` - Search OER resources
- `GET /api/resources/by-topic` - Get resources by topic

## Deployment

### Development
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

### Production
- **Hosting**: Vercel (frontend) + Railway/Render (backend)
- **Database**: PostgreSQL on Railway/Supabase
- **CDN**: Cloudflare for static assets
- **Environment Variables**: Secure storage of API keys

## Security Considerations
- JWT tokens with secure httpOnly cookies
- Password hashing with bcrypt
- API rate limiting
- Input validation and sanitization
- CORS configuration
- Environment variable protection
- SQL injection prevention
- XSS protection

## Future Enhancements
- Multi-state support (expand beyond Texas)
- Mobile app (React Native)
- Printable worksheet generation
- Progress tracking and reporting
- Parent community features
- Integration with learning management systems
- AI-powered personalization based on student performance
