"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo, useEffect } from "react";
import { 
  Clock, Video, CheckCircle, ShieldCheck, ArrowRight, 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, Phone,
  Mail, Loader2, Sparkles, Check
} from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Tab mode: "trial" (Short Form) or "meeting" (Calendar Call)
  const [activeTab, setActiveTab] = useState<"trial" | "meeting">("trial");

  // Optional call checkbox inside trial short form
  const [wantsCall, setWantsCall] = useState(false);

  // Current viewed month in calendar
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Selected meeting date (defaults to tomorrow or next business day)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  });

  // Selected meeting time
  const [selectedTime, setSelectedTime] = useState<string>("2:30 PM");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    brandUrl: "",
    creativeNeed: "Trial Pack — ₹999 (2 Static Creatives, No Commitment)",
    requiredContent: "",
  });

  // Booking process states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Booked slots from backend to prevent double-booking
  const [bookedSlots, setBookedSlots] = useState<Array<{ date: string; time: string; normalizedDate?: string }>>([]);

  const fetchBookedSlots = () => {
    fetch("/api/book-meeting")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedSlots) {
          setBookedSlots(data.bookedSlots);
        }
      })
      .catch((err) => console.error("Could not fetch booked slots:", err));
  };

  useEffect(() => {
    fetchBookedSlots();
  }, []);

  // Listen to custom event from pricing cards
  useEffect(() => {
    const handleSelectPackage = (e: any) => {
      const pkg = e.detail;
      if (pkg.includes("Trial")) {
        setActiveTab("trial");
        setFormData((prev) => ({ ...prev, creativeNeed: "Trial Pack — ₹999 (2 Static Creatives, No Commitment)" }));
      } else {
        setActiveTab("meeting");
        setFormData((prev) => ({ ...prev, creativeNeed: pkg }));
      }
    };
    window.addEventListener("select-package-preference", handleSelectPackage);
    return () => window.removeEventListener("select-package-preference", handleSelectPackage);
  }, []);

  // Calendar logic
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString("en-US", { month: "long" });

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const isSlotBookedForCurrentDate = (timeStr: string) => {
    if (!selectedDate) return false;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const norm = `${year}-${month}-${day}`;
    return bookedSlots.some(
      (b) => (b.normalizedDate === norm || b.date === formattedSelectedDate) && b.time.trim() === timeStr.trim()
    );
  };

  const prevMonth = () => {
    if (isCurrentMonth) return;
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Formatted selected date string
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }, [selectedDate]);

  const availableTimeSlots = [
    "10:00 AM",
    "11:30 AM",
    "2:00 PM",
    "3:30 PM",
    "5:00 PM",
    "6:30 PM"
  ];

  // Auto-switch to next available free slot if current time is booked
  useEffect(() => {
    if (selectedDate && isSlotBookedForCurrentDate(selectedTime)) {
      const firstAvailable = availableTimeSlots.find((t) => !isSlotBookedForCurrentDate(t));
      if (firstAvailable) {
        setSelectedTime(firstAvailable);
      }
    }
  }, [selectedDate, bookedSlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const isTrialDirect = activeTab === "trial" && !wantsCall;
    const bookingDate = isTrialDirect ? "Trial Brief (No Call Required)" : formattedSelectedDate;
    const bookingTime = isTrialDirect ? "Asynchronous" : selectedTime;
    const noteNeed = activeTab === "trial" 
      ? `Trial Pack — ₹999 | Needs: ${formData.requiredContent || "2 Static Ad Creatives"}`
      : formData.creativeNeed;

    try {
      const response = await fetch("/api/book-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          brandUrl: formData.brandUrl,
          creativeNeed: noteNeed,
          date: bookingDate,
          time: bookingTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setBookingResult(data);
      setBooked(true);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBooked(false);
    setBookingResult(null);
    setSubmitError(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      brandUrl: "",
      creativeNeed: "Trial Pack — ₹999 (2 Static Creatives, No Commitment)",
      requiredContent: "",
    });
  };

  return (
    <section id="contact" style={{ position: "relative", zIndex: 10, padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 44 }}
        >
          <div className="eyebrow" style={{ marginBottom: 18, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Get Started
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#0F172A", marginBottom: 16 }}>
            Ready to Upgrade <span className="gt">Your Product Visuals?</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1.08rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
            Start with our ₹999 trial pack (2 custom static ad images with no commitment) or schedule a call to discuss our monthly packages.
          </p>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: "inline-flex",
              background: "#FFFFFF",
              border: "1px solid rgba(15,23,42,0.1)",
              borderRadius: 16,
              padding: 6,
              boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
              marginTop: 28,
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("trial")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: activeTab === "trial" ? "linear-gradient(135deg, #06B6D4, #6366F1)" : "transparent",
                color: activeTab === "trial" ? "#FFFFFF" : "#64748B",
                border: "none",
                borderRadius: 12,
                padding: "10px 20px",
                fontSize: "0.88rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: activeTab === "trial" ? "0 4px 15px rgba(6,182,212,0.3)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              <Sparkles size={14} /> Request the ₹999 Trial (Quick Form)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("meeting")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: activeTab === "meeting" ? "linear-gradient(135deg, #06B6D4, #6366F1)" : "transparent",
                color: activeTab === "meeting" ? "#FFFFFF" : "#64748B",
                border: "none",
                borderRadius: 12,
                padding: "10px 20px",
                fontSize: "0.88rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: activeTab === "meeting" ? "0 4px 15px rgba(6,182,212,0.3)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              <CalendarIcon size={14} /> Discuss Your Trial / Monthly Plans (Call)
            </button>
          </div>
        </motion.div>

        {/* Form Container */}
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              background: "#FFFFFF",
              borderRadius: 28,
              border: "1px solid rgba(15,23,42,0.1)",
              padding: "clamp(24px, 4vw, 44px)",
              boxShadow: "0 10px 40px rgba(15,23,42,0.05)",
            }}
          >
            <AnimatePresence mode="wait">
              {booked ? (
                /* Success Confirmation State */
                <motion.div
                  key="booked-state"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  style={{ textAlign: "center", padding: "30px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.12)",
                      border: "2px solid #10B981",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#10B981",
                    }}
                  >
                    <CheckCircle size={38} />
                  </div>

                  <div>
                    <h3 style={{ color: "#0F172A", fontSize: "1.75rem", fontWeight: 900, marginBottom: 8 }}>
                      Request Received!
                    </h3>
                    <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 440, margin: "0 auto" }}>
                      Thank you, <strong>{formData.name}</strong>. We have received your submission for <strong>{formData.brandUrl}</strong>.
                    </p>
                  </div>

                  <div style={{ background: "#F8FAFC", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 16, padding: "16px 20px", maxWidth: 460, width: "100%", textAlign: "left", fontSize: "0.85rem", color: "#475569", lineHeight: 1.6 }}>
                    <div>✓ Reference ID: <strong>{bookingResult?.bookingId || "VC-PENDING"}</strong></div>
                    <div>✓ Confirmation sent to: <strong>{formData.email}</strong></div>
                    <div>✓ Delivery policy: <strong>Your delivery date is confirmed after we review your brief and receive required assets.</strong></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      background: "#F1F5F9",
                      border: "1px solid rgba(15,23,42,0.12)",
                      borderRadius: 12,
                      padding: "12px 28px",
                      color: "#0F172A",
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      marginTop: 6,
                    }}
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                /* Active Form */
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  
                  {/* Header within form */}
                  <div>
                    <h3 style={{ color: "#0F172A", fontSize: "1.45rem", fontWeight: 800, marginBottom: 6 }}>
                      {activeTab === "trial" ? "Request the ₹999 Starter Trial" : "Discuss Your Trial & Monthly Packages"}
                    </h3>
                    <p style={{ color: "#64748B", fontSize: "0.9rem" }}>
                      {activeTab === "trial"
                        ? "Get 2 custom static ad images for your product. Test our speed and creative quality with zero subscription lock-in."
                        : "Pick a time slot for a 15–30 minute Zoom conversation with our creative team to review your store and choose the right package."}
                    </p>
                  </div>

                  {submitError && (
                    <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: 12, padding: "12px 16px", color: "#EF4444", fontSize: "0.86rem" }}>
                      {submitError}
                    </div>
                  )}

                  {/* Row 1: Name & Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A", marginBottom: 6 }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        style={{ width: "100%", background: "#F8F9FA", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 12, padding: "13px 14px", color: "#0F172A", fontSize: "0.9rem", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A", marginBottom: 6 }}>
                        Phone / WhatsApp No. *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        style={{ width: "100%", background: "#F8F9FA", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 12, padding: "13px 14px", color: "#0F172A", fontSize: "0.9rem", outline: "none" }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Product Link */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A", marginBottom: 6 }}>
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@yourbrand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        style={{ width: "100%", background: "#F8F9FA", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 12, padding: "13px 14px", color: "#0F172A", fontSize: "0.9rem", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A", marginBottom: 6 }}>
                        Product Link or Store URL *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="yourstore.com or instagram.com/brand"
                        value={formData.brandUrl}
                        onChange={(e) => setFormData({ ...formData, brandUrl: e.target.value })}
                        disabled={isSubmitting}
                        style={{ width: "100%", background: "#F8F9FA", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 12, padding: "13px 14px", color: "#0F172A", fontSize: "0.9rem", outline: "none" }}
                      />
                    </div>
                  </div>

                  {/* Package Choice or Required Content */}
                  {activeTab === "trial" ? (
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A", marginBottom: 6 }}>
                        Required Content &amp; Visual Goal (Optional details)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Need 2 static ad images for our new skincare moisturizer to test Instagram feed ads"
                        value={formData.requiredContent}
                        onChange={(e) => setFormData({ ...formData, requiredContent: e.target.value })}
                        disabled={isSubmitting}
                        style={{ width: "100%", background: "#F8F9FA", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 12, padding: "13px 14px", color: "#0F172A", fontSize: "0.9rem", outline: "none" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A", marginBottom: 6 }}>
                        Which Package Fits Your Goals?
                      </label>
                      <select
                        value={formData.creativeNeed}
                        onChange={(e) => setFormData({ ...formData, creativeNeed: e.target.value })}
                        disabled={isSubmitting}
                        style={{ width: "100%", background: "#F8F9FA", border: "1px solid rgba(15,23,42,0.12)", borderRadius: 12, padding: "13px 14px", color: "#0F172A", fontSize: "0.9rem", outline: "none" }}
                      >
                        <option value="Trial Pack — ₹999 (2 Static Creatives, No Commitment)">Trial Pack — ₹999 (2 Static Images, No Commitment)</option>
                        <option value="Starter Plan — ₹1,999/mo (5 Static Creatives)">Starter Plan — ₹1,999/mo (5 Final Static Ad Images)</option>
                        <option value="Growth Plan — ₹3,499/mo (8 Statics + 1 Carousel)">Growth Plan — ₹3,499/mo (8 Statics + 1 Carousel of 5 Slides)</option>
                        <option value="Video Plan — ₹5,999/mo (8 Statics + 2 Reels/Shorts)">Video Plan — ₹5,999/mo (8 Statics + 2 Simple Reels up to 30s)</option>
                        <option value="Custom Ad Volume / Consultation">Custom Volume / Enterprise Needs</option>
                      </select>
                    </div>
                  )}

                  {/* If in trial mode: Optional Call Checkbox */}
                  {activeTab === "trial" && (
                    <div style={{ background: "#F8FAFC", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 14, padding: "14px 18px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: "0.88rem", color: "#0F172A", fontWeight: 600 }}>
                        <input
                          type="checkbox"
                          checked={wantsCall}
                          onChange={(e) => setWantsCall(e.target.checked)}
                          style={{ width: 18, height: 18, accentColor: "#06B6D4", cursor: "pointer" }}
                        />
                        <span>Optional: I would also like a quick 15-minute discovery call to discuss my product</span>
                      </label>
                    </div>
                  )}

                  {/* Calendar & Time Picker (Displayed if in 'meeting' tab OR if trial user checked 'wantsCall') */}
                  {(activeTab === "meeting" || wantsCall) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ borderTop: "1px solid rgba(15,23,42,0.08)", paddingTop: 20 }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                        
                        {/* Calendar */}
                        <div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A" }}>
                              {monthName} {year}
                            </span>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button
                                type="button"
                                onClick={prevMonth}
                                disabled={isCurrentMonth}
                                style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: isCurrentMonth ? "not-allowed" : "pointer" }}
                              >
                                <ChevronLeft size={14} color={isCurrentMonth ? "#CBD5E1" : "#0F172A"} />
                              </button>
                              <button
                                type="button"
                                onClick={nextMonth}
                                style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                              >
                                <ChevronRight size={14} color="#0F172A" />
                              </button>
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center", fontSize: "0.75rem", color: "#64748B", marginBottom: 6 }}>
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                              <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                              const dayNum = i + 1;
                              const currentIterDate = new Date(year, month, dayNum);
                              currentIterDate.setHours(0, 0, 0, 0);
                              const isPast = currentIterDate < today;
                              const isSelected = selectedDate && selectedDate.toDateString() === currentIterDate.toDateString();

                              return (
                                <button
                                  key={`day-${dayNum}`}
                                  type="button"
                                  disabled={isPast}
                                  onClick={() => !isPast && setSelectedDate(currentIterDate)}
                                  style={{
                                    height: 32,
                                    borderRadius: 8,
                                    border: "none",
                                    background: isSelected ? "#06B6D4" : "transparent",
                                    color: isSelected ? "#fff" : isPast ? "#CBD5E1" : "#0F172A",
                                    fontWeight: isSelected ? 800 : 500,
                                    fontSize: "0.82rem",
                                    cursor: isPast ? "not-allowed" : "pointer",
                                  }}
                                >
                                  {dayNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Time slots */}
                        <div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0F172A", marginBottom: 12 }}>
                            Select Time Slot (IST)
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                            {availableTimeSlots.map((time) => {
                              const isSelected = selectedTime === time;
                              const isBooked = isSlotBookedForCurrentDate(time);
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  disabled={isBooked}
                                  onClick={() => !isBooked && setSelectedTime(time)}
                                  style={{
                                    padding: "8px 12px",
                                    borderRadius: 10,
                                    border: isSelected ? "none" : "1px solid rgba(15,23,42,0.12)",
                                    background: isSelected ? "linear-gradient(135deg, #06B6D4, #6366F1)" : "#FFFFFF",
                                    color: isSelected ? "#fff" : isBooked ? "#EF4444" : "#0F172A",
                                    fontSize: "0.82rem",
                                    fontWeight: isSelected ? 800 : 500,
                                    cursor: isBooked ? "not-allowed" : "pointer",
                                  }}
                                >
                                  {time} {isBooked && "(Booked)"}
                                </button>
                              );
                            })}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: 14 }}>
                            Selected: <strong style={{ color: "#0F172A" }}>{formattedSelectedDate} at {selectedTime}</strong>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button: Distinct names per user instructions */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: 14,
                      justifyContent: "center",
                      marginTop: 8,
                      fontSize: "0.98rem",
                      fontWeight: 800,
                      cursor: isSubmitting ? "wait" : "pointer",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Processing Request...
                      </>
                    ) : activeTab === "trial" && !wantsCall ? (
                      <>
                        Request the ₹999 Trial <ArrowRight size={17} />
                      </>
                    ) : (
                      <>
                        Discuss Your Trial <ArrowRight size={17} />
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.78rem", color: "#64748B" }}>
                    Your delivery date is confirmed after we review your brief and receive the required assets.
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
