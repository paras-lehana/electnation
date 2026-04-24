'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

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
      let mockResult: {
        category: string;
        riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
        explanation: string;
        recommendedAction: string;
      } = {
        category: 'Unverified Rumor',
        riskLevel: 'MEDIUM',
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
    <main className="min-h-screen bg-tricolor-soft pb-20 overflow-hidden">
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100 py-12 shadow-sm relative z-10">
        <div className="container-yatra text-center relative">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-display text-4xl font-bold text-ink-900 md:text-5xl"
          >
            WhatsApp <span className="text-saffron-500 bg-saffron-50 px-2 rounded-md">Forward Clinic</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 mx-auto max-w-2xl text-lg text-ink-700"
          >
            Paste a suspicious message, rumor, or forward here. Chunav Saathi will help you verify its authenticity against ECI guidelines.
          </motion.p>
        </div>
      </div>

      <div className="container-yatra mt-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-t-saffron-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl pointer-events-none">🩺</div>
            <form onSubmit={handleAnalyze} className="relative z-10">
              <label htmlFor="forward-text" className="block text-sm font-semibold text-ink-900 mb-2">
                Paste the message here:
              </label>
              <textarea
                id="forward-text"
                rows={5}
                className="w-full rounded-xl border-2 border-khadi-200 bg-khadi-50 p-4 text-ink-900 focus:border-saffron-500 focus:ring-saffron-500 focus:bg-white transition-all shadow-inner resize-none"
                placeholder="e.g. 'Breaking: EVMs can be hacked using bluetooth...'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isAnalyzing || !inputText.trim()}
                  className="bg-saffron-600 hover:bg-saffron-700 shadow-md shadow-saffron-500/30 w-full sm:w-auto"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin text-xl">⏳</span> Analyzing Fact-Check...
                    </span>
                  ) : 'Verify this Forward'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mt-8"
          >
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-4 flex items-center gap-2">
              <span className="text-3xl drop-shadow-sm">✅</span> Diagnosis Result
            </h2>
            <Card className={`border-l-8 shadow-lg relative overflow-hidden ${getRiskColor(result.riskLevel)}`}>
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-bold text-xl">{result.category}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${getRiskColor(result.riskLevel)}`}>
                      {result.riskLevel} RISK
                    </span>
                  </div>
                  <p className="mt-2 text-ink-800 leading-relaxed text-lg">
                    {result.explanation}
                  </p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-black/10 shadow-sm"
                  >
                    <p className="text-sm font-bold text-ink-900 flex items-center gap-2">
                      <span className="text-lg">💡</span> Action to take:
                    </p>
                    <p className="text-md text-ink-800 mt-2 font-medium">{result.recommendedAction}</p>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}
