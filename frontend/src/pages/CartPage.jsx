/* ============================================================
   FILE: src/pages/CartPage.jsx
   ROUTE: /cart
   PURPOSE: Shows cart items, quantity controls, order summary

   CONCEPTS USED:
   - useCartStore     → reads items[], calls updateQuantity,
                        removeFromCart, clearCart, totalPrice,
                        totalItems
   - useNavigate      → "Continue Shopping" and "Checkout" buttons
   - useAuthStore     → checks if user is logged in for checkout
   - Delivery logic   → free above ₹499, else ₹49 flat
   - Promo code       → UI only for now (mock validation)
   - Empty state      → shown when items array is empty
   ============================================================ */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

/* ============================================================
   CONSTANTS
   Defined outside component so they are not recreated
   on every render
   ============================================================ */
const DELIVERY_THRESHOLD = 499; /* Free delivery above this */
const DELIVERY_CHARGE = 49; /* Flat charge if below threshold */
const VALID_PROMO = "SPICE50"; /* Mock promo code */
const PROMO_DISCOUNT = 50; /* ₹50 off with promo */

/* ============================================================
   COMPONENT: CartItem
   Single row in the cart — image, name, price, qty controls

   Props:
     item       → { ...spice, quantity } from cartStore
     onIncrease → calls updateQuantity(id, qty+1)
     onDecrease → calls updateQuantity(id, qty-1)
     onRemove   → calls removeFromCart(id)
   ============================================================ */
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const navigate = useNavigate();

  /* Line total = price × quantity for this item */
  const lineTotal = item.price * item.quantity;

  return (
    <div
      style={{
        display: "grid",
        /* Image | Info | Qty controls | Line total | Remove */
        gridTemplateColumns: "80px 1fr auto auto auto",
        gap: "16px",
        alignItems: "center",
        padding: "20px 24px",
        background: "white",
        borderRadius: "16px",
        border: "1px solid #E8D5B0",
        boxShadow: "0 2px 8px rgba(44,26,14,0.05)",
        transition: "box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 20px rgba(44,26,14,0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 8px rgba(44,26,14,0.05)")
      }
    >
      {/* ── IMAGE ── */}
      <div
        onClick={() => navigate(`/product/${item.id}`)}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "12px",
          overflow: "hidden",
          background: "linear-gradient(135deg,#FEF3D4,#F5EDD8)",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #E8D5B0",
        }}
      >
        <img
          src={item.image?.url || ""}
          alt={item.image?.alt || item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.fontSize = "2rem";
            e.target.parentElement.textContent = item.image?.fallback || "🌶️";
          }}
        />
      </div>

      {/* ── PRODUCT INFO ── */}
      <div style={{ minWidth: 0 }}>
        {/* Hindi name */}
        <div
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "10px",
            color: "#B8956A",
            marginBottom: "3px",
          }}
        >
          {item.hindiName}
        </div>

        {/* English name — clickable, goes to detail page */}
        <div
          onClick={() => navigate(`/product/${item.id}`)}
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "15px",
            fontWeight: "700",
            color: "#2C1A0E",
            marginBottom: "4px",
            cursor: "pointer",
            lineHeight: "1.3",
            /* Truncate if too long on small screens */
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#F4A31A")}
          onMouseLeave={(e) => (e.target.style.color = "#2C1A0E")}
        >
          {item.name}
        </div>

        {/* Category + Weight */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "10px",
              color: "#C9922A",
              background: "#FEF3D4",
              border: "1px solid rgba(201,146,42,0.25)",
              padding: "2px 8px",
              borderRadius: "100px",
              fontWeight: "600",
            }}
          >
            {item.category}
          </span>
          <span
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "11px",
              color: "#B8956A",
            }}
          >
            {item.weight}
          </span>
        </div>

        {/* Unit price */}
        <div
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "12px",
            color: "#7A5C44",
            marginTop: "4px",
          }}
        >
          ₹{item.price} each
        </div>
      </div>

      {/* ── QUANTITY CONTROLS ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          flexShrink: 0,
        }}
      >
        {/* Decrease */}
        <button
          onClick={() => onDecrease(item.id, item.quantity)}
          style={{
            width: "32px",
            height: "32px",
            border: "1.5px solid #E8D5B0",
            borderRight: "none",
            borderRadius: "8px 0 0 8px",
            background: "white",
            color: "#2C1A0E",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF3D4")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          −
        </button>

        {/* Quantity display */}
        <div
          style={{
            width: "40px",
            height: "32px",
            border: "1.5px solid #E8D5B0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Poppins',sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: "#2C1A0E",
            background: "white",
          }}
        >
          {item.quantity}
        </div>

        {/* Increase */}
        <button
          onClick={() => onIncrease(item.id, item.quantity)}
          style={{
            width: "32px",
            height: "32px",
            border: "1.5px solid #E8D5B0",
            borderLeft: "none",
            borderRadius: "0 8px 8px 0",
            background: "white",
            color: "#2C1A0E",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF3D4")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          +
        </button>
      </div>

      {/* ── LINE TOTAL ── */}
      <div style={{ textAlign: "right", flexShrink: 0, minWidth: "70px" }}>
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "17px",
            fontWeight: "800",
            color: "#2C1A0E",
          }}
        >
          ₹{lineTotal}
        </div>
        {item.quantity > 1 && (
          <div
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "10px",
              color: "#B8956A",
            }}
          >
            {item.quantity} × ₹{item.price}
          </div>
        )}
      </div>

      {/* ── REMOVE BUTTON ── */}
      <button
        onClick={() => onRemove(item.id)}
        title="Remove from cart"
        style={{
          width: "32px",
          height: "32px",
          background: "transparent",
          border: "1.5px solid #E8D5B0",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          color: "#B8956A",
          transition: "all 0.2s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FDECEA";
          e.currentTarget.style.borderColor = "#8B2500";
          e.currentTarget.style.color = "#8B2500";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "#E8D5B0";
          e.currentTarget.style.color = "#B8956A";
        }}
      >
        🗑
      </button>
    </div>
  );
}

