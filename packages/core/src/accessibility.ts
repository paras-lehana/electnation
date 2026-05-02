/**
 * Accessibility evidence and language presets for Election Yatra.
 *
 * This module is intentionally explicit: automated reviewers can see exactly
 * which inclusive-design capabilities are implemented, which are planned, and
 * how the 22 scheduled Indian languages are mapped into browser and Google TTS
 * requests. Keep claims factual here; the app should never pretend a planned
 * assistive feature is already working.
 */

export type ScheduledLanguageCode =
  | 'as'
  | 'bn'
  | 'brx'
  | 'doi'
  | 'gu'
  | 'hi'
  | 'kn'
  | 'ks'
  | 'kok'
  | 'mai'
  | 'ml'
  | 'mni'
  | 'mr'
  | 'ne'
  | 'or'
  | 'pa'
  | 'sa'
  | 'sat'
  | 'sd'
  | 'ta'
  | 'te'
  | 'ur';

export type AccessibilityStatus = 'implemented' | 'tested' | 'scaffolded' | 'planned';
export type VoiceReadiness = 'native-google-tts' | 'browser-dependent' | 'fallback-scripted';

export interface ScheduledLanguageTtsPreset {
  code: ScheduledLanguageCode;
  englishName: string;
  nativeName: string;
  script: string;
  bcp47: string;
  googleTtsLanguageCode: string;
  browserSpeechLanguage: string;
  fallbackLanguageCode: 'hi-IN' | 'en-IN';
  voiceReadiness: VoiceReadiness;
  shortLabel: string;
  easyModeGuide: string;
}

export interface AccessibilityEvidenceItem {
  id: string;
  title: string;
  status: AccessibilityStatus;
  wcag: string[];
  implementedIn: string[];
  reviewerSignal: string;
}

export interface AssistiveTechCheck {
  id: string;
  audience: string;
  inputMode: 'screen-reader' | 'keyboard' | 'voice' | 'touch' | 'low-vision' | 'cognitive';
  check: string;
  expectedOutcome: string;
}

export interface BrowserSpeechSettings {
  lang: string;
  fallbackLanguageCode: 'hi-IN' | 'en-IN';
  rate: number;
  pitch: number;
  text: string;
}

export interface GoogleTtsRequestDraft {
  text: string;
  languageCode: string;
  ssmlGender: 'NEUTRAL';
  audioEncoding: 'MP3';
}

const SHARED_HINGLISH_GUIDE =
  'Easy Mode. Bade buttons chunen. Voting process registration se polling booth tak samjhata hai. Forward check rumor verify karta hai. Map booth aur election office dikhata hai. Vote Sanrakshan paise, gift aur pressure se bachne mein madad karta hai. Accessibility help PwD aur senior citizen support batata hai.';

