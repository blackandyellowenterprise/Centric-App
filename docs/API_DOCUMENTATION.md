# API Documentation

Base URL: `http://localhost:3000/api`

## Table of Contents

- [Lesson Generation](#lesson-generation)
- [TEKS Standards](#teks-standards)
- [Error Handling](#error-handling)

## Lesson Generation

### Generate Lesson Plan

Generate a complete, ready-to-use lesson plan.

**Endpoint:** `POST /api/lessons/generate`

**Request Body:**
```json
{
  "grade": "K",
  "subject": "Mathematics",
  "week": 1,
  "interests": "dinosaurs, space"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| grade | string | Yes | Grade level: K, 1-12 |
| subject | string | Yes | Subject name (see subjects list) |
| week | number | Yes | Week of school year (1-36) |
| interests | string or array | No | Student interests (comma-separated or array) |

**Response:** `200 OK`
```json
{
  "success": true,
  "lesson": {
    "parent": {
      "metadata": {
        "grade": "K",
        "subject": "Mathematics",
        "week": 1,
        "weekTopic": "Counting and Cardinality 1-10",
        "studentInterests": ["dinosaurs", "space"]
      },
      "learningObjective": "Students will understand...",
      "teks": {
        "code": "111.2.b.2.A",
        "summary": "count forward and backward to at least 20..."
      },
      "weeklyPlan": [
        {
          "day": "Monday",
          "teacherInstructions": "Begin the week by...",
          "kidInstructions": "Today we're starting to learn...",
          "resources": {
            "reading": [...],
            "videos": [...],
            "worksheets": [...],
            "games": [...],
            "offlineActivities": [...]
          }
        }
        // ... 4 more days
      ]
    },
    "kid": {
      "title": "Counting and Cardinality 1-10 - Week 1",
      "objective": "This week you'll learn all about...",
      "days": [
        {
          "day": "Monday",
          "whatYoullDo": "Today we're starting...",
          "fun": "Practice game and hands-on activity!"
        }
        // ... 4 more days
      ]
    },
    "generatedAt": "2024-11-27T17:00:00.000Z"
  }
}
```

**Error Responses:**

`400 Bad Request` - Missing required fields
```json
{
  "error": "Missing required fields",
  "required": ["grade", "subject", "week"]
}
```

`400 Bad Request` - Invalid week range
```json
{
  "error": "Week must be between 1 and 36"
}
```

`500 Internal Server Error` - Generation failed
```json
{
  "error": "Failed to generate lesson plan",
  "message": "No TEKS data found for Science Grade K"
}
```

### Get Demo Lesson

Get a pre-generated demo lesson plan.

**Endpoint:** `GET /api/lessons/demo`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "This is a demo lesson plan",
  "lesson": {
    // Same structure as generate endpoint
  }
}
```

## TEKS Standards

### Get Subjects List

Get all available subjects.

**Endpoint:** `GET /api/teks/subjects`

**Response:** `200 OK`
```json
{
  "success": true,
  "subjects": [
    "Mathematics",
    "Science",
    "English Language Arts",
    "Social Studies",
    "Fine Arts",
    "Physical Education",
    "Health Education",
    "Technology Applications"
  ]
}
```

### Get Grade Levels

Get all available grade levels.

**Endpoint:** `GET /api/teks/grades`

**Response:** `200 OK`
```json
{
  "success": true,
  "grades": ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
}
```

### Get TEKS by Subject and Grade

Get TEKS standards for a specific subject and grade.

**Endpoint:** `GET /api/teks/:subject/:grade`

**Example:** `GET /api/teks/Mathematics/K`

**Response:** `200 OK`
```json
{
  "success": true,
  "subject": "Mathematics",
  "grade": "K",
  "teks": {
    "introduction": "The desire to achieve educational excellence...",
    "strands": {
      "111.2.b.1": {
        "name": "Mathematical process standards...",
        "expectations": [
          {
            "code": "111.2.b.1.A",
            "statement": "apply mathematics to problems arising..."
          }
          // ... more expectations
        ]
      }
      // ... more strands
    }
  }
}
```

**Error Response:**

`404 Not Found`
```json
{
  "error": "TEKS not found",
  "message": "No standards found for Mathematics Grade K"
}
```

### Search TEKS

Search across TEKS standards by keyword.

**Endpoint:** `GET /api/teks/search`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search keyword |
| subject | string | No | Filter by subject |
| grade | string | No | Filter by grade |

**Example:** `GET /api/teks/search?q=addition&subject=Mathematics&grade=1`

**Response:** `200 OK`
```json
{
  "success": true,
  "query": "addition",
  "count": 5,
  "results": [
    {
      "subject": "Mathematics",
      "grade": "1",
      "strandCode": "111.3.b.3",
      "strandName": "Number and operations...",
      "expectationCode": "111.3.b.3.B",
      "expectation": "solve word problems using objects and drawings to find sums..."
    }
    // ... more results
  ]
}
```

**Error Response:**

`400 Bad Request`
```json
{
  "error": "Search query required",
  "message": "Please provide a search query with ?q=keyword"
}
```

## Error Handling

All API endpoints follow consistent error response format:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

### Common Error Scenarios

**Rate Limiting:**
If you exceed 100 requests per 15 minutes:
```json
{
  "error": "Too many requests",
  "message": "Please try again later"
}
```

**Server Offline:**
```json
{
  "error": "Network error",
  "message": "Unable to connect to server"
}
```

## Resource Objects

### Resource Object Structure

Resources in lesson plans follow this structure:

**Reading:**
```json
{
  "title": "Introduction to Counting",
  "url": "https://www.ck12.org/...",
  "description": "Learn the basics of counting",
  "source": "CK-12 Foundation"
}
```

**Video:**
```json
{
  "title": "Counting Explained",
  "url": "https://www.khanacademy.org/...",
  "description": "Video introduction to counting",
  "duration": "5-10 minutes",
  "source": "Khan Academy"
}
```

**Worksheet:**
```json
{
  "title": "Counting Practice",
  "url": "https://www.education.com/...",
  "description": "Printable practice problems",
  "gradeLevel": "K",
  "source": "Education.com"
}
```

**Game:**
```json
{
  "title": "Counting Game",
  "url": "https://www.mathplayground.com/...",
  "description": "Interactive counting practice",
  "source": "Math Playground"
}
```

**Offline Activity:**
```json
{
  "title": "Hands-On Counting",
  "description": "Create a physical model using household items",
  "materials": ["Paper", "Pencils", "Household items"],
  "duration": "30-45 minutes"
}
```

## Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per IP
- **Headers:** Rate limit info included in response headers

## CORS

The API supports CORS for:
- Development: `http://localhost:5173`
- Production: Configure in environment variables

## Authentication

Currently, the API is open for development. Future versions will include:
- JWT-based authentication
- User accounts
- Subscription tiers
- API keys for third-party access

---

For examples and integration guides, see the frontend code in `frontend/src/components/`.
