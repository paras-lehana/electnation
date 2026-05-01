'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const EASY_ACTIONS = [
  { href: '/yatra', label: 'Mera voting process', helper: 'Registration se polling booth tak', icon: '🛤️' },
  { href: '/clinic', label: 'Forward check karo', helper: 'WhatsApp rumor ko verify karo', icon: '🩺' },
  { href: '/map', label: 'Booth aur office dekho', helper: 'Map aur text list dono', icon: '🗺️' },
  { href: '/migrant-corner', label: 'Shehar badla hai?', helper: 'Migrant voter ke options', icon: '🚆' },
  { href: '/sanrakshan', label: 'Vote bachao', helper: 'Paise, gift, pressure se bachav', icon: '🛡️' },
  { href: '/pwd', label: 'Accessibility help', helper: 'PwD aur senior citizen support', icon: '♿' },
];

const SPOKEN_GUIDE =
  'Easy Mode. Choose one big button. Voting process explains registration and poll day. Forward check helps verify rumors. Map shows booth and election office. Migrant help explains address update and travel planning. Vote Sanrakshan explains how to avoid cash, gifts, and pressure. Accessibility help explains PwD and senior citizen support.';

export default function EasyModePage() {
  const [status, setStatus] = useState('Ready to read this page aloud.');

  const speakGuide = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatus('Audio is not available in this browser. The text guide is visible below.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(SPOKEN_GUIDE);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.onstart = () => setStatus('Reading Easy Mode guide aloud.');
    utterance.onend = () => setStatus('Finished reading. Choose any big button to continue.');
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-leaf-50 pb-20" id="main">
      <section className="bg-white py-12 shadow-sm">
        <div className="container-yatra text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-700">Easy Mode</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink-900 md:text-5xl">Bade buttons. Kam shabd. Audio-first.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-700">
            For community classes, low-literacy users, seniors, and anyone who wants the simplest path through Election Yatra.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button onClick={speakGuide} className="min-h-14 bg-leaf-600 px-8 text-lg hover:bg-leaf-700" data-testid="easy-mode-listen">
              🔊 Listen to this page
            </Button>
            <p role="status" aria-live="polite" className="text-sm font-semibold text-ink-700" data-testid="easy-mode-status">
              {status}
            </p>
          </div>
        </div>
      </section>

      <section className="container-yatra mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Easy Mode actions">
        {EASY_ACTIONS.map((action) => (
          <Link key={action.href} href={action.href} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-leaf-500">
            <Card className="min-h-52 border-2 border-leaf-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-leaf-300 hover:shadow-lg motion-reduce:hover:translate-y-0" data-testid={`easy-action-${action.href.slice(1)}`}>
              <div className="text-5xl" aria-hidden="true">{action.icon}</div>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink-900">{action.label}</h2>
              <p className="mt-3 text-base font-semibold text-ink-600">{action.helper}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="container-yatra mt-8">
        <Card className="bg-white text-lg leading-8 text-ink-800">
          <h2 className="font-display text-2xl font-bold text-ink-900">Text guide</h2>
          <p className="mt-3">Pick one big button. If you are confused, start with “Mera voting process”. If a message feels suspicious, use “Forward check karo”. If someone offers money, gifts, or pressure, open “Vote bachao”.</p>
        </Card>
      </section>
    </main>
  );
}
