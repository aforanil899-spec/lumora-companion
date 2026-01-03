import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Lumi knew I was stressed before I did. The gentle nudge to take a breathing break changed my entire afternoon. It's a game changer.",
    name: "Sarah J.",
    role: "Member since 2023",
    avatar: "S",
  },
  {
    quote: "I've tried every app out there. Lumora is the only one that feels like it actually listens rather than just logging data.",
    name: "Marcus C.",
    role: "Member since 2022",
    avatar: "M",
  },
  {
    quote: "The crisis resources are immediately available without being intrusive. It feels like a safe space in my pocket.",
    name: "Elena R.",
    role: "Member since 2024",
    avatar: "E",
  },
];

export function TestimonialsSection() {
  return (
    <section id="stories" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories from the Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who've found support with Lumi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card variant="testimonial" className="p-6 h-full relative">
                <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
                
                <p className="text-foreground leading-relaxed mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
