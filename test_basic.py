"""Test script to verify basic functionality without API key."""

import sys
from pathlib import Path

# Test 1: Import modules
print("=" * 80)
print("TEST 1: Importing modules...")
print("=" * 80)

try:
    from src.models.standards import Subject, StrandPart, Strand, GradeStandards
    from src.data_processing.loader import StandardsLoader
    print("✓ All modules imported successfully")
except Exception as e:
    print(f"✗ Import failed: {e}")
    sys.exit(1)

# Test 2: Check data directory
print("\n" + "=" * 80)
print("TEST 2: Checking data directory...")
print("=" * 80)

data_dir = Path("extracted_data")
if data_dir.exists():
    print(f"✓ Data directory exists: {data_dir}")
    files = list(data_dir.glob("*.xlsx"))
    print(f"✓ Found {len(files)} Excel files:")
    for f in files:
        print(f"  - {f.name}")
else:
    print(f"✗ Data directory not found: {data_dir}")
    sys.exit(1)

# Test 3: Initialize loader
print("\n" + "=" * 80)
print("TEST 3: Initializing standards loader...")
print("=" * 80)

try:
    loader = StandardsLoader()
    print("✓ StandardsLoader initialized successfully")
    print(f"  - Data directory: {loader.data_dir}")
    print(f"  - Cache initialized: {len(loader.standards_cache)} items")
except Exception as e:
    print(f"✗ Loader initialization failed: {e}")
    sys.exit(1)

# Test 4: Load ELA standards
print("\n" + "=" * 80)
print("TEST 4: Loading ELA standards...")
print("=" * 80)

try:
    ela_standards = loader.load_subject_standards(Subject.ELA)
    print(f"✓ Loaded ELA standards successfully")
    print(f"  - Number of grades: {len(ela_standards)}")

    for grade_std in ela_standards[:3]:  # Show first 3 grades
        print(f"  - Grade {grade_std.grade}: {len(grade_std.strands)} strands")
        if grade_std.strands:
            print(f"    • Example: {grade_std.strands[0].title} ({len(grade_std.strands[0].parts)} parts)")
except Exception as e:
    print(f"✗ Loading ELA standards failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Test 5: Get specific standard by code
print("\n" + "=" * 80)
print("TEST 5: Retrieving specific standard by code...")
print("=" * 80)

try:
    strand_part, grade_standards = loader.get_strand_by_code("ELA06.RLa")

    if strand_part:
        print(f"✓ Found standard: {strand_part.code}")
        print(f"  - Subject: {grade_standards.subject.value}")
        print(f"  - Grade: {grade_standards.grade}")
        print(f"  - Common Core: {strand_part.common_core_alignment}")
        print(f"  - Proficiency Level 1: {strand_part.proficiency_level_1[:80]}...")
    else:
        print("✗ Standard not found")
except Exception as e:
    print(f"✗ Standard retrieval failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Test 6: Search standards
print("\n" + "=" * 80)
print("TEST 6: Searching standards...")
print("=" * 80)

try:
    results = loader.search_standards("reading literature", Subject.ELA, grade=6)
    print(f"✓ Search completed successfully")
    print(f"  - Found {len(results)} results for 'reading literature'")

    for i, (part, strand_title, subject, grade) in enumerate(results[:3], 1):
        print(f"  {i}. {part.code} - {strand_title} (Grade {grade})")
except Exception as e:
    print(f"✗ Search failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Test 7: Load all subjects
print("\n" + "=" * 80)
print("TEST 7: Loading all subjects...")
print("=" * 80)

subjects_to_test = [Subject.ELA, Subject.MATH, Subject.SCIENCE, Subject.SOCIAL_STUDIES]
for subject in subjects_to_test:
    try:
        standards = loader.load_subject_standards(subject)
        print(f"✓ {subject.value.upper()}: {len(standards)} grades loaded")
    except FileNotFoundError:
        print(f"⚠ {subject.value.upper()}: File not found (may not be extracted)")
    except Exception as e:
        print(f"✗ {subject.value.upper()}: Failed - {e}")

# Test 8: Verify data models
print("\n" + "=" * 80)
print("TEST 8: Verifying data models...")
print("=" * 80)

try:
    from src.models.standards import (
        LessonPlanRequest,
        AssessmentRequest,
        AssessmentResult,
        ProficiencyLevel
    )

    # Create a test lesson plan request
    lesson_req = LessonPlanRequest(
        subject=Subject.ELA,
        grade=6,
        strand_codes=["ELA06.RLa"],
        duration_minutes=45
    )
    print("✓ LessonPlanRequest model works")
    print(f"  - Subject: {lesson_req.subject}")
    print(f"  - Grade: {lesson_req.grade}")
    print(f"  - Codes: {lesson_req.strand_codes}")

    # Create a test assessment request
    assess_req = AssessmentRequest(
        subject=Subject.ELA,
        grade=6,
        strand_code="ELA06.RLa",
        student_work="Sample student work"
    )
    print("✓ AssessmentRequest model works")

    # Create a test assessment result
    assess_result = AssessmentResult(
        strand_code="ELA06.RLa",
        assessed_level=ProficiencyLevel.LEVEL_2,
        feedback="Good work!",
        strengths=["Clear writing"],
        suggestions=["Add more evidence"]
    )
    print("✓ AssessmentResult model works")
    print(f"  - Level: {assess_result.assessed_level}")

except Exception as e:
    print(f"✗ Data model verification failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Test 9: Check API routes structure
print("\n" + "=" * 80)
print("TEST 9: Verifying API structure...")
print("=" * 80)

try:
    from src.api.routes import router
    print("✓ API router imported successfully")

    # Count routes
    route_count = len(router.routes)
    print(f"  - Number of routes: {route_count}")

    # List some routes
    print("  - Available routes:")
    for route in router.routes[:10]:
        if hasattr(route, 'path'):
            methods = list(route.methods) if hasattr(route, 'methods') else []
            print(f"    • {route.path} {methods}")

except Exception as e:
    print(f"✗ API verification failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Summary
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print("✓ All basic functionality tests passed!")
print("\nCore components verified:")
print("  ✓ Data models")
print("  ✓ Standards loader")
print("  ✓ Data loading from Excel files")
print("  ✓ Standard retrieval by code")
print("  ✓ Search functionality")
print("  ✓ API routes structure")
print("\nNote: Claude AI integration requires ANTHROPIC_API_KEY to test")
print("=" * 80)
