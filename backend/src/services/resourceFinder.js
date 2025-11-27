/**
 * Find open educational resources for lesson plans
 * All resources are freely available without login
 */

/**
 * Open Educational Resource Database
 * These are curated links to free, high-quality educational content
 */
const OER_SOURCES = {
  // Video platforms
  videos: {
    khanAcademy: 'https://www.khanacademy.org',
    crashCourse: 'https://www.youtube.com/@crashcourse',
    pbsLearning: 'https://www.pbslearningmedia.org',
    nasa: 'https://www.nasa.gov/stem-ed-resources',
    natGeoKids: 'https://kids.nationalgeographic.com',
    smithsonian: 'https://www.si.edu/learn'
  },

  // Reading materials
  reading: {
    ck12: 'https://www.ck12.org',
    openStax: 'https://openstax.org',
    readWorks: 'https://www.readworks.org',
    newsela: 'https://newsela.com',
    commonLit: 'https://www.commonlit.org'
  },

  // Interactive games
  games: {
    funBrain: 'https://www.funbrain.com',
    mathPlayground: 'https://www.mathplayground.com',
    sheppardsoftware: 'https://www.sheppardsoftware.com',
    abcya: 'https://www.abcya.com'
  },

  // Worksheets and printables
  worksheets: {
    educationCom: 'https://www.education.com/worksheets',
    teacherVision: 'https://www.teachervision.com',
    mathDrills: 'https://www.math-drills.com',
    superTeacher: 'https://www.superteacherworksheets.com'
  }
};

/**
 * Find educational resources for a given topic
 * @param {string} topic - The lesson topic
 * @param {string} grade - Grade level
 * @param {string} subject - Subject area
 * @param {string[]} interests - Student interests
 * @returns {Object} Organized resources for 5 days
 */
export async function findResources(topic, grade, subject, interests = []) {
  const normalizedSubject = subject.toLowerCase();
  const normalizedTopic = topic.toLowerCase();

  // Generate resources for each day of the week
  const resources = {
    reading: [],
    videos: [],
    worksheets: [],
    games: [],
    offlineActivities: []
  };

  // Day 1: Introduction resources
  resources.reading.push([
    {
      title: `Introduction to ${topic}`,
      url: `${OER_SOURCES.reading.ck12}/browse`,
      description: `Learn the basics of ${topic} with interactive reading materials`,
      source: 'CK-12 Foundation'
    },
    {
      title: `${topic} Overview`,
      url: `${OER_SOURCES.reading.openStax}`,
      description: 'Comprehensive overview and background information',
      source: 'OpenStax'
    }
  ]);

  resources.videos.push([
    {
      title: `${topic} Explained`,
      url: `${OER_SOURCES.videos.khanAcademy}`,
      description: `Video introduction to ${topic}`,
      duration: '5-10 minutes',
      source: 'Khan Academy'
    },
    {
      title: `Kids Learn ${topic}`,
      url: `${OER_SOURCES.videos.pbsLearning}`,
      description: 'Engaging video for young learners',
      duration: '8-12 minutes',
      source: 'PBS LearningMedia'
    }
  ]);

  // Day 2: Deep dive resources
  resources.reading.push([
    {
      title: `Understanding ${topic} Deeply`,
      url: `${OER_SOURCES.reading.readWorks}/article`,
      description: 'Detailed explanation with examples',
      source: 'ReadWorks'
    }
  ]);

  resources.videos.push([
    {
      title: `${topic} In-Depth`,
      url: `${OER_SOURCES.videos.crashCourse}`,
      description: 'Comprehensive video lesson',
      duration: '10-15 minutes',
      source: 'Crash Course'
    }
  ]);

  resources.worksheets.push([
    {
      title: `${topic} Practice Worksheet`,
      url: `${OER_SOURCES.worksheets.educationCom}`,
      description: 'Printable practice problems',
      gradeLevel: grade,
      source: 'Education.com'
    },
    {
      title: `${topic} Guided Notes`,
      url: `${OER_SOURCES.worksheets.teacherVision}`,
      description: 'Fill-in-the-blank note-taking guide',
      source: 'TeacherVision'
    }
  ]);

  // Day 3: Practice resources
  resources.games.push([
    {
      title: `${topic} Practice Game`,
      url: `${OER_SOURCES.games.mathPlayground}`,
      description: 'Interactive practice with immediate feedback',
      source: 'Math Playground'
    },
    {
      title: `${topic} Challenge`,
      url: `${OER_SOURCES.games.funBrain}`,
      description: 'Fun challenges to reinforce learning',
      source: 'FunBrain'
    }
  ]);

  resources.worksheets.push([
    {
      title: `${topic} Practice Problems`,
      url: `${OER_SOURCES.worksheets.mathDrills}`,
      description: 'Multiple difficulty levels available',
      source: 'Math-Drills.com'
    }
  ]);

  // Day 4: Real-world application
  resources.reading.push([
    {
      title: `${topic} in Real Life`,
      url: `${OER_SOURCES.videos.smithsonian}/learn`,
      description: 'Discover how people use this concept',
      source: 'Smithsonian Learning Lab'
    }
  ]);

  resources.videos.push([
    {
      title: `${topic} Applications`,
      url: `${OER_SOURCES.videos.nasa}`,
      description: 'See this concept in action',
      duration: '10 minutes',
      source: 'NASA'
    }
  ]);

  resources.offlineActivities.push([
    {
      title: `Hands-On ${topic} Project`,
      description: `Create a physical model or demonstration of ${topic} using household items`,
      materials: ['Paper', 'Pencils', 'Household items'],
      duration: '30-45 minutes'
    },
    {
      title: `${topic} Scavenger Hunt`,
      description: `Find examples of ${topic} in your home or neighborhood`,
      materials: ['Paper for recording', 'Camera (optional)'],
      duration: '20-30 minutes'
    }
  ]);

  // Day 5: Review and assessment
  resources.games.push([
    {
      title: `${topic} Review Game`,
      url: `${OER_SOURCES.games.sheppardsoftware}`,
      description: 'Comprehensive review game',
      source: 'Sheppard Software'
    }
  ]);

  resources.worksheets.push([
    {
      title: `${topic} Assessment`,
      url: `${OER_SOURCES.worksheets.superTeacher}`,
      description: 'Check understanding with this quiz',
      source: 'Super Teacher Worksheets'
    }
  ]);

  // Additional days (copy from above to fill 5 days)
  while (resources.reading.length < 5) {
    resources.reading.push(resources.reading[0]);
  }
  while (resources.videos.length < 5) {
    resources.videos.push(resources.videos[0]);
  }
  while (resources.worksheets.length < 5) {
    resources.worksheets.push(resources.worksheets[0]);
  }
  while (resources.games.length < 5) {
    resources.games.push(resources.games[0]);
  }
  while (resources.offlineActivities.length < 5) {
    resources.offlineActivities.push([
      {
        title: `${topic} Activity`,
        description: `Practice ${topic} with hands-on learning`,
        materials: ['Basic school supplies'],
        duration: '20-30 minutes'
      }
    ]);
  }

  // Add interest-based resources if interests are provided
  if (interests.length > 0) {
    addInterestBasedResources(resources, topic, interests);
  }

  return resources;
}

