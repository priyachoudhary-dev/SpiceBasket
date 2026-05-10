/* ============================================================
   FILE: src/pages/HomePage.jsx
   PURPOSE: The landing page — route: /
   SECTIONS: Hero, Features, Featured Products, Banner,
             Testimonials
   NOTE: Navbar and Footer are rendered by App.jsx layout,
         NOT here. This file only contains page content.
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

/* ------------------------------------------------------------
   DATA — inline for HomePage only (bestsellers)
   Full data lives in src/data/spices.js for other pages
------------------------------------------------------------ */
const featuredSpices = [
  {
    id: "kashmiri-saffron",
    name: "Kashmiri Saffron",
    hindiName: "कश्मीरी केसर",
    tagline: "The world's finest — hand-harvested at dawn",
    price: 899,
    originalPrice: 1199,
    weight: "2g",
    rating: 4.9,
    reviewCount: 312,
    emoji: "🌸",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    category: "Exotic",
  },
  {
    id: "garam-masala-blend",
    name: "Ancestral Garam Masala",
    hindiName: "घर का गरम मसाला",
    tagline: "A 12-spice blend ground fresh in small batches",
    price: 169,
    originalPrice: 220,
    weight: "75g",
    rating: 4.9,
    reviewCount: 523,
    emoji: "🟤",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80",
    category: "Blend",
  },
  {
    id: "turmeric-powder",
    name: "Lakadong Turmeric",
    hindiName: "लकाडोंग हल्दी",
    tagline: "Highest curcumin content in India — 7–12%",
    price: 149,
    originalPrice: 199,
    weight: "100g",
    rating: 4.8,
    reviewCount: 445,
    emoji: "🟡",
    image:
      "https://images.unsplash.com/photo-1615485291234-9d694218aeb3?w=600&q=80",
    category: "Ground Spice",
  },
  {
    id: "green-cardamom",
    name: "Green Cardamom",
    hindiName: "हरी इलायची",
    tagline: "The Queen of Spices — floral, sweet, fragrant",
    price: 249,
    originalPrice: 299,
    weight: "50g",
    rating: 4.8,
    reviewCount: 412,
    emoji: "💚",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80",
    category: "Whole Spice",
  },
];

const features = [
  {
    icon: "🌿",
    title: "Farm Direct",
    desc: "Sourced directly from farmers across India. No middlemen, no adulteration.",
  },
  {
    icon: "🏺",
    title: "Stone Ground",
    desc: "Traditional chakki grinding preserves essential oils that machines destroy.",
  },
  {
    icon: "📦",
    title: "Airtight Packed",
    desc: "Nitrogen-flushed packaging locks freshness from grind to your kitchen.",
  },
  {
    icon: "🚚",
    title: "Pan-India Delivery",
    desc: "Free delivery on orders above ₹499. Delivered within 3–5 business days.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    text: "The Kashmiri saffron is unlike anything I have bought before. My kheer had the most beautiful golden colour and aroma.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rajesh Iyer",
    city: "Chennai",
    text: "Finally found real Lakadong turmeric. The colour is so deep orange it almost looks unreal. My haldi doodh is now a daily ritual.",
    rating: 5,
    avatar: "RI",
  },
  {
    name: "Anita Bose",
    city: "Kolkata",
    text: "The ancestral garam masala smells exactly like what my grandmother used to make. This is the real thing.",
    rating: 5,
    avatar: "AB",
  },
];

/* ── Utility: Star rating ── */
function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            color: s <= Math.round(rating) ? "#F4A31A" : "#E8D5B0",
            fontSize: "14px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ── Utility: IntersectionObserver hook ── */
function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ============================================================
   SECTION: Hero
   ============================================================ */
