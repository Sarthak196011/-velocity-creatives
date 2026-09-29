"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          transition: "all 0.4s ease",
          padding: scrolled ? "12px 0" : "22px 0",
          background: scrolled ? "rgba(8,8,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(124,58,237,0.6)",
              color: "#fff"
            }}>
              <Zap size={16} />
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
              Velocity <span className="gt">Creatives</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden md:flex">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="nav-item">{l.label}</button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => go("contact")}
              className="btn-primary"
              style={{ padding: "10px 22px", borderRadius: 12, fontSize: "0.82rem", letterSpacing: "0.02em" }}
            >
              Book a Call &rarr;
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(232,232,240,0.7)", fontSize: 20, lineHeight: 1 }}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass"
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}
          >
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="nav-item" style={{ textAlign: "left", fontSize: "1rem" }}>{l.label}</button>
            ))}
            <button onClick={() => go("contact")} className="btn-primary" style={{ padding: "14px", borderRadius: 12, justifyContent: "center", width: "100%" }}>
              Book a Call &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
