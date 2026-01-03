import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { SpaceType } from "@/lib/types";
import { Music, BookOpen, Dumbbell, Gamepad2, Users, Mic } from "lucide-react";

interface SpaceCardProps {
  type: SpaceType;
  onClick: () => void;
}

const spaceConfig: Record<SpaceType, {
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}> = {
  music: {
    name: "Music",
    description: "Calming sounds",
    icon: <Music className="w-5 h-5" />,
    gradient: "from-primary/20 to-pink-500/10",
  },
  books: {
    name: "Books",
    description: "Reflective prompts",
    icon: <BookOpen className="w-5 h-5" />,
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  exercise: {
    name: "Exercise",
    description: "Gentle movement",
    icon: <Dumbbell className="w-5 h-5" />,
    gradient: "from-success/20 to-emerald-500/10",
  },
  games: {
    name: "Games",
    description: "Calming puzzles",
    icon: <Gamepad2 className="w-5 h-5" />,
    gradient: "from-orange-500/20 to-yellow-500/10",
  },
  community: {
    name: "Community",
    description: "Shared experiences",
    icon: <Users className="w-5 h-5" />,
    gradient: "from-pink-500/20 to-rose-500/10",
  },
  voice: {
    name: "Voice",
    description: "Talk it out",
    icon: <Mic className="w-5 h-5" />,
    gradient: "from-indigo-500/20 to-purple-500/10",
  },
};

export function SpaceCard({ type, onClick }: SpaceCardProps) {
  const config = spaceConfig[type];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        variant="feature"
        className={`p-4 cursor-pointer bg-gradient-to-br ${config.gradient}`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-card/80 text-foreground">
            {config.icon}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{config.name}</h4>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
