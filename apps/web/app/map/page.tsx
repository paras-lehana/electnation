'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

// Dummy locations for fallback
const LOCATIONS = {
  user: { lat: 28.6139, lng: 77.209 }, // New Delhi
  booth: { lat: 28.612, lng: 77.21 }, // Nearby booth
  ero: { lat: 28.615, lng: 77.215 }, // ERO office
};

export default function MapPage() {
  const [apiKey, setApiKey] = useState('');
  
  useEffect(() => {
    // In a real app, this should be exposed to the client securely
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '');
  }, []);

  const renderMapArea = () => {
    if (!apiKey) {
      return (
        <Card className="flex h-[600px] flex-col items-center justify-center border-2 border-dashed border-indigo-chakra/20 bg-saffron-50 p-8 text-center shadow-inner">
          <span className="text-4xl mb-4">🗺️</span>
          <h3 className="font-display text-xl font-bold text-ink-900">Map is offline</h3>
          <p className="mt-2 text-sm text-ink-700">Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable interactive map features.</p>
        </Card>
      );
    }
    
    return (
        <Card className="overflow-hidden p-0 rounded-2xl h-[600px] border-2 border-indigo-chakra/20 shadow-lg relative">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={LOCATIONS.user}
              defaultZoom={14}
              mapId="election_yatra_map" // Using a dummy map id, requires advanced markers
              disableDefaultUI={false}
              className="w-full h-full"
            >
              {/* User Location */}
              <AdvancedMarker position={LOCATIONS.user} title="Your Location">
                <Pin background={'#4f46e5'} borderColor={'#312e81'} glyphColor={'#fff'} />
              </AdvancedMarker>

              {/* Polling Booth */}
              <AdvancedMarker position={LOCATIONS.booth} title="Polling Booth">
                <Pin background={'#22c55e'} borderColor={'#166534'} glyphColor={'#fff'} />
              </AdvancedMarker>

              {/* ERO Office */}
              <AdvancedMarker position={LOCATIONS.ero} title="ERO Office">
                <Pin background={'#f97316'} borderColor={'#9a3412'} glyphColor={'#fff'} />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </Card>
    );
  };

  return (
    <main className="min-h-screen bg-tricolor-soft pb-20 overflow-hidden">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-12 shadow-sm relative z-10">
        <div className="container-yatra relative">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-ink-900 md:text-5xl"
          >
            Map your <span className="text-leaf-500 bg-leaf-50 px-2 rounded-md">Booth</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg text-ink-700"
          >
            Find your polling station, ERO office, and plan your route. Migrants get a dedicated
            corner for postal ballots and address updates.
          </motion.p>
        </div>
      </div>

      <div className="container-yatra mt-8 grid gap-8 md:grid-cols-[1fr_350px]">
        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-leaf-400 to-indigo-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          {renderMapArea()}
        </motion.div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card withPaisley className="bg-white border-leaf-100 border-2 hover:shadow-lg transition-shadow">
              <h3 className="font-display text-xl font-bold text-leaf-700 flex items-center gap-2">
                <span className="text-2xl drop-shadow-sm">🗳️</span> Your Polling Booth
              </h3>
              <p className="mt-2 text-sm text-ink-800 font-medium bg-leaf-50 p-2 rounded-md border border-leaf-100">Government Senior Secondary School, Room 4</p>
              <p className="text-xs text-ink-500 mt-2">1.2 km away • Approx. 15 min walk</p>
              <div className="mt-4 flex gap-2">
                <Button className="w-full bg-leaf-600 hover:bg-leaf-700 shadow-md shadow-leaf-500/20">Get Directions</Button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-gradient-to-br from-saffron-50 to-white border-saffron-200 border-2 hover:shadow-lg transition-shadow">
              <h3 className="font-display text-xl font-bold text-saffron-800 flex items-center gap-2">
                <span className="text-2xl drop-shadow-sm">🏛️</span> ERO Office
              </h3>
              <p className="mt-2 text-sm text-saffron-900 font-medium">District Election Office, Sector 2</p>
              <p className="text-xs text-saffron-700 mt-1">2.5 km away • For corrections & updates</p>
              <Button variant="ghost" className="mt-4 w-full border-saffron-300 text-saffron-800 hover:bg-saffron-100 bg-white">
                Book Appointment
              </Button>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="bg-[#312e81] border-2 border-indigo-400 text-white text-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#312e81] to-[#4f46e5] opacity-80 z-0"></div>
              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold text-white tracking-wide flex items-center justify-center gap-2">
                  <span>🚆</span> Migrant Voter?
                </h3>
                <p className="mt-3 text-sm text-indigo-100 font-medium">
                  If you are living away from your home state, find out how you can still participate.
                </p>
                <Button className="mt-5 bg-white text-[#312e81] hover:bg-indigo-50 font-bold w-full shadow-lg">
                  Explore Options
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
