# Standards Analysis & Normalization Prompt

**Purpose:** Parse and normalize state standards documents into a structured format that can be used for curriculum generation.

**Status:** TEMPLATE - For AI agents to use when processing state standards CSVs

---

## Input Expected

A CSV file containing standards in CASE (Consortium of State Academic Standards Exchange) format with columns:
- `Item Type` (Grade Level, Strand, Standard, Benchmark, etc.)
- `Sequence` (hierarchical numbering)
- `Human Code` (state-specific code like K.1.1.1)
- `Full Statement` (the actual standard text)
- `Ed. Level` (grade level or cluster)
- `Last Modified` (date)

**Example:** Kansas Mathematics Standards for Grade 6

---

## Processing Steps

### Step 1: Parse Hierarchy
Extract the complete hierarchy from Grade Level → Final Level:

```
Grade Level: [e.g., "6"]
Domain: [e.g., "Ratios and Proportional Relationships"]
Cluster: [e.g., "Understand ratio concepts and use ratio reasoning"]
Standard: [e.g., "Understand the concept of a ratio and use ratio language"]
Components: [List of 2-5 related benchmarks or outcomes]
```

### Step 2: Normalize Statements
For each standard/benchmark, extract:
- **Code:** Unique identifier (e.g., "6.RP.1")
- **Statement:** Full text of the standard
- **Depth of Knowledge (DOK):** Infer level (1=recall, 2=skill/concept, 3=strategic, 4=extended)
- **Cognitive Domain:** (Remember, Understand, Apply, Analyze, Evaluate, Create)
- **Subject:** Subject area (Math, ELA, Science, etc.)
- **Grade:** Grade level

### Step 3: Identify Learning Objectives
For each standard, extract or infer:
- **What students will know:** Content knowledge required
- **What students will be able to do:** Skills/competencies
- **Evidence of learning:** How students demonstrate mastery

### Step 4: Flag Alignment Opportunities
Note:
- Which standards are related/overlapping
- Which standards would work well together in a unit
- Which standards build on prior knowledge
- Prerequisite skills needed

### Step 5: Create Output Artifact

Generate JSON structure:

```json
{
  "source": "Kansas Mathematics Standards Grade 6",
  "subject": "Mathematics",
  "grade": "6",
  "standards_count": 30,
  "domains": [
    {
      "name": "Ratios and Proportional Relationships",
      "code": "6.RP",
      "standards": [
        {
          "id": "6.RP.1",
          "statement": "Understand the concept of a ratio and use ratio language to describe a ratio relationship between two quantities.",
          "dok": 2,
          "cognitive_domain": "Understand",
          "learning_objectives": {
            "know": ["Definition of ratio", "Types of ratio relationships"],
            "do": ["Identify ratios in real-world contexts", "Write ratios in multiple forms"],
            "demonstrate": ["Can express a ratio using 3:1, 3 to 1, 3/1 notation"]
          },
          "prerequisites": ["Multiplication facts", "Division facts"],
          "related_standards": ["6.RP.2", "6.RP.3"]
        }
      ]
    }
  ]
}
```

---

## Quality Checks

Before passing to curriculum generation, verify:

- ✓ All standards have been parsed and hierarchically organized
- ✓ No duplicate standards
- ✓ All statements are clear and unambiguous
- ✓ DOK levels are realistic and justified
- ✓ Learning objectives are specific and measurable
- ✓ At least 80% of standards have identified relationships
- ✓ Prerequisites are identified for complex skills

---

## Output Files

1. **standards-normalized.json** – Full normalized structure (machine-readable)
2. **standards-summary.md** – Human-readable summary for SME review
3. **standards-alignment-map.csv** – Relationships and prerequisites (for planning)

---

## Notes for AI Agents

- Standards documents often have inconsistent formatting or terminology. Normalize to consistent language.
- When DOK or cognitive domain is ambiguous, note your reasoning.
- If a standard is poorly written or unclear, flag it for SME review.
- Look for opportunities to cluster standards into coherent units.
- Ensure mathematical precision in STEM subjects; preserve nuance in humanities.

---

## Example: Kansas Grade 6 Math - Ratios Unit

**Input:** 3 standards from Ratios and Proportional Relationships domain

```
6.RP.1: Understand the concept of a ratio and use ratio language to describe a ratio relationship between two quantities.
6.RP.2: Understand the concept of a unit rate associated with a ratio a:b with b ≠ 0, and use rate language in the context of a ratio relationship.
6.RP.3: Use ratio and rate reasoning to solve real-world and mathematical problems.
```

**Processed Output:**

```json
{
  "unit": "Ratios and Proportional Relationships",
  "standards": 3,
  "prerequisite_skills": [
    "Multiplication and division facts",
    "Identifying equivalent fractions",
    "Comparing quantities"
  ],
  "learning_arc": [
    {
      "stage": "Foundation (6.RP.1)",
      "focus": "Understand what a ratio is and how to express it",
      "dok": 2
    },
    {
      "stage": "Extension (6.RP.2)",
      "focus": "Scale unit rates and understand proportional relationships",
      "dok": 3
    },
    {
      "stage": "Application (6.RP.3)",
      "focus": "Solve multi-step problems using ratio reasoning",
      "dok": 3
    }
  ]
}
```

---

**Status:** Ready for AI agent use. Send standardizes CSV + this prompt to begin workflow.
