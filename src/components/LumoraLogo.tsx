import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface LumoraLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function LumoraLogo({ size = "md", showText = true, className = "" }: LumoraLogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 40, text: "text-2xl" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-pink-500">
          <Brain className="text-white" size={s.icon} strokeWidth={1.5} />
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-pink-500 blur-lg opacity-40" />
      </motion.div>

      {showText && (
        <span className={`font-bold tracking-tight ${s.text} text-foreground`}>
          Lumora
        </span>
      )}
    </div>
  );
}
