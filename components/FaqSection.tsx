"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What do you need from me to start?",
    a: "Just your product photos, website link, and any logo or brand colors you have. We take care of all the writing, design, and video editing from start to finish."
  },
  {
    q: "How quickly will I receive my first ads?",
    a: "Your first batch of ads will be delivered to you within 7 business days of signing up. After that, any edits or revisions take only 24 to 48 hours."
  },
  {
    q: "Can I request changes if I want something adjusted?",
    a: "Yes, of course! We want you to love your ads. Starter includes 2 rounds of revisions, while Growth and Pro include unlimited revisions."
  },
  {
    q: "Can you work with our existing media buyer or marketing manager?",
    a: "Yes, absolutely. We can work directly with your media buyer or founder via WhatsApp or Slack. We deliver all creative files formatted and ready to upload directly into your Meta or TikTok ad accounts."
  },
  {
    q: "Are there any long-term contracts?",
    a: "No contracts at all. All plans are simple month-to-month subscriptions. You can pause or cancel anytime with a quick 14-day notice."
  },
  {
    q: "Who owns the ads once they are delivered?",
    a: "You do. 100% of the image designs, video cuts, and copy belong completely to you to use wherever you want."
  }
];

export default function FaqSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ position: "relative", zIndex: 10, padding: "120px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Frequently Asked Questions
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Simple Answers to <span className="gt">Common Questions.</span>
          </h2>
          <p style={{ color: "rgba(232,232,240,0.6)", fontSize: "1.08rem", lineHeight: 1.6 }}>
            Everything you need to know about working with us.
          </p>
        </motion.div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  background: isOpen ? "rgba(20, 15, 38, 0.75)" : "rgba(12, 12, 22, 0.5)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 18,
                  border: `1px solid ${isOpen ? "rgba(124, 58, 237, 0.35)" : "rgba(255,255,255,0.06)"}`,
                  overflow: "hidden",
                  transition: "all 0.3s ease"
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "24px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left"
                  }}
                >
                  <span style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 700, paddingRight: 16 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: isOpen ? "rgba(124, 58, 237, 0.2)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isOpen ? "rgba(124, 58, 237, 0.4)" : "rgba(255,255,255,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isOpen ? "#a855f7" : "rgba(232,232,240,0.6)",
                    flexShrink: 0
                  }}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div style={{ padding: "0 28px 26px", color: "rgba(232,232,240,0.75)", fontSize: "0.95rem", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 18 }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
