// LUMORA AI Personality & Response Generation
// Uses local prompts - AI calls would go through backend

import type { MoodLevel, EmotionVector } from './types';

/**
 * LUMORA AI PERSONALITY:
 * Tone: Calm, non-judgmental, human-supportive
 * Rules:
 * ✅ "Would you like a 1-minute breathing exercise?"
 * ❌ "I'll always be here", "You look sad", medical claims
 * Format: [validation][space_offer][open_question][human_reminder]
 * Max 75 words
 */

interface LumoraResponse {
  message: string;
  suggestedSpace?: string;
  ritual?: string;
}

const VALIDATION_PHRASES: Record<MoodLevel, string[]> = {
  great: [
    "It's wonderful to hear you're feeling great.",
    "That positive energy is something to appreciate.",
    "Glad you're having a good moment.",
  ],
  good: [
    "It's nice that things feel okay right now.",
    "Good moments matter, even small ones.",
    "Thank you for sharing how you're feeling.",
  ],
  okay: [
    "Okay is a valid place to be.",
    "Some days are just... days. That's alright.",
    "Thank you for checking in with yourself.",
  ],
  low: [
    "It takes courage to acknowledge when things feel hard.",
    "I hear you. Low moments are part of being human.",
    "Thank you for being honest with yourself.",
  ],
  struggling: [
    "What you're feeling is real and valid.",
    "Reaching out when struggling takes strength.",
    "I'm here to support you through this moment.",
  ],
};

const SPACE_OFFERS: Record<MoodLevel, string[]> = {
  great: [
    "Would you like to capture this feeling in a quick reflection?",
    "This might be a good time to try something new.",
  ],
  good: [
    "Perhaps some calming music would complement this moment?",
    "Would you like a gentle activity to maintain this feeling?",
  ],
  okay: [
    "Would a short breathing exercise feel helpful?",
    "Sometimes a small change can shift our day.",
  ],
  low: [
    "Would you like to try a 1-minute grounding exercise?",
    "Sometimes gentle movement or calming sounds can help.",
  ],
  struggling: [
    "Would a breathing exercise feel manageable right now?",
    "I can guide you through a simple grounding technique if you'd like.",
  ],
};

const HUMAN_REMINDERS = [
  "Remember, connecting with someone you trust can make a difference.",
  "You're not alone, even when it feels that way.",
  "Taking care of yourself is important work.",
  "Small steps count.",
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateLumoraResponse(
  mood: MoodLevel,
  _emotionVector?: EmotionVector,
  context?: string
): LumoraResponse {
  const validation = getRandomItem(VALIDATION_PHRASES[mood]);
  const spaceOffer = getRandomItem(SPACE_OFFERS[mood]);
  const humanReminder = getRandomItem(HUMAN_REMINDERS);
  
  // Determine suggested space based on mood
  let suggestedSpace: string | undefined;
  let ritual: string | undefined;
  
  if (mood === 'struggling' || mood === 'low') {
    ritual = 'breathing';
    suggestedSpace = 'voice';
  } else if (mood === 'okay') {
    suggestedSpace = 'music';
    ritual = 'grounding';
  } else {
    suggestedSpace = 'books';
  }
  
  // Build response (max 75 words)
  let message = `${validation} ${spaceOffer}`;
  
  if (context) {
    message += ` What you shared matters.`;
  }
  
  message += ` ${humanReminder}`;
  
  return {
    message,
    suggestedSpace,
    ritual,
  };
}

// Crisis response (hard-coded, never AI-generated)
export const CRISIS_RESPONSE = {
  message: `I notice you may be going through something really difficult. Your safety matters most right now.

Please reach out to someone who can help:
• In the US: Call or text 988 (Suicide & Crisis Lifeline)
• Crisis Text Line: Text HOME to 741741
• International: findahelpline.com

LUMORA is here to support you, but it's not a substitute for professional help. You deserve real human support right now.`,
  stopAllAI: true,
};

// Voice companion prompts (for Text-to-Speech)
export const VOICE_PROMPTS = {
  greeting: "Hi. I'm here whenever you're ready to share. Take your time.",
  listening: "I'm listening. There's no rush.",
  acknowledgment: [
    "Thank you for sharing that with me.",
    "I hear you.",
    "That sounds meaningful.",
  ],
  closing: "Remember, talking to someone you trust can help. Take care.",
};
