# Curriculum Generation Prompt

**Purpose:** Generate draft lesson plans, learning objectives, and instructional guidance from normalized state standards.

**Status:** TEMPLATE - For AI agents to use when creating curriculum content from standards

**Audience:**
- Primary: AI agents and curriculum generation systems
- Secondary: SMEs for review and feedback

---

## Input Expected

1. **Normalized Standards** (JSON or structured format)
   - Standards with learning objectives, DOK levels, prerequisites
   - Related standards mapped
   - Unit/cluster organization

2. **Centric Proficiency Levels** (if available)
   - Basic, Intermediate, Advanced progressions
   - "I can" statements aligned to standard

3. **Context Information**
   - Subject area (Math, ELA, Science, Social Studies)
   - Grade level
   - Unit name and scope
   - Time allocation (weeks, days)

**Example Input:**
```
Subject: Mathematics
Grade: 6
Unit: Ratios and Proportional Relationships (3 weeks)
Standards: 6.RP.1, 6.RP.2, 6.RP.3 (3 standards)
Format: JSON with normalized standards
```

---

## Generation Workflow

### Phase 1: Lesson Planning

For each standard or cluster of related standards, generate:

#### Lesson 1: "Understanding Ratios"
**Standard(s):** 6.RP.1

**Lesson Objectives (aligned to Centric proficiency levels):**
- BASIC: Students can identify and describe ratios in real-world contexts
- INTERMEDIATE: Students can express ratios in multiple forms (3:1, 3 to 1, 3/1)
- ADVANCED: Students can justify why different ratio notations are equivalent

**Learning Activities (60 minutes):**
1. **Hook/Engagement (10 min)** – Real-world ratio scenario
   - Example: "A pizza recipe calls for 3 cups flour to 1 cup water"
   - Question: "What happens if we want to make 3 pizzas?"

2. **Direct Instruction (20 min)** – Teach ratio concept
   - Definition and examples
   - Three ways to write ratios
   - Why ratios matter

3. **Guided Practice (15 min)** – Work together
   - Identify ratios in classroom/school
   - Convert between ratio notations
   - Scaffold as needed

4. **Independent Practice (10 min)** – Student application
   - Worksheet or digital activity
   - Differentiated by proficiency level

5. **Exit Ticket (5 min)** – Check understanding
   - Quick formative assessment
   - Informs re-teaching decisions

**Materials Needed:**
- Chart paper, markers
- Ratio cards or tiles
- Worksheet (provided)
- Projector for examples

**Differentiation Notes:**
- STRUGGLING: Pre-teach equivalent amounts; use manipulatives
- ON LEVEL: Standard activities as described
- ADVANCED: Create word problems for peers; explore ratio relationships

**Common Misconceptions:**
- Confusing ratios with fractions (2:3 is not 2/3)
- Not understanding order matters (3:1 ≠ 1:3)
- Assuming ratios simplify like fractions do

---

### Phase 2: Assessment Design

For each standard, generate assessments at multiple levels:

#### Formative Assessments (During Learning)
- **Check for Understanding:** Exit tickets, quick writes, think-pair-share
- **Observation Rubric:** What to listen/look for during activities
- **Misconception Probes:** Questions that reveal common errors

#### Summative Assessments (After Unit)
- **Performance Task:** Real-world application problem
  - Example: "Design a recipe and calculate ingredient quantities for a party"
  - Rubric provided

- **Multiple Choice:** Standards-aligned, DOK-leveled
  - DOK 1: Recall ratio notation
  - DOK 2: Identify ratios in context
  - DOK 3: Solve multi-step ratio problems

- **Short Answer:** Explain reasoning
  - Example: "Why is 3:1 different from 1:3? Use pictures or words."

---

### Phase 3: Proficiency Rubric

Create a 3-4 level rubric showing:

| Proficiency | Indicator | Example |
|-------------|-----------|---------|
| BASIC | Can identify what a ratio is | "This picture shows a 3:1 ratio of cats to dogs" |
| INTERMEDIATE | Can express ratios in multiple forms and identify in context | "3:1, 3 to 1, or 3/1 all show the same ratio" |
| ADVANCED | Can explain ratios deeply and create own applications | "These ratios are equivalent because they represent the same relationship" |
| ABOVE GRADE | Can extend to proportional reasoning and unit rates | "If one ratio is 3:1 and another is 6:2, they're equivalent" |

---

### Phase 4: Connections & Extensions

Identify:
- **Prior knowledge:** What students must know first
- **Future applications:** How this standard connects to next grade
- **Cross-curricular:** Links to other subjects (Science, Social Studies)
- **Real-world contexts:** Authentic applications

**Example:**
- Prior: Multiplication, division, equivalent fractions
- Future: Unit rates, proportions, scaling
- Cross-curricular: Recipe ratios (Home Ec), map scales (Social Studies)
- Real-world: Cooking, model building, map reading

