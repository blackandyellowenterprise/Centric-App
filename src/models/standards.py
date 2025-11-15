"""Data models for educational standards and learning objectives."""

from typing import Optional, List
from pydantic import BaseModel, Field
from enum import Enum


class Subject(str, Enum):
    """Supported subject areas."""
    ELA = "ela"
    MATH = "math"
    SCIENCE = "science"
    SOCIAL_STUDIES = "social_studies"


class ProficiencyLevel(str, Enum):
    """Student proficiency levels."""
    LEVEL_1 = "level_1"
    LEVEL_2 = "level_2"
    LEVEL_3 = "level_3"


class StrandPart(BaseModel):
    """Individual learning standard within a strand."""
    code: str = Field(..., description="Unique identifier for the strand part (e.g., ELA06.RLa)")
    proficiency_level_1: str = Field(..., description="Beginning proficiency description")
    proficiency_level_2: str = Field(..., description="Intermediate proficiency description")
    proficiency_level_3: str = Field(..., description="Advanced proficiency description")
    common_core_alignment: str = Field(..., description="Aligned Common Core standards")


class Strand(BaseModel):
    """Collection of related learning standards."""
    title: str = Field(..., description="Strand title (e.g., Reading Literature)")
    parts: List[StrandPart] = Field(default_factory=list, description="Individual standards within the strand")


class GradeStandards(BaseModel):
    """All standards for a specific grade and subject."""
    subject: Subject
    grade: int = Field(..., ge=1, le=12, description="Grade level (1-12)")
    strands: List[Strand] = Field(default_factory=list, description="Learning strands for this grade")


class LessonPlanRequest(BaseModel):
    """Request for generating a lesson plan."""
    subject: Subject
    grade: int = Field(..., ge=1, le=12)
    strand_codes: List[str] = Field(..., description="Strand part codes to include (e.g., ['ELA06.RLa', 'ELA06.RLb'])")
    duration_minutes: int = Field(default=45, description="Lesson duration in minutes")
    additional_context: Optional[str] = Field(None, description="Additional context or requirements")


class AssessmentRequest(BaseModel):
    """Request for assessing student work against standards."""
    subject: Subject
    grade: int
    strand_code: str = Field(..., description="Strand part code (e.g., ELA06.RLa)")
    student_work: str = Field(..., description="Student's work to assess")


class AssessmentResult(BaseModel):
    """Result of student work assessment."""
    strand_code: str
    assessed_level: ProficiencyLevel
    feedback: str = Field(..., description="Detailed feedback for the student")
    suggestions: List[str] = Field(default_factory=list, description="Suggestions for improvement")
    strengths: List[str] = Field(default_factory=list, description="Identified strengths")


class StandardsSearchRequest(BaseModel):
    """Request for searching standards by natural language query."""
    query: str = Field(..., description="Natural language search query")
    subject: Optional[Subject] = None
    grade: Optional[int] = Field(None, ge=1, le=12)
    limit: int = Field(default=10, description="Maximum number of results")


class StandardSearchResult(BaseModel):
    """Individual search result for a standard."""
    strand_code: str
    strand_title: str
    subject: Subject
    grade: int
    proficiency_description: str
    relevance_score: float = Field(..., ge=0.0, le=1.0, description="Relevance to search query")
    common_core_alignment: str
