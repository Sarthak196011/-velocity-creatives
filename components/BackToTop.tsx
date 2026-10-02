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
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(15, 23, 42, 0.1)",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.12)",
            color: "#0F172A",
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
            background: "linear-gradient(135deg, #06B6D4, #6366F1)",
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
