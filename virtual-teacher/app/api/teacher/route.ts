import { NextRequest, NextResponse } from 'next/server';
import { VirtualTeacher } from '@/lib/virtualTeacher';
import { LessonContext } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context, action } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const teacher = new VirtualTeacher(apiKey);

    // Handle different actions
    switch (action) {
      case 'chat': {
        const lessonContext: LessonContext = context;
        const response = await teacher.chat(message, lessonContext);
        return NextResponse.json(response);
      }

      case 'introduction': {
        const { topic, student } = body;
        const intro = await teacher.generateIntroduction(topic, student);
        return NextResponse.json({ introduction: intro, type: 'lecture' });
      }

      case 'grade': {
        const { assignment, rubric, student } = body;
        const result = await teacher.gradeAssignment(assignment, rubric, student);
        return NextResponse.json(result);
      }

      case 'assessment': {
        const { topic, student, assessmentType } = body;
        const assessment = await teacher.generateDifferentiatedAssessment(
          topic,
          student,
          assessmentType
        );
        return NextResponse.json({ assessment, type: 'assessment' });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in teacher API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
