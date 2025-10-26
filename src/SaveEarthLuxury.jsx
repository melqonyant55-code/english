
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, Globe2, Heart, Sparkles, X } from "lucide-react";

// ---------- BUTTON COMPONENT ----------
function Button({ children, variant, className, onClick }) {
  const base =
    "px-6 py-3 rounded-xl font-medium transition duration-200 animate-pulse cursor-pointer";
  const styles =
    variant === "ghost"
      ? "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
      : "bg-emerald-600 text-white hover:bg-emerald-700";
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className || ""}`}>
      {children}
    </button>
  );
}

// ---------- COUNT-UP HOOK ----------
function useCountUp(end, duration = 2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(handle);
  }, [end, duration]);
  return count;
}

// ---------- MODAL COMPONENT ----------
function Modal({ isOpen, onClose }) {
  const [donationAmount, setDonationAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDonationAmount("");
      onClose();
      alert("Thank you for supporting our planet! 🌍💚");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 w-96 shadow-2xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
            >
              <X size={20} />
            </button>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold">Support Our Planet 🌍</h2>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full border rounded-xl p-2"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full border rounded-xl p-2"
                />
                <input
                  type="number"
                  required
                  placeholder="Donation Amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full border rounded-xl p-2"
                />
                <Button type="submit">Donate</Button>
              </form>
            ) : (
              <motion.div
                className="text-center py-10 text-green-600 font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Thank you! 💚
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- CARD MODAL COMPONENT ----------
function CardModal({ isOpen, onClose, title, description }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 w-96 shadow-2xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-slate-700">{description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- CARD COMPONENT ----------
function Card({ icon, title, children, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.6 }}
      className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg flex flex-col gap-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-3 rounded-lg bg-white/40 inline-flex">
        {React.cloneElement(icon, { className: "w-6 h-6 text-emerald-600 animate-spin-slow" })}
      </div>
      <div className="font-semibold">{title}</div>
      <div className="text-slate-600 text-sm">{children}</div>
    </motion.div>
  );
}

// ---------- MAIN COMPONENT ----------
export default function SaveEarthLuxury() {
  const stats = [
    { label: "Trees Planted", value: 124587 },
    { label: "Eco Events", value: 842 },
    { label: "Waste Recycled (%)", value: 72 },
  ];
  const counts = stats.map((s) => useCountUp(s.value));

  const featuresRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [cardContent, setCardContent] = useState({ title: "", description: "" });

  const handleLearnMore = () => featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleSupportNow = () => setModalOpen(true);
  const handleCardClick = (title, description) => {
    setCardContent({ title, description });
    setCardModalOpen(true);
  };

  // ---------- DECORATIONS ----------
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 15,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    rotate: Math.random() * 360,
    duration: 6 + Math.random() * 4,
  }));

  const stars = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-emerald-50 via-sky-50 to-indigo-50 text-slate-900 overflow-hidden">
      {/* Floating leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute bg-emerald-400 rounded-full opacity-80"
          style={{ width: leaf.size, height: leaf.size, left: `${leaf.x}%`, top: "-10%" }}
          animate={{ y: ["-10%", "110%"], rotate: [0, leaf.rotate] }}
          transition={{ repeat: Infinity, duration: leaf.duration, delay: leaf.delay }}
        />
      ))}

      {/* Sparkle stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{ width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: star.duration, delay: star.delay }}
        />
      ))}

      {/* HERO SECTION */}
      <header className="relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-6">
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Save Earth — Save Life
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-slate-700 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                A luxurious, inspiring site to motivate global citizens to act for a greener planet. Plant trees, reduce pollution, support communities.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <Button onClick={handleSupportNow}>Support Now</Button>
                <Button variant="ghost" onClick={handleLearnMore}>Learn More</Button>
              </motion.div>
            </div>

            <motion.div
              className="flex items-center justify-center relative w-full max-w-md"
              initial={{ scale: 0.9, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="rounded-3xl shadow-2xl overflow-hidden border border-white/30 bg-gradient-to-br from-white/70 to-emerald-50 p-6">
                <div
                  className="w-full h-80 md:h-96 rounded-2xl bg-center bg-cover shadow-lg border border-white/30"
                  style={{ backgroundImage: "url('/1.jpg')" }}
                />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">Protect Our Blue Marble</div>
                    <div className="text-sm text-slate-600">Join local projects near you.</div>
                  </div>
                  <Sparkles className="w-8 h-8 text-emerald-600 animate-spin-slow" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">
        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 backdrop-blur rounded-2xl p-4 shadow-lg text-center"
            >
              <div className="text-2xl font-bold">{counts[idx].toLocaleString()}</div>
              <div className="text-sm text-slate-600">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* FEATURES CARDS */}
        <section ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            icon={<Trees />}
            title="Join the Community"
            onClick={() => handleCardClick("Join the Community", "Participate in tree-planting campaigns that transform cities and rural areas.")}
          >
            Participate in tree-planting campaigns that transform cities and rural areas.
          </Card>
          <Card
            icon={<Globe2 />}
            title="Climate Programs"
            onClick={() => handleCardClick("Climate Programs", "Support renewable energy initiatives and ecosystem restoration.")}
          >
            Support renewable energy initiatives and ecosystem restoration.
          </Card>
          <Card
            icon={<Heart />}
            title="Sustainable Lifestyle"
            onClick={() => handleCardClick("Sustainable Lifestyle", "Small daily habits that make a big difference for our planet.")}
          >
            Small daily habits that make a big difference for our planet.
          </Card>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="rounded-2xl p-8 bg-gradient-to-r from-emerald-50 to-sky-50 shadow-lg flex flex-col md:flex-row items-center justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold">A Better Future Starts Today</h3>
            <p className="mt-2 text-slate-700">Your support directly contributes to real environmental change.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button onClick={handleSupportNow}>Donate — Support</Button>
          </div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/80 border-t border-slate-200 p-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Globe2 className="w-7 h-7 text-emerald-600" />
            <div>
              <div className="font-semibold">Save Earth — Save Life</div>
              <div className="text-sm text-slate-600">Products and projects for a greener planet.</div>
            </div>
          </div>
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} Save Earth — Save Life. Yerevan State College of Informatics 514 group </div>
        </div>
      </footer>

      {/* MODALS */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <CardModal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        title={cardContent.title}
        description={cardContent.description}
      />
    </div>
  );
}
