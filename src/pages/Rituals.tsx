import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LumoraLogo } from "@/components/LumoraLogo";
import { BreathingExercise } from "@/components/BreathingExercise";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { RitualType } from "@/lib/types";
import { ArrowLeft, Wind, Anchor, PenLine, Footprints, Check } from "lucide-react";

const rituals: RitualType[] = [
  {
    id: "breathing",
    name: "Box Breathing",
    duration: "1-3 min",
    type: "breathing",
    description: "A calming technique used by Navy SEALs. Breathe in, hold, breathe out, hold.",
  },
  {
    id: "grounding",
    name: "5-4-3-2-1 Grounding",
    duration: "2-5 min",
    type: "grounding",
    description: "Connect with your senses: 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.",
  },
  {
    id: "journaling",
    name: "Quick Reflection",
    duration: "3-5 min",
    type: "journaling",
    description: "Write freely about what's on your mind. No judgment, just expression.",
  },
  {
    id: "movement",
    name: "Gentle Stretch",
    duration: "2-3 min",
    type: "movement",
    description: "Simple stretches to release tension in your shoulders, neck, and back.",
  },
];

const ritualIcons: Record<RitualType["type"], React.ReactNode> = {
  breathing: <Wind className="w-6 h-6" />,
  grounding: <Anchor className="w-6 h-6" />,
  journaling: <PenLine className="w-6 h-6" />,
  movement: <Footprints className="w-6 h-6" />,
};

const ritualColors: Record<RitualType["type"], string> = {
  breathing: "from-cyan-500 to-blue-500",
  grounding: "from-indigo-500 to-purple-500",
  journaling: "from-pink-500 to-rose-500",
  movement: "from-success to-emerald-400",
};

export default function Rituals() {
  const navigate = useNavigate();
  const [activeRitual, setActiveRitual] = useState<string | null>(null);
  const [groundingStep, setGroundingStep] = useState(0);
  const [journalText, setJournalText] = useState("");
  const [movementStep, setMovementStep] = useState(0);

  const groundingSteps = [
    { sense: "See", count: 5, prompt: "Name 5 things you can see right now" },
    { sense: "Hear", count: 4, prompt: "Name 4 things you can hear" },
    { sense: "Touch", count: 3, prompt: "Name 3 things you can physically feel" },
    { sense: "Smell", count: 2, prompt: "Name 2 things you can smell" },
    { sense: "Taste", count: 1, prompt: "Name 1 thing you can taste" },
  ];

  const movementSteps = [
    "Roll your shoulders slowly backward 5 times",
    "Gently tilt your head to the left, then right",
    "Reach your arms above your head and stretch",
    "Take a deep breath and relax your shoulders",
  ];

  const handleRitualComplete = () => {
    setActiveRitual(null);
    setGroundingStep(0);
    setJournalText("");
    setMovementStep(0);
  };

  return (
    <div className="min-h-screen bg-background noise">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-8">
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <LumoraLogo size="sm" />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Rituals
          </h1>
          <p className="text-muted-foreground">
            Simple practices to center yourself
          </p>
        </motion.div>

        <div className="grid gap-4">
          {rituals.map((ritual, index) => (
            <motion.div
              key={ritual.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="feature"
                className="p-5 cursor-pointer"
                onClick={() => setActiveRitual(ritual.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${ritualColors[ritual.type]} text-white shadow-lg`}>
                    {ritualIcons[ritual.type]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground">{ritual.name}</h3>
                      <span className="text-xs text-muted-foreground">{ritual.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{ritual.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeRitual === "breathing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <BreathingExercise onClose={handleRitualComplete} />
          </motion.div>
        )}

        {activeRitual === "grounding" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <Card variant="glass" className="p-8 max-w-sm w-full">
              <div className="text-center space-y-6">
                <h3 className="text-lg font-medium text-foreground">
                  5-4-3-2-1 Grounding
                </h3>

                {groundingStep < groundingSteps.length ? (
                  <>
                    <div className="p-6 rounded-2xl bg-muted/30">
                      <div className="text-4xl font-light text-primary mb-2">
                        {groundingSteps[groundingStep].count}
                      </div>
                      <p className="text-foreground">
                        {groundingSteps[groundingStep].prompt}
                      </p>
                    </div>

                    <div className="flex gap-2 justify-center">
                      {groundingSteps.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i <= groundingStep ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="lumora"
                      className="w-full"
                      onClick={() => setGroundingStep((s) => s + 1)}
                    >
                      Done - Next
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="p-6 rounded-2xl bg-success/20">
                      <Check className="w-12 h-12 text-success mx-auto mb-2" />
                      <p className="text-foreground">
                        Well done. You're more grounded now.
                      </p>
                    </div>
                    <Button
                      variant="glass"
                      className="w-full"
                      onClick={handleRitualComplete}
                    >
                      Finish
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {activeRitual === "journaling" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <Card variant="glass" className="p-8 max-w-md w-full">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-foreground text-center">
                  Quick Reflection
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  Write whatever comes to mind. This is just for you.
                </p>

                <Textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="What's on your mind..."
                  className="min-h-[200px] bg-muted/30 border-border/30 resize-none"
                />

                <div className="flex gap-3">
                  <Button
                    variant="glass"
                    className="flex-1"
                    onClick={handleRitualComplete}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="lumora"
                    className="flex-1"
                    onClick={handleRitualComplete}
                  >
                    Save & Close
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Your reflections stay on your device
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {activeRitual === "movement" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <Card variant="glass" className="p-8 max-w-sm w-full">
              <div className="text-center space-y-6">
                <h3 className="text-lg font-medium text-foreground">
                  Gentle Stretch
                </h3>

                {movementStep < movementSteps.length ? (
                  <>
                    <motion.div
                      key={movementStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 rounded-2xl bg-muted/30"
                    >
                      <div className="text-sm text-muted-foreground mb-2">
                        Step {movementStep + 1} of {movementSteps.length}
                      </div>
                      <p className="text-foreground text-lg">
                        {movementSteps[movementStep]}
                      </p>
                    </motion.div>

                    <Button
                      variant="lumora"
                      className="w-full"
                      onClick={() => setMovementStep((s) => s + 1)}
                    >
                      Next
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="p-6 rounded-2xl bg-success/20">
                      <Check className="w-12 h-12 text-success mx-auto mb-2" />
                      <p className="text-foreground">
                        Great job taking a moment for yourself.
                      </p>
                    </div>
                    <Button
                      variant="glass"
                      className="w-full"
                      onClick={handleRitualComplete}
                    >
                      Finish
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
