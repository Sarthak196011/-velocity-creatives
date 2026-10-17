"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  Sparkles,
  Check,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Film,
  Smartphone,
  Eye,
  Volume2,
  VolumeX
} from "lucide-react";

// --- 1. SIDE-BY-SIDE BEFORE / AFTER ITEMS ---
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
];

// --- 2. 21 CAMPAIGN-READY AD CONCEPTS ACROSS 9 INDUSTRIES ---
export type IndustryFilter =
  | "All"
  | "Food & Beverage"
  | "Jewellery & Luxury"
  | "Skincare & Beauty"
  | "Fashion & Bags"
  | "Candles & Ambiance"
  | "Home Decor"
  | "Perfumes & Fragrances"
  | "Watches"
  | "Sneakers & Streetwear";

export interface ConceptDesign {
  id: string;
  title: string;
  headline: string;
  industry: IndustryFilter;
  deliverableType: "Ads" | "Product Images";
  src: string;
  hook: string;
  accent: string;
  description: string;
}

export const conceptDesigns: ConceptDesign[] = [
  // --- FOOD & BEVERAGE ---
  {
    id: "cd-food-1",
    title: "Gourmet Double Smash Burger Ad",
    headline: "Make your menu the main event.",
    industry: "Food & Beverage",
    deliverableType: "Ads",
    src: "/designs/food/velocity-food-burger.png",
    hook: "Sizzling cheese and crisp lettuce turn a standard plate snapshot into an irresistible appetite trigger.",
    accent: "#f97316",
    description: "From everyday kitchen plate photo to crave-worthy commercial campaign with steaming buns and melted cheese."
  },
  {
    id: "cd-food-2",
    title: "Artisan Layered Chocolate Dessert",
    headline: "From everyday sweets to crave-worthy campaigns.",
    industry: "Food & Beverage",
    deliverableType: "Ads",
    src: "/designs/food/velocity-food-chocolate.png",
    hook: "Deep cocoa dust, melting chocolate swirl, and golden lighting create instant indulgence.",
    accent: "#854d0e",
    description: "Transforms a casual kitchen counter photo into an editorial dark-room bakery masterpiece."
  },
  {
    id: "cd-food-3",
    title: "Cold Brew & Cream Cascade",
    headline: "Stop the scroll with refreshing liquid motion.",
    industry: "Food & Beverage",
    deliverableType: "Ads",
    src: "/designs/food/velocity-food-iced-coffee.png",
    hook: "Swirling cream collision on ice cubes highlights premium cafe freshness in split-second feed views.",
    accent: "#0ea5e9",
    description: "Dynamic fluid collision highlighting morning cold brew freshness designed for high CTR beverage promotions."
  },

  // --- JEWELLERY & LUXURY ---
  {
    id: "cd-jewel-1",
    title: "Oval Diamond Solitaire on Obsidian",
    headline: "Make every detail shine.",
    industry: "Jewellery & Luxury",
    deliverableType: "Ads",
    src: "/designs/jewellery/01-ring-detail-shine.png",
    hook: "Facet reflections against textured volcanic stone make diamond brilliance pop with high-ticket luxury.",
    accent: "#eab308",
    description: "From flat desk snapshot to breathtaking obsidian stone showcase with razor-sharp facet brilliance."
  },
  {
    id: "cd-jewel-2",
    title: "18K Gold Pendant Stronger Presence",
    headline: "Command attention with editorial jewelry lighting.",
    industry: "Jewellery & Luxury",
    deliverableType: "Product Images",
    src: "/designs/jewellery/02-necklace-stronger-presence.png",
    hook: "Warm dramatic rim-lighting emphasizes 18k gold luster, making delicate chains look substantial and valuable.",
    accent: "#f59e0b",
    description: "Editorial gold necklace framing that builds perceived value for high-end boutique e-commerce stores."
  },
  {
    id: "cd-jewel-3",
    title: "Crystal Drop Earrings Statement",
    headline: "Turn catalog cutouts into editorial statements.",
    industry: "Jewellery & Luxury",
    deliverableType: "Product Images",
    src: "/designs/jewellery/03-earrings-big-presence.png",
    hook: "Soft studio shadows and crisp facets give high-fashion presence ready for carousel and catalogue campaigns.",
    accent: "#d946ef",
    description: "Architectural light staging elevating earrings into gallery-worthy luxury jewelry assets."
  },

  // --- SKINCARE & BEAUTY ---
  {
    id: "cd-skin-1",
    title: "Hydrating Botanical Glow Serum",
    headline: "Make your first impression glow.",
    industry: "Skincare & Beauty",
    deliverableType: "Ads",
    src: "/designs/skincare/01-serum-glow.png",
    hook: "Swirling mountain river water with sunlit spray conveys pure organic hydration instantly.",
    accent: "#10b981",
    description: "Places unedited serum dropper bottle amidst crystal river currents to prove deep hydration at first glance."
  },
  {
    id: "cd-skin-2",
    title: "Velvet Peptide Cream Spotlight",
    headline: "Rich textures that speak to premium skincare buyers.",
    industry: "Skincare & Beauty",
    deliverableType: "Product Images",
    src: "/designs/skincare/02-cream-spotlight.png",
    hook: "Silky cream swirl texture with soft morning studio lighting reinforces anti-aging potency.",
    accent: "#06b6d4",
    description: "Cream jar elevated with soft-focus morning daylight and delicate botanical texture notes."
  },
  {
    id: "cd-skin-3",
    title: "Botanical Purifying Cleanser",
    headline: "Elevate daily essentials into prestige rituals.",
    industry: "Skincare & Beauty",
    deliverableType: "Product Images",
    src: "/designs/skincare/03-cleanser-statement.png",
    hook: "Dewy water droplets and frosted glass aesthetic highlight everyday luxury skincare positioning.",
    accent: "#14b8a6",
    description: "Pure studio droplets highlighting clean skincare formulation for D2C beauty brands."
  },

  // --- FASHION & BAGS ---
  {
    id: "cd-bag-1",
    title: "Burgundy Leather Luxury Handbag",
    headline: "Structured luxury tailored for social conversion.",
    industry: "Fashion & Bags",
    deliverableType: "Product Images",
    src: "/designs/bags/01-burgundy-statement.png",
    hook: "Rich wine-red leather grain with gold hardware reflections staged on editorial marble pedestals.",
    accent: "#991b1b",
    description: "Preserves real leather stitching, gold lock hardware, and structured silhouette in an Italian showroom setting."
  },
  {
    id: "cd-bag-2",
    title: "Olive Green Leather Shoulder Bag",
    headline: "Editorial styling that commands fashion-first feeds.",
    industry: "Fashion & Bags",
    deliverableType: "Ads",
    src: "/designs/bags/02-olive-editorial.png",
    hook: "Subtle studio gradients and smooth drape highlight handcrafted stitching and luxury leather feel.",
    accent: "#65a30d",
    description: "Contemporary earth-tone studio styling designed for high fashion conversions on Meta."
  },

  // --- CANDLES & AMBIANCE ---
  {
    id: "cd-candle-1",
    title: "Amber Glass Botanical Soy Candle",
    headline: "Make warmth look irresistible.",
    industry: "Candles & Ambiance",
    deliverableType: "Product Images",
    src: "/designs/candles/01-amber-warmth.png",
    hook: "Flickering golden flame and dried botanicals convey cozy home warmth and evening relaxation.",
    accent: "#d97706",
    description: "Amber jar candle staged on polished dark marble with warm golden evening illumination."
  },
  {
    id: "cd-candle-2",
    title: "Sculptural Ribbed Ivory Candle",
    headline: "Aesthetic minimalism for modern design lovers.",
    industry: "Candles & Ambiance",
    deliverableType: "Product Images",
    src: "/designs/candles/02-ivory-statement.png",
    hook: "Architectural ribbed wax texture staged in serene neutral studio light for Scandinavian decor brands.",
    accent: "#e2e8f0",
    description: "Clean architectural lighting accentuating geometric pillar ridges for modern home goods."
  },

  // --- HOME DECOR & CERAMICS ---
  {
    id: "cd-decor-1",
    title: "Artisan Sage Ceramic Fluted Vase",
    headline: "Ceramic textures framed in natural morning light.",
    industry: "Home Decor",
    deliverableType: "Product Images",
    src: "/designs/home-decor/01-sage-vase.png",
    hook: "Matte ribbed ceramic with dried botanical stems creates an aspirational modern living aesthetic.",
    accent: "#84cc16",
    description: "Soft window shadows highlighting handmade fluted earthenware in a modern living space."
  },
  {
    id: "cd-decor-2",
    title: "Terracotta Architectural Table Lamp",
    headline: "Ambient warmth that anchors interior design ads.",
    industry: "Home Decor",
    deliverableType: "Product Images",
    src: "/designs/home-decor/02-terracotta-lamp.png",
    hook: "Earthy terracotta curvature paired with soft ambient diffusion to drive home decor bundle sales.",
    accent: "#c2410c",
    description: "Sculptural lamp base with warm diffused lighting, ready for interior and catalog advertising."
  },

  // --- PERFUMES & FRAGRANCES ---
  {
    id: "cd-perfume-1",
    title: "Editorial Ivory Eau de Parfum",
    headline: "Make your fragrance look unforgettable.",
    industry: "Perfumes & Fragrances",
    deliverableType: "Ads",
    src: "/designs/perfumes/perfume_01_editorial_ivory.png",
    hook: "Golden liquid in heavy glass flacon staged on sun-warmed travertine stone and billowing silk.",
    accent: "#ca8a04",
    description: "Luxury perfume bottle on textured Italian stone with liquid transparency and golden cap luster."
  },
  {
    id: "cd-perfume-2",
    title: "Nocturne Signature Burgundy Fragrance",
    headline: "Deep nocturnal mood for statement scents.",
    industry: "Perfumes & Fragrances",
    deliverableType: "Ads",
    src: "/designs/perfumes/perfume_02_signature_burgundy.png",
    hook: "Moody crimson backlight and crystal clarity create an alluring aura of evening luxury.",
    accent: "#881337",
    description: "Seductive backlighting capturing glass density and rich olfactory mood for evening fragrances."
  },

  // --- WATCHES & HOROLOGY ---
  {
    id: "cd-watch-1",
    title: "Midnight Blue Chronograph Detail",
    headline: "Precision engineering captured in cinematic detail.",
    industry: "Watches",
    deliverableType: "Ads",
    src: "/designs/watches/watch_01_midnight_detail.png",
    hook: "Brushed steel bezel, intricate subdials, and electric blue reflection communicate master watchmaking.",
    accent: "#2563eb",
    description: "Macro watch dial highlighting stainless steel brushing, sapphire crystal, and chronograph hands."
  },
  {
    id: "cd-watch-2",
    title: "Rose Gold Executive Dress Watch",
    headline: "Timeless sophistication for discerning professionals.",
    industry: "Watches",
    deliverableType: "Product Images",
    src: "/designs/watches/watch_02_warm_editorial.png",
    hook: "Warm rose gold reflections against dark wood grain highlight timeless luxury wristwear.",
    accent: "#f43f5e",
    description: "Executive study setting highlighting warm rose gold bezel and clean minimalist dress dial."
  },

  // --- SNEAKERS & STREETWEAR ---
  {
    id: "cd-snk-1",
    title: "Cobalt Blue Urban Streetwear Sneaker",
    headline: "Action-oriented angles for youth street culture.",
    industry: "Sneakers & Streetwear",
    deliverableType: "Ads",
    src: "/designs/sneakers/01-cobalt-detail.png",
    hook: "Bold color blocking, premium mesh textures, and dynamic floating perspective grab social attention instantly.",
    accent: "#3b82f6",
    description: "Floating athletic angle designed for high click-through rates on sneaker drops and apparel stores."
  },
  {
    id: "cd-snk-2",
    title: "Lime Neon Performance Runner",
    headline: "High-visibility impact engineered for fitness ads.",
    industry: "Sneakers & Streetwear",
    deliverableType: "Ads",
    src: "/designs/sneakers/02-lime-spotlight.png",
    hook: "Electric neon lime accents with aerodynamic outsole grip spotlighted on dark athletic track.",
    accent: "#84cc16",
    description: "High-contrast neon spotlight framing engineered to stop fitness and runner feeds cold."
  }
];


