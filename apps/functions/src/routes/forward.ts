import { Router } from 'express';
import { GoogleGeminiClient } from '@yatra/core';

const router = Router();

router.post('/analysis', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
    console.log('Forward analysis using model: gemini-2.5-flash, key exists:', !!key);
    const gemini = new GoogleGeminiClient({ apiKey: key });
    const prompt = `Analyze the following election-related message for misinformation or rumors:
    "${text}"
    
    Return a JSON response with:
    - category: string (e.g. "EVM Rumor", "Polling Date Misinformation", etc.)
    - riskLevel: "HIGH" | "MEDIUM" | "LOW"
    - explanation: string (detailed fact-check based on ECI guidelines)
    - recommendedAction: string (what the user should do)
    `;

    const geminiResult = await gemini.generate({
      model: 'gemini-flash-latest',
      systemInstruction: 'You are an expert fact-checker for Indian elections. Return ONLY valid JSON.',
      messages: [{ role: 'user', text: prompt }]
    });

    if (!geminiResult.ok) {
      throw geminiResult.error;
    }
    
    // Parse the JSON from Gemini response — find first { and last }
    const rawValue = geminiResult.value;
    const startIdx = rawValue.indexOf('{');
    const endIdx = rawValue.lastIndexOf('}');
    
    if (startIdx === -1 || endIdx === -1) {
      throw new Error('Gemini did not return valid JSON');
    }
    
    const jsonStr = rawValue.slice(startIdx, endIdx + 1);
    const analysis = JSON.parse(jsonStr);
    
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze message' });
  }
});

export const forwardRouter: Router = router;
