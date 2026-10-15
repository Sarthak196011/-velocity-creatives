"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Play, X, Sparkles, Check, Eye } from "lucide-react";

interface ProductComparison {
  id: string;
  name: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

const comparisons: ProductComparison[] = [
  {
    id: "cookies",
    name: "Mo's Bakery Ragi Cookies",
    category: "Food & Snacks",
    beforeImg: "/before-after/raw-mos-cookies.png",
    afterImg: "/sample-work/mos-ragi-cookies.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    description: "Raw canister photo transformed into an inviting breakfast table scene with 100% real packaging, logo & label text preserved."
  },
  {
    id: "apparel",
    name: "BULLMER Bamboo Shirt",
    category: "Apparel",
    beforeImg: "/before-after/raw-bullmer-shirt.png",
    afterImg: "/sample-work/bullmer-bamboo-shirt.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    description: "Flat clothing photo transformed into an editorial summer resort visual on stone pedestal with real print & inner label intact."
  },
  {
    id: "leather",
    name: "NOMAD Leather Carry",
    category: "Leather",
    beforeImg: "/before-after/raw-leather-wallet.png",
    afterImg: "/sample-work/luxury-leather-wallet.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    description: "Casual product photo transformed into rich mahogany desk setup ad visual with real leather stitching & grain."
  },
  {
    id: "gadgets",
    name: "Apple Watch Ultra",
    category: "Gadgets",
    beforeImg: "/before-after/raw-apple-watch.png",
    afterImg: "/sample-work/apple-watch-ocean.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    description: "Simple watch photo staged amidst crashing ocean rocks with real Wayfinder watch face & titanium casing."
  }
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [activeComp, setActiveComp] = useState<ProductComparison>(comparisons[0]);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "115px 24px 60px"
      }}
    >
      {/* Background Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "5%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%)",
          filter: "blur(40px)",
          zIndex: 1,
          animation: "glow-pulse 4s ease infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "0%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)",
          filter: "blur(40px)",
          zIndex: 1,
          animation: "glow-pulse 5s 1s ease infinite",
        }}
      />

      <motion.div
        style={{
          y,
          opacity,
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Status Badge */}
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px 6px 12px",
              background: "#FFFFFF",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(15,23,42,0.08)",
              borderRadius: 999,
              boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  color: "#059669",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Now Accepting Brands
              </span>
            </span>
            <span style={{ width: 1, height: 14, background: "rgba(15,23,42,0.12)" }} />
            <span style={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 600 }}>
              Packages from ₹1,999/mo • Expected in 2–4 Days
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Left Headline & Copy / Right Before-and-After Card */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "center",
            marginBottom: 48,
          }}
        >
          {/* Left Column: Headlines, Subheading & Buttons */}
          <div style={{ textAlign: "left" }}>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: "clamp(2rem, 3.2vw, 3.1rem)",
                fontWeight: 900,
                lineHeight: 1.16,
                letterSpacing: "-0.03em",
                color: "#0F172A",
                marginBottom: 16,
                maxWidth: 580,
              }}
            >
              Turn Ordinary Product Photos Into{" "}
              <span className="gt">Professional Brand Visuals.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                fontSize: "clamp(0.96rem, 1.25vw, 1.08rem)",
                color: "#475569",
                lineHeight: 1.6,
                marginBottom: 24,
                maxWidth: 540,
              }}
            >
              Send us your existing product photos. We transform them into polished images, ad
              creatives and carousels for your website and social media.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <button
                type="button"
                onClick={() => go("work")}
                className="btn-primary"
                style={{
                  padding: "14px 28px",
                  borderRadius: 14,
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                See Before &amp; After <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => go("services")}
                className="btn-ghost"
                style={{
                  padding: "14px 24px",
                  borderRadius: 14,
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                View Packages
              </button>

              {/* Optional Watch Our Work Video Trigger */}
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#0F172A",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: "10px 14px",
                  borderRadius: 12,
                  transition: "color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(6,182,212,0.12)",
                    border: "1px solid rgba(6,182,212,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#06B6D4",
                  }}
                >
                  <Play size={13} fill="#06B6D4" style={{ marginLeft: 2 }} />
                </div>
                <span>Watch Our Work</span>
              </button>
            </motion.div>

            {/* Quick Scope Trust Points */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                fontSize: "0.82rem",
                color: "#64748B",
                fontWeight: 600,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Check size={14} color="#10B981" strokeWidth={3} /> Same real product shape &amp; labels
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Check size={14} color="#10B981" strokeWidth={3} /> Expected in 2–4 business days (date confirmed on review)
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Check size={14} color="#10B981" strokeWidth={3} /> ₹999 trial with no lock-in
              </span>
            </div>
          </div>

          {/* Right Column: Before-and-After Example Beside Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: "#FFFFFF",
              borderRadius: 28,
              border: "1px solid rgba(15,23,42,0.1)",
              boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
              padding: "clamp(20px, 3vw, 28px)",
              position: "relative",
            }}
          >
            {/* Header info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#06B6D4",
                    marginBottom: 2,
                  }}
                >
                  Real Transformation
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A" }}>
                  {activeComp.name}
                </div>
              </div>

              {/* Product selector buttons */}
              <div style={{ display: "flex", gap: 6, background: "#F1F5F9", padding: 4, borderRadius: 12, overflowX: "auto" }}>
                {comparisons.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveComp(c)}
                    style={{
                      background: activeComp.id === c.id ? "#FFFFFF" : "transparent",
                      border: "none",
                      borderRadius: 8,
                      padding: "5px 10px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: activeComp.id === c.id ? "#0F172A" : "#64748B",
                      cursor: "pointer",
                      boxShadow: activeComp.id === c.id ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {c.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Side-by-Side Comparison Container */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                borderRadius: 20,
                overflow: "hidden",
                background: "#0F172A",
                padding: 10,
                position: "relative",
              }}
            >
              {/* Left: Photo you send */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 14,
                  overflow: "hidden",
                  aspectRatio: "1 / 1",
                  background: "#F8FAFC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={activeComp.beforeImg}
                  alt={activeComp.beforeLabel}
                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: 10, display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "rgba(15,23,42,0.85)",
                    backdropFilter: "blur(8px)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 8,
                    letterSpacing: "0.02em",
                  }}
                >
                  {activeComp.beforeLabel}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    right: 8,
                    background: "rgba(15,23,42,0.75)",
                    backdropFilter: "blur(4px)",
                    color: "#F1F5F9",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: 6,
                    textAlign: "center",
                  }}
                >
                  Raw customer photo
                </div>
              </div>

              {/* Right: Visual we create */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 14,
                  overflow: "hidden",
                  aspectRatio: "1 / 1",
                  background: "#1E293B",
                  border: "2px solid #06B6D4",
                }}
              >
                <img
                  src={activeComp.afterImg}
                  alt={activeComp.afterLabel}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "linear-gradient(135deg, #06B6D4, #6366F1)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 8,
                    letterSpacing: "0.02em",
                    boxShadow: "0 2px 10px rgba(6,182,212,0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Sparkles size={11} /> {activeComp.afterLabel}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    right: 8,
                    background: "rgba(6,182,212,0.9)",
                    color: "#FFFFFF",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: 6,
                    textAlign: "center",
                  }}
                >
                  Polished brand ad visual
                </div>
              </div>
            </div>

            {/* Same product explanation */}
            <div
              style={{
                marginTop: 14,
                padding: "10px 14px",
                background: "#F8F9FA",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.4 }}>
                <strong>Same product in both images:</strong> {activeComp.description}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "#6366F1",
                  background: "rgba(99,102,241,0.08)",
                  padding: "4px 8px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                }}
              >
                Concept Work
              </span>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars Grid (Updated for Clear Policies) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-pillars-grid"
        >
          {[
            {
              n: "Confirmed Date",
              l: "Set After Brief Review",
              color: "#06B6D4",
            },
            {
              n: "True-to-Product",
              l: "Shape & Labels Preserved",
              color: "#6366F1",
            },
            {
              n: "4 Clear Services",
              l: "Images, Ads, Carousels & Video",
              color: "#0EA5E9",
            },
            {
              n: "No Lock-In",
              l: "₹999 Trial Or Cancel Anytime",
              color: "#10B981",
            },
          ].map(({ n, l, color }) => (
            <div key={l} className="hero-pillar-item">
              <div
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: 4,
                  color: "#0F172A",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#64748B",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Optional "Watch Our Work" Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(3, 2, 6, 0.92)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                position: "relative",
                maxWidth: 900,
                width: "100%",
                background: "#000",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 20,
                  right: 20,
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    background: "rgba(0,0,0,0.6)",
                    padding: "6px 14px",
                    borderRadius: 999,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Velocity Creatives • Showreel
                </span>
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player */}
              <video
                src="/velocity-intro.mp4"
                poster="/velocity-intro-poster.png"
                controls
                autoPlay
                playsInline
                style={{ width: "100%", maxHeight: "75vh", display: "block" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
