"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Check, Sparkles, Zap, Shield, ArrowRight, AlertCircle, 
  Camera, LayoutGrid, Layers, Film, Clock, HelpCircle
} from "lucide-react";

// Four Specific Core Services
const coreServices = [
  {
    id: "product-images",
    title: "Product Images",
    icon: Camera,
    accent: "#06B6D4",
    tagline: "Professional product visuals for your website and online store.",
    details: [
      "Clean studio environments & realistic natural textures",
      "True-to-product shape, packaging labels and exact colors",
      "High-resolution files ready for Shopify, Amazon & website hero banners"
    ]
  },
  {
    id: "ad-creatives",
    title: "Ad Creatives",
    icon: LayoutGrid,
    accent: "#6366F1",
    tagline: "Product-focused designs for your advertising campaigns.",
    details: [
      "Scroll-stopping visual hooks engineered for Meta, Instagram & TikTok",
      "Benefit-led text overlays, comparison angles & social proof layouts",
      "Formatted in standard 1:1 square feeds or 9:16 vertical stories"
    ]
  },
  {
    id: "carousels",
    title: "Carousels",
    icon: Layers,
    accent: "#0EA5E9",
    tagline: "Swipe-through posts that explain your product and its benefits.",
    details: [
      "Multi-slide visual storytelling (3 to 5 seamless slides)",
      "Educational breakdowns: ingredients, how-to-use, and before/after proofs",
      "Designed to maximize user swipe time and engagement signals"
    ]
  },
  {
    id: "short-videos",
    title: "Short Videos",
    icon: Film,
    accent: "#4F46E5",
    tagline: "Product videos for reels, stories and ads.",
    details: [
      "Up to 30-second vertical reels (9:16) with hook text & music sync",
      "Customer Input: You can supply raw video clips for commercial editing, OR we can create motion reels from your high-res photos",
      "Optimized for Instagram Reels, TikTok and Meta Video Ads"
    ]
  }
];

