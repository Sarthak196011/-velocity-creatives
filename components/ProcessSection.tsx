"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MessageSquare, FileText, Layers, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    phase: "Step 01",
    duration: "Days 1 to 3",
    title: "Tell Us About Your Brand",
    tagline: "We learn about your products and target customers.",
    description: "Send us your product photos, website link, and what you want to achieve. We look at your competitors and plan the best angles to attract buyers.",
    icon: MessageSquare,
    accent: "#6366F1",
    deliverables: [
      "Target Customer Review",
      "Competitor Ad Review",
      "Ad Ideas Plan"
    ]
  },
  {
    num: "02",
    phase: "Step 02",
    duration: "Days 4 to 7",
    title: "We Write the Ad Scripts & Copy",
    tagline: "Catchy headlines and clear benefits that get clicks.",
    description: "We write simple, persuasive headlines and short video scripts. Every script is crafted to grab attention in the first 3 seconds.",
    icon: FileText,
    accent: "#06B6D4",
    deliverables: [
      "Scroll-Stopping Headlines",
      "Short Video Scripts",
      "Carousel Slide Layouts"
    ]
  },
  {
    num: "03",
    phase: "Step 03",
    duration: "Days 8 to 12",
    title: "We Design Your Images & Videos",
    tagline: "High-quality graphics, 3D renders, and video edits.",
    description: "Our team designs high-resolution image ads, carousels, and edited short videos ready to post on Instagram, Facebook, and Reels.",
    icon: Layers,
    accent: "#4F46E5",
    deliverables: [
      "HD Image Ads (Feeds & Stories)",
      "Short Video Cuts for Reels",
      "Ready-to-Post Files"
    ]
  },
  {
    num: "04",
    phase: "Step 04",
    duration: "Ongoing",
    title: "Review, Launch & Keep Growing",
    tagline: "Review your ads, launch campaigns, and request updates.",
    description: "You receive your complete ad batch. If you need any tweaks, we make revisions quickly. Then launch them and watch your store grow.",
    icon: CheckCircle,
    accent: "#10B981",
    deliverables: [
      "Quick 24-48h Revisions",
      "Monthly Creative Batches",
      "Direct Support Channel"
    ]
  }
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" style={{ position: "relative", zIndex: 10, padding: "140px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            How It Works
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            A Simple <span className="gt">4-Step Process.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: 580, margin: "0 auto", lineHeight: 1.6 }}>
            No complicated onboarding. No endless meetings. Just a straightforward system to get fresh ads every month.
          </p>
        </motion.div>

        {/* Process Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isHovered = activeStep === idx;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                onMouseEnter={() => setActiveStep(idx)}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 24,
                  border: `1px solid ${isHovered ? s.accent : "rgba(15,23,42,0.08)"}`,
                  padding: "36px 30px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: isHovered ? `0 20px 45px rgba(99,102,241,0.12)` : "0 4px 20px rgba(15,23,42,0.04)",
                }}
              >
                {/* Header Row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${s.accent}15`,
                    border: `1px solid ${s.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: s.accent,
                  }}>
                    <Icon size={22} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: s.accent,
                      background: `${s.accent}12`,
                      border: `1px solid ${s.accent}25`,
                      padding: "4px 10px",
                      borderRadius: 999
                    }}>
                      {s.duration}
                    </span>
                    <span style={{ fontSize: "1.8rem", fontWeight: 900, color: "rgba(15,23,42,0.1)", letterSpacing: "-0.04em" }}>
                      {s.num}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: s.accent, marginBottom: 8 }}>
                  {s.phase}
                </div>

                <h3 style={{ color: "#0F172A", fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.3, marginBottom: 12 }}>
                  {s.title}
                </h3>

                <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: 24, flexGrow: 1 }}>
                  {s.description}
                </p>

                {/* Deliverables checklist */}
                <div style={{ borderTop: "1px solid rgba(15,23,42,0.08)", paddingTop: 18 }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B", marginBottom: 10 }}>
                    What We Deliver:
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.deliverables.map((item, dIdx) => (
                      <div key={dIdx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircle size={13} style={{ color: s.accent, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.82rem", color: "#0F172A", fontWeight: 500 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Speed Guarantee Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            maxWidth: 920,
            margin: "0 auto",
            borderRadius: 20,
            background: "linear-gradient(90deg, rgba(6,182,212,0.08) 0%, rgba(99,102,241,0.08) 100%)",
            border: "1px solid rgba(6,182,212,0.25)",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }} />
            <span style={{ color: "#0F172A", fontSize: "0.95rem", fontWeight: 700 }}>
              Delivery Promise: Your first complete batch of ads arrives in 7 business days or less.
            </span>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "none",
              border: "none",
              color: "#06B6D4",
              fontWeight: 700,
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer"
            }}
          >
            Get Started <ArrowRight size={15} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
