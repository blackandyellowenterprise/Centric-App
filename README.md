# Centric Learning Claude Code Agent

An AI-powered educational assistant built with Claude AI to support standards-based learning, lesson planning, and student assessment.

## Features

🎓 **Standards-Based Learning**
- Comprehensive coverage of ELA, Math, Science, and Social Studies standards
- Aligned with Common Core and state standards
- Three-tiered proficiency levels for differentiated instruction

🤖 **AI-Powered Capabilities**
- Generate detailed lesson plans aligned to specific standards
- Assess student work and provide constructive feedback
- Create engaging learning activities for different proficiency levels
- Natural language search for educational standards
- Interactive chat for educational questions

📊 **Subject Coverage**
- English Language Arts (Grades 6-12)
- Mathematics (Multiple grade levels)
- Science (Multiple grade levels)
- Social Studies (Multiple grade levels)

## Quick Start

### Prerequisites

- Python 3.11 or higher
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Centric-App
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Extract the standards data:
```bash
unzip "Centric Courses Strand.zip" -d extracted_data
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### Running the Application

**Start the API server:**
```bash
python main.py
```

The API will be available at `http://localhost:8000`

**Access the documentation:**
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Standards Management

- `GET /api/v1/standards/{subject}` - Get all standards for a subject
- `GET /api/v1/standard/{code}` - Get a specific standard by code
- `GET /api/v1/subjects` - List all available subjects
- `GET /api/v1/grades` - List all available grades

### AI-Powered Features

- `POST /api/v1/search` - Search standards with natural language
- `POST /api/v1/lesson-plan` - Generate a lesson plan
- `POST /api/v1/assess` - Assess student work
- `GET /api/v1/activities/{code}/{level}` - Generate learning activities
- `POST /api/v1/chat` - Chat with the educational AI assistant

## Usage Examples

### Generate a Lesson Plan

```bash
curl -X POST "http://localhost:8000/api/v1/lesson-plan" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "ela",
    "grade": 6,
    "strand_codes": ["ELA06.RLa", "ELA06.RLb"],
    "duration_minutes": 45,
    "additional_context": "Focus on analyzing character development"
  }'
```

### Assess Student Work

```bash
curl -X POST "http://localhost:8000/api/v1/assess" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "ela",
    "grade": 6,
    "strand_code": "ELA06.RLa",
    "student_work": "The main character shows bravery when..."
  }'
```

### Search Standards

```bash
curl -X POST "http://localhost:8000/api/v1/search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "analyzing themes in literature",
    "subject": "ela",
    "grade": 6,
    "limit": 5
  }'
```

### Generate Learning Activities

```bash
curl "http://localhost:8000/api/v1/activities/ELA06.RLa/level_2"
```

## Project Structure

```
Centric-App/
├── src/
│   ├── models/           # Pydantic data models
│   │   └── standards.py
│   ├── services/         # Business logic and AI services
│   │   └── claude_agent.py
│   ├── api/             # FastAPI routes
│   │   └── routes.py
│   ├── data_processing/ # Data loading and processing
│   │   └── loader.py
│   └── utils/           # Utilities and configuration
│       └── config.py
├── extracted_data/      # Extracted standards Excel files
├── tests/              # Test files
├── main.py            # Application entry point
├── requirements.txt   # Python dependencies
└── README.md         # This file
```

## Data Models

### Subjects
- `ela` - English Language Arts
- `math` - Mathematics
- `science` - Science
- `social_studies` - Social Studies

### Proficiency Levels
- `level_1` - Beginning proficiency
- `level_2` - Intermediate proficiency
- `level_3` - Advanced proficiency

### Standard Structure
Each standard includes:
- Unique code identifier
- Subject and grade level
- Three proficiency level descriptions
- Common Core alignment
- Strand categorization

## Configuration

Configure the application through environment variables in `.env`:

```env
ANTHROPIC_API_KEY=your_api_key_here
HOST=0.0.0.0
PORT=8000
DEBUG=false
DATA_DIRECTORY=extracted_data
```

## Development

### Running Tests
```bash
pytest tests/
```

### Code Quality
```bash
# Format code
black src/

# Lint code
flake8 src/

# Type checking
mypy src/
```

## Architecture

The Centric Learning Agent uses a three-tier architecture:

1. **Data Layer**: Excel-based standards loaded and cached in memory
2. **Service Layer**: Claude AI integration for intelligent content generation
3. **API Layer**: RESTful FastAPI endpoints for client interaction

### Key Components

- **StandardsLoader**: Loads and parses educational standards from Excel files
- **CentricLearningAgent**: Claude AI-powered agent for educational tasks
- **FastAPI Routes**: HTTP endpoints for all functionality

## Technologies

- **FastAPI**: Modern, fast web framework for building APIs
- **Anthropic Claude**: Advanced AI model for educational content
- **Pydantic**: Data validation and settings management
- **OpenPyXL**: Excel file processing
- **Uvicorn**: ASGI server for FastAPI

## Performance

- Standards are cached in memory for fast retrieval
- AI responses typically complete in 2-5 seconds
- Supports concurrent requests
- Scalable architecture

## Security

- API key stored securely in environment variables
- CORS configured for controlled access
- Input validation with Pydantic models
- No sensitive data stored in responses

## Roadmap

- [ ] Add user authentication and authorization
- [ ] Implement response caching for common queries
- [ ] Add support for more subjects and grade levels
- [ ] Create a web-based frontend
- [ ] Add export functionality for lesson plans
- [ ] Implement student progress tracking
- [ ] Add multi-language support

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

See the LICENSE file for details.

## Support

For questions or issues:
- Open an issue on GitHub
- Contact the Centric Learning team

## Acknowledgments

- Built with Claude AI by Anthropic
- Educational standards from Common Core and state frameworks
- FastAPI framework by Sebastián Ramírez

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Maintainer**: Centric Learning Team
