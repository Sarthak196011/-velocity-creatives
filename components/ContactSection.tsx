"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo, useEffect } from "react";
import { 
  Clock, Video, CheckCircle, ShieldCheck, ArrowRight, 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, Phone,
  Mail, Loader2
} from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
    creativeNeed: "Need 15+ fresh image ads",
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

  const isSlotBookedForCurrentDate = (time: string) => {
    if (!selectedDate) return false;
    const currentNormDate = selectedDate.toDateString();
    const currentNormTime = time.trim().toLowerCase().replace(/^0/, "");

    return bookedSlots.some((slot) => {
      const slotD = new Date(slot.date);
      const slotNormDate = !isNaN(slotD.getTime()) ? slotD.toDateString() : slot.date.trim().toLowerCase();
      const slotNormTime = slot.time.trim().toLowerCase().replace(/^0/, "");

      return slotNormDate === currentNormDate && slotNormTime === currentNormTime;
    });
  };

  // Calendar calculations
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthLabel = `${monthNames[month]} ${year}`;

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const firstDayOfWeek = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const isCurrentMonth = useMemo(() => {
    const now = new Date();
    return year === now.getFullYear() && month === now.getMonth();
  }, [year, month]);

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

  // Auto-switch to next available free slot if current time is booked on selected date
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

    try {
      const response = await fetch("/api/book-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          brandUrl: formData.brandUrl,
          creativeNeed: formData.creativeNeed,
          date: formattedSelectedDate,
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book meeting. Please try again.");
      }

      setBookingResult(data);
      setBooked(true);
      fetchBookedSlots();
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };



  const handleReset = () => {
    setBooked(false);
    setBookingResult(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      brandUrl: "",
      creativeNeed: "Need 15+ fresh image ads",
    });
  };

  return (
    <section id="contact" style={{ position: "relative", zIndex: 10, padding: "140px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <div className="eyebrow" style={{ marginBottom: 20, justifyContent: "center" }}>
            <span className="eyebrow-line" />
            Book a Meeting
            <span className="eyebrow-line" />
          </div>
          <h2 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>
            Let&apos;s Talk About <span className="gt">Your Brand.</span>
          </h2>
          <p style={{ color: "rgba(232,232,240,0.6)", fontSize: "1.1rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
            Pick a date and time on the calendar. We will instantly create your Zoom room, send a welcome email to your inbox, and prepare 3 custom ad ideas for your store.
          </p>
        </motion.div>

        {/* Main Grid: Interactive Full Calendar + Clean Form */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: 32,
          maxWidth: 1160,
          margin: "0 auto",
          alignItems: "start"
        }}>

          {/* Left Column: Full Interactive Calendar & Time Slot Picker */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: "linear-gradient(160deg, rgba(20, 16, 38, 0.85) 0%, rgba(10, 8, 20, 0.98) 100%)",
              backdropFilter: "blur(28px)",
              borderRadius: 28,
              border: "1px solid rgba(124,58,237,0.25)",
              padding: "clamp(20px, 4vw, 36px) clamp(16px, 3.5vw, 30px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              gap: 28
            }}
          >
            {/* Host Profile Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 22 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.1rem"
              }}>
                VC
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem" }}>
                  Velocity Creatives
                </div>
                <div style={{ color: "rgba(232,232,240,0.5)", fontSize: "0.82rem" }}>
                  Ad Strategy &amp; Creative Review Call
                </div>
              </div>
            </div>

            {/* Call Perks Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: "0.8rem",
                color: "#c084fc",
                fontWeight: 600
              }}>
                <Clock size={14} /> 30-Min Call
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(37,99,235,0.12)",
                border: "1px solid rgba(37,99,235,0.25)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: "0.8rem",
                color: "#60a5fa",
                fontWeight: 600
              }}>
                <Video size={14} /> Zoom Video Meeting
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: "0.8rem",
                color: "#4ade80",
                fontWeight: 600
              }}>
                <ShieldCheck size={14} /> 100% Free
              </div>
            </div>

            {/* Interactive Month-by-Month Calendar */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "20px"
            }}>
              {/* Calendar Month Header with Nav Arrows */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 18
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CalendarIcon size={16} style={{ color: "#a855f7" }} />
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
                    {monthLabel}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    onClick={prevMonth}
                    disabled={isCurrentMonth}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isCurrentMonth ? "rgba(255,255,255,0.2)" : "#fff",
                      cursor: isCurrentMonth ? "not-allowed" : "pointer"
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Day of Week Headers */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                marginBottom: 10,
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "rgba(232,232,240,0.4)",
                letterSpacing: "0.05em"
              }}>
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              {/* Day Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6
              }}>
                {/* Empty cells before month starts */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ height: 36 }} />
                ))}

                {/* Day numbers */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const cellDate = new Date(year, month, dayNum);
                  cellDate.setHours(0, 0, 0, 0);

                  const isPast = cellDate < today;
                  const isToday = cellDate.getTime() === today.getTime();
                  const isSelected = selectedDate &&
                    selectedDate.getFullYear() === year &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getDate() === dayNum;

                  return (
                    <button
                      key={`day-${dayNum}`}
                      type="button"
                      disabled={isPast}
                      onClick={() => setSelectedDate(cellDate)}
                      style={{
                        height: 36,
                        borderRadius: 10,
                        border: isSelected
                          ? "1px solid #a855f7"
                          : isToday
                          ? "1px solid rgba(168,85,247,0.4)"
                          : "1px solid transparent",
                        background: isSelected
                          ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                          : isToday
                          ? "rgba(168,85,247,0.12)"
                          : "transparent",
                        color: isPast
                          ? "rgba(255,255,255,0.18)"
                          : isSelected
                          ? "#fff"
                          : "#e2e8f0",
                        fontWeight: isSelected ? 800 : isToday ? 700 : 500,
                        fontSize: "0.85rem",
                        cursor: isPast ? "not-allowed" : "pointer",
                        transition: "all 0.15s ease",
                        boxShadow: isSelected ? "0 0 16px rgba(124,58,237,0.5)" : "none"
                      }}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem"
              }}>
                <Clock size={16} style={{ color: "#a855f7" }} />
                Select Time Slot (IST)
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10
              }}>
                {availableTimeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  const isBooked = isSlotBookedForCurrentDate(time);

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isBooked}
                      onClick={() => !isBooked && setSelectedTime(time)}
                      title={isBooked ? "This slot is already booked" : "Available slot"}
                      style={{
                        padding: isBooked ? "8px 10px" : "10px 12px",
                        borderRadius: 12,
                        border: isBooked
                          ? "1px dashed rgba(239,68,68,0.3)"
                          : isSelected
                          ? "1px solid #a855f7"
                          : "1px solid rgba(255,255,255,0.08)",
                        background: isBooked
                          ? "rgba(239,68,68,0.06)"
                          : isSelected
                          ? "rgba(124,58,237,0.25)"
                          : "rgba(255,255,255,0.03)",
                        color: isBooked
                          ? "rgba(252,165,165,0.6)"
                          : isSelected
                          ? "#fff"
                          : "rgba(232,232,240,0.75)",
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: "0.85rem",
                        cursor: isBooked ? "not-allowed" : "pointer",
                        transition: "all 0.15s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2
                      }}
                    >
                      <span style={{ textDecoration: isBooked ? "line-through" : "none" }}>
                        {time}
                      </span>
                      {isBooked && (
                        <span style={{
                          fontSize: "0.62rem",
                          fontWeight: 800,
                          color: "#f87171",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          lineHeight: 1
                        }}>
                          Booked
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Summary Pill */}
            <div style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <ShieldCheck size={20} style={{ color: "#a855f7", flexShrink: 0 }} />
              <span style={{ fontSize: "0.85rem", color: "rgba(232,232,240,0.8)", lineHeight: 1.45 }}>
                Selected: <strong style={{ color: "#fff" }}>{formattedSelectedDate} at {selectedTime}</strong>. 100% free meeting with zero pressure.
              </span>
            </div>
          </motion.div>

          {/* Right Column: Clean Application Form & Booking Confirmation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              background: "linear-gradient(160deg, rgba(20, 16, 38, 0.85) 0%, rgba(10, 8, 20, 0.98) 100%)",
              backdropFilter: "blur(28px)",
              borderRadius: 28,
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "clamp(24px, 4vw, 40px) clamp(16px, 3.5vw, 32px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <AnimatePresence mode="wait">
              {booked ? (
                /* Clean Confirmation Screen */
                <motion.div
                  key="booked-state"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  style={{ textAlign: "center", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
                >
                  {/* Success Icon */}
                  <div style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    background: "rgba(74, 222, 128, 0.15)",
                    border: "2px solid #4ade80",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    color: "#4ade80",
                    boxShadow: "0 0 35px rgba(74, 222, 128, 0.3)"
                  }}>
                    <CheckCircle size={40} />
                  </div>

                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.85rem", fontWeight: 900, marginBottom: 8 }}>
                      Meeting Booked!
                    </h3>
                    <p style={{ color: "rgba(232,232,240,0.75)", fontSize: "0.98rem", lineHeight: 1.6, maxWidth: 390, margin: "0 auto" }}>
                      We have reserved your slot for <strong style={{ color: "#fff" }}>{bookingResult?.client?.date || formattedSelectedDate} at {bookingResult?.client?.time || selectedTime}</strong>.
                    </p>
                  </div>

                  {/* Clean Email Notice Card */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: "18px 22px",
                    maxWidth: 420,
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14
                  }}>
                    <Mail size={22} style={{ color: "#a855f7", marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.92rem", marginBottom: 4 }}>
                        Zoom Link Sent to Your Email
                      </div>
                      <div style={{ color: "rgba(232,232,240,0.6)", fontSize: "0.84rem", lineHeight: 1.5 }}>
                        Your welcome email with the Zoom video call link and meeting details has been sent to <strong style={{ color: "#c084fc" }}>{bookingResult?.client?.email || formData.email}</strong>.
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "rgba(232,232,240,0.4)" }}>
                    Please check your inbox (and spam/promotions folder) for the confirmation email.
                  </div>

                  {/* Clean Reset Button */}
                  <button
                    onClick={handleReset}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 12,
                      padding: "12px 28px",
                      color: "#fff",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      fontWeight: 600,
                      marginTop: 4
                    }}
                  >
                    Book Another Meeting
                  </button>
                </motion.div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.45rem", fontWeight: 800, marginBottom: 6 }}>
                      Tell Us About Your Brand
                    </h3>
                    <p style={{ color: "rgba(232,232,240,0.5)", fontSize: "0.88rem" }}>
                      This helps us prepare custom ad ideas for your store before we talk.
                    </p>
                  </div>

                  {submitError && (
                    <div style={{
                      background: "rgba(239, 68, 68, 0.12)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: 12,
                      padding: "12px 16px",
                      color: "#fca5a5",
                      fontSize: "0.85rem",
                      lineHeight: 1.4
                    }}>
                      {submitError}
                    </div>
                  )}

                  {/* Row 1: Name & Phone Number */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,232,240,0.5)", marginBottom: 6 }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 12,
                          padding: "13px 14px",
                          color: "#fff",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,232,240,0.5)", marginBottom: 6 }}>
                        Phone / WhatsApp No.
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={isSubmitting}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 12,
                          padding: "13px 14px",
                          color: "#fff",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Website Link */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,232,240,0.5)", marginBottom: 6 }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@yourbrand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 12,
                          padding: "13px 14px",
                          color: "#fff",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,232,240,0.5)", marginBottom: 6 }}>
                        Website or Instagram Link
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. yourstore.com"
                        value={formData.brandUrl}
                        onChange={(e) => setFormData({ ...formData, brandUrl: e.target.value })}
                        disabled={isSubmitting}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 12,
                          padding: "13px 14px",
                          color: "#fff",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 3: Needs Dropdown */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(232,232,240,0.5)", marginBottom: 6 }}>
                      What do you need help with most?
                    </label>
                    <select
                      value={formData.creativeNeed}
                      onChange={(e) => setFormData({ ...formData, creativeNeed: e.target.value })}
                      disabled={isSubmitting}
                      style={{
                        width: "100%",
                        background: "#0c0a1a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "13px 14px",
                        color: "#fff",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="Need 15+ fresh image ads">Need 15+ fresh image ads</option>
                      <option value="Need short video ads for Reels">Need short video ads for Reels</option>
                      <option value="Need educational carousels">Need educational carousels</option>
                      <option value="Current ads are getting tired / need new ideas">Current ads are getting tired / need new ideas</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: 14,
                      justifyContent: "center",
                      marginTop: 6,
                      fontSize: "0.95rem",
                      boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                      cursor: isSubmitting ? "wait" : "pointer",
                      opacity: isSubmitting ? 0.8 : 1
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Generating Zoom Room &amp; Booking...
                      </>
                    ) : (
                      <>
                        Confirm Meeting Booking <ArrowRight size={17} />
                      </>
                    )}
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(232,232,240,0.4)", marginTop: 2 }}>
                    Your details are automatically emailed to you and saved to Excel.
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
