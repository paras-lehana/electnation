'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ClinicPage() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    category: string;
    riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
    explanation: string;
    recommendedAction: string;
  }>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      // In a full implementation, this calls /api/forward/analysis
      // For now we simulate the API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const text = inputText.toLowerCase();
      let mockResult = {
        category: 'Unverified Rumor',
        riskLevel: 'MEDIUM' as const,
        explanation: 'We could not find official ECI data confirming this message. Be cautious before forwarding.',
        recommendedAction: 'Check the official Voter Helpline app or eci.gov.in.'
      };

      if (text.includes('evm') || text.includes('hack')) {
        mockResult = {
          category: 'Likely False / Misinformation',
          riskLevel: 'HIGH' as const,
          explanation: 'EVMs (Electronic Voting Machines) used by ECI are standalone machines not connected to any network, making them unhackable remotely. They have VVPAT paper trails for verification.',
          recommendedAction: 'Do NOT forward. Read the EVM manual on eci.gov.in for facts.'
        };
      } else if (text.includes('holiday') || text.includes('date')) {
        mockResult = {
          category: 'Misleading Context',
          riskLevel: 'MEDIUM' as const,
          explanation: 'Election dates and holidays vary strictly by constituency and state phases. This message might be spreading outdated or wrong dates.',
          recommendedAction: 'Verify your exact polling date using the ECI Voter Portal with your EPIC number.'
        };
      }

      setResult(mockResult);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-300';
      case 'MEDIUM': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <main className="min-h-screen bg-tricolor-soft pb-20">
      <div className="bg-white py-12 shadow-sm">
        <div className="container-yatra text-center">
          <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
            WhatsApp <span className="text-saffron-500">Forward Clinic</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-ink-700">
            Paste a suspicious message, rumor, or forward here. Chunav Saathi will help you verify its authenticity against ECI guidelines.
          </p>
        </div>
      </div>

      <div className="container-yatra mt-12 max-w-3xl">
        <Card className="bg-white shadow-xl border-t-4 border-t-saffron-500">
          <form onSubmit={handleAnalyze}>
            <label htmlFor="forward-text" className="block text-sm font-semibold text-ink-900 mb-2">
              Paste the message here:
            </label>
            <textarea
              id="forward-text"
              rows={5}
              className="w-full rounded-xl border border-khadi-300 bg-khadi-50 p-4 text-ink-900 focus:border-saffron-500 focus:ring-saffron-500 transition-colors"
              placeholder="e.g. 'Breaking: EVMs can be hacked using bluetooth...'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            
            <div className="mt-6 flex justify-end">
              <Button 
                type="submit" 
                disabled={isAnalyzing || !inputText.trim()}
                className="bg-saffron-600 hover:bg-saffron-700 w-full sm:w-auto"
              >
                {isAnalyzing ? 'Analyzing Fact-Check...' : 'Verify this Forward'}
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <div className="mt-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-4 flex items-center gap-2">
              <span>🩺</span> Diagnosis Result
            </h2>
            <Card className={`border-2 ${getRiskColor(result.riskLevel)}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg">{result.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel} RISK
                    </span>
                  </div>
                  <p className="mt-2 text-ink-800 leading-relaxed">
                    {result.explanation}
                  </p>
                  
                  <div className="mt-4 p-3 bg-white/60 rounded-lg border border-black/5">
                    <p className="text-sm font-semibold text-ink-900">💡 Action to take:</p>
                    <p className="text-sm text-ink-800 mt-1">{result.recommendedAction}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