/* ============================================================
   COMPONENT: EmptyCart
   Shown when items array is empty
   ============================================================ */
function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 24px",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      {/* Animated basket illustration */}
      <div
        style={{
          fontSize: "5rem",
          marginBottom: "24px",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        🧺
      </div>
      <h2
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "2rem",
          fontWeight: "800",
          color: "#2C1A0E",
          marginBottom: "12px",
        }}
      >
        Your basket is empty
      </h2>
      <p
        style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: "15px",
          color: "#7A5C44",
          lineHeight: "1.7",
          marginBottom: "32px",
        }}
      >
        Looks like you haven't added any spices yet. Explore our collection and
        fill your basket with India's finest flavours.
      </p>

      {/* CTA buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
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
            padding: "14px 32px",
            borderRadius: "14px",
            cursor: "pointer",
            transition: "all 0.25s ease",
            boxShadow: "0 4px 16px rgba(244,163,26,0.35)",
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
          🌿 Shop Now
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "15px",
            fontWeight: "600",
            color: "#2C1A0E",
            background: "transparent",
            border: "2px solid #E8D5B0",
            padding: "12px 28px",
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
          ← Back to Home
        </button>
      </div>

      {/* Popular spice suggestions */}
      <div style={{ marginTop: "48px" }}>
        <div
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            color: "#B8956A",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Popular Right Now
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "Kashmiri Saffron",
            "Garam Masala",
            "Lakadong Turmeric",
            "Green Cardamom",
          ].map((name) => (
            <button
              key={name}
              onClick={() => navigate("/listing")}
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "12px",
                fontWeight: "500",
                color: "#5C3D2E",
                background: "#F5EDD8",
                border: "1px solid #E8D5B0",
                padding: "6px 14px",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F4A31A";
                e.currentTarget.style.color = "#2C1A0E";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F5EDD8";
                e.currentTarget.style.color = "#5C3D2E";
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-12px)}
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT: CartPage
   ============================================================ */
