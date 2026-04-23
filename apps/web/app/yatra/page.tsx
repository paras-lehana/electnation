'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const STATIONS = [
  { id: 'registration', title: 'Registration', status: 'completed', description: 'Ensure you are in the voter list.', icon: '📝' },
  { id: 'verification', title: 'Verification', status: 'current', description: 'Check your EPIC and details.', icon: '🔍' },
  { id: 'education', title: 'Education', status: 'upcoming', description: 'Learn about candidates and issues.', icon: '📚' },
  { id: 'planning', title: 'Planning', status: 'upcoming', description: 'Find your booth and timing.', icon: '📅' },
  { id: 'voting', title: 'The Vote', status: 'upcoming', description: 'Step-by-step guide to the booth.', icon: '🗳️' },
  { id: 'celebration', title: 'Celebration', status: 'upcoming', description: 'Share your inked finger and badge.', icon: '🇮🇳' }
];

export default function YatraPage() {
  return (
    <main className="min-h-screen bg-khadi-50 pb-20">
      <div className="bg-white py-12 shadow-sm border-b border-khadi-100">
        <div className="container-yatra">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-ink-900">Your <span className="text-indigo-chakra">Election Yatra</span></h1>
              <p className="mt-2 text-ink-700">6 stations to becoming a responsible voter.</p>
            </div>
            <Card className="bg-saffron-50 border-saffron-200 py-2 px-6 flex items-center gap-3">
              <span className="text-2xl">🏅</span>
              <div>
                <p className="text-xs font-bold text-saffron-800 uppercase">Current Badge</p>
                <p className="text-sm font-bold text-ink-900">Inked Apprentice</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container-yatra mt-12">
        <div className="relative">
          {/* Journey Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-khadi-200 hidden md:block" />

          <div className="space-y-12">
            {STATIONS.map((station, index) => (
              <div key={station.id} className="relative flex items-start gap-8">
                {/* Status Indicator */}
                <div className={`z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 shadow-sm transition-colors ${
                  station.status === 'completed' ? 'bg-leaf-100 border-leaf-500 text-leaf-700' :
                  station.status === 'current' ? 'bg-indigo-chakra border-indigo-200 text-white animate-pulse' :
                  'bg-white border-khadi-200 text-khadi-400'
                }`}>
                  <span className="text-2xl">{station.status === 'completed' ? '✅' : station.icon}</span>
                </div>

                <Card className={`flex-1 hover:shadow-lg transition-shadow border-l-8 ${
                  station.status === 'completed' ? 'border-l-leaf-500' :
                  station.status === 'current' ? 'border-l-indigo-chakra' :
                  'border-l-khadi-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink-900">{station.title}</h3>
                      <p className="mt-1 text-ink-700">{station.description}</p>
                    </div>
                    {station.status === 'current' ? (
                      <Button className="bg-indigo-chakra">Enter Station</Button>
                    ) : (
                      <Button variant="outline" disabled={station.status === 'upcoming'}>View Details</Button>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
