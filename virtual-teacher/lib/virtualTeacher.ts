import Anthropic from '@anthropic-ai/sdk';
import { StudentProfile, TeacherMessage, LessonContext, CurriculumTopic } from '@/types';

export class VirtualTeacher {
  private anthropic: Anthropic;
  private systemPrompt: string;

  constructor(apiKey: string) {
    this.anthropic = new Anthropic({ apiKey });
    this.systemPrompt = this.buildSystemPrompt();
  }

  private buildSystemPrompt(): string {
    return `You are Jiminy, a friendly and knowledgeable virtual teacher for homeschool students in Texas.

Your role is to:
1. **Guide students through their curriculum** - You know the Texas TEKS (Texas Essential Knowledge and Skills) standards thoroughly
2. **Deliver engaging lectures** - Present topics in an interesting, conversational way that keeps students engaged
3. **Adapt to each student** - Personalize your teaching based on the student's grade level, learning style, interests, and performance level
4. **Provide encouragement** - Be supportive and positive, like Jiminy Cricket guiding Pinocchio
5. **Assess understanding** - Ask questions, provide differentiated assessments, and give constructive feedback
6. **Grade assignments** - Review student work and provide detailed, helpful feedback

Your teaching style:
- Warm, encouraging, and patient
- Use analogies and real-world examples
- Break complex topics into manageable chunks
- Check for understanding frequently
- Celebrate progress and effort
- Provide differentiated instruction based on student needs

When delivering lectures:
- Start with a hook to grab attention
- Use storytelling and examples
- Include interactive elements (questions, think-aloud)
- Summarize key points
- Connect to real-world applications

When assessing:
- Adjust difficulty based on student performance level
- Provide multiple ways to demonstrate understanding
- Give specific, actionable feedback
- Focus on growth and improvement

Remember: You're not just teaching content, you're building confidence and a love of learning.`;
  }

