# 📚 Homeschool Lesson Builder - Texas Edition

A comprehensive web application that generates complete, ready-to-use lesson plans for Texas homeschool families, aligned with Texas Essential Knowledge and Skills (TEKS) standards.

## 🌟 Features

- **TEKS-Aligned Curriculum**: All lesson plans are aligned with official Texas state standards
- **5-Day Weekly Plans**: Complete week-long lesson plans broken down into daily activities
- **Dual Output Versions**:
  - Parent version with detailed instructions and standards
  - Kid-friendly version with simple, engaging language
- **Open Educational Resources**: All materials are freely available online without login requirements
- **Interest-Based Learning**: Customize lessons based on student interests
- **Pacing Guide Integration**: Texas PEIMS-based weekly pacing for 36-week school year
- **Print-Ready**: One-page lesson plans ready to print
- **No Copyrighted Materials**: Uses only open educational resources

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js 18+
- Express.js
- PostgreSQL (optional for user management)
- Texas TEKS data (CSV to JSON)

**Frontend:**
- React 18
- Vite
- Axios
- Responsive CSS

### Project Structure

```
Centric-App/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   │   ├── lessonGenerator.js   # Core lesson generation
│   │   │   ├── teksService.js       # TEKS data access
│   │   │   ├── pacingGuide.js       # Week-by-week pacing
│   │   │   └── resourceFinder.js    # OER resource links
│   │   └── server.js
│   ├── data/
│   │   └── teks/            # Parsed TEKS JSON files
│   └── scripts/
│       └── parseTEKS.js     # CSV to JSON parser
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LessonForm.jsx      # Input form
│   │   │   └── LessonDisplay.jsx   # Lesson output
│   │   ├── App.jsx
│   │   └── App.css
│   └── index.html
└── state-standards/         # Raw TEKS CSV data
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/blackandyellowenterprise/Centric-App.git
   cd Centric-App
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Parse TEKS data:**
   ```bash
   npm run parse-teks
   ```

4. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:3000`

2. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📖 Usage

### Generating a Lesson Plan

1. Select your child's **grade level** (K-12)
2. Choose the **subject** (Mathematics, Science, ELA, Social Studies, etc.)
3. Enter the **week number** (1-36) of your school year
4. Add **student interests** (optional, comma-separated)
5. Click **Generate Lesson Plan**

### Viewing the Lesson

- Toggle between **Parent Version** and **Kid Version**
- Print the lesson for easy reference
- Access all linked resources (videos, reading, games, worksheets)

### Example Lesson Plan Includes:

**Parent Version:**
- Learning objective in parent-friendly language
- TEKS code and standard summary
- 5-day breakdown with:
  - Teacher instructions for each day
  - Kid-facing instructions
  - Reading material links
  - Video links (Khan Academy, PBS, etc.)
  - Worksheet suggestions
  - Digital games
  - Offline activities

**Kid Version:**
- Simple, engaging title
- Kid-friendly learning objective
- Daily "What You'll Do" instructions
- Fun activity highlights

## 🎯 API Endpoints

### Lessons

- `POST /api/lessons/generate` - Generate a new lesson plan
  ```json
  {
    "grade": "K",
    "subject": "Mathematics",
    "week": 1,
    "interests": "dinosaurs, building blocks"
  }
  ```

- `GET /api/lessons/demo` - Get a demo lesson plan

### TEKS Data

- `GET /api/teks/subjects` - List available subjects
- `GET /api/teks/grades` - List grade levels
- `GET /api/teks/:subject/:grade` - Get TEKS for specific subject/grade
- `GET /api/teks/search?q=keyword` - Search TEKS standards

## 🎨 Subjects Supported

- Mathematics
- Science
- English Language Arts
- Social Studies
- Fine Arts
- Physical Education
- Health Education
- Technology Applications

## 📚 Open Educational Resources Used

The application curates links from trusted OER sources:

- **Khan Academy** - Videos and practice exercises
- **PBS LearningMedia** - Educational videos
- **CK-12 Foundation** - Free textbooks and materials
- **OpenStax** - College-quality textbooks
- **ReadWorks** - Reading passages
- **Math Playground** - Interactive math games
- **FunBrain** - Educational games
- **NASA Education** - Space and science resources
- **National Geographic Kids** - Science and geography
- **Smithsonian Learning Lab** - Museum resources

## 🔮 Future Enhancements

- [ ] User authentication and lesson history
- [ ] Subscription payment integration (Stripe)
- [ ] PDF export functionality
- [ ] Multi-state support (expand beyond Texas)
- [ ] AI-powered lesson personalization
- [ ] Progress tracking and reporting
- [ ] Mobile app (React Native)
- [ ] Printable worksheet generation
- [ ] Parent community features

## 🛡️ License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Texas Education Agency for TEKS standards
- All open educational resource providers
- The homeschool community for inspiration and feedback

---

**Built with ❤️ for Texas Homeschool Families**