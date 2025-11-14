# Centric-App Repository Overview

**Purpose:** Support the Centric Project Management consulting initiative by providing AI-assisted workflows that transform raw curriculum inputs into production-ready educational assets.

**Target Users:** Project leadership, SMEs (subject matter experts), curriculum developers, and the Claude Code AI agent.

**Last Updated:** November 14, 2025

---

## Quick Start

**For Leadership:**
→ See "Project Status & Impact" section below

**For Developers/Collaborators:**
→ See "How to Contribute" and "Key Workflows" sections

**For SMEs Reviewing Content:**
→ See `docs/how-to/review-ai-content-sme.md`

**For Understanding the AI Agent:**
→ See `docs/CLAUDE-CODE-AGENT-ROLE.md`

---

## Project Status & Impact

### Current Phase
**Foundational Setup** – Establishing infrastructure, documentation, and workflows to support multi-month curriculum development initiative.

### Key Deliverables (In Progress)
1. ✅ AI agent role definition and system prompt
2. ✅ Repository structure and documentation framework
3. 📋 Decision log (`docs/decisions.md`)
4. 📋 Prioritized backlog (`docs/backlog.md`)
5. 📋 SME review workflows and checklists
6. 📋 Curriculum generation pipelines

### Business Value
- **Reduce SME effort:** AI handles content generation; SMEs focus on review/approval
- **Increase speed:** Batch AI production of draft curriculum (standards → lessons → assessments)
- **Improve quality:** Structured review workflows ensure rigor and alignment
- **Enable scaling:** Parameterized workflows work across multiple standards sets, subjects, and grade levels
- **Maintain coherence:** Centralized decision log and documentation keep complex projects aligned

---

## Repository Structure

```
Centric-App/
│
├── README.md                           # Project title and link to this overview
├── CONTRIBUTING.md                     # Contribution guidelines (to be added)
├── LICENSE                             # Mozilla Public License 2.0
│
├── docs/
│   ├── overview.md                     # This file - main documentation hub
│   ├── CLAUDE-CODE-AGENT-ROLE.md      # AI agent role, responsibilities, and patterns
│   ├── decisions.md                    # Running log of key decisions (to be created)
│   ├── backlog.md                      # Prioritized backlog (to be created)
│   │
│   └── how-to/
│       ├── README.md                   # Index of all how-to guides
│       ├── review-ai-content-sme.md   # Guide for SMEs reviewing AI-generated content
│       ├── run-dashboard.md            # How to launch and use dashboards
│       ├── generate-draft-questions.md # Generate assessments from standards
│       └── generate-draft-lessons.md   # Generate lesson outlines
│
├── prompts/
│   ├── README.md                       # Index of all prompts
│   ├── sme_review_checklist.md        # Template: What SMEs should check
│   ├── assessment_generation_template.md
│   ├── lesson_outline_template.md
│   └── [subject-specific or standards-specific prompts added as needed]
│
├── workflows/
│   ├── README.md                       # Index of all workflows
│   ├── curriculum_generation_pipeline.md # End-to-end flow from standards to review
│   ├── transcript_to_decisions.md      # Convert meeting transcripts to tasks
│   └── [domain-specific workflows added as needed]
│
└── [Additional folders as project develops]
    ├── dashboards/                     # HTML/CSS/JS for standards alignment UI
    ├── data/                           # Standards sets, curriculum outlines, question banks
    ├── scripts/                        # Helper tools (XLSX parsing, etc.)
    └── tests/                          # Automated tests for dashboards, data pipelines
```

### Folder Purposes

| Folder | Purpose | Audience |
|--------|---------|----------|
| `docs/` | Human-readable documentation, decisions, backlog | Everyone |
| `prompts/` | Reusable AI prompts and templates | AI agents, power users |
| `workflows/` | End-to-end process documentation | AI agents, developers |
| `dashboards/` | HTML/CSS/JS for visualization and analysis | Leadership, SMEs |
| `data/` | Standards, curriculum outlines, metadata | Developers, scripts |
| `scripts/` | Parsing, transformation, and helper tools | Developers |

---

## Core Workflows

### Workflow 1: Meeting Transcript → Decisions & Tasks

