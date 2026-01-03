import { motion } from "framer-motion";

interface LumoraLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function LumoraLogo({ size = "md", showText = true, className = "" }: LumoraLogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 48, text: "text-2xl" },
    lg: { icon: 72, text: "text-4xl" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Animated orb logo */}
      <div className="relative" style={{ width: s.icon, height: s.icon }}>
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-lumora-aurora2 opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Inner orb */}
        <motion.div
          className="absolute inset-1 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Center light */}
        <motion.div
          className="absolute inset-3 rounded-full bg-gradient-to-br from-foreground/30 to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {showText && (
        <span className={`font-semibold tracking-wide ${s.text} text-foreground`}>
          LUMORA
        </span>
      )}
    </div>
  );
}
