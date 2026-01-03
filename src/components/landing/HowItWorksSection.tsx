import { motion } from "framer-motion";
import { Eye, BarChart3, Lightbulb, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Eye className="w-7 h-7" />,
    title: "Detect",
    description: "Lumi notices subtle changes in your mood patterns, speech cadence, and daily check-ins.",
    color: "from-primary to-pink-500",
  },
  {
    number: "02",
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Analyze",
    description: "Deep learning models process the context of your day against clinical baselines to understand the 'why'.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    number: "03",
    icon: <Lightbulb className="w-7 h-7" />,
    title: "Suggest",
    description: "Actionable advice, breathing exercises, or CBT prompts are offered instantly when you need them most.",
    color: "from-success to-emerald-400",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Agentic Flow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lumi proactively helps you navigate your mental health journey through a continuous cycle of care, not just reactive responses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines (desktop) */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-cyan-500 to-success opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-border/60 transition-all group h-full">
                {/* Step number */}
                <div className="text-6xl font-bold text-muted/30 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6 shadow-lg`}>
                  <span className="text-white">{step.icon}</span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (not on last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-24 w-8 h-8 items-center justify-center text-muted-foreground/30 z-10">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
