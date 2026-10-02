"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function IntroExperience() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("vc_intro_seen");
    if (hasSeen === "true") {
      setVisible(false);
    }
  }, []);

  const handleFinish = () => {
    try {
      sessionStorage.setItem("vc_intro_seen", "true");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  // Sound ALWAYS ON & Bullet-Proof Autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay with sound succeeded
          video.muted = false;
          video.volume = 1.0;
        })
        .catch(() => {
          // If browser policy strictly requires a user gesture for audio,
          // play with muted fallback so visual is NEVER delayed or black,
          // and instantly unmute on first gesture anywhere on screen
          video.muted = true;
          video.play().catch(() => {});

          const unmute = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener("pointerdown", unmute);
            window.removeEventListener("click", unmute);
            window.removeEventListener("touchstart", unmute);
            window.removeEventListener("keydown", unmute);
          };

          window.addEventListener("pointerdown", unmute, { once: true });
          window.addEventListener("click", unmute, { once: true });
          window.addEventListener("touchstart", unmute, { once: true });
          window.addEventListener("keydown", unmute, { once: true });
        });
    }
  }, []);

  // Keyboard shortcut: Escape or Enter to skip
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
            scale: 1.06,
            filter: "blur(14px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
            }
          }}
          onPointerDown={() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
            }
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
          {/* Fullscreen Background Video - 100% VISIBLE ALWAYS */}
          <video
            ref={videoRef}
            src="/velocity-intro.mp4"
            poster="/velocity-intro-poster.png"
            autoPlay
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleFinish}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              display: "block",
            }}
          />

          {/* Subtle Bottom Shade for Text Readability Only (Keeps Video 100% Bright) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "linear-gradient(to top, rgba(3, 2, 6, 0.85) 0%, rgba(3, 2, 6, 0.3) 35%, transparent 60%)",
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
                background: "rgba(10, 8, 22, 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
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
                  filter: "drop-shadow(0 0 8px #06B6D4)",
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
                Velocity <span className="gt">Creatives</span>
              </span>
            </div>

            {/* Skip Intro Button */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFinish();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "linear-gradient(135deg, #06B6D4, #6366F1)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 20px rgba(6, 182, 212, 0.4)",
                  color: "#fff",
                  padding: "9px 22px",
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
                color: "#06B6D4",
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
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: 999,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #06B6D4, #6366F1)",
                  boxShadow: "0 0 10px #06B6D4",
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
