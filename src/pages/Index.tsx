import { useState, useCallback } from "react";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import logo from "@/assets/reach-logo.png";
import LoadingScreen from "@/components/LoadingScreen";
import WarningModal from "@/components/WarningModal";

type ModalAction = { type: "call" | "whatsapp"; number: string } | null;

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  const handleContinue = useCallback(() => {
    if (!modalAction) return;
    const num = modalAction.number;
    if (modalAction.type === "call") {
      window.open(`tel:${num}`, "_self");
    } else {
      window.open(`https://wa.me/${num.replace("+", "")}`, "_blank");
    }
    setModalAction(null);
  }, [modalAction]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-center bg-background border-b border-border py-3">
        <img src={logo} alt="REACH.MME" className="h-8" />
      </header>

      <main className="px-4 py-5 pb-8 space-y-5 max-w-md mx-auto">
        {/* Vehicle Info */}
        <Section delay={0}>
          <SectionCard>
            <p className="text-lg font-bold tracking-wide text-foreground">KA 05 MQ 1326</p>
            <p className="mt-1 text-sm text-muted-foreground">Ertiga Maruti Suzuki</p>
            <div className="my-3 h-px bg-border" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sorry for any inconvenience caused.
              <br />
              Thank you for your understanding.
            </p>
          </SectionCard>
        </Section>

        {/* Primary Contact */}
        <Section delay={1}>
          <SectionTitle>Primary Number</SectionTitle>
          <SectionCard>
            <p className="text-center text-base font-semibold tracking-wider text-foreground">+91 ******5584</p>
            <ContactButtons
              onCall={() => setModalAction({ type: "call", number: "+918951225584" })}
              onWhatsApp={() => setModalAction({ type: "whatsapp", number: "+918951225584" })}
            />
          </SectionCard>
        </Section>

        {/* Alternate Contact */}
        <Section delay={2}>
          <SectionTitle>Alternate Number</SectionTitle>
          <SectionCard>
            <p className="text-center text-base font-semibold tracking-wider text-foreground">+91 ******7067</p>
            <ContactButtons
              onCall={() => setModalAction({ type: "call", number: "+919108167067" })}
              onWhatsApp={() => setModalAction({ type: "whatsapp", number: "+919108167067" })}
            />
          </SectionCard>
        </Section>

        {/* Location */}
        <Section delay={3}>
          <SectionTitle>Location</SectionTitle>
          <SectionCard>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Amar Layout, Bangalore, Karnataka, 560045, India
            </p>
            <div className="mt-4 flex justify-center">
              <ActionButton
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/search/Amar+Layout+Bangalore+Karnataka+560045+India",
                    "_blank"
                  )
                }
                icon={<MapPin size={16} />}
                label="Show on Map"
              />
            </div>
          </SectionCard>
        </Section>

        {/* Custom Sticker CTA */}
        <Section delay={4}>
          <SectionCard>
            <p className="text-center text-sm text-foreground/90">Want to make your custom sticker?</p>
            <div className="mt-4 flex justify-center">
              <ActionButton
                onClick={() => window.open("mailto:maazmohammed112@gmail.com", "_self")}
                icon={<Mail size={16} />}
                label="Contact Us"
              />
            </div>
          </SectionCard>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-4">
        <p className="text-center text-xs text-muted-foreground">© 2026 Registered REACH.MME</p>
      </footer>

      <WarningModal
        open={!!modalAction}
        onCancel={() => setModalAction(null)}
        onContinue={handleContinue}
      />
    </div>
  );
};

/* --- Sub-components --- */

const Section = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <div className="animate-fade-up opacity-0" style={{ animationDelay: `${delay * 0.1}s`, animationFillMode: "forwards" }}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{children}</h2>
);

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-border bg-card p-4">{children}</div>
);

const ContactButtons = ({ onCall, onWhatsApp }: { onCall: () => void; onWhatsApp: () => void }) => (
  <div className="mt-4 flex gap-3">
    <button
      onClick={onCall}
      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-call py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
    >
      <Phone size={16} />
      Call
    </button>
    <button
      onClick={onWhatsApp}
      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-whatsapp py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
    >
      <MessageCircle size={16} />
      WhatsApp
    </button>
  </div>
);

const ActionButton = ({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
  >
    {icon}
    {label}
  </button>
);

export default Index;
