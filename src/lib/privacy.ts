// LUMORA Privacy Guard
// Enforces privacy-first principles at the code level

import { CRISIS_KEYWORDS, type EmotionVector, type SafeMoodData } from './types';

/**
 * PRIVACY RULES (Code Enforced):
 * ❌ NEVER: upload video frames, raw audio, facial landmarks
 * ✅ ONLY: emotion_vector, mood_label, reflection_text
 * ❌ NEVER STORE: biometrics
 * ✅ STORE: anonymized mood_history, preferences
 */

// Validate that data is safe to transmit/store
export function validateSafeMoodData(data: unknown): data is SafeMoodData {
  if (!data || typeof data !== 'object') return false;
  
  const d = data as Record<string, unknown>;
  
  // Must have required fields
  if (typeof d.moodLabel !== 'string') return false;
  if (typeof d.intensity !== 'string') return false;
  if (typeof d.timestamp !== 'string') return false;
  
  // Emotion vector must only contain numbers 0-1
  if (d.emotionVector) {
    const ev = d.emotionVector as Record<string, unknown>;
    for (const key of Object.keys(ev)) {
      const val = ev[key];
      if (typeof val !== 'number' || val < 0 || val > 1) {
        return false;
      }
    }
  }
  
  // Reflection must be string if present
  if (d.reflectionText !== undefined && typeof d.reflectionText !== 'string') {
    return false;
  }
  
  return true;
}

// Create a safe emotion vector from raw detection data
// NEVER store raw frame data - only normalized emotion scores
export function createSafeEmotionVector(
  detectionScores: Record<string, number>
): EmotionVector {
  const normalize = (val: number) => Math.max(0, Math.min(1, val));
  
  return {
    happy: normalize(detectionScores.happy || 0),
    sad: normalize(detectionScores.sad || 0),
    angry: normalize(detectionScores.angry || 0),
    fearful: normalize(detectionScores.fearful || 0),
    surprised: normalize(detectionScores.surprised || 0),
    disgusted: normalize(detectionScores.disgusted || 0),
    neutral: normalize(detectionScores.neutral || 0),
  };
}

// Check for crisis keywords in text
export function detectCrisisKeywords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// Check for crisis pattern in mood history
export function detectCrisisPattern(
  recentMoods: Array<{ sad: number; timestamp: Date }>
): boolean {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const recentExtreme = recentMoods.filter(
    m => m.sad > 0.85 && m.timestamp.getTime() > oneHourAgo
  );
  return recentExtreme.length >= 3;
}

// Sanitize user input for storage
export function sanitizeReflection(text: string): string {
  // Remove any potential XSS or injection attempts
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .slice(0, 1000); // Max length
}

// Generate anonymous session ID (no personal data)
export function generateAnonymousId(): string {
  return `lumora_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

// Privacy disclaimer text
export const PRIVACY_DISCLAIMER = `
LUMORA is a supportive companion, not a replacement for professional mental health care.
Your privacy is our priority:
• No video or audio is ever uploaded
• Only your mood choices and written reflections are stored
• Camera analysis happens entirely on your device
• You can delete your data at any time

If you're in crisis, please reach out to a mental health professional or emergency services.
`;

export const NOT_A_THERAPIST_DISCLAIMER = 
  "LUMORA is not a therapist or medical professional. For mental health support, please consult a qualified professional.";
