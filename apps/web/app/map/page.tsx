'use client';

import { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    <main className="min-h-screen bg-tricolor-soft pb-20">
      <div className="bg-white py-12 shadow-sm">
        <div className="container-yatra">
          <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
            Map your <span className="text-leaf-500">Booth</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-700">
            Find your polling station, ERO office, and plan your route. Migrants get a dedicated
            corner for postal ballots and address updates.
          </p>
        </div>
      </div>

      <div className="container-yatra mt-8 grid gap-8 md:grid-cols-[1fr_350px]">
        {/* Map Container */}
        {renderMapArea()}

        {/* Info Sidebar */}
        <div className="space-y-6">
          <Card withPaisley className="bg-white border-leaf-100 border-2">
            <h3 className="font-display text-xl font-bold text-leaf-700 flex items-center gap-2">
              <span className="text-2xl">🗳️</span> Your Polling Booth
            </h3>
            <p className="mt-2 text-sm text-ink-700 font-medium">Government Senior Secondary School, Room 4</p>
            <p className="text-xs text-ink-500">1.2 km away • Approx. 15 min walk</p>
            <div className="mt-4 flex gap-2">
              <Button className="w-full bg-leaf-600 hover:bg-leaf-700">Get Directions</Button>
            </div>
          </Card>

          <Card className="bg-saffron-50 border-saffron-200 border-2">
            <h3 className="font-display text-xl font-bold text-saffron-800 flex items-center gap-2">
              <span className="text-2xl">🏛️</span> ERO Office
            </h3>
            <p className="mt-2 text-sm text-saffron-900 font-medium">District Election Office, Sector 2</p>
            <p className="text-xs text-saffron-700">2.5 km away • For corrections & updates</p>
            <Button variant="outline" className="mt-4 w-full border-saffron-300 text-saffron-800 hover:bg-saffron-100">
              Book Appointment
            </Button>
          </Card>

          <Card className="bg-indigo-chakra text-white text-center">
            <h3 className="font-display text-lg font-bold">Migrant Voter?</h3>
            <p className="mt-2 text-sm text-indigo-100">
              If you are living away from your home state, find out how you can still participate.
            </p>
            <Button className="mt-4 bg-white text-indigo-chakra hover:bg-gray-100 w-full">
              Explore Options
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