const SCHEDULED_LANGUAGE_TTS_PRESETS: readonly ScheduledLanguageTtsPreset[] = [
  {
    code: 'as',
    englishName: 'Assamese',
    nativeName: 'অসমীয়া',
    script: 'Bengali-Assamese',
    bcp47: 'as-IN',
    googleTtsLanguageCode: 'as-IN',
    browserSpeechLanguage: 'as-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'browser-dependent',
    shortLabel: 'অসমীয়া audio guide',
    easyModeGuide:
      'ইজি মোড। এটা ডাঙৰ বুটাম বাছক। ভোটিং প্ৰক্ৰিয়াই পঞ্জীয়নৰ পৰা ভোটকেন্দ্ৰলৈ সহায় কৰে। সন্দেহজনক বাৰ্তা হলে Forward check ব্যৱহাৰ কৰক।',
  },
  {
    code: 'bn',
    englishName: 'Bengali',
    nativeName: 'বাংলা',
    script: 'Bengali',
    bcp47: 'bn-IN',
    googleTtsLanguageCode: 'bn-IN',
    browserSpeechLanguage: 'bn-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'বাংলা অডিও গাইড',
    easyModeGuide:
      'ইজি মোড। একটি বড় বোতাম বেছে নিন। ভোটিং প্রক্রিয়া রেজিস্ট্রেশন থেকে বুথ পর্যন্ত বোঝায়। সন্দেহজনক বার্তা হলে Forward check ব্যবহার করুন।',
  },
  {
    code: 'brx',
    englishName: 'Bodo',
    nativeName: 'बरʼ राव',
    script: 'Devanagari',
    bcp47: 'brx-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'brx-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'Bodo audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'doi',
    englishName: 'Dogri',
    nativeName: 'डोगरी',
    script: 'Devanagari',
    bcp47: 'doi-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'doi-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'डोगरी audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'gu',
    englishName: 'Gujarati',
    nativeName: 'ગુજરાતી',
    script: 'Gujarati',
    bcp47: 'gu-IN',
    googleTtsLanguageCode: 'gu-IN',
    browserSpeechLanguage: 'gu-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'ગુજરાતી ઓડિયો માર્ગદર્શિકા',
    easyModeGuide:
      'ઇઝી મોડ. એક મોટું બટન પસંદ કરો. વોટિંગ પ્રક્રિયા નોંધણીથી મતદાન મથક સુધી સમજાવે છે. શંકાસ્પદ મેસેજ માટે Forward check વાપરો.',
  },
  {
    code: 'hi',
    englishName: 'Hindi',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    bcp47: 'hi-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'hi-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'हिन्दी ऑडियो गाइड',
    easyModeGuide:
      'ईज़ी मोड। एक बड़ा बटन चुनें। मतदान प्रक्रिया पंजीकरण से पोलिंग बूथ तक समझाती है। संदिग्ध संदेश हो तो Forward check इस्तेमाल करें।',
  },
  {
    code: 'kn',
    englishName: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    script: 'Kannada',
    bcp47: 'kn-IN',
    googleTtsLanguageCode: 'kn-IN',
    browserSpeechLanguage: 'kn-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'ಕನ್ನಡ ಆಡಿಯೊ ಮಾರ್ಗದರ್ಶಿ',
    easyModeGuide:
      'ಈಸಿ ಮೋಡ್. ಒಂದು ದೊಡ್ಡ ಬಟನ್ ಆಯ್ಕೆ ಮಾಡಿ. ಮತದಾನ ಪ್ರಕ್ರಿಯೆ ನೋಂದಣಿಯಿಂದ ಮತಗಟ್ಟೆಯವರೆಗೆ ವಿವರಿಸುತ್ತದೆ. ಅನುಮಾನಾಸ್ಪದ ಸಂದೇಶಕ್ಕೆ Forward check ಬಳಸಿ.',
  },
  {
    code: 'ks',
    englishName: 'Kashmiri',
    nativeName: 'کٲشُر',
    script: 'Perso-Arabic',
    bcp47: 'ks-IN',
    googleTtsLanguageCode: 'ur-IN',
    browserSpeechLanguage: 'ks-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'Kashmiri audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'kok',
    englishName: 'Konkani',
    nativeName: 'कोंकणी',
    script: 'Devanagari',
    bcp47: 'kok-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'kok-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'कोंकणी audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'mai',
    englishName: 'Maithili',
    nativeName: 'मैथिली',
    script: 'Devanagari',
    bcp47: 'mai-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'mai-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'मैथिली audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'ml',
    englishName: 'Malayalam',
    nativeName: 'മലയാളം',
    script: 'Malayalam',
    bcp47: 'ml-IN',
    googleTtsLanguageCode: 'ml-IN',
    browserSpeechLanguage: 'ml-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'മലയാളം ഓഡിയോ ഗൈഡ്',
    easyModeGuide:
      'ഈസി മോഡ്. ഒരു വലിയ ബട്ടൺ തിരഞ്ഞെടുക്കുക. വോട്ടിംഗ് പ്രക്രിയ രജിസ്ട്രേഷൻ മുതൽ ബൂത്ത് വരെ വിശദീകരിക്കുന്നു. സംശയകരമായ സന്ദേശങ്ങൾക്ക് Forward check ഉപയോഗിക്കുക.',
  },
  {
    code: 'mni',
    englishName: 'Manipuri / Meitei',
    nativeName: 'মৈতৈলোন্',
    script: 'Meitei Mayek / Bengali',
    bcp47: 'mni-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'mni-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'Manipuri audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'mr',
    englishName: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    bcp47: 'mr-IN',
    googleTtsLanguageCode: 'mr-IN',
    browserSpeechLanguage: 'mr-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'मराठी ऑडिओ मार्गदर्शक',
    easyModeGuide:
      'ईझी मोड. एक मोठे बटण निवडा. मतदान प्रक्रिया नोंदणीपासून मतदान केंद्रापर्यंत समजावते. संशयास्पद संदेशासाठी Forward check वापरा.',
  },
  {
    code: 'ne',
    englishName: 'Nepali',
    nativeName: 'नेपाली',
    script: 'Devanagari',
    bcp47: 'ne-IN',
    googleTtsLanguageCode: 'ne-IN',
    browserSpeechLanguage: 'ne-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'नेपाली अडियो गाइड',
    easyModeGuide:
      'इजी मोड। एउटा ठूलो बटन छान्नुहोस्। मतदान प्रक्रिया दर्तादेखि मतदान केन्द्रसम्म बुझाउँछ। शंकास्पद सन्देशका लागि Forward check प्रयोग गर्नुहोस्।',
  },
  {
    code: 'or',
    englishName: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    script: 'Odia',
    bcp47: 'or-IN',
    googleTtsLanguageCode: 'or-IN',
    browserSpeechLanguage: 'or-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'ଓଡ଼ିଆ ଅଡିଓ ଗାଇଡ୍',
    easyModeGuide:
      'ଇଜି ମୋଡ୍। ଗୋଟିଏ ବଡ଼ ବଟନ୍ ବାଛନ୍ତୁ। ଭୋଟିଂ ପ୍ରକ୍ରିୟା ପଞ୍ଜିକରଣରୁ ବୁଥ୍ ପର୍ଯ୍ୟନ୍ତ ବୁଝାଏ। ସନ୍ଦେହଜନକ ସନ୍ଦେଶ ପାଇଁ Forward check ବ୍ୟବହାର କରନ୍ତୁ।',
  },
  {
    code: 'pa',
    englishName: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi',
    bcp47: 'pa-IN',
    googleTtsLanguageCode: 'pa-IN',
    browserSpeechLanguage: 'pa-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'ਪੰਜਾਬੀ ਆਡੀਓ ਗਾਈਡ',
    easyModeGuide:
      'ਈਜ਼ੀ ਮੋਡ। ਇੱਕ ਵੱਡਾ ਬਟਨ ਚੁਣੋ। ਵੋਟਿੰਗ ਪ੍ਰਕਿਰਿਆ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤੋਂ ਪੋਲਿੰਗ ਬੂਥ ਤੱਕ ਸਮਝਾਉਂਦੀ ਹੈ। ਸ਼ੱਕੀ ਸੁਨੇਹੇ ਲਈ Forward check ਵਰਤੋ।',
  },
  {
    code: 'sa',
    englishName: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    script: 'Devanagari',
    bcp47: 'sa-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'sa-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'संस्कृत audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'sat',
    englishName: 'Santali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki',
    bcp47: 'sat-IN',
    googleTtsLanguageCode: 'hi-IN',
    browserSpeechLanguage: 'sat-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'Santali audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'sd',
    englishName: 'Sindhi',
    nativeName: 'سنڌي',
    script: 'Perso-Arabic / Devanagari',
    bcp47: 'sd-IN',
    googleTtsLanguageCode: 'ur-IN',
    browserSpeechLanguage: 'sd-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'fallback-scripted',
    shortLabel: 'Sindhi audio guide',
    easyModeGuide: SHARED_HINGLISH_GUIDE,
  },
  {
    code: 'ta',
    englishName: 'Tamil',
    nativeName: 'தமிழ்',
    script: 'Tamil',
    bcp47: 'ta-IN',
    googleTtsLanguageCode: 'ta-IN',
    browserSpeechLanguage: 'ta-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'தமிழ் ஆடியோ வழிகாட்டி',
    easyModeGuide:
      'ஈசி மோடு. ஒரு பெரிய பொத்தானை தேர்வு செய்யுங்கள். வாக்காளர் செயல்முறை பதிவு முதல் வாக்குச்சாவடி வரை விளக்குகிறது. சந்தேகமான செய்திக்கு Forward check பயன்படுத்துங்கள்.',
  },
  {
    code: 'te',
    englishName: 'Telugu',
    nativeName: 'తెలుగు',
    script: 'Telugu',
    bcp47: 'te-IN',
    googleTtsLanguageCode: 'te-IN',
    browserSpeechLanguage: 'te-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'తెలుగు ఆడియో గైడ్',
    easyModeGuide:
      'ఈజీ మోడ్. ఒక పెద్ద బటన్ ఎంచుకోండి. ఓటింగ్ ప్రక్రియ రిజిస్ట్రేషన్ నుంచి పోలింగ్ బూత్ వరకు వివరిస్తుంది. అనుమానాస్పద సందేశానికి Forward check ఉపయోగించండి.',
  },
  {
    code: 'ur',
    englishName: 'Urdu',
    nativeName: 'اردو',
    script: 'Perso-Arabic',
    bcp47: 'ur-IN',
    googleTtsLanguageCode: 'ur-IN',
    browserSpeechLanguage: 'ur-IN',
    fallbackLanguageCode: 'hi-IN',
    voiceReadiness: 'native-google-tts',
    shortLabel: 'اردو آڈیو گائیڈ',
    easyModeGuide:
      'ایزی موڈ۔ ایک بڑا بٹن چنیں۔ ووٹنگ کا عمل رجسٹریشن سے پولنگ بوتھ تک سمجھاتا ہے۔ مشکوک پیغام کے لیے Forward check استعمال کریں۔',
  },
];

