"""API routes for Centric Learning Agent."""

from fastapi import APIRouter, HTTPException, Depends
from typing import List
from src.models.standards import (
    Subject,
    GradeStandards,
    LessonPlanRequest,
    AssessmentRequest,
    AssessmentResult,
    StandardsSearchRequest,
    StandardSearchResult,
    ProficiencyLevel
)
from src.services.claude_agent import CentricLearningAgent
from src.data_processing.loader import StandardsLoader
from src.utils.config import get_settings

router = APIRouter()

# Dependency to get the Claude agent
def get_agent() -> CentricLearningAgent:
    """Get Claude agent instance."""
    settings = get_settings()
    return CentricLearningAgent(api_key=settings.anthropic_api_key)

# Dependency to get the standards loader
def get_loader() -> StandardsLoader:
    """Get standards loader instance."""
    settings = get_settings()
    return StandardsLoader(data_dir=settings.data_directory)


@router.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Centric Learning Claude Agent API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "standards": "/standards/{subject}",
            "standard": "/standard/{code}",
            "search": "/search",
            "lesson_plan": "/lesson-plan",
            "assess": "/assess",
            "activities": "/activities/{code}/{level}",
            "chat": "/chat"
        }
    }


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "Centric Learning Claude Agent"}


@router.get("/standards/{subject}", response_model=List[GradeStandards])
async def get_standards(subject: Subject, loader: StandardsLoader = Depends(get_loader)):
    """Get all standards for a subject across all grades.

    Args:
        subject: Subject to retrieve standards for

    Returns:
        List of GradeStandards
    """
    try:
        standards = loader.load_subject_standards(subject)
        return standards
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading standards: {str(e)}")


@router.get("/standard/{code}")
async def get_standard_by_code(code: str, loader: StandardsLoader = Depends(get_loader)):
    """Get a specific standard by its code.

    Args:
        code: Standard code (e.g., "ELA06.RLa")

    Returns:
        Standard details
    """
    strand_part, grade_standards = loader.get_strand_by_code(code)

    if not strand_part:
        raise HTTPException(status_code=404, detail=f"Standard {code} not found")

    return {
        "code": strand_part.code,
        "subject": grade_standards.subject,
        "grade": grade_standards.grade,
        "proficiency_level_1": strand_part.proficiency_level_1,
        "proficiency_level_2": strand_part.proficiency_level_2,
        "proficiency_level_3": strand_part.proficiency_level_3,
        "common_core_alignment": strand_part.common_core_alignment
    }


@router.post("/search", response_model=List[StandardSearchResult])
async def search_standards(
    request: StandardsSearchRequest,
    agent: CentricLearningAgent = Depends(get_agent)
):
    """Search standards using AI-powered natural language search.

    Args:
        request: Search request with query and filters

    Returns:
        List of ranked search results
    """
    try:
        results = agent.search_standards_ai(request)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")


@router.post("/lesson-plan")
async def generate_lesson_plan(
    request: LessonPlanRequest,
    agent: CentricLearningAgent = Depends(get_agent)
):
    """Generate a comprehensive lesson plan based on specified standards.

    Args:
        request: Lesson plan request

    Returns:
        Generated lesson plan
    """
    try:
        lesson_plan = agent.generate_lesson_plan(request)
        return {
            "success": True,
            "lesson_plan": lesson_plan,
            "metadata": {
                "subject": request.subject,
                "grade": request.grade,
                "duration_minutes": request.duration_minutes,
                "strand_codes": request.strand_codes
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating lesson plan: {str(e)}")


@router.post("/assess", response_model=AssessmentResult)
async def assess_student_work(
    request: AssessmentRequest,
    agent: CentricLearningAgent = Depends(get_agent)
):
    """Assess student work against a specific standard.

    Args:
        request: Assessment request

    Returns:
        Assessment result with proficiency level and feedback
    """
    try:
        result = agent.assess_student_work(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error assessing work: {str(e)}")


@router.get("/activities/{code}/{level}")
async def generate_activities(
    code: str,
    level: ProficiencyLevel,
    agent: CentricLearningAgent = Depends(get_agent)
):
    """Generate learning activities for a specific standard and proficiency level.

    Args:
        code: Standard code
        level: Target proficiency level

    Returns:
        Generated learning activities
    """
    try:
        activities = agent.generate_learning_activities(code, level)
        return {
            "success": True,
            "standard_code": code,
            "proficiency_level": level,
            "activities": activities
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating activities: {str(e)}")


@router.post("/chat")
async def chat(
    query: str,
    context: str = None,
    agent: CentricLearningAgent = Depends(get_agent)
):
    """Chat with the educational AI assistant.

    Args:
        query: User's question or request
        context: Optional context

    Returns:
        AI response
    """
    try:
        response = agent.chat(query, context)
        return {
            "success": True,
            "query": query,
            "response": response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")


@router.get("/subjects")
async def list_subjects():
    """List all available subjects.

    Returns:
        List of subjects
    """
    return {
        "subjects": [
            {"value": "ela", "label": "English Language Arts"},
            {"value": "math", "label": "Mathematics"},
            {"value": "science", "label": "Science"},
            {"value": "social_studies", "label": "Social Studies"}
        ]
    }


@router.get("/grades")
async def list_grades():
    """List all available grade levels.

    Returns:
        List of grades
    """
    return {
        "grades": list(range(1, 13))
    }
