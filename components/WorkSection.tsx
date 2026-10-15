"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowLeft, X, Play, Sparkles, Layers, Camera, LayoutGrid, Film } from "lucide-react";

interface BeforeAfterItem {
  id: string;
  title: string;
  brand: string;
  category: "Product Images" | "Ads" | "Carousels" | "Videos";
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  summary: string;
  details: string;
}

const beforeAfterList: BeforeAfterItem[] = [
  {
    id: "ba-1",
    title: "Mo's Bakery Ragi Cookies",
    brand: "Mo's Bakery",
    category: "Product Images",
    beforeImg: "/before-after/raw-mos-cookies.png",
    afterImg: "/sample-work/mos-ragi-cookies.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From plain retail canister snap to warm morning breakfast table scene.",
    details: "Preserves 100% of the real jar packaging, lid, brand typography, milling artwork, veg certification, and legal label details while composing an appetizing bakery scene with raw ragi seeds and whole almonds."
  },
  {
    id: "ba-2",
    title: "BULLMER Bamboo Summer Shirt",
    brand: "BULLMER",
    category: "Product Images",
    beforeImg: "/before-after/raw-bullmer-shirt.png",
    afterImg: "/sample-work/bullmer-bamboo-shirt.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From flat studio photo to Mediterranean villa stone pedestal editorial.",
    details: "We extracted the shirt shape, preserved the geometric leaf pattern, placket, buttons, and inner neck label, setting it against natural travertine stone with sun-cast palm leaves."
  },
  {
    id: "ba-3",
    title: "NOMAD Leather Carry & Apple Watch",
    brand: "NOMAD Goods",
    category: "Product Images",
    beforeImg: "/before-after/raw-leather-wallet.png",
    afterImg: "/sample-work/luxury-leather-wallet.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From casual phone camera photo to rich mahogany executive desk setup.",
    details: "We extracted the handcrafted leather wallet, maintaining real leather stitching, grain, and pocket cuts, composing a timeless executive desk scene with warm reading lamp glow."
  },
  {
    id: "ba-4",
    title: "Apple Watch Ultra - Ocean Wave Crash",
    brand: "Smart Wearable",
    category: "Ads",
    beforeImg: "/before-after/raw-apple-watch.png",
    afterImg: "/sample-work/apple-watch-ocean.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From plain product photo to turbulent crashing ocean rock visual.",
    details: "Retained the exact Wayfinder dial typography, titanium casing, and orange alpine loop while staging it amidst turbulent sea spray to visually prove extreme durability."
  },
  {
    id: "ba-5",
    title: "Right Shift Nutrient Seeds",
    brand: "Right Shift",
    category: "Carousels",
    beforeImg: "/before-after/raw-rightshift.png",
    afterImg: "/sample-work/rightshift-dryfruit.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From flat retail pouch to vibrant ingredient spread with real nuts & dry fruits.",
    details: "We isolated the branded pouch, preserving original graphics and typography, staging it on clean marble surrounded by nutrient-dense almonds, cashews and berries."
  },
  {
    id: "ba-6",
    title: "Urban Streetwear Sneakers",
    brand: "Urban Kicks",
    category: "Ads",
    beforeImg: "/before-after/raw-urban-sneakers.png",
    afterImg: "/sample-work/urban-sneakers.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From floor sneaker snap to dynamic floating perspective over skate ramp.",
    details: "We isolated the shoes, preserved the rubber outsole texture and lace styling, and placed them in an action-oriented sunlit skatepark angle to capture youth street culture."
  },
  {
    id: "ba-7",
    title: "Fuel One Whey - Dynamic Collision",
    brand: "Fuel One",
    category: "Ads",
    beforeImg: "/before-after/raw-fuel-whey.png",
    afterImg: "/sample-work/fuel-whey-splash.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From plain product container to high-impact milk collision & powder splash ad.",
    details: "Using the raw customer photo, we placed the container branding inside an energetic chocolate-milk splash environment on dark industrial slate, designed to immediately stop feed scrollers."
  },
  {
    id: "ba-8",
    title: "MuscleTech Platinum Fish Oil",
    brand: "MuscleTech",
    category: "Ads",
    beforeImg: "/before-after/raw-muscletech-fishoil.png",
    afterImg: "/sample-work/muscletech-fishoil.png",
    beforeLabel: "Photo you send",
    afterLabel: "Visual we create",
    summary: "From plain bottle shot to fresh coastal driftwood and crystal splash ad.",
    details: "Preserved exact label foil, omega-3 potency badges, and bottle curvature while crafting a pristine marine setting with clear water droplets demonstrating 100% pure omega-3 sourcing."
  }
];

