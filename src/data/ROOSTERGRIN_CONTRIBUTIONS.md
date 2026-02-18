
# Gordon Lewis -- RoosterGrin Contributions (2021-2026)

## Comprehensive Technical Portfolio for Resume

> **NOTE FOR `/tailor-resume` SKILL**: Each project below has a **Resume-Ready Highlights** section with polished, impact-first bullets. **Prefer these** when building a resume. The detailed PR breakdowns below each section provide supporting evidence and context for choosing which highlights to emphasize for a given JD.

---

# PROJECT 1: `rooster-reminders-back-end` (Ruby on Rails)

**~150+ merged PRs | June 2023 -- February 2026**

The main backend for **Thread Communication**, a patient communication platform serving dental/medical practices. Handles appointment reminders, two-way messaging, VoIP call tracking, CRM lead management, and PMS integrations.

### Resume-Ready Highlights

- Developed a complete telephony integration from scratch, enabling real-time call tracking, voicemail detection, and automated call routing across 100+ multi-location dental practices.
- Architected a unified integration layer connecting four third-party healthcare systems into a single platform, eliminating manual data entry and ensuring consistent patient, appointment, and billing records across all vendor systems.
- Scaled the messaging infrastructure to deliver hundreds of millions of SMS and email communications while building international compliance features that expanded the platform's reach to the UK and Ireland.
- Built the lead management backend powering a CRM used by hundreds of dental practices, including real-time marketing attribution tracking that helped practices identify their highest-converting lead sources.
- Introduced AI-powered chat capabilities into the platform, giving dental practice staff instant access to patient and appointment data through natural-language queries.
- Led a multi-phase framework upgrade (Rails 5.x → 6.1) across the production platform with zero downtime and zero production incidents, modernizing the codebase while maintaining service for all active customers.
- Designed an automated patient communication system — missed call text-back, business hours scheduling, no-show follow-ups, and recall reminders — reducing manual staff workload and improving patient re-engagement.
- Built a platform-wide monitoring and alerting system that detected telephony outages, messaging delivery failures, and data sync issues in real time, reducing incident response times from hours to minutes.

---

## 1A. VoIP / Telephony Integration (SkySwitch + CoreDial)

### SkySwitch -- Built from Scratch

