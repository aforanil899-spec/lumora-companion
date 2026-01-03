import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LumoraLogo } from "@/components/LumoraLogo";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodHistory } from "@/components/MoodHistory";
import { SpaceCard } from "@/components/SpaceCard";
import { CrisisOverlay } from "@/components/CrisisOverlay";
import { BreathingExercise } from "@/components/BreathingExercise";
import { VoiceCompanion } from "@/components/VoiceCompanion";
import { PrivacyBadge } from "@/components/PrivacyBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMoodStore } from "@/hooks/useMoodStore";
import { useCrisisDetection } from "@/hooks/useCrisisDetection";
import { generateLumoraResponse } from "@/lib/lumora-ai";
import { NOT_A_THERAPIST_DISCLAIMER } from "@/lib/privacy";
import type { MoodLevel, MoodIntensity, SpaceType } from "@/lib/types";
import { Wind, Heart, Sparkles, Settings } from "lucide-react";

const spaces: SpaceType[] = ["music", "books", "exercise", "games", "community", "voice"];

export default function Dashboard() {
  const navigate = useNavigate();
  const { entries, addMoodEntry } = useMoodStore();
  const { crisisState, checkText, dismissCrisis } = useCrisisDetection();
  
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [lumoraMessage, setLumoraMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMoodSelect = async (mood: MoodLevel, intensity: MoodIntensity, reflection?: string) => {
    setIsSubmitting(true);
    
    // Check for crisis in reflection text
    if (reflection && checkText(reflection)) {
      setIsSubmitting(false);
      setShowMoodSelector(false);
      return;
    }

    // Add the mood entry
    const entry = addMoodEntry(mood, intensity, reflection);

    // Generate LUMORA response
    const response = generateLumoraResponse(mood, entry.emotionVector, reflection);
    setLumoraMessage(response.message);

    setIsSubmitting(false);
    setShowMoodSelector(false);
  };

  const handleSpaceClick = (space: SpaceType) => {
    if (space === "voice") {
      setShowVoice(true);
    } else {
      navigate(`/spaces/${space}`);
    }
  };

  const latestMood = entries[entries.length - 1];
  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-sanctuary">
      {/* Aurora background effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-lumora-aurora2/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <LumoraLogo size="md" />
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Button>
        </header>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-semibold text-foreground">
            {greeting}
          </h1>
          <PrivacyBadge />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <Button
            variant="space"
            className="flex-col h-auto py-4 gap-2"
            onClick={() => setShowMoodSelector(true)}
          >
            <Heart className="w-5 h-5 text-accent" />
            <span className="text-xs">Check In</span>
          </Button>
          <Button
            variant="space"
            className="flex-col h-auto py-4 gap-2"
            onClick={() => setShowBreathing(true)}
          >
            <Wind className="w-5 h-5 text-success" />
            <span className="text-xs">Breathe</span>
          </Button>
          <Button
            variant="space"
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate("/rituals")}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs">Rituals</span>
          </Button>
        </motion.div>

        {/* LUMORA Response */}
        <AnimatePresence>
          {lumoraMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card variant="glow" className="p-5">
                <p className="text-foreground leading-relaxed">{lumoraMessage}</p>
                <button
                  onClick={() => setLumoraMessage(null)}
                  className="mt-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  Dismiss
                </button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MoodHistory entries={entries} />
        </motion.div>

        {/* Spaces Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Your Spaces
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {spaces.map((space, index) => (
              <motion.div
                key={space}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <SpaceCard type={space} onClick={() => handleSpaceClick(space)} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-muted-foreground text-center pt-4"
        >
          {NOT_A_THERAPIST_DISCLAIMER}
        </motion.p>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showMoodSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowMoodSelector(false)}
          >
            <MoodSelector onMoodSelect={handleMoodSelect} isSubmitting={isSubmitting} />
          </motion.div>
        )}

        {showBreathing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <BreathingExercise onClose={() => setShowBreathing(false)} />
          </motion.div>
        )}

        {showVoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <VoiceCompanion 
              onClose={() => setShowVoice(false)}
              onCrisisDetected={() => {
                setShowVoice(false);
                // Crisis state is managed by the hook
              }}
            />
          </motion.div>
        )}

        {crisisState.isActive && (
          <CrisisOverlay onClose={dismissCrisis} />
        )}
      </AnimatePresence>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Welcome back";
}
