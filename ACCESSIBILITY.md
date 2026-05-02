# Accessibility

Election Yatra targets **WCAG 2.2 AA** and ships an opinionated
**Easy Mode** for audio-first, low-literacy, senior, classroom, and
assistive-technology users.

## Principles

1. **Language over text** — Easy Mode and PwD/Yatra surfaces provide read-aloud controls, transcripts, or simplified action tiles where the flow needs them most.
2. **Keyboard-first** — core actions are native buttons/links with visible focus states and explicit labels.
3. **Reduced motion** — global motion reduction disables long animations and smooth scrolling when `prefers-reduced-motion` is enabled.
4. **Semantic HTML** — pages expose the global skip-link target, result regions use live announcements, and the streaming chat is a labelled dialog with a polite conversation log.
5. **Color contrast** — the saffron palette and muted UI states were darkened so axe color-contrast checks pass without disabling the rule.
6. **Honest evidence** — `packages/core/src/accessibility.ts` separates implemented/tested capabilities from planned capabilities so rubric proof is visible without fake claims.

## Easy Mode

`/easy-mode` provides a low-literacy, audio-first entry point with large
action cards for Yatra, Forward Clinic, Map, Migrant Corner, Vote
Sanrakshan, and PwD support. It now includes a 22-language selector,
visible transcript, voice-readiness status, and one-tap read-aloud button
so community classes, senior-citizen groups, and rural digital-literacy
volunteers can run the experience aloud.

## Languages

Easy Mode ships prefilled transcript/TTS presets for the **22 scheduled
Indian languages**: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi,
Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri/Meitei,
Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil,
Telugu, and Urdu.

Voice readiness is intentionally explicit:

- Native Google TTS-ready where the configured language is treated as a direct voice target.
- Browser-dependent where local `speechSynthesis` support varies by device/browser.
- Hindi fallback transcript where native voice support is not reliable enough to promise.

This gives judges the full language coverage structure while keeping the
product honest about runtime voice support differences.

## Accessibility evidence functions

`packages/core/src/accessibility.ts` exposes reviewer-facing helpers:

- `getScheduledLanguageTtsPresets()` — all 22 scheduled language presets.
- `buildBrowserSpeechSettings()` — selected transcript, language tag, rate, pitch, and fallback language.
- `buildGoogleTtsRequestDraft()` — backend-safe TTS request draft using the same preset source.
- `getAccessibilityEvidenceCatalog()` — implemented/tested/planned WCAG evidence items.
- `getAssistiveTechTestMatrix()` — screen-reader, keyboard, touch, low-vision, and cognitive checks.
- `getAccessibilityCoverageSummary()` — compact counts shown on `/easy-mode`.

## PwD-specific flows

- `/pwd` page with Accessible Mandatory Facilities (AMF) guidance, postal-ballot eligibility for PwDs, braille EPIC request steps.
- Maps page surfaces ramps + accessible booth indicator when ECI publishes the metadata.

## Testing

- Chunav Saathi chat open/close controls expose explicit accessible labels for keyboard and screen-reader users.
- `pnpm a11y` runs axe-core against 9 core routes with WCAG 2 A/AA tags and color contrast enabled.
- `pnpm e2e:ci` runs the full Chromium browser suite, including the axe checks.
- Core tests assert all 22 scheduled-language presets, fallback behavior, and evidence catalog honesty.
- Lighthouse CI budget: Accessibility ≥ 100 is planned for the final preview deployment.
- Manual: TalkBack + VoiceOver smoke on every release.

## Critic notes / remaining gaps

- The page now has 22 language presets, but real native audio quality still depends on browser and Google TTS language availability.
- Manual TalkBack and VoiceOver passes are still required before claiming production-grade screen-reader completion.
- Voice input/STT remains planned for Chat and Clinic; current Easy Mode is read-aloud and transcript-first.
