"use client";
import { ArrowUp, Zap, Palette, ShieldCheck, Headphones } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(6, 6, 12, 0.95)", backdropFilter: "blur(20px)", paddingTop: 80, paddingBottom: 40, paddingLeft: 24, paddingRight: 24 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Top Callout Banner */}
        <div style={{
          borderRadius: 24,
          background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)",
          border: "1px solid rgba(124, 58, 237, 0.25)",
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 70
        }}>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#38bdf8", marginBottom: 8 }}>
              Continuous Monthly Creative
            </div>
            <h3 style={{ color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              Ready to get more sales with better ads?
            </h3>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary"
            style={{ padding: "16px 32px", borderRadius: 14, fontSize: "0.95rem" }}
          >
            Book a Free Call &rarr;
          </button>
        </div>

        {/* Multi-column Navigation */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 40,
          marginBottom: 60
        }}>
          {/* Brand info */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 14,
                boxShadow: "0 0 15px rgba(124,58,237,0.5)"
              }}>
                <Zap size={16} />
              </div>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>
                Velocity <span className="gt">Creatives</span>
              </span>
            </div>
            <p style={{ color: "rgba(232,232,240,0.5)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 320, marginBottom: 20 }}>
              We create high-converting image and video ads for growing direct-to-consumer brands.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
              <span style={{ fontSize: "0.8rem", color: "rgba(232,232,240,0.7)", fontWeight: 600 }}>
                Accepting New Brands
              </span>
            </div>
          </div>

          {/* Column: What We Make */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>
              What We Make
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.88rem", color: "rgba(232,232,240,0.55)" }}>
              <span>High-Converting Image Ads</span>
              <span>Short Video Ads for Reels</span>
              <span>Educational Carousels</span>
              <span>3D Product Renders</span>
              <span>Headline Copywriting</span>
            </div>
          </div>

          {/* Column: Links */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.88rem", color: "rgba(232,232,240,0.55)" }}>
              <a href="#work" style={{ color: "inherit", textDecoration: "none" }}>Our Work</a>
              <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Pricing Plans</a>
              <a href="#process" style={{ color: "inherit", textDecoration: "none" }}>How It Works</a>
              <a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a>
              <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>Book a Call</a>
            </div>
          </div>

          {/* Column: Our Commitments */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>
              Our Promises
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.85rem", color: "rgba(232,232,240,0.6)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Zap size={14} color="#38bdf8" /> Fast 24 to 48-Hour Delivery
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck size={14} color="#4ade80" /> No Long-Term Contracts
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Palette size={14} color="#a855f7" /> You Own All Designs
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Headphones size={14} color="#e879f9" /> Direct Founder Support
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16
        }}>
          <div style={{ fontSize: "0.82rem", color: "rgba(232,232,240,0.4)" }}>
            Copyright {new Date().getFullYear()} Velocity Creatives. All rights reserved.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: "0.82rem", color: "rgba(232,232,240,0.4)" }}>Privacy Policy</span>
            <span style={{ fontSize: "0.82rem", color: "rgba(232,232,240,0.4)" }}>Terms of Service</span>
            <button
              onClick={scrollToTop}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(232,232,240,0.7)",
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