**When to use:** After every project meeting, planning session, or decision point

**Input:** Meeting transcript (transcript, notes, or recording summary)

**Process:**
1. Claude Code agent reads transcript
2. Extracts: key decisions, open questions, action items (grouped by owner)
3. Updates `docs/decisions.md` with decisions
4. Updates `docs/backlog.md` with tasks
5. Notifies relevant team members

**Output:**
- Updated `docs/decisions.md` with decision record
- Updated `docs/backlog.md` with new backlog items
- Clear action items assigned to owners

**How to trigger:** Share transcript in a request to the Claude Code agent

---

### Workflow 2: Standards → Draft Curriculum → SME Review

**When to use:** Generating new lesson plans, assessments, or rubrics from standards

**Input:**
- State/national standards document or outline
- Subject, grade level, learning objectives
- Prior curriculum examples (optional)

**Process:**
1. Claude Code agent reads standards and context
2. AI generates:
   - Draft lesson outlines
   - Draft assessments/questions
   - Draft rubrics
3. AI creates SME review checklist highlighting:
   - Alignment with standards
   - Cultural/contextual concerns
   - Rigor and cognitive complexity
4. SMEs review, annotate, and approve or request changes
5. Claude Code agent integrates feedback and updates documentation

**Output:**
- `DRAFT: SME review required` curriculum assets
- SME feedback and annotations
- Updated assets marked `READY: AI updated based on SME feedback`

**How to trigger:** Share standards document and request specific outputs (lesson outline, assessment, rubric)

---

### Workflow 3: Analyze Standards Alignment & Gaps

**When to use:** Ensuring curriculum fully covers standards; identifying weak areas

**Input:**
- Curriculum materials (lessons, assessments)
- Standards checklist
- Prior alignment analysis (if available)

**Process:**
1. Claude Code agent reads curriculum and standards
2. Creates alignment matrix:
   - Which standards are covered
   - Which standards are missing or weak
   - Which curriculum materials address each standard
3. Generates gap analysis dashboard (HTML/CSS/JS)
4. Creates actionable recommendations for SMEs

**Output:**
- Alignment matrix (spreadsheet or structured format)
- Interactive dashboard showing coverage
- List of prioritized gaps to address

**How to trigger:** Share curriculum materials and standards document

---

## How to Contribute

### Before You Start
1. Read `docs/CLAUDE-CODE-AGENT-ROLE.md` to understand the project's philosophy
2. Check `docs/decisions.md` to see prior decisions and context
3. Check `docs/backlog.md` to avoid duplicate effort

### For Meeting Transcripts
1. Share the transcript with the Claude Code agent
2. Agent will summarize, extract decisions and tasks
3. Review the updated `docs/decisions.md` and `docs/backlog.md`
4. Approve or request adjustments
5. Agent commits changes

### For Creating AI Workflows
1. Discuss desired output with the team (via meeting or issue)
2. Claude Code agent designs the workflow:
   - Input requirements
   - Process steps
   - Output format
   - SME review checklist
3. Document in `workflows/` with clear instructions
4. Test with a sample input
5. Iterate based on feedback

### For Curriculum Review (SMEs)
1. Claude Code agent provides `DRAFT` curriculum with review checklist
2. Review materials following the checklist
3. Annotate or suggest changes
4. Submit feedback to Claude Code agent
5. Agent integrates feedback and marks materials `READY`

### For Code/Dashboard Improvements
1. Open an issue describing the improvement
2. Claude Code agent analyzes current implementation
3. Proposes changes (UX, code, performance)
4. Implements in small, testable steps
5. Tests and commits

### General Git Workflow
- All development happens on `claude/centric-code-agent-setup-*` branch
- Changes are committed with clear messages
- Regular updates to documentation
- See `CONTRIBUTING.md` for detailed git practices (coming soon)

---

## Key Documents to Maintain

### `docs/decisions.md`
**What:** Running log of all key decisions made during the project

**Why:** Helps new team members understand context; prevents re-deciding settled questions

**Who updates:** Claude Code agent (from meeting transcripts) or team members directly

**Format:** Markdown with date, decision, rationale, and owner

