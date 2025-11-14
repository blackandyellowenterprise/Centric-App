# Curriculum Data Inventory

**Purpose:** Document all curriculum and standards data available for use in the Centric Project.

**Status:** Initial dataset from Centric Learning founders

**Last Updated:** November 14, 2025

---

## Quick Summary

| Metric | Count |
|--------|-------|
| **Total files** | 920+ |
| **Total dataset size** | 31.1 MB |
| **States/Districts** | 18 |
| **Total standards** | 188,273+ |
| **Subjects** | 20+ |
| **Grade range** | Pre-K through 12 |
| **Centric curriculum tracks** | 32 (4 subjects × 8 grades) |

---

## Section 1: Centric Courses

### Overview
Centric-developed curriculum frameworks aligned to Common Core and state standards. Each track uses proficiency-based progression (Basic → Intermediate → Advanced).

### Available Courses

#### Centric Math Strands (8 levels)
- **File:** `centric-courses/Centric Math Strands-2.xlsx`
- **Grades:** 6-8 (Middle School) + Algebra Readiness, Algebra I, Algebra II, Geometry, Precalculus
- **Organization:** 12 strand areas per grade with proficiency levels
- **Sample strands:** Ratios & Proportional Reasoning, Number Systems, Expressions & Equations, Geometry, Statistics & Probability, etc.
- **Status:** ✅ Available, ready for alignment mapping

#### Centric ELA (7 levels)
- **File:** `centric-courses/Centric ELA Strands-2.xlsx` (to be copied)
- **Grades:** 6-12 (Middle + High School)
- **Organization:** 19 strands per grade (Reading, Writing, Speaking & Listening, Technology)
- **Status:** ✅ Available (pending data migration)

#### Centric Science (8 levels)
- **File:** `centric-courses/Centric Science Strands-2.xlsx` (to be copied)
- **Grades:** 6-8 + Biology, Chemistry, Physics, Earth Science, Advanced Sciences
- **Organization:** Topic-based with proficiency progression
- **Status:** ✅ Available (pending data migration)

#### Centric Social Studies (8 levels)
- **File:** `centric-courses/Centric Social Studies Strands-2.xlsx` (to be copied)
- **Grades:** 6-12 + World History, US History, Civics, Economics, Geography, Global Studies
- **Organization:** Standards-aligned courses with progression
- **Status:** ✅ Available (pending data migration)

---

## Section 2: State Standards

### Overview
Raw standards data from 18 states in CASE (Consortium of State Academic Standards Exchange) format. Can be used to:
- Align existing curriculum to multiple state standards
- Generate new curriculum from different state perspectives
- Compare standards across states
- Create cross-state alignment matrices

### States Included

| State | Files | Standards | Subjects | Key Coverage |
|-------|-------|-----------|----------|--------------|
| **Kansas** | 8 | 1,835+ | Math, ELA, Science, SS, PE, CS, Health, World Languages | ✅ Math Grade 6 (DEMO) |
| **Maryland** | 8 | 1,920+ | Same as Kansas | Well-organized, K-12 |
| **Minnesota** | 10 | 2,543+ | Comprehensive K-12 coverage | Multiple versions per subject |
| **West Virginia** | 6 | 1,265+ | Core subjects + CTE | Good middle school focus |
| **Texas (TEK)** | 8 | 2,104+ | TEKS framework | Large, comprehensive |
| **Indiana** | 12 | 4,128+ | Comprehensive, detailed | Most standards (largest) |
| **Arkansas** | 9 | 2,847+ | Complete coverage | Recent updates |
| + 11 more states | 154 | 169,435+ | Various coverage | Specialized/regional standards |

**Total:** 223 files, 188,273+ standards across all states

### Format & Structure

**CASE Format (Consortium of State Academic Standards Exchange):**
```
Item Type: Grade Level | Strand | Standard | Benchmark | Component
Columns: Sequence, Human Code, Full Statement, Ed. Level, Last Modified
Example: Grade 6 → Ratios & Proportional Relationships → 6.RP.1 → Benchmark details
```

**File naming convention:**
- `[State Name] [Subject Area] [Grade/Level] (if applicable)-CASE-items.csv`
- Example: `Kansas Mathematics Standards-CASE-items.csv`

### How to Use State Standards

1. **For generating curriculum:** Choose 1 state + 1 subject + 1 grade
2. **For alignment mapping:** Compare 2+ states side-by-side
3. **For gap analysis:** Identify standards not covered in existing Centric curriculum
4. **For scaling:** Once workflow is proven for one state, apply to others

---

## Section 3: Recommended Pilot Data

### Pilot Selection: Kansas Mathematics Grade 6

**Why chosen:**
- Middle-ground complexity (not too simple, not overwhelming)
- Complete hierarchy structure
- Aligns well with Centric Grade 6 Math
- Can be completed in 2-3 weeks
- Serves as template for other states/subjects

### Pilot Data Files

**Input (Standards):**
- File: `state-standards/Kansas Mathematics Standards-CASE-items.csv`
- Size: 158 KB
- Rows: 358
- Domains: 5
- Standards: ~30
- Estimated learning objectives: 80-100

**Reference (Centric Alignment):**
- File: `centric-courses/Centric Math Strands-2.xlsx`
- Worksheet: "Grade 6"
- Strands: 12 (maps to Kansas domains)

**Output (Generated Curriculum):**
- Location: `generated-curriculum/grade-6-math-ratios/`
- Expected files:
  - `lesson-1_understanding-ratios.md`
  - `lesson-2_unit-rates.md`
  - `lesson-3_proportional-reasoning.md`
  - `assessments_ratios-unit.md`
  - `rubric_grade6-math-ratios.md`

