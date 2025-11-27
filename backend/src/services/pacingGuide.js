/**
 * Texas PEIMS-based pacing guide
 * 36-week school year with topic progression
 */

// Mathematics pacing guide by grade
const MATH_PACING = {
  'K': {
    1: 'Counting and Cardinality 1-10', 2: 'Number Recognition 1-10', 3: 'Comparing Numbers',
    4: 'Addition Concepts', 5: 'Subtraction Concepts', 6: 'Shapes and Geometry',
    7: 'Counting to 20', 8: 'Patterns', 9: 'Measurement Basics',
    10: 'More and Less', 11: 'Number Bonds', 12: 'Data and Graphs',
    13: 'Counting by 2s and 5s', 14: 'Teen Numbers', 15: 'Addition to 10',
    16: 'Subtraction Within 10', 17: 'Time Concepts', 18: 'Money Introduction',
    19: 'Review: Numbers 1-20', 20: 'Position Words', 21: 'Sorting Objects',
    22: 'Comparing Sizes', 23: 'Simple Fractions', 24: 'Review: Addition & Subtraction',
    25: 'Counting to 50', 26: 'Number Patterns', 27: 'Measurement Review',
    28: 'Geometry Review', 29: 'Story Problems', 30: 'Calendar Math',
    31: 'Skip Counting', 32: 'Number Writing Practice', 33: 'Addition Fluency',
    34: 'Subtraction Fluency', 35: 'End of Year Assessment Prep', 36: 'Math Games and Review'
  },
  '1': {
    1: 'Place Value Tens and Ones', 2: 'Addition Within 20', 3: 'Subtraction Within 20',
    4: 'Comparison and Ordering Numbers', 5: 'Word Problems', 6: 'Measurement Length',
    7: 'Time to the Hour and Half Hour', 8: '2D and 3D Shapes', 9: 'Equal Parts and Fractions',
    10: 'Money Counting Coins', 11: 'Addition Strategies', 12: 'Subtraction Strategies',
    13: 'Numbers to 120', 14: 'Skip Counting by 2s, 5s, 10s', 15: 'Data and Graphs',
    16: 'Measurement Capacity', 17: 'Attributes of Shapes', 18: 'Addition Fact Fluency',
    19: 'Subtraction Fact Fluency', 20: 'Two-Digit Addition', 21: 'Two-Digit Subtraction',
    22: 'Mental Math Strategies', 23: 'Time Quarter Hour', 24: 'Money Dollar Bills',
    25: 'Review Place Value', 26: 'Review Operations', 27: 'Review Measurement',
    28: 'Review Geometry', 29: 'Problem Solving Strategies', 30: 'Addition to 100',
    31: 'Subtraction from 100', 32: 'Review Fractions', 33: 'Review Time and Money',
    34: 'Test Prep Strategies', 35: 'Cumulative Review', 36: 'Math Games and Activities'
  }
  // Additional grades would follow similar patterns
};

const SCIENCE_PACING = {
  'K': {
    1: 'What is Science?', 2: 'Five Senses', 3: 'Weather and Seasons',
    4: 'Plants and Seeds', 5: 'Animals and Their Needs', 6: 'Living and Non-Living',
    7: 'Day and Night', 8: 'Earth Materials', 9: 'Water Cycle Basics',
    10: 'Push and Pull Forces', 11: 'Light and Shadows', 12: 'Sound and Vibrations',
    13: 'Animal Habitats', 14: 'Plant Life Cycle', 15: 'Seasons Changes',
    16: 'Reduce, Reuse, Recycle', 17: 'Sun and Moon', 18: 'Animal Classification',
    19: 'Properties of Matter', 20: 'Simple Machines', 21: 'Weather Patterns',
    22: 'Caring for Earth', 23: 'Human Body Basics', 24: 'Plant Parts',
    25: 'Magnets', 26: 'Temperature', 27: 'Animals Grow and Change',
    28: 'Earth and Space', 29: 'Motion and Energy', 30: 'Life Cycles Review',
    31: 'Physical Science Review', 32: 'Earth Science Review', 33: 'Scientific Method',
    34: 'Science Experiments', 35: 'Review All Topics', 36: 'Science Fair Projects'
  }
};

