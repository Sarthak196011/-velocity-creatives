"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, X, Tag, Play } from "lucide-react";

interface CreativeItem {
  id: string;
  title: string;
  brand: string;
  category: "video" | "skincare" | "fitness" | "edc" | "fashion" | "food";
  categoryLabel: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  tags: string[];
  hook: string;
  specTag: string;
  accent: string;
  description: string;
}

const creatives: CreativeItem[] = [
  // --- 4 COMMERCIAL VIDEO CUTS ---
  {
    id: "v1",
    title: "Auraa Peptide Cream - Morning Glow",
    brand: "Auraa Skin",
    category: "video",
    categoryLabel: "Short Video Ad",
    type: "video",
    src: "/sample-work/video-skincare.mp4",
    poster: "/sample-work/auraa-moisturizer.png",
    tags: ["Skincare Video", "Peptides", "Clean Studio"],
    hook: "Soft morning sunlight on natural stone creates an immediate calm, luxury feeling that makes people stop scrolling.",
    specTag: "Short Video",
    accent: "#e879f9",
    description: "Cinematic product lighting with realistic shadows designed for Facebook, Instagram, and Reels ads."
  },
  {
    id: "v2",
    title: "Haute Paris - Autumn Collection",
    brand: "Maison Paris",
    category: "video",
    categoryLabel: "Short Video Ad",
    type: "video",
    src: "/sample-work/video-fashion.mp4",
    poster: "/sample-work/resortwear-model.png",
    tags: ["Fashion Video", "Paris Street", "Outerwear"],
    hook: "A quick walk past the Eiffel Tower with smooth close-ups on gold jewelry and boots catches the eye right away.",
    specTag: "Reels / TikTok",
    accent: "#f59e0b",
    description: "Fast-paced fashion video built specifically to grab attention in the first 2 seconds on Instagram Reels."
  },
  {
    id: "v3",
    title: "NOMAD - Everyday Carry Essentials",
    brand: "NOMAD Goods",
    category: "video",
    categoryLabel: "Short Video Ad",
    type: "video",
    src: "/sample-work/video-edc.mp4",
    poster: "/sample-work/luxury-leather-wallet.png",
    tags: ["Leather Goods", "Apple Watch Strap", "Desk Setup"],
    hook: "Smooth transition between a clean wooden desk and slate stone pairs classic leather with modern tech.",
    specTag: "Product Video",
    accent: "#f97316",
    description: "Pairs a handmade leather wallet with a titanium watch strap to show how good the bundle looks together."
  },
  {
    id: "v4",
    title: "Fresh Farm Snacks - Healthy Bites",
    brand: "Clean Bites",
    category: "video",
    categoryLabel: "Short Video Ad",
    type: "video",
    src: "/sample-work/video-snack.mp4",
    poster: "/sample-work/mos-ragi-cookies.png",
    tags: ["Food Video", "Natural Ingredients", "Appetite Appeal"],
    hook: "Golden sunlight over farm fields with fresh cookies and dates gives an instant feeling of pure, healthy food.",
    specTag: "Food Video",
    accent: "#4ade80",
    description: "Appetite-driven video highlighting real whole ingredients, crisp cookie texture, and clean snacking."
  },

  // --- FITNESS & NUTRITION ---
  {
    id: "i3",
    title: "Fuel One Whey - Dynamic Milk Splash",
    brand: "Fuel One",
    category: "fitness",
    categoryLabel: "Fitness",
    type: "image",
    src: "/sample-work/fuel-whey-splash.png",
    tags: ["High Impact", "Splash Effect", "24g Protein"],
    hook: "Dynamic milk collision and chocolate powder explosion creates instant craving and stops fast scrollers.",
    specTag: "Fluid Splash",
    accent: "#f97316",
    description: "High-energy splash shot placed on an industrial gym floor to make the protein powder look delicious and powerful."
  },
  {
    id: "i4",
    title: "Fuel One Dead Lift - Workout Energy",
    brand: "Fuel One",
    category: "fitness",
    categoryLabel: "Fitness",
    type: "image",
    src: "/sample-work/fuel-deadlift.png",
    tags: ["Workout Energy", "Citrulline", "Weightlifting"],
    hook: "Electric glow and bold dark background speaks directly to serious gym-goers looking for maximum energy.",
    specTag: "High Energy",
    accent: "#ef4444",
    description: "Dark studio photo with barbell weights and golden highlights designed to attract fitness enthusiasts."
  },
  {
    id: "i5",
    title: "MuscleTech Pure Fish Oil - Ocean Fresh",
    brand: "MuscleTech",
    category: "fitness",
    categoryLabel: "Fitness",
    type: "image",
    src: "/sample-work/muscletech-fishoil.png",
    tags: ["Pure Omega-3", "Ocean Water", "No Fishy Taste"],
    hook: "Fresh ocean water and natural driftwood shows where the pure sea ingredients come from in a split second.",
    specTag: "Natural Marine",
    accent: "#06b6d4",
    description: "Sunny coastal photo with palm leaves and clean water droplets to show freshness and purity."
  },
  {
    id: "i6",
    title: "Fuel One Whey - Clean Studio Monolith",
    brand: "Fuel One",
    category: "fitness",
    categoryLabel: "Fitness",
    type: "image",
    src: "/sample-work/fuel-whey-gym.png",
    tags: ["Minimalist", "Concrete Studio", "Clean Look"],
    hook: "A clean concrete block in a sunlit private gym makes the brand look high-end and trustworthy.",
    specTag: "Clean Studio",
    accent: "#f59e0b",
    description: "Architectural concrete texture and warm sunlight for a clean, premium fitness look."
  },

  // --- LUXURY EDC & TECH ---
  {
    id: "i7",
    title: "Apple Watch Ultra - Ocean Rock Wave",
    brand: "Smart Wearable",
    category: "edc",
    categoryLabel: "Gear & Tech",
    type: "image",
    src: "/sample-work/apple-watch-ocean.png",
    tags: ["Tough Build", "Ocean Water", "Sport Strap"],
    hook: "Crashing ocean waves against volcanic sea rocks proves water resistance without needing a single word.",
    specTag: "Action Shot",
    accent: "#f97316",
    description: "Wet volcanic sea rocks and water spray highlighting the tough titanium case."
  },
  {
    id: "i8",
    title: "Handmade Leather Wallet & Pen",
    brand: "NOMAD Carry",
    category: "edc",
    categoryLabel: "Gear & Tech",
    type: "image",
    src: "/sample-work/luxury-leather-wallet.png",
    tags: ["Real Leather", "Desk Setup", "Everyday Carry"],
    hook: "Warm mahogany wood, glasses, and rich brown leather gives a timeless, premium feel that converts working professionals.",
    specTag: "Desk Setup",
    accent: "#b45309",
    description: "Deep wood grain and warm desk lamp lighting highlighting the real leather stitching."
  },
  {
    id: "i9",
    title: "Leather Valet Tray - Watch & Wallet Set",
    brand: "NOMAD Goods",
    category: "edc",
    categoryLabel: "Gear & Tech",
    type: "image",
    src: "/sample-work/nomad-valet-tray.png",
    tags: ["Leather Tray", "Product Bundle", "Nightstand"],
    hook: "Displaying the wallet and watch together in a matching tray naturally encourages customers to buy the complete bundle.",
    specTag: "Product Bundle",
    accent: "#d97706",
    description: "Real leather tray with matching watch and wallet to increase bundle sales."
  },

  // --- SKINCARE & WELLNESS ---
  {
    id: "i1",
    title: "Barrier Hydration Cream - Pure Drops",
    brand: "Aura Beauty",
    category: "skincare",
    categoryLabel: "Skincare",
    type: "image",
    src: "/sample-work/auraa-moisturizer.png",
    tags: ["Dewy Drops", "Ceramides", "Clean Bottle"],
    hook: "Clear water drops on a frosted bottle next to fresh blueberries instantly tells buyers this cream is deeply hydrating.",
    specTag: "Dewy Fresh",
    accent: "#38bdf8",
    description: "Crisp studio lighting on frosted glass with fresh blueberries to highlight moisture."
  },
  {
    id: "i2",
    title: "Rose Quartz Facial Roller Kit",
    brand: "Natural Glow",
    category: "skincare",
    categoryLabel: "Skincare",
    type: "image",
    src: "/sample-work/getmecraft-guasha.png",
    tags: ["Gift Box", "Natural Stone", "Relaxing Spa"],
    hook: "Natural pink salt background shows authentic mineral beauty and a calming self-care routine.",
    specTag: "Spa & Beauty",
    accent: "#e879f9",
    description: "Soft morning window light and green leaves highlighting the gold-plated roller."
  },

  // --- FASHION & STREETWEAR ---
  {
    id: "i10",
    title: "BULLMER Bamboo Summer Shirt",
    brand: "BULLMER",
    category: "fashion",
    categoryLabel: "Fashion",
    type: "image",
    src: "/sample-work/bullmer-bamboo-shirt.png",
    tags: ["Camp Collar", "Summer Style", "Clean Plinth"],
    hook: "A clean stone pedestal inside a sunny villa turns a casual vacation shirt into a premium product.",
    specTag: "Fashion Display",
    accent: "#e2e8f0",
    description: "Stone pedestal with warm sunlight and green bonsai plant to showcase resort clothing."
  },
  {
    id: "i11",
    title: "Bandana Pattern Patchwork Shirt",
    brand: "Urban Wear",
    category: "fashion",
    categoryLabel: "Fashion",
    type: "image",
    src: "/sample-work/bandana-streetwear.png",
    tags: ["3D Fabric", "Summer Layering", "Streetwear"],
    hook: "Floating fabric with realistic folds lets customers picture exactly how the relaxed fit will look on them.",
    specTag: "3D Fit",
    accent: "#60a5fa",
    description: "Sunlit studio with natural cotton textures to display shirt fit and patterns."
  },
  {
    id: "i12",
    title: "Linen Beach Shirt - Coastal Style",
    brand: "Coastal Wear",
    category: "fashion",
    categoryLabel: "Fashion",
    type: "image",
    src: "/sample-work/resortwear-model.png",
    tags: ["Vacation Style", "Linen Shirt", "Beach Lifestyle"],
    hook: "Sunny balcony overlooking clear ocean water makes customers immediately want to dress for their next vacation.",
    specTag: "Lifestyle",
    accent: "#38bdf8",
    description: "Model wearing white linen trousers by the sea with natural beach breezes."
  },
  {
    id: "i13",
    title: "Streetwear Sneakers - Skatepark Angle",
    brand: "Urban Shoes",
    category: "fashion",
    categoryLabel: "Fashion",
    type: "image",
    src: "/sample-work/urban-sneakers.png",
    tags: ["Streetwear", "Floating Shoes", "Skate Culture"],
    hook: "Floating sneaker angle over a sunlit skate ramp grabs attention instantly in busy social media feeds.",
    specTag: "Street Style",
    accent: "#38bdf8",
    description: "Skatepark ramp in afternoon sunlight showing off shoe materials and stitching."
  },

  // --- GOURMET FOOD & SNACKS ---
  {
    id: "i14",
    title: "Vegan Ragi Cookies - Kitchen Harvest",
    brand: "Healthy Bakery",
    category: "food",
    categoryLabel: "Food & Snacks",
    type: "image",
    src: "/sample-work/mos-ragi-cookies.png",
    tags: ["Real Millets", "Almonds", "Warm Kitchen"],
    hook: "Real ragi grains and whole raw almonds on a warm wooden counter proves healthy, clean ingredients in one second.",
    specTag: "Healthy Snacks",
    accent: "#f59e0b",
    description: "Warm wooden table with healthy grains and almonds to highlight clean baking."
  },
  {
    id: "i15",
    title: "Nut & Seed Energy Bar - High Protein",
    brand: "Clean Nutrition",
    category: "food",
    categoryLabel: "Food & Snacks",
    type: "image",
    src: "/sample-work/rightshift-dryfruit.png",
    tags: ["Real Nuts", "High Fibre", "No Added Sugar"],
    hook: "Cut-open energy bar packed with pumpkin seeds, cashews, and dates immediately shows how healthy and filling it is.",
    specTag: "Nutrient Dense",
    accent: "#ef4444",
    description: "White kitchen counter with scattered natural nuts and dates around the healthy snack bar."
  }
];

