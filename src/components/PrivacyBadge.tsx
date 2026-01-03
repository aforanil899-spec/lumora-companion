import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function PrivacyBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success text-xs"
    >
      <Shield className="w-3 h-3" />
      <span>Privacy-first: Your data stays on your device</span>
    </motion.div>
  );
}
