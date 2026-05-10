/* ============================================================
   FILE: src/components/Navbar.jsx
   PURPOSE: Fixed top navigation bar — appears on ALL pages
   USES:
     - useCartStore  → reads totalItems for badge count
     - useAuthStore  → reads user/isAuthenticated for login state
     - Link          → React Router navigation (no page reload)
     - useLocation   → knows which page is active (for highlighting)
   ============================================================ */

import { useState, useEffect } from "react";

// Link    → renders an <a> tag but intercepts click, no page reload
// useNavigate → programmatic navigation (e.g. after login)
// useLocation → tells us the current URL path
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

/* ------------------------------------------------------------
   LOGO — extracted as its own mini component
   Keeps Navbar JSX cleaner and Logo can be reused elsewhere
------------------------------------------------------------ */
function Logo() {
  return (
    /* Link wraps the logo so clicking it goes to Home */
    <Link
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}
    >
      {/* SVG Logo Mark — custom designed teardrop spice shape */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#F4A31A" />
        <path
          d="M20 8 C20 8, 28 14, 28 22 C28 26.4 24.4 30 20 30 C15.6 30 12 26.4 12 22 C12 14 20 8 20 8Z"
          fill="#2C1A0E"
          opacity="0.85"
        />
        <circle cx="20" cy="22" r="5" fill="#F4A31A" />
        <path
          d="M17 13 Q20 10 23 13"
          stroke="#FEFAF4"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand name text */}
      <div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px",
            fontWeight: "800",
            color: "#2C1A0E",
            lineHeight: "1",
          }}
        >
          Spice Basket
        </div>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "9px",
            color: "#C9922A",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Pure · Authentic · Indian
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------
   MAIN COMPONENT: Navbar
