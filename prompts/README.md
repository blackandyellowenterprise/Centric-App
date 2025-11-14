# Centric Curriculum Prompts & Workflows

**Purpose:** Reusable AI prompts and templates for generating and reviewing curriculum from standards.

**Audience:** AI agents, curriculum developers, and SMEs

---

## Quick Navigation

### 🤖 For AI Agents (Generating Curriculum)

1. **[standards_analysis_prompt.md](standards_analysis_prompt.md)**
   - What to use: When you have a raw standards CSV file
   - Goal: Parse standards into structured, normalized format
   - Output: JSON with standards hierarchy, learning objectives, and relationships

2. **[curriculum_generation_prompt.md](curriculum_generation_prompt.md)**
   - What to use: When you have normalized standards and need to create lessons
   - Goal: Generate lesson plans, activities, and assessments aligned to standards
   - Output: Markdown lesson plans with complete instructional guidance

### 👨‍🏫 For SMEs (Reviewing Curriculum)

3. **[sme_review_checklist.md](sme_review_checklist.md)**
   - What to use: When you're reviewing AI-generated DRAFT curriculum
   - Goal: Ensure accuracy, quality, and classroom appropriateness
   - Output: Structured feedback that AI will integrate into FINAL curriculum

---

## The Complete Workflow

### Phase 1: Parse Standards (AI)
```
State Standards CSV → [standards_analysis_prompt.md] → Normalized JSON
```
**Input:** Raw standards file (e.g., Kansas Mathematics Standards)
**Process:** Extract hierarchy, learning objectives, prerequisites
**Output:** Machine-readable standards structure
**Time:** 1-2 hours (automated)

### Phase 2: Generate Curriculum (AI)
```
Normalized Standards → [curriculum_generation_prompt.md] → DRAFT Lesson Plans
```
**Input:** Normalized standards + Centric proficiency levels
**Process:** Create lessons, activities, assessments
**Output:** Markdown lesson plans (human-readable)
**Time:** 4-8 hours (automated)

### Phase 3: Review Curriculum (SME)
```
DRAFT Lesson Plans → [sme_review_checklist.md] → SME Feedback
```
**Input:** AI-generated lesson plans
**Process:** Review for accuracy, quality, classroom fit
**Output:** Structured feedback with specific suggestions
**Time:** 20-30 minutes per lesson

### Phase 4: Revise & Finalize (AI)
```
DRAFT + SME Feedback → Integrate Feedback → FINAL Curriculum
```
**Input:** Lesson plans + feedback from checklist
**Process:** Update content based on feedback
**Output:** READY lesson plans
**Time:** 2-4 hours (automated)

---

## How to Use Each Prompt

### Prompt 1: Standards Analysis

**When to use:**
- You have a raw standards CSV file (from state or national source)
- You need to parse hierarchical structure into machine-readable format
- You want to identify learning progressions and relationships

**How to use:**

```
1. Get the CSV file (e.g., Kansas_Mathematics_Grade_6.csv)
2. Send to Claude Code agent with this prompt:
   "Use [standards_analysis_prompt.md] to analyze this standards file"
3. Agent will:
   - Parse hierarchy (Grade → Domain → Cluster → Standard)
   - Extract learning objectives
   - Identify prerequisites and related standards
   - Flag any issues or unclear language
4. Receive JSON output + summary markdown
```

**Expected output:**
- `standards-normalized.json` (machine-readable)
- `standards-summary.md` (human-readable for SME review)
- `standards-alignment-map.csv` (relationships and prerequisites)

---

### Prompt 2: Curriculum Generation

**When to use:**
- You have normalized standards (from Prompt 1)
- You want to create complete lesson plans with activities and assessments
- You need content generated from scratch based on standards

**How to use:**

```
1. Get normalized standards JSON (from Prompt 1)
2. Send to Claude Code agent with this prompt:
   "Use [curriculum_generation_prompt.md] to create lessons for Grade 6 Math"
3. Specify:
   - Subject & Grade
   - Unit or standard(s) to focus on
   - Preferred format (Markdown, JSON, etc.)
   - Any specific requirements
4. Agent will:
   - Create 3-5 complete lesson plans
   - Include warm-up, instruction, activities, assessment
   - Provide differentiation strategies
   - Add materials lists and timing
5. Receive DRAFT lessons marked for SME review
```

**Expected output:**
- `unit-name_lesson1.md` (complete lesson plan)
- `unit-name_lesson2.md` (complete lesson plan)
- `unit-name_assessments.md` (summative assessments)
- `unit-name_rubric.md` (proficiency rubric)

**Note:** All output is marked **DRAFT: SME review required**

---

### Prompt 3: SME Review Checklist

