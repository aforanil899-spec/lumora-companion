import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { MoodLevel, MoodIntensity } from "@/lib/types";
import { Sparkles, Sun, CloudSun, Cloud, CloudRain } from "lucide-react";

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodLevel, intensity: MoodIntensity, reflection?: string) => void;
  isSubmitting?: boolean;
}

const moods: { level: MoodLevel; label: string; icon: React.ReactNode; color: string }[] = [
  { level: "great", label: "Great", icon: <Sparkles className="w-6 h-6" />, color: "text-success" },
  { level: "good", label: "Good", icon: <Sun className="w-6 h-6" />, color: "text-yellow-400" },
  { level: "okay", label: "Okay", icon: <CloudSun className="w-6 h-6" />, color: "text-muted-foreground" },
  { level: "low", label: "Low", icon: <Cloud className="w-6 h-6" />, color: "text-cyan-400" },
  { level: "struggling", label: "Struggling", icon: <CloudRain className="w-6 h-6" />, color: "text-pink-400" },
];

const intensities: { level: MoodIntensity; label: string }[] = [
  { level: "low", label: "A little" },
  { level: "medium", label: "Moderate" },
  { level: "high", label: "Very much" },
];

export function MoodSelector({ onMoodSelect, isSubmitting }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<MoodIntensity>("medium");
  const [reflection, setReflection] = useState("");
  const [step, setStep] = useState<"mood" | "intensity" | "reflection">("mood");

  const handleMoodClick = (mood: MoodLevel) => {
    setSelectedMood(mood);
    setStep("intensity");
  };

  const handleIntensityClick = (intensity: MoodIntensity) => {
    setSelectedIntensity(intensity);
    setStep("reflection");
  };

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, selectedIntensity, reflection || undefined);
    }
  };

  return (
    <Card variant="glass" className="p-6 max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === "mood" && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-center text-foreground">
              How are you feeling right now?
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((mood) => (
                <motion.button
                  key={mood.level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodClick(mood.level)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                    selectedMood === mood.level
                      ? "bg-primary/20 border-primary"
                      : "bg-muted/30 hover:bg-muted/50"
                  } border border-border/30`}
                >
                  <span className={mood.color}>{mood.icon}</span>
                  <span className="text-xs text-muted-foreground">{mood.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "intensity" && (
          <motion.div
            key="intensity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-center text-foreground">
              How strongly do you feel this way?
            </h3>
            <div className="flex gap-3 justify-center">
              {intensities.map((intensity) => (
                <Button
                  key={intensity.level}
                  variant={selectedIntensity === intensity.level ? "lumora" : "glass"}
                  onClick={() => handleIntensityClick(intensity.level)}
                  className="flex-1"
                >
                  {intensity.label}
                </Button>
              ))}
            </div>
            <button
              onClick={() => setStep("mood")}
              className="text-sm text-muted-foreground hover:text-foreground mx-auto block"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {step === "reflection" && (
          <motion.div
            key="reflection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-center text-foreground">
              Would you like to add a reflection? (optional)
            </h3>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What's on your mind..."
              className="min-h-[100px] bg-muted/30 border-border/30 resize-none"
              maxLength={500}
            />
            <div className="flex gap-3">
              <Button
                variant="glass"
                onClick={() => setStep("intensity")}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="lumora"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Saving..." : "Save Check-in"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