export default function CartPage() {
  const navigate = useNavigate();

  /* ── Zustand cart state ── */
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  /* ── Zustand auth state ── */
  const { isAuthenticated, user } = useAuthStore();

  /* ── Local state ── */

  /* promoCode: what user typed in promo input */
  const [promoCode, setPromoCode] = useState("");

  /* promoApplied: true after valid code entered */
  const [promoApplied, setPromoApplied] = useState(false);

  /* promoError: message shown when invalid code */
  const [promoError, setPromoError] = useState("");

  /* orderPlaced: shows success screen after "Place Order" */
  const [orderPlaced, setOrderPlaced] = useState(false);

  /* ── Calculations ──
     All derived from totalPrice() — recalculates on every render
     when items change */
  const subtotal = totalPrice();
  const promoDiscount = promoApplied ? PROMO_DISCOUNT : 0;
  const deliveryCharge =
    subtotal - promoDiscount >= DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const grandTotal = subtotal - promoDiscount + deliveryCharge;

  /* ── HANDLERS ── */

  const handleIncrease = (id, currentQty) => {
    if (currentQty < 10) updateQuantity(id, currentQty + 1);
  };

  const handleDecrease = (id, currentQty) => {
    /* updateQuantity handles qty <= 0 → removes item automatically */
    updateQuantity(id, currentQty - 1);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  /* Promo code validation */
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === VALID_PROMO) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try SPICE50");
      setPromoApplied(false);
    }
  };

  /* Remove promo */
  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoCode("");
    setPromoError("");
  };

  /* Place order — mock for now */
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      /* Not logged in → redirect to auth page */
      navigate("/auth");
      return;
    }
    /* Simulate order placement */
    setOrderPlaced(true);
    clearCart();
  };

  /* ── ORDER SUCCESS STATE ── */
  if (orderPlaced) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px",
        }}
      >
        <div style={{ fontSize: "5rem", marginBottom: "20px" }}>🎉</div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "2.2rem",
            fontWeight: "800",
            color: "#2C1A0E",
            marginBottom: "12px",
          }}
        >
          Order Placed Successfully!
        </h2>
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "15px",
            color: "#7A5C44",
            lineHeight: "1.7",
            marginBottom: "8px",
            maxWidth: "440px",
          }}
        >
          Thank you{user ? `, ${user.name}` : ""}! Your spices are being packed
          with care and will reach you in 3–5 business days.
        </p>
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "13px",
            color: "#B8956A",
            marginBottom: "36px",
          }}
        >
          A confirmation will be sent to your registered email.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
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
              padding: "14px 32px",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "all 0.25s",
              boxShadow: "0 4px 16px rgba(244,163,26,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D4880A")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F4A31A")}
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/")}
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "15px",
              fontWeight: "600",
              color: "#2C1A0E",
              background: "transparent",
              border: "2px solid #E8D5B0",
              padding: "12px 28px",
              borderRadius: "14px",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /* ── EMPTY CART STATE ── */
  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        <EmptyCart />
      </div>
    );
  }

  /* ── MAIN CART RENDER ── */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FEFAF4",
        paddingBottom: "80px",
      }}
    >
      {/* ── PAGE HEADER ── */}
      <div
        style={{
          background: "linear-gradient(180deg,#F5EDD8 0%,#FEFAF4 100%)",
          borderBottom: "1px solid #E8D5B0",
          padding: "32px 24px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
              fontFamily: "'Poppins',sans-serif",
              fontSize: "13px",
              color: "#B8956A",
            }}
          >
            <Link
              to="/"
              style={{ color: "#B8956A", textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.color = "#F4A31A")}
              onMouseLeave={(e) => (e.target.style.color = "#B8956A")}
            >
              Home
            </Link>
            <span>›</span>
            <span style={{ color: "#2C1A0E", fontWeight: "600" }}>My Cart</span>
          </div>

          {/* Heading + item count */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.8rem,4vw,2.6rem)",
                fontWeight: "800",
                color: "#2C1A0E",
              }}
            >
              My Cart
            </h1>
            <span
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                color: "#7A5C44",
                background: "#F5EDD8",
                border: "1px solid #E8D5B0",
                padding: "4px 14px",
                borderRadius: "100px",
              }}
            >
              {totalItems()} {totalItems() === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT: two-column layout ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "36px 24px",
          display: "grid",
          /* Left: cart items | Right: order summary */
          gridTemplateColumns: "1fr 360px",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* ════════════════════════════════════
            LEFT COLUMN: Cart Items
        ════════════════════════════════════ */}
        <div>
          {/* Continue Shopping link */}
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => navigate("/listing")}
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "13px",
                fontWeight: "600",
                color: "#F4A31A",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0",
                transition: "gap 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Cart items list */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Clear cart button */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={clearCart}
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "12px",
                fontWeight: "600",
                color: "#8B2500",
                background: "#FDECEA",
                border: "1px solid rgba(139,37,0,0.2)",
                padding: "7px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#FCCAC5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FDECEA")
              }
            >
              🗑 Clear Cart
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════
            RIGHT COLUMN: Order Summary
            position:sticky keeps it visible
            as user scrolls through items
        ════════════════════════════════════ */}
        <div style={{ position: "sticky", top: "90px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              border: "1px solid #E8D5B0",
              boxShadow: "0 4px 20px rgba(44,26,14,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Summary header */}
            <div
              style={{
                background: "linear-gradient(135deg,#2C1A0E,#5C3D2E)",
                padding: "20px 24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.3rem",
                  fontWeight: "800",
                  color: "#FEFAF4",
                }}
              >
                Order Summary
              </h2>
            </div>

            <div style={{ padding: "24px" }}>
              {/* Price rows */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                {/* Subtotal */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "14px",
                      color: "#5C3D2E",
                    }}
                  >
                    Subtotal ({totalItems()} items)
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#2C1A0E",
                    }}
                  >
                    ₹{subtotal}
                  </span>
                </div>

                {/* Promo discount — only shown if applied */}
                {promoApplied && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "13px",
                        color: "#2C6E49",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      🏷️ Promo ({VALID_PROMO})
                      <button
                        onClick={handleRemovePromo}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#8B2500",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: "700",
                          padding: "0",
                        }}
                      >
                        ✕ Remove
                      </button>
                    </span>
                    <span
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#2C6E49",
                      }}
                    >
                      −₹{PROMO_DISCOUNT}
                    </span>
                  </div>
                )}

                {/* Delivery */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "14px",
                      color: "#5C3D2E",
                    }}
                  >
                    Delivery
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: deliveryCharge === 0 ? "#2C6E49" : "#2C1A0E",
                    }}
                  >
                    {deliveryCharge === 0 ? "🎉 Free" : `₹${deliveryCharge}`}
                  </span>
                </div>

                {/* Free delivery nudge — shown when slightly below threshold */}
                {deliveryCharge > 0 && subtotal - promoDiscount > 350 && (
                  <div
                    style={{
                      background: "#FEF3D4",
                      border: "1px solid rgba(244,163,26,0.3)",
                      borderRadius: "10px",
                      padding: "10px 12px",
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12px",
                      color: "#5C3D2E",
                    }}
                  >
                    Add ₹{DELIVERY_THRESHOLD - (subtotal - promoDiscount)} more
                    for free delivery! 🚚
                  </div>
                )}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "#E8D5B0",
                  marginBottom: "16px",
                }}
              />

              {/* Grand total */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#2C1A0E",
                  }}
                >
                  Grand Total
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "#2C1A0E",
                  }}
                >
                  ₹{grandTotal}
                </span>
              </div>

              {/* ── PROMO CODE INPUT ── */}
              {!promoApplied && (
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#5C3D2E",
                      marginBottom: "8px",
                    }}
                  >
                    Promo Code
                  </div>
                  <div style={{ display: "flex", gap: "0" }}>
                    <input
                      type="text"
                      placeholder="Enter code e.g. SPICE50"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleApplyPromo();
                      }}
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "13px",
                        color: "#2C1A0E",
                        background: "#FEFAF4",
                        border: "1.5px solid #E8D5B0",
                        borderRight: "none",
                        borderRadius: "10px 0 0 10px",
                        outline: "none",
                        transition: "border-color 0.2s",
                        letterSpacing: "1px",
                        fontWeight: "600",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#F4A31A")}
                      onBlur={(e) => (e.target.style.borderColor = "#E8D5B0")}
                    />
                    <button
                      onClick={handleApplyPromo}
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#2C1A0E",
                        background: "#F4A31A",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "0 10px 10px 0",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#D4880A")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#F4A31A")
                      }
                    >
                      Apply
                    </button>
                  </div>

                  {/* Promo error message */}
                  {promoError && (
                    <div
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "12px",
                        color: "#8B2500",
                        marginTop: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      ⚠️ {promoError}
                    </div>
                  )}
                </div>
              )}

              {/* Promo success message */}
              {promoApplied && (
                <div
                  style={{
                    background: "#F0FFF4",
                    border: "1px solid rgba(44,110,73,0.3)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    marginBottom: "20px",
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "13px",
                    color: "#2C6E49",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  ✅ ₹{PROMO_DISCOUNT} off applied successfully!
                </div>
              )}

              {/* ── PLACE ORDER BUTTON ── */}
              <button
                onClick={handlePlaceOrder}
                style={{
                  width: "100%",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#2C1A0E",
                  background: "#F4A31A",
                  border: "none",
                  padding: "16px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 20px rgba(244,163,26,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4880A";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(244,163,26,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F4A31A";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(244,163,26,0.4)";
                }}
              >
                {isAuthenticated ? "✅ Place Order" : "🔐 Login to Checkout"}
              </button>

              {/* Not logged in notice */}
              {!isAuthenticated && (
                <p
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "12px",
                    color: "#B8956A",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  You'll be redirected to login first.{" "}
                  <Link
                    to="/auth"
                    style={{ color: "#F4A31A", fontWeight: "600" }}
                  >
                    Login now →
                  </Link>
                </p>
              )}

              {/* Security badges */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                {["🔒 Secure", "📦 Tracked", "↩️ Easy Returns"].map((b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: "11px",
                      color: "#B8956A",
                      fontWeight: "500",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: stack columns on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .cart-item-grid {
            grid-template-columns: 60px 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
