import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to feel better?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Lumi is listening and ready to guide you towards a balanced mind. Start your free trial today.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <Button
              variant="lumora"
              size="xl"
              onClick={() => navigate("/dashboard")}
              className="text-lg px-12"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Lumi Now
            </Button>
          </motion.div>

          {/* Status card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                <span className="text-white text-lg">🌙</span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-success border-2 border-background" />
              </span>
            </div>
            <div className="text-left">
              <div className="text-xs text-success font-medium uppercase tracking-wider">Online</div>
              <div className="text-muted-foreground italic">"I'm here when you're ready."</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