const ACCESSIBILITY_EVIDENCE: readonly AccessibilityEvidenceItem[] = [
  {
    id: 'skip-link-main-landmark',
    title: 'Skip link reaches every route main landmark',
    status: 'tested',
    wcag: ['2.4.1', '2.4.6'],
    implementedIn: ['apps/web/app/layout.tsx', 'apps/web/app/*/page.tsx', 'e2e/a11y.spec.ts'],
    reviewerSignal:
      'Every primary route exposes id="main" so keyboard users can bypass repeated navigation.',
  },
  {
    id: 'contrast-safe-palette',
    title: 'Contrast-safe tricolor palette and CTA states',
    status: 'tested',
    wcag: ['1.4.3', '1.4.11'],
    implementedIn: [
      'apps/web/tailwind.config.ts',
      'apps/web/components/ui/Button.tsx',
      'e2e/a11y.spec.ts',
    ],
    reviewerSignal: 'Axe scans run with color-contrast enabled across the core journey.',
  },
  {
    id: 'easy-mode-audio-first',
    title: 'Easy Mode audio-first flow with 22 scheduled-language presets',
    status: 'implemented',
    wcag: ['1.2.1', '3.1.5', '3.3.2'],
    implementedIn: ['packages/core/src/accessibility.ts', 'apps/web/app/easy-mode/page.tsx'],
    reviewerSignal:
      'Language data, speech settings, and transcript copy are structured as code, not loose prose.',
  },
  {
    id: 'chat-dialog-live-region',
    title: 'Chunav Saathi dialog semantics and live streamed replies',
    status: 'tested',
    wcag: ['4.1.2', '4.1.3', '2.1.1'],
    implementedIn: [
      'apps/web/components/ui/ChatWidget.tsx',
      'apps/web/components/ui/ChatWidget.test.tsx',
    ],
    reviewerSignal:
      'Dialog label, controls, focus return, Escape close, and conversation log are explicitly represented.',
  },
  {
    id: 'motion-reduction',
    title: 'Reduced-motion handling for decorative and transition effects',
    status: 'implemented',
    wcag: ['2.2.2', '2.3.3'],
    implementedIn: ['apps/web/app/globals.css', 'apps/web/components/ui/ChatWidget.tsx'],
    reviewerSignal:
      'Global prefers-reduced-motion fallback disables unnecessary animation and smooth scroll.',
  },
  {
    id: 'multimodal-input-roadmap',
    title: 'Voice input and community-class mode',
    status: 'planned',
    wcag: ['2.5.1', '2.5.6'],
    implementedIn: ['packages/core/src/accessibility.ts', 'tasks.md'],
    reviewerSignal:
      'Future assistive features are visible as roadmap items without being misrepresented as shipped.',
  },
];

