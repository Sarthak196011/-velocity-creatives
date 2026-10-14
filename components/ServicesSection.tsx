"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Sparkles, Zap, Shield, ArrowRight, AlertCircle } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  tagline: string;
  popular: boolean;
  accent: string;
  features: string[];
  cta: string;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "1,999",
    tagline: "5 static ad creatives. Best for a small brand trying our service.",
    popular: false,
    accent: "#06B6D4",
    features: [
      "5 scroll-stopping static ad creatives / month",
      "1 brand profile & 1 size per creative (1:1 or 9:16)",
      "High-converting visual hooks & benefit copy angles",
      "Client-provided copy, raw photos & brand assets",
      "48-hour delivery per batch",
      "1 revision round per deliverable batch",
      "100% full commercial asset ownership",
    ],
    cta: "Choose Starter Plan"
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: "3,499",
    tagline: "8 static creatives + 1 carousel of up to 5 slides for scaling brands.",
    popular: true,
    accent: "#6366F1",
    features: [
      "8 scroll-stopping static ad creatives / month",
      "1 carousel ad pack (up to 5 interactive slides)",
      "1 brand profile & 1 size per creative",
      "Attention-grabbing typography & visual hooks",
      "Client-provided copy, raw photos & assets",
      "Fast 48-hour delivery per batch",
      "1 revision round per deliverable batch",
      "Direct WhatsApp coordination support",
    ],
    cta: "Choose Growth Plan"
  },
  {
    id: "video",
    name: "Video Plan",
    price: "5,999",
    tagline: "8 static creatives + 2 simple reels (up to 30s) edited from your footage.",
    popular: false,
    accent: "#4F46E5",
    features: [
      "8 scroll-stopping static ad creatives / month",
      "2 simple reels / shorts (up to 30s, client footage)",
      "Scroll-stopping hook text overlays & music sync",
      "1 brand profile & 1 size per creative",
      "Instagram Reels, TikTok & Meta ready",
      "Priority 48-hour delivery turnaround",
      "1 revision round per deliverable batch",
      "Dedicated WhatsApp priority channel",
    ],
    cta: "Choose Video Plan"
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
          style={{ textAlign: "center", marginBottom: 54 }}
        >
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Mumbai Launch Packages
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            Ad Creatives from <span className="gt">₹1,999/month.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            Affordable, reliable launch packages built specifically for direct-to-consumer brands. Test our service with our ₹999 trial pack or choose a monthly plan.
          </p>
        </motion.div>

        {/* Easy First Purchase / Trial Pack Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)",
            border: "2px solid #06B6D4",
            borderRadius: 24,
            padding: "clamp(24px, 4vw, 36px)",
            marginBottom: 44,
            boxShadow: "0 12px 35px rgba(6, 182, 212, 0.12)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 28,
            alignItems: "center"
          }}>
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "#06B6D4",
                color: "#FFFFFF",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: 999,
                marginBottom: 14
              }}>
                <Sparkles size={13} /> Easy First Purchase • No Monthly Commitment
              </div>

              <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 1.85rem)", fontWeight: 900, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.01em" }}>
                ₹999 Starter Trial Pack
              </h3>

              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 16 }}>
                Test our speed and creative quality on your brand with <strong>2 custom static ad creatives</strong>. Zero subscription, zero monthly lock-in. Delivered in 48 hours.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: "0.82rem", fontWeight: 700, color: "#0F172A" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.1)", padding: "5px 12px", borderRadius: 999 }}>
                  <Check size={14} color="#06B6D4" strokeWidth={3} /> 2 Custom Creatives
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.1)", padding: "5px 12px", borderRadius: 999 }}>
                  <Check size={14} color="#06B6D4" strokeWidth={3} /> 1 Format Size (1:1 or 9:16)
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.1)", padding: "5px 12px", borderRadius: 999 }}>
                  <Check size={14} color="#06B6D4" strokeWidth={3} /> 48-Hour Delivery
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.1)", padding: "5px 12px", borderRadius: 999 }}>
                  <Check size={14} color="#06B6D4" strokeWidth={3} /> 1 Revision Round
                </span>
              </div>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFFFFF",
              border: "1px solid rgba(15,23,42,0.08)",
              borderRadius: 20,
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(15,23,42,0.04)"
            }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748B", marginBottom: 4 }}>
                One-Time Launch Price
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 900, color: "#06B6D4" }}>₹</span>
                <span style={{ fontSize: "clamp(2.8rem, 5vw, 3.6rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1, letterSpacing: "-0.03em" }}>
                  999
                </span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600, marginBottom: 18 }}>
                One-time payment • Applicable taxes extra
              </div>
              <button
                type="button"
                onClick={goContact}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  borderRadius: 14,
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(6, 182, 212, 0.35)"
                }}
              >
                Claim ₹999 Trial Pack <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3-Tier Monthly Pricing Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: 28,
          alignItems: "stretch",
          marginBottom: 44
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
                    ? "2px solid #6366F1"
                    : `1px solid ${isHov ? p.accent : "rgba(15,23,42,0.08)"}`,
                  boxShadow: isPop
                    ? "0 20px 45px rgba(99, 102, 241, 0.16), 0 4px 20px rgba(15,23,42,0.04)"
                    : (isHov ? "0 16px 40px rgba(15,23,42,0.08)" : "0 4px 20px rgba(15,23,42,0.03)"),
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
                    background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "6px 18px",
                    borderRadius: 999,
                    boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}>
                    <Sparkles size={13} /> Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Name & Accent Indicator */}
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

                  <p style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.5, minHeight: 44, marginBottom: 24 }}>
                    {p.tagline}
                  </p>

                  {/* Price Tag */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 28, borderBottom: "1px solid rgba(15,23,42,0.08)", paddingBottom: 24 }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 900, color: p.accent }}>₹</span>
                    <span style={{
                      fontSize: "clamp(2.5rem, 4vw, 3.3rem)",
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 36 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748B", marginBottom: 4 }}>
                      What You Get Every Month
                    </div>
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                        <div style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: `${p.accent}15`,
                          border: `1px solid ${p.accent}55`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2
                        }}>
                          <Check size={11} color={p.accent} strokeWidth={3} />
                        </div>
                        <span style={{
                          color: "#0F172A",
                          fontSize: "0.86rem",
                          lineHeight: 1.5,
                          fontWeight: feat.includes("static ad") || feat.includes("carousel") || feat.includes("simple reels") ? 700 : 400
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

        {/* Clear Scope & Terms Card */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid rgba(15,23,42,0.1)",
          borderRadius: 24,
          padding: "clamp(24px, 4vw, 36px)",
          marginBottom: 36,
          boxShadow: "0 4px 20px rgba(15,23,42,0.03)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <AlertCircle size={20} color="#6366F1" />
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
              Clear Scope &amp; Deliverable Guidelines
            </h4>
          </div>
          <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 20 }}>
            To keep delivery fast (48h) and prices affordable for growing direct-to-consumer brands, all packages operate under these transparent guidelines:
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 16
          }}>
            <div style={{ background: "#F8F9FA", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,0.06)" }}>
              <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>
                ✓ Included in Scope
              </div>
              <ul style={{ color: "#475569", fontSize: "0.82rem", lineHeight: 1.6, paddingLeft: 18 }}>
                <li>1 brand profile per active subscription</li>
                <li>1 format size per creative (1:1 feed or 9:16 story)</li>
                <li>Design, graphic layout, hook overlays &amp; video editing</li>
                <li>1 comprehensive revision round per deliverable batch</li>
              </ul>
            </div>

            <div style={{ background: "#F8F9FA", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,0.06)" }}>
              <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.85rem", marginBottom: 4 }}>
                ✕ Excluded from Scope
              </div>
              <ul style={{ color: "#475569", fontSize: "0.82rem", lineHeight: 1.6, paddingLeft: 18 }}>
                <li>On-location camera shooting &amp; raw video production</li>
                <li>Ad account posting, ad spend &amp; media buying management</li>
                <li>Complex 3D simulations or multi-size resizing per asset</li>
                <li>Applicable GST / government taxes stated separately</li>
              </ul>
            </div>
          </div>
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
            <span>No Long-Term Contracts • Cancel Anytime</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontSize: "0.88rem", fontWeight: 600 }}>
            <Zap size={16} style={{ color: "#06B6D4" }} />
            <span>Fast 48-Hour Delivery Per Batch</span>
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
