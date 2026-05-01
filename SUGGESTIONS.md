# Election Yatra Suggestions

Purpose: win-focused backlog for improving Election Yatra beyond the current deployed MVP.

## Priority 1 - Google Maps Depth Pack

**Issue**: The map flow proves Maps and Distance Matrix, but judges will notice if it does not feel like a complete voter logistics assistant.

**Plan**:
- Add one-tap geolocation for "near me" civic help.
- Use Places Nearby Search for ERO/BLO offices, polling help desks, public transport, hospitals, police stations, and accessible facilities.
- Use Directions or Routes API for walking, transit, and driving route cards.
- Add Street View Static preview or nearby landmark cards for booth confidence.
- Add Maps Static share cards for WhatsApp-friendly location guidance.

**Why it helps win**: It turns the map from a proof point into a real poll-day utility.

## Priority 2 - Gamified Civic Quest

**Issue**: Current XP and badges work, but the game loop can be more memorable.

**Plan**:
- Add daily civic quests: verify a forward, complete a yatra step, help a first-time voter, learn one right.
- Add streaks, badge collections, district leaderboard, and classroom/team mode.
- Add a Democracy Passport with stamp art for each completed station.
- Add timed misinformation drills with safe explanations after each answer.

**Why it helps win**: Judges remember products that feel alive, replayable, and teach through action.

## Priority 3 - Migrant Voter Planner

**Issue**: Research identified migrants as a high-friction audience, but the current flow is still mostly educational.

**Plan**:
- Ask current city, home constituency, age, and registration status.
- Explain registration/transfer options in simple language.
- Use Geocoding and Places to locate nearby election offices and document help centers.
- Offer Calendar reminders and shareable checklist cards.

**Why it helps win**: It targets a real underserved voter segment with a concrete workflow.

## Priority 4 - AI Coach Upgrade

**Issue**: Chunav Saathi answers questions, but it can become more interactive and evaluator-friendly.

**Plan**:
- Add structured answer modes: simple, detailed, audio-first, classroom.
- Add source cards with official ECI/NVSP links after every answer.
- Add scenario-aware hints inside Play rather than only after answers.
- Add a teacher/facilitator prompt mode for community workshops.

**Why it helps win**: It demonstrates prompt engineering, safety, accessibility, and practical education.

## Priority 5 - Better UI Polish

**Issue**: The current UI has strong identity, but more motion/detail can make it demo-stage memorable.

**Plan**:
- Add a full journey map with animated station progress.
- Add badge cabinet, XP meter, and Democracy Passport visual surface.
- Improve map page density with split map/list panels and quick filters.
- Add mobile-first bottom actions for Easy Mode and Play.

**Why it helps win**: Judges often decide quickly; polish makes the project feel complete.

## Priority 6 - Automated Quality Gates

**Issue**: Manual browser smoke exists, but automated UI/accessibility proof is still pending.

**Plan**:
- Add Playwright smoke tests for `/`, `/chat`, `/clinic`, `/map`, `/easy-mode`, and Play scenarios.
- Add axe checks for primary flows.
- Add a deployment smoke script that validates stable Cloud Run URLs after every deploy.

**Why it helps win**: It strengthens code quality, accessibility, and reliability rubric scores.