// --- 3. 4-SLIDE MULTI-PANEL INSTAGRAM CAROUSELS (GROWTH PLAN) ---
export interface CarouselSlide {
  step: string;
  label: string;
  src: string;
  caption: string;
}

export interface CarouselCampaign {
  id: string;
  title: string;
  brand: string;
  category: string;
  badge: string;
  accent: string;
  description: string;
  slides: CarouselSlide[];
}

export const carouselCampaigns: CarouselCampaign[] = [
  {
    id: "fountain-pen",
    title: "Parker Imperial Heritage Fountain Pen",
    brand: "Heritage Writing Instruments",
    category: "Luxury Stationery",
    badge: "4-Slide Narrative Carousel",
    accent: "#06B6D4",
    description: "From photo submission to 4 seamless swipe-through ad slides highlighting 18K gold nib craftsmanship, executive desk setting, and high-converting purchase call-to-action.",
    slides: [
      { step: "Slide 01", label: "Hook & Proof", src: "/carousels/fountain-pen/velocity_fountain_pen_01.png", caption: "Photo you send vs. Visual we create with high-intent ad headline." },
      { step: "Slide 02", label: "Craft & Detail", src: "/carousels/fountain-pen/velocity_fountain_pen_02.png", caption: "Close-up nib precision and gold filigree engraving." },
      { step: "Slide 03", label: "Editorial Staging", src: "/carousels/fountain-pen/velocity_fountain_pen_03.png", caption: "Mahogany executive desk ambiance with handmade parchment." },
      { step: "Slide 04", label: "Conversion CTA", src: "/carousels/fountain-pen/velocity_fountain_pen_04.png", caption: "High-contrast promotional offer and direct checkout button." }
    ]
  },
  {
    id: "headphones",
    title: "Acoustic Pro Wireless Studio Headphones",
    brand: "SonicMaster Audio",
    category: "Tech & Audio",
    badge: "4-Slide Narrative Carousel",
    accent: "#6366F1",
    description: "Multi-slide tech breakdown explaining acoustic memory foam seals, titanium driver hardware, subway commute noise cancellation, and launch discount.",
    slides: [
      { step: "Slide 01", label: "Hook & Proof", src: "/carousels/headphones/Velocity_Headphones_01_Hook.png", caption: "Raw customer studio photo converted into sleek matte ad visual." },
      { step: "Slide 02", label: "Acoustic Detail", src: "/carousels/headphones/Velocity_Headphones_02_Detail.png", caption: "Ultra-soft memory foam earcups and titanium core headband." },
      { step: "Slide 03", label: "Commute Lifestyle", src: "/carousels/headphones/Velocity_Headphones_03_Scene.png", caption: "Active noise-cancelling lifestyle staging on transit commute." },
      { step: "Slide 04", label: "Limited Drop CTA", src: "/carousels/headphones/Velocity_Headphones_04_CTA.png", caption: "Engineered for high swipe-completion and direct add-to-cart clicks." }
    ]
  },
  {
    id: "suitcase",
    title: "Aerolite Polycarbonate Carry-On Luggage",
    brand: "Voyager Luggage",
    category: "Travel & Lifestyle",
    badge: "4-Slide Narrative Carousel",
    accent: "#0EA5E9",
    description: "Engineered for modern frequent flyers: showcases unbreakable ribbed shell, whisper-silent 360 spinner wheels, and overhead cabin compatibility.",
    slides: [
      { step: "Slide 01", label: "Hook & Proof", src: "/carousels/suitcase/Velocity_Suitcase_01_hook.png", caption: "Raw catalog shot transformed into airport departure lounge editorial." },
      { step: "Slide 02", label: "Hardware Detail", src: "/carousels/suitcase/Velocity_Suitcase_02_design_detail.png", caption: "Aviation-grade aluminum corner guards and TSA-approved locks." },
      { step: "Slide 03", label: "Travel Context", src: "/carousels/suitcase/Velocity_Suitcase_03_travel_application.png", caption: "Premium business travel setting with luxury boarding pass styling." },
      { step: "Slide 04", label: "Traveler CTA", src: "/carousels/suitcase/Velocity_Suitcase_04_service_cta.png", caption: "Limited-edition colorway launch CTA with 10-year warranty proof." }
    ]
  },
  {
    id: "sunglasses",
    title: "Riviera Polarized Aviator Sunglasses",
    brand: "Solstice Eyewear",
    category: "Fashion & Eyewear",
    badge: "4-Slide Narrative Carousel",
    accent: "#F59E0B",
    description: "High-AOV fashion carousel contrasting raw optical table photography with Italian coastal sun glare and anti-reflective lens benefits.",
    slides: [
      { step: "Slide 01", label: "Hook & Proof", src: "/carousels/sunglasses/Velocity_Sunglasses_01_hook.png", caption: "Plain white table photo transformed into Mediterranean terrace ad." },
      { step: "Slide 02", label: "Optic Detail", src: "/carousels/sunglasses/Velocity_Sunglasses_02_detail.png", caption: "Precision acetate frame, gold hinge details, and 100% UV400 lenses." },
      { step: "Slide 03", label: "Summer Lifestyle", src: "/carousels/sunglasses/Velocity_Sunglasses_03_lifestyle.png", caption: "Staged on sun-drenched coastal terrace overlooking turquoise waters." },
      { step: "Slide 04", label: "Seasonal CTA", src: "/carousels/sunglasses/Velocity_Sunglasses_04_service_cta.png", caption: "Summer collection promo banner with direct shopping tag." }
    ]
  }
];