/**
 * Add additional resources based on student interests
 */
function addInterestBasedResources(resources, topic, interests) {
  for (const interest of interests) {
    const interestLower = interest.toLowerCase();

    // Add interest-specific activity
    resources.offlineActivities[0].push({
      title: `${topic} and ${interest}`,
      description: `Explore ${topic} through your interest in ${interest}`,
      materials: ['Materials related to ' + interest],
      duration: '30-45 minutes'
    });

    // Add interest-specific video suggestion
    if (interestLower.includes('sports') || interestLower.includes('football') ||
        interestLower.includes('basketball') || interestLower.includes('soccer')) {
      resources.videos[0].push({
        title: `${topic} in Sports`,
        url: `${OER_SOURCES.videos.pbsLearning}`,
        description: `See how ${topic} is used in sports and athletics`,
        duration: '8-12 minutes',
        source: 'PBS LearningMedia'
      });
    }

    if (interestLower.includes('art') || interestLower.includes('music') ||
        interestLower.includes('drawing')) {
      resources.videos[0].push({
        title: `${topic} in Art`,
        url: `${OER_SOURCES.videos.smithsonian}`,
        description: `Discover ${topic} through art and creativity`,
        duration: '10 minutes',
        source: 'Smithsonian'
      });
    }

    if (interestLower.includes('space') || interestLower.includes('astronomy') ||
        interestLower.includes('planets')) {
      resources.videos[0].push({
        title: `${topic} in Space`,
        url: `${OER_SOURCES.videos.nasa}`,
        description: `Learn about ${topic} with NASA`,
        duration: '10-15 minutes',
        source: 'NASA Education'
      });
    }
  }
}

/**
 * Search for specific resource by keyword
 */
export async function searchResources(keyword, resourceType = 'all') {
  // This would ideally integrate with actual APIs
  // For now, return curated links based on keyword

  const results = [];

  if (resourceType === 'all' || resourceType === 'videos') {
    results.push({
      type: 'video',
      title: `${keyword} Video Lessons`,
      url: `${OER_SOURCES.videos.khanAcademy}/search?query=${encodeURIComponent(keyword)}`,
      source: 'Khan Academy'
    });
  }

  if (resourceType === 'all' || resourceType === 'reading') {
    results.push({
      type: 'reading',
      title: `${keyword} Reading Materials`,
      url: `${OER_SOURCES.reading.ck12}/search?q=${encodeURIComponent(keyword)}`,
      source: 'CK-12'
    });
  }

  if (resourceType === 'all' || resourceType === 'games') {
    results.push({
      type: 'game',
      title: `${keyword} Learning Games`,
      url: `${OER_SOURCES.games.mathPlayground}/search.html?q=${encodeURIComponent(keyword)}`,
      source: 'Math Playground'
    });
  }

  return results;
}

export default {
  findResources,
  searchResources,
  OER_SOURCES
};
