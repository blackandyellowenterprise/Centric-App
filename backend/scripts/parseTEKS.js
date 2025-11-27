import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map of TEKS subjects to grade levels
const SUBJECTS = {
  'Mathematics': { chapter: 111, file: 'TEXAS_Chapter 111. Mathematics-CASE-items.csv' },
  'Science': { chapter: 112, file: 'TEXAS_Chapter 112. Science-CASE-items.csv' },
  'English Language Arts': { chapter: 110, file: 'TEXAS_Chapter 110. English Language Arts and Reading-CASE-items.csv' },
  'Social Studies': { chapter: 113, file: 'TEXAS_Chapter 113. Social Studies-CASE-items.csv' },
  'Fine Arts': { chapter: 117, file: 'TEXAS_Chapter 117. Fine Arts-CASE-items.csv' },
  'Physical Education': { chapter: 116, file: 'TEXAS_Chapter 116. Physical Education-CASE-items.csv' },
  'Health Education': { chapter: 115, file: 'TEXAS_Chapter 115. Health Education-CASE-items.csv' },
  'Technology Applications': { chapter: 126, file: 'TEXAS_Chapter 126. Technology Applications-CASE-items.csv' }
};

const GRADE_MAPPING = {
  'Kindergarten': 'K',
  'Grade 1': '1',
  'Grade 2': '2',
  'Grade 3': '3',
  'Grade 4': '4',
  'Grade 5': '5',
  'Grade 6': '6',
  'Grade 7': '7',
  'Grade 8': '8',
  'Grade 9': '9',
  'Grade 10': '10',
  'Grade 11': '11',
  'Grade 12': '12'
};

async function parseTEKSFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');

    return new Promise((resolve, reject) => {
      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error)
      });
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

function organizeByGradeAndStrand(data) {
  const organized = {};
  let currentGrade = null;
  let currentStrand = null;

  for (const row of data) {
    const itemType = row['Item Type'];
    const humanCode = row['Human Code'];
    const statement = row['Full Statement'];

    // Detect grade level
    if (itemType === 'Grade/Course') {
      // Extract grade from statement
      for (const [gradeName, gradeCode] of Object.entries(GRADE_MAPPING)) {
        if (statement.includes(gradeName)) {
          currentGrade = gradeCode;
          organized[currentGrade] = { strands: {}, introduction: '' };
          break;
        }
      }
    }

    // Capture introduction
    if (itemType === 'Introduction' && currentGrade) {
      if (!organized[currentGrade].introduction) {
        organized[currentGrade].introduction = '';
      }
      organized[currentGrade].introduction += statement + ' ';
    }

    // Capture strand
    if (itemType === 'Strand' && currentGrade) {
      currentStrand = humanCode;
      organized[currentGrade].strands[currentStrand] = {
        name: statement,
        expectations: []
      };
    }

    // Capture student expectations
    if (itemType === 'Student Expectation' && currentGrade && currentStrand) {
      organized[currentGrade].strands[currentStrand].expectations.push({
        code: humanCode,
        statement: statement
      });
    }
  }

  return organized;
}

async function parseAllTEKS() {
  const inputDir = path.join(__dirname, '../../state-standards/State Standards (raw data input)/Texas TEKs Input');
  const outputDir = path.join(__dirname, '../data/teks');

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  const results = {};

  for (const [subjectName, subjectInfo] of Object.entries(SUBJECTS)) {
    console.log(`📖 Parsing ${subjectName}...`);

    const filePath = path.join(inputDir, subjectInfo.file);

    try {
      const data = await parseTEKSFile(filePath);
      const organized = organizeByGradeAndStrand(data);

      results[subjectName] = {
        chapter: subjectInfo.chapter,
        grades: organized
      };

      // Save individual subject file
      const outputFile = path.join(outputDir, `${subjectName.toLowerCase().replace(/\s+/g, '-')}.json`);
      await fs.writeFile(outputFile, JSON.stringify(organized, null, 2));

      console.log(`   ✅ Saved to ${outputFile}`);
    } catch (error) {
      console.error(`   ❌ Error parsing ${subjectName}:`, error.message);
    }
  }

  // Save combined index file
  const indexFile = path.join(outputDir, 'index.json');
  await fs.writeFile(indexFile, JSON.stringify({
    subjects: Object.keys(SUBJECTS),
    grades: Object.values(GRADE_MAPPING),
    lastUpdated: new Date().toISOString()
  }, null, 2));

  console.log(`\n✅ TEKS parsing complete! Files saved to ${outputDir}`);
}

// Run the parser
parseAllTEKS().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
