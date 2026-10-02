"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "1,999",
    tagline: "Great for new stores testing social ads for the first time.",
    popular: false,
    accent: "#06B6D4",
    features: [
      "15 scroll-stopping ad creatives every single month",
      "8 educational carousels every single month",
      "Custom headlines and ad copywriting",
      "Ready for Instagram, Facebook and Pinterest",
      "48-hour delivery per batch",
      "2 revision rounds per deliverable",
      "You own 100% of all files and designs",
    ],
    cta: "Choose Starter Plan"
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: "2,999",
    tagline: "Our most popular plan for brands that want video ads to get more customers.",
    popular: true,
    accent: "#6366F1",
    features: [
      "20 scroll-stopping ad creatives every single month",
      "12 educational carousels every single month",
      "4 short video ads (Instagram Reels, TikTok, Shorts)",
      "Attention-grabbing 3-second video scripts",
      "Eye-catching 3D product effects and motion",
      "Fast 24 to 48-hour delivery",
      "Unlimited revisions",
      "Direct WhatsApp and Slack support",
    ],
    cta: "Choose Growth Plan"
  },
  {
    id: "domination",
    name: "Pro Plan",
    price: "3,999",
    tagline: "For active brands that need lots of fresh image and video ads each month.",
    popular: false,
    accent: "#4F46E5",
    features: [
      "25 scroll-stopping ad creatives every single month",
      "18 educational carousels every single month",
      "8 short video ads (Instagram Reels, TikTok, Shorts)",
      "Testing multiple headline and hook angles",
      "Premium 3D product renders and animations",
      "Priority 24-hour delivery",
      "Unlimited revisions",
      "Monthly 1-on-1 strategy and ad review call",
    ],
    cta: "Choose Pro Plan"
  }
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredPlan, setHoveredPlan] = useState<string>("growth");

  const goContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" style={{ position: "relative", zIndex: 10, padding: "140px 24px" }}>
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
            Simple Monthly Pricing
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            Clear Plans. <span className="gt">No Hidden Fees.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: 580, margin: "0 auto", lineHeight: 1.6 }}>
            Simple monthly subscriptions built for direct-to-consumer brands. No contracts. Pause or cancel anytime.
          </p>
        </motion.div>

        {/* 3-Tier Pricing Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 28,
          alignItems: "stretch",
          marginBottom: 50
        }}>
          {plans.map((p, idx) => {
            const isPop = p.popular;
            const isHov = hoveredPlan === p.id;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onMouseEnter={() => setHoveredPlan(p.id)}
                style={{
                  borderRadius: 28,
                  background: "#FFFFFF",
                  border: isPop
                    ? "2px solid #06B6D4"
                    : `1px solid ${isHov ? p.accent : "rgba(15,23,42,0.08)"}`,
                  boxShadow: isPop
                    ? "0 20px 45px rgba(6, 182, 212, 0.15), 0 4px 20px rgba(15,23,42,0.04)"
                    : (isHov ? `0 16px 40px rgba(15,23,42,0.08)` : "0 4px 20px rgba(15,23,42,0.03)"),
                  padding: "clamp(28px, 4.5vw, 44px) clamp(18px, 3.5vw, 34px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "all 0.4s ease",
                  transform: isPop ? "scale(1.02)" : (isHov ? "translateY(-6px)" : "translateY(0)"),
                }}
              >
                {/* Popular Badge */}
                {isPop && (
                  <div style={{
                    position: "absolute",
                    top: -15,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #06B6D4, #6366F1)",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "6px 18px",
                    borderRadius: 999,
                    boxShadow: "0 4px 20px rgba(6, 182, 212, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}>
                    <Sparkles size={13} /> Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <h3 style={{ color: "#0F172A", fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                      {p.name}
                    </h3>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: p.accent,
                      boxShadow: `0 0 10px ${p.accent}`
                    }} />
                  </div>

                  <p style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.5, minHeight: 44, marginBottom: 28 }}>
                    {p.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 32, borderBottom: "1px solid rgba(15,23,42,0.08)", paddingBottom: 28 }}>
                    <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "#06B6D4" }}>Rs.</span>
                    <span style={{
                      fontSize: "clamp(2.6rem, 4vw, 3.4rem)",
                      fontWeight: 900,
                      color: "#0F172A",
                      letterSpacing: "-0.03em",
                      lineHeight: 1
                    }}>
                      {p.price}
                    </span>
                    <span style={{ color: "#64748B", fontSize: "0.9rem", fontWeight: 600 }}>/ month</span>
                  </div>

                  {/* Features List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748B", marginBottom: 4 }}>
                      What You Get Every Month
                    </div>
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "rgba(6, 182, 212, 0.1)",
                          border: "1px solid rgba(6, 182, 212, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2
                        }}>
                          <Check size={11} color="#06B6D4" strokeWidth={3} />
                        </div>
                        <span style={{
                          color: "#0F172A",
                          fontSize: "0.88rem",
                          lineHeight: 1.5,
                          fontWeight: feat.includes("scroll-stopping") || feat.includes("carousels") || feat.includes("video ads") ? 700 : 400
                        }}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={goContact}
                  className={isPop ? "btn-primary" : "btn-ghost"}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: 16,
                    justifyContent: "center",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  {p.cta} <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantees */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 36,
          padding: "24px",
          borderRadius: 18,
          background: "#FFFFFF",
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 4px 16px rgba(15,23,42,0.03)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontSize: "0.88rem", fontWeight: 600 }}>
            <Shield size={16} style={{ color: "#10B981" }} />
            <span>No Long-Term Contracts</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontSize: "0.88rem", fontWeight: 600 }}>
            <Zap size={16} style={{ color: "#06B6D4" }} />
            <span>Pause or Cancel Anytime with 14-Day Notice</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontSize: "0.88rem", fontWeight: 600 }}>
            <Sparkles size={16} style={{ color: "#6366F1" }} />
            <span>You Own 100% of All Created Ads</span>
          </div>
        </div>

      </div>
    </section>
  );
}
