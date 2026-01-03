import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EMERGENCY_RESOURCES } from "@/lib/types";
import { NOT_A_THERAPIST_DISCLAIMER } from "@/lib/privacy";
import { Phone, MessageCircle, Globe, Heart, X } from "lucide-react";

interface CrisisOverlayProps {
  onClose: () => void;
}

export function CrisisOverlay({ onClose }: CrisisOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-lg w-full"
      >
        <Card variant="glow" className="p-6 border-destructive/30">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-destructive/20">
                <Heart className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  You Matter
                </h2>
                <p className="text-sm text-muted-foreground">
                  Help is available right now
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl bg-muted/50 border border-border/30">
              <h3 className="font-medium text-foreground mb-2">
                {EMERGENCY_RESOURCES.US.name}
              </h3>
              <div className="space-y-2">
                <a
                  href={`tel:${EMERGENCY_RESOURCES.US.phone}`}
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {EMERGENCY_RESOURCES.US.phone}</span>
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>{EMERGENCY_RESOURCES.US.text}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border/30">
              <h3 className="font-medium text-foreground mb-2">
                {EMERGENCY_RESOURCES.UK.name}
              </h3>
              <a
                href={`tel:${EMERGENCY_RESOURCES.UK.phone}`}
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Phone className="w-4 h-4" />
                <span>Call {EMERGENCY_RESOURCES.UK.phone}</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border/30">
              <h3 className="font-medium text-foreground mb-2">
                {EMERGENCY_RESOURCES.GLOBAL.name}
              </h3>
              <a
                href={EMERGENCY_RESOURCES.GLOBAL.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Globe className="w-4 h-4" />
                <span>Find help in your country</span>
              </a>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mb-4">
            {NOT_A_THERAPIST_DISCLAIMER}
          </p>

          <Button variant="glass" className="w-full" onClick={onClose}>
            I'm Okay, Return to Lumora
          </Button>
        </Card>
      </motion.div>
    </motion.div>
  );
}
