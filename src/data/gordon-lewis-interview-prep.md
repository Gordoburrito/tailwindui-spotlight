# Gordon Lewis — Interview Prep Narrative

> **Goal:** Software engineer at a Bay Area company automating and improving systems. 130-160k+. For my family, mental freedom, creativity, and long-term growth.

---

## 🔀 TRANSITION: High School → Berkeley CS → Art

### The Tinkerer Origin

**Situation:** I was in AP Comp Sci in high school, playing games every day, surrounded by locked-down school computers.

**Task:** I wanted to play Pokémon at school. Simple as that.

**Action:** I made a USB thumb drive that could run games on the school computers. I was also building actual games in class — I was drawn to making things, not to data structures and algorithms.

**Result:** First proof of the pattern: I use technology to manipulate my surroundings so I can do what I want to do. That's never changed.

---

**Situation:** I started CS at Berkeley but the projects felt arbitrary — pre-written tests, problems that had already been solved. I wasn't building for anyone.

**Task:** I needed an outlet that let me create for my community.

**Action:** I pivoted to art. Made 100 ceramic pots and invited everyone I knew to paint them — basically built my own Color Me Mine. Built an OpenCV project that tracked how many people were in a room and changed a projection based on the energy of the space.

**Result:** I graduated from Berkeley in 2017. Art taught me about self-expression, but I realized it wasn't going to give me the tools to help people at scale.

> 🏆 **Achievement:** Berkeley graduate, 2017. Combined programming (OpenCV) with art to create interactive installations.

---

## 🔀 TRANSITION: Post-Grad Drift → Sales → "If it's going to be hard, it should be cool"

**Situation:** After graduating I was working as a camp counselor, then a barback, then a busser at the Cliff House. I was grappling with the fact that I could do more.

**Task:** Figure out what I actually wanted to do with my skills.

**Action:** Took a sales job. We had daily call metrics and a broken auto-dialer.

**Result:** I built my own auto-dialer using AutoHotkey and Salesforce. Hit 300 calls a day. But the feature people actually loved? I hooked up wireless headset hotkeys so you could close a call with a button on your headset. People went crazy for that.

> 🏆 **Achievement:** Built custom auto-dialer — 300 calls/day. Most-loved feature was the headset hotkey integration.

**Key realization:** I still love making things for people, and I'm drawn to the technical side. If I'm going to be doing hard work, it should be something cool.

---

## 🔀 TRANSITION: Sales → UX Design → "Just build the thing"

**Situation:** I got into UX design through a bootcamp. Worked at a couple startups and contract gigs — GeoPogo, Suede, others.

**Task:** Help clients design the right product for their users.

**Action:** I'd go through the whole UX process — research, wireframes, prototypes, get buy-in. Every single time, the client would look at the design and say "Great, can you build this for me?" UX kept stopping short of the actual thing.

**Result:** I learned that people aren't convinced by low-fidelity prototypes. They need the real thing. Like Tim Ferriss says — don't ask people "would you buy this?" Say "buy this" and watch what happens. That's when you find out if the idea is real.

**Key realization:** UX was the almost-right fit. The real value was in delivering the actual product, not just the design. Engineering puts you in the driver's seat.

---

## 🔀 TRANSITION: UX Designer → Self-Taught Developer

**Situation:** I kept hitting the same wall — clients wanted the thing built, not just designed.

**Task:** Learn to code so I could deliver the full product myself.

**Action:** Started on freeCodeCamp, taught myself React. I knew all the resources were out there — that's why I didn't do a bootcamp. Coding is coding. The UX bootcamp was worth it because it was in-person and taught me how to get buy-in and work with people. But for code? I could learn that myself.

**Result:** I could now go from idea → design → working product. Full stack.

> 🏆 **Achievement:** Self-taught React developer. Combined UX design skills with frontend engineering to deliver end-to-end.

---

## 🔀 TRANSITION: Freelance → RoosterGrin — Earning My Stripes

**Situation:** Joined RoosterGrin making dental and orthodontic websites. Started on the request team doing site changes.

**Task:** Forms were taking forever because of a mismatch between the template backend and the frontend.

**Action:** I built a tool that generates the template backend directly from the frontend.

**Result:** Cut form workflow time in half.

