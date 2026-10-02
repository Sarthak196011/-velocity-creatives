"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ArrowRight, Play } from "lucide-react";

export default function IntroExperience() {
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user already completed the intro in this session
    const hasSeen = sessionStorage.getItem("vc_intro_seen");
    if (hasSeen === "true") {
      setVisible(false);
    }
  }, []);

  const handleFinish = () => {
    try {
      sessionStorage.setItem("vc_intro_seen", "true");
    } catch {
      // ignore in restricted mode
    }
    setVisible(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !muted;
      videoRef.current.muted = nextMuted;
      setMuted(nextMuted);
    }
  };

  // Keyboard shortcut: Escape or Space to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(14px)",
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "#030206",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Fullscreen Background Video */}
          <video
            ref={videoRef}
            src="/velocity-intro.mp4"
            autoPlay
            playsInline
            muted={muted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleFinish}
            onCanPlay={() => setVideoLoaded(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />

          {/* Cinematic Vignette Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "radial-gradient(ellipse at center, rgba(6, 5, 14, 0.15) 0%, rgba(6, 5, 14, 0.85) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Top Header Controls Bar */}
          <div
            style={{
              position: "absolute",
              top: "max(24px, env(safe-area-inset-top, 24px))",
              left: "max(24px, env(safe-area-inset-left, 24px))",
              right: "max(24px, env(safe-area-inset-right, 24px))",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Brand Mark */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(10, 8, 22, 0.7)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "8px 18px",
                borderRadius: 999,
              }}
            >
              <img
                src="/velocity-logo-v.png"
                alt="Velocity Creatives"
                style={{
                  width: 28,
                  height: 28,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 8px #38bdf8)",
                }}
              />
              <span
                style={{
                  color: "#fff",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Velocity <span style={{ color: "#38bdf8" }}>Creatives</span>
              </span>
            </div>

            {/* Sound & Skip Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Unmute / Mute Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Unmute sound" : "Mute sound"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: muted ? "rgba(10, 8, 22, 0.75)" : "rgba(56, 189, 248, 0.2)",
                  backdropFilter: "blur(16px)",
                  border: muted ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(56, 189, 248, 0.6)",
                  color: muted ? "#e2e8f0" : "#38bdf8",
                  padding: "9px 16px",
                  borderRadius: 999,
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{muted ? "Turn Sound On" : "Sound Active"}</span>
              </button>

              {/* Skip Intro Button */}
              <button
                type="button"
                onClick={handleFinish}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "linear-gradient(135deg, rgba(124, 58, 237, 0.9), rgba(56, 189, 248, 0.9))",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 0 24px rgba(124, 58, 237, 0.5)",
                  color: "#fff",
                  padding: "9px 20px",
                  borderRadius: 999,
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
              >
                <span>Skip Intro</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Bottom Title & Progress Bar */}
          <div
            style={{
              position: "absolute",
              bottom: "max(28px, env(safe-area-inset-bottom, 28px))",
              left: "max(24px, env(safe-area-inset-left, 24px))",
              right: "max(24px, env(safe-area-inset-right, 24px))",
              zIndex: 10,
              maxWidth: 760,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "0.76rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(56, 189, 248, 0.85)",
                marginBottom: 6,
              }}
            >
              High-Converting AI Video Production
            </div>
            <h2
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: 16,
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              }}
            >
              Ads Built to Stop the Scroll & Drive Sales.
            </h2>

            {/* Glowing Linear Progress Bar */}
            <div
              style={{
                width: "100%",
                height: 3,
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: 999,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #7c3aed, #38bdf8)",
                  boxShadow: "0 0 10px #38bdf8",
                  transition: "width 0.1s linear",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
