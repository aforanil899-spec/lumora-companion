import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VOICE_PROMPTS, generateLumoraResponse } from "@/lib/lumora-ai";
import { detectCrisisKeywords } from "@/lib/privacy";
import { NOT_A_THERAPIST_DISCLAIMER } from "@/lib/privacy";
import { Mic, MicOff, Volume2, X, AlertCircle } from "lucide-react";

interface VoiceCompanionProps {
  onClose: () => void;
  onCrisisDetected: () => void;
}

type VoiceState = "idle" | "listening" | "processing" | "speaking";

export function VoiceCompanion({ onClose, onCrisisDetected }: VoiceCompanionProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState(VOICE_PROMPTS.greeting);
  const [isHolding, setIsHolding] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Check if speech recognition is supported
  const isSupported = typeof window !== "undefined" && 
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setState("listening");
      setTranscript("");
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptText = result[0].transcript;
      setTranscript(transcriptText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setState("idle");
    };

    recognition.onend = () => {
      if (isHolding) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, isHolding]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    if (transcript) {
      setState("processing");
      
      // Check for crisis keywords
      if (detectCrisisKeywords(transcript)) {
        onCrisisDetected();
        return;
      }

      // Generate response (in production, this would call the backend)
      const lumoraResponse = generateLumoraResponse("okay", undefined, transcript);
      setResponse(lumoraResponse.message);
      
      // Speak the response
      speakResponse(lumoraResponse.message);
    } else {
      setState("idle");
    }
  }, [transcript, onCrisisDetected]);

  const speakResponse = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setState("idle");
      return;
    }

    setState("speaking");
    synthRef.current = window.speechSynthesis;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setState("idle");
    };

    utterance.onerror = () => {
      setState("idle");
    };

    synthRef.current.speak(utterance);
  };

  const handleHoldStart = () => {
    setIsHolding(true);
    startListening();
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    stopListening();
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setState("idle");
  };

  if (!isSupported) {
    return (
      <Card variant="sanctuary" className="p-6 max-w-sm mx-auto">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 mx-auto text-warning" />
          <h3 className="text-lg font-medium text-foreground">
            Voice Not Available
          </h3>
          <p className="text-sm text-muted-foreground">
            Voice features require a browser that supports the Web Speech API.
            Try using Chrome, Edge, or Safari.
          </p>
          <Button variant="sanctuary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="sanctuary" className="p-8 max-w-sm mx-auto relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="text-center space-y-6">
        <h3 className="text-lg font-medium text-foreground">
          Voice Companion
        </h3>

        {/* Voice orb */}
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <motion.div
            animate={{
              scale: state === "listening" ? [1, 1.15, 1] : 
                     state === "speaking" ? [1, 1.1, 1] : 1,
              opacity: state === "idle" ? 0.6 : 1,
            }}
            transition={{
              duration: state === "listening" ? 0.5 : 1.5,
              repeat: state !== "idle" ? Infinity : 0,
              ease: "easeInOut",
            }}
            className={`w-32 h-32 rounded-full flex items-center justify-center shadow-glow ${
              state === "listening" 
                ? "bg-gradient-to-br from-success to-primary" 
                : state === "speaking"
                ? "bg-gradient-to-br from-accent to-primary"
                : "bg-gradient-to-br from-primary to-accent"
            }`}
          >
            {state === "listening" ? (
              <Mic className="w-10 h-10 text-primary-foreground" />
            ) : state === "speaking" ? (
              <Volume2 className="w-10 h-10 text-primary-foreground" />
            ) : (
              <MicOff className="w-10 h-10 text-primary-foreground/70" />
            )}
          </motion.div>
        </div>

        {/* State indicator */}
        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={state}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm text-muted-foreground"
            >
              {state === "idle" && "Hold to talk"}
              {state === "listening" && "Listening..."}
              {state === "processing" && "Processing..."}
              {state === "speaking" && "Speaking..."}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Transcript */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-lg bg-muted/30 text-sm text-foreground"
          >
            "{transcript}"
          </motion.div>
        )}

        {/* Response */}
        <motion.div
          key={response}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground italic"
        >
          {response}
        </motion.div>

        {/* Hold to talk button */}
        {state !== "speaking" ? (
          <Button
            variant="lumora"
            size="xl"
            className="w-full touch-none select-none"
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
          >
            {state === "listening" ? "Release to Send" : "Hold to Talk"}
          </Button>
        ) : (
          <Button
            variant="sanctuary"
            size="xl"
            className="w-full"
            onClick={stopSpeaking}
          >
            Interrupt
          </Button>
        )}

        <p className="text-xs text-muted-foreground">
          {NOT_A_THERAPIST_DISCLAIMER}
        </p>
      </div>
    </Card>
  );
}