- **`skyswitch_worker.rb`** (202 lines): Sidekiq worker processing SkySwitch webhooks -- parses call direction, duration, caller/callee, extension, answered status and persists as Call records — [PR #2405](https://github.com/roostergrin/rooster-reminders-back-end/pull/2405)
- **`skyswitch_controller.rb`** (38 lines): API endpoint receiving SkySwitch webhook POSTs — [PR #2405](https://github.com/roostergrin/rooster-reminders-back-end/pull/2405)
- **SkySwitch Extensions**: Handles extension-based call routing for multi-location DSO practices — [PR #2417](https://github.com/roostergrin/rooster-reminders-back-end/pull/2417)
- **SkySwitch Voicemail**: Voicemail detection/processing, refactored shared logic to work across CoreDial and SkySwitch — [PR #2420](https://github.com/roostergrin/rooster-reminders-back-end/pull/2420)
- **SkySwitch Subscription Automation** (`skyswitch_utils.rb`, 219 lines): Auto-manages API subscriptions -- daily Sidekiq job creates/renews subscriptions for active practices, expires for cancelled ones. PBX `after_create` callback auto-subscribes new PBXes — [PR #2657](https://github.com/roostergrin/rooster-reminders-back-end/pull/2657)
- **Missed Call Bug Fix**: Fixed auto-attendant pickup (`ForwardNoAns`) incorrectly marking calls as answered — [PR #2503](https://github.com/roostergrin/rooster-reminders-back-end/pull/2503)

### CoreDial Enhancements

- **Call Check Canary** (`call_check_worker.rb`): Monitoring system detecting when CoreDial connections go silent (no calls within time window), emails alerts. Refined to 1-hour check intervals — [PR #2382](https://github.com/roostergrin/rooster-reminders-back-end/pull/2382), [PR #2384](https://github.com/roostergrin/rooster-reminders-back-end/pull/2384), [PR #2390](https://github.com/roostergrin/rooster-reminders-back-end/pull/2390), [PR #2398](https://github.com/roostergrin/rooster-reminders-back-end/pull/2398)
- **CoreDial PBX Refresher**: Scheduled screenpop initializer pinging XMPP connections every 20 minutes with disconnect-reconnect logic — [PR #2416](https://github.com/roostergrin/rooster-reminders-back-end/pull/2416)
- **CoreDial Test Suite** (174 additions): Made `coredial_api.rb` testable via dependency injection, created specs with XML fixture data — [PR #2871](https://github.com/roostergrin/rooster-reminders-back-end/pull/2871)
- **CoreDial Rake QA Tools** (251 additions): `coredial:check_env`, `coredial:test_connection` -- verifies credentials, establishes XMPP connections, subscribes to PBX nodes, logs real-time call events — [PR #2823](https://github.com/roostergrin/rooster-reminders-back-end/pull/2823)

### VoIP QA Automation

- **RecentCallsCheckWorker** (822 additions): Cross-references CoreDial API call data against internal records for data integrity. Built `VoipThread::Client` (378 lines) -- full HTTP client with auth, pagination, call data retrieval. Plus rake tasks and specs — [PR #3183](https://github.com/roostergrin/rooster-reminders-back-end/pull/3183)

---

## 1B. Practice Management System (PMS) Integrations

### Greyfinch -- Built from Scratch (2,185 additions)

- Architected complete sync layer: `greyfinch/api.rb` (136 lines, HTTP client for GraphQL API), `graphqlqueries.rb` (216 lines, queries for patients, appointments, doctors, locations, appointment types, responsible parties), `table_mapping.rb` (120 lines, recursive field extraction for email/phone/address from nested JSON), `sync.rb` (65 lines, orchestrator) — [PR #2815](https://github.com/roostergrin/rooster-reminders-back-end/pull/2815)
- Individual sync workers for patients, appointments, doctors, locations, appointment types, responsible parties — [PR #2815](https://github.com/roostergrin/rooster-reminders-back-end/pull/2815)
- Greyfinch v4 API Migration: Adapted table mapping when API structure changed, added 86-line test spec — [PR #3027](https://github.com/roostergrin/rooster-reminders-back-end/pull/3027), [PR #3030](https://github.com/roostergrin/rooster-reminders-back-end/pull/3030), [PR #3031](https://github.com/roostergrin/rooster-reminders-back-end/pull/3031), [PR #3032](https://github.com/roostergrin/rooster-reminders-back-end/pull/3032), [PR #3033](https://github.com/roostergrin/rooster-reminders-back-end/pull/3033)
- Greyfinch API Initialization Fix — [PR #2984](https://github.com/roostergrin/rooster-reminders-back-end/pull/2984)

### Cloud9 Online Scheduling

- **Responsible Party Creation** (278 additions): Guardian/responsible party creation via C9 API when new patients are created through scheduling widget. Auto-configures default relationship type per practice — [PR #2488](https://github.com/roostergrin/rooster-reminders-back-end/pull/2488)
- **Billing Sync** (152 additions): New `Billing` model, sync worker fetching billing data from Cloud9 API, upsert workers, field mappings — [PR #2780](https://github.com/roostergrin/rooster-reminders-back-end/pull/2780)

### Dolphin PMS

- Appointment error handling with comprehensive specs (245 additions) — [PR #2277](https://github.com/roostergrin/rooster-reminders-back-end/pull/2277)
- Verbose failure reporting for booking errors — [PR #2424](https://github.com/roostergrin/rooster-reminders-back-end/pull/2424)

### Cross-PMS Communication Push (402 additions)

- **`push_message_to_pms.rb`** (35 lines): Abstraction routing text/email communications to correct PMS comment API — [PR #2997](https://github.com/roostergrin/rooster-reminders-back-end/pull/2997)
- Cloud9 and Dolphin patient comment workers — [PR #2997](https://github.com/roostergrin/rooster-reminders-back-end/pull/2997)
- Extended `text_sender/base.rb` and `email_sender/base.rb` to trigger PMS push after message delivery — [PR #2997](https://github.com/roostergrin/rooster-reminders-back-end/pull/2997)
- Dolphin Sync Failure Awareness — [PR #2995](https://github.com/roostergrin/rooster-reminders-back-end/pull/2995)

---

## 1C. Twilio Messaging Infrastructure

- **Phone Number Registration Flow**: Duplicate-prevention for TwilioBrand registrations by `business_id` — [PR #2333](https://github.com/roostergrin/rooster-reminders-back-end/pull/2333)
- **Brand Registration Logging** (106 additions): Comprehensive Sentry logging at each brand registration step to diagnose provisioning failures — [PR #2684](https://github.com/roostergrin/rooster-reminders-back-end/pull/2684)
- **Alphanumeric Sender IDs** (86 additions): Dynamic alpha sender support for UK-bound messages from Irish customers — [PR #2690](https://github.com/roostergrin/rooster-reminders-back-end/pull/2690)
- **Twilio Ireland**: Messaging service SID support for Irish phone numbers — [PR #3074](https://github.com/roostergrin/rooster-reminders-back-end/pull/3074)
- **Compliance Stack**: Fixed compliance stack creation (don't move phone numbers during setup), hardcoded scheduling times — [PR #3035](https://github.com/roostergrin/rooster-reminders-back-end/pull/3035), [PR #3036](https://github.com/roostergrin/rooster-reminders-back-end/pull/3036)
- **Twilio Error Notifications** (241 additions): `daily_error_report.rb` (166 lines) -- automated daily report aggregating delivery failures by error type and practice, with Mustache email template — [PR #2972](https://github.com/roostergrin/rooster-reminders-back-end/pull/2972)
- **Message Service Removal**: Simplified message routing, added business identification to catch-all messaging services for compliance — [PR #2325](https://github.com/roostergrin/rooster-reminders-back-end/pull/2325)

---

## 1D. CRM / Lead Management Backend

- **LeadSourceContactType Model** (65 additions): Classifies how leads arrive (call, text, booking, web form) with associations in Booking, Call, Text models — [PR #2671](https://github.com/roostergrin/rooster-reminders-back-end/pull/2671)
- **Lead Awaiting Review Status** (58 additions): New status to categorize incoming leads before review, with factory definitions and specs — [PR #2716](https://github.com/roostergrin/rooster-reminders-back-end/pull/2716)
- **Tracking History** (251 additions): JSONB column on leads table, 93 lines of UTM/campaign/referrer parsing logic, updated booking and website lead controllers — [PR #2715](https://github.com/roostergrin/rooster-reminders-back-end/pull/2715)
- **Telecom Click Tracking via Redis** (605 additions): API endpoint storing tracking data in Redis with 90-second TTL, Call and Text models pick up tracking data on creation. Comprehensive test suite (105 + 107 + 78 lines) — [PR #2734](https://github.com/roostergrin/rooster-reminders-back-end/pull/2734)
- **Lead Source Prioritization** (155 additions): Prioritizes `google_ads` and `facebook_ads` over generic referrers — [PR #2770](https://github.com/roostergrin/rooster-reminders-back-end/pull/2770)
- **Website Leads Controller Refactor** (190 additions): Duplicate lead detection/prevention, streamlined creation/update logic — [PR #2736](https://github.com/roostergrin/rooster-reminders-back-end/pull/2736)
- **Blast Messaging for Leads** (103 additions): Extended Blast system for lead recipients with `recipient_type` flag — [PR #2516](https://github.com/roostergrin/rooster-reminders-back-end/pull/2516)
- **CRM Performance Reports** (158 additions): Weekly email reports with lead metrics per practice, contact type breakdowns, scheduled Mondays 9 AM PST — [PR #2811](https://github.com/roostergrin/rooster-reminders-back-end/pull/2811)
- **Lead Routes and Bulk Update** (77 additions): `leads/with_events` and `leads/bulk_update` API routes — [PR #2591](https://github.com/roostergrin/rooster-reminders-back-end/pull/2591)

---

## 1E. AI / LLM Service

- **`ai_service.rb`** (55 lines): OpenAI API wrapper with rate limiting per practice (daily chat completion quotas) — [PR #2973](https://github.com/roostergrin/rooster-reminders-back-end/pull/2973)
- **`ai_controller.rb`** (40 lines): REST endpoint for chat interactions — [PR #2973](https://github.com/roostergrin/rooster-reminders-back-end/pull/2973)
- **`refill_remaining_chat_completions.rb`**: Sidekiq scheduled job resetting daily quotas — [PR #2973](https://github.com/roostergrin/rooster-reminders-back-end/pull/2973)
- **AI Service Hardening**: UTF-8 sanitization, JSON encoding error handling — [PR #2974](https://github.com/roostergrin/rooster-reminders-back-end/pull/2974), [PR #2977](https://github.com/roostergrin/rooster-reminders-back-end/pull/2977)

---

## 1F. MCP (Model Context Protocol) Integration (220 additions)

- **`mcp_server.rb`**: Entry point for MCP server — [PR #3062](https://github.com/roostergrin/rooster-reminders-back-end/pull/3062)
- **`find_appointments_tool.rb`** (54 lines): Natural-language appointment queries — [PR #3062](https://github.com/roostergrin/rooster-reminders-back-end/pull/3062)
- **`search_patients_tool.rb`** (28 lines): Patient search tool — [PR #3062](https://github.com/roostergrin/rooster-reminders-back-end/pull/3062)
- **`SETUP_MCP.md`** (117 lines): Documentation with use case scenarios — [PR #3062](https://github.com/roostergrin/rooster-reminders-back-end/pull/3062)

---

## 1G. Authentication & Security

- **Auth Event Audit Trail** (143 additions): Logs all sign-in attempts (success/failure) with IP, user-agent, mobile flag, request_id. Admin endpoint with filtering — [PR #3182](https://github.com/roostergrin/rooster-reminders-back-end/pull/3182)
- **reCAPTCHA Integration** (43 additions): Server-side verification endpoint for scheduling widget bot protection — [PR #2808](https://github.com/roostergrin/rooster-reminders-back-end/pull/2808)
- **Sessions Controller Auth Fix**: Fixed 500 error in mobile app login from Devise's `require_no_authentication` callback — [PR #3113](https://github.com/roostergrin/rooster-reminders-back-end/pull/3113), [PR #3114](https://github.com/roostergrin/rooster-reminders-back-end/pull/3114)

---

## 1H. Automated Messaging Features

- **Missed Call Text Worker** (82 additions): Sidekiq job (every 3 min) detecting missed calls and auto-texting callers — [PR #2455](https://github.com/roostergrin/rooster-reminders-back-end/pull/2455)
- **Missed Call Default Settings**: Auto-creates default message settings for new practices/locations — [PR #2480](https://github.com/roostergrin/rooster-reminders-back-end/pull/2480), [PR #2481](https://github.com/roostergrin/rooster-reminders-back-end/pull/2481)
- **Active Hours Controller** (78 additions): CRUD API for practice/location business hours (controls when missed call texts fire) — [PR #2638](https://github.com/roostergrin/rooster-reminders-back-end/pull/2638)
- **Post Recall Reminders**: Extended message_setting.rb for post-recall offsets — [PR #2462](https://github.com/roostergrin/rooster-reminders-back-end/pull/2462)
- **Custom No-Shows** (231 additions): Custom message settings for no-show patients with new `custom_message_setting_type` — [PR #2868](https://github.com/roostergrin/rooster-reminders-back-end/pull/2868)
- **Always Send Fix**: Fixed behavior across onboarding, recall, and custom recall settings — [PR #2872](https://github.com/roostergrin/rooster-reminders-back-end/pull/2872), [PR #2925](https://github.com/roostergrin/rooster-reminders-back-end/pull/2925)

---

## 1I. Rails / Ruby Upgrade Path

- **Rails 5.x -> 6.0.0** (616 additions): `next_rails` gem for dual-boot, deprecation fixes, spec helper updates — [PR #2795](https://github.com/roostergrin/rooster-reminders-back-end/pull/2795)
- **Ruby -> 2.7**: Updated `.ruby-version`, Gemfile, CircleCI config — [PR #2800](https://github.com/roostergrin/rooster-reminders-back-end/pull/2800)
- **Rails 6.0.0 -> 6.0.6.1**: Security patch gem updates — [PR #2802](https://github.com/roostergrin/rooster-reminders-back-end/pull/2802)
- **Rails 6.0.6.1 -> 6.1** (234 additions): Updated 5 validators for Rails 6.1 API changes, model updates. Zero downtime — [PR #2804](https://github.com/roostergrin/rooster-reminders-back-end/pull/2804)

---

## 1J. Monitoring & Observability

- VoIP canary monitoring (CoreDial + SkySwitch) — [PR #2382](https://github.com/roostergrin/rooster-reminders-back-end/pull/2382)
- Twilio daily error reports — [PR #2972](https://github.com/roostergrin/rooster-reminders-back-end/pull/2972)
- PMS sync failure email notifications (configurable by PMS type) — [PR #2785](https://github.com/roostergrin/rooster-reminders-back-end/pull/2785)
- CRM performance metrics reports — [PR #2811](https://github.com/roostergrin/rooster-reminders-back-end/pull/2811)
- SimpleCov test coverage gem — [PR #2694](https://github.com/roostergrin/rooster-reminders-back-end/pull/2694)
- Dolphin sync failure awareness notifications — [PR #2995](https://github.com/roostergrin/rooster-reminders-back-end/pull/2995)

---

# PROJECT 2: `crm-front-end` (React/TypeScript)

**57 merged PRs | November 2023 -- August 2025**

Built the entire CRM frontend from scratch as sole/primary front-end engineer.

### Resume-Ready Highlights

- Built an entire CRM web application from scratch as the sole frontend engineer, delivering lead management, analytics, messaging, and automated outreach features across 57 pull requests over 2 years.
- Designed a real-time analytics dashboard displaying lead conversion rates, revenue metrics, and time-series trends, enabling practice managers to make data-driven decisions about their marketing spend.
- Developed a unified messaging inbox supporting both email and SMS conversations with instant optimistic message delivery, reducing perceived response time and improving the staff communication workflow.
- Architected a configurable automated messaging rules engine that allowed practices to set up event-triggered outreach sequences without developer involvement, reducing onboarding time for new campaign types.

---

## 2A. Lead Management System

- **CreateLeadModal** (264 lines): Full creation form with validation, multi-field input, source/status selection — [PR #8](https://github.com/roostergrin/crm-front-end/pull/8), [PR #9](https://github.com/roostergrin/crm-front-end/pull/9)
- **EditLeadModal**: Optimistic partial updates (only posts changed data) — [PR #58](https://github.com/roostergrin/crm-front-end/pull/58)
- **LeadsTable**: Sortable, selectable data table with checkbox row selection — [PR #12](https://github.com/roostergrin/crm-front-end/pull/12)
- **LeadsFiltersAndSearch**: Multi-filter system (source, status, lead event, contact type) — [PR #59](https://github.com/roostergrin/crm-front-end/pull/59), [PR #60](https://github.com/roostergrin/crm-front-end/pull/60)
- **LeadsBulkActions** (176 lines): Bulk status change, assignment, batch processing — [PR #64](https://github.com/roostergrin/crm-front-end/pull/64)
- **LeadsContext** (126 lines): React Context persisting filter state across navigation with active/inactive counts — [PR #75](https://github.com/roostergrin/crm-front-end/pull/75), [PR #76](https://github.com/roostergrin/crm-front-end/pull/76)
- **Custom Hooks**: `useLeadList` (multi-dimensional filtering), `useCreateLead`, `useValidation`, `usePatchSelectedLeads` — across PRs #8-#82
- CSV export utility

## 2B. Analytics Dashboard

- **DataCards**: Real-time KPIs (total leads, new leads, conversion rate, revenue) with click-through to filtered views — [PR #13](https://github.com/roostergrin/crm-front-end/pull/13), [PR #89](https://github.com/roostergrin/crm-front-end/pull/89)
- **RevenuesChart** and **RevenuesTable**: Revenue visualization toggle — [PR #88](https://github.com/roostergrin/crm-front-end/pull/88)
- **Time-series graphs**: Dynamic granularity (days/weeks/months based on date range) — [PR #67](https://github.com/roostergrin/crm-front-end/pull/67)
- **Utility architecture**: `generateDataCardsLeads.ts`, `generateDataCardsRevenues.ts`, `generateGraphLeadsData.ts`, `filterLeadUtils.ts`, `dateRangeUtils.ts` — [PR #49](https://github.com/roostergrin/crm-front-end/pull/49) through [PR #55](https://github.com/roostergrin/crm-front-end/pull/55)
- **Custom Hooks**: `useAnalyticsData`, `useBillings`, `useAdCampaigns`, `useLeadEvents`, `useLeadRevenueEstimates` — [PR #20](https://github.com/roostergrin/crm-front-end/pull/20), [PR #24](https://github.com/roostergrin/crm-front-end/pull/24), [PR #25](https://github.com/roostergrin/crm-front-end/pull/25)
- Only "active" leads (statuses 1-6) in analytics for metric accuracy — [PR #77](https://github.com/roostergrin/crm-front-end/pull/77), [PR #78](https://github.com/roostergrin/crm-front-end/pull/78)

## 2C. Email Inbox & Messaging

- **Inbox.tsx** (214 lines): Full inbox with conversation list, detail pane, compose — [PR #26](https://github.com/roostergrin/crm-front-end/pull/26)
- **ConversationList** (131 lines): Scrollable with pagination — [PR #26](https://github.com/roostergrin/crm-front-end/pull/26)
- **LeadMessages**: Supports both text and email conversations — [PR #35](https://github.com/roostergrin/crm-front-end/pull/35), [PR #37](https://github.com/roostergrin/crm-front-end/pull/37)
- **LeadMessagesEmail** (101 lines): Subject lines, rich text, reply threading — [PR #38](https://github.com/roostergrin/crm-front-end/pull/38)
- **LeadMessagesText**: SMS with incoming/outgoing detection via phone number matching — [PR #85](https://github.com/roostergrin/crm-front-end/pull/85), [PR #86](https://github.com/roostergrin/crm-front-end/pull/86)
- **Optimistic Updates**: Messages appear immediately before server confirmation — [PR #43](https://github.com/roostergrin/crm-front-end/pull/43)
- **Fix manual messages** — [PR #92](https://github.com/roostergrin/crm-front-end/pull/92)

## 2D. Automated Messaging System (~2,000 lines)

- Two-level hierarchical system: main rules triggered by lead events containing nested message settings — [PR #18](https://github.com/roostergrin/crm-front-end/pull/18), [PR #22](https://github.com/roostergrin/crm-front-end/pull/22)
- **Draft.js Integration**: Rich text editing with `@mention` token support (`@lead_first_name`, etc.) — [PR #31](https://github.com/roostergrin/crm-front-end/pull/31)
- **CreateBlastModal** (199 lines): Mass email/text composition — [PR #68](https://github.com/roostergrin/crm-front-end/pull/68), [PR #69](https://github.com/roostergrin/crm-front-end/pull/69)
- **PracticeNotification** (55 lines): Internal notification settings — [PR #68](https://github.com/roostergrin/crm-front-end/pull/68)
- 20+ components, 10+ custom hooks for CRUD operations with React Query cache invalidation

## 2E. Lead Source Contact Types

- Full vertical integration: API service -> hook -> context -> filter -> table -> CRUD forms — [PR #70](https://github.com/roostergrin/crm-front-end/pull/70), [PR #71](https://github.com/roostergrin/crm-front-end/pull/71), [PR #73](https://github.com/roostergrin/crm-front-end/pull/73), [PR #74](https://github.com/roostergrin/crm-front-end/pull/74)

## 2F. Patient Links

- Links leads in CRM to patient records in dental PMS — [PR #65](https://github.com/roostergrin/crm-front-end/pull/65), [PR #66](https://github.com/roostergrin/crm-front-end/pull/66)

## 2G. Technology Stack

- React + TypeScript (strict typing), React Query (server state), React Context (client state), Draft.js (rich text), DOMPurify (HTML sanitization), SASS (styling), Vite (build tooling)
- 30+ custom hooks, 25+ reusable components

---

# PROJECT 3: `thread-mobile` (React Native / Expo)

**84 merged PRs | October 2023 -- December 2025**

Mobile app for dental practice staff communication.

### Resume-Ready Highlights

- Maintained and evolved a cross-platform mobile app (iOS + Android) through three major framework upgrades over 2 years, delivering 84 pull requests while keeping the app stable for daily use by dental practice staff.
- Built a background push notification system that reliably delivered patient call and message alerts even when the app was closed, systematically isolating and resolving crash-causing edge cases across devices.
- Resolved an Android Play Store compliance rejection by leading a 4-phase refactoring effort that progressively eliminated unnecessary permissions, ultimately building a custom build plugin to ensure compliance at the manifest level.
- Implemented secure persistent login that eliminated daily re-authentication for practice staff, including automatic session handling and secure credential storage.
- Established the CI/CD pipeline for automated mobile builds and app store submissions across both iOS and Android, reducing the release process from manual steps to a single trigger.

---

## 3A. Push Notification System (Background Notifications)

- **`BACKGROUND_NOTIFICATION_TASK`** via `TaskManager.defineTask` processing remote notifications when backgrounded — [PR #230](https://github.com/roostergrin/thread-mobile/pull/230), [PR #231](https://github.com/roostergrin/thread-mobile/pull/231)
- `displayBackgroundNotification()` and `shouldDisplayBackgroundNotification()` with category-based filtering (`patient_messages`, `patient_calls`) and environment checking — [PR #232](https://github.com/roostergrin/thread-mobile/pull/232), [PR #233](https://github.com/roostergrin/thread-mobile/pull/233), [PR #234](https://github.com/roostergrin/thread-mobile/pull/234)
- Core notification handler logic (232 additions) — [PR #235](https://github.com/roostergrin/thread-mobile/pull/235), [PR #236](https://github.com/roostergrin/thread-mobile/pull/236), [PR #237](https://github.com/roostergrin/thread-mobile/pull/237)
- Systematic crash isolation: toggled background notifications on/off to identify crashes — [PR #208](https://github.com/roostergrin/thread-mobile/pull/208), [PR #209](https://github.com/roostergrin/thread-mobile/pull/209), [PR #210](https://github.com/roostergrin/thread-mobile/pull/210)

## 3B. Expo SDK Upgrades (Expo 50 -> 51 -> 54)

- **Expo 50**: Updated 30 package dependencies, app.config.js patterns, login input compatibility — [PR #197](https://github.com/roostergrin/thread-mobile/pull/197), [PR #198](https://github.com/roostergrin/thread-mobile/pull/198)
- **Expo 51**: Updated 34 dependencies, CircleCI Node version, babel config — [PR #199](https://github.com/roostergrin/thread-mobile/pull/199), [PR #200](https://github.com/roostergrin/thread-mobile/pull/200)
- **Expo 54**: 46 dependency updates, complete notification handler rewrite for FileSystem API changes, jest.setup.js (59 lines) for test infrastructure — [PR #238](https://github.com/roostergrin/thread-mobile/pull/238), [PR #239](https://github.com/roostergrin/thread-mobile/pull/239), [PR #240](https://github.com/roostergrin/thread-mobile/pull/240)

## 3C. Text Unknown Numbers Feature

- **`unknownNumberInput.js`** (66 lines): Phone validation with E.164 regex, phone-pad keyboard — [PR #188](https://github.com/roostergrin/thread-mobile/pull/188)
- **`unkownNumberChips.js`** (30 lines): Removable number chips — [PR #188](https://github.com/roostergrin/thread-mobile/pull/188)
- New `SET_SELECTED_UNKNOWN_NUMBERS` reducer, global state integration — [PR #188](https://github.com/roostergrin/thread-mobile/pull/188), [PR #189](https://github.com/roostergrin/thread-mobile/pull/189), [PR #190](https://github.com/roostergrin/thread-mobile/pull/190)

## 3D. Persistent Login

- Token storage via Expo SecureStore after successful login — [PR #214](https://github.com/roostergrin/thread-mobile/pull/214)
- `useEffect` auto-login on mount via `fetchUser()` with stored token — [PR #215](https://github.com/roostergrin/thread-mobile/pull/215)
- 401 response handling: clear tokens, redirect to login — [PR #217](https://github.com/roostergrin/thread-mobile/pull/217)

## 3E. Error Boundary

- `react-native-error-boundary` wrapping entire component tree — [PR #218](https://github.com/roostergrin/thread-mobile/pull/218), [PR #219](https://github.com/roostergrin/thread-mobile/pull/219)
- Enhanced Sentry with `enableAutoPerformanceTracing` and `enableNativeCrashHandling`

## 3F. Android Compliance -- Media Permissions

- Phase 1: Refactored `expandedMedia.js` to remove `expo-media-library` — [PR #241](https://github.com/roostergrin/thread-mobile/pull/241), [PR #242](https://github.com/roostergrin/thread-mobile/pull/242), [PR #243](https://github.com/roostergrin/thread-mobile/pull/243)
- Phase 2: Completely removed `expo-media-library`, replaced with `expo-file-system` + `expo-sharing` — [PR #247](https://github.com/roostergrin/thread-mobile/pull/247), [PR #248](https://github.com/roostergrin/thread-mobile/pull/248), [PR #249](https://github.com/roostergrin/thread-mobile/pull/249)
- Phase 3: Removed entire image attachment feature to eliminate camera/photo permissions — [PR #250](https://github.com/roostergrin/thread-mobile/pull/250), [PR #251](https://github.com/roostergrin/thread-mobile/pull/251), [PR #252](https://github.com/roostergrin/thread-mobile/pull/252)
- Phase 4: Custom Expo config plugin `withRemoveMediaPermissions` -- programmatically strips permissions from Android manifest — [PR #256](https://github.com/roostergrin/thread-mobile/pull/256), [PR #257](https://github.com/roostergrin/thread-mobile/pull/257), [PR #258](https://github.com/roostergrin/thread-mobile/pull/258)

## 3G. Sentry Migration

- Migrated from deprecated `sentry-expo` to `@sentry/react-native` across 6 files — [PR #211](https://github.com/roostergrin/thread-mobile/pull/211), [PR #213](https://github.com/roostergrin/thread-mobile/pull/213), [PR #216](https://github.com/roostergrin/thread-mobile/pull/216)
- Enhanced error handling and logging — [PR #265](https://github.com/roostergrin/thread-mobile/pull/265)

## 3H. Build Pipeline (Bitrise & CircleCI)

- `scripts/build_and_submit_app.sh` for EAS Build, parameterized for platform via `$BITRISE_APP_PLATFORM` — [PR #182](https://github.com/roostergrin/thread-mobile/pull/182) through [PR #187](https://github.com/roostergrin/thread-mobile/pull/187)
- Dynamic `app.config.js` setting `versionCode`/`buildNumber` from `BITRISE_BUILD_NUMBER`, Sentry auth tokens, Apple Team ID — [PR #191](https://github.com/roostergrin/thread-mobile/pull/191) through [PR #196](https://github.com/roostergrin/thread-mobile/pull/196)
- `eas.json` build profiles, post-install hooks, artifact caching scripts — [PR #225](https://github.com/roostergrin/thread-mobile/pull/225), [PR #226](https://github.com/roostergrin/thread-mobile/pull/226)

## 3I. iOS Fixes & UI Refactoring

- Removed `shadowOffset` crash-causing styling — [PR #206](https://github.com/roostergrin/thread-mobile/pull/206), [PR #207](https://github.com/roostergrin/thread-mobile/pull/207)
- Replaced `@gorhom/bottom-sheet` (340+ lines deleted) with native Modal (26 lines) — [PR #223](https://github.com/roostergrin/thread-mobile/pull/223), [PR #224](https://github.com/roostergrin/thread-mobile/pull/224)
- Fixed `react-native-gesture-handler` TouchableOpacity issues on iOS — [PR #227](https://github.com/roostergrin/thread-mobile/pull/227), [PR #228](https://github.com/roostergrin/thread-mobile/pull/228), [PR #229](https://github.com/roostergrin/thread-mobile/pull/229)
- Cache timeout and build configuration fixes — [PR #259](https://github.com/roostergrin/thread-mobile/pull/259) through [PR #262](https://github.com/roostergrin/thread-mobile/pull/262)

---

# PROJECT 4: `ContentGenerationAndDistribution` (Python/FastAPI) + `template-manager-ui` (React)

**57 merged PRs combined | April 2025 -- February 2026**

AI-powered dental website creation platform. Built from scratch.

### Resume-Ready Highlights

- Reduced website migration timelines from 90 days to under 10 minutes by building an AI-powered content generation platform that automatically produces website copy, assigns images, and provisions hosting infrastructure — serving 750+ dental practice websites.
- Developed an automated web scraping system that captures the complete structure, content, and design of existing websites, feeding an AI pipeline that generates contextually accurate replacement content.
- Automated the full site deployment process — from DNS configuration and CDN setup to database provisioning and CMS installation — enabling non-technical staff to launch websites through a one-click interface.
- Designed a 5-step migration wizard that guides users through the complete website migration workflow with drag-and-drop sitemap editing, questionnaire parsing, and real-time content generation progress tracking.

---

## 4A. FastAPI Backend Architecture

- Architected entire Python backend: `app/` package with `api/`, `services/`, `schemas/`, `utils/` — CGD [PR #10](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/10), [PR #15](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/15)
- Progressive refactoring from flat scripts to modular package structure — CGD [PR #9](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/9)
- pytest test infrastructure with coverage configuration — CGD [PR #20](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/20)

## 4B. AI Content Generation (OpenAI Integration)

- OpenAI text generation router with structured output via Pydantic models — CGD [PR #17](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/17)
- Content matches exact WordPress template schemas via `api_structured_output.py` and `openai_wrapper.py` — CGD [PR #24](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/24)
- Template-specific prompt building with content examples (Calistoga, Stinson, Eureka, etc.) — CGD [PR #40](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/40)
- Sitemap generation supporting questionnaire data and markdown content with validation — CGD [PR #28](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/28)
- Template automation: link validation, CTA standardization, router JavaScript generation — CGD [PR #47](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/47)
- Frontend: `GenerateContentProgress` component, `ContentGenerator` — TMU [PR #2](https://github.com/roostergrin/template-manager-ui/pull/2), [PR #3](https://github.com/roostergrin/template-manager-ui/pull/3), [PR #10](https://github.com/roostergrin/template-manager-ui/pull/10)

## 4C. Web Scraping System (Playwright)

- Captures full structure, content, styles, and assets of existing dental websites — CGD [PR #42](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/42)
- Scraper refactoring removing 12K lines of legacy code — CGD [PR #48](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/48)
- Playwright browser automation in containerized environments — CGD [PR #44](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/44)
- RAG pipeline: vector stores from scraped content for contextually grounded generation — CGD [PR #49](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/49)
- Frontend: `ScrapedContentViewer`, `DesignSystemViewer`, `VectorStoreManager`, batch CSV processing — TMU [PR #11](https://github.com/roostergrin/template-manager-ui/pull/11), [PR #17](https://github.com/roostergrin/template-manager-ui/pull/17), [PR #18](https://github.com/roostergrin/template-manager-ui/pull/18)

## 4D. Intelligent Image Assignment System

- `image_assigner.py`: Analyzes page content and assigns relevant stock images per section — CGD [PR #21](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/21), [PR #22](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/22)
- Duplicate tracking across pages, semantic hints for selection — CGD [PR #26](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/26)
- Template-specific image libraries for 7+ templates with search indexing — CGD [PR #39](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/39), [PR #41](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/41)

## 4E. DNS Automation & Domain Management

- AWS Route 53 + CloudFront programmatic configuration — CGD [PR #42](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/42), [PR #43](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/43), [PR #46](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/46)
- Domain name support in UI — TMU [PR #16](https://github.com/roostergrin/template-manager-ui/pull/16)

## 4F. Plesk WordPress Integration & Site Provisioning

- SSH-based Plesk subscription creation, MySQL database/user setup, WordPress credential configuration — CGD [PR #30](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/30), [PR #31](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/31), [PR #45](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/45)
- One-click provisioning via `InfrastructureSetup` UI component — TMU [PR #7](https://github.com/roostergrin/template-manager-ui/pull/7), [PR #13](https://github.com/roostergrin/template-manager-ui/pull/13), [PR #14](https://github.com/roostergrin/template-manager-ui/pull/14)

## 4G. AWS Infrastructure & CI/CD

- S3 bucket management, CodeBuild/CodePipeline, Lightsail container deployment — CGD [PR #27](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/27)
- Docker containerization with Playwright system dependencies — CGD [PR #32](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/32), [PR #33](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/33), [PR #44](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/44)
- GitHub Actions workflows for continuous deployment — CGD [PR #32](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/32)

## 4H. Template Manager UI (React)

- **Migration Wizard**: 5-step guided flow (Capture -> Audit -> Structure -> Generate -> Launch) — TMU [PR #15](https://github.com/roostergrin/template-manager-ui/pull/15)
- **Drag-and-drop sitemap editor** using @dnd-kit — TMU [PR #5](https://github.com/roostergrin/template-manager-ui/pull/5), [PR #6](https://github.com/roostergrin/template-manager-ui/pull/6)
- **Google Doc parser**: `QuestionnaireManager`, `MarkdownTextArea` — TMU [PR #4](https://github.com/roostergrin/template-manager-ui/pull/4)
- **One-click deployment**: `EnhancedProvisionSection`, `GitHubRepoCreator`, `WordPressUpdater` — TMU [PR #14](https://github.com/roostergrin/template-manager-ui/pull/14)
- **DefaultTemplateSelector** — TMU [PR #9](https://github.com/roostergrin/template-manager-ui/pull/9)

## 4I. Adobe Stock Integration

- OAuth 2.0 authentication, license management, keyword-based image searching — CGD [PR #34](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/34), [PR #31](https://github.com/roostergrin/ContentGenerationAndDistribution/pull/31)

---

# PROJECT 5: `openchair_widget` (React Scheduling Widget)

**27 merged PRs | July 2023 -- February 2026**

Embeddable scheduling widget installed on dental practice websites.

### Resume-Ready Highlights

- Owned the scheduling widget embedded across hundreds of dental practice websites, delivering features including bot protection, marketing attribution tracking, and configurable display options for multi-location brands.
- Resolved critical production booking failures through a 48-hour debugging sprint (12 pull requests), using systematic logging and incremental fixes to restore service under pressure.

---

## Key Features Built:

- **`disableMap` config**: Prevents widget from initializing Google Maps — [PR #220](https://github.com/roostergrin/openchair_widget/pull/220), [PR #221](https://github.com/roostergrin/openchair_widget/pull/221)
- **`showPhoneMessageOnDropdown`**: Phone number message on initial dropdown — [PR #222](https://github.com/roostergrin/openchair_widget/pull/222)
- **`customMessage` config**: Custom practice messages in widget — [PR #246](https://github.com/roostergrin/openchair_widget/pull/246)
- **`hideTooltip` config**: Configurable tooltip visibility — [PR #436](https://github.com/roostergrin/openchair_widget/pull/436), [PR #437](https://github.com/roostergrin/openchair_widget/pull/437)
- **Location name swaps**: Override displayed names for DSO brand consistency — [PR #374](https://github.com/roostergrin/openchair_widget/pull/374)
- **reCAPTCHA Integration** (77 lines): `react-google-recaptcha` in patient form, token prop-drilled to booking API, coordinated with backend verification — [PR #323](https://github.com/roostergrin/openchair_widget/pull/323), [PR #327](https://github.com/roostergrin/openchair_widget/pull/327)
- **Open widget without bookings** (95 additions): Widget displays practice info even when no slots available — [PR #334](https://github.com/roostergrin/openchair_widget/pull/334), [PR #339](https://github.com/roostergrin/openchair_widget/pull/339), [PR #341](https://github.com/roostergrin/openchair_widget/pull/341)
- **UTM tracking**: Reads tracking params from localStorage, appends to form submission for marketing attribution — [PR #295](https://github.com/roostergrin/openchair_widget/pull/295), [PR #310](https://github.com/roostergrin/openchair_widget/pull/310)
- **Evenly OS debugging** (12 PRs in 48 hours): Systematic production debugging -- strategic logging, guard clauses, booking reset fix — [PR #252](https://github.com/roostergrin/openchair_widget/pull/252) through [PR #263](https://github.com/roostergrin/openchair_widget/pull/263)
- **Widget documentation**: Comprehensive README, GitHub Actions workflow publishing README to public repo — [PR #337](https://github.com/roostergrin/openchair_widget/pull/337), [PR #392](https://github.com/roostergrin/openchair_widget/pull/392), [PR #394](https://github.com/roostergrin/openchair_widget/pull/394), [PR #395](https://github.com/roostergrin/openchair_widget/pull/395)

---

# PROJECT 6: `onboarding-front-end` (React Admin Portal)

**14 PRs | July 2023 -- February 2026**

Internal portal for onboarding dental practices.

### Resume-Ready Highlights

- Improved internal admin portal performance by replacing a real-time search architecture with optimized client-side filtering, while building product management workflows, phone number provisioning, and sync tooling supporting 6 third-party system types.

---

## Key Features Built:

- **Search refactor** (191 additions, 297 deletions): Replaced WebSocket-based search with client-side filtering — [PR #276](https://github.com/roostergrin/onboarding-front-end/pull/276), [PR #277](https://github.com/roostergrin/onboarding-front-end/pull/277)
- **CRM Product Management** (143 additions): New CRM product type with ad account management — [PR #241](https://github.com/roostergrin/onboarding-front-end/pull/241)
- **Phone number management**: Business-gated purchasing, copy-paste-friendly formatting — [PR #220](https://github.com/roostergrin/onboarding-front-end/pull/220), [PR #223](https://github.com/roostergrin/onboarding-front-end/pull/223), [PR #226](https://github.com/roostergrin/onboarding-front-end/pull/226), [PR #227](https://github.com/roostergrin/onboarding-front-end/pull/227)
- **Widget config admin UI**: Toggle controls for openchair_widget options — [PR #209](https://github.com/roostergrin/onboarding-front-end/pull/209), [PR #211](https://github.com/roostergrin/onboarding-front-end/pull/211), [PR #234](https://github.com/roostergrin/onboarding-front-end/pull/234)
- **Sync button** (152 additions): Manual sync triggers for 6 PMS types — [PR #302](https://github.com/roostergrin/onboarding-front-end/pull/302)
- **Dashboard tooltips**: PMS type and product name hover info — [PR #221](https://github.com/roostergrin/onboarding-front-end/pull/221)

---

# PROJECT 7: `rooster_reminders_front_end` (React Communication Dashboard)

**22 PRs | June 2023 -- July 2025**

Main patient communication dashboard used by dental practices.

### Resume-Ready Highlights

- Built an AI-powered chat assistant into the patient communication dashboard, giving practice staff instant access to intelligent responses through a non-intrusive floating interface.
- Designed configuration interfaces for missed call automation and business hours management, enabling practice staff to customize automated patient outreach without developer support.
- Created an interactive visual reminder scheduler that allowed practices to configure post-appointment recall timing through an intuitive drag-based interface.

---

## Key Features Built:

- **Missed Call Text Settings** (366 additions): New tab with `MissedCallMessageSetting` (121 lines) container + `MissedCallMessage` (174 lines) editor. Redux integration — [PR #794](https://github.com/roostergrin/rooster_reminders_front_end/pull/794), [PR #799](https://github.com/roostergrin/rooster_reminders_front_end/pull/799)
- **Active Hours UI** (402 additions): `WeeklyHours` (146 lines) + `BusinessHoursSelection` (152 lines) -- weekly schedule with per-day time pickers. Full Redux integration — [PR #827](https://github.com/roostergrin/rooster_reminders_front_end/pull/827), [PR #828](https://github.com/roostergrin/rooster_reminders_front_end/pull/828)
- **AI Assistant Chat** (629 additions -- largest feature): OpenAI API service layer, Redux state management (98-line action creator, 41-line reducer), `AIAssistantButton` (142 lines), `AIAssistantPopoverContent` (142 lines) — [PR #899](https://github.com/roostergrin/rooster_reminders_front_end/pull/899), [PR #900](https://github.com/roostergrin/rooster_reminders_front_end/pull/900), [PR #901](https://github.com/roostergrin/rooster_reminders_front_end/pull/901)
- **Post-Appointment Recall Reminders** (188 additions): Weekly time scale slider, SVG-based visual scale, positive time offset support — [PR #795](https://github.com/roostergrin/rooster_reminders_front_end/pull/795), [PR #796](https://github.com/roostergrin/rooster_reminders_front_end/pull/796)
- **Always Send fix**: Fixed checkbox behavior across all message types — [PR #873](https://github.com/roostergrin/rooster_reminders_front_end/pull/873)
- **Last Sync Date Display** (152 additions): Sync status banner, Dolphin troubleshooting component — [PR #904](https://github.com/roostergrin/rooster_reminders_front_end/pull/904), [PR #905](https://github.com/roostergrin/rooster_reminders_front_end/pull/905)
- **Email conversation routing fixes**: Encoding/decoding for internal mailbox format, location-based "from" address selection — [PR #771](https://github.com/roostergrin/rooster_reminders_front_end/pull/771), [PR #772](https://github.com/roostergrin/rooster_reminders_front_end/pull/772), [PR #773](https://github.com/roostergrin/rooster_reminders_front_end/pull/773), [PR #774](https://github.com/roostergrin/rooster_reminders_front_end/pull/774)
- **Event bubbling fix**: Fixed `onMouseLeave` preventing file picker onChange, restored image attachments — [PR #833](https://github.com/roostergrin/rooster_reminders_front_end/pull/833), [PR #834](https://github.com/roostergrin/rooster_reminders_front_end/pull/834)
- **Post recalls for SSP** — [PR #875](https://github.com/roostergrin/rooster_reminders_front_end/pull/875), [PR #876](https://github.com/roostergrin/rooster_reminders_front_end/pull/876)

---

---

# PROJECT 8: `CPP` -- Automotive Parts Data Platform (Python Monorepo)

**Personal project | August 2025 -- Present (~23 commits)**

A monorepo platform for processing automotive aftermarket parts data from multiple vendors, matching parts to vehicles via a "golden" master dataset (~317K vehicles), and outputting Shopify-ready and Convermax-ready product imports. Heavy use of AI (OpenAI GPT-4.1-mini) for vehicle fitment matching where deterministic methods fall short.

### Resume-Ready Highlights

- Built an AI-powered data pipeline that matches automotive parts to a database of 317,000+ vehicles, using a cascading strategy that tries deterministic matching first and falls back to AI only when needed — reducing API costs by 60–80%.
- Architected a modular Python platform with shared libraries supporting multiple vendor data sources, implementing a multi-strategy data normalization system that handles brand name variations, historical changes, and fuzzy matching.
- Developed a concurrent web scraper capable of processing thousands of product pages with automatic progress saving, memory management, and graceful error recovery for reliable large-scale data collection.
- Created a test-driven data enrichment system that improved the quality of a 317,000-record vehicle database by using AI to predict missing attributes, with built-in cost tracking and budget controls to manage API spending.

---

## 8A. Monorepo Architecture

Built a scalable Python monorepo with clear separation of concerns:

```
CPP/
├── libs/                          # Shared installable packages
│   ├── vehicle_fitment_dictionary/  # Core VFD package (pip-installable)
│   ├── io/                          # cpp-io: file I/O, project root discovery
│   └── schemas/                     # cpp-schemas: shared data models
├── apps/
│   ├── streamlit_app/              # Orchestrator dashboard UI
│   └── vendor_scrapers/            # Per-vendor web scrapers
├── vendors/                        # Vendor-specific processors
│   ├── Steele/                     # Steele Rubber Products
│   ├── Kanter/                     # Kanter Auto Products
│   └── Precision Replacement/      # PRP vendor
├── projects/                       # Pipeline projects (ABAP, REM)
├── common/                         # Master golden dataset enhancement tools
└── .claude/                        # AI agent commands & workflows
    ├── commands/                   # analyze-product, create-spec, create-tasks, execute-tasks, plan-product
    └── agents/                     # context-fetcher, date-checker, file-creator, git-workflow, project-manager, test-runner
```

## 8B. Vehicle Fitment Dictionary (VFD) -- Core Library (`libs/vehicle_fitment_dictionary`)

The heart of the system -- a pip-installable Python package (`vfd`) providing vehicle-to-part matching:

- **`core.py`**: Loads and normalizes the "golden dataset" (`master_ultimate_golden.csv`, ~317K vehicle records with year/make/model/submodel/body/engine/car_id). Column normalization, `pattern_key()` generation, `iter_unique_patterns()` for deduplication
- **`matching.py`**: AI-powered vehicle matching using OpenAI:
  - `ModelMatchResult` and `MatchConfidence` Pydantic models for structured output
  - `build_model_matching_prompt()`: Constructs prompts with vehicle specs + golden dataset options (year, make, model, submodel, type, doors, body type)
  - `AIVehicleMatcher`: Single-item realtime matching with `find_potential_matches()` (cascading: exact Year+Make+Model -> Year+Make -> Year-only fallback)
  - `BatchAIVehicleMatcher`: Queues tasks for OpenAI Batch API ($0.80/1M input tokens vs. realtime pricing) with `process_batch()`, `wait_for_completion()`, `retrieve_batch_results()`
- **`batch.py`**: `VehicleFitmentBatch` class -- high-level orchestrator that queues unique (year, make, model) patterns, submits to OpenAI Batch API, then builds pattern->car_id mappings from results
- **`mapping.py`**: Parses batch result JSONL files, extracts `selected_ids`/`selected_car_ids` from nested OpenAI response objects, builds `Dict[pattern_key, List[car_id]]` mappings. Also creates lookup DataFrames from batch results
- **`vendor_ids.py`**: Generates deterministic vendor IDs using SHA-256 hashing of canonicalized row keys (`_canonicalize_row_for_key()` with URL-escaped k=v pairs). Produces stable `steele:v1:<base64_hash>` identifiers
- **`realtime.py`**: `VehicleFitmentRealtime` -- single-query interface for on-demand matching, used by the Streamlit app
- **`make_normalization.py`**: `MakeNormalizationService` -- multi-strategy make name normalization (direct lookup -> historical brand changes with year context -> corporate variations -> fuzzy matching via `SequenceMatcher` -> AI fallback)
- **`attribute_documentation.py`**: `AttributeDocumentationService` -- tracks and documents missing vehicle attributes (doors, body styles) across processing runs for golden dataset improvement
- **`mug_batch_processor.py`**: `MUGBatchProcessor` -- enhanced batch processor for Master Ultimate Golden missing entries, integrates make normalization + attribute documentation

## 8C. Master Golden Dataset Enhancement (`common/`)

TDD-developed system for enriching the master vehicle dataset (317K records, 10.8% with unknown "U/K" body styles):

- **`gpt5_body_predictor.py`**: OpenAI integration for predicting vehicle body styles with model pricing tracking (GPT-4.1-mini, GPT-4o, GPT-4o-mini, GPT-4-turbo), retry logic with exponential backoff
- **`cost_calculator.py`**: `CostCalculator` class tracking per-request and cumulative API costs, budget enforcement, model-specific pricing per million tokens
- **`batch_processor.py`**: `BatchProcessor` with configurable batch sizes, `ThreadPoolExecutor` for parallel processing, progress saving with resume capability, thread-safe operations via `threading.Lock`
- **`csv_analyzer.py`**: `CSVAnalyzer` for loading/filtering/analyzing vehicle data, extracting U/K records
- **`data_merger.py`**: Merges enhanced body-style data back into the master golden CSV, overlap analysis, duplicate-safe merging
- **`enhance_master_golden.py`**: CLI orchestrator tying it all together: dry-run cost estimation, budget limits, resume from progress, verbose logging
- **62 comprehensive tests** across 5 test files: `test_csv_analyzer.py`, `test_gpt5_predictor.py`, `test_cost_calculator.py`, `test_batch_processor.py`, `test_integration.py` with fixtures and mocks

## 8D. Vendor Processors

### Steele Rubber Products (`vendors/Steele/steele_processor/`)

Full processing pipeline with clean architecture:

- **`core/models.py`**: Data models for Steele processing
- **`core/validation.py`**: Input validation
- **`core/conversion.py`**: `SteeleToConvermaxConverter` -- converts Steele data to Convermax format via golden dataset lookup. Creates vendor ID -> vehicle info mappings, extracts year/make/model/submodel/engine/body/drive_type per ymm_id
- **`utils/data_processing.py`**: CSV loading, ymm_id array parsing
- **`utils/file_operations.py`**: File I/O with metadata logging
- **`utils/logging.py`**: Structured logging
- **`config/settings.py`**: Configuration management
- Tests with fixtures and conftest

### Kanter Auto Products (`vendors/Kanter/kanter_scraper/`)

Web scraper for automotive parts catalog:

- **`enhanced_scraper.py`** (complex): Multi-threaded web scraper with:
  - Sitemap parsing (XML) for URL discovery with sub-sitemap support
  - `ThreadPoolExecutor` for concurrent page scraping
  - Shadow DOM extraction via `ShadowDOMExtractor` for JavaScript-rendered content
  - `psutil` memory monitoring, signal handling for graceful shutdown
  - Rotating file handler logging (10MB max, 5 backup files)
  - Progress tracking via JSON, resume capability
- **`src/data_processing/sku_image_merger.py`**: Merges SKU data with scraped product images
- Streamlit dashboard for monitoring scrape progress

## 8E. Streamlit Orchestrator App (`apps/streamlit_app/`)

Web dashboard for running vehicle fitment operations:

- **Realtime Fitment tab**: Input year/make/model, toggle AI, get instant fitment results via `VehicleFitmentRealtime`
- **Batch Fitment Mapping tab**: Upload CSV with Year/Make/Model columns, configure golden CSV and row limits, runs `VehicleFitmentBatch` queue -> OpenAI Batch API -> pattern mapping generation
- Clean Streamlit UI with `st.tabs`, `st.columns`, `st.json` result display, error handling

## 8F. AI Agent Workflow (`.claude/`)

Configured Claude Code as a development assistant with custom commands and agent definitions:

- **5 Custom Commands**: `analyze-product`, `create-spec`, `create-tasks`, `execute-tasks`, `plan-product`
- **6 Agent Definitions**: `context-fetcher`, `date-checker`, `file-creator`, `git-workflow`, `project-manager`, `test-runner`

## 8G. Technology Stack

| Category                  | Technologies                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| **Language**        | Python 3.x                                                                                      |
| **AI/ML**           | OpenAI API (GPT-4.1-mini, GPT-4o), Batch API, Pydantic structured output                        |
| **Data Processing** | Pandas, CSV/JSONL parsing, vectorized operations                                                |
| **Web Scraping**    | BeautifulSoup, requests, XML/sitemap parsing, Shadow DOM extraction, ThreadPoolExecutor         |
| **UI**              | Streamlit                                                                                       |
| **Testing**         | pytest, fixtures, mocks, TDD methodology, 62+ tests                                             |
| **Architecture**    | Monorepo with pip-installable libs, deterministic hashing (SHA-256), cascading match strategies |
| **Cost Management** | Per-request token tracking, budget enforcement, batch API for 50%+ cost reduction               |
| **Dev Tooling**     | Claude Code agents/commands,`.agent-os` workflow configuration                                |

---

# PROJECT 9: `ABAP` -- Automotive Parts Data Transformation (Python)

**Personal project | December 2024 -- August 2025 (~30 commits, 1 PR)**

The predecessor to CPP -- a multi-vendor data transformation framework converting automotive parts catalogs into standardized Shopify-compatible formats. Three vendor pipelines (Steele, REM, Ford) with AI-powered vehicle fitment extraction.

### Resume-Ready Highlights

- Built a multi-vendor data transformation framework that converts diverse automotive parts catalogs into a standardized e-commerce import format, with a template system that enables onboarding new vendors in hours instead of weeks.
- Designed a deduplication strategy for AI-powered data processing that reduced API costs by 60–80% by grouping identical vehicle patterns and making a single AI call per unique pattern instead of per product row.

---

## 9A. Framework Architecture

Template-based framework with shared infrastructure:

- **`shared/`**: Base processor classes, config utilities, file I/O, logging -- DRY shared across all vendors
- **`template/`**: Scaffolding for new vendor onboarding via `setup_new_data_source.py`
- **`config/`**: Hierarchical configuration (vendor-specific -> shared -> defaults)
- Per-vendor directories each containing `main.py`, `batch_processor.py`, `single_processor.py`, `tests/`, `utils/`, `data/`

## 9B. Steele Pipeline (Complete Fitment Data -- NO AI Required)

For vendors providing complete year/make/model data:

- **Two-stage matching**: (1) Exact join to golden dataset on (Year, Make, Model) -> car_ids, (2) Pattern dictionary fallback via `pattern_car_id_mapping.json`
- **Vectorized implementation**: `df['pattern_key'] = df.apply(create_year_make_model_key)` then `df['car_ids'] = df['pattern_key'].map(pattern_mapping)` -- processes 1000+ products/second
- **`enhanced_pattern_processor.py`**: Stage 1 exact golden matching, Stage 2 dictionary fallback, SKU consolidation by `StockCode`, all 65 Shopify column generation
- **`pattern_processor.py`**: Pure dictionary-based tag assignment
- **`optimized_batch_steele_transformer.py`**: Per-pattern deduplication -- groups by unique (Year, Make, Model), queues at most ONE AI task per unique pattern (not per row), applies results to all matching rows
- Comprehensive test suite: `test_ai_model_matching.py`, `test_enhanced_matching.py`, `test_optimization.py`, `test_debug_integration.py`

## 9C. REM Pipeline (Incomplete Fitment Data -- AI Required)

For vendors missing vehicle compatibility data:

- **Per-row AI extraction**: `extract_product_data_with_ai(row, golden_df, client)` -- prompts OpenAI with valid makes/models/years from golden dataset as constraints
- **Structured output**: `ProductData` fields (title, year_min/max, make, models, MPN, price, collection, product_type, SEO)
- **Two-pass processing**: Pass 1 extracts product data, Pass 2 refines models to car_ids via `refine_models_with_ai(df, golden_df, client)` -- expands `ALL`/body-style variants across golden dataset
- **ABAP formatter**: Converts transformed REM data to ABAP import format

## 9D. Ford Pipeline

- Test-driven processor (`test_ford_processors.py`)
- Follows same template pattern as Steele/REM

## 9E. Shopify Column Compliance

All pipelines generate exactly **65 columns** matching Shopify product import requirements:

- Validated via `shared/data/product_import/product_import-column-requirements.py`
- Required columns: Title, Body HTML, Vendor, Tags, Variant Price, Variant Cost, etc.
- Command column set to "MERGE" for incremental imports

## 9F. OpenAI Batch API Cost Optimization

- Complete fitment (Steele): $0 AI cost -- template-based only
- Incomplete fitment (REM): Uses Batch API for 50%+ cost savings over realtime
- Per-pattern deduplication reduces AI calls by 60-80% (one call per unique Year/Make/Model pattern, not per row)
- Token-optimized prompts: AI-friendly format strips unnecessary columns

---

# CROSS-CUTTING THEMES

1. **Full-Stack Ownership**: Nearly every frontend PR references a corresponding backend PR -- coordinated both sides of every feature
2. **Production Debugging Under Pressure**: Evenly OS (12 PRs in 48 hours), SkySwitch missed calls, Twilio compliance -- systematic approach to live issues
3. **Multi-PMS Abstraction**: Built integration patterns working across Cloud9, Dolphin, Greyfinch, and OpenDental
4. **Worker-Oriented Architecture**: Consistent Sidekiq worker pattern for async processing
5. **Redis for Ephemeral State**: Telecom click tracking with TTL for correlating web events with telephony
6. **Comprehensive PR Documentation**: "What" and "Why" sections making change rationale traceable
7. **Test-Driven Development**: RSpec/pytest coverage for new features, factory definitions, shared contexts, fixture data, 62+ tests on CPP alone
8. **AI Integration Pioneer**: LLM chat service, RAG pipeline, AI content generation, MCP tools, OpenAI Batch API for cost-optimized vehicle matching
9. **Infrastructure as Code**: Docker, AWS (S3, CloudFront, CodeBuild, Lightsail), GitHub Actions, Expo config plugins
10. **Data Pipeline Architecture**: Built scalable multi-vendor automotive data processing with template-based onboarding, golden dataset validation, and deterministic + AI hybrid matching strategies
11. **Cost-Conscious AI Design**: Per-pattern deduplication (60-80% fewer API calls), Batch API (50%+ cost savings), budget enforcement, token-optimized prompts

---

# TECHNOLOGY SUMMARY

| Category                  | Technologies                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**         | Ruby on Rails, Sidekiq, Redis, RSpec, SimpleCov                                                                                                   |
| **Frontend**        | React, TypeScript, React Query, Context API, Draft.js, SASS, Vite                                                                                 |
| **Mobile**          | React Native, Expo SDK (50/51/54), TaskManager, expo-notifications, Sentry                                                                        |
| **Python**          | FastAPI, Pydantic, Playwright, pytest, OpenAI API, Pandas, Streamlit, BeautifulSoup                                                               |
| **Databases**       | PostgreSQL, Redis                                                                                                                                 |
| **Data Processing** | Pandas (vectorized ops), CSV/JSONL, Shopify product imports (65-column), Convermax format, golden dataset matching                                |
| **AI/LLM**          | OpenAI GPT-4.1-mini/GPT-4o (Realtime + Batch API), Pydantic structured output, RAG pipeline, MCP tools, cost tracking/budget enforcement          |
| **Cloud/Infra**     | AWS (S3, CloudFront, Route 53, CodeBuild, CodePipeline, Lightsail), Docker, Plesk, SSH                                                            |
| **CI/CD**           | CircleCI, Bitrise, GitHub Actions, EAS Build                                                                                                      |
| **Web Scraping**    | Playwright, BeautifulSoup, Shadow DOM extraction, sitemap parsing, ThreadPoolExecutor                                                             |
| **APIs Integrated** | Twilio, SkySwitch, CoreDial (XMPP), Greyfinch (GraphQL), Cloud9, Dolphin, OpenDental, OpenAI (Chat + Batch), Adobe Stock, Google Maps, VoipThread |
| **Auth/Security**   | Devise, reCAPTCHA, Expo SecureStore, JWT/token auth                                                                                               |
| **Architecture**    | Monorepo (pip-installable libs), template-based vendor onboarding, cascading match strategies, deterministic hashing (SHA-256)                    |
