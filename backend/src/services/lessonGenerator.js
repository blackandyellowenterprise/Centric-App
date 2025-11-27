import { getTEKS } from './teksService.js';
import { getWeekTopic } from './pacingGuide.js';
import { findResources } from './resourceFinder.js';

/**
 * Generate a complete lesson plan
 * @param {Object} params - Lesson generation parameters
 * @param {string} params.grade - Grade level (K-12)
 * @param {string} params.subject - Subject name
 * @param {number} params.week - Week of year (1-36)
 * @param {string[]} params.interests - Student interests array
 * @returns {Object} Complete lesson plan with parent and kid versions
 */
export async function generateLessonPlan({ grade, subject, week, interests = [] }) {
  try {
    console.log(`Generating lesson for Grade ${grade}, ${subject}, Week ${week}`);

    // Step 1: Get TEKS standards for the grade and subject
    const teksData = await getTEKS(subject, grade);

    if (!teksData) {
      throw new Error(`No TEKS data found for ${subject} Grade ${grade}`);
    }

    // Step 2: Determine the topic based on pacing guide
    const weekTopic = getWeekTopic(subject, grade, week);

    // Step 3: Find relevant TEKS standard for the topic
    const relevantTEKS = findRelevantTEKS(teksData, weekTopic, week);

    // Step 4: Create learning objective
    const learningObjective = createLearningObjective(relevantTEKS, weekTopic, interests);

    // Step 5: Find educational resources
    const resources = await findResources(weekTopic, grade, subject, interests);

    // Step 6: Generate 5-day lesson plan
    const weekPlan = generateWeeklyPlan(weekTopic, learningObjective, resources, interests, grade);

    // Step 7: Create parent version
    const parentVersion = {
      metadata: {
        grade,
        subject,
        week,
        weekTopic,
        studentInterests: interests
      },
      learningObjective: learningObjective.parent,
      teks: {
        code: relevantTEKS.code,
        summary: relevantTEKS.summary
      },
      weeklyPlan: weekPlan.parent
    };

    // Step 8: Create kid-friendly version
    const kidVersion = {
      title: `${weekTopic} - Week ${week}`,
      objective: learningObjective.kid,
      days: weekPlan.kid
    };

    return {
      parent: parentVersion,
      kid: kidVersion,
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw error;
  }
}

/**
 * Find the most relevant TEKS standard for the topic
 */
function findRelevantTEKS(teksData, topic, week) {
  // Get all strands
  const strands = teksData.strands || {};
  const allExpectations = [];

  // Collect all expectations
  for (const [strandCode, strand] of Object.entries(strands)) {
    for (const expectation of strand.expectations || []) {
      allExpectations.push({
        code: expectation.code,
        statement: expectation.statement,
        strandName: strand.name
      });
    }
  }

  // If we have expectations, pick based on week or random
  if (allExpectations.length > 0) {
    // Use week number to deterministically select a standard
    const index = (week - 1) % allExpectations.length;
    const selected = allExpectations[index];

    return {
      code: selected.code,
      summary: selected.statement,
      fullStrand: selected.strandName
    };
  }

  // Fallback
  return {
    code: 'N/A',
    summary: `${topic} learning standards`,
    fullStrand: 'General standards'
  };
}

/**
 * Create learning objectives in parent-friendly and kid-friendly language
 */
function createLearningObjective(teks, topic, interests) {
  const interestContext = interests.length > 0
    ? ` using examples related to ${interests.join(', ')}`
    : '';

  return {
    parent: `Students will understand and apply ${topic} concepts. They will demonstrate mastery of ${teks.summary}${interestContext}. By the end of the week, students will be able to independently apply these concepts in practical scenarios.`,
    kid: `This week you'll learn all about ${topic}! We'll explore fun ways to understand this through activities${interestContext}. By Friday, you'll be a ${topic} expert!`
  };
}

/**
 * Generate detailed 5-day lesson plan
 */
function generateWeeklyPlan(topic, objective, resources, interests, grade) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const parentDays = days.map((day, index) => {
    return {
      day,
      teacherInstructions: generateTeacherInstructions(day, index, topic, grade),
      kidInstructions: generateKidInstructions(day, index, topic, interests, grade),
      resources: {
        reading: resources.reading[index] || [],
        videos: resources.videos[index] || [],
        worksheets: resources.worksheets[index] || [],
        games: resources.games[index] || [],
        offlineActivities: resources.offlineActivities[index] || []
      }
    };
  });

  const kidDays = days.map((day, index) => {
    return {
      day,
      whatYoullDo: generateKidInstructions(day, index, topic, interests, grade),
      fun: `${resources.games[index]?.[0]?.title || 'Practice game'} and ${resources.offlineActivities[index]?.[0]?.title || 'hands-on activity'}!`
    };
  });

  return {
    parent: parentDays,
    kid: kidDays
  };
}