> 🏆 **Achievement:** Reduced form processing time by 50% through frontend-to-backend generation.

---

**Situation:** Moved up to the templates team. We're making ~100 websites a year. Every single one required manually setting up CloudFront, AWS, S3 buckets — a full day just for pipeline creation. Then you'd copy-paste content into a JSON backend. I was literally foaming at the mouth.

**Task:** We're software engineers working with computers. Automate this.

**Action:** Automated the entire pipeline creation process and content population workflow.

**Result:** Reduced developer time by 325%. What used to take 4 days now takes 1 day.

> 🏆 **Achievement:** 325% reduction in developer time for template site creation (4 days → 1 day).

---

## 🔀 TRANSITION: Templates Developer → Full-Stack Systems Owner

*This is where RoosterGrin stopped being "just a job" and became the proving ground.*

---

### Built a CRM From Scratch — Sole Frontend Engineer

**Situation:** RoosterGrin needed a CRM for hundreds of dental practices to manage leads, track marketing ROI, and communicate with patients. There was no frontend. No team. Just me.

**Task:** Build the entire application.

**Action:** 57 PRs over 2 years. Lead management with bulk actions, multi-filter search, CSV export. Real-time analytics dashboard — conversion rates, revenue metrics, time-series charts with dynamic granularity so managers could zoom in on days, weeks, or months. Unified messaging inbox supporting email and SMS with optimistic updates so messages appeared instantly. Built a configurable automated messaging rules engine — practices could set up event-triggered outreach sequences without a developer touching anything. 30+ custom hooks, 25+ reusable components. React, TypeScript, React Query, Draft.js.

**Result:** Hundreds of dental practices use this daily. Practice managers make data-driven decisions about their marketing spend because of the dashboard I built. New campaign types get onboarded without engineering involvement because of the rules engine.

> 🏆 **Achievement:** Sole frontend engineer on a production CRM used by hundreds of businesses. Full product ownership — lead management, analytics, messaging, automation — across 57 PRs over 2 years.

---

### Built the Telephony Integration From Zero

**Situation:** The platform needed real-time call tracking across 100+ multi-location dental practices. SkySwitch was a new VoIP provider — no integration existed.

**Task:** Build it from scratch and make it reliable.

**Action:** Built the full webhook processing pipeline — Sidekiq workers parsing call direction, duration, caller/callee, extensions, voicemail detection. Built subscription automation that creates API subscriptions daily for active practices and expires them for cancelled ones. Fixed a bug where auto-attendant pickup was incorrectly marking calls as answered. Built monitoring canaries that detect when VoIP connections go silent and alert the team within minutes. Also built a cross-reference QA system that checks our internal call records against the provider's API data for integrity.

**Result:** Real-time call tracking across 100+ multi-location practices. Monitoring catches outages in minutes instead of hours. Built it for SkySwitch, then extended the patterns to work across CoreDial too.

> 🏆 **Achievement:** Built complete telephony integration from scratch — real-time call tracking, voicemail detection, automated routing across 100+ multi-location practices. Built monitoring that reduced incident response from hours to minutes.

---

### Unified Four Healthcare Systems Into One Platform

**Situation:** Every dental practice uses a different Practice Management System — Cloud9, Dolphin, Greyfinch, OpenDental. Each has a different API, different data structures. Our platform needed to sync with all of them.

**Task:** Build a unified integration layer so the platform works regardless of which PMS the practice uses.

**Action:** Architected the Greyfinch integration from scratch — 2,185 additions. GraphQL API client, recursive field extraction for nested patient data (emails, phones, addresses buried three levels deep in JSON), sync orchestrator coordinating patients, appointments, doctors, locations, appointment types, responsible parties. Built Cross-PMS communication push so when a text or email gets sent through our platform, it automatically logs to the correct PMS. Built billing sync, scheduling widget integration, failure awareness notifications.

**Result:** Four third-party systems unified. Practices don't have to think about which PMS they use — the platform just works. Eliminated manual data entry across all of them.

> 🏆 **Achievement:** Architected unified integration layer connecting four healthcare management systems (Cloud9, Dolphin, Greyfinch, OpenDental) — eliminating manual data entry and ensuring consistent records across all vendors.

---