// --- 4. 30-SECOND MOTION & VFX COMMERCIAL REELS (VIDEO PLAN) ---
export interface VideoReel {
  id: string;
  title: string;
  brand: string;
  technique: string;
  badge: string;
  src: string;
  accent: string;
  hook: string;
  benefit: string;
}

export const videoReels: VideoReel[] = [
  {
    id: "perfume-silk",
    title: "Midnight Noir Luxury Fragrance Commercial",
    brand: "Maison Privée",
    technique: "Liquid Silk Flow Simulation",
    badge: "30-Sec Motion Reel • Video Plan (₹5,999/mo)",
    src: "/videos/perfume-silk-vfx.mp4",
    accent: "#A855F7",
    hook: "Simulated liquid silk drape with golden flacon reflections engineered to stop luxury fragrance feeds cold.",
    benefit: "Turn static perfume & beauty bottles into hypnotic 30-second reels that boost organic Instagram reach and ad recall."
  },
  {
    id: "sneaker-colour",
    title: "Velocity Cobalt Performance Runner Commercial",
    brand: "AeroSport Athleisure",
    technique: "Neon Shockwave & Speed Ramp VFX",
    badge: "30-Sec Motion Reel • Video Plan (₹5,999/mo)",
    src: "/videos/sneaker-colour-vfx.mp4",
    accent: "#06B6D4",
    hook: "Dynamic color-burst shockwave and rotational camera tracking built for footwear drops and sports releases.",
    benefit: "Create high-energy product launch teasers from standard product photos with custom VFX, sound design and speed ramps."
  }
];

