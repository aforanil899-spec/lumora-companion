import { useState, useEffect } from "react";
import type { MoodEntry, MoodLevel, MoodIntensity, EmotionVector, MoodVerification } from "@/lib/types";
import { generateAnonymousId } from "@/lib/privacy";

const STORAGE_KEY = "lumora_mood_history";

function getMoodVerification(
  userMood: MoodLevel,
  emotionVector?: EmotionVector
): MoodVerification {
  if (!emotionVector) return "UNCERTAIN";
  
  // Map user moods to primary emotions
  const moodToEmotion: Record<MoodLevel, keyof EmotionVector> = {
    great: "happy",
    good: "happy",
    okay: "neutral",
    low: "sad",
    struggling: "sad",
  };
  
  const primaryEmotion = moodToEmotion[userMood];
  const primaryValue = emotionVector[primaryEmotion];
  
  // Find the highest detected emotion
  const emotions = Object.entries(emotionVector) as [keyof EmotionVector, number][];
  const highest = emotions.reduce((a, b) => (b[1] > a[1] ? b : a));
  
  if (highest[0] === primaryEmotion && primaryValue > 0.5) {
    return "CONFIRMED";
  }
  
  if (highest[0] !== primaryEmotion && highest[1] > 0.7) {
    return "MISMATCH";
  }
  
  return "UNCERTAIN";
}

export function useMoodStore() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamps back to Date objects
        const hydrated = parsed.map((entry: MoodEntry) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
        setEntries(hydrated);
      }
    } catch (error) {
      console.error("Failed to load mood history:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage when entries change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch (error) {
        console.error("Failed to save mood history:", error);
      }
    }
  }, [entries, isLoading]);

  const addMoodEntry = (
    userMood: MoodLevel,
    intensity: MoodIntensity,
    reflection?: string,
    emotionVector?: EmotionVector
  ): MoodEntry => {
    const newEntry: MoodEntry = {
      id: generateAnonymousId(),
      timestamp: new Date(),
      userMood,
      intensity,
      emotionVector,
      verification: getMoodVerification(userMood, emotionVector),
      reflection,
    };

    setEntries((prev) => [...prev, newEntry]);
    return newEntry;
  };

  const getRecentMoods = (hours: number = 1) => {
    const cutoff = Date.now() - hours * 60 * 60 * 1000;
    return entries.filter((e) => e.timestamp.getTime() > cutoff);
  };

  const clearHistory = () => {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    entries,
    isLoading,
    addMoodEntry,
    getRecentMoods,
    clearHistory,
  };
}