**Example:**
```markdown
## Decision: Use Standards-First Approach

**Date:** 2025-11-14
**Owner:** [Name]
**Context:** [Brief background]
**Decision:** All curriculum is generated from state standards, not existing materials
**Rationale:** Ensures rigor and standards alignment from day one
**Status:** Active
**Related backlog items:** BACKLOG-005, BACKLOG-012
```

### `docs/backlog.md`
**What:** Prioritized list of work to be done

**Why:** Clear visibility into project scope and priorities

**Who updates:** Claude Code agent (from meetings) or team leads

**Format:** Markdown with priority, status, owner, and due date

**Example:**
```markdown
## P1: Establish Decision Log and Backlog (Due: 2025-11-14)
- [x] Create decisions.md structure
- [x] Create backlog.md structure
- [ ] Run first meeting debrief

**Owner:** Claude Code Agent
**Status:** In Progress
**Created:** 2025-11-14
**Updated:** 2025-11-14
```

### `prompts/README.md`
**What:** Index of all reusable prompts

**Why:** Help team members find the right prompt for their task

**Format:** Markdown table with prompt name, purpose, and link

**Example:**
```markdown
| Prompt | Purpose | Link |
|--------|---------|------|
| SME Review Checklist | Template for reviewing AI-generated curriculum | sme_review_checklist.md |
| Assessment Generation | Generate questions from learning objectives | assessment_generation_template.md |
```

### `workflows/README.md`
**What:** Index of all reusable workflows

**Why:** Help team members understand end-to-end processes

**Format:** Markdown with workflow name, input, output, and link to details

---

## Common Questions

### "I have a meeting transcript. What do I do?"
Share it with the Claude Code agent and request: "Turn this into decisions and backlog items." The agent will update `docs/decisions.md` and `docs/backlog.md`, then notify you.

### "I need to generate draft lesson plans. How?"
1. Gather the standards document and grade level
2. Request from Claude Code agent: "Generate draft lesson outlines for [standards] at [grade]"
3. Agent produces DRAFT lessons with SME review checklist
4. Share with SME for feedback
5. Agent integrates feedback and updates

### "How do I review AI-generated curriculum as an SME?"
See `docs/how-to/review-ai-content-sme.md` for a step-by-step guide.

### "Can I contribute without being technical?"
Yes! If you're an SME, you can review curriculum (see above). If you have feedback on workflows, share it in the backlog or via a meeting transcript. The Claude Code agent will handle implementation.

### "How do I report a problem or suggest an improvement?"
1. Open an issue in GitHub (if available)
2. Or add to `docs/backlog.md` with priority
3. Or mention it in a meeting (agent will capture it)

---

## Technology & Tools

### Current Stack
- **Git** – Version control
- **GitHub** – Repository hosting
- **Markdown** – Documentation
- **Claude Code** – AI agent for automation and workflows

### Planned/Future
- **Jekyll** – Static site generation for GitHub Pages
- **HTML/CSS/JS** – Interactive dashboards
- **Node.js or Python** – Data transformation scripts
- **GitHub Actions** – Automated workflows (CI/CD)

### Why These Choices?
- **Low barrier to entry** for non-technical SMEs and teachers
- **Built on GitHub** so team members only need one account
- **Version controlled** so we can track changes and revert if needed
- **Scalable** from simple Markdown to complex interactive dashboards

---

## Getting Help

### For general questions:
- Check this file first
- Check `docs/how-to/` for task-specific guidance
- Ask in a team meeting or Slack

### For AI agent questions:
- Review `docs/CLAUDE-CODE-AGENT-ROLE.md`
- Check the Claude Code documentation

### For contributing code/workflows:
- See "How to Contribute" section above
- Look at existing prompts and workflows as examples

### For project strategy/direction:
- Check `docs/decisions.md` for context
- Talk to project leadership

---

## Next Steps

1. **Review this document** with the team
2. **Create `docs/decisions.md`** with prior decisions (if any)
3. **Create `docs/backlog.md`** with initial priorities
4. **Run first workflow** (e.g., meeting transcript → decisions/backlog)
5. **Iterate based on feedback** and update documentation

---

*Last updated: November 14, 2025 by Claude Code Agent*