export default function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // States
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<BeforeAfterItem>(beforeAfterList[0]);
  const [activeIndustry, setActiveIndustry] = useState<IndustryFilter>("All");
  const [selectedConcept, setSelectedConcept] = useState<ConceptDesign | null>(null);
  const [activeCarouselId, setActiveCarouselId] = useState<string>("fountain-pen");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const currentCarousel = carouselCampaigns.find((c) => c.id === activeCarouselId) || carouselCampaigns[0];
  const currentSlide = currentCarousel.slides[activeSlideIndex] || currentCarousel.slides[0];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : currentCarousel.slides.length - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev < currentCarousel.slides.length - 1 ? prev + 1 : 0));
  };

  const selectCarousel = (id: string) => {
    setActiveCarouselId(id);
    setActiveSlideIndex(0);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation & escape listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedConcept(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered concepts
  const filteredConcepts = conceptDesigns.filter((item) => {
    if (activeIndustry === "All") return true;
    return item.industry === activeIndustry;
  });


  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const industries: IndustryFilter[] = [
    "All",
    "Food & Beverage",
    "Jewellery & Luxury",
    "Skincare & Beauty",
    "Fashion & Bags",
    "Candles & Ambiance",
    "Home Decor",
    "Perfumes & Fragrances",
    "Watches",
    "Sneakers & Streetwear"
  ];

  return (
    <section id="work" style={{ position: "relative", zIndex: 10, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
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
          <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: 660, margin: "0 auto", lineHeight: 1.6 }}>
            Browse authentic photo-to-campaign transformations, explore our 21+ ready-to-launch creative concepts across 9 industries, and filter by deliverable format.
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* 1. ORIGINAL-PHOTO-TO-FINAL-RESULT PROOF (Side-by-Side)   */}
        {/* ========================================================= */}
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
            marginBottom: 84,
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
                <Sparkles size={14} /> Side-by-Side Proof • 100% Label Accuracy
              </div>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#0F172A" }}>
                {activeBeforeAfter.title}
              </h3>
            </div>

            {/* Example Switcher Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, background: "#F1F5F9", padding: 6, borderRadius: 14 }}>
              {beforeAfterList.map((item) => (
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
              Real Packaging Preserved
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 2. 21+ CAMPAIGN-READY AD CONCEPTS (By Industry)          */}
        {/* ========================================================= */}
        <div style={{ marginBottom: 96 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#06B6D4",
                marginBottom: 8,
              }}
            >
              <Sparkles size={14} /> Flagship Ad Creatives • 9 Categories
            </div>
            <h3 style={{ fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 900, color: "#0F172A", marginBottom: 12 }}>
              21+ Ready-To-Launch Creative Concepts
            </h3>
            <p style={{ color: "#64748B", fontSize: "1rem", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
              Every visual below features the real product photo inset and conversion-driven editorial styling built for Instagram &amp; Meta ad feeds. Click any design to view full campaign details.
            </p>
          </div>

          {/* Industry Filter Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              marginBottom: 36,
              background: "#FFFFFF",
              border: "1px solid rgba(15,23,42,0.08)",
              padding: "8px",
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(15,23,42,0.03)",
            }}
          >
            {industries.map((ind) => {
              const isActive = activeIndustry === ind;
              const count =
                ind === "All"
                  ? conceptDesigns.length
                  : conceptDesigns.filter((c) => c.industry === ind).length;

              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setActiveIndustry(ind)}
                  style={{
                    background: isActive ? "linear-gradient(135deg, #06B6D4, #6366F1)" : "transparent",
                    color: isActive ? "#FFFFFF" : "#64748B",
                    border: "none",
                    borderRadius: 12,
                    padding: "8px 16px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: isActive ? "0 4px 14px rgba(6,182,212,0.28)" : "none",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>{ind}</span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      padding: "2px 6px",
                      borderRadius: 6,
                      background: isActive ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.06)",
                      color: isActive ? "#FFFFFF" : "#475569",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Concepts Grid: 4:5 vertical ad format cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 24,
            }}
          >
            {filteredConcepts.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedConcept(item)}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 22,
                  border: "1px solid rgba(15,23,42,0.09)",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.04)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 18px 38px rgba(15,23,42,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,23,42,0.04)";
                }}
              >
                {/* 4:5 Portrait Creative Image Area */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    background: "#0F172A",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.4s ease",
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      right: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(15,23,42,0.85)",
                        backdropFilter: "blur(8px)",
                        color: "#FFFFFF",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: 8,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {item.industry}
                    </span>

                    <span
                      style={{
                        background: "rgba(6,182,212,0.9)",
                        color: "#FFFFFF",
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        padding: "4px 8px",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Sparkles size={10} /> Ad Concept
                    </span>
                  </div>

                  {/* Hover Inspect Indicator */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.92)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0F172A",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    title="Click to view full ad"
                  >
                    <Maximize2 size={16} />
                  </div>
                </div>

                {/* Card Text Content */}
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div
                    style={{
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: item.accent,
                      marginBottom: 4,
                    }}
                  >
                    {item.headline}
                  </div>
                  <h4 style={{ fontSize: "0.98rem", fontWeight: 800, color: "#0F172A", marginBottom: 6, lineHeight: 1.3 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.45, marginTop: "auto" }}>
                    {item.hook}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. MULTI-SLIDE CAROUSEL CAMPAIGNS (GROWTH PLAN)          */}
        {/* ========================================================= */}
        <div style={{ marginBottom: 96 }} id="carousels-showcase">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(14,165,233,0.08)",
                border: "1px solid rgba(14,165,233,0.2)",
                color: "#0284C7",
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              <Layers size={13} />
              Included in Growth &amp; Video Plans
            </div>
            <h3
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                color: "#0F172A",
                marginBottom: 12,
                lineHeight: 1.15,
              }}
            >
              High-Converting <span className="gt">4-Slide Carousels</span>
            </h3>
            <p
              style={{
                color: "#64748B",
                fontSize: "clamp(0.92rem, 1.2vw, 1.05rem)",
                maxWidth: 680,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Multi-slide visual storytelling engineered to maximize swipe-through retention, explain product benefits, and drive direct add-to-cart clicks.
            </p>

            {/* Carousel Product Selector Tabs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
                marginTop: 24,
              }}
            >
              {carouselCampaigns.map((c) => {
                const isSelected = c.id === activeCarouselId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectCarousel(c.id)}
                    style={{
                      background: isSelected ? "#0F172A" : "#FFFFFF",
                      color: isSelected ? "#FFFFFF" : "#475569",
                      border: isSelected ? "1px solid #0F172A" : "1px solid rgba(15,23,42,0.1)",
                      borderRadius: 14,
                      padding: "10px 18px",
                      fontSize: "0.86rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: isSelected ? "0 8px 24px rgba(15,23,42,0.18)" : "0 2px 8px rgba(15,23,42,0.03)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: c.accent,
                        boxShadow: isSelected ? `0 0 10px ${c.accent}` : "none",
                      }}
                    />
                    <span>{c.brand}</span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "2px 7px",
                        borderRadius: 6,
                        background: isSelected ? "rgba(255,255,255,0.15)" : "#F1F5F9",
                        color: isSelected ? "#FFFFFF" : "#64748B",
                        fontWeight: 800,
                      }}
                    >
                      4 Slides
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Carousel Viewer Box */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 28,
              border: "1px solid rgba(15,23,42,0.09)",
              boxShadow: "0 20px 50px rgba(15,23,42,0.06)",
              padding: "clamp(18px, 3.5vw, 36px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "clamp(24px, 4vw, 48px)",
              alignItems: "center",
            }}
          >
            {/* Left: Active Slide Preview with Navigation */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  background: "#0F172A",
                  boxShadow: "0 14px 40px rgba(15,23,42,0.16)",
                  border: `2px solid ${currentCarousel.accent}`,
                  cursor: "pointer",
                }}
                onClick={() =>
                  setSelectedConcept({
                    id: `carousel-${currentCarousel.id}-${activeSlideIndex}`,
                    title: `${currentCarousel.title} (${currentSlide.step}: ${currentSlide.label})`,
                    industry: "Fashion & Bags",
                    headline: currentSlide.label,
                    hook: currentSlide.caption,
                    deliverableType: "Ads",
                    accent: currentCarousel.accent,
                    src: currentSlide.src,
                    description: currentCarousel.description,
                  })
                }
              >
                <img
                  src={currentSlide.src}
                  alt={currentSlide.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Top Badge: Slide Counter */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: "rgba(15,23,42,0.85)",
                    backdropFilter: "blur(10px)",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "5px 12px",
                    borderRadius: 999,
                    letterSpacing: "0.04em",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Layers size={13} color={currentCarousel.accent} />
                  <span>{currentSlide.step} of 04</span>
                </div>

                {/* Top Right: Tap to Expand */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "rgba(15,23,42,0.8)",
                    backdropFilter: "blur(8px)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "5px 10px",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Maximize2 size={12} /> Full Size
                </div>

                {/* Bottom Caption Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "16px 18px",
                    background: "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 70%, transparent 100%)",
                    color: "#FFFFFF",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: currentCarousel.accent,
                      marginBottom: 2,
                    }}
                  >
                    {currentSlide.label}
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#F1F5F9", lineHeight: 1.4 }}>
                    {currentSlide.caption}
                  </div>
                </div>

                {/* Prev / Next Slide Navigation Arrows */}
                <button
                  type="button"
                  aria-label="Previous Slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevSlide();
                  }}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  aria-label="Next Slide"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextSlide();
                  }}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress Dots */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 14,
                }}
              >
                {currentCarousel.slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Jump to slide ${i + 1}`}
                    onClick={() => setActiveSlideIndex(i)}
                    style={{
                      width: i === activeSlideIndex ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: i === activeSlideIndex ? currentCarousel.accent : "#CBD5E1",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Campaign Strategy & Slide Thumbnails */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: currentCarousel.accent,
                  marginBottom: 6,
                }}
              >
                {currentCarousel.category} • {currentCarousel.brand}
              </div>

              <h4
                style={{
                  fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                  fontWeight: 900,
                  color: "#0F172A",
                  marginBottom: 10,
                  lineHeight: 1.25,
                }}
              >
                {currentCarousel.title}
              </h4>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#475569",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {currentCarousel.description}
              </p>

              {/* 4 Slide Selectable Cards */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#64748B",
                    marginBottom: 10,
                  }}
                >
                  Step-by-step Storytelling Architecture:
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 10,
                  }}
                >
                  {currentCarousel.slides.map((s, idx) => {
                    const isSlideActive = idx === activeSlideIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 14,
                          background: isSlideActive ? "rgba(15,23,42,0.04)" : "#F8FAFC",
                          border: isSlideActive
                            ? `2px solid ${currentCarousel.accent}`
                            : "1px solid rgba(15,23,42,0.08)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 45,
                            borderRadius: 6,
                            overflow: "hidden",
                            flexShrink: 0,
                            background: "#0F172A",
                          }}
                        >
                          <img
                            src={s.src}
                            alt={s.label}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 800,
                              color: isSlideActive ? currentCarousel.accent : "#64748B",
                            }}
                          >
                            {s.step}
                          </div>
                          <div
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 800,
                              color: "#0F172A",
                              lineHeight: 1.2,
                            }}
                          >
                            {s.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Inclusion & CTA */}
              <div
                style={{
                  background: "#F8FAFC",
                  borderRadius: 16,
                  padding: "16px 20px",
                  border: "1px solid rgba(15,23,42,0.06)",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#0F172A" }}>
                    Included in Growth Plan (₹3,499/mo)
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B" }}>
                    8 static creatives + 1 full 4–5 slide carousel per month
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="btn-primary"
                  style={{
                    padding: "10px 18px",
                    borderRadius: 10,
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Request Carousel Campaign <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. 30-SECOND MOTION & VFX VIDEO COMMERCIALS (VIDEO PLAN)  */}
        {/* ========================================================= */}
        <div style={{ marginBottom: 96 }} id="video-ads-showcase">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(168,85,247,0.08)",
                border: "1px solid rgba(168,85,247,0.2)",
                color: "#7E22CE",
                fontSize: "0.74rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              <Film size={13} />
              Included in ₹5,999/mo Video Plan
            </div>
            <h3
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.025em",
                color: "#0F172A",
                marginBottom: 12,
                lineHeight: 1.15,
              }}
            >
              30-Second <span className="gt">Motion &amp; VFX Video Reels</span>
            </h3>
            <p
              style={{
                color: "#64748B",
                fontSize: "clamp(0.92rem, 1.2vw, 1.05rem)",
                maxWidth: 680,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              High-impact 9:16 vertical motion reels edited from client-provided product photos and footage, enhanced with custom 3D simulations and sound design.
            </p>
          </div>

          {/* 2-Column Vertical Video Reels Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
              gap: "clamp(24px, 4vw, 36px)",
            }}
          >
            {videoReels.map((reel) => (
              <div
                key={reel.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 28,
                  border: "1px solid rgba(15,23,42,0.08)",
                  boxShadow: "0 18px 48px rgba(15,23,42,0.06)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* 9:16 Vertical Video Container */}
                <div
                  style={{
                    position: "relative",
                    background: "#000000",
                    aspectRatio: "9 / 16",
                    maxHeight: 520,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <video
                    src={reel.src}
                    playsInline
                    loop
                    controls
                    preload="metadata"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      background: "#000",
                    }}
                  />

                  {/* Top Badge: Technique Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      background: "rgba(15,23,42,0.85)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "5px 12px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: reel.accent,
                        boxShadow: `0 0 8px ${reel.accent}`,
                      }}
                    />
                    {reel.technique}
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: reel.accent,
                      marginBottom: 4,
                    }}
                  >
                    {reel.brand}
                  </div>

                  <h4
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 900,
                      color: "#0F172A",
                      marginBottom: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {reel.title}
                  </h4>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#475569",
                      lineHeight: 1.55,
                      marginBottom: 16,
                    }}
                  >
                    {reel.hook}
                  </p>

                  <div
                    style={{
                      padding: "10px 14px",
                      background: "#F8FAFC",
                      borderRadius: 12,
                      fontSize: "0.78rem",
                      color: "#64748B",
                      border: "1px solid rgba(15,23,42,0.06)",
                      marginBottom: 18,
                    }}
                  >
                    <strong>Plan Benefit:</strong> {reel.benefit}
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        fontSize: "0.74rem",
                        fontWeight: 800,
                        color: "#059669",
                        background: "rgba(16,185,129,0.1)",
                        padding: "4px 10px",
                        borderRadius: 999,
                      }}
                    >
                      Video Plan • ₹5,999/mo
                    </span>

                    <button
                      type="button"
                      onClick={() => go("contact")}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#0F172A",
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      Order Reel <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. MODAL: FULL PREVIEW FOR 21 CAMPAIGN AD DESIGNS        */}
      {/* ========================================================= */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedConcept && (
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
                  padding: "clamp(12px, 3vw, 28px)",
                }}
                onClick={() => setSelectedConcept(null)}
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
                    maxWidth: 960,
                    width: "100%",
                    maxHeight: "92vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Modal Header with Back Button */}
                  <div
                    style={{
                      padding: "16px 22px",
                      borderBottom: "1px solid rgba(15,23,42,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedConcept(null)}
                      style={{
                        background: "#F1F5F9",
                        border: "1px solid rgba(15,23,42,0.1)",
                        borderRadius: 10,
                        padding: "8px 14px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#0F172A",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <ArrowLeft size={14} /> Back to Gallery
                    </button>

                    <div style={{ textAlign: "center", flexGrow: 1, minWidth: 0, padding: "0 10px" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#06B6D4",
                          marginRight: 6,
                        }}
                      >
                        {selectedConcept.industry}
                      </span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0F172A" }}>
                        • {selectedConcept.title}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedConcept(null)}
                      style={{
                        background: "#F1F5F9",
                        border: "none",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "#64748B",
                        flexShrink: 0,
                      }}
                      title="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Modal Body: 2-column image + details */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
                      overflowY: "auto",
                      maxHeight: "calc(92vh - 70px)",
                    }}
                  >
                    {/* Left: Full Creative Image */}
                    <div
                      style={{
                        background: "#0F172A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 16,
                      }}
                    >
                      <img
                        src={selectedConcept.src}
                        alt={selectedConcept.title}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "72vh",
                          objectFit: "contain",
                          borderRadius: 14,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                        }}
                      />
                    </div>

                    {/* Right: Hook Rationale & Order Action */}
                    <div
                      style={{
                        padding: "clamp(20px, 3vw, 32px)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: "#FFFFFF",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: selectedConcept.accent,
                            marginBottom: 8,
                          }}
                        >
                          Campaign Hook
                        </div>
                        <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0F172A", marginBottom: 12, lineHeight: 1.25 }}>
                          “{selectedConcept.headline}”
                        </h3>
                        <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: 20 }}>
                          {selectedConcept.hook}
                        </p>

                        <div style={{ background: "#F8FAFC", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 16, padding: "16px", marginBottom: 20 }}>
                          <div style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A", marginBottom: 6 }}>
                            Production Breakdown
                          </div>
                          <div style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.5 }}>
                            {selectedConcept.description}
                          </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.82rem", color: "#64748B", marginBottom: 24 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Check size={14} color="#10B981" /> Formatted in 4:5 vertical portrait for Meta &amp; Instagram
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Check size={14} color="#10B981" /> Picture-in-picture proof showing your original photo
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Check size={14} color="#10B981" /> High-converting visual hooks and call-to-action layout
                          </div>
                        </div>
                      </div>

                      {/* Modal CTA */}
                      <div style={{ borderTop: "1px solid rgba(15,23,42,0.08)", paddingTop: 18, display: "flex", flexWrap: "wrap", gap: 12 }}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedConcept(null);
                            go("contact");
                          }}
                          className="btn-primary"
                          style={{
                            padding: "14px 24px",
                            borderRadius: 12,
                            fontSize: "0.9rem",
                            fontWeight: 800,
                            cursor: "pointer",
                            flexGrow: 1,
                            textAlign: "center",
                          }}
                        >
                          Request Similar Ad for ₹999 <ArrowRight size={15} style={{ display: "inline", marginLeft: 6 }} />
                        </button>
                      </div>
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
