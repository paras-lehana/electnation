import { Translate } from '@google-cloud/translate/build/src/v2';

let translate: Translate | null = null;

export const getTranslationClient = () => {
  if (!translate) {
    translate = new Translate({
      key: process.env.GOOGLE_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
    });
  }
  return translate;
};

export const translateText = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  const client = getTranslationClient();
  const [translation] = await client.translate(text, targetLanguage);
  return translation;
};

export const detectLanguage = async (
  text: string
): Promise<string> => {
  const client = getTranslationClient();
  const [detections] = await client.detect(text);
  const detection = Array.isArray(detections) ? detections[0] : detections;
  return detection.language;
};
