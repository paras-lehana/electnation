import { Router } from 'express';
import { getGeminiClient } from '@election-yatra/core';

const router = Router();

router.post('/analysis', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const gemini = getGeminiClient();
    const prompt = `Analyze the following election-related message for misinformation or rumors:
    "${text}"
    
    Return a JSON response with:
    - category: string (e.g. "EVM Rumor", "Polling Date Misinformation", etc.)
    - riskLevel: "HIGH" | "MEDIUM" | "LOW"
    - explanation: string (detailed fact-check based on ECI guidelines)
    - recommendedAction: string (what the user should do)
    `;

    const result = await gemini.generateText(prompt);
    // Parse the JSON from Gemini response (assuming it follows the prompt)
    // In a production app, we'd use a more robust parser or structured output.
    const analysis = JSON.parse(result.replace(/```json|```/g, '').trim());
    
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze message' });
  }
});

export const forwardRouter = router;