/**
 * Generate teacher instructions for each day
 */
function generateTeacherInstructions(day, dayIndex, topic, grade) {
  const instructions = [
    // Monday - Introduction
    `Begin the week by introducing ${topic}. Start with a discussion about what students already know. Use real-world examples and, if possible, visual aids. Have students complete a quick pre-assessment to gauge their current understanding. Introduce key vocabulary terms and create a word wall. Estimated time: 45-60 minutes.`,

    // Tuesday - Deep Dive
    `Today, dive deeper into ${topic}. Break down complex concepts into manageable parts. Use the provided reading materials and have students take notes using a graphic organizer. Pause frequently to check for understanding and clarify misconceptions. Complete the guided practice worksheet together as a class. Estimated time: 45-60 minutes.`,

    // Wednesday - Practice & Application
    `Focus on hands-on practice today. Students should work independently or in pairs on practice problems. Circulate to provide individual support. Use the digital games as enrichment for early finishers. Consider implementing a station rotation to keep engagement high. Estimated time: 45-60 minutes.`,

    // Thursday - Real-World Connections
    `Connect ${topic} to real-world applications. Share examples of how this concept is used in careers, daily life, or current events. Have students complete a project or activity that demonstrates practical application. Encourage creativity and critical thinking. Estimated time: 45-60 minutes.`,

    // Friday - Review & Assessment
    `Review the week's learning. Create a fun quiz game or kahoot-style review. Administer a formative assessment to check mastery. Provide feedback and note which students may need additional support next week. End with a reflection activity where students share what they learned. Estimated time: 45-60 minutes.`
  ];

  return instructions[dayIndex];
}

/**
 * Generate kid-facing instructions for each day
 */
function generateKidInstructions(day, dayIndex, topic, interests, grade) {
  const interestExample = interests.length > 0 ? interests[0] : topic;

  const instructions = [
    // Monday
    `Today we're starting to learn about ${topic}! Watch the introduction video and read the article. Think about how ${topic} connects to things you know, like ${interestExample}. Write down 3 questions you have about ${topic}.`,

    // Tuesday
    `Let's dig deeper into ${topic}! Read today's materials carefully and take notes. Complete the worksheet - don't worry if you need help, that's what learning is about! Try to explain ${topic} in your own words.`,

    // Wednesday
    `Practice time! Work on the activities and games today. The more you practice, the better you'll understand ${topic}. Challenge yourself but remember to ask for help if you need it. Try to connect what you're learning to ${interestExample}.`,

    // Thursday
    `Let's see ${topic} in action! Today you'll discover how people use ${topic} in real life. Complete the hands-on activity and be creative! Think about how you might use this in your future.`,

    // Friday
    `It's review day! Look back at everything you learned this week about ${topic}. Take the quick quiz to show what you know. Then, share your favorite thing you learned this week!`
  ];

  return instructions[dayIndex];
}

export default {
  generateLessonPlan
};
