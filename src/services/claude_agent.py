"""Claude AI agent for Centric Learning educational tasks."""

import anthropic
from typing import List, Optional
import json
from src.models.standards import (
    Subject,
    LessonPlanRequest,
    AssessmentRequest,
    AssessmentResult,
    ProficiencyLevel,
    StandardSearchResult,
    StandardsSearchRequest
)
from src.data_processing.loader import StandardsLoader


class CentricLearningAgent:
    """AI agent powered by Claude for educational content generation and assessment."""

    def __init__(self, api_key: str):
        """Initialize the Claude agent.

        Args:
            api_key: Anthropic API key
        """
        self.client = anthropic.Anthropic(api_key=api_key)
        self.loader = StandardsLoader()
        self.model = "claude-sonnet-4-5-20250929"

    def generate_lesson_plan(self, request: LessonPlanRequest) -> str:
        """Generate a detailed lesson plan based on specified standards.

        Args:
            request: Lesson plan request with standards and parameters

        Returns:
            Generated lesson plan as formatted text
        """
        # Load the relevant standards
        standards_context = []
        for code in request.strand_codes:
            strand_part, grade_standards = self.loader.get_strand_by_code(code)
            if strand_part:
                standards_context.append({
                    "code": strand_part.code,
                    "proficiency_1": strand_part.proficiency_level_1,
                    "proficiency_2": strand_part.proficiency_level_2,
                    "proficiency_3": strand_part.proficiency_level_3,
                    "common_core": strand_part.common_core_alignment
                })

        if not standards_context:
            return "Error: No valid standards found for the provided codes."

        prompt = f"""You are an expert educational curriculum designer. Generate a comprehensive lesson plan with the following specifications:

Subject: {request.subject.value.replace('_', ' ').title()}
Grade Level: {request.grade}
Duration: {request.duration_minutes} minutes

Standards to Address:
{json.dumps(standards_context, indent=2)}

Additional Context: {request.additional_context or 'None'}

Please create a detailed lesson plan that includes:
1. Learning Objectives (aligned with the standards and proficiency levels)
2. Materials Needed
3. Introduction/Hook (5-10 minutes)
4. Direct Instruction (15-20 minutes)
5. Guided Practice (10-15 minutes)
6. Independent Practice (10-15 minutes)
7. Closure/Assessment (5-10 minutes)
8. Differentiation Strategies (for different proficiency levels)
9. Assessment Methods (to measure progress toward proficiency levels)

Ensure the lesson addresses all three proficiency levels and provides clear pathways for students to progress from Level 1 to Level 3."""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}]
        )

        return message.content[0].text

    def assess_student_work(self, request: AssessmentRequest) -> AssessmentResult:
        """Assess student work against a specific standard.

        Args:
            request: Assessment request with student work and standard

        Returns:
            Assessment result with proficiency level and feedback
        """
        strand_part, grade_standards = self.loader.get_strand_by_code(request.strand_code)

        if not strand_part:
            return AssessmentResult(
                strand_code=request.strand_code,
                assessed_level=ProficiencyLevel.LEVEL_1,
                feedback="Error: Standard not found.",
                suggestions=[],
                strengths=[]
            )

        prompt = f"""You are an expert educator assessing student work. Evaluate the following student work against the specified learning standard.

Subject: {request.subject.value.replace('_', ' ').title()}
Grade Level: {request.grade}
Standard Code: {strand_part.code}

Proficiency Level Descriptions:
- Level 1 (Beginning): {strand_part.proficiency_level_1}
- Level 2 (Intermediate): {strand_part.proficiency_level_2}
- Level 3 (Advanced): {strand_part.proficiency_level_3}

Common Core Alignment: {strand_part.common_core_alignment}

Student Work:
{request.student_work}

Please provide a comprehensive assessment in the following JSON format:
{{
    "assessed_level": "level_1" | "level_2" | "level_3",
    "feedback": "Detailed feedback explaining the assessment",
    "strengths": ["strength1", "strength2", ...],
    "suggestions": ["suggestion1", "suggestion2", ...]
}}

Be specific, constructive, and encouraging in your feedback."""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )

        # Parse the response
        try:
            response_text = message.content[0].text
            # Extract JSON from the response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1
            json_str = response_text[start_idx:end_idx]
            result_data = json.loads(json_str)

            return AssessmentResult(
                strand_code=request.strand_code,
                assessed_level=ProficiencyLevel(result_data["assessed_level"]),
                feedback=result_data["feedback"],
                strengths=result_data.get("strengths", []),
                suggestions=result_data.get("suggestions", [])
            )
        except (json.JSONDecodeError, KeyError, ValueError) as e:
            # Fallback if JSON parsing fails
            return AssessmentResult(
                strand_code=request.strand_code,
                assessed_level=ProficiencyLevel.LEVEL_1,
                feedback=message.content[0].text,
                suggestions=[],
                strengths=[]
            )

    def search_standards_ai(self, request: StandardsSearchRequest) -> List[StandardSearchResult]:
        """Use AI to search and rank standards by relevance to a natural language query.

        Args:
            request: Search request with natural language query

        Returns:
            List of relevant standards ranked by relevance
        """
        # First, get all relevant standards from the database
        raw_results = self.loader.search_standards(
            query=request.query,
            subject=request.subject,
            grade=request.grade
        )

        if not raw_results:
            return []

        # Use Claude to rank and filter results
        standards_list = []
        for part, strand_title, subject, grade in raw_results[:50]:  # Limit to top 50 for AI processing
            standards_list.append({
                "code": part.code,
                "title": strand_title,
                "subject": subject.value,
                "grade": grade,
                "proficiency_1": part.proficiency_level_1,
                "proficiency_2": part.proficiency_level_2,
                "proficiency_3": part.proficiency_level_3,
                "common_core": part.common_core_alignment
            })

        prompt = f"""You are an educational standards expert. A teacher is searching for: "{request.query}"

Here are potentially relevant standards:
{json.dumps(standards_list, indent=2)}

Please rank these standards by relevance to the teacher's query and return the top {request.limit} results.

For each result, provide:
1. The standard code
2. A relevance score between 0.0 and 1.0
3. A brief explanation of why it's relevant

Return your response as a JSON array of objects with this format:
[
    {{
        "code": "standard_code",
        "relevance_score": 0.95,
        "explanation": "explanation of relevance"
    }},
    ...
]"""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}]
        )

        try:
            response_text = message.content[0].text
            start_idx = response_text.find('[')
            end_idx = response_text.rfind(']') + 1
            json_str = response_text[start_idx:end_idx]
            ranked_results = json.loads(json_str)

            # Create StandardSearchResult objects
            results = []
            standards_dict = {s["code"]: s for s in standards_list}

            for item in ranked_results[:request.limit]:
                code = item["code"]
                if code in standards_dict:
                    std = standards_dict[code]
                    results.append(StandardSearchResult(
                        strand_code=code,
                        strand_title=std["title"],
                        subject=Subject(std["subject"]),
                        grade=std["grade"],
                        proficiency_description=f"{std['proficiency_1']} | {std['proficiency_2']} | {std['proficiency_3']}",
                        relevance_score=item["relevance_score"],
                        common_core_alignment=std["common_core"]
                    ))

            return results
        except (json.JSONDecodeError, KeyError) as e:
            # Fallback to simple search results
            results = []
            for part, strand_title, subject, grade in raw_results[:request.limit]:
                results.append(StandardSearchResult(
                    strand_code=part.code,
                    strand_title=strand_title,
                    subject=subject,
                    grade=grade,
                    proficiency_description=f"{part.proficiency_level_1} | {part.proficiency_level_2} | {part.proficiency_level_3}",
                    relevance_score=0.5,
                    common_core_alignment=part.common_core_alignment
                ))
            return results

    def generate_learning_activities(self, strand_code: str, proficiency_level: ProficiencyLevel) -> str:
        """Generate learning activities for a specific standard and proficiency level.

        Args:
            strand_code: Standard code to generate activities for
            proficiency_level: Target proficiency level

        Returns:
            Generated learning activities
        """
        strand_part, grade_standards = self.loader.get_strand_by_code(strand_code)

        if not strand_part:
            return "Error: Standard not found."

        target_description = {
            ProficiencyLevel.LEVEL_1: strand_part.proficiency_level_1,
            ProficiencyLevel.LEVEL_2: strand_part.proficiency_level_2,
            ProficiencyLevel.LEVEL_3: strand_part.proficiency_level_3
        }[proficiency_level]

        prompt = f"""You are a creative educational content developer. Generate engaging learning activities for students.

Standard: {strand_code}
Grade Level: {grade_standards.grade}
Subject: {grade_standards.subject.value.replace('_', ' ').title()}
Target Proficiency Level: {proficiency_level.value.replace('_', ' ').title()}

Proficiency Description: {target_description}

Common Core Alignment: {strand_part.common_core_alignment}

Please create 5-7 diverse learning activities that will help students achieve this proficiency level. Include:
1. Activity name and type (individual, pair, group, whole class)
2. Detailed instructions
3. Required materials
4. Expected duration
5. Success criteria

Make the activities engaging, age-appropriate, and clearly aligned with the proficiency level goal."""

        message = self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}]
        )

        return message.content[0].text

    def chat(self, query: str, context: Optional[str] = None) -> str:
        """General chat interface for educational questions.

        Args:
            query: User's question or request
            context: Optional context (e.g., current standards being discussed)

        Returns:
            Agent's response
        """
        system_prompt = """You are a helpful educational assistant specializing in K-12 curriculum and standards-based learning.
You help teachers with lesson planning, assessment, understanding educational standards, and creating engaging learning experiences.
Be concise, practical, and focus on actionable advice."""

        messages = [{"role": "user", "content": query}]

        if context:
            messages[0]["content"] = f"Context: {context}\n\nQuestion: {query}"

        message = self.client.messages.create(
            model=self.model,
            max_tokens=2000,
            system=system_prompt,
            messages=messages
        )

        return message.content[0].text