  async chat(
    message: string,
    context: LessonContext
  ): Promise<{ response: string; type: TeacherMessage['type'] }> {
    const { currentTopic, studentProfile, conversationHistory } = context;

    // Build context-aware messages
    const messages = this.buildMessages(message, context);

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        system: this.systemPrompt + this.buildContextualSystemPrompt(context),
        messages,
      });

      const textContent = response.content.find((c) => c.type === 'text');
      const responseText = textContent?.type === 'text' ? textContent.text : '';

      // Determine message type based on content
      const messageType = this.determineMessageType(responseText, message);

      return {
        response: responseText,
        type: messageType,
      };
    } catch (error) {
      console.error('Error calling Claude API:', error);
      throw new Error('Failed to get response from virtual teacher');
    }
  }

  private buildMessages(
    newMessage: string,
    context: LessonContext
  ): Anthropic.MessageParam[] {
    const messages: Anthropic.MessageParam[] = [];

    // Add conversation history
    context.conversationHistory.forEach((msg) => {
      messages.push({
        role: msg.role === 'teacher' ? 'assistant' : 'user',
        content: msg.content,
      });
    });

    // Add new message
    messages.push({
      role: 'user',
      content: newMessage,
    });

    return messages;
  }

  private buildContextualSystemPrompt(context: LessonContext): string {
    const { currentTopic, studentProfile, lessonObjectives, progressPercentage } = context;

    return `

CURRENT LESSON CONTEXT:
- Subject: ${currentTopic.subject}
- Topic: ${currentTopic.chapter}
- Grade Level: ${studentProfile.gradeLevel}
- Lesson Progress: ${progressPercentage}%
- Objectives: ${lessonObjectives.join(', ')}

STUDENT PROFILE:
- Name: ${studentProfile.name}
- Learning Style: ${studentProfile.learningStyle}
- Performance Level: ${studentProfile.performanceLevel} grade level
- Interests: ${studentProfile.interests.join(', ')}
- Strengths: ${studentProfile.strengths.join(', ')}
- Areas for Growth: ${studentProfile.challenges.join(', ')}

TEXAS TEKS STANDARDS FOR THIS LESSON:
${currentTopic.standards.map((s) => `- ${s.humanCode}: ${s.fullStatement}`).join('\n')}

Adapt your teaching to this specific student and lesson context.`;
  }

  private determineMessageType(response: string, userMessage: string): TeacherMessage['type'] {
    const lowerResponse = response.toLowerCase();
    const lowerMessage = userMessage.toLowerCase();

    // Check if this is feedback on an assignment
    if (lowerMessage.includes('assignment') || lowerMessage.includes('upload') || lowerMessage.includes('grade')) {
      return 'feedback';
    }

    // Check if this is an assessment/quiz
    if (lowerResponse.includes('question') && lowerResponse.includes('answer')) {
      return 'assessment';
    }

    // Check if this is a lecture
    if (lowerResponse.length > 300 || lowerResponse.includes('let me explain')) {
      return 'lecture';
    }

    // Check if this is asking a question
    if (lowerResponse.includes('?') && lowerResponse.split('?').length > 2) {
      return 'question';
    }

    // Default to guidance
    return 'guidance';
  }

  async generateIntroduction(topic: CurriculumTopic, student: StudentProfile): Promise<string> {
    const prompt = `Introduce the topic "${topic.chapter}" in ${topic.subject} for a ${student.gradeLevel} student.

Make it engaging and relevant to their interests: ${student.interests.join(', ')}.

Keep it brief (2-3 paragraphs) and include:
1. Why this topic is interesting/important
2. A hook or question to spark curiosity
3. What they'll be able to do after learning this

Remember their learning style is ${student.learningStyle}.`;

    const response = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      system: this.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    const textContent = response.content.find((c) => c.type === 'text');
    return textContent?.type === 'text' ? textContent.text : '';
  }

  async gradeAssignment(
    assignment: string,
    rubric: string,
    student: StudentProfile
  ): Promise<{ score: number; feedback: string }> {
    const prompt = `Grade this assignment for ${student.name} (${student.gradeLevel}).

ASSIGNMENT SUBMISSION:
${assignment}

RUBRIC/CRITERIA:
${rubric}

STUDENT CONTEXT:
- Performance Level: ${student.performanceLevel}
- Strengths: ${student.strengths.join(', ')}
- Areas for Growth: ${student.challenges.join(', ')}

Provide:
1. A score (0-100)
2. Detailed feedback that is:
   - Specific and actionable
   - Encouraging and supportive
   - Differentiated based on their level
   - Focused on growth

Format your response as:
SCORE: [number]
FEEDBACK: [your detailed feedback]`;

    const response = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      system: this.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    const textContent = response.content.find((c) => c.type === 'text');
    const text = textContent?.type === 'text' ? textContent.text : '';

    // Parse score and feedback
    const scoreMatch = text.match(/SCORE:\s*(\d+)/);
    const feedbackMatch = text.match(/FEEDBACK:\s*([\s\S]+)/);

    return {
      score: scoreMatch ? parseInt(scoreMatch[1]) : 0,
      feedback: feedbackMatch ? feedbackMatch[1].trim() : text,
    };
  }

  async generateDifferentiatedAssessment(
    topic: CurriculumTopic,
    student: StudentProfile,
    assessmentType: 'quiz' | 'assignment' | 'project' | 'discussion'
  ): Promise<string> {
    const prompt = `Create a ${assessmentType} for ${student.name} (${student.gradeLevel}) on "${topic.chapter}".

DIFFERENTIATION:
- Performance Level: ${student.performanceLevel} - adjust difficulty accordingly
- Learning Style: ${student.learningStyle} - format to match their style
- Interests: ${student.interests.join(', ')} - incorporate when possible

STANDARDS TO ASSESS:
${topic.standards.map((s) => `- ${s.humanCode}: ${s.fullStatement}`).join('\n')}

Requirements:
- Appropriate difficulty for ${student.performanceLevel} level
- Multiple ways to demonstrate understanding
- Clear instructions
- Relevant to their interests when possible
- Engaging and purposeful

Create the assessment now.`;

    const response = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      system: this.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    const textContent = response.content.find((c) => c.type === 'text');
    return textContent?.type === 'text' ? textContent.text : '';
  }
}
