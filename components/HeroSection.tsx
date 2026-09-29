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
        backgroundImage: "linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* Glowing orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 65%)", filter: "blur(40px)", zIndex: 1, animation: "glow-pulse 4s ease infinite" }} />
      <div style={{ position: "absolute", bottom: "-5%", right: "0%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 65%)", filter: "blur(40px)", zIndex: 1, animation: "glow-pulse 5s 1s ease infinite" }} />

      <motion.div style={{ y, opacity, position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        
        {/* Status badge in simple English */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40 }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "6px 18px 6px 12px",
            background: "rgba(12,12,22,0.8)", backdropFilter: "blur(16px)",
            border: "1px solid rgba(74,222,128,0.3)", borderRadius: 999,
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
              <span style={{ color: "#4ade80", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>Now Open</span>
            </span>
            <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.12)" }} />
            <span style={{ color: "rgba(232,232,240,0.75)", fontSize: "0.75rem", fontWeight: 600 }}>Accepting New Brands</span>
          </div>
        </motion.div>

        {/* Headline in simple English */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ perspective: 1000 }}
        >
          <div className="display-xl" style={{ color: "#fff", marginBottom: 8, display: "block" }}>
            {"We Make".split(" ").map((w, i) => (
              <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</motion.span>
            ))}
          </div>
          <div className="display-xl" style={{ marginBottom: 8, display: "block" }}>
            {"High-Converting Ads".split(" ").map((w, i) => (
              <motion.span key={i} variants={word} className="gt" style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</motion.span>
            ))}
          </div>
          <div className="display-xl" style={{ color: "rgba(232,232,240,0.45)", display: "block" }}>
            {"for Online Brands.".split(" ").map((w, i) => (
              <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.25em" }}>{w}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle in simple English */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: "rgba(232,232,240,0.6)", maxWidth: 620, margin: "32px auto 44px", lineHeight: 1.7 }}
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

        {/* Four honest agency pillars using clean Lucide icons (Zero emoji/Mojibake bugs) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}
        >
          {[
            { n: "24-48 Hours", l: "Fast Delivery", icon: Zap, color: "#38bdf8" },
            { n: "100% Custom", l: "Made for Your Brand", icon: Palette, color: "#a855f7" },
            { n: "HD & 4K", l: "Instagram & Reels Ready", icon: Smartphone, color: "#e879f9" },
            { n: "No Contracts", l: "Cancel Anytime", icon: ShieldCheck, color: "#4ade80" },
          ].map(({ n, l, icon: Icon, color }, i) => (
            <div
              key={l}
              className="glass"
              style={{
                padding: "20px 32px", textAlign: "center", minWidth: 160,
                borderRadius: i === 0 ? "16px 0 0 16px" : i === 3 ? "0 16px 16px 0" : 0,
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : undefined,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: color }}>
                <Icon size={22} />
              </div>
              <div style={{ fontSize: "1.45rem", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 4, color: "#fff" }}>
                {n}
              </div>
              <div style={{ fontSize: "0.72rem", color: "rgba(232,232,240,0.5)", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
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
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(124,58,237,0.8), transparent)" }} />
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,232,240,0.25)" }}>Scroll</span>
      </motion.div>
    </section>
  );
}
