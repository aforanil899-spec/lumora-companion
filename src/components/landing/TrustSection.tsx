import { motion } from "framer-motion";
import { Shield, Heart, Building2, CheckCircle2 } from "lucide-react";

const partners = [
  { name: "Clinic Partner", icon: <Building2 className="w-5 h-5" /> },
  { name: "Secure Health", icon: <Shield className="w-5 h-5" /> },
  { name: "Mind Institute", icon: <Heart className="w-5 h-5" /> },
  { name: "HIPAA Verified", icon: <CheckCircle2 className="w-5 h-5" /> },
];

export function TrustSection() {
  return (
    <section className="py-16 px-4 border-y border-border/30 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Trusted by Leading Organizations
          </h3>
          <p className="text-sm text-muted-foreground/70">
            Our platform is HIPAA compliant and trusted by top mental health clinics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex items-center gap-3 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              {partner.icon}
              <span className="font-medium">{partner.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
