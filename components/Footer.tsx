"use client";
import { ArrowUp, Zap, ShieldCheck, Palette, Headphones, Clock } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ position: "relative", zIndex: 10, background: "#FFFFFF", borderTop: "1px solid rgba(15,23,42,0.08)", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Top CTA Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)",
          borderRadius: 24,
          border: "1px solid rgba(6, 182, 212, 0.2)",
          padding: "48px 40px",
          marginBottom: 70,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 28
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              <span className="eyebrow-line" />
              Easy First Purchase
            </div>
            <h3 style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)", fontWeight: 900, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.02em" }}>
              Test our speed with a ₹999 trial pack.
            </h3>
            <p style={{ color: "#64748B", fontSize: "1rem", maxWidth: 520, lineHeight: 1.6 }}>
              Get 2 custom static ad images for your product. No subscription, no monthly commitment.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary"
              style={{ padding: "16px 32px", borderRadius: 14, fontSize: "0.95rem" }}
            >
              Request the ₹999 Trial
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="btn-ghost"
              style={{ padding: "16px 28px", borderRadius: 14, fontSize: "0.95rem" }}
            >
              View Packages
            </button>
          </div>
        </div>

        {/* 4-column footer links */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
          marginBottom: 60
        }}>
          {/* Brand info */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img
                src="/velocity-logo-v.png"
                alt="Velocity Creatives"
                style={{ width: 32, height: 32, objectFit: "contain" }}
              />
              <span style={{ color: "#0F172A", fontWeight: 900, fontSize: "1.1rem" }}>
                Velocity <span className="gt">Creatives</span>
              </span>
            </div>
            <div style={{ color: "#64748B", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              Product Photos | Ad Creatives | Carousels | Videos
            </div>
            <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 360, marginBottom: 20 }}>
              Send us your existing product photos. We transform them into polished images, ad creatives and carousels for your website and social media.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
              <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>
                Accepting New Brands • ₹999 Trial Pack Available
              </span>
            </div>
          </div>

          {/* Column: What We Make */}
          <div>
            <h4 style={{ color: "#0F172A", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>
              Specific Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.88rem", color: "#64748B" }}>
              <span>Product Images</span>
              <span>Ad Creatives</span>
              <span>Swipe-Through Carousels</span>
              <span>Short Product Videos</span>
              <span>Concept Visuals</span>
            </div>
          </div>

          {/* Column: Links */}
          <div>
            <h4 style={{ color: "#0F172A", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.88rem" }}>
              {["Our Work", "Packages", "How It Works", "FAQ", "Book Call"].map((item) => {
                const map: Record<string, string> = {
                  "Our Work": "work",
                  "Packages": "services",
                  "How It Works": "process",
                  "FAQ": "faq",
                  "Book Call": "contact"
                };
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(map[item])}
                    style={{ background: "none", border: "none", padding: 0, textAlign: "left", color: "#64748B", cursor: "pointer", fontSize: "0.88rem", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0F172A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column: Guarantees */}
          <div>
            <h4 style={{ color: "#0F172A", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>
              Our Policies
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.85rem", color: "#64748B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={14} color="#06B6D4" /> Confirmed Delivery Date
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck size={14} color="#10B981" /> No Long-Term Contracts
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Palette size={14} color="#6366F1" /> You Own All Designs
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Headphones size={14} color="#0891b2" /> WhatsApp &amp; Email Support
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(15,23,42,0.08)",
          paddingTop: 28,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16
        }}>
          <div style={{ fontSize: "0.82rem", color: "#64748B" }}>
            &copy; {new Date().getFullYear()} Velocity Creatives. All rights reserved. Built for growing e-commerce stores.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Privacy Policy</span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Terms of Service</span>
            <button
              onClick={scrollToTop}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#F1F5F9",
                border: "1px solid rgba(15,23,42,0.1)",
                color: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              title="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
