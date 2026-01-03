import { useState, useCallback } from "react";
import type { CrisisState, MoodEntry } from "@/lib/types";
import { detectCrisisKeywords, detectCrisisPattern } from "@/lib/privacy";

export function useCrisisDetection() {
  const [crisisState, setCrisisState] = useState<CrisisState>({ isActive: false });

  const checkText = useCallback((text: string): boolean => {
    if (detectCrisisKeywords(text)) {
      setCrisisState({
        isActive: true,
        trigger: "keyword",
        timestamp: new Date(),
      });
      return true;
    }
    return false;
  }, []);

  const checkMoodPattern = useCallback((entries: MoodEntry[]): boolean => {
    const recentSadMoods = entries
      .filter((e) => e.emotionVector?.sad)
      .map((e) => ({
        sad: e.emotionVector!.sad,
        timestamp: e.timestamp,
      }));

    if (detectCrisisPattern(recentSadMoods)) {
      setCrisisState({
        isActive: true,
        trigger: "pattern",
        timestamp: new Date(),
      });
      return true;
    }
    return false;
  }, []);

  const checkEmotion = useCallback((sadScore: number): boolean => {
    if (sadScore > 0.85) {
      setCrisisState({
        isActive: true,
        trigger: "emotion",
        timestamp: new Date(),
      });
      return true;
    }
    return false;
  }, []);

  const dismissCrisis = useCallback(() => {
    setCrisisState({ isActive: false });
  }, []);

  return {
    crisisState,
    checkText,
    checkMoodPattern,
    checkEmotion,
    dismissCrisis,
  };
}
