# Accessibility

Election Yatra targets **WCAG 2.2 AA** and ships an opinionated
**Easy Mode** for audio-first / low-literacy users.

## Principles

1. **Language over text** — read-aloud on every content card via Cloud TTS; mic input via Cloud STT.
2. **Keyboard-first** — every interactive element reachable via Tab; stepper uses arrow keys; focus ring visible in saffron-200 outline.
3. **Reduced motion** — marigold particles, chakra spin, and diya flicker all respect `prefers-reduced-motion`.
4. **Semantic HTML** — landmark roles, heading hierarchy H1 → H3, lists where lists belong, live regions for streaming chat.
5. **Color contrast** — all body text ≥ 4.5:1 against khadi background; primary CTA saffron-500 on white passes AAA.

auto-plays a 15-second Chunav Saathi narration in the selected locale.
## Easy Mode

`/easy-mode` provides a low-literacy, audio-first entry point with large
action cards for Yatra, Forward Clinic, Map, Migrant Corner, Vote
Sanrakshan, and PwD support. It includes a visible transcript and a
one-tap read-aloud button so community classes, senior-citizen groups,
and rural digital-literacy volunteers can run the experience aloud.

## Languages

Shipping locales: **English, Hindi, Bengali, Tamil**.
Server-side fallback via Cloud Translation for the 7 other scheduled
languages (Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu).

## PwD-specific flows

- `/pwd` page with Accessible Mandatory Facilities (AMF) guidance, postal-ballot eligibility for PwDs, braille EPIC request steps.
- Maps page surfaces ramps + accessible booth indicator when ECI publishes the metadata.

## Testing

- Chunav Saathi chat open/close controls expose explicit accessible labels for keyboard and screen-reader users.
- `pnpm test:a11y` runs axe-core against every route (target 0 violations).
- Lighthouse CI budget: Accessibility ≥ 100.
- Manual: TalkBack + VoiceOver smoke on every release.
