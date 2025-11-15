# Centric Learning Claude Agent - Architecture

## Overview

The Centric Learning Claude Agent is a three-tier application designed to provide AI-powered educational assistance for standards-based learning.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  (Web Browser, CLI, API Clients, Mobile Apps)               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP/REST
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Layer (FastAPI)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Routes (/api/v1/...)                               │   │
│  │  - Standards endpoints                              │   │
│  │  - Lesson planning                                  │   │
│  │  - Assessment                                       │   │
│  │  - Search                                           │   │
│  │  - Chat                                             │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 Service Layer                                │
│  ┌────────────────────┐      ┌─────────────────────────┐   │
│  │ CentricLearning    │      │  StandardsLoader        │   │
│  │ Agent              │◄─────┤  (Data Processing)      │   │
│  │                    │      │                         │   │
│  │ - Claude API       │      │  - Excel parsing        │   │
│  │ - Content gen      │      │  - Caching              │   │
│  │ - Assessment       │      │  - Search               │   │
│  └────────────────────┘      └─────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │ Excel Files │  │ In-Memory    │  │ Anthropic API   │    │
│  │ (.xlsx)     │  │ Cache        │  │ (Claude)        │    │
│  └─────────────┘  └──────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. API Layer (FastAPI)

**Location**: `src/api/routes.py`, `main.py`

**Responsibilities**:
- HTTP request handling
- Input validation (via Pydantic models)
- Response formatting
- Error handling
- CORS management
- API documentation (OpenAPI/Swagger)

**Key Features**:
- RESTful endpoints
- Automatic request/response validation
- Interactive API documentation
- Async request handling

### 2. Service Layer

#### CentricLearningAgent

**Location**: `src/services/claude_agent.py`

**Responsibilities**:
- Claude AI integration
- Prompt engineering
- Response parsing
- Educational content generation
- Student work assessment

**Methods**:
- `generate_lesson_plan()`: Creates comprehensive lesson plans
- `assess_student_work()`: Evaluates student submissions
- `search_standards_ai()`: AI-powered standard search
- `generate_learning_activities()`: Creates learning activities
- `chat()`: General educational Q&A

#### StandardsLoader

**Location**: `src/data_processing/loader.py`

**Responsibilities**:
- Loading standards from Excel files
- Parsing and structuring data
- In-memory caching
- Standard lookups and searches

**Methods**:
- `load_subject_standards()`: Load all standards for a subject
- `get_strand_by_code()`: Retrieve specific standard
- `search_standards()`: Keyword-based search

### 3. Data Layer

#### Data Models

**Location**: `src/models/standards.py`

**Core Models**:
```python
Subject          # Enum: ela, math, science, social_studies
ProficiencyLevel # Enum: level_1, level_2, level_3
StrandPart       # Individual learning standard
Strand           # Collection of related standards
GradeStandards   # All standards for a grade/subject
```

**Request/Response Models**:
```python
LessonPlanRequest
AssessmentRequest
AssessmentResult
StandardsSearchRequest
StandardSearchResult
```

#### Data Storage

**Excel Files**: Structured spreadsheets containing:
- Grade-level sheets
- Strand titles and parts
- Proficiency level descriptions
- Common Core alignments

**In-Memory Cache**: Dictionary-based cache for fast retrieval:
```python
{
    "ela": [GradeStandards, ...],
    "math": [GradeStandards, ...],
    ...
}
```

## Data Flow Examples

### 1. Lesson Plan Generation

```
Client Request
    ↓
POST /api/v1/lesson-plan
    ↓
Route Handler (validates request)
    ↓
CentricLearningAgent.generate_lesson_plan()
    ├─→ StandardsLoader.get_strand_by_code() (for each code)
    │       ↓
    │   Load from cache or Excel
    │       ↓
    │   Return standard details
    │       ↓
    ├─→ Build context from standards
    ├─→ Create prompt for Claude
    ├─→ Call Anthropic API
    │       ↓
    │   Claude generates lesson plan
    │       ↓
    └─→ Return formatted lesson plan
            ↓
Response to client
```

### 2. Student Work Assessment