const ELA_PACING = {
  'K': {
    1: 'Letter Recognition A-G', 2: 'Letter Recognition H-N', 3: 'Letter Recognition O-Z',
    4: 'Letter Sounds Beginning', 5: 'Letter Sounds Middle', 6: 'Letter Sounds End',
    7: 'CVC Words Short A', 8: 'CVC Words Short E', 9: 'CVC Words Short I',
    10: 'CVC Words Short O', 11: 'CVC Words Short U', 12: 'Sight Words Set 1',
    13: 'Sight Words Set 2', 14: 'Beginning Blends', 15: 'Ending Blends',
    16: 'Digraphs sh, ch, th', 17: 'Long Vowel A', 18: 'Long Vowel E',
    19: 'Long Vowel I', 20: 'Long Vowel O', 21: 'Long Vowel U',
    22: 'Simple Sentences', 23: 'Writing Sentences', 24: 'Reading Comprehension',
    25: 'Story Elements', 26: 'Fiction vs Nonfiction', 27: 'Main Idea',
    28: 'Sequencing Events', 29: 'Making Predictions', 30: 'Retelling Stories',
    31: 'Character Analysis', 32: 'Author's Purpose', 33: 'Reading Fluency',
    34: 'Writing Stories', 35: 'Review Reading Skills', 36: 'End of Year Showcase'
  }
};

const SOCIAL_STUDIES_PACING = {
  'K': {
    1: 'All About Me', 2: 'My Family', 3: 'My School', 4: 'My Community',
    5: 'Community Helpers', 6: 'Rules and Laws', 7: 'Being a Good Citizen',
    8: 'National Symbols', 9: 'American Flag', 10: 'Pledge of Allegiance',
    11: 'Maps and Globes', 12: 'Directions N,S,E,W', 13: 'Land and Water',
    14: 'Weather and Climate', 15: 'Seasons and Time', 16: 'Holidays',
    17: 'Thanksgiving History', 18: 'Presidents Day', 19: 'American Heroes',
    20: 'Historical Figures', 21: 'Past and Present', 22: 'Then and Now',
    23: 'Transportation History', 24: 'Communication Changes', 25: 'Goods and Services',
    26: 'Needs and Wants', 27: 'Jobs and Careers', 28: 'Money and Trade',
    29: 'Cultures and Traditions', 30: 'World Geography', 31: 'Texas History',
    32: 'Texas Symbols', 33: 'Famous Texans', 34: 'Patriotic Songs',
    35: 'Review Citizenship', 36: 'End of Year Celebrations'
  }
};

/**
 * Get topic for specific week, subject, and grade
 */
export function getWeekTopic(subject, grade, week) {
  // Ensure week is in valid range
  const weekNum = Math.max(1, Math.min(36, week));

  // Select appropriate pacing guide
  let pacingGuide;

  switch (subject.toLowerCase()) {
    case 'mathematics':
    case 'math':
      pacingGuide = MATH_PACING[grade];
      break;
    case 'science':
      pacingGuide = SCIENCE_PACING[grade];
      break;
    case 'english language arts':
    case 'ela':
    case 'reading':
      pacingGuide = ELA_PACING[grade];
      break;
    case 'social studies':
    case 'history':
      pacingGuide = SOCIAL_STUDIES_PACING[grade];
      break;
    default:
      // Fallback for other subjects
      return `Week ${weekNum} - ${subject} Concepts`;
  }

  // Return topic or fallback
  if (pacingGuide && pacingGuide[weekNum]) {
    return pacingGuide[weekNum];
  }

  return `Week ${weekNum} - ${subject} Learning`;
}

/**
 * Get full semester plan
 */
export function getSemesterPlan(subject, grade, semester = 1) {
  const startWeek = semester === 1 ? 1 : 19;
  const endWeek = semester === 1 ? 18 : 36;

  const plan = {};

  for (let week = startWeek; week <= endWeek; week++) {
    plan[week] = getWeekTopic(subject, grade, week);
  }

  return plan;
}

/**
 * Get full year plan
 */
export function getYearPlan(subject, grade) {
  const plan = {};

  for (let week = 1; week <= 36; week++) {
    plan[week] = getWeekTopic(subject, grade, week);
  }

  return plan;
}

export default {
  getWeekTopic,
  getSemesterPlan,
  getYearPlan
};
