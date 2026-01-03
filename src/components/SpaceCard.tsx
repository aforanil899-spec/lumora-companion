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
    icon: <Music className="w-6 h-6" />,
    gradient: "from-primary/20 to-accent/10",
  },
  books: {
    name: "Books",
    description: "Reflective prompts",
    icon: <BookOpen className="w-6 h-6" />,
    gradient: "from-success/20 to-primary/10",
  },
  exercise: {
    name: "Exercise",
    description: "Gentle movement",
    icon: <Dumbbell className="w-6 h-6" />,
    gradient: "from-warning/20 to-success/10",
  },
  games: {
    name: "Games",
    description: "Calming puzzles",
    icon: <Gamepad2 className="w-6 h-6" />,
    gradient: "from-accent/20 to-primary/10",
  },
  community: {
    name: "Community",
    description: "Shared experiences",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-lumora-aurora2/20 to-accent/10",
  },
  voice: {
    name: "Voice",
    description: "Talk it out",
    icon: <Mic className="w-6 h-6" />,
    gradient: "from-primary/30 to-lumora-aurora1/10",
  },
};

export function SpaceCard({ type, onClick }: SpaceCardProps) {
  const config = spaceConfig[type];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        variant="space"
        className={`p-4 cursor-pointer bg-gradient-to-br ${config.gradient} hover:shadow-glow group`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-muted/50 text-foreground group-hover:bg-primary/20 transition-colors">
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
