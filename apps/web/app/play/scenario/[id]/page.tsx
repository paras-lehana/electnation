'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function ScenarioPage() {
  const { id } = useParams();
  const router = useRouter();
  const [step, setStep] = useState(0);

  // In a real app, load this from Firestore/JSON based on id
  const scenario = {
    title: id === 'chai-tapri' ? 'Chai Tapri Dilemma' : 
           id === 'whatsapp-rush' ? 'WhatsApp Forward Rush' : 'Booth ka Raasta',
    content: [
      { text: "You're at the local tea stall. A representative of a local candidate approaches and offers to pay for everyone's tea and snacks if they promise to vote for their party.", image: '☕' },
      { text: "He hands you a Rs 500 note along with a party pamphlet, winking. 'Rakh lo bhai, vote din yaad rakhna'.", image: '💸' }
    ],
    choices: [
      { text: "Take the money and say yes. (Everyone is doing it).", isCorrect: false, feedback: "Accepting cash for votes is a criminal offense under Section 171B of IPC. It leads to corrupt leaders who will steal much more from your community's development funds." },
      { text: "Politely refuse and walk away.", isCorrect: true, feedback: "Good! But you can do better. You should ideally report this." },
      { text: "Refuse, and secretly report the incident via the ECI cVIGIL app.", isCorrect: true, feedback: "Perfect! The cVIGIL app allows citizens to anonymously report Model Code of Conduct violations like vote buying within minutes. The flying squad acts on it within 100 minutes." }
    ]
  };

  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  if (step === 0) {
    return (
      <main className="min-h-screen bg-indigo-chakra flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white text-center p-12 shadow-2xl">
          <div className="text-6xl mb-6">{scenario.content[0].image}</div>
          <h1 className="font-display text-4xl font-bold text-ink-900 mb-6">{scenario.title}</h1>
          <p className="text-xl text-ink-700 mb-8 leading-relaxed">{scenario.content[0].text}</p>
          <Button size="lg" className="w-full text-lg py-6 bg-saffron-600 hover:bg-saffron-700" onClick={() => setStep(1)}>
            Continue →
          </Button>
        </Card>
      </main>
    );
  }

  if (step === 1) {
    return (
      <main className="min-h-screen bg-indigo-chakra flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{scenario.content[1].image}</div>
            <p className="text-xl text-ink-800 leading-relaxed font-medium">{scenario.content[1].text}</p>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-ink-500 uppercase tracking-widest text-sm text-center mb-6">What is your response?</p>
            {scenario.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => setSelectedChoice(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedChoice === index 
                    ? choice.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    : 'border-khadi-200 hover:border-indigo-chakra hover:bg-khadi-50'
                }`}
                disabled={selectedChoice !== null}
              >
                <span className="font-medium text-ink-900">{choice.text}</span>
              </button>
            ))}
          </div>

          {selectedChoice !== null && (
            <div className={`mt-8 p-6 rounded-xl animate-in slide-in-from-bottom-4 ${scenario.choices[selectedChoice].isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
              <h3 className="font-bold text-xl mb-2">
                {scenario.choices[selectedChoice].isCorrect ? '🎯 Correct!' : '❌ Think Again!'}
              </h3>
              <p>{scenario.choices[selectedChoice].feedback}</p>
              
              <div className="mt-6 flex gap-4">
                <Button variant="outline" className="flex-1 bg-white" onClick={() => router.push('/play')}>
                  Back to Hub
                </Button>
                {scenario.choices[selectedChoice].isCorrect && (
                  <Button className="flex-1 bg-indigo-chakra text-white" onClick={() => router.push('/play')}>
                    Claim +50 XP
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>
      </main>
    );
  }

  return null;
}