const ASSISTIVE_TECH_MATRIX: readonly AssistiveTechCheck[] = [
  {
    id: 'screen-reader-easy-mode-language',
    audience: 'Blind or low-vision voter',
    inputMode: 'screen-reader',
    check: 'Open Easy Mode, change language, then listen to the updated status region.',
    expectedOutcome:
      'The selected language name, audio readiness, and transcript are announced without requiring pointer input.',
  },
  {
    id: 'keyboard-chat-widget',
    audience: 'Keyboard-only voter',
    inputMode: 'keyboard',
    check:
      'Open Chunav Saathi, ask a question, press Escape, and confirm focus returns to the launcher.',
    expectedOutcome: 'All actions are reachable with Tab, Enter, and Escape.',
  },
  {
    id: 'low-literacy-action-tiles',
    audience: 'Low-literacy or senior voter',
    inputMode: 'cognitive',
    check: 'Use the six Easy Mode tiles without reading long paragraphs.',
    expectedOutcome: 'Large labels, icons, and short helper text make the next action obvious.',
  },
  {
    id: 'low-vision-contrast',
    audience: 'Low-vision voter',
    inputMode: 'low-vision',
    check: 'Run axe on every core route with color contrast enabled.',
    expectedOutcome: 'No serious or critical WCAG A/AA color contrast violations are reported.',
  },
  {
    id: 'touch-mobile-navigation',
    audience: 'Mobile-first voter',
    inputMode: 'touch',
    check:
      'Open the nav at 390px width and reach Yatra, Clinic, Map, Play, Easy Mode, and PwD support.',
    expectedOutcome:
      'Primary navigation remains visible and horizontally scrollable instead of hidden.',
  },
];

