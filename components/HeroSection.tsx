"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Palette, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const word = {
    hidden: { opacity: 0, y: 60, rotateX: -30 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "140px 24px 80px" }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        backgroundImage: "linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* Glowing orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)", filter: "blur(40px)", zIndex: 1, animation: "glow-pulse 4s ease infinite" }} />
      <div style={{ position: "absolute", bottom: "-5%", right: "0%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)", filter: "blur(40px)", zIndex: 1, animation: "glow-pulse 5s 1s ease infinite" }} />

      <motion.div style={{ y, opacity, position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40 }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "6px 18px 6px 12px",
            background: "#FFFFFF", backdropFilter: "blur(16px)",
            border: "1px solid rgba(15,23,42,0.08)", borderRadius: 999,
            boxShadow: "0 4px 16px rgba(15,23,42,0.04)"
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", display: "inline-block" }} />
              <span style={{ color: "#059669", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Now Open</span>
            </span>
            <span style={{ width: 1, height: 14, background: "rgba(15,23,42,0.12)" }} />
            <span style={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 600 }}>Accepting New Brands</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ perspective: 1000 }}
        >
          <div className="display-xl" style={{ color: "#0F172A", marginBottom: 8, display: "block" }}>
            {"We Make".split(" ").map((w, i) => (
              <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</motion.span>
            ))}
          </div>
          <div className="display-xl" style={{ marginBottom: 8, display: "block" }}>
            {"High-Converting Ads".split(" ").map((w, i) => (
              <motion.span key={i} variants={word} className="gt" style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</motion.span>
            ))}
          </div>
          <div className="display-xl" style={{ color: "#64748B", display: "block" }}>
            {"for Online Brands.".split(" ").map((w, i) => (
              <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "#64748B", maxWidth: 620, margin: "32px auto 44px", lineHeight: 1.7 }}
        >
          Get fresh, eye-catching image ads, product carousels, and short video cuts made for your store every single month.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 60 }}
        >
          <button
            onClick={() => go("work")}
            className="btn-primary"
            style={{ padding: "16px 36px", borderRadius: 14, fontSize: "0.95rem" }}
          >
            See Sample Work <ArrowRight size={16} />
          </button>
          <button
            onClick={() => go("services")}
            className="btn-ghost"
            style={{ padding: "16px 32px", borderRadius: 14, fontSize: "0.95rem" }}
          >
            View Pricing Plans
          </button>
        </motion.div>

        {/* Four agency pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="hero-pillars-grid"
        >
          {[
            { n: "24-48 Hours", l: "Fast Delivery", icon: Zap, color: "#06B6D4" },
            { n: "100% Custom", l: "Made for Your Brand", icon: Palette, color: "#6366F1" },
            { n: "HD & 4K", l: "Instagram & Reels Ready", icon: Smartphone, color: "#0EA5E9" },
            { n: "No Contracts", l: "Cancel Anytime", icon: ShieldCheck, color: "#10B981" },
          ].map(({ n, l, icon: Icon, color }) => (
            <div
              key={l}
              className="hero-pillar-item"
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: color }}>
                <Icon size={20} />
              </div>
              <div style={{ fontSize: "1.35rem", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 4, color: "#0F172A" }}>
                {n}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
      >
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, #06B6D4, transparent)" }} />
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748B" }}>Scroll</span>
      </motion.div>
    </section>
  );
}