---

## Content Guidelines

### Clarity & Precision
- Use grade-appropriate language
- Define or avoid jargon
- Provide examples before abstractions
- Show work and thinking process

### Engagement & Relevance
- Use student interests and diverse contexts
- Include real-world problems
- Vary activity types
- Build from concrete to abstract

### Inclusivity & Accessibility
- Provide multiple modalities (visual, kinesthetic, auditory)
- Offer graphic organizers and templates
- Consider English learners and special needs
- Avoid cultural bias in examples

### Rigor & Cognitive Demand
- Match DOK level to standard and proficiency level
- Include higher-order thinking questions
- Provide scaffolds, not simplifications
- Push thinking without overwhelming

---

## Output Format

### Option 1: Markdown (Human-Readable)
```
# Unit: Ratios and Proportional Relationships
## Lesson 1: Understanding Ratios
### Learning Objectives
...
### Activities
...
### Assessment
...
```

### Option 2: JSON (Machine-Readable)
```json
{
  "unit": "Ratios",
  "standards": ["6.RP.1", "6.RP.2"],
  "lessons": [
    {
      "title": "Understanding Ratios",
      "duration": 60,
      "objectives": [...],
      "activities": [...]
    }
  ]
}
```

### Option 3: Google Docs / Shared Drive (For SME Editing)
- Markdown converted to a formatted document
- Comments enabled for SME feedback
- Version tracking enabled

---

## Quality Checklist

Before passing to SME review, verify:

- ✓ Each standard has at least one clearly defined lesson
- ✓ Learning objectives are specific, measurable, and proficiency-leveled
- ✓ Activities are grade-appropriate and engaging
- ✓ Differentiation strategies are included
- ✓ Assessments align to standards and objectives
- ✓ Common misconceptions are addressed
- ✓ Real-world contexts and relevance are clear
- ✓ Inclusive/accessible for diverse learners
- ✓ Estimated time allocations are realistic
- ✓ Connections to prior/future learning are noted

---

## Prompt Template for AI Agents

```
Generate 3 lesson plans for Grade 6 Mathematics, Unit: Ratios and Proportional Relationships.

STANDARDS (normalized):
[INSERT JSON with 6.RP.1, 6.RP.2, 6.RP.3]

CENTRIC PROFICIENCY LEVELS (if available):
[INSERT proficiency progressions]

CONSTRAINTS:
- 60 minutes per lesson
- Include real-world contexts
- Address common misconceptions
- Provide differentiation for 3 proficiency levels
- Include formative and summative assessments

OUTPUT FORMAT:
- Markdown with clear sections
- One lesson per file or combined
- Include all materials and timing

TONE:
- Clear and instructional
- Accessible to grade 6 teachers
- Assume SMEs will review and edit
```

---

## Notes for AI Agents

- **Be specific:** Generic lessons aren't helpful. Provide actual activities, exact timing, real examples.
- **Anticipate misconceptions:** Show you understand common errors students make.
- **Write for real teachers:** Consider their constraints (time, materials, diverse classes).
- **Mark as DRAFT:** Flag what needs SME verification or adjustment.
- **Suggest extensions:** Provide ideas for differentiation and enrichment.

---

## Example Output: Lesson 1 (Abbreviated)

```markdown
# Lesson 1: Understanding Ratios (Grade 6 Math)

## Learning Objectives
- BASIC: Identify what a ratio is; describe as a comparison of two quantities
- INTERMEDIATE: Express ratios in three forms; identify ratios in real contexts
- ADVANCED: Explain why ratio notation matters; create own ratio examples

## Warm-Up (5 min)
Display: A photo of a pizza with 3 slices pepperoni, 1 slice plain
Q: "What do you notice about the slices?"
Expected responses: "More pepperoni", "3 and 1", etc.
Transition: "We call this a RATIO."

## Direct Instruction (15 min)
1. Define ratio: "A ratio compares two quantities"
2. Show three ways to write: 3:1, "3 to 1", 3/1
3. Emphasize: Order matters! 3:1 ≠ 1:3
4. Real examples: (Teacher:Student ratio, Girls:Boys in class, etc.)

## Guided Practice (15 min)
Activity 1: Find classroom ratios (5 min)
- "Count boys vs. girls. Write the ratio."
- "Count desks vs. students. Write the ratio."

Activity 2: Notation conversion (10 min)
- I write: 2:5
- You write: _____ to _____ and _____/_____

## Independent Work (20 min)
Worksheet: "Identify & Write Ratios"
- Differentiated versions (Basic, Intermediate, Advanced)
- Include pictures for concrete understanding

## Exit Ticket (5 min)
"Write a ratio from your life. Explain it using two different notations."

---
DRAFT: Ready for SME review. Flag any misconceptions I've missed or timing concerns.
```

---

**Ready to use!** Combine with normalized standards JSON + Centric proficiency levels to begin generating curriculum.
