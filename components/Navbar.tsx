"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Our Work", id: "work" },
    { label: "Pricing", id: "services" },
    { label: "How It Works", id: "process" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.35s ease",
          padding: scrolled ? "10px 0" : "18px 0",
          background: scrolled ? "rgba(255, 255, 255, 0.94)" : "rgba(248, 249, 250, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(15, 23, 42, 0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 20px rgba(15, 23, 42, 0.04)" : "none",
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 32px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src="/velocity-logo-v.png"
              alt="Velocity Creatives Logo"
              style={{
                width: 36,
                height: 36,
                objectFit: "contain",
              }}
            />
            <span style={{ color: "#0F172A", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
              Velocity <span className="gt">Creatives</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="desktop-nav-links">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="nav-item">
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="desktop-cta-btn">
            <button
              onClick={() => go("contact")}
              className="btn-primary"
              style={{ padding: "10px 22px", borderRadius: 12, fontSize: "0.82rem", letterSpacing: "0.02em" }}
            >
              Book a Call &rarr;
            </button>
          </div>

          {/* Mobile Right Controls: Compact 'Book' pill + Hamburger toggle */}
          <div className="mobile-nav-controls">
            <button
              onClick={() => go("contact")}
              className="btn-primary"
              style={{
                padding: "7px 14px",
                borderRadius: 999,
                fontSize: "0.78rem",
                fontWeight: 700
              }}
            >
              Book Call
            </button>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(15, 23, 42, 0.05)",
                border: "1px solid rgba(15, 23, 42, 0.1)",
                color: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 66,
              left: 12,
              right: 12,
              zIndex: 110,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              borderRadius: 20,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(15, 23, 42, 0.1)",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.15)"
            }}
          >
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                style={{
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0F172A",
                  background: "none",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: 10,
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(15, 23, 42, 0.06)"
                }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="btn-primary"
              style={{ padding: "14px", borderRadius: 12, justifyContent: "center", width: "100%", marginTop: 6 }}
            >
              Book a Call &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
