import { LumoraLogo } from "@/components/LumoraLogo";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <LumoraLogo size="sm" />

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2024 Lumora Inc.
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground/60 max-w-2xl mx-auto">
            Lumora is not a replacement for professional mental health care. If you're in crisis, please contact emergency services or a mental health professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
