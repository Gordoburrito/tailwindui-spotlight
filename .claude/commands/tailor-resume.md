---
description: Tailor resume.json to a specific job description using contributions history
argument-hint: <job-description-text OR path-to-job-description-file>
allowed-tools: [Read, Write, Glob, Grep, Bash]
---

# Tailor Resume to Job Description

You are a resume optimization expert. Your job is to produce a **tailored `resume.json`** that maximizes relevance to a target job description while staying honest and keeping the same JSON structure and approximate size as the current resume.

## Inputs

1. **Job Description**: Provided as the argument to this command: `$ARGUMENTS`
   - If the argument looks like a file path (contains `/` or ends in `.md`, `.txt`, `.json`), read that file to get the job description.
   - Otherwise, treat the argument text itself as the job description.

2. **Contributions Source**: Read the file `src/data/ROOSTERGRIN_CONTRIBUTIONS.md` — this is the complete technical portfolio with every project, bullet, and technology. Each project has a **"Resume-Ready Highlights"** section with polished, impact-first bullets. **Prefer these highlights** as your starting point — adapt and combine them to match the JD. Use the detailed PR breakdowns below each section for additional context when deciding which highlights to emphasize.

3. **Current Resume Template**: Read the file `src/data/resume.json` — this is the structure and approximate size to match.

## Process

### Step 1: Analyze the Job Description
Extract and list:
- **Required skills** (languages, frameworks, tools, platforms)
- **Desired skills** (nice-to-haves)
- **Key themes** (e.g., "distributed systems", "AI/ML", "full-stack", "data pipelines", "mobile", "infrastructure")
- **Seniority signals** (what level of ownership/leadership they want)
- **Industry context** (what domain the company operates in)

### Step 2: Select & Prioritize Experience
From `ROOSTERGRIN_CONTRIBUTIONS.md`, select the **most relevant highlights** for each job entry. Rules:
- **Rooster Grin (Full Stack Engineer, Apr 2022–present)**: Pick the **5 strongest bullets** from the contributions that best match the job description. Rewrite them to echo the JD's language and keywords. This is the main role — make it shine.
- **Classic Parts Pro (CPP)**: Keep if the job values AI/ML, data engineering, or Python. Adjust the single bullet to emphasize whatever the JD cares about (e.g., if they want "data pipelines", lean into that; if they want "AI", lean into the AI matching angle). Drop this entry entirely if it's not relevant.
- **Rooster Grin (Software Engineer, Jul 2021–Apr 2022)**: Keep as a growth narrative. Pick **2 bullets** that show breadth or relevant skills. Can be condensed if space is tight.
- **Advest Marketing**: Keep as foundation. Adjust the single bullet to match JD keywords where honest.

### Step 3: Optimize Skills Section
Reorder and adjust the skills categories to front-load what the JD prioritizes:
- Put the most relevant category **first**
- Within each category, put the most relevant items **first**
- Add skills that are in the contributions but missing from the current resume if the JD specifically asks for them
- Remove or de-emphasize skills the JD doesn't care about to stay concise
- You may rename categories to better match JD language (e.g., "AI & ML" → "Machine Learning & AI" if the JD uses that phrasing)

### Step 4: Tune the Title & Meta
- `contact.title`: Should match the job title or a close strategic variant. If the JD says "Senior Software Engineer", use that. If it says "AI Engineer" and Gordon's experience supports it, use it.
- `meta.title`: `"Gordon Lewis - {title}"`
- `meta.description`: One line matching the JD's domain/focus

### Step 5: Validate Size & Structure
- The output JSON **must** have the exact same schema as the current `resume.json`
- Aim for approximately the **same number of total highlight bullets** (within ±2)
- Each bullet should be **1-2 sentences max**, roughly the same length as the originals
- Keep the `\u00a0` (non-breaking space) pattern at the end of bullets for print formatting
- Keep `education` unchanged
- Preserve all JSON field names exactly

## Resume Bullet Quality Rules

Every bullet MUST follow these rules. Use the **Action + Project + Result** format:
- **Action**: Strong verb describing what YOU did
- **Project**: The problem you solved or thing you built
- **Result**: The impact, quantified when possible

### Rule 1: Lead with Impact, Not Technology
Start with the outcome a hiring manager cares about. Technology goes in the middle or end.
- BAD: "Architected a Python/FastAPI backend from the ground up on AWS — Pydantic-validated APIs, PostgreSQL data layer, Docker-containerized deployments."
- GOOD: "Reduced website migration timelines from 90 days to under 10 minutes by building an AI-powered content generation platform that automatically produces website copy, assigns images, and provisions hosting infrastructure."

