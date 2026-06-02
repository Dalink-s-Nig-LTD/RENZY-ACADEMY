import { PHONE, PHONE_RAW, EMAIL, WHATSAPP_LINK } from "../lib/constants";

type ContactInfoVariant = "inline" | "footer" | "modal";

interface ContactInfoProps {
  variant: ContactInfoVariant;
}

export function ContactInfo({ variant }: ContactInfoProps) {
  if (variant === "footer") {
    return (
      <div className="footer-contact">
        <a href={`tel:${PHONE_RAW}`}>{PHONE}</a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="contact-bar">
        <a href={`tel:${PHONE_RAW}`}>&#x1F4DE; {PHONE}</a>
        <span>|</span>
        <a href={`mailto:${EMAIL}`}>&#x2709;&#xFE0F; {EMAIL}</a>
      </div>
    );
  }

  return (
    <p style={{ fontSize: "0.85rem", color: "var(--r-text-light)" }}>
      Or reach us directly:
      <br />
      <a href={`tel:${PHONE_RAW}`} style={{ color: "var(--r-accent)" }}>
        {PHONE}
      </a>
      {" · "}
      <a href={`mailto:${EMAIL}`} style={{ color: "var(--r-accent)" }}>
        {EMAIL}
      </a>
      {" · "}
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "var(--r-accent)" }}>
        WhatsApp
      </a>
    </p>
  );
}