function HeroSection() {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fn = () => setOffset(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const floaters = [
    {
      emoji: "🌶️",
      top: "15%",
      left: "8%",
      size: "2.5rem",
      delay: "0s",
      dur: "6s",
    },
    {
      emoji: "🫚",
      top: "25%",
      right: "6%",
      size: "2rem",
      delay: "1s",
      dur: "7s",
    },
    {
      emoji: "🌿",
      top: "60%",
      left: "5%",
      size: "2rem",
      delay: "2s",
      dur: "8s",
    },
    {
      emoji: "⭐",
      top: "70%",
      right: "8%",
      size: "1.8rem",
      delay: "0.5s",
      dur: "6.5s",
    },
    {
      emoji: "🌸",
      top: "20%",
      right: "15%",
      size: "1.8rem",
      delay: "3s",
      dur: "7.5s",
    },
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `
        radial-gradient(ellipse at 20% 50%, rgba(244,163,26,0.18) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(201,146,42,0.12) 0%, transparent 55%),
        linear-gradient(135deg, #FEFAF4 0%, #F5EDD8 50%, #FEF3D4 100%)
      `,
      }}
    >
      <style>{`
        @keyframes float {
          0%,100%{transform:translateY(0) rotate(0deg)}
          33%{transform:translateY(-18px) rotate(5deg)}
          66%{transform:translateY(-10px) rotate(-3deg)}
        }
        @keyframes heroUp {
          from{opacity:0;transform:translateY(40px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes heroBadge {
          from{opacity:0;transform:scale(0.8)}
          to{opacity:1;transform:scale(1)}
        }
      `}</style>

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "2px solid rgba(244,163,26,0.15)",
          transform: `translateY(${offset * 0.1}px)`,
          transition: "transform 0.1s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: "2px solid rgba(244,163,26,0.1)",
          transform: `translateY(${offset * 0.08}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,163,26,0.08) 0%, transparent 70%)",
        }}
      />

      {floaters.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: f.top,
            left: f.left,
            right: f.right,
            fontSize: f.size,
            animation: `float ${f.dur} ease-in-out infinite`,
            animationDelay: f.delay,
            opacity: 0.6,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {f.emoji}
        </div>
      ))}

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "100px 24px 60px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* Left text */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(244,163,26,0.15)",
              border: "1px solid rgba(244,163,26,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "24px",
              animation: "heroBadge 0.6s ease forwards",
            }}
          >
            <span style={{ fontSize: "12px" }}>✨</span>
            <span
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "12px",
                fontWeight: "600",
                color: "#C9922A",
                letterSpacing: "0.5px",
              }}
            >
              100% Pure · No Adulteration · Farm Direct
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.8rem,5vw,4.2rem)",
              fontWeight: "800",
              color: "#2C1A0E",
              lineHeight: "1.15",
              marginBottom: "20px",
              animation: "heroUp 0.8s ease 0.2s both",
            }}
          >
            India's Finest
            <br />
            <span style={{ color: "#F4A31A" }}>Spices</span> —<br />
            Direct to Your{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Kitchen
              <svg
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: "0",
                  width: "100%",
                }}
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 9 Q50 2 100 8 Q150 14 198 6"
                  stroke="#F4A31A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "16px",
              color: "#5C3D2E",
              lineHeight: "1.8",
              marginBottom: "36px",
              maxWidth: "460px",
              animation: "heroUp 0.8s ease 0.4s both",
            }}
          >
            From the saffron fields of Kashmir to the pepper vines of Kerala —
            we bring you authentic, stone-ground, single-origin spices with
            centuries of tradition in every jar.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              animation: "heroUp 0.8s ease 0.6s both",
            }}
          >
            <button
              onClick={() => navigate("/listing")}
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "15px",
                fontWeight: "700",
                color: "#2C1A0E",
                background: "#F4A31A",
                border: "none",
                padding: "16px 36px",
                borderRadius: "14px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: "0 4px 20px rgba(244,163,26,0.4)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D4880A";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F4A31A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              🛒 Shop Now
            </button>
            <button
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "15px",
                fontWeight: "600",
                color: "#2C1A0E",
                background: "transparent",
                border: "2px solid #E8D5B0",
                padding: "14px 32px",
                borderRadius: "14px",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#F4A31A";
                e.currentTarget.style.background = "#FEF3D4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8D5B0";
                e.currentTarget.style.background = "transparent";
              }}
            >
              🌿 Our Story
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "36px",
              marginTop: "48px",
              animation: "heroUp 0.8s ease 0.8s both",
            }}
          >
            {[
              { num: "15+", label: "Spice Varieties" },
              { num: "10K+", label: "Happy Customers" },
              { num: "4.8★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "26px",
                    fontWeight: "800",
                    color: "#F4A31A",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "12px",
                    color: "#7A5C44",
                    fontWeight: "500",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: stacked image cards */}
        <div
          style={{
            position: "relative",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(244,163,26,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Main card */}
          <div
            style={{
              position: "relative",
              width: "260px",
              height: "320px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(44,26,14,0.25)",
              border: "3px solid rgba(244,163,26,0.3)",
              zIndex: 3,
              animation: "heroUp 1s ease 0.3s both",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80"
              alt="Saffron"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.cssText +=
                  "background:linear-gradient(135deg,#F4A31A,#C9922A);display:flex;align-items:center;justify-content:center;font-size:5rem";
                e.target.parentElement.innerHTML += "<div>🌸</div>";
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent,rgba(44,26,14,0.85))",
                padding: "30px 16px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Kashmiri Saffron
              </div>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                }}
              >
                कश्मीरी केसर
              </div>
            </div>
          </div>

          {/* Small card top-left */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "10px",
              width: "130px",
              height: "160px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(44,26,14,0.2)",
              border: "2px solid rgba(244,163,26,0.2)",
              zIndex: 2,
              transform: "rotate(-8deg)",
              animation: "heroUp 1s ease 0.5s both",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1615485291234-9d694218aeb3?w=400&q=80"
              alt="Turmeric"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.parentElement.style.background =
                  "linear-gradient(135deg,#F4A31A,#C9922A)";
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Small card bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              right: "10px",
              width: "130px",
              height: "150px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(44,26,14,0.2)",
              border: "2px solid rgba(244,163,26,0.2)",
              zIndex: 2,
              transform: "rotate(6deg)",
              animation: "heroUp 1s ease 0.7s both",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=80"
              alt="Masala"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.parentElement.style.background =
                  "linear-gradient(135deg,#8B2500,#C9922A)";
                e.target.style.display = "none";
              }}
            />
          </div>

          {/* Price badge */}
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "30px",
              background: "#2C1A0E",
              borderRadius: "14px",
              padding: "10px 14px",
              boxShadow: "0 8px 20px rgba(44,26,14,0.3)",
              zIndex: 4,
              animation: "heroBadge 0.6s ease 1s both",
            }}
          >
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Starting from
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "20px",
                color: "#F4A31A",
                fontWeight: "800",
              }}
            >
              ₹59
            </div>
          </div>

          {/* Farm Direct badge */}
          <div
            style={{
              position: "absolute",
              bottom: "100px",
              left: "20px",
              background: "white",
              borderRadius: "14px",
              padding: "10px 14px",
              boxShadow: "0 8px 20px rgba(44,26,14,0.15)",
              border: "1px solid #E8D5B0",
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              animation: "heroBadge 0.6s ease 1.2s both",
            }}
          >
            <span style={{ fontSize: "18px" }}>🌱</span>
            <div>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#2C1A0E",
                }}
              >
                Farm Direct
              </div>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "9px",
                  color: "#7A5C44",
                }}
              >
                No middlemen
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "11px",
            color: "#B8956A",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Scroll to explore
        </span>
        <div
          style={{
            width: "24px",
            height: "36px",
            border: "2px solid #E8D5B0",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "8px",
              background: "#F4A31A",
              borderRadius: "2px",
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION: Features
   ============================================================ */
function FeaturesSection() {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <section
      ref={ref}
      style={{
        padding: "100px 24px",
        background: "#2C1A0E",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(244,163,26,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(201,146,42,0.06) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              color: "#F4A31A",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            Why Choose Us
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: "800",
              color: "#FEFAF4",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            The Spice Basket Difference
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
            gap: "24px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{
                background: "rgba(254,250,244,0.05)",
                border: "1px solid rgba(244,163,26,0.15)",
                borderRadius: "20px",
                padding: "36px 28px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${0.1 + i * 0.1}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(244,163,26,0.08)";
                e.currentTarget.style.borderColor = "rgba(244,163,26,0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(254,250,244,0.05)";
                e.currentTarget.style.borderColor = "rgba(244,163,26,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#FEFAF4",
                  marginBottom: "10px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "14px",
                  color: "rgba(254,250,244,0.6)",
                  lineHeight: "1.7",
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION: Featured Products
   ============================================================ */
function FeaturedProducts() {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (spice) => {
    addToCart(spice);
    setAddedId(spice.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section ref={ref} style={{ padding: "100px 24px", background: "#FEFAF4" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "12px",
                fontWeight: "600",
                color: "#F4A31A",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "8px",
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              Our Bestsellers
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
                fontWeight: "800",
                color: "#2C1A0E",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease 0.1s",
              }}
            >
              Customers' Favourites
            </h2>
          </div>
          <button
            onClick={() => navigate("/listing")}
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              color: "#F4A31A",
              background: "transparent",
              border: "2px solid #F4A31A",
              padding: "10px 24px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F4A31A";
              e.currentTarget.style.color = "#2C1A0E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#F4A31A";
            }}
          >
            View All →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
            gap: "28px",
          }}
        >
          {featuredSpices.map((spice, i) => {
            const discount = spice.originalPrice
              ? Math.round(
                  ((spice.originalPrice - spice.price) / spice.originalPrice) *
                    100,
                )
              : null;
            return (
              <div
                key={spice.id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #E8D5B0",
                  boxShadow: "0 2px 12px rgba(44,26,14,0.06)",
                  transition: "all 0.3s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${0.1 + i * 0.1}s`,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(44,26,14,0.15)";
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(44,26,14,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={() => navigate(`/product/${spice.id}`)}
              >
                <div
                  style={{
                    position: "relative",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={spice.image}
                    alt={spice.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.cssText +=
                        "background:linear-gradient(135deg,#FEF3D4,#F5EDD8);display:flex;align-items:center;justify-content:center;font-size:4rem";
                      e.target.parentElement.textContent = spice.emoji;
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {discount && (
                      <span
                        style={{
                          background: "#8B2500",
                          color: "white",
                          fontFamily: "'Poppins',sans-serif",
                          fontSize: "11px",
                          fontWeight: "700",
                          padding: "3px 10px",
                          borderRadius: "100px",
                        }}
                      >
                        -{discount}%
                      </span>
                    )}
                    <span
                      style={{
                        background: "#F4A31A",
                        color: "#2C1A0E",
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "11px",
                        fontWeight: "700",
                        padding: "3px 10px",
                        borderRadius: "100px",
                      }}
                    >
                      Bestseller
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(44,26,14,0.7)",
                      backdropFilter: "blur(8px)",
                      color: "white",
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "10px",
                      fontWeight: "500",
                      padding: "4px 10px",
                      borderRadius: "100px",
                    }}
                  >
                    {spice.category}
                  </div>
                </div>

                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "11px",
                      color: "#B8956A",
                      marginBottom: "4px",
                    }}
                  >
                    {spice.hindiName}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "17px",
                      fontWeight: "700",
                      color: "#2C1A0E",
                      marginBottom: "6px",
                    }}
                  >
                    {spice.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12px",
                      color: "#7A5C44",
                      marginBottom: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    {spice.tagline}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "16px",
                    }}
                  >
                    <Stars rating={spice.rating} />
                    <span
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "12px",
                        color: "#7A5C44",
                        fontWeight: "500",
                      }}
                    >
                      {spice.rating} ({spice.reviewCount})
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: "22px",
                          fontWeight: "800",
                          color: "#2C1A0E",
                        }}
                      >
                        ₹{spice.price}
                      </span>
                      {spice.originalPrice && (
                        <span
                          style={{
                            fontFamily: "'Poppins',sans-serif",
                            fontSize: "13px",
                            color: "#B8956A",
                            textDecoration: "line-through",
                            marginLeft: "8px",
                          }}
                        >
                          ₹{spice.originalPrice}
                        </span>
                      )}
                      <div
                        style={{
                          fontFamily: "'Poppins',sans-serif",
                          fontSize: "11px",
                          color: "#B8956A",
                        }}
                      >
                        {spice.weight}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(spice);
                      }}
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "13px",
                        fontWeight: "700",
                        color: addedId === spice.id ? "white" : "#2C1A0E",
                        background:
                          addedId === spice.id ? "#2C1A0E" : "#F4A31A",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {addedId === spice.id ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION: Banner
   ============================================================ */
function BannerSection() {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  const navigate = useNavigate();
  return (
    <section
      ref={ref}
      style={{
        padding: "80px 24px",
        background:
          "linear-gradient(135deg,#F5EDD8 0%,#FEF3D4 50%,#F5EDD8 100%)",
        borderTop: "1px solid #E8D5B0",
        borderBottom: "1px solid #E8D5B0",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.8)",
            transition: "all 0.5s ease",
          }}
        >
          🎁
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(1.8rem,4vw,2.8rem)",
            fontWeight: "800",
            color: "#2C1A0E",
            marginBottom: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease 0.1s",
          }}
        >
          Free Delivery on Orders Above ₹499
        </h2>
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "16px",
            color: "#5C3D2E",
            marginBottom: "32px",
            lineHeight: "1.7",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s",
          }}
        >
          Use code{" "}
          <strong
            style={{
              color: "#8B2500",
              background: "#FDECEA",
              padding: "2px 8px",
              borderRadius: "6px",
            }}
          >
            SPICE50
          </strong>{" "}
          for ₹50 off your first order.
        </p>
        <button
          onClick={() => navigate("/listing")}
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            color: "#2C1A0E",
            background: "#F4A31A",
            border: "none",
            padding: "16px 40px",
            borderRadius: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(244,163,26,0.35)",
            transition: "all 0.25s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#D4880A";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F4A31A";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Shop & Save →
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION: Testimonials
   ============================================================ */
function TestimonialsSection() {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <section ref={ref} style={{ padding: "100px 24px", background: "#FEFAF4" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              color: "#F4A31A",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            What Our Customers Say
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: "800",
              color: "#2C1A0E",
            }}
          >
            Real Kitchens. Real Stories.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: "white",
                border: "1px solid #E8D5B0",
                borderRadius: "20px",
                padding: "32px 28px",
                boxShadow: "0 2px 12px rgba(44,26,14,0.06)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <Stars rating={t.rating} />
              </div>
              <p
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "14px",
                  color: "#5C3D2E",
                  lineHeight: "1.8",
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#F4A31A,#C9922A)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#2C1A0E",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12px",
                      color: "#B8956A",
                    }}
                  >
                    {t.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ROOT EXPORT: HomePage
   ============================================================ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <BannerSection />
      <TestimonialsSection />
    </>
  );
}
