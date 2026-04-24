'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function PwdPage() {
  return (
    <main className="min-h-screen bg-khadi-100 pb-20">
      <div className="bg-white py-16 border-b border-khadi-200 shadow-sm">
        <div className="container-yatra">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
                Accessibility <span className="text-indigo-chakra">& PwD</span> Support
              </h1>
              <p className="mt-4 text-lg text-ink-700">
                The Election Commission of India is committed to making voting accessible for all. Explore the facilities available for Persons with Disabilities (PwD) and Senior Citizens.
              </p>
            </div>
            <div className="h-32 w-32 bg-indigo-50 rounded-full flex items-center justify-center text-6xl shadow-inner border-4 border-white">
              ♿
            </div>
          </div>
        </div>
      </div>

      <div className="container-yatra mt-12 grid gap-8 md:grid-cols-3">
        <Card className="bg-white border-2 border-khadi-200">
          <span className="text-4xl mb-4 block">🚗</span>
          <h3 className="font-display text-xl font-bold text-ink-900 mb-2">Transport Assistance</h3>
          <p className="text-sm text-ink-700 mb-6">Free pick-up and drop facility is provided at many locations. Book your transport in advance via the Saksham ECI App.</p>
          <Button variant="ghost" className="w-full">Saksham App Info</Button>
        </Card>

        <Card className="bg-white border-2 border-khadi-200">
          <span className="text-4xl mb-4 block">🦽</span>
          <h3 className="font-display text-xl font-bold text-ink-900 mb-2">At-Booth Facilities</h3>
          <p className="text-sm text-ink-700 mb-6">Ramps, wheelchairs, priority queues, and volunteers are available at every polling station (AMF - Assured Minimum Facilities).</p>
          <Button variant="ghost" className="w-full">View Facility List</Button>
        </Card>

        <Card className="bg-white border-2 border-khadi-200">
          <span className="text-4xl mb-4 block">📑</span>
          <h3 className="font-display text-xl font-bold text-ink-900 mb-2">Braille & Audio</h3>
          <p className="text-sm text-ink-700 mb-6">EPIC cards in Braille and audio assistance at EVMs are available. Request these features for your EPIC profile.</p>
          <Button variant="ghost" className="w-full">Request Braille EPIC</Button>
        </Card>

        <Card className="md:col-span-3 bg-leaf-50 border-2 border-leaf-200 p-8">
          <div className="flex items-center gap-6">
            <span className="text-5xl">🏘️</span>
            <div>
              <h2 className="font-display text-2xl font-bold text-leaf-900 mb-2">Voting from Home (Form 12D)</h2>
              <p className="text-leaf-800">For voters aged 85+ or PwD (with 40% benchmark disability), ECI provides the option to vote from the comfort of your home using postal ballots.</p>
              <div className="mt-4 flex gap-4">
                <Button className="bg-leaf-600">Download Form 12D</Button>
                <Button variant="ghost" className="border-leaf-300 text-leaf-800">Watch Video Tutorial</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
