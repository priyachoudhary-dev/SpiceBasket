/* ============================================================
   FILE: src/pages/AuthPage.jsx
   ROUTE: /auth
   PURPOSE: Login and Register forms — toggles between two modes

   CONCEPTS:
   - mode state        → 'login' | 'register' — toggles forms
   - formData state    → controlled inputs for all fields
   - useAuthStore      → calls login() or register()
                         reads isLoading, error, isAuthenticated
   - useEffect         → if already logged in, redirect to home
   - useNavigate       → redirect after successful auth
   - Password toggle   → show/hide password eye icon
   ============================================================ */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/* ============================================================
   COMPONENT: AuthPage
   ============================================================ */
export default function AuthPage() {
  const navigate = useNavigate();

  /* ── Zustand auth ── */
  const { login, register, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  /* ── Local state ── */

  /* mode: which form is shown */
  const [mode, setMode] = useState("login");

  /* showPassword: toggle password visibility */
  const [showPassword, setShowPassword] = useState(false);

  /* formData: controlled inputs — all fields in one object
     Using one object instead of 3 separate states is cleaner.
     Update with spread: setFormData(prev => ({...prev, email: val})) */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* ── EFFECT: Redirect if already logged in ──
     If user is already authenticated and navigates to /auth,
     send them home immediately — no need to log in again */
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  /* ── EFFECT: Clear error when switching modes ──
     Switching Login ↔ Register clears any previous error */
  useEffect(() => {
    clearError();
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
  }, [mode]);

  /* ── HANDLER: Input change ──
     Uses computed property name [field] to update
     the correct field in formData object */
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    /* Clear error as user starts typing */
    if (error) clearError();
  };

  /* ── HANDLER: Form submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* e.preventDefault() stops the default browser form
       submission which would reload the page */

    if (mode === "login") {
      await login({ email: formData.email, password: formData.password });
    } else {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
    /* After login/register, useEffect above handles redirect
       if isAuthenticated becomes true */
  };

  /* ── DERIVED ── */
  const isLogin = mode === "login";

  /* ── INPUT STYLE HELPER ──
     Returns consistent style for all text inputs */
  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    fontFamily: "'Poppins',sans-serif",
    fontSize: "14px",
    color: "#2C1A0E",
    background: "#FEFAF4",
    border: "1.5px solid #E8D5B0",
    borderRadius: "12px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  };

  /* ── RENDER ── */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
        radial-gradient(ellipse at 20% 50%, rgba(244,163,26,0.1) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(139,37,0,0.06) 0%, transparent 55%),
        linear-gradient(135deg, #FEFAF4 0%, #F5EDD8 100%)
      `,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
        }}
      >
        {/* ── LOGO + BRAND ── */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* SVG Logo */}
            <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
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
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#2C1A0E",
                  lineHeight: "1",
                }}
              >
                Spice Basket
              </div>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "10px",
                  color: "#C9922A",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  marginTop: "2px",
                }}
              >
                Pure · Authentic · Indian
              </div>
            </div>
          </Link>
        </div>

        {/* ── FORM CARD ── */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            border: "1px solid #E8D5B0",
            boxShadow: "0 8px 40px rgba(44,26,14,0.1)",
            overflow: "hidden",
          }}
        >
          {/* ── TAB SWITCHER: Login / Register ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderBottom: "1px solid #E8D5B0",
            }}
          >
            {["login", "register"].map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "14px",
                  fontWeight: mode === tab ? "700" : "500",
                  padding: "18px",
                  background: mode === tab ? "white" : "#F5EDD8",
                  border: "none",
                  cursor: "pointer",
                  color: mode === tab ? "#2C1A0E" : "#B8956A",
                  transition: "all 0.2s ease",
                  /* Bottom border on active tab */
                  borderBottom:
                    mode === tab
                      ? "3px solid #F4A31A"
                      : "3px solid transparent",
                  textTransform: "capitalize",
                  letterSpacing: "0.3px",
                }}
              >
                {tab === "login" ? "🔑 Login" : "✨ Register"}
              </button>
            ))}
          </div>

          {/* ── FORM BODY ── */}
          <div style={{ padding: "32px" }}>
            {/* Welcome heading */}
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  color: "#2C1A0E",
                  marginBottom: "6px",
                }}
              >
                {isLogin ? "Welcome back!" : "Create your account"}
              </h2>
              <p
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "13px",
                  color: "#7A5C44",
                  lineHeight: "1.6",
                }}
              >
                {isLogin
                  ? "Sign in to access your orders and saved spices."
                  : "Join thousands of Indian households discovering pure spices."}
              </p>
            </div>

            {/* ── ERROR MESSAGE ── */}
            {error && (
              <div
                style={{
                  background: "#FDECEA",
                  border: "1px solid rgba(139,37,0,0.25)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "16px" }}>⚠️</span>
                <span
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "13px",
                    color: "#8B2500",
                    fontWeight: "500",
                  }}
                >
                  {error}
                </span>
              </div>
            )}

            {/* ── FORM ── */}
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Name field — Register only */}
              {!isLogin && (
                <div>
                  <label
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#5C3D2E",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={handleChange("name")}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#F4A31A";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(244,163,26,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E8D5B0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              )}

              {/* Email field */}
              <div>
                <label
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#5C3D2E",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#F4A31A";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(244,163,26,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E8D5B0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Password field with show/hide toggle */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#5C3D2E",
                    }}
                  >
                    Password *
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#F4A31A",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                      }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                {/* Password input + eye toggle */}
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      isLogin ? "Enter your password" : "Min. 6 characters"
                    }
                    value={formData.password}
                    onChange={handleChange("password")}
                    required
                    minLength={isLogin ? 1 : 6}
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#F4A31A";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(244,163,26,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E8D5B0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {/* Eye icon toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#B8956A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#F4A31A")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#B8956A")
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Password strength hint for register */}
                {!isLogin && formData.password.length > 0 && (
                  <div
                    style={{
                      marginTop: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: "3px",
                        borderRadius: "3px",
                        background: "#E8D5B0",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "3px",
                          width:
                            formData.password.length < 6
                              ? "33%"
                              : formData.password.length < 10
                                ? "66%"
                                : "100%",
                          background:
                            formData.password.length < 6
                              ? "#8B2500"
                              : formData.password.length < 10
                                ? "#F4A31A"
                                : "#2C6E49",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color:
                          formData.password.length < 6
                            ? "#8B2500"
                            : formData.password.length < 10
                              ? "#C9922A"
                              : "#2C6E49",
                      }}
                    >
                      {formData.password.length < 6
                        ? "Weak"
                        : formData.password.length < 10
                          ? "Good"
                          : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              {/* Terms checkbox — Register only */}
              {!isLogin && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    style={{
                      marginTop: "2px",
                      accentColor: "#F4A31A",
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                  <label
                    htmlFor="terms"
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12px",
                      color: "#7A5C44",
                      lineHeight: "1.5",
                      cursor: "pointer",
                    }}
                  >
                    I agree to the{" "}
                    <span style={{ color: "#F4A31A", fontWeight: "600" }}>
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span style={{ color: "#F4A31A", fontWeight: "600" }}>
                      Privacy Policy
                    </span>
                  </label>
                </div>
              )}

              {/* ── SUBMIT BUTTON ── */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#2C1A0E",
                  background: isLoading ? "#E8D5B0" : "#F4A31A",
                  border: "none",
                  padding: "15px",
                  borderRadius: "14px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isLoading
                    ? "none"
                    : "0 4px 16px rgba(244,163,26,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "4px",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = "#D4880A";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = "#F4A31A";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {isLoading ? (
                  /* Loading spinner */
                  <>
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid rgba(44,26,14,0.3)",
                        borderTop: "2px solid #2C1A0E",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : isLogin ? (
                  "🔑 Sign In"
                ) : (
                  "✨ Create Account"
                )}
              </button>
            </form>

            {/* ── DIVIDER ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "24px 0",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "#E8D5B0" }} />
              <span
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "12px",
                  color: "#B8956A",
                  fontWeight: "500",
                }}
              >
                or
              </span>
              <div style={{ flex: 1, height: "1px", background: "#E8D5B0" }} />
            </div>

            {/* ── SWITCH MODE LINK ── */}
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "13px",
                  color: "#7A5C44",
                }}
              >
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </span>
              <button
                onClick={() => setMode(isLogin ? "register" : "login")}
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#F4A31A",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4880A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#F4A31A")}
              >
                {isLogin ? "Register here →" : "← Sign in"}
              </button>
            </div>

            {/* Demo hint */}
            <div
              style={{
                marginTop: "20px",
                background: "#F5EDD8",
                border: "1px solid #E8D5B0",
                borderRadius: "10px",
                padding: "12px 14px",
                fontFamily: "'Poppins',sans-serif",
                fontSize: "12px",
                color: "#5C3D2E",
                lineHeight: "1.6",
              }}
            >
              <strong>Demo mode:</strong> Enter any valid email + password to
              login. Use promo code{" "}
              <strong style={{ color: "#8B2500" }}>SPICE50</strong> in cart for
              ₹50 off.
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link
            to="/"
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "13px",
              fontWeight: "500",
              color: "#B8956A",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#F4A31A")}
            onMouseLeave={(e) => (e.target.style.color = "#B8956A")}
          >
            ← Back to Spice Basket
          </Link>
        </div>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
