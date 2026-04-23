import { TextToSpeechClient } from '@google-cloud/text-to-speech';

let tts: TextToSpeechClient | null = null;

export const getTTSClient = () => {
  if (!tts) {
    tts = new TextToSpeechClient({
      apiKey: process.env.GOOGLE_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
    });
  }
  return tts;
};

export const synthesizeSpeech = async (text: string, languageCode: string = 'hi-IN') => {
  const client = getTTSClient();
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode, ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  });
  return response.audioContent;
};
