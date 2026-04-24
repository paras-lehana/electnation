'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const INITIAL_STATIONS = [
  { id: 'registration', title: 'Registration', description: 'Ensure you are in the voter list.', icon: '📝' },
  { id: 'verification', title: 'Verification', description: 'Check your EPIC and details.', icon: '🔍' },
  { id: 'education', title: 'Education', description: 'Learn about candidates and issues.', icon: '📚' },
  { id: 'planning', title: 'Planning', description: 'Find your booth and timing.', icon: '📅' },
  { id: 'voting', title: 'The Vote', description: 'Step-by-step guide to the booth.', icon: '🗳️' },
  { id: 'celebration', title: 'Celebration', description: 'Share your inked finger and badge.', icon: '🇮🇳' }
];

export default function YatraPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStationIndex, setCurrentStationIndex] = useState(1); // Start at Verification since Registration is usually complete

  const handleListen = async () => {
    setIsLoading(true);
    try {
      const text = "Your Election Yatra. 6 stations to becoming a responsible voter. Station 1: Registration. Ensure you are in the voter list. Station 2: Verification. Check your EPIC and details. Station 3: Education. Learn about candidates and issues. Station 4: Planning. Find your booth and timing. Station 5: The Vote. Step-by-step guide to the booth. Station 6: Celebration. Share your inked finger and badge.";
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://electnation-api-767171449038.us-central1.run.app';
      const response = await fetch(`${apiUrl}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, languageCode: 'en-IN' }),
      });
      if (!response.ok) throw new Error('TTS failed');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const advanceStation = () => {
    if (currentStationIndex < INITIAL_STATIONS.length) {
      setCurrentStationIndex(prev => prev + 1);
    }
  };

  const getStatus = (index: number) => {
    if (index < currentStationIndex) return 'completed';
    if (index === currentStationIndex) return 'current';
    return 'upcoming';
  };

  return (
    <main className="min-h-screen bg-khadi-50 pb-20">
      <div className="bg-white py-12 shadow-sm border-b border-khadi-100">
        <div className="container-yatra">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Button 
                  onClick={handleListen} 
                  disabled={isLoading || isPlaying}
                  className="bg-indigo-chakra text-white rounded-full py-2 px-4 shadow-md"
                  aria-label="Listen to page content"
                >
                  {isLoading ? '⏳ Loading Audio...' : isPlaying ? '🔊 Playing...' : '🎧 Listen to Page'}
                </Button>
              </div>
              <h1 className="font-display text-4xl font-bold text-ink-900">Your <span className="text-indigo-chakra">Election Yatra</span></h1>
              <p className="mt-2 text-ink-700">{INITIAL_STATIONS.length} stations to becoming a responsible voter.</p>
            </div>
            <Card className="bg-saffron-50 border-saffron-200 py-2 px-6 flex items-center gap-3 w-max">
              <span className="text-2xl">{currentStationIndex === INITIAL_STATIONS.length ? '🏆' : '🏅'}</span>
              <div>
                <p className="text-xs font-bold text-saffron-800 uppercase">Current Badge</p>
                <p className="text-sm font-bold text-ink-900">
                  {currentStationIndex === INITIAL_STATIONS.length ? 'Democracy Champion' : 'Inked Apprentice'}
                </p>
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
            {INITIAL_STATIONS.map((station, index) => {
              const status = getStatus(index);
              return (
                <motion.div 
                  key={station.id} 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative flex items-start gap-8"
                >
                  {/* Status Indicator */}
                  <div className={`z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 shadow-md transition-all duration-500 ${
                    status === 'completed' ? 'bg-leaf-100 border-leaf-500 text-leaf-700 shadow-leaf-500/20 hover:scale-110' :
                    status === 'current' ? 'bg-[#312e81] border-indigo-400 text-white shadow-indigo-500/30 ring-4 ring-indigo-100 hover:scale-110' :
                    'bg-white border-khadi-200 text-khadi-400'
                  }`}>
                    <span className="text-2xl">{status === 'completed' ? '✅' : station.icon}</span>
                  </div>

                  <Card className={`flex-1 transition-all duration-300 border-l-8 ${
                    status === 'completed' ? 'border-l-leaf-500 bg-white hover:shadow-xl' :
                    status === 'current' ? 'border-l-[#312e81] bg-indigo-50/50 scale-[1.02] shadow-xl' :
                    'border-l-khadi-300 bg-khadi-50/50 opacity-70'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className={`font-display text-2xl font-bold ${status === 'current' ? 'text-[#312e81]' : 'text-ink-900'}`}>{station.title}</h3>
                        <p className="mt-1 text-ink-700 font-medium">{station.description}</p>
                      </div>
                      {status === 'current' ? (
                        <Button 
                          onClick={advanceStation}
                          className="bg-[#312e81] hover:bg-indigo-800 shadow-md shadow-indigo-900/20 text-white"
                        >
                          Complete Station
                        </Button>
                      ) : (
                        <Button variant="ghost" disabled={status === 'upcoming'} className="w-full sm:w-auto">View Details</Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {currentStationIndex === INITIAL_STATIONS.length && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-16 text-center bg-leaf-50 border-2 border-leaf-200 p-12 rounded-3xl"
            >
              <h2 className="font-display text-4xl font-bold text-leaf-900 mb-4">🎉 Yatra Completed!</h2>
              <p className="text-xl text-leaf-800 mb-8">You are now fully prepared to exercise your democratic right.</p>
              <Button className="bg-leaf-600 hover:bg-leaf-700 text-white text-lg py-6 px-12">Download Certificate</Button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
