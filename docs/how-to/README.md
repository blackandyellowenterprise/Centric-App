# How-To Guides for Centric Curriculum Workflows

**Purpose:** Quick step-by-step guides for common tasks in the Centric Project

**Audience:** Team members, SMEs, project managers

---

## Quick Navigation

### For Curriculum Developers & Educators
- **[Generating Draft Curriculum from Standards](#generating-draft-curriculum)** – Create lessons, assessments, rubrics from state standards
- **[Reviewing AI-Generated Curriculum as an SME](#sme-review)** – Provide feedback on DRAFT curriculum
- **[Running the Standards Analysis Workflow](#standards-analysis)** – Parse and normalize state standards documents

### For Project Managers
- **[Managing Meeting Transcripts & Decisions](#meeting-management)** – Extract decisions and tasks from meetings
- **[Scaling Workflows Across States/Subjects](#scaling)** – Replicate successful workflow for new contexts

### For Dashboards & Visualization
- **[Creating Standards Alignment Dashboards](#dashboards)** – Build interactive tools showing curriculum coverage

---

## GENERATING DRAFT CURRICULUM FROM STANDARDS {#generating-draft-curriculum}

### Use Case
You have state standards and want AI to generate complete lesson plans, activities, and assessments.

### Time Required
- Setup: 15 minutes
- Generation: 4-8 hours (automated)
- Total: 1-2 days

### Step 1: Prepare Your Input

**You need:**
- ✓ State standards document (Excel, CSV, or PDF)
- ✓ Subject area (Math, ELA, Science, Social Studies)
- ✓ Grade level or course name
- ✓ Specific unit/standard(s) to focus on (optional but recommended)

**Example:**
```
Input: Kansas Mathematics Standards Grade 6
Focus: Ratios and Proportional Relationships (6.RP.1-6.RP.3)
Desired output: Lesson plans (3 weeks), assessments, rubric
```

---

### Step 2: Normalize the Standards (Optional but Recommended)

**If your standards are raw/unprocessed:**

1. Request Standards Analysis from Claude Code agent:
   > "Analyze these state standards using `prompts/standards_analysis_prompt.md`"

2. Agent will provide:
   - Hierarchical structure (Grade → Domain → Standard → Benchmark)
   - Learning objectives for each standard
   - Prerequisites and relationships
   - Common misconceptions

3. **Approve** normalized structure with SME sign-off

**Time:** 1-2 hours

**Output:** `standards-normalized.json` (use for next step)

---

### Step 3: Generate Draft Curriculum

1. **Request Curriculum Generation:**

   > "Using `prompts/curriculum_generation_prompt.md`, generate lesson plans for [Grade/Subject] that covers these standards: [list standards]. Include learning objectives for all proficiency levels, activities, assessments, and differentiation."

2. **Specify your preferences:**
   - Number of lessons (3-5 recommended for week-long unit)
   - Time per lesson (60 min, 45 min, etc.)
   - Real-world contexts important to your students
   - Any specific requirements

3. **Wait for automated generation**
   - Agent creates complete lesson plans
   - Marks all output as **DRAFT: SME review required**
   - Outputs in markdown (easy to read and edit)

**Time:** 4-8 hours (happens automatically)

**Output location:** `/home/user/Centric-App/generated-curriculum/[subject]-[grade]/`

**Output files:**
- `LESSON_1_[title].md`
- `LESSON_2_[title].md`
- `LESSON_3_[title].md` (etc.)
- `UNIT_ASSESSMENT_and-rubric.md`
- `UNIT_PLAN_standards-normalized.json`

---

### Step 4: Review & Collect Feedback (SME)

1. **Open DRAFT lesson in your preferred editor** (Google Docs, Word, markdown viewer)

2. **Use the SME Review Checklist** (`prompts/sme_review_checklist.md`)
   - Print or open digitally
   - Go through each section:
     - Standards alignment ✓
     - Content accuracy ✓
     - Instructional quality ✓
     - Assessments ✓
     - Practical implementation ✓

3. **Provide specific feedback:**
   - Circle errors or unclear sections
   - Note in margin: "ACCURACY: [problem]"
   - Suggest: "Better real-world example: [idea]"
   - Rate overall quality (1-5)

4. **Mark approval status:**
   - ☐ APPROVED (ready to use)
   - ☐ APPROVED WITH REVISIONS (usable after specific changes)
   - ☐ REQUEST REVISION (major changes needed)
   - ☐ REJECT (recommend starting over)

5. **Submit checklist** to Claude Code agent or project manager

**Time:** 20-30 minutes per lesson

---

### Step 5: AI Integrates Feedback

1. **Agent receives feedback checklist(s)**

2. **Updates curriculum:**
   - Corrects accuracy errors
   - Adjusts timing if needed
   - Revises examples based on context
   - Strengthens differentiation based on feedback

3. **Resubmits updated version**
   - Marked as **READY** (if SME approved)
   - OR requests additional feedback

**Time:** 2-4 hours

---

### Step 6: Deploy & Document

1. **Finalized curriculum** is ready for classroom use

2. **Document in decision log:**
   ```markdown
   ## Decision: Approved Kansas Grade 6 Math Ratios Unit

   **Date:** 2025-11-21
   **Standards:** 6.RP.1, 6.RP.2, 6.RP.3
   **Status:** READY for use
   **Reviewed by:** [SME names]
   **Feedback addressed:** All accuracy issues corrected; timing adjusted
   ```

3. **Share with team** via project folder or shared drive

---

## REVIEWING AI-GENERATED CURRICULUM AS AN SME {#sme-review}

### Use Case
You're a teacher reviewing DRAFT curriculum generated from standards to ensure accuracy and quality.

### Time Required
20-30 minutes per lesson plan

### Your Role
- Verify content accuracy
- Check appropriateness for your students
- Identify real-world examples
- Suggest timing adjustments
- Flag any misconceptions or bias

### Step-by-Step

#### 1. Get the DRAFT Curriculum
You'll receive:
- Folder with 3-5 lesson plans (markdown files)
- Unit assessment document
- Unit plan with standards overview
- File: `prompts/sme_review_checklist.md`

#### 2. Read Through Lesson (Skim First)
**5 minutes:** Get a sense of the content and flow

#### 3. Complete Review Checklist (Section by Section)
**15 minutes:** Use the SME Review Checklist

**Key sections:**
- **Section 1: Standards Alignment** – Does it match the standard language?
- **Section 2: Content Accuracy** – Is all the math/science correct?
- **Section 3: Instructional Quality** – Are activities engaging and doable?
- **Section 4: Assessments** – Do they measure the objectives?
- **Section 5: Practical Implementation** – Will this work in your classroom?
- **Section 6: Overall Assessment** – Quality rating and approval status

#### 4. Add Specific Feedback
Instead of: "Needs revision"
Write: "TIMING: The Guided Practice has 4 activities but only 20 minutes. Reduce to 2-3 activities."

Instead of: "Good lesson"
Write: "Strong hook using pizza example—students will relate. Real-world contexts clear."

#### 5. Mark Approval Status
Choose ONE:
- ☐ **APPROVED** – Ready to use immediately
- ☐ **APPROVED WITH REVISIONS** – Usable after specific changes
- ☐ **REQUEST REVISION** – Major changes needed; resubmit
- ☐ **REJECT** – Recommend starting over

#### 6. Return Checklist
Send completed checklist to:
- Claude Code agent (if in digital form)
- Project manager (if printed)
- Email to [team inbox]

**Timeline:** 2-3 days for all lessons

---

### What Happens Next
The AI agent will:
1. Parse your feedback
2. Make the changes you requested
3. Resubmit for final approval (if you marked "REQUEST REVISION")
4. Mark as READY when complete

---

## STANDARDS ANALYSIS WORKFLOW {#standards-analysis}

### Use Case
You have a raw standards CSV file and want to parse it into a structured, usable format.

### Time Required
1-2 hours (automated)

### Step 1: Gather Standards File
**You need:**
- ✓ CSV file of state standards (CASE format preferred)
- ✓ Subject area
- ✓ Grade level or range

**Example file:**
- `Kansas Mathematics Standards-CASE-items.csv`
- Location: `/home/user/Centric-App/data/state-standards/`

---

### Step 2: Request Analysis

Send to Claude Code agent:

> "Analyze the state standards file [filename] using prompts/standards_analysis_prompt.md. Extract the hierarchy (Grade→Domain→Standard→Benchmark), identify learning objectives, note prerequisites and related standards, and flag any unclear language."

---

### Step 3: Review Normalized Output

Agent provides:
- `standards-normalized.json` – Machine-readable structure
- `standards-summary.md` – Human-readable for SME review
- `standards-alignment-map.csv` – Relationships and prerequisites

**SME review:** Scan for accuracy (15 min)
- Do hierarchies make sense?
- Are learning objectives clear?
- Any standards missing or duplicated?
- Misconceptions identified?

---

### Step 4: Use for Curriculum Generation

Pass normalized JSON to curriculum generation workflow (see above)

---

## MEETING MANAGEMENT {#meeting-management}

### Use Case
Extract key decisions and action items from meeting transcripts and organize into decision log and backlog.

### Time Required
30 minutes (automated) + 15 minutes review

### Step 1: Record Meeting

**Options:**
- ✓ Transcript (text): Copy/paste from Zoom, Google Meet, etc.
- ✓ Notes: Provide detailed meeting notes
- ✓ Recording summary: Describe main topics discussed

---

### Step 2: Request Transcript Analysis

Send to Claude Code agent:

> "Analyze this meeting transcript using docs/overview.md#meeting-intelligence. Extract: (1) Key decisions made, (2) Open questions, (3) Action items grouped by owner/priority, (4) Connections to existing backlog items."

**Provide:**
- Meeting transcript/notes
- Context (e.g., "Strategic planning meeting," "Curriculum review")
- Participants
- Date

---

### Step 3: Review Results

Agent provides:
- Updates to `docs/decisions.md` (key decisions logged)
- Updates to `docs/backlog.md` (new action items added)
- Summary of action items by owner

**Your review (15 min):**
- Are decisions accurate?
- Did any action items get missed?
- Are priorities correct?
- Add any corrections

---

### Step 4: Approve & Commit

1. Review with team leads if needed
2. Approve updates
3. Agent commits changes with message:
   ```
   Capture decisions and backlog from [Date] meeting
   ```

---

## SCALING WORKFLOWS ACROSS STATES/SUBJECTS {#scaling}

### Use Case
You've successfully generated curriculum for one state/subject. Now you want to replicate for other states/subjects.

### Time Required
Varies by complexity; typically 3-5 days per new state/subject

### Step 1: Replicate the Process

Use same workflow as original, but with new input:
1. ✓ Different state standards
2. ✓ Different subject
3. ✓ Different grade level

---

### Step 2: Adapt Prompts if Needed

**For different states:** Standards format may vary
- Regenerate normalized standards if CSV structure differs
- Adjust prompt to identify hierarchy structure first

**For different subjects:** Contexts and examples differ
- Update `curriculum_generation_prompt.md` with subject-specific examples
- Provide real-world contexts relevant to subject

---

### Step 3: Run Workflows in Parallel

While AI generates curriculum for State 1:
- SMEs can review State 0 curriculum
- Collect new standards files for State 2-3
- Plan next priorities

---

### Step 4: Document Workflow Variations

If a state/subject requires different approach:
- Note in `docs/decisions.md`
- Update prompts to reflect variation
- Create new checklist if needed

---

## CREATING STANDARDS ALIGNMENT DASHBOARDS {#dashboards}

### Use Case
Build an interactive dashboard showing which state standards are covered by Centric curriculum.

### Time Required
2-3 days (development + testing)

### Coming Soon
This workflow is planned but not yet implemented. Will include:
- HTML/CSS/JavaScript dashboard template
- Data structure for alignment matrix
- Interactive visualization (coverage %, gap analysis, etc.)

---

## Common Troubleshooting

### "My standards file won't parse"
**Solution:** Check file format (CSV vs. Excel). If Excel, convert to CSV first.

### "The curriculum generated is too generic"
**Solution:** Provide more context in generation request—specific real-world examples, student demographics, learning styles.

### "I don't understand the normalized standards format"
**Solution:** Read `standards-summary.md` (human-readable version) instead of JSON.

### "The assessment questions are too easy/hard"
**Solution:** Note DOK level needed in feedback checklist. Specify target grade in generation request.

### "I need curriculum faster"
**Solution:** Skip Standards Normalization step; provide already-organized standards. Focus on key standard(s) only, not entire grade level.

---

## Getting Help

**Questions about:**
- **Workflows:** See `docs/overview.md`
- **System prompt:** See `docs/CLAUDE-CODE-AGENT-ROLE.md`
- **Prompts:** See `prompts/README.md`
- **Specific task:** See the how-to guide above
- **Project decisions:** See `docs/decisions.md`
- **Backlog/priorities:** See `docs/backlog.md`

**Contact:** [Project Lead]

---

**Status:** Initial guides complete. Additional guides (dashboards, advanced workflows) coming soon.

**Version:** 1.0 | **Last Updated:** November 14, 2025
