# 🦗 Jiminy - Virtual Teacher for Texas Homeschool

An AI-powered virtual teacher agent that guides students through the Texas homeschool curriculum, acting like Jiminy Cricket to provide personalized teaching, lectures, and assessments.

## Features

### 🎯 Personalized Learning Experience
- **Student Profiles**: Create detailed profiles with learning styles, interests, and performance levels
- **Adaptive Teaching**: Jiminy adjusts explanations based on student comprehension
- **Differentiated Instruction**: Content tailored to below/at/above grade level performance
- **Interest Integration**: Lessons relate to student interests (dinosaurs, space, art, etc.)

### 🔊 Voice-Enabled Teaching
- **Text-to-Speech**: Jiminy speaks lectures and important guidance aloud
- **Interactive Lectures**: Engaging presentations with questions and real-world examples
- **Voice Controls**: Pause, resume, or stop speech at any time
- **Natural Conversation**: Chat-like interface for asking questions

### 📚 Texas TEKS Curriculum
- **Complete Standards Coverage**: All Texas Essential Knowledge and Skills (TEKS)
- **12 Subject Areas**: Math, Science, English, Social Studies, and more
- **Grade K-12**: Full curriculum from Kindergarten through High School
- **Standards-Aligned**: Every lesson maps to specific TEKS standards

### 📝 Intelligent Assessment
- **Differentiated Assessments**: Difficulty adjusted to student performance level
- **Multiple Formats**: Quizzes, assignments, projects, discussions
- **AI Grading**: Automated feedback on student work
- **Detailed Feedback**: Specific, actionable, and encouraging comments
- **Progress Tracking**: Monitor completed lessons and assessment history

### 🤖 Claude AI-Powered
- **Context-Aware**: Jiminy remembers the full conversation and lesson context
- **Curriculum Expert**: Deep knowledge of all TEKS standards
- **Encouraging Guide**: Supportive, patient, and positive teaching style
- **Growth Focused**: Emphasizes improvement and effort over perfection

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. **Clone and navigate to the project**:
   ```bash
   cd virtual-teacher
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Guide

### 1. Create a Student Profile
- Enter student name and grade level
- Select learning style (visual, auditory, kinesthetic, or reading/writing)
- Specify current performance level (below/at/above grade level)
- Add interests, strengths, and areas for growth

### 2. Choose a Subject and Topic
- Select from 11+ subject areas aligned with Texas TEKS
- Pick a specific topic or lesson to begin
- Jiminy will introduce the lesson based on the student's profile

### 3. Learn with Jiminy
- **Listen to lectures**: Jiminy explains concepts with voice
- **Ask questions**: Type questions anytime during the lesson
- **Interactive learning**: Jiminy checks understanding and adapts
- **Get guidance**: Receive encouragement and support throughout

### 4. Complete Assessments
- Request a quiz, assignment, or project
- Receive differentiated assessments based on your level
- Submit work for AI grading and feedback
- Review detailed feedback to improve

## Project Structure

```
virtual-teacher/
├── app/                      # Next.js app directory
│   ├── api/teacher/         # Claude AI API routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main application page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── TeacherChat.tsx      # Main chat interface with Jiminy
│   ├── StudentProfileSetup.tsx  # Profile creation form
│   └── LessonSelector.tsx   # Subject and topic selection
├── lib/                     # Core logic
│   ├── virtualTeacher.ts    # Claude AI teacher implementation
│   ├── curriculum.ts        # TEKS curriculum management
│   ├── studentProfile.ts    # Profile and progress tracking
│   └── voiceService.ts      # Text-to-speech functionality
├── types/                   # TypeScript type definitions
│   └── index.ts            # All type definitions
└── package.json            # Dependencies and scripts
```

## Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Anthropic Claude**: AI-powered teaching agent
- **Web Speech API**: Browser-native text-to-speech
- **Local Storage**: Client-side data persistence

## Virtual Teacher Capabilities

### Teaching Functions
- Generate engaging lesson introductions
- Deliver comprehensive lectures
- Answer student questions in real-time
- Provide guided practice
- Check for understanding
- Adapt explanations based on student feedback

### Assessment Functions
- Create differentiated quizzes and assignments
- Grade submitted work with rubrics
- Provide detailed, constructive feedback
- Track student progress over time
- Adjust difficulty based on performance

### Personalization
- Learning style adaptation (visual, auditory, kinesthetic, reading)
- Performance level differentiation (below/at/above grade level)
- Interest-based examples and analogies
- Strength building and challenge support
- Growth mindset encouragement

## Extending the Application

### Adding Real TEKS Data
The curriculum manager (`lib/curriculum.ts`) currently uses sample data. To integrate actual TEKS standards:

1. Extract the CSV files from the parent directory's zip archives
2. Parse CSV files using the PapaParse library
3. Update `CurriculumManager.loadTEKSData()` to load real standards
4. Map standards to grade levels and subjects

### Adding File Upload for Grading
To enable students to upload assignments:

1. Add file input to the chat interface
2. Use Next.js API route to handle file uploads
3. Pass file content to `VirtualTeacher.gradeAssignment()`
4. Display graded results with feedback

### Database Integration
Replace localStorage with a database:

1. Set up Postgres/MongoDB
2. Update `StudentProfileManager` to use database queries
3. Store conversation history for session persistence
4. Track long-term progress and analytics

### Premium Voice (ElevenLabs)
For higher quality voice:

1. Sign up for ElevenLabs API
2. Add API key to `.env.local`
3. Update `voiceService.ts` to use ElevenLabs
4. Choose voice characteristics (age, tone, accent)

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables
- `ANTHROPIC_API_KEY` - Required for Claude AI
- `ELEVENLABS_API_KEY` - Optional for premium voice

## Architecture Decisions

### Why Claude AI?
- Long context window for full lesson retention
- Excellent at educational explanations
- Follows complex system prompts reliably
- Safe and appropriate for K-12 content

### Why Local Storage?
- Quick MVP deployment without infrastructure
- Works offline after initial load
- Easy migration path to database later
- Privacy-friendly (data stays on device)

### Why Web Speech API?
- No additional costs or API calls
- Works in all modern browsers
- Instant response (no network latency)
- Upgradeable to premium service if needed

## Future Enhancements

- [ ] Multi-student profiles with easy switching
- [ ] Parent dashboard for progress monitoring
- [ ] Lesson plans and scope & sequence
- [ ] Integration with actual Texas TEKS CSV data
- [ ] File upload for assignment submission
- [ ] Database backend for persistent storage
- [ ] Mobile app (React Native)
- [ ] Gamification and achievement badges
- [ ] Video explanations (AI-generated)
- [ ] Collaborative learning (multiple students)
- [ ] Parent/teacher override and customization
- [ ] Standards-based grade reporting

## License

MIT License - See parent repository for details

## Support

For issues or questions:
1. Check the documentation above
2. Review the code comments
3. Open an issue in the GitHub repository

---

Built with ❤️ for Texas homeschool families
