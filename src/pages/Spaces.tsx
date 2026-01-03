import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LumoraLogo } from "@/components/LumoraLogo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SpaceType } from "@/lib/types";
import { ArrowLeft, Music, BookOpen, Dumbbell, Gamepad2, Users, Play, Pause } from "lucide-react";
import { useState } from "react";

const spaceContent: Record<SpaceType, {
  title: string;
  description: string;
  items: Array<{ id: string; title: string; subtitle?: string }>;
}> = {
  music: {
    title: "Music",
    description: "Calming sounds to help you relax",
    items: [
      { id: "rain", title: "Gentle Rain", subtitle: "Nature sounds" },
      { id: "piano", title: "Soft Piano", subtitle: "Instrumental" },
      { id: "ocean", title: "Ocean Waves", subtitle: "Nature sounds" },
      { id: "forest", title: "Forest Ambience", subtitle: "Nature sounds" },
    ],
  },
  books: {
    title: "Books",
    description: "Reflective prompts for mindful reading",
    items: [
      { id: "gratitude", title: "What are you grateful for today?" },
      { id: "strength", title: "What strength got you through a hard time?" },
      { id: "joy", title: "Describe a moment of unexpected joy" },
      { id: "growth", title: "How have you grown in the past year?" },
    ],
  },
  exercise: {
    title: "Exercise",
    description: "Gentle movement for body and mind",
    items: [
      { id: "stretch", title: "2-Minute Desk Stretch", subtitle: "Upper body" },
      { id: "walk", title: "Mindful Walk", subtitle: "3 minutes" },
      { id: "breathe", title: "Movement + Breath", subtitle: "1 minute" },
      { id: "shake", title: "Tension Release", subtitle: "30 seconds" },
    ],
  },
  games: {
    title: "Games",
    description: "Calming puzzles to focus your mind",
    items: [
      { id: "2048", title: "Number Flow", subtitle: "Puzzle" },
      { id: "memory", title: "Memory Match", subtitle: "Card game" },
      { id: "pattern", title: "Pattern Recall", subtitle: "Memory" },
      { id: "color", title: "Color Sort", subtitle: "Sorting" },
    ],
  },
  community: {
    title: "Community",
    description: "You're not alone in this",
    items: [
      { id: "today", title: "Today's Mood Trend", subtitle: "42% feeling hopeful" },
      { id: "quote", title: "Community Quote", subtitle: '"This too shall pass"' },
      { id: "milestone", title: "Collective Milestone", subtitle: "1,000 check-ins today" },
      { id: "kindness", title: "Act of Kindness", subtitle: "Share anonymously" },
    ],
  },
  voice: {
    title: "Voice",
    description: "Talk it out",
    items: [],
  },
};

const spaceIcons: Record<SpaceType, React.ReactNode> = {
  music: <Music className="w-6 h-6" />,
  books: <BookOpen className="w-6 h-6" />,
  exercise: <Dumbbell className="w-6 h-6" />,
  games: <Gamepad2 className="w-6 h-6" />,
  community: <Users className="w-6 h-6" />,
  voice: null,
};

export default function Spaces() {
  const { type } = useParams<{ type: SpaceType }>();
  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState<string | null>(null);

  if (!type || !spaceContent[type as SpaceType]) {
    navigate("/dashboard");
    return null;
  }

  const space = spaceContent[type as SpaceType];

  const handleItemClick = (itemId: string) => {
    if (type === "music") {
      setPlayingId(playingId === itemId ? null : itemId);
    }
  };

  return (
    <div className="min-h-screen bg-background noise">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[100px]" />
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
          className="flex items-center gap-4"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-pink-500 text-white shadow-lg">
            {spaceIcons[type as SpaceType]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {space.title}
            </h1>
            <p className="text-muted-foreground">{space.description}</p>
          </div>
        </motion.div>

        <div className="grid gap-3">
          {space.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="feature"
                className="p-4 cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>

                  {type === "music" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary"
                    >
                      {playingId === item.id ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {type === "music" && playingId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-4 right-4 max-w-2xl mx-auto"
          >
            <Card variant="glow" className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Now Playing</p>
                  <p className="font-medium text-foreground">
                    {space.items.find((i) => i.id === playingId)?.title}
                  </p>
                </div>
                <Button
                  variant="lumora"
                  size="icon"
                  onClick={() => setPlayingId(null)}
                >
                  <Pause className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
