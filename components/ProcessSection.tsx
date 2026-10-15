"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UploadCloud, Sparkles, CheckCircle2, Clock, ArrowRight } from "lucide-react";

const threeSteps = [
  {
    num: "01",
    phase: "Step 01",
    title: "Send Your Photos",
    description: "Share your product images, brand references and requirements.",
    icon: UploadCloud,
    accent: "#06B6D4",
    highlights: [
      "Upload existing phone or camera product photos",
      "Share your brand logo, guidelines and website link",
      "Specify your target customers, offers and ad goals"
    ]
  },
  {
    num: "02",
    phase: "Step 02",
    title: "We Create Your Visuals",
    description: "We develop the content included in your chosen package.",
    icon: Sparkles,
    accent: "#6366F1",
    highlights: [
      "Clean studio isolation & texture styling",
      "High-converting layout design & hook text placement",
      "Short video editing or motion animation from your assets"
    ]
  },
  {
    num: "03",
    phase: "Step 03",
    title: "Review and Receive",
    description: "Review the designs, request included revisions and receive the approved files.",
    icon: CheckCircle2,
    accent: "#10B981",
    highlights: [
      "Check product shape, colours, packaging and labels",
      "1 included revision round to fine-tune text and visual balance",
      "Receive final high-res files formatted for ads and store"
    ]
  }
];

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="process" style={{ position: "relative", zIndex: 10, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 54 }}
        >
          <div className="eyebrow" style={{ marginBottom: 18, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Simple 3-Step Process
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            How It <span className="gt">Works.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: 580, margin: "0 auto", lineHeight: 1.6 }}>
            No complicated onboarding. No endless back-and-forth. Just three straightforward steps from raw photo to final delivery.
          </p>
        </motion.div>

        {/* 3 Step Process Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 28,
            marginBottom: 44,
          }}
        >
          {threeSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 24,
                  border: "1px solid rgba(15,23,42,0.08)",
                  padding: "clamp(26px, 3.5vw, 36px)",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.03)",
                  position: "relative",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(15,23,42,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,23,42,0.03)";
                }}
              >
                {/* Step Number & Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `${step.accent}14`,
                      border: `1px solid ${step.accent}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: step.accent,
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "rgba(15,23,42,0.1)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: step.accent,
                    marginBottom: 6,
                  }}
                >
                  {step.phase}
                </div>

                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "#0F172A",
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    color: "#475569",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    marginBottom: 22,
                    minHeight: 48,
                  }}
                >
                  {step.description}
                </p>

                {/* Highlights List */}
                <div
                  style={{
                    borderTop: "1px solid rgba(15,23,42,0.06)",
                    paddingTop: 16,
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {step.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 9,
                        fontSize: "0.82rem",
                        color: "#64748B",
                        lineHeight: 1.45,
                      }}
                    >
                      <CheckCircle2 size={13} color={step.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clear Delivery Commitment Notice */}
        <div
          style={{
            background: "#F8FAFC",
            border: "1px solid rgba(15,23,42,0.1)",
            borderRadius: 20,
            padding: "20px 28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(6,182,212,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#06B6D4",
                flexShrink: 0,
              }}
            >
              <Clock size={18} />
            </div>
            <div>
              <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.92rem", marginBottom: 2 }}>
                Clear Delivery Policy
              </div>
              <div style={{ color: "#64748B", fontSize: "0.85rem" }}>
                Your delivery date is confirmed after we review your brief and receive the required assets.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => go("services")}
            className="btn-primary"
            style={{
              padding: "10px 22px",
              borderRadius: 12,
              fontSize: "0.84rem",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            View Packages <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
