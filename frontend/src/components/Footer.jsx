/* ============================================================
   FILE: src/components/Footer.jsx
   PURPOSE: Shared footer used on all pages
   USES: Link from React Router (no page reload navigation)
   ============================================================ */

import { Link } from "react-router-dom";

/* Footer link columns config — defined outside component
   so it's not recreated on every render */
const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "All Spices", path: "/listing" },
      { label: "Whole Spices", path: "/listing?category=Whole+Spice" },
      { label: "Ground Spices", path: "/listing?category=Ground+Spice" },
      { label: "Blends", path: "/listing?category=Blend" },
      { label: "Exotic", path: "/listing?category=Exotic" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Our Story", path: "/about" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", path: "/track" },
      { label: "Returns Policy", path: "/returns" },
      { label: "FAQ", path: "/faq" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#2C1A0E",
        padding: "64px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top grid: brand + link columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#F4A31A" />
                <path
                  d="M20 8 C20 8, 28 14, 28 22 C28 26.4 24.4 30 20 30 C15.6 30 12 26.4 12 22 C12 14 20 8 20 8Z"
                  fill="#2C1A0E"
                  opacity="0.85"
                />
                <circle cx="20" cy="22" r="5" fill="#F4A31A" />
              </svg>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#F4A31A",
                }}
              >
                Spice Basket
              </div>
            </Link>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "13px",
                color: "rgba(254,250,244,0.5)",
                lineHeight: "1.8",
                marginBottom: "24px",
                maxWidth: "220px",
              }}
            >
              Bringing India's finest spices from farm to your kitchen. Pure,
              authentic, traditional.
            </p>

            {/* Social icons row */}
            <div style={{ display: "flex", gap: "12px" }}>
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <button
                  key={i}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(244,163,26,0.1)",
                    border: "1px solid rgba(244,163,26,0.2)",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(244,163,26,0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(244,163,26,0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#FEFAF4",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                {col.title}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "13px",
                      color: "rgba(254,250,244,0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#F4A31A")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(254,250,244,0.5)")
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(244,163,26,0.12)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "12px",
              color: "rgba(254,250,244,0.35)",
            }}
          >
            © 2025 Spice Basket. All rights reserved. Made with ❤️ in India.
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "12px",
                    color: "rgba(254,250,244,0.35)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "rgba(254,250,244,0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(254,250,244,0.35)")
                  }
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
