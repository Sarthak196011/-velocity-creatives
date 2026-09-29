"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 380);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          aria-label="Back to top"
          style={{
            position: "fixed",
            bottom: 24,
            right: 20,
            zIndex: 90,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(18, 14, 34, 0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(168, 85, 247, 0.45)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(124, 58, 237, 0.3)",
            color: "#fff",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "transform 0.2s ease, border-color 0.2s ease",
          }}
        >
          <div style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <ArrowUp size={13} color="#fff" />
          </div>
          <span>Home</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