type PortfolioFilter = "All" | "Product Images" | "Ads" | "Carousels" | "Videos";

interface PortfolioItem {
  id: string;
  title: string;
  brand: string;
  filterCategory: "Product Images" | "Ads" | "Carousels" | "Videos";
  type: "video" | "image" | "carousel";
  src: string;
  poster?: string;
  slidesCount?: number;
  hook: string;
  accent: string;
  description: string;
  isConceptWork: boolean;
}

const portfolioItems: PortfolioItem[] = [
  // --- PRODUCT IMAGES ---
  {
    id: "p1",
    title: "Mo's Bakery Ragi Cookies - Morning Table",
    brand: "Mo's Bakery",
    filterCategory: "Product Images",
    type: "image",
    src: "/sample-work/mos-ragi-cookies.png",
    hook: "100% authentic canister packaging preserved with roasted almonds and morning window light.",
    accent: "#06B6D4",
    description: "Warm morning breakfast table composition showcasing real canister branding, ingredients and cookies.",
    isConceptWork: true
  },
  {
    id: "p2",
    title: "Rose Quartz Facial Roller Kit",
    brand: "Natural Glow",
    filterCategory: "Product Images",
    type: "image",
    src: "/sample-work/getmecraft-guasha.png",
    hook: "Natural pink salt background highlights authentic mineral beauty and spa luxury.",
    accent: "#e879f9",
    description: "Soft morning window light and green leaves highlighting gold-plated roller hardware.",
    isConceptWork: true
  },
  {
    id: "p3",
    title: "NOMAD Leather Valet Tray Set",
    brand: "NOMAD Goods",
    filterCategory: "Product Images",
    type: "image",
    src: "/sample-work/nomad-valet-tray.png",
    hook: "Displays wallet and watch together in a matching tray to encourage product bundling.",
    accent: "#f59e0b",
    description: "Real leather tray with matching accessories set for luxury bedside or desk display.",
    isConceptWork: true
  },
  {
    id: "p4",
    title: "BULLMER Bamboo Summer Shirt",
    brand: "BULLMER",
    filterCategory: "Product Images",
    type: "image",
    src: "/sample-work/bullmer-bamboo-shirt.png",
    hook: "Stone pedestal inside a sunny villa turns a casual vacation shirt into an editorial feature.",
    accent: "#64748B",
    description: "Natural stone pedestal with warm sunlight and bonsai tree to showcase summer drape.",
    isConceptWork: true
  },

  // --- ADS (AD CREATIVES) ---
  {
    id: "a1",
    title: "Fuel One Whey - Dynamic Milk Splash",
    brand: "Fuel One",
    filterCategory: "Ads",
    type: "image",
    src: "/sample-work/fuel-whey-splash.png",
    hook: "Dynamic milk collision creates immediate sensory appetite and stops scrollers cold.",
    accent: "#f97316",
    description: "High-energy fluid splash shot placed on gym floor to make protein powder look delicious.",
    isConceptWork: true
  },
  {
    id: "a2",
    title: "Fuel One Dead Lift - Max Energy",
    brand: "Fuel One",
    filterCategory: "Ads",
    type: "image",
    src: "/sample-work/fuel-deadlift.png",
    hook: "Electric glow and bold dark background speaks directly to serious gym-goers.",
    accent: "#ef4444",
    description: "Dark studio photo with barbell weights and golden highlights designed for fitness conversion.",
    isConceptWork: true
  },
  {
    id: "a3",
    title: "MuscleTech Pure Fish Oil - Ocean Fresh",
    brand: "MuscleTech",
    filterCategory: "Ads",
    type: "image",
    src: "/sample-work/muscletech-fishoil.png",
    hook: "Fresh ocean water and natural driftwood shows marine purity in a split second.",
    accent: "#0ea5e9",
    description: "Sunny coastal photo with water droplets demonstrating ultra-pure omega-3.",
    isConceptWork: true
  },
  {
    id: "a4",
    title: "Apple Watch Ultra - Ocean Wave Crash",
    brand: "Smart Wearable",
    filterCategory: "Ads",
    type: "image",
    src: "/sample-work/apple-watch-ocean.png",
    hook: "Crashing ocean wave against volcanic sea rocks proves water resistance without words.",
    accent: "#06B6D4",
    description: "Wet volcanic sea rocks and water spray highlighting titanium durability.",
    isConceptWork: true
  },
  {
    id: "a5",
    title: "Urban Streetwear Sneakers - Skatepark",
    brand: "Urban Kicks",
    filterCategory: "Ads",
    type: "image",
    src: "/sample-work/urban-sneakers.png",
    hook: "Floating sneaker angle over sunlit skate ramp grabs youth attention immediately.",
    accent: "#6366F1",
    description: "Floating streetwear angle crafted to drive impulse clicks on social feeds.",
    isConceptWork: true
  },

  // --- CAROUSELS ---
  {
    id: "c1",
    title: "Mo's Bakery 5-Slide Ingredient Story",
    brand: "Mo's Bakery",
    filterCategory: "Carousels",
    type: "carousel",
    src: "/sample-work/mos-ragi-cookies.png",
    slidesCount: 5,
    hook: "Swipe-through educational breakdown of organic ragi benefits, zero refined sugar and artisan craft.",
    accent: "#06B6D4",
    description: "5-slide visual carousel breaking down wholesome ancient grains, zero palm oil and breakfast tea pairings.",
    isConceptWork: true
  },
  {
    id: "c2",
    title: "Fuel One Whey vs Standard Protein",
    brand: "Fuel One",
    filterCategory: "Carousels",
    type: "carousel",
    src: "/sample-work/fuel-whey-gym.png",
    slidesCount: 4,
    hook: "Side-by-side nutrition fact comparison slides that systematically overcome buyer hesitation.",
    accent: "#f59e0b",
    description: "Comparison carousel highlighting 24g protein purity, zero bloat formulation and amino profile.",
    isConceptWork: true
  },
  {
    id: "c3",
    title: "Right Shift Healthy Seeds Breakdown",
    brand: "Right Shift",
    filterCategory: "Carousels",
    type: "carousel",
    src: "/sample-work/rightshift-dryfruit.png",
    slidesCount: 4,
    hook: "Nutrient-dense ingredient breakdown carousel showing real almonds, cashews and natural energy.",
    accent: "#ef4444",
    description: "Clean kitchen layout carousel detailing sustained energy, zero added sugars and morning snack use.",
    isConceptWork: true
  },

  // --- VIDEOS ---
  {
    id: "v1",
    title: "Auraa Peptide Cream - Morning Glow Reel",
    brand: "Auraa Skin",
    filterCategory: "Videos",
    type: "video",
    src: "/sample-work/video-skincare.mp4",
    poster: "/sample-work/auraa-moisturizer.png",
    hook: "Soft morning sunlight on natural stone creates immediate calm luxury that stops scrolling.",
    accent: "#e879f9",
    description: "Vertical product video ad with cinematic lighting and realistic shadow motion for Reels and Meta.",
    isConceptWork: true
  },
  {
    id: "v2",
    title: "Haute Paris - Autumn Collection Reel",
    brand: "Maison Paris",
    filterCategory: "Videos",
    type: "video",
    src: "/sample-work/video-fashion.mp4",
    poster: "/sample-work/resortwear-model.png",
    hook: "Fast walk past the Eiffel Tower with smooth close-ups catches fashion shoppers right away.",
    accent: "#f59e0b",
    description: "High-energy fashion reel built specifically to grab attention in the first 2 seconds on Instagram.",
    isConceptWork: true
  },
  {
    id: "v3",
    title: "NOMAD - Everyday Carry Essentials",
    brand: "NOMAD Goods",
    filterCategory: "Videos",
    type: "video",
    src: "/sample-work/video-edc.mp4",
    poster: "/sample-work/luxury-leather-wallet.png",
    hook: "Smooth motion between wooden desk and slate stone highlights classic leather with modern tech.",
    accent: "#f97316",
    description: "Pairs handmade leather wallet with titanium watch strap to show how good the bundle looks together.",
    isConceptWork: true
  },
  {
    id: "v4",
    title: "The Great Crunch - Miniature World Viral Reel",
    brand: "Crunch Crafters",
    filterCategory: "Videos",
    type: "video",
    src: "/sample-work/video-showcase-2.mp4",
    poster: "/sample-work/video-showcase-2.png",
    hook: "Miniature toy excavators cracking open golden crispy snack is a viral pattern interrupt.",
    accent: "#eab308",
    description: "High-engagement miniature scale reel designed to drive organic shares and direct clicks.",
    isConceptWork: true
  }
];

