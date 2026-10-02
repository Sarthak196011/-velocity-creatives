"use client";

const channels = [
  "INSTAGRAM REELS",
  "FACEBOOK ADS",
  "SHORT VIDEO ADS",
  "PRODUCT CAROUSELS",
  "3D PRODUCT RENDERS",
  "HIGH-CLICK HOOKS",
  "TIKTOK ADS",
  "YOUTUBE SHORTS"
];

export default function BrandTicker() {
  return (
    <div style={{ position: "relative", zIndex: 10, padding: "26px 0", overflow: "hidden", borderTop: "1px solid rgba(15,23,42,0.06)", borderBottom: "1px solid rgba(15,23,42,0.06)", background: "rgba(255,255,255,0.5)" }}>
      <p style={{ textAlign: "center", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#64748B", marginBottom: 16 }}>
        Made Specifically For High-Converting Social Ads
      </p>
      <div style={{ display: "flex", overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
        <div className="ticker-track">
          {[...channels, ...channels].map((c, i) => (
            <span key={i} style={{ fontSize: "0.92rem", fontWeight: 800, color: "#94A3B8", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
