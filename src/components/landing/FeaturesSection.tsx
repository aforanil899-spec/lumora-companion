import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Moon, Wind, PenLine, Users } from "lucide-react";

const features = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Advanced Mood Tracking",
    description: "Visualize your emotional journey with beautiful, interactive charts that help you identify triggers and improvements over time.",
    gradient: "from-primary to-pink-500",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "CBT Exercises",
    description: "Guided Cognitive Behavioral Therapy sessions to reframe negative thoughts and build healthier thinking patterns.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: "Sleep Analysis",
    description: "Correlate your rest patterns with your mental state for better sleep hygiene and overall wellbeing.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: "Breathing Rituals",
    description: "Guided breathing exercises designed to calm your nervous system and bring you back to the present moment.",
    gradient: "from-success to-emerald-400",
  },
  {
    icon: <PenLine className="w-6 h-6" />,
    title: "Journaling Prompts",
    description: "AI-generated prompts that help you explore your thoughts and feelings in a structured, meaningful way.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Support",
    description: "Connect with others on similar journeys through anonymous mood trends and shared experiences.",
    gradient: "from-pink-500 to-rose-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete Care Toolkit
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to support your mental wellness journey, all in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="feature" className="p-6 h-full group">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-white">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
