'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

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
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-saffron-300 via-khadi-200 to-leaf-300 hidden md:block opacity-50" />

          <div className="space-y-12">
            {STATIONS.map((station, index) => (
              <motion.div 
                key={station.id} 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex items-start gap-8"
              >
                {/* Status Indicator */}
                <div className={`z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 shadow-md transition-all duration-500 hover:scale-110 ${
                  station.status === 'completed' ? 'bg-leaf-100 border-leaf-500 text-leaf-700 shadow-leaf-500/20' :
                  station.status === 'current' ? 'bg-[#312e81] border-indigo-400 text-white shadow-indigo-500/30 ring-4 ring-indigo-100' :
                  'bg-white border-khadi-200 text-khadi-400'
                }`}>
                  <span className="text-2xl">{station.status === 'completed' ? '✅' : station.icon}</span>
                </div>

                <Card className={`flex-1 hover:shadow-xl transition-all duration-300 border-l-8 ${
                  station.status === 'completed' ? 'border-l-leaf-500 bg-white' :
                  station.status === 'current' ? 'border-l-[#312e81] bg-indigo-50/50 scale-[1.02]' :
                  'border-l-khadi-300 bg-khadi-50/50 opacity-70'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className={`font-display text-2xl font-bold ${station.status === 'current' ? 'text-[#312e81]' : 'text-ink-900'}`}>{station.title}</h3>
                      <p className="mt-1 text-ink-700 font-medium">{station.description}</p>
                    </div>
                    {station.status === 'current' ? (
                      <Button className="bg-[#312e81] hover:bg-indigo-800 shadow-md shadow-indigo-900/20 text-white">Enter Station</Button>
                    ) : (
                      <Button variant="ghost" disabled={station.status === 'upcoming'} className="w-full sm:w-auto">View Details</Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
