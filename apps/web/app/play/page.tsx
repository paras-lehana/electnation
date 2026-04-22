'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const SCENARIOS = [
  {
    id: 'chai-tapri',
    title: 'Chai Tapri Dilemma',
    description: 'A local candidate offers free gifts at the tea stall. What do you do?',
    icon: '☕',
    difficulty: 'Easy',
    points: 50,
  },
  {
    id: 'whatsapp-rush',
    title: 'WhatsApp Forward Rush',
    description: 'You have 60 seconds to classify 10 election forwards as real or fake.',
    icon: '📱',
    difficulty: 'Hard',
    points: 150,
  },
  {
    id: 'booth-raasta',
    title: 'Booth ka Raasta',
    description: 'Navigate a migrant worker through the maze to register for a postal ballot.',
    icon: '🗺️',
    difficulty: 'Medium',
    points: 100,
  }
];

export default function PlayPage() {
  return (
    <main className="min-h-screen bg-khadi-50 pb-20">
      <div className="bg-saffron-50 py-16 border-b border-saffron-100">
        <div className="container-yatra text-center">
          <span className="inline-block px-4 py-1 bg-saffron-200 text-saffron-800 rounded-full text-sm font-bold mb-4 tracking-wider">
            DEMOCRACY KA TYOHAR
          </span>
          <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
            Play & <span className="text-leaf-600">Learn</span>
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-lg text-ink-700">
            Earn <strong>Chakra Points</strong> and badges by completing these real-world election scenarios.
          </p>
          
          <div className="mt-8 flex justify-center gap-6">
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-khadi-200 min-w-32">
              <span className="text-3xl">🎯</span>
              <span className="text-xl font-bold text-indigo-chakra mt-2">0</span>
              <span className="text-xs text-ink-500 uppercase tracking-wide">Points</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-khadi-200 min-w-32">
              <span className="text-3xl">🏅</span>
              <span className="text-xl font-bold text-saffron-600 mt-2">0/12</span>
              <span className="text-xs text-ink-500 uppercase tracking-wide">Badges</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-yatra mt-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((scenario) => (
            <Card key={scenario.id} className="flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 border-2 border-transparent hover:border-indigo-chakra/20 shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{scenario.icon}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    scenario.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    scenario.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink-900 mb-2">
                  {scenario.title}
                </h3>
                <p className="text-ink-700 text-sm mb-6">
                  {scenario.description}
                </p>
              </div>
              <div className="pt-4 border-t border-khadi-100 flex items-center justify-between">
                <span className="text-sm font-bold text-saffron-600">+{scenario.points} XP</span>
                <Link href={`/play/scenario/${scenario.id}`}>
                  <Button className="bg-indigo-chakra hover:bg-indigo-900 text-white rounded-full">
                    Play Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