export default function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedCreative, setSelectedCreative] = useState<CreativeItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCreative(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const row1 = [
    creatives[0],  // v1 Auraa Video
    creatives[4],  // i3 Fuel Splash
    creatives[11], // i10 BULLMER Bamboo
    creatives[8],  // i7 Apple Watch Ocean
    creatives[15], // i15 Right Shift Dry Fruit
    creatives[9],  // i1 Auraa Cream
    creatives[10], // i8 Nomad Wallet
    creatives[1],  // v2 Haute Paris Video
  ];

  const row2 = [
    creatives[2],  // v3 NOMAD EDC Video
    creatives[5],  // i4 Fuel Dead Lift
    creatives[12], // i11 Urban Bandana
    creatives[13], // i2 Gua Sha Kit
    creatives[14], // i14 Ragi Cookies
    creatives[10], // i9 Nomad Tray
    creatives[13], // i12 Linen Model
    creatives[3],  // v4 Snack Video
  ];

  const row3 = [
    creatives[1],  // v2 Haute Paris Video
    creatives[6],  // i5 Fish Oil
    creatives[14], // i13 Urban Sneakers
    creatives[7],  // i6 Fuel Monolith
    creatives[10], // i8 Nomad Wallet
    creatives[0],  // v1 Auraa Video
    creatives[11], // i10 BULLMER Bamboo
    creatives[9],  // i1 Auraa Cream
  ];

  return (
    <section id="work" style={{ position: "relative", zIndex: 10, padding: "120px 0 130px", overflow: "hidden" }}>
      
      {/* Edge gradient fade masks for smooth entry and exit */}
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: "clamp(60px, 9vw, 160px)",
        background: "linear-gradient(90deg, #080810 25%, transparent 100%)",
        zIndex: 15,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        width: "clamp(60px, 9vw, 160px)",
        background: "linear-gradient(270deg, #080810 25%, transparent 100%)",
        zIndex: 15,
        pointerEvents: "none"
      }} />

      {/* Header in simple English */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center", marginBottom: 44, position: "relative", zIndex: 16 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Our Sample Work
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Ads Designed to <span className="gt">Get More Sales.</span>
          </h2>
          <p style={{ color: "rgba(232,232,240,0.6)", fontSize: "1.08rem", maxWidth: 640, margin: "0 auto 18px", lineHeight: 1.6 }}>
            Take a look at the image ads, clean product photos, and short video cuts we create for online brands.
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: 999,
            padding: "6px 18px"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
            <span style={{ fontSize: "0.76rem", color: "#c084fc", fontWeight: 700 }}>
              Hover over any card to pause | Click to see how it works
            </span>
          </div>
        </motion.div>
      </div>

      {/* 3 Hardware-Accelerated Continuous Filmstrip Conveyors */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", zIndex: 5 }}>
        <FilmstripTrack items={row1} direction="left" speed={54} onSelect={setSelectedCreative} />
        <FilmstripTrack items={row2} direction="right" speed={48} onSelect={setSelectedCreative} />
        <FilmstripTrack items={row3} direction="left" speed={58} onSelect={setSelectedCreative} />
      </div>

      {/* High-Fidelity Modal */}
      <AnimatePresence>
        {selectedCreative && (
          <CreativeModal item={selectedCreative} onClose={() => setSelectedCreative(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function FilmstripTrack({
  items,
  direction,
  speed,
  onSelect
}: {
  items: CreativeItem[];
  direction: "left" | "right";
  speed: number;
  onSelect: (item: CreativeItem) => void;
}) {
  return (
    <div className="filmstrip-viewport">
      <div
        className={`filmstrip-track ${direction === "left" ? "track-left" : "track-right"}`}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {/* Group 1 */}
        <div className="filmstrip-group">
          {items.map((item, idx) => (
            <FilmstripCard
              key={`g1-${item.id}-${idx}`}
              item={item}
              onSelect={() => onSelect(item)}
            />
          ))}
        </div>

        {/* Group 2 (Exact duplicate for seamless looping) */}
        <div className="filmstrip-group" aria-hidden="true">
          {items.map((item, idx) => (
            <FilmstripCard
              key={`g2-${item.id}-${idx}`}
              item={item}
              onSelect={() => onSelect(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilmstripCard({ item, onSelect }: { item: CreativeItem; onSelect: () => void }) {
  const isVideo = item.type === "video";
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div
      onClick={onSelect}
      className="filmstrip-card"
      style={{
        width: isVideo ? 350 : 280,
        height: 270,
        "--card-accent": item.accent,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#110e24",
        backgroundImage: item.poster ? `url(${item.poster})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as React.CSSProperties}
    >
      {isVideo ? (
        <>
          {item.poster && (
            <img
              src={item.poster}
              alt={item.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
                opacity: videoReady ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            />
          )}
          <video
            src={item.src}
            poster={item.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </>
      ) : (
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Top Bar Badges */}
      <div style={{
        position: "absolute",
        top: 12,
        left: 12,
        right: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 5
      }}>
        <span style={{
          fontSize: "0.65rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          background: "rgba(10, 8, 20, 0.85)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${item.accent}55`,
          color: "#fff",
          padding: "4px 10px",
          borderRadius: 999
        }}>
          {item.categoryLabel}
        </span>

        <div style={{
          background: "rgba(8, 8, 16, 0.88)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          padding: "3px 8px",
          display: "flex",
          alignItems: "center",
          gap: 5
        }}>
          <Tag size={10} style={{ color: item.accent }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#fff" }}>
            {item.specTag}
          </span>
        </div>
      </div>

      {/* Gradient Shade for Title Legibility */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0.2) 55%, transparent 100%)",
        pointerEvents: "none"
      }} />

      {/* Video Indicator Pill */}
      {isVideo && (
        <div style={{
          position: "absolute",
          bottom: 46,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(8, 8, 16, 0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: 999,
          padding: "3px 8px",
          color: "#fff",
          fontSize: "0.65rem",
          fontWeight: 700,
          zIndex: 6
        }}>
          <Play size={9} fill="currentColor" style={{ color: item.accent }} />
          <span>Video Ad</span>
        </div>
      )}

      {/* Bottom Text Area */}
      <div style={{
        position: "absolute",
        bottom: 12,
        left: 14,
        right: 14,
        zIndex: 5
      }}>
        <div style={{ fontSize: "0.68rem", fontWeight: 800, color: item.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {item.brand}
        </div>
        <h4 style={{
          color: "#fff",
          fontSize: "0.95rem",
          fontWeight: 800,
          lineHeight: 1.25,
          marginTop: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {item.title}
        </h4>
      </div>
    </div>
  );
}

function CreativeModal({ item, onClose }: { item: CreativeItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(4, 4, 10, 0.9)",
        backdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(150deg, rgba(22, 16, 42, 0.96) 0%, rgba(10, 8, 20, 0.98) 100%)",
          borderRadius: 24,
          border: `1px solid ${item.accent}66`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 50px ${item.accent}20`,
          maxWidth: 960,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "36px",
          position: "relative"
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, alignItems: "center" }}>
          <div style={{
            borderRadius: 18,
            overflow: "hidden",
            background: "#06060c",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
            maxHeight: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                controls
                playsInline
                style={{ width: "100%", maxHeight: 520, objectFit: "contain" }}
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                style={{ width: "100%", maxHeight: 520, objectFit: "contain" }}
              />
            )}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: item.accent,
                background: `${item.accent}15`,
                border: `1px solid ${item.accent}35`,
                padding: "4px 12px",
                borderRadius: 999
              }}>
                {item.brand}
              </span>
              <span style={{ fontSize: "0.75rem", color: "rgba(232,232,240,0.5)" }}>
                {item.categoryLabel}
              </span>
            </div>

            <h3 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>
              {item.title}
            </h3>

            <p style={{ color: "rgba(232,232,240,0.75)", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: 20 }}>
              {item.description}
            </p>

            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "16px 20px",
              marginBottom: 24
            }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: item.accent, marginBottom: 6 }}>
                Why This Ad Works:
              </div>
              <p style={{ color: "#fff", fontSize: "0.9rem", lineHeight: 1.6 }}>
                "{item.hook}"
              </p>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {item.tags.map((t, tIdx) => (
                <span key={tIdx} style={{
                  background: "rgba(8,8,16,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "6px 14px",
                  fontSize: "0.78rem",
                  color: "rgba(232,232,240,0.75)",
                  fontWeight: 600
                }}>
                  #{t.replace(/ /g, "")}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "14px", borderRadius: 14 }}
            >
              Get Ads Like This For My Brand <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
