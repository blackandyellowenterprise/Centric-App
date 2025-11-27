import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEKS_DATA_DIR = path.join(__dirname, '../../data/teks');

/**
 * Get list of available subjects
 */
export async function getSubjects() {
  try {
    const indexPath = path.join(TEKS_DATA_DIR, 'index.json');
    const indexData = await fs.readFile(indexPath, 'utf-8');
    const index = JSON.parse(indexData);
    return index.subjects;
  } catch (error) {
    console.error('Error reading subjects:', error);
    return [
      'Mathematics',
      'Science',
      'English Language Arts',
      'Social Studies',
      'Fine Arts',
      'Physical Education',
      'Health Education',
      'Technology Applications'
    ];
  }
}

/**
 * Get list of available grade levels
 */
export async function getGradeLevels() {
  try {
    const indexPath = path.join(TEKS_DATA_DIR, 'index.json');
    const indexData = await fs.readFile(indexPath, 'utf-8');
    const index = JSON.parse(indexData);
    return index.grades;
  } catch (error) {
    return ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  }
}

/**
 * Get TEKS standards for a specific subject and grade
 */
export async function getTEKS(subject, grade) {
  try {
    const fileName = subject.toLowerCase().replace(/\s+/g, '-') + '.json';
    const filePath = path.join(TEKS_DATA_DIR, fileName);

    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    return data[grade] || null;
  } catch (error) {
    console.error(`Error reading TEKS for ${subject} grade ${grade}:`, error);
    return null;
  }
}

/**
 * Search TEKS standards by keyword
 */
export async function searchTEKS(keyword, subject = null, grade = null) {
  const results = [];
  const subjects = subject ? [subject] : await getSubjects();

  for (const subj of subjects) {
    try {
      const fileName = subj.toLowerCase().replace(/\s+/g, '-') + '.json';
      const filePath = path.join(TEKS_DATA_DIR, fileName);

      const fileData = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);

      const grades = grade ? [grade] : Object.keys(data);

      for (const gradeLevel of grades) {
        const gradeData = data[gradeLevel];
        if (!gradeData) continue;

        for (const [strandCode, strand] of Object.entries(gradeData.strands)) {
          for (const expectation of strand.expectations) {
            if (expectation.statement.toLowerCase().includes(keyword.toLowerCase())) {
              results.push({
                subject: subj,
                grade: gradeLevel,
                strandCode,
                strandName: strand.name,
                expectationCode: expectation.code,
                expectation: expectation.statement
              });
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error searching ${subj}:`, error);
    }
  }

  return results;
}

/**
 * Get random TEKS standard for a subject and grade (for testing/demo)
 */
export async function getRandomTEKS(subject, grade) {
  const teksData = await getTEKS(subject, grade);

  if (!teksData || !teksData.strands) {
    return null;
  }

  const strandKeys = Object.keys(teksData.strands);
  if (strandKeys.length === 0) return null;

  const randomStrand = teksData.strands[strandKeys[Math.floor(Math.random() * strandKeys.length)]];

  if (!randomStrand.expectations || randomStrand.expectations.length === 0) {
    return null;
  }

  const randomExpectation = randomStrand.expectations[
    Math.floor(Math.random() * randomStrand.expectations.length)
  ];

  return {
    strandName: randomStrand.name,
    code: randomExpectation.code,
    statement: randomExpectation.statement
  };
}

export default {
  getSubjects,
  getGradeLevels,
  getTEKS,
  searchTEKS,
  getRandomTEKS
};
