import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import type { MoodEntry, MoodLevel } from "@/lib/types";
import { format } from "date-fns";

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const moodColors: Record<MoodLevel, string> = {
  great: "bg-success",
  good: "bg-warning",
  okay: "bg-muted-foreground",
  low: "bg-secondary",
  struggling: "bg-accent",
};

const moodLabels: Record<MoodLevel, string> = {
  great: "Great",
  good: "Good",
  okay: "Okay",
  low: "Low",
  struggling: "Struggling",
};

export function MoodHistory({ entries }: MoodHistoryProps) {
  // Get last 7 entries for mini view
  const recentEntries = entries.slice(-7);

  if (entries.length === 0) {
    return (
      <Card variant="glass" className="p-4">
        <p className="text-sm text-muted-foreground text-center">
          No mood entries yet. Start your first check-in!
        </p>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="p-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-4">
        Recent Moods
      </h4>
      
      {/* Mini mood bars */}
      <div className="flex items-end gap-1 h-16 mb-3">
        {recentEntries.map((entry, index) => {
          const heightMap: Record<MoodLevel, string> = {
            great: "h-16",
            good: "h-12",
            okay: "h-8",
            low: "h-5",
            struggling: "h-3",
          };
          
          return (
            <motion.div
              key={entry.id}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex-1 flex flex-col justify-end"
            >
              <div
                className={`${heightMap[entry.userMood]} ${moodColors[entry.userMood]} rounded-t-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer`}
                title={`${moodLabels[entry.userMood]} - ${format(entry.timestamp, "MMM d, h:mm a")}`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {Object.entries(moodLabels).map(([level, label]) => (
          <div key={level} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${moodColors[level as MoodLevel]}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