interface Plan {
  id: string;
  name: string;
  price: string;
  tagline: string;
  popular: boolean;
  accent: string;
  deliverablesSummary: string;
  specs: {
    finalUnits: string;
    productsCovered: string;
    videoDurationAndInput: string;
    sizesIncluded: string;
    revisionRounds: string;
    websitePhotosAndCopy: string;
    deliveryDate: string;
  };
  cta: string;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "1,999",
    tagline: "5 final static ad images. Best for a small brand trying our service.",
    popular: false,
    accent: "#06B6D4",
    deliverablesSummary: "5 Final Static Ad Images / Month",
    specs: {
      finalUnits: "5 static ad images (polished product-focused ad creatives)",
      productsCovered: "1 product (or 1 brand profile)",
      videoDurationAndInput: "Video not included in Starter (see Video Plan)",
      sizesIncluded: "1 format size per image (1:1 feed square or 9:16 vertical)",
      revisionRounds: "1 revision round per deliverable batch",
      websitePhotosAndCopy: "Client provides product details, offers & approved text; layout & visual design included (copywriting not included)",
      deliveryDate: "Confirmed after we review your brief and receive required assets"
    },
    cta: "Choose Starter Plan"
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: "3,499",
    tagline: "8 static images + 1 carousel of up to 5 slides for scaling brands.",
    popular: true,
    accent: "#6366F1",
    deliverablesSummary: "8 Static Images + 1 Carousel (Up to 5 Slides)",
    specs: {
      finalUnits: "8 static ad images + 1 multi-slide carousel (up to 5 slides)",
      productsCovered: "Up to 2 products",
      videoDurationAndInput: "Video not included (see Video Plan)",
      sizesIncluded: "1 format size per visual (1:1 feed or 9:16 story)",
      revisionRounds: "1 revision round per deliverable batch",
      websitePhotosAndCopy: "Client provides product details & approved text; design, visual hooks & carousel sequence included",
      deliveryDate: "Confirmed after we review your brief and receive required assets"
    },
    cta: "Choose Growth Plan"
  },
  {
    id: "video",
    name: "Video Plan",
    price: "5,999",
    tagline: "8 static images + 2 simple reels (up to 30s) edited from your footage or photos.",
    popular: false,
    accent: "#4F46E5",
    deliverablesSummary: "8 Static Images + 2 Simple Reels (Up to 30s)",
    specs: {
      finalUnits: "8 static ad images + 2 simple reels / shorts",
      productsCovered: "Up to 2 products",
      videoDurationAndInput: "Up to 30 seconds each; edited from client footage OR animated from high-res photos (hook overlays & music sync included)",
      sizesIncluded: "9:16 vertical for reels, 1:1 or 9:16 for static images",
      revisionRounds: "1 revision round per deliverable batch",
      websitePhotosAndCopy: "Client provides raw footage/photos & approved text; visual design, video editing & text hooks included",
      deliveryDate: "Confirmed after we review your brief and receive required assets"
    },
    cta: "Choose Video Plan"
  }
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredPlan, setHoveredPlan] = useState<string>("growth");

  const goContact = (preference?: string) => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
      if (preference && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("select-package-preference", { detail: preference }));
      }
    }
  };

  return (
    <section id="services" style={{ position: "relative", zIndex: 10, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Section Header: Specific Services */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 54 }}
        >
          <div className="eyebrow" style={{ marginBottom: 18, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            What We Create
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            Specific Visuals. <span className="gt">Tailored for E-Commerce.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
            Send us your existing product photos. Here are the four distinct types of content we craft for your brand:
          </p>
        </motion.div>

        {/* 4 Specific Core Service Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 22,
            marginBottom: 72,
          }}
        >
          {coreServices.map((service, sIdx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,23,42,0.08)",
                  borderRadius: 22,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.03)",
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
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: `${service.accent}14`,
                    border: `1px solid ${service.accent}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: service.accent,
                    marginBottom: 16,
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3 style={{ fontSize: "1.22rem", fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
                  {service.title}
                </h3>

                <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.5, marginBottom: 18, minHeight: 44 }}>
                  {service.tagline}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: "auto", borderTop: "1px solid rgba(15,23,42,0.06)", paddingTop: 14 }}>
                  {service.details.map((d, dIdx) => (
                    <div key={dIdx} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.82rem", color: "#64748B", lineHeight: 1.45 }}>
                      <Check size={13} color={service.accent} strokeWidth={3} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Unified Delivery Policy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: "#F8FAFC",
            border: "1px solid rgba(15,23,42,0.1)",
            borderRadius: 18,
            padding: "16px 24px",
            marginBottom: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          <Clock size={18} color="#06B6D4" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "0.92rem", color: "#0F172A", fontWeight: 700 }}>
            Delivery Policy:{" "}
            <span style={{ color: "#475569", fontWeight: 500 }}>
              Your delivery date is confirmed after we review your brief and receive the required assets.
            </span>
          </span>
        </motion.div>

        {/* Easy First Purchase / ₹999 Trial Pack Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)",
            border: "2px solid #06B6D4",
            borderRadius: 24,
            padding: "clamp(24px, 4vw, 36px)",
            marginBottom: 48,
            boxShadow: "0 12px 35px rgba(6, 182, 212, 0.12)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: 28,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
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
                  marginBottom: 12,
                }}
              >
                <Sparkles size={13} /> Easy First Purchase • Zero Monthly Commitment
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 1.85rem)",
                  fontWeight: 900,
                  color: "#0F172A",
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                ₹999 Starter Trial Pack
              </h3>

              <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 18 }}>
                Test our quality and transformation process on your actual product with <strong>2 custom static ad images</strong>. No subscription lock-in.
              </p>

              {/* Exact Trial Pack Specs Breakdown */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 10,
                  fontSize: "0.82rem",
                  color: "#0F172A",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(15,23,42,0.08)",
                  borderRadius: 14,
                  padding: "14px 16px",
                }}
              >
                <div>
                  <span style={{ color: "#64748B", fontWeight: 700, display: "block", fontSize: "0.72rem", textTransform: "uppercase" }}>Deliverables</span>
                  <strong>2 final static ad images</strong>
                </div>
                <div>
                  <span style={{ color: "#64748B", fontWeight: 700, display: "block", fontSize: "0.72rem", textTransform: "uppercase" }}>Products Covered</span>
                  <strong>1 product</strong>
                </div>
                <div>
                  <span style={{ color: "#64748B", fontWeight: 700, display: "block", fontSize: "0.72rem", textTransform: "uppercase" }}>Size &amp; Format</span>
                  <strong>1 format size (1:1 or 9:16)</strong>
                </div>
                <div>
                  <span style={{ color: "#64748B", fontWeight: 700, display: "block", fontSize: "0.72rem", textTransform: "uppercase" }}>Revisions Included</span>
                  <strong>1 revision round</strong>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                border: "1px solid rgba(15,23,42,0.08)",
                borderRadius: 20,
                padding: "28px 24px",
                textAlign: "center",
                boxShadow: "0 6px 20px rgba(15,23,42,0.04)",
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#64748B", marginBottom: 4 }}>
                One-Time Trial Price
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
                onClick={() => goContact("Trial Pack — ₹999")}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  borderRadius: 14,
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(6, 182, 212, 0.35)",
                }}
              >
                Request the ₹999 Trial <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Monthly Packages Subheader */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "#0F172A", marginBottom: 8 }}>
            Monthly Creative Packages
          </h3>
          <p style={{ color: "#64748B", fontSize: "0.98rem" }}>
            Clear deliverables. No ambiguous &quot;creative credits&quot; — know exactly what you receive every month.
          </p>
        </div>

        {/* 3-Tier Monthly Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 28,
            alignItems: "stretch",
            marginBottom: 44,
          }}
        >
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
                    : isHov
                    ? "0 16px 40px rgba(15,23,42,0.08)"
                    : "0 4px 20px rgba(15,23,42,0.03)",
                  padding: "clamp(26px, 4vw, 38px) clamp(18px, 3vw, 30px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "all 0.35s ease",
                  transform: isPop ? "scale(1.02)" : isHov ? "translateY(-6px)" : "translateY(0)",
                }}
              >
                {/* Popular Badge */}
                {isPop && (
                  <div
                    style={{
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
                      gap: 6,
                    }}
                  >
                    <Sparkles size={13} /> Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <h4 style={{ color: "#0F172A", fontSize: "1.45rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                      {p.name}
                    </h4>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: p.accent,
                        boxShadow: `0 0 10px ${p.accent}`,
                      }}
                    />
                  </div>

                  <p style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.5, minHeight: 44, marginBottom: 20 }}>
                    {p.tagline}
                  </p>

                  {/* Price Tag */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 6,
                      marginBottom: 24,
                      borderBottom: "1px solid rgba(15,23,42,0.08)",
                      paddingBottom: 20,
                    }}
                  >
                    <span style={{ fontSize: "1.75rem", fontWeight: 900, color: p.accent }}>₹</span>
                    <span
                      style={{
                        fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                        fontWeight: 900,
                        color: "#0F172A",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {p.price}
                    </span>
                    <span style={{ color: "#64748B", fontSize: "0.9rem", fontWeight: 600 }}>/ month</span>
                  </div>

                  {/* Clarified Concrete Specifications */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 30 }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B" }}>
                      Specific Package Deliverables
                    </div>

                    <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(15,23,42,0.06)" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, display: "block", textTransform: "uppercase" }}>Final Units</span>
                      <span style={{ fontSize: "0.85rem", color: "#0F172A", fontWeight: 700 }}>{p.specs.finalUnits}</span>
                    </div>

                    <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(15,23,42,0.06)" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, display: "block", textTransform: "uppercase" }}>Products Covered</span>
                      <span style={{ fontSize: "0.85rem", color: "#0F172A" }}>{p.specs.productsCovered}</span>
                    </div>

                    <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(15,23,42,0.06)" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, display: "block", textTransform: "uppercase" }}>Video Scope</span>
                      <span style={{ fontSize: "0.85rem", color: "#0F172A" }}>{p.specs.videoDurationAndInput}</span>
                    </div>

                    <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(15,23,42,0.06)" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, display: "block", textTransform: "uppercase" }}>Sizes &amp; Revisions</span>
                      <span style={{ fontSize: "0.85rem", color: "#0F172A" }}>{p.specs.sizesIncluded} • {p.specs.revisionRounds}</span>
                    </div>

                    <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(15,23,42,0.06)" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, display: "block", textTransform: "uppercase" }}>Copywriting &amp; Assets</span>
                      <span style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.4 }}>{p.specs.websitePhotosAndCopy}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => goContact(p.name)}
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

        {/* Clear Scope & Guidelines Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(15,23,42,0.1)",
            borderRadius: 24,
            padding: "clamp(24px, 4vw, 36px)",
            marginBottom: 36,
            boxShadow: "0 4px 20px rgba(15,23,42,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <AlertCircle size={20} color="#6366F1" />
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>
              Clear Scope &amp; Deliverable Guidelines
            </h4>
          </div>
          <p style={{ color: "#64748B", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 20 }}>
            To keep pricing affordable and turnaround predictable, every package operates under these transparent guidelines:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            <div style={{ background: "#F8F9FA", padding: "16px 18px", borderRadius: 14, border: "1px solid rgba(15,23,42,0.06)" }}>
              <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.85rem", marginBottom: 6 }}>
                ✓ Included in Scope
              </div>
              <ul style={{ color: "#475569", fontSize: "0.82rem", lineHeight: 1.65, paddingLeft: 18 }}>
                <li>Product visual transformation from your existing photos</li>
                <li>Specified final unit count of static images, carousels or reels</li>
                <li>1 format size per creative (1:1 feed or 9:16 vertical)</li>
                <li>1 comprehensive revision round per deliverable batch</li>
                <li>100% full commercial asset ownership</li>
              </ul>
            </div>

            <div style={{ background: "#F8F9FA", padding: "16px 18px", borderRadius: 14, border: "1px solid rgba(15,23,42,0.06)" }}>
              <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.85rem", marginBottom: 6 }}>
                ✕ Excluded from Scope
              </div>
              <ul style={{ color: "#475569", fontSize: "0.82rem", lineHeight: 1.65, paddingLeft: 18 }}>
                <li>On-location camera shooting &amp; physical product handling</li>
                <li>Media buying management, ad spend &amp; ad account posting</li>
                <li>Full end-to-end sales copywriting without client product inputs</li>
                <li>Applicable GST / government taxes stated separately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 36,
            padding: "24px",
            borderRadius: 18,
            background: "#FFFFFF",
            border: "1px solid rgba(15,23,42,0.08)",
            boxShadow: "0 4px 16px rgba(15,23,42,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontSize: "0.88rem", fontWeight: 600 }}>
            <Shield size={16} style={{ color: "#10B981" }} />
            <span>No Long-Term Contracts • Cancel Anytime</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontSize: "0.88rem", fontWeight: 600 }}>
            <Clock size={16} style={{ color: "#06B6D4" }} />
            <span>Delivery Date Confirmed Upon Brief &amp; Assets Receipt</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0F172A", fontSize: "0.88rem", fontWeight: 600 }}>
            <Sparkles size={16} style={{ color: "#6366F1" }} />
            <span>You Own 100% of All Created Visuals</span>
          </div>
        </div>

      </div>
    </section>
  );
}
