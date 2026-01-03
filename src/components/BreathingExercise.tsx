import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BreathingExerciseProps {
  onClose: () => void;
  duration?: number; // in seconds
}

type BreathPhase = "inhale" | "hold" | "exhale" | "rest";

const phaseConfig: Record<BreathPhase, { duration: number; instruction: string }> = {
  inhale: { duration: 4, instruction: "Breathe in..." },
  hold: { duration: 4, instruction: "Hold..." },
  exhale: { duration: 6, instruction: "Breathe out..." },
  rest: { duration: 2, instruction: "Rest..." },
};

const phaseOrder: BreathPhase[] = ["inhale", "hold", "exhale", "rest"];

export function BreathingExercise({ onClose, duration = 60 }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(phaseConfig.inhale.duration);

  const nextPhase = useCallback(() => {
    const currentIndex = phaseOrder.indexOf(phase);
    const nextIndex = (currentIndex + 1) % phaseOrder.length;
    const nextPh = phaseOrder[nextIndex];
    setPhase(nextPh);
    setPhaseTimeLeft(phaseConfig[nextPh].duration);
  }, [phase]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });

      setPhaseTimeLeft((prev) => {
        if (prev <= 1) {
          nextPhase();
          return phaseConfig[phaseOrder[(phaseOrder.indexOf(phase) + 1) % phaseOrder.length]].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, nextPhase]);

  const getOrbScale = () => {
    switch (phase) {
      case "inhale":
        return 1.3;
      case "hold":
        return 1.3;
      case "exhale":
        return 1;
      case "rest":
        return 1;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card variant="sanctuary" className="p-8 max-w-sm mx-auto relative overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="text-center space-y-6">
        <h3 className="text-lg font-medium text-foreground">
          Breathing Exercise
        </h3>

        {/* Breathing orb */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          {/* Outer glow */}
          <motion.div
            animate={{
              scale: isActive ? [1, 1.1, 1] : 1,
              opacity: isActive ? [0.3, 0.5, 0.3] : 0.3,
            }}
            transition={{
              duration: phaseConfig[phase].duration,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30"
          />

          {/* Main orb */}
          <motion.div
            animate={{
              scale: isActive ? getOrbScale() : 1,
            }}
            transition={{
              duration: phaseConfig[phase].duration,
              ease: "easeInOut",
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-primary-foreground text-sm font-medium text-center px-4"
              >
                {isActive ? phaseConfig[phase].instruction : "Ready"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Timer */}
        <div className="text-2xl font-light text-muted-foreground">
          {formatTime(timeLeft)}
        </div>

        {/* Controls */}
        {!isActive ? (
          <Button
            variant="lumora"
            size="lg"
            onClick={() => setIsActive(true)}
            className="w-full"
          >
            Start Exercise
          </Button>
        ) : (
          <Button
            variant="sanctuary"
            size="lg"
            onClick={() => setIsActive(false)}
            className="w-full"
          >
            Pause
          </Button>
        )}

        <p className="text-xs text-muted-foreground">
          Follow the rhythm: Inhale 4s, Hold 4s, Exhale 6s
        </p>
      </div>
    </Card>
  );
}