### Led Rails Upgrade on Live Production — Zero Downtime

**Situation:** The production backend was running Rails 5.x. Serving active dental practices daily. Needed to modernize without breaking anything.

**Task:** Upgrade Rails 5.x → 6.1 with no downtime and no incidents.

**Action:** Multi-phase approach. Used `next_rails` gem for dual-boot testing so I could validate against both versions. Upgraded Ruby to 2.7. Incremental Rails patches — 5.x → 6.0.0 → 6.0.6.1 → 6.1. Updated five validators for Rails 6.1 API changes. All while the platform stayed live and serving customers.

**Result:** Zero downtime. Zero production incidents. Modernized codebase for all active customers.

> 🏆 **Achievement:** Multi-phase Rails 5.x → 6.1 upgrade on live production platform. Zero downtime, zero incidents.

---

### Mobile App — Cross-Platform Ownership

**Situation:** RoosterGrin had a React Native mobile app for practice staff — calls, messages, patient alerts. It needed ongoing feature work, framework upgrades, and app store compliance.

**Task:** Own the app end to end.

**Action:** 84 PRs over 2 years. Built background push notifications from scratch — `TaskManager` for processing remote notifications when the app is closed, category-based filtering, systematic crash isolation. Led the app through three Expo SDK upgrades (50 → 51 → 54). When Google Play rejected us for unnecessary permissions, I led a 4-phase refactoring — progressively stripped permissions, ultimately wrote a custom Expo config plugin that programmatically removes them from the Android manifest at build time. Set up the CI/CD pipeline for automated builds and app store submissions.

**Result:** Stable cross-platform app used daily by practice staff. Passed Play Store compliance. Automated the entire release pipeline.

> 🏆 **Achievement:** Owned cross-platform mobile app (84 PRs, 2 years). Built background push notifications, led 3 SDK upgrades, resolved Play Store compliance rejection with custom build plugin. Established CI/CD for automated releases.

---

### 48-Hour Production Debugging Sprint

**Situation:** The scheduling widget was broken in production. Practices couldn't book patients through Evenly OS.

**Task:** Fix it. Now.

**Action:** 12 PRs in 48 hours. Systematic approach — deployed strategic logging to isolate the failure path, added guard clauses, found and fixed the booking reset bug. Incremental deploys to production, verifying each fix before moving to the next.

**Result:** Booking restored. No panic, just process.

> 🏆 **Achievement:** 12 PRs in 48 hours to resolve critical production booking failure. Systematic logging and incremental fixes under pressure.

---

## 🔀 TRANSITION: Automation Engineer → AI-Powered Site Generation

*This is the flagship. Everything before this was building toward it.*

**Situation:** Even with all the automation, there was still a 90-day bottleneck. Talk to the client, figure out what they want, show them copy, show them design, they say yes, build the site, they ask for 50 changes. And we're serving 750+ dental practice websites.

**Task:** Why don't we just make the website first and let them react to the real thing?

**Action:** Built the entire platform from scratch — Python/FastAPI backend, React frontend. Built a Playwright-based scraper that captures the complete structure, content, and design of existing websites. Content goes into a RAG pipeline — vector stores from scraped content, OpenAI structured output that matches our exact WordPress template schemas. Built intelligent image assignment that analyzes page content and picks relevant stock photos per section. Automated the full deployment stack — DNS via Route 53, CDN via CloudFront, database provisioning, WordPress setup via Plesk SSH, all one-click. Built a 5-step migration wizard with drag-and-drop sitemap editing so non-technical staff could launch sites through a UI. Containerized the whole thing with Docker, deployed on AWS Lightsail with GitHub Actions CI/CD.

**Result:** 90-day process → under 10 minutes. Serving 750+ practice websites. Non-engineers launch sites through the wizard I built. CEO was thrilled — thrilled enough to set me up with an external contract.

> 🏆 **Achievement:** Reduced website migration from 90 days to under 10 minutes. Solo-architected full-stack AI platform (FastAPI, React, Playwright, OpenAI, AWS). Serving 750+ dental practice websites. Non-technical staff launch sites through one-click UI.

---

## 🔀 TRANSITION: Internal Impact → External Validation (Classic Parts Pro)