------------------------------------------------------------ */
export default function Navbar() {
  /* Scroll state — navbar becomes solid after scrolling 40px */
  const [scrolled, setScrolled] = useState(false);

  /* Mobile menu open/close state */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* User dropdown open/close (shows Logout option) */
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  /* React Router hooks */
  const navigate = useNavigate();
  const location = useLocation(); // gives us location.pathname

  /* Zustand stores — destructure what we need */
  const totalItems = useCartStore((state) => state.totalItems);
  const { user, isAuthenticated, logout } = useAuthStore();

  /* ----------------------------------------------------------
     EFFECT: Listen to scroll events
     Runs once on mount ([] dependency = mount only)
     Cleans up the listener when component unmounts
  ---------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    // Cleanup function — removes listener when Navbar unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ----------------------------------------------------------
     EFFECT: Close mobile menu on route change
     When user taps a link on mobile, close the menu
  ---------------------------------------------------------- */
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  /* ----------------------------------------------------------
     HELPER: isActive
     Returns true if the given path matches current URL
     Used to highlight the active nav link
  ---------------------------------------------------------- */
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  /* ----------------------------------------------------------
     HANDLER: handleLogout
     Calls Zustand logout action, navigates home
  ---------------------------------------------------------- */
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  /* ----------------------------------------------------------
     NAV LINKS config
     Defined as array so we can map() them — DRY principle
     (Don't Repeat Yourself — no copy-pasting the same <Link>)
  ---------------------------------------------------------- */
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/listing" },
    { label: "About", path: "/about" },
  ];

  /* ----------------------------------------------------------
     RENDER
  ---------------------------------------------------------- */
  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled
            ? "rgba(254, 250, 244, 0.96)"
            : "rgba(254, 250, 244, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid #E8D5B0"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(44,26,14,0.08)" : "none",
          transition: "all 0.35s ease",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
          }}
        >
          {/* LEFT: Logo */}
          <Logo />

          {/* CENTER: Nav links — hidden on mobile */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
              /* Hide on small screens — shown via mobile menu instead */
            }}
            className="nav-links-desktop"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "14px",
                  fontWeight: isActive(link.path) ? "700" : "500",
                  color: isActive(link.path) ? "#F4A31A" : "#5C3D2E",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  /* Active indicator underline */
                  borderBottom: isActive(link.path)
                    ? "2px solid #F4A31A"
                    : "2px solid transparent",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) e.target.style.color = "#F4A31A";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) e.target.style.color = "#5C3D2E";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT: Cart + Auth */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* ── CART ICON BUTTON ── */}
            <Link
              to="/cart"
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "10px",
                transition: "background 0.2s",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#FEF3D4")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Shopping bag SVG icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2C1A0E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>

              {/* Cart count badge — only shows if totalItems > 0 */}
              {totalItems() > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "#8B2500",
                    color: "white",
                    fontSize: "9px",
                    fontWeight: "700",
                    minWidth: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Poppins', sans-serif",
                    padding: "0 3px",
                  }}
                >
                  {/* Cap display at 99+ so badge doesn't overflow */}
                  {totalItems() > 99 ? "99+" : totalItems()}
                </span>
              )}
            </Link>

            {/* ── AUTH BUTTON / USER MENU ── */}
            {isAuthenticated && user ? (
              /* Logged in → show user's name with dropdown */
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#2C1A0E",
                    background: "#FEF3D4",
                    border: "1.5px solid #E8D5B0",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Avatar circle with first letter */}
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#F4A31A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "800",
                      color: "#2C1A0E",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                  {/* Chevron arrow — flips when menu is open */}
                  <span
                    style={{
                      transform: userMenuOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      fontSize: "10px",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: "0",
                      background: "white",
                      border: "1px solid #E8D5B0",
                      borderRadius: "12px",
                      boxShadow: "0 8px 30px rgba(44,26,14,0.12)",
                      padding: "8px",
                      minWidth: "160px",
                      zIndex: 100,
                      /* Animate dropdown appearing */
                      animation: "scaleIn 0.15s ease",
                    }}
                  >
                    <Link
                      to="/cart"
                      style={{
                        display: "block",
                        padding: "10px 14px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "13px",
                        color: "#2C1A0E",
                        textDecoration: "none",
                        borderRadius: "8px",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#FEF3D4")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      🛒 My Cart
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 14px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "13px",
                        color: "#8B2500",
                        background: "transparent",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#FDECEA")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in → show Login button */
              <button
                onClick={() => navigate("/auth")}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#2C1A0E",
                  background: "#F4A31A",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 8px rgba(244,163,26,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4880A";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F4A31A";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Login
              </button>
            )}

            {/* ── MOBILE HAMBURGER ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none" /* shown via CSS on small screens */,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                flexDirection: "column",
                gap: "5px",
              }}
              className="hamburger-btn"
            >
              {/* Three lines that become X when open */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "22px",
                    height: "2px",
                    background: "#2C1A0E",
                    borderRadius: "2px",
                    transition: "all 0.25s ease",
                    transformOrigin: "center",
                    transform:
                      mobileOpen && i === 0
                        ? "rotate(45deg) translate(5px, 5px)"
                        : mobileOpen && i === 1
                          ? "scaleX(0)"
                          : mobileOpen && i === 2
                            ? "rotate(-45deg) translate(5px, -5px)"
                            : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DROPDOWN MENU ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            background: "rgba(254,250,244,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid #E8D5B0",
            zIndex: 999,
            padding: "16px 24px 24px",
            boxShadow: "0 8px 30px rgba(44,26,14,0.1)",
            animation: "slideUp 0.25s ease",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "block",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                fontWeight: isActive(link.path) ? "700" : "500",
                color: isActive(link.path) ? "#F4A31A" : "#2C1A0E",
                padding: "14px 0",
                textDecoration: "none",
                borderBottom: "1px solid #F5EDD8",
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/cart"
            style={{
              display: "block",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              color: "#2C1A0E",
              padding: "14px 0",
              textDecoration: "none",
            }}
          >
            🛒 Cart {totalItems() > 0 && `(${totalItems()})`}
          </Link>
        </div>
      )}

      {/* Responsive CSS for mobile */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
