"""Test API endpoints without requiring API key."""

from fastapi.testclient import TestClient
import sys
import os

# Mock the API key for testing endpoints that don't use it
os.environ['ANTHROPIC_API_KEY'] = 'test-key-for-testing'

from main import app

client = TestClient(app)

print("=" * 80)
print("Testing API Endpoints")
print("=" * 80)

# Test 1: Root endpoint
print("\nTest 1: GET /api/v1/")
response = client.get("/api/v1/")
print(f"Status: {response.status_code}")
print(f"Message: {response.json().get('message', '')}")
assert response.status_code == 200

# Test 2: Health check
print("\nTest 2: GET /api/v1/health")
response = client.get("/api/v1/health")
print(f"Status: {response.status_code}")
print(f"Health: {response.json().get('status', '')}")
assert response.status_code == 200

# Test 3: List subjects
print("\nTest 3: GET /api/v1/subjects")
response = client.get("/api/v1/subjects")
print(f"Status: {response.status_code}")
subjects = response.json().get('subjects', [])
print(f"Subjects: {len(subjects)} available")
for subj in subjects:
    print(f"  - {subj['label']} ({subj['value']})")
assert response.status_code == 200
assert len(subjects) == 4

# Test 4: List grades
print("\nTest 4: GET /api/v1/grades")
response = client.get("/api/v1/grades")
print(f"Status: {response.status_code}")
grades = response.json().get('grades', [])
print(f"Grades: {grades}")
assert response.status_code == 200
assert len(grades) == 12

# Test 5: Get ELA standards
print("\nTest 5: GET /api/v1/standards/ela")
response = client.get("/api/v1/standards/ela")
print(f"Status: {response.status_code}")
if response.status_code == 200:
    standards = response.json()
    print(f"Loaded {len(standards)} grade levels")
    if standards:
        print(f"  Example: Grade {standards[0]['grade']} has {len(standards[0]['strands'])} strands")
assert response.status_code == 200

# Test 6: Get specific standard
print("\nTest 6: GET /api/v1/standard/ELA06.RLa")
response = client.get("/api/v1/standard/ELA06.RLa")
print(f"Status: {response.status_code}")
if response.status_code == 200:
    standard = response.json()
    print(f"  Code: {standard['code']}")
    print(f"  Subject: {standard['subject']}")
    print(f"  Grade: {standard['grade']}")
    print(f"  Common Core: {standard['common_core_alignment']}")
assert response.status_code == 200

# Test 7: Get non-existent standard
print("\nTest 7: GET /api/v1/standard/INVALID.CODE")
response = client.get("/api/v1/standard/INVALID.CODE")
print(f"Status: {response.status_code}")
assert response.status_code == 404

# Test 8: Get Math standards
print("\nTest 8: GET /api/v1/standards/math")
response = client.get("/api/v1/standards/math")
print(f"Status: {response.status_code}")
if response.status_code == 200:
    standards = response.json()
    print(f"Loaded {len(standards)} grade levels for Math")
assert response.status_code == 200

# Test 9: Get Science standards
print("\nTest 9: GET /api/v1/standards/science")
response = client.get("/api/v1/standards/science")
print(f"Status: {response.status_code}")
if response.status_code == 200:
    standards = response.json()
    print(f"Loaded {len(standards)} grade levels for Science")
assert response.status_code == 200

# Test 10: Get Social Studies standards
print("\nTest 10: GET /api/v1/standards/social_studies")
response = client.get("/api/v1/standards/social_studies")
print(f"Status: {response.status_code}")
if response.status_code == 200:
    standards = response.json()
    print(f"Loaded {len(standards)} grade levels for Social Studies")
assert response.status_code == 200

print("\n" + "=" * 80)
print("API Tests Summary")
print("=" * 80)
print("✓ All API endpoint tests passed!")
print("\nTested endpoints:")
print("  ✓ Root endpoint")
print("  ✓ Health check")
print("  ✓ List subjects")
print("  ✓ List grades")
print("  ✓ Get standards for all subjects")
print("  ✓ Get specific standard by code")
print("  ✓ Error handling for invalid codes")
print("\nNote: AI-powered endpoints (search, lesson plan, assess, activities, chat)")
print("      require a valid ANTHROPIC_API_KEY to test")
print("=" * 80)