```
Client Request
    ↓
POST /api/v1/assess
    ↓
Route Handler
    ↓
CentricLearningAgent.assess_student_work()
    ├─→ Get standard details
    ├─→ Build assessment prompt
    ├─→ Call Claude API
    │       ↓
    │   AI analyzes student work
    │       ↓
    ├─→ Parse JSON response
    └─→ Return AssessmentResult
            ↓
Response with:
    - Proficiency level
    - Detailed feedback
    - Strengths
    - Suggestions
```

### 3. Standards Search

```
Client Request
    ↓
POST /api/v1/search
    ↓
Route Handler
    ↓
CentricLearningAgent.search_standards_ai()
    ├─→ StandardsLoader.search_standards()
    │       ↓
    │   Keyword search in cache
    │       ↓
    │   Return raw results
    │       ↓
    ├─→ Send to Claude for AI ranking
    │       ↓
    │   Claude analyzes relevance
    │       ↓
    └─→ Return ranked results
            ↓
Response with scored results
```

## Technology Stack

### Backend
- **FastAPI**: Modern web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation

### AI Integration
- **Anthropic SDK**: Claude API client
- **Claude Sonnet 4.5**: AI model

### Data Processing
- **OpenPyXL**: Excel file handling
- **Python standard library**: Data structures

### Development
- **pytest**: Testing framework
- **mypy**: Type checking
- **black**: Code formatting

## Security Considerations

### API Key Management
- Stored in environment variables
- Never exposed in responses
- Not committed to version control

### Input Validation
- All requests validated via Pydantic
- Type checking enforced
- Sanitization of user inputs

### CORS Configuration
- Configurable allowed origins
- Credential handling
- Method restrictions

## Performance Optimizations

### Caching
- Standards cached in memory after first load
- No repeated file I/O for same data
- Cache invalidation on restart

### Async Operations
- FastAPI async endpoints
- Non-blocking I/O
- Concurrent request handling

### Response Time
- Standards lookup: <10ms (cached)
- AI generation: 2-5 seconds
- Search: 3-6 seconds

## Scalability

### Current Design
- Single-process application
- In-memory data storage
- Stateless API endpoints

### Scaling Options

**Horizontal Scaling**:
- Deploy multiple instances
- Load balancer distribution
- Shared cache (Redis)

**Vertical Scaling**:
- Increase compute resources
- Handle more concurrent requests
- Larger cache capacity

**Database Integration**:
- Move standards to PostgreSQL
- Enable advanced queries
- Support larger datasets

## Error Handling

### Error Types
1. **Validation Errors**: Pydantic catches invalid inputs
2. **Not Found**: Standard codes don't exist
3. **API Errors**: Anthropic API issues
4. **File Errors**: Missing Excel files

### Error Responses
```json
{
    "detail": "Error description",
    "status_code": 404
}
```

## Monitoring and Logging

### Logging Points
- API request/response
- Claude API calls
- Data loading events
- Error occurrences

### Metrics to Track
- Request volume
- Response times
- Error rates
- Cache hit rates
- AI token usage

## Future Architecture Enhancements

### Planned Improvements
1. **Database Layer**: PostgreSQL for standards
2. **Caching Layer**: Redis for distributed caching
3. **Message Queue**: Celery for long-running tasks
4. **Authentication**: JWT-based user auth
5. **Frontend**: React-based web interface
6. **Analytics**: User behavior tracking
7. **Rate Limiting**: API usage controls

### Microservices Potential
- Standards Service
- AI Content Generation Service
- Assessment Service
- User Management Service
- Analytics Service

## Development Workflow

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python main.py

# Run tests
pytest tests/

# Use CLI
python cli.py --help
```

### Testing Strategy
- Unit tests for loaders
- Integration tests for API
- Mock Claude API for tests
- Fixture-based test data

### Deployment
- Environment-based configuration
- Health check endpoints
- Graceful shutdown
- Docker containerization (planned)

## Configuration Management

### Environment Variables
```
ANTHROPIC_API_KEY     # Required
HOST                  # Default: 0.0.0.0
PORT                  # Default: 8000
DEBUG                 # Default: false
DATA_DIRECTORY        # Default: extracted_data
```

### Settings Class
- Pydantic Settings for type safety
- .env file support
- Validation on startup

## Conclusion

This architecture provides:
- ✓ Clear separation of concerns
- ✓ Easy testing and maintenance
- ✓ Scalability options
- ✓ Security best practices
- ✓ Fast performance
- ✓ Extensibility for future features

The modular design allows for independent development and testing of components while maintaining a cohesive system.