The bad version is a tech shopping list. The good version tells a story a non-technical recruiter can understand AND a technical reviewer can appreciate.

### Rule 2: Write for Humans, Not Developers
Avoid package names, file names, library-specific jargon, and GitHub-specific language. A recruiter should understand what you accomplished.
- BAD: "Built background push notification system using Expo TaskManager — category-based filtering, environment-aware display logic, and systematic crash isolation via toggle-based debugging."
- GOOD: "Built a background push notification system that reliably delivered patient call and message alerts even when the app was closed, systematically isolating and resolving crash-causing edge cases across devices."

No one outside your team knows what "Expo TaskManager" or "toggle-based debugging" means. Describe the PROBLEM you solved and the RESULT.

### Rule 3: Show What You BUILT, Not What You MAINTAINED
Never write bullets that say you "owned" or "enforced" something without showing what you actually created or improved.
- BAD: "Owned an enterprise SaaS platform serving millions of records, enforcing strict data-integrity and compliance constraints."
- GOOD: "Scaled the messaging infrastructure to deliver hundreds of millions of SMS and email communications while building international compliance features that expanded the platform's reach to the UK and Ireland."

### Rule 4: One Clear Accomplishment Per Bullet
Each bullet should tell one story. If you have two good accomplishments, make two bullets.
- BAD: "Defined integration architecture unifying four vendor APIs into a single data layer; implemented auth audit trails, bot protection, and compliance-ready messaging infrastructure handling international SMS routing."
- GOOD: "Architected a unified integration layer connecting four third-party healthcare systems into a single platform, eliminating manual data entry and ensuring consistent patient records across all vendor systems."

### Rule 5: Quantify Results Whenever Possible
Use real numbers — percentages, time saved, scale served, cost reduced.
- BAD: "Built data pipelines with shared libraries and comprehensive tests."
- GOOD: "Built an AI-powered data pipeline matching parts to 317,000+ vehicles, reducing API costs by 60–80% through a cascading strategy that tries deterministic matching before falling back to AI."

### Rule 6: Contextualize Your Impact
Provide enough context that a reader understands WHY this mattered, not just WHAT you did.
- BAD: "Designed configuration interfaces for missed call automation and business hours management."
- GOOD: "Designed configuration interfaces for missed call automation and business hours management, enabling practice staff to customize automated patient outreach without developer support."

The "enabling..." clause shows who benefited and what changed.

### Rule 7: Only Include Tech Stack When It Adds Value
Mention specific technologies only when: (a) the JD asks for them, (b) they show meaningful technical breadth, or (c) they're universally recognized (React, Python, AWS). Never mention obscure packages or internal tool names.
- BAD: "Built with @dnd-kit, Draft.js, DOMPurify, React Query, and psutil"
- GOOD: "Built with React/TypeScript on AWS" (only if the JD asks for React/TypeScript/AWS)

## Resume Boosting Strategies

Apply these in addition to the bullet quality rules:

1. **Mirror JD Language**: If the JD says "microservices", use "microservices" (not "distributed services"). If they say "CI/CD", use "CI/CD".
2. **Quantify Everything**: Use numbers from the contributions (e.g., "750+ websites", "317,000+ vehicles", "hundreds of millions of messages", "90 days to 10 minutes", "60-80% cost reduction").
3. **Action Verbs**: Developed, Built, Designed, Reduced, Led, Scaled, Automated, Resolved, Established, Introduced, Created, Maintained.
4. **Show Ownership**: Emphasize end-to-end ownership, sole engineer roles, and production responsibility.
5. **Match Seniority**: If the role is senior, emphasize architecture decisions, mentoring, system design. If mid-level, emphasize shipping and breadth.
6. **Keyword Density**: Naturally weave in JD keywords — ATS systems scan for exact matches. But only use technology names the JD mentions.
7. **Bridge Gaps**: If the JD asks for something Gordon hasn't done exactly, find the closest analog. E.g., "Kubernetes" → show Docker + AWS container experience.
8. **Keep It Readable**: A great resume bullet should make sense to both a recruiter and a CTO. Write for both audiences simultaneously.

## Output

Write the tailored resume to `src/data/resume.json`, replacing the current content.

Then provide a brief summary:
- What title was chosen and why
- Which highlights were selected and why
- What skills were reordered/added/removed
- Any strategic notes about keyword alignment