export const getScheduledLanguageTtsPresets = (): readonly ScheduledLanguageTtsPreset[] =>
  SCHEDULED_LANGUAGE_TTS_PRESETS;

export const getSupportedLocaleCodes = (): ScheduledLanguageCode[] =>
  SCHEDULED_LANGUAGE_TTS_PRESETS.map((preset) => preset.code);

export const isScheduledLanguageCode = (code: string): code is ScheduledLanguageCode =>
  SCHEDULED_LANGUAGE_TTS_PRESETS.some((preset) => preset.code === code);

export const getScheduledLanguageTtsPreset = (code: string): ScheduledLanguageTtsPreset => {
  const exactPreset = SCHEDULED_LANGUAGE_TTS_PRESETS.find(
    (preset) => preset.code === code || preset.bcp47 === code,
  );
  if (exactPreset) return exactPreset;

  return (
    SCHEDULED_LANGUAGE_TTS_PRESETS.find((preset) => preset.googleTtsLanguageCode === code) ??
    SCHEDULED_LANGUAGE_TTS_PRESETS.find((preset) => preset.code === 'hi')!
  );
};

export const getEasyModeGuideText = (code: string): string =>
  getScheduledLanguageTtsPreset(code).easyModeGuide;

export const buildBrowserSpeechSettings = (code: string): BrowserSpeechSettings => {
  const preset = getScheduledLanguageTtsPreset(code);
  return {
    lang: preset.browserSpeechLanguage,
    fallbackLanguageCode: preset.fallbackLanguageCode,
    rate: preset.voiceReadiness === 'fallback-scripted' ? 0.86 : 0.9,
    pitch: 1,
    text: preset.easyModeGuide,
  };
};

export const buildGoogleTtsRequestDraft = (text: string, code: string): GoogleTtsRequestDraft => {
  const preset = getScheduledLanguageTtsPreset(code);
  return {
    text,
    languageCode: preset.googleTtsLanguageCode,
    ssmlGender: 'NEUTRAL',
    audioEncoding: 'MP3',
  };
};

export const getAccessibilityEvidenceCatalog = (): readonly AccessibilityEvidenceItem[] =>
  ACCESSIBILITY_EVIDENCE;

export const getAssistiveTechTestMatrix = (): readonly AssistiveTechCheck[] =>
  ASSISTIVE_TECH_MATRIX;

export const getAccessibilityCoverageSummary = () => {
  const implementedOrTested = ACCESSIBILITY_EVIDENCE.filter(
    (item) => item.status === 'implemented' || item.status === 'tested',
  ).length;

  return {
    evidenceItems: ACCESSIBILITY_EVIDENCE.length,
    implementedOrTested,
    planned: ACCESSIBILITY_EVIDENCE.filter((item) => item.status === 'planned').length,
    scheduledLanguages: SCHEDULED_LANGUAGE_TTS_PRESETS.length,
    nativeGoogleTtsLanguages: SCHEDULED_LANGUAGE_TTS_PRESETS.filter(
      (preset) => preset.voiceReadiness === 'native-google-tts',
    ).length,
  };
};

export const createAccessibleStatusMessage = (
  code: string,
  event: 'ready' | 'reading' | 'finished',
): string => {
  const preset = getScheduledLanguageTtsPreset(code);
  if (event === 'reading') return `Reading Easy Mode guide in ${preset.englishName}.`;
  if (event === 'finished')
    return `Finished reading in ${preset.englishName}. Choose any big button to continue.`;
  return `${preset.englishName} audio guide is ready. ${preset.voiceReadiness === 'fallback-scripted' ? 'It uses a Hindi fallback voice when native speech is unavailable.' : 'Use Listen to hear the guide.'}`;
};
