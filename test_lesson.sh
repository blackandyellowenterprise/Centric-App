#!/bin/bash
echo "🎓 Generating a lesson plan..."
echo ""

curl -X POST "http://localhost:8000/api/v1/lesson-plan" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "ela",
    "grade": 6,
    "strand_codes": ["ELA06.RLa"],
    "duration_minutes": 45,
    "additional_context": "Focus on character analysis"
  }' | python3 -m json.tool

echo ""
echo "✅ Done!"