**When to use:**
- You're reviewing AI-generated DRAFT curriculum before using in classrooms
- You want a structured way to verify accuracy and quality
- You want to ensure lessons are appropriate for your students

**How to use:**

```
1. Get DRAFT lesson plans (from Prompt 2)
2. As SME, review using this checklist:
   - Print or open digital copy
   - Review each section (Standards Alignment, Content Accuracy, etc.)
   - Check boxes and add comments
3. Provide specific feedback:
   - Mark errors or misconceptions
   - Note timing issues
   - Suggest real-world examples for your students
   - Rate overall quality
4. Submit completed checklist to Claude Code agent
5. Agent will:
   - Parse your feedback
   - Make revisions
   - Resubmit for final approval
```

**Expected output:**
- Completed checklist with feedback
- Annotated lesson (if you prefer)
- Clear list of changes needed

---

## Example: Complete Workflow

### Scenario: Generate Grade 6 Math Curriculum

```
WEEK 1: Setup & Standards Analysis
├─ Get Kansas Mathematics Standards (Grade 6) CSV
├─ Run Prompt 1: Standards Analysis
├─ SME validates normalized standards
└─ Produce: standards-normalized.json

WEEK 2: Draft Curriculum Generation
├─ Run Prompt 2: Curriculum Generation
├─ Focus on Ratios & Proportional Relationships unit (3 weeks of lessons)
├─ Produce: 12-15 DRAFT lesson plans with activities & assessments
└─ Mark as "DRAFT: SME REVIEW REQUIRED"

WEEK 3: SME Review & Feedback
├─ 3 SMEs review using Prompt 3 checklist
├─ Each completes checklist with comments (30 min per lesson)
├─ Collect feedback: accuracy issues, timing problems, examples
└─ Produce: Structured feedback

WEEK 4: Revisions & Finalization
├─ AI agent integrates all SME feedback
├─ Make specific changes based on checkl
├─ Resubmit for final approval
└─ Mark as "READY" when approved

RESULT: 12-15 polished, curriculum-aligned, classroom-tested lesson plans
        in 4 weeks with minimal SME effort (8-10 hours review time total)
```

---

## Key Points for Success

### For AI Agents Using These Prompts

✓ **Follow the prompt structure** – Don't skip steps or combine phases
✓ **Mark output status** – Always indicate "DRAFT" vs. "READY"
✓ **Provide all materials** – Include materials lists, timing, differentiation
✓ **Flag uncertainties** – If unsure, note it for SME review
✓ **Be specific** – Generic lessons aren't useful; provide real examples

### For SMEs Using the Checklist

✓ **Be thorough** – Use every section; don't skip anything
✓ **Be specific** – "Needs revision" isn't helpful; say exactly what and why
✓ **Use real-world knowledge** – Flag things that won't work in your classroom
✓ **Mark priority** – Distinguish "must fix" from "nice to have"
✓ **Return promptly** – 2-3 days allows agent to iterate quickly

### For Project Managers Coordinating Workflow

✓ **Plan parallel work** – While AI generates, collect standards from other states
✓ **Route feedback efficiently** – Combine multiple SME reviews before revision
✓ **Track versions** – Keep original, DRAFT, and FINAL separate
✓ **Document decisions** – Use `docs/decisions.md` to log workflow changes
✓ **Celebrate wins** – Share completed units with team and leadership

---

## Customization & Variations

### For Different Subjects
These prompts work for Math, ELA, Science, Social Studies, and CTE. Adjust examples and cognitive demand as needed.

### For Different Grade Levels
Modify vocabulary, real-world contexts, and activity complexity for your target grade.

### For Different Proficiency Levels
The SME review checklist can be adapted for Gifted, Regular, or Intervention classes.

### For Different Time Frames
Extend or compress lessons based on available time. Indicate in Prompt 2 if generating for 40-min vs. 60-min blocks.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 14, 2025 | Initial release: Standards Analysis, Curriculum Generation, SME Review Checklist |
| [Future] | TBD | Subject-specific variations, assessment templates, differentiation frameworks |

---

## Contributing

To suggest improvements to these prompts:
1. Use them on a pilot curriculum unit
2. Document what worked and what didn't
3. Submit suggestions to [Project Lead]
4. Changes will be reviewed and incorporated into next version

---

## Questions or Support

- **How do I run these prompts?** See `docs/overview.md` for workflow examples
- **I'm an SME unsure about the checklist** → Start with Section 2 & 4 (Content & Assessment)
- **I'm an AI agent; where do I start?** → Begin with `standards_analysis_prompt.md` + a raw standards CSV
- **Need help?** Contact [Project Lead] or see `docs/how-to/`

---

**Status:** Ready for production use. These prompts have been tested on Kansas Mathematics standards.

**Next:** Apply these prompts to generate your first complete curriculum unit, then share results with leadership.
