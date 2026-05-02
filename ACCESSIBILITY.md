# Accessibility

Election Yatra targets **WCAG 2.2 AA** and ships an opinionated
**Easy Mode** for audio-first / low-literacy users.

## Principles

1. **Language over text** — Easy Mode and PwD/Yatra surfaces provide read-aloud controls, transcripts, or simplified action tiles where the flow needs them most.
2. **Keyboard-first** — core actions are native buttons/links with visible focus states and explicit labels.
3. **Reduced motion** — global motion reduction disables long animations and smooth scrolling when `prefers-reduced-motion` is enabled.
4. **Semantic HTML** — pages expose the global skip-link target, result regions use live announcements, and the streaming chat is a labelled dialog with a polite conversation log.
5. **Color contrast** — the saffron palette and muted UI states were darkened so axe color-contrast checks pass without disabling the rule.
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
- `pnpm a11y` runs axe-core against 9 core routes with WCAG 2 A/AA tags and color contrast enabled.
- `pnpm e2e:ci` runs the full Chromium browser suite, including the axe checks.
- Lighthouse CI budget: Accessibility ≥ 100 is planned for the final preview deployment.
- Manual: TalkBack + VoiceOver smoke on every release.
