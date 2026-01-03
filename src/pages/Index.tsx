import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LumoraLogo } from "@/components/LumoraLogo";
import { Button } from "@/components/ui/button";
import { NOT_A_THERAPIST_DISCLAIMER } from "@/lib/privacy";
import { Shield, Heart, Mic, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Mood Tracking",
    description: "Check in with yourself daily",
  },
  {
    icon: <Mic className="w-5 h-5" />,
    title: "Voice Companion",
    description: "Talk when you need to be heard",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Privacy-First",
    description: "Your data never leaves your device",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem("lumora_onboarded");
    setHasSeenOnboarding(seen === "true");
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem("lumora_onboarded", "true");
    navigate("/dashboard");
  };

  // Skip to dashboard if already onboarded
  useEffect(() => {
    if (hasSeenOnboarding === true) {
      navigate("/dashboard");
    }
  }, [hasSeenOnboarding, navigate]);

  if (hasSeenOnboarding === null) {
    return (
      <div className="min-h-screen bg-sanctuary flex items-center justify-center">
        <LumoraLogo size="lg" showText={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanctuary overflow-hidden">
      {/* Aurora background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lumora-aurora2/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <LumoraLogo size="lg" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12 max-w-md"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight">
            Your sanctuary for
            <span className="block text-primary">mental wellness</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A privacy-first companion that supports your emotional wellbeing
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-4 mb-12 w-full max-w-sm"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card/40 backdrop-blur border border-border/30"
            >
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-sm space-y-4"
        >
          <Button
            variant="lumora"
            size="xl"
            className="w-full group"
            onClick={handleGetStarted}
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {NOT_A_THERAPIST_DISCLAIMER}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