**Situation:** CEO set me up with a contract at Classic Parts Pro, a company he'd invested in. They needed help with an AI problem.

**Task:** Take fitment data from multiple sources — scraped websites with inconsistent naming (a "Chevy Cavalier" might be listed as a "Chevy two-door hardtop") — and transform it to match a database of 317,000+ vehicles.

**Action:** This was GPT-3.5 era. Agentic workflows didn't exist yet, so I built my own. Declustered the prompts — you can't just ask "what's the year make and model?" because it hallucinates. Filter first (1950 Chevrolet), classify, then give it the actual model options for that year. Two-shot classification pipeline. Since then I've scaled it into a full Python monorepo — pip-installable shared libraries, cascading match strategy (exact join → dictionary fallback → AI only when needed), OpenAI Batch API for 50%+ cost savings, per-pattern deduplication that cuts API calls by 60-80%, budget enforcement with per-request cost tracking. Built concurrent web scrapers with progress saving and graceful error recovery. 62+ tests across the platform.

**Result:** Initial contract: 60 man-hours, 10,000 rows processed, pipeline built to handle 5 million. A separate team of four graduate students tried the same thing for their capstone — with instruction I'd given them — and couldn't pull it off. I did it 10x cheaper. The platform now has multi-vendor support, a Streamlit dashboard, and processes data at a fraction of what manual work would cost.

> 🏆 **Achievement:** Built AI-powered automotive data platform matching parts to 317K+ vehicles. 10x cheaper than alternatives. Outperformed a 4-person grad team. Scaled from 10K to 5M row capacity. 60-80% API cost reduction through deduplication. 62+ tests.

---

## 🔀 TRANSITION: What's Next — Bigger Scale

**Situation:** I've proven the pattern at every level — for my friends, my sales team, my dev team, my company, externally for a client, and now with a full production platform.

**Task:** I need a bigger scale. Bigger community. Bigger problems.

**The throughline:** I enter a community. I see their problems. I automate the painful parts. I deliver the real thing. Every single time.

At RoosterGrin I went from fixing forms to owning a CRM, a mobile app, a telephony system, four PMS integrations, a production Rails upgrade, and an AI-powered platform serving 750+ websites. I brought Cursor to my team because I saw it on an OpenAI keynote. I adopted Claude Code at my company. I'm tracking Codex now. This shit moves fast and I keep up with it because **this is what I do. I use tools to make my community's dreams a reality.**

The next step is a Bay Area company where the scale matches what I can do. 130-160k+. A place where I can automate systems, build platforms, and keep doing what I've always done — just bigger.

---

## What I Bring

- **Full-stack:** Rails, React, React Native, Python/FastAPI
- **AI/LLM integration:** OpenAI, RAG pipelines, MCP, structured output, Batch API, cost-optimized prompt engineering
- **AWS infrastructure:** S3, CloudFront, Route 53, Lightsail, CodeBuild, Docker
- **Production systems at scale:** 750+ websites, 100+ multi-location practices, 317K+ vehicle records
- **The pattern:** See the problem → automate it → deliver the thing. Since I was putting Pokémon on a USB drive in high school.

---

## Quick Reference: STAR Stories by Interview Question Type

| Question | Go-To Story |
|---|---|
| "Tell me about yourself" | The throughline — USB drive → Berkeley → sales automation → UX → RoosterGrin → AI platform |
| "Biggest technical achievement" | AI-powered site generation (90 days → 10 minutes, 750+ sites) |
| "Built something from scratch" | CRM — sole frontend engineer, 57 PRs, hundreds of practices |
| "Worked under pressure" | 48-hour Evenly OS sprint — 12 PRs, systematic debugging |
| "Improved a system" | Templates automation — 325% reduction (4 days → 1 day) |
| "Integrated with external systems" | Four PMS integrations unified into one platform |
| "Led a migration/upgrade" | Rails 5.x → 6.1 — zero downtime, zero incidents |
| "Worked with AI/ML" | Classic Parts Pro — proto-agentic pipeline, 10x cheaper, outperformed grad team |
| "Mobile experience" | thread-mobile — 84 PRs, push notifications, Play Store compliance, CI/CD |
| "Why are you looking for something new?" | Proven the pattern at every scale RoosterGrin offers. Need bigger problems. |
