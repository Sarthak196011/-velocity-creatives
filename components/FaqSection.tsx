"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What do you need from me to start?",
    a: "You provide the product details, offers and approved text. We handle the design and layout. Ask us about copywriting before booking if you need it."
  },
  {
    q: "Will my product still look like the real product?",
    a: "We’ll ask you to review product shape, colours, packaging, labels and claims before approving the final visuals."
  },
  {
    q: "How quickly will I receive my visuals?",
    a: "Your delivery date is confirmed after we review your brief and receive the required assets."
  },
  {
    q: "Is there a trial before committing to a monthly plan?",
    a: "Yes! We offer our ₹999 Starter Trial Pack for 2 custom static ad images with zero monthly commitment. You can test our speed and creative quality on your brand before choosing a monthly package."
  },
  {
    q: "Do I supply video footage or do you create videos from photos?",
    a: "Both options are supported. You can supply your own raw video clips for commercial editing and hook text overlays, or we can animate dynamic motion visuals and reels directly from your high-resolution static product photos."
  },
  {
    q: "Can I request changes if I want something adjusted?",
    a: "Yes! Every deliverable batch includes 1 comprehensive revision round to adjust text, visual hooks, or layout balance before you publish."
  },
  {
    q: "Are there any long-term contracts?",
    a: "No contracts at all. All plans are simple month-to-month subscriptions that you can pause or cancel anytime."
  },
  {
    q: "Who owns the visuals once they are delivered?",
    a: "You do. You receive 100% full commercial rights and ownership of all final image designs, carousel files, and video edits."
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
          style={{ textAlign: "center", marginBottom: 54 }}
        >
          <div className="eyebrow" style={{ marginBottom: 18, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Frequently Asked Questions
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            Simple Answers to <span className="gt">Common Questions.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.08rem", lineHeight: 1.6 }}>
            Everything you need to know about our packages, deliverables, and process.
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
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 18,
                  border: `1px solid ${isOpen ? "#06B6D4" : "rgba(15,23,42,0.08)"}`,
                  boxShadow: isOpen ? "0 8px 30px rgba(6,182,212,0.08)" : "0 2px 10px rgba(15,23,42,0.03)",
                  overflow: "hidden",
                  transition: "all 0.3s ease"
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "22px 26px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left"
                  }}
                >
                  <span style={{ color: "#0F172A", fontSize: "1.02rem", fontWeight: 700, paddingRight: 16 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: isOpen ? "rgba(6,182,212,0.1)" : "#F1F5F9",
                    border: `1px solid ${isOpen ? "rgba(6,182,212,0.3)" : "rgba(15,23,42,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isOpen ? "#06B6D4" : "#64748B",
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
                      <div style={{ padding: "0 26px 24px", color: "#64748B", fontSize: "0.94rem", lineHeight: 1.7, borderTop: "1px solid rgba(15,23,42,0.06)", paddingTop: 16 }}>
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
