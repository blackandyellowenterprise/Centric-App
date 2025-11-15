#!/usr/bin/env python3
"""Command-line interface for Centric Learning Agent."""

import sys
import json
from typing import Optional
from src.services.claude_agent import CentricLearningAgent
from src.data_processing.loader import StandardsLoader
from src.models.standards import (
    Subject,
    ProficiencyLevel,
    LessonPlanRequest,
    AssessmentRequest,
    StandardsSearchRequest
)
from src.utils.config import get_settings
import argparse


def print_header(text: str):
    """Print a formatted header."""
    print(f"\n{'=' * 80}")
    print(f" {text}")
    print(f"{'=' * 80}\n")


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description="Centric Learning Claude Agent CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    subparsers = parser.add_subparsers(dest='command', help='Available commands')

    # Search command
    search_parser = subparsers.add_parser('search', help='Search standards')
    search_parser.add_argument('query', help='Search query')
    search_parser.add_argument('--subject', choices=['ela', 'math', 'science', 'social_studies'], help='Filter by subject')
    search_parser.add_argument('--grade', type=int, help='Filter by grade (1-12)')
    search_parser.add_argument('--limit', type=int, default=5, help='Maximum results')

    # Lesson plan command
    lesson_parser = subparsers.add_parser('lesson', help='Generate lesson plan')
    lesson_parser.add_argument('--subject', required=True, choices=['ela', 'math', 'science', 'social_studies'])
    lesson_parser.add_argument('--grade', required=True, type=int, help='Grade level (1-12)')
    lesson_parser.add_argument('--codes', required=True, nargs='+', help='Standard codes (e.g., ELA06.RLa)')
    lesson_parser.add_argument('--duration', type=int, default=45, help='Duration in minutes')
    lesson_parser.add_argument('--context', help='Additional context')

    # Assess command
    assess_parser = subparsers.add_parser('assess', help='Assess student work')
    assess_parser.add_argument('--subject', required=True, choices=['ela', 'math', 'science', 'social_studies'])
    assess_parser.add_argument('--grade', required=True, type=int, help='Grade level (1-12)')
    assess_parser.add_argument('--code', required=True, help='Standard code')
    assess_parser.add_argument('--work', required=True, help='Student work to assess')

    # Activities command
    activities_parser = subparsers.add_parser('activities', help='Generate learning activities')
    activities_parser.add_argument('code', help='Standard code')
    activities_parser.add_argument('--level', required=True, choices=['level_1', 'level_2', 'level_3'])

    # Show standard command
    show_parser = subparsers.add_parser('show', help='Show standard details')
    show_parser.add_argument('code', help='Standard code')

    # List command
    list_parser = subparsers.add_parser('list', help='List standards')
    list_parser.add_argument('subject', choices=['ela', 'math', 'science', 'social_studies'])
    list_parser.add_argument('--grade', type=int, help='Filter by grade')

    # Chat command
    chat_parser = subparsers.add_parser('chat', help='Chat with the agent')
    chat_parser.add_argument('query', help='Your question')
    chat_parser.add_argument('--context', help='Optional context')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    # Initialize services
    settings = get_settings()
    agent = CentricLearningAgent(api_key=settings.anthropic_api_key)
    loader = StandardsLoader(data_dir=settings.data_directory)

    try:
        if args.command == 'search':
            print_header(f"Searching for: {args.query}")
            request = StandardsSearchRequest(
                query=args.query,
                subject=Subject(args.subject) if args.subject else None,
                grade=args.grade,
                limit=args.limit
            )
            results = agent.search_standards_ai(request)

            if results:
                for i, result in enumerate(results, 1):
                    print(f"{i}. {result.strand_code} - {result.strand_title}")
                    print(f"   Subject: {result.subject.value.title()} | Grade: {result.grade}")
                    print(f"   Relevance: {result.relevance_score:.2f}")
                    print(f"   Common Core: {result.common_core_alignment}")
                    print()
            else:
                print("No results found.")

        elif args.command == 'lesson':
            print_header(f"Generating Lesson Plan")
            request = LessonPlanRequest(
                subject=Subject(args.subject),
                grade=args.grade,
                strand_codes=args.codes,
                duration_minutes=args.duration,
                additional_context=args.context
            )
            lesson_plan = agent.generate_lesson_plan(request)
            print(lesson_plan)

        elif args.command == 'assess':
            print_header(f"Assessing Student Work")
            request = AssessmentRequest(
                subject=Subject(args.subject),
                grade=args.grade,
                strand_code=args.code,
                student_work=args.work
            )
            result = agent.assess_student_work(request)

            print(f"Standard: {result.strand_code}")
            print(f"Assessed Level: {result.assessed_level.value.replace('_', ' ').title()}")
            print(f"\nFeedback:\n{result.feedback}")

            if result.strengths:
                print(f"\nStrengths:")
                for strength in result.strengths:
                    print(f"  • {strength}")

            if result.suggestions:
                print(f"\nSuggestions for Improvement:")
                for suggestion in result.suggestions:
                    print(f"  • {suggestion}")

        elif args.command == 'activities':
            print_header(f"Generating Learning Activities")
            activities = agent.generate_learning_activities(
                args.code,
                ProficiencyLevel(args.level)
            )
            print(activities)

        elif args.command == 'show':
            print_header(f"Standard Details: {args.code}")
            strand_part, grade_standards = loader.get_strand_by_code(args.code)

            if strand_part:
                print(f"Code: {strand_part.code}")
                print(f"Subject: {grade_standards.subject.value.title()}")
                print(f"Grade: {grade_standards.grade}")
                print(f"Common Core Alignment: {strand_part.common_core_alignment}")
                print(f"\nProficiency Levels:")
                print(f"\n  Level 1 (Beginning):\n  {strand_part.proficiency_level_1}")
                print(f"\n  Level 2 (Intermediate):\n  {strand_part.proficiency_level_2}")
                print(f"\n  Level 3 (Advanced):\n  {strand_part.proficiency_level_3}")
            else:
                print(f"Standard {args.code} not found.")

        elif args.command == 'list':
            print_header(f"Standards for {args.subject.upper()}")
            all_standards = loader.load_subject_standards(Subject(args.subject))

            for grade_standards in all_standards:
                if args.grade and grade_standards.grade != args.grade:
                    continue

                print(f"\nGrade {grade_standards.grade}:")
                for strand in grade_standards.strands:
                    print(f"\n  {strand.title}:")
                    for part in strand.parts:
                        print(f"    • {part.code} - {part.common_core_alignment}")

        elif args.command == 'chat':
            print_header("Chat with Centric Learning Agent")
            response = agent.chat(args.query, args.context)
            print(response)

    except Exception as e:
        print(f"\nError: {str(e)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
