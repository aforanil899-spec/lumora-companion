import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LumoraLogo } from "@/components/LumoraLogo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PRIVACY_DISCLAIMER, NOT_A_THERAPIST_DISCLAIMER } from "@/lib/privacy";
import { useMoodStore } from "@/hooks/useMoodStore";
import { ArrowLeft, Camera, Mic, Trash2, Shield, Heart, ExternalLink } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const { entries, clearHistory } = useMoodStore();
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearData = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-sanctuary">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <LumoraLogo size="sm" />
        </header>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-foreground"
        >
          Settings
        </motion.h1>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass" className="p-5 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-success" />
              <h2 className="font-medium text-foreground">Privacy</h2>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">Camera for Mood Verification</p>
                  <p className="text-xs text-muted-foreground">
                    Emotion analysis happens on your device only
                  </p>
                </div>
              </div>
              <Switch
                checked={cameraEnabled}
                onCheckedChange={setCameraEnabled}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Mic className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">Voice Companion</p>
                  <p className="text-xs text-muted-foreground">
                    Speech recognition stays on your device
                  </p>
                </div>
              </div>
              <Switch
                checked={voiceEnabled}
                onCheckedChange={setVoiceEnabled}
              />
            </div>
          </Card>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass" className="p-5 space-y-4">
            <h2 className="font-medium text-foreground">Your Data</h2>
            
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">
                {entries.length} mood entries stored locally
              </p>
            </div>

            {!showClearConfirm ? (
              <Button
                variant="outline"
                className="w-full text-destructive hover:bg-destructive/10"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-destructive">
                  This will permanently delete all your mood history. This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="sanctuary"
                    className="flex-1"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleClearData}
                  >
                    Delete All
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* About & Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass" className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-accent" />
              <h2 className="font-medium text-foreground">About LUMORA</h2>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{NOT_A_THERAPIST_DISCLAIMER}</p>
              <p className="whitespace-pre-line">{PRIVACY_DISCLAIMER}</p>
            </div>

            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <a
                href="https://findahelpline.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find Professional Help
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </Card>
        </motion.div>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-muted-foreground text-center"
        >
          LUMORA v1.0.0 • Privacy-first mental wellness
        </motion.p>
      </div>
    </div>
  );
}