export default function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<BeforeAfterItem>(beforeAfterList[0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === "All") return true;
    return item.filterCategory === activeFilter;
  });

  return (
    <section id="work" style={{ position: "relative", zIndex: 10, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div className="eyebrow" style={{ marginBottom: 18, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Portfolio &amp; Transformations
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            From Raw Photos To <span className="gt">Polished Visuals.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
            Browse our original-to-result transformations and filter across our four core creative formats.
          </p>
        </motion.div>

        {/* 1. ORIGINAL-PHOTO-TO-FINAL-RESULT SHOWCASE (At least 3 examples) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: "#FFFFFF",
            borderRadius: 28,
            border: "1px solid rgba(15,23,42,0.1)",
            boxShadow: "0 10px 40px rgba(15,23,42,0.05)",
            padding: "clamp(24px, 4vw, 36px)",
            marginBottom: 72,
          }}
        >
          {/* Header of Before & After Area */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6366F1", marginBottom: 4 }}>
                <Sparkles size={14} /> Side-by-Side Proof
              </div>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0F172A" }}>
                {activeBeforeAfter.title}
              </h3>
            </div>

            {/* Example Switcher Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, background: "#F1F5F9", padding: 6, borderRadius: 14 }}>
              {beforeAfterList.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveBeforeAfter(item)}
                  style={{
                    background: activeBeforeAfter.id === item.id ? "#FFFFFF" : "transparent",
                    border: "none",
                    borderRadius: 10,
                    padding: "8px 14px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: activeBeforeAfter.id === item.id ? "#0F172A" : "#64748B",
                    cursor: "pointer",
                    boxShadow: activeBeforeAfter.id === item.id ? "0 2px 10px rgba(0,0,0,0.06)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.brand}
                </button>
              ))}
            </div>
          </div>

          {/* Side-by-Side Comparison Container */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
              gap: 20,
              background: "#0F172A",
              borderRadius: 22,
              padding: "clamp(16px, 2.5vw, 24px)",
              marginBottom: 20,
            }}
          >
            {/* Left: Photo You Send */}
            <div style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              aspectRatio: "1 / 1",
              background: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img
                src={activeBeforeAfter.beforeImg}
                alt={activeBeforeAfter.beforeLabel}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 16, display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  background: "rgba(15,23,42,0.85)",
                  backdropFilter: "blur(8px)",
                  color: "#FFFFFF",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  padding: "6px 14px",
                  borderRadius: 8,
                }}
              >
                {activeBeforeAfter.beforeLabel}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  right: 12,
                  background: "rgba(15,23,42,0.75)",
                  backdropFilter: "blur(6px)",
                  color: "#F1F5F9",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  padding: "8px 12px",
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                Existing customer raw photo
              </div>
            </div>

            {/* Right: Visual We Create */}
            <div
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "1 / 1",
                background: "#1E293B",
                border: "2px solid #06B6D4",
              }}
            >
              <img
                src={activeBeforeAfter.afterImg}
                alt={activeBeforeAfter.afterLabel}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  background: "linear-gradient(135deg, #06B6D4, #6366F1)",
                  color: "#FFFFFF",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  padding: "6px 14px",
                  borderRadius: 8,
                  boxShadow: "0 4px 15px rgba(6,182,212,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Sparkles size={13} /> {activeBeforeAfter.afterLabel}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  right: 12,
                  background: "rgba(6,182,212,0.92)",
                  color: "#FFFFFF",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  padding: "8px 12px",
                  borderRadius: 8,
                  textAlign: "center",
                }}
              >
                Polished product visual ready for ad campaigns &amp; store
              </div>
            </div>
          </div>

          {/* Description & Concept Work Label */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              padding: "16px 20px",
              background: "#F8F9FA",
              borderRadius: 16,
            }}
          >
            <div style={{ maxWidth: 840 }}>
              <div style={{ color: "#0F172A", fontWeight: 700, fontSize: "0.92rem", marginBottom: 3 }}>
                {activeBeforeAfter.summary}
              </div>
              <div style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>
                {activeBeforeAfter.details}
              </div>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#6366F1",
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
                padding: "6px 12px",
                borderRadius: 8,
                whiteSpace: "nowrap",
              }}
            >
              Concept Work
            </div>
          </div>
        </motion.div>

        {/* 2. FOUR PORTFOLIO FILTERS: Product Images / Ads / Carousels / Videos */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h3 style={{ fontSize: "1.7rem", fontWeight: 900, color: "#0F172A", marginBottom: 10 }}>
            Explore Deliverable Formats
          </h3>
          <p style={{ color: "#64748B", fontSize: "0.95rem", marginBottom: 24 }}>
            Filter our work by the format included in your chosen package.
          </p>

          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              background: "#FFFFFF",
              border: "1px solid rgba(15,23,42,0.1)",
              padding: "6px",
              borderRadius: 16,
              boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
            }}
          >
            {(["All", "Product Images", "Ads", "Carousels", "Videos"] as PortfolioFilter[]).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    background: isActive ? "linear-gradient(135deg, #06B6D4, #6366F1)" : "transparent",
                    color: isActive ? "#FFFFFF" : "#64748B",
                    border: "none",
                    borderRadius: 12,
                    padding: "10px 20px",
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: isActive ? "0 4px 15px rgba(6,182,212,0.3)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 22,
          }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedItem(item)}
              style={{
                background: "#FFFFFF",
                borderRadius: 22,
                border: "1px solid rgba(15,23,42,0.08)",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(15,23,42,0.03)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
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
              {/* Media Preview Box */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", background: "#0F172A", overflow: "hidden" }}>
                <img
                  src={item.type === "video" ? (item.poster || item.src) : item.src}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                {/* Concept Work Badge */}
                {item.isConceptWork && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "rgba(15,23,42,0.85)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 8,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Concept Work
                  </div>
                )}

                {/* Format Pill (Video/Carousel/Image) */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                    color: "#0F172A",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {item.type === "video" ? (
                    <>
                      <Play size={10} fill="#0F172A" /> Short Video
                    </>
                  ) : item.type === "carousel" ? (
                    <>
                      <Layers size={11} color="#06B6D4" /> Carousel ({item.slidesCount} Slides)
                    </>
                  ) : (
                    <>
                      <Camera size={11} color="#6366F1" /> {item.filterCategory}
                    </>
                  )}
                </div>

                {/* Video Play Overlay Indicator */}
                {item.type === "video" && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      }}
                    >
                      <Play size={20} fill="#0F172A" color="#0F172A" style={{ marginLeft: 3 }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Text Content */}
              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B", marginBottom: 4 }}>
                  {item.brand} • {item.filterCategory}
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A", marginBottom: 8, lineHeight: 1.3 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5, marginTop: "auto" }}>
                  {item.hook}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal Dialog Portal for Detailed Inspection */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 999999,
                  background: "rgba(15,23,42,0.85)",
                  backdropFilter: "blur(14px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "clamp(16px, 3vw, 32px)",
                }}
                onClick={() => setSelectedItem(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 24,
                    overflow: "hidden",
                    maxWidth: 820,
                    width: "100%",
                    maxHeight: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Modal Header */}
                  <div
                    style={{
                      padding: "18px 24px",
                      borderBottom: "1px solid rgba(15,23,42,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#6366F1",
                          marginRight: 8,
                        }}
                      >
                        Concept Work
                      </span>
                      <strong style={{ fontSize: "1.05rem", color: "#0F172A" }}>{selectedItem.title}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      style={{
                        background: "#F1F5F9",
                        border: "none",
                        borderRadius: "50%",
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div style={{ overflowY: "auto", padding: "24px" }}>
                    <div style={{ borderRadius: 16, overflow: "hidden", background: "#000", marginBottom: 20 }}>
                      {selectedItem.type === "video" ? (
                        <video
                          src={selectedItem.src}
                          poster={selectedItem.poster}
                          controls
                          autoPlay
                          playsInline
                          style={{ width: "100%", maxHeight: "55vh", display: "block" }}
                        />
                      ) : (
                        <img
                          src={selectedItem.src}
                          alt={selectedItem.title}
                          style={{ width: "100%", maxHeight: "55vh", objectFit: "contain", display: "block" }}
                        />
                      )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>
                        Angle &amp; Conversion Strategy:
                      </div>
                      <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        {selectedItem.hook}
                      </p>
                      <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>
                        {selectedItem.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