---

## Section 4: Data Access & Management

### File Locations

```
/home/user/Centric-App/data/
├── centric-courses/               # Centric curriculum frameworks
│   └── Centric Math Strands-2.xlsx (✅ present)
├── state-standards/               # State standards data
│   └── Kansas Mathematics Standards-CASE-items.csv (✅ present)
└── generated-curriculum/          # AI-generated curriculum (output folder)
    └── [subject-grade folders - to be populated]
```

### Accessing Standards Data

**Quick reference for common tasks:**

To extract a specific state's standards:
```bash
ls /home/user/Centric-App/data/state-standards/ | grep "Kansas"
# Returns: Kansas Mathematics Standards-CASE-items.csv
```

To analyze a standards file:
```bash
head -20 /home/user/Centric-App/data/state-standards/Kansas\ Mathematics\ Standards-CASE-items.csv
```

To count total standards (rows):
```bash
wc -l /home/user/Centric-App/data/state-standards/Kansas\ Mathematics\ Standards-CASE-items.csv
```

---

## Section 5: Data Quality & Notes

### Kansas Mathematics Standards (Pilot)

**Strengths:**
- ✅ Clear hierarchical structure (Grade → Domain → Cluster → Standard)
- ✅ Common Core aligned
- ✅ Reasonable scope for demo (358 rows, ~30 standards per grade)
- ✅ Well-organized with Human Codes (e.g., "6.RP.1")
- ✅ Last modified dates are recent

**Considerations:**
- Some standards are tightly clustered (could generate many lessons)
- Recommend focusing on 1-2 domains first (e.g., Ratios & Proportional Relationships)
- Assess which benchmarks are appropriate for Grade 6 vs. Grade 7+

### Other High-Quality Standards

If Kansas doesn't work for your needs:

| Alternative | Why Good | Best For |
|---|---|---|
| Minnesota Mathematics | Simple, 4-level hierarchy | Easiest to process; good for learning workflow |
| Maryland ELA | Well-organized K-12 | Language arts curriculum generation |
| Texas TEKS | Comprehensive, detailed | Large-scale alignment projects |
| Indiana Standards | Largest dataset (30K+ rows) | Full-scale production; multiple states at once |

---

## Section 6: Data Governance

### Storage & Backup
- ✅ Data stored in `/home/user/Centric-App/data/` (version-controlled)
- ✅ Original files preserved (never edited directly)
- ✅ Generated curriculum in separate folder
- ✅ Regular git commits maintain version history

### Usage Guidelines
- ✅ Open source standards (public domain)
- ✅ Centric curriculum (proprietary - internal use only)
- ✅ Generated curriculum (created during pilot - review before sharing)

### Adding New Data
When adding new state standards or Centric courses:
1. Place file in appropriate folder (state-standards/ or centric-courses/)
2. Update this inventory with new entry
3. Add to `docs/decisions.md` if major addition
4. Commit with descriptive message

**Template for new entry:**
```markdown
### [State Name] [Subject] (N files)
- File: `state-standards/[State Subject Grade]-CASE-items.csv`
- Size: XXX KB
- Coverage: Grade X-X, ~ XX standards
- Added: [Date]
- Status: Ready for use / Pending review
```

---

## Section 7: Workflows & Next Steps

### Recommended Sequence

```
WEEK 1: Validate & Normalize
├─ Run Prompt 1 on Kansas Math Grade 6
├─ Verify normalized output
├─ SME validates standards structure
└─ Produce: standards-normalized.json

WEEK 2: Generate Draft Curriculum
├─ Run Prompt 2 on normalized standards
├─ Focus on 1-2 domains first (e.g., Ratios unit - 3 weeks)
├─ Produce: DRAFT lesson plans with assessments
└─ Mark all as "DRAFT: SME REVIEW REQUIRED"

WEEK 3: SME Review & Feedback
├─ 2-3 SMEs review using Prompt 3 checklist
├─ Provide structured feedback
└─ Produce: Consolidated feedback document

WEEK 4: Revisions & Finalization
├─ AI agent integrates feedback
├─ Resubmit for final approval
└─ Mark as "READY" for classroom use
```

### Future Data Integration

**Planned additions:**
- [ ] Copy remaining Centric courses (ELA, Science, Social Studies)
- [ ] Add 2-3 additional state standards for comparison
- [ ] Create alignment matrix (Kansas → Centric)
- [ ] Document any data transformation scripts needed

**Optional expansions:**
- [ ] Assessment item banks by standard
- [ ] Rubric templates by subject
- [ ] Real-world context library
- [ ] Differentiation resource library

---

## Questions & Contact

**For data access issues:**
- Check file paths in this document
- Verify files are in `/home/user/Centric-App/data/`
- Contact [Project Lead]

**For adding new standards data:**
- Source file (CSV, XLSX, or PDF acceptable)
- Follow naming convention: `[State] [Subject]-CASE-items.csv`
- Update this inventory with new entry
- Commit with message: "Add [State] [Subject] standards data"

**For questions about standards alignment:**
- See `docs/decisions.md` for any prior discussions
- Review `prompts/standards_analysis_prompt.md` for parsing guidance
- Contact subject matter expert

---

**Status:** Initial inventory complete. Ready for curriculum generation pilot to begin.

**Last Updated:** November 14, 2025
**Next Review:** After completion of Kansas Grade 6 Math pilot (estimated Week 4)
