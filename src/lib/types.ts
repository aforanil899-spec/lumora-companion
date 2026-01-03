// LUMORA Type Definitions

export type MoodLevel = 'great' | 'good' | 'okay' | 'low' | 'struggling';
export type MoodIntensity = 'low' | 'medium' | 'high';

export interface EmotionVector {
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  surprised: number;
  disgusted: number;
  neutral: number;
}

export type MoodVerification = 'CONFIRMED' | 'UNCERTAIN' | 'MISMATCH';

export interface MoodEntry {
  id: string;
  timestamp: Date;
  userMood: MoodLevel;
  intensity: MoodIntensity;
  emotionVector?: EmotionVector;
  verification?: MoodVerification;
  reflection?: string;
}

export interface CrisisState {
  isActive: boolean;
  trigger?: 'keyword' | 'pattern' | 'emotion';
  timestamp?: Date;
}

export type SpaceType = 'music' | 'books' | 'exercise' | 'games' | 'community' | 'voice';

export interface Space {
  id: SpaceType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface RitualType {
  id: string;
  name: string;
  duration: string;
  type: 'breathing' | 'grounding' | 'journaling' | 'movement';
  description: string;
}

export interface UserPreferences {
  enableCamera: boolean;
  enableVoice: boolean;
  preferredRituals: string[];
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

// Privacy-first: Only these types should ever be stored/transmitted
export interface SafeMoodData {
  moodLabel: MoodLevel;
  intensity: MoodIntensity;
  emotionVector?: EmotionVector; // Numerical only, never raw frames
  reflectionText?: string; // User-written only
  timestamp: string;
}

// Crisis keywords (hard-coded for safety)
export const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'hurt myself', 'no point living'
];

// Emergency resources by region
export const EMERGENCY_RESOURCES = {
  US: {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    text: 'Text HOME to 741741',
  },
  UK: {
    name: 'Samaritans',
    phone: '116 123',
    website: 'samaritans.org',
  },
  GLOBAL: {
    name: 'International Association for Suicide Prevention',
    website: 'https://www.iasp.info/resources/Crisis_Centres/',
  },
};
