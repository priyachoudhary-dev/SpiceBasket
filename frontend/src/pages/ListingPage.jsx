/* ============================================================
   FILE: src/pages/ListingPage.jsx
   ROUTE: /listing
   PURPOSE: Shows all 15 spices with search, filter, and sort

   IMPORTS EXPLAINED:
   - useState      → local state (search, category, sort)
   - useEffect     → runs after render (reading URL params)
   - useMemo       → caches computed filtered list (performance)
   - useRef        → reference to search input DOM element
   - useNavigate   → go to /product/:id on card click
   - useSearchParams → reads ?category=Blend from URL
   - spices        → full 15-product array from data file
   - categories    → ['Whole Spice', 'Ground Spice'...] array
   - useCartStore  → Zustand cart addToCart action
   ============================================================ */

import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { spices, categories } from "../data/spices";
import { useCartStore } from "../store/cartStore";

/* ============================================================
   UTILITY: Stars
   Renders 5 star icons — filled gold or empty grey
   ============================================================ */
function Stars({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            color: star <= Math.round(rating) ? "#F4A31A" : "#E8D5B0",
            fontSize: "13px",
            lineHeight: "1",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   COMPONENT: SpiceCard
   Single product card in the grid.

   Props:
     spice  → one spice object from spices.js
     onAdd  → called when Add to Cart is clicked
     added  → boolean true for 1.5s after adding
   ============================================================ */
function SpiceCard({ spice, onAdd, added }) {
  const navigate = useNavigate();

  /* Discount % — only if originalPrice exists */
  const discount = spice.originalPrice
    ? Math.round(
        ((spice.originalPrice - spice.price) / spice.originalPrice) * 100,
      )
    : null;

  return (
    <div
      onClick={() => navigate(`/product/${spice.id}`)}
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #E8D5B0",
        boxShadow: "0 2px 12px rgba(44,26,14,0.06)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        opacity: spice.inStock ? 1 : 0.78,
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(44,26,14,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(44,26,14,0.06)";
      }}
    >
      {/* ── IMAGE AREA ── */}
      <div
        style={{
          position: "relative",
          height: "200px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #FEF3D4, #F5EDD8)",
          flexShrink: 0,
        }}
      >
        <img
          src={spice.image.url}
          alt={spice.image.alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onError={(e) => {
            /* Hide broken image, show emoji fallback */
            e.target.style.display = "none";
            const parent = e.target.parentElement;
            parent.style.display = "flex";
            parent.style.alignItems = "center";
            parent.style.justifyContent = "center";
            parent.style.fontSize = "4rem";
            const el = document.createElement("span");
            el.textContent = spice.image.fallback;
            parent.appendChild(el);
          }}
        />

        {/* ── BADGES top-left ── */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          {discount && (
            <span
              style={{
                background: "#8B2500",
                color: "white",
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                padding: "3px 9px",
                borderRadius: "100px",
              }}
            >
              -{discount}%
            </span>
          )}
          {spice.isBestseller && (
            <span
              style={{
                background: "#F4A31A",
                color: "#2C1A0E",
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                padding: "3px 9px",
                borderRadius: "100px",
              }}
            >
              ⭐ Bestseller
            </span>
          )}
          {spice.isNew && (
            <span
              style={{
                background: "#2C6E49",
                color: "white",
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                padding: "3px 9px",
                borderRadius: "100px",
              }}
            >
              🆕 New
            </span>
          )}
          {!spice.inStock && (
            <span
              style={{
                background: "rgba(44,26,14,0.75)",
                color: "white",
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                fontWeight: "600",
                padding: "3px 9px",
                borderRadius: "100px",
              }}
            >
              Out of Stock
            </span>
          )}
        </div>

        {/* Category chip — top right */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(44,26,14,0.65)",
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

        {/* Origin — bottom of image */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            background: "linear-gradient(transparent, rgba(44,26,14,0.6))",
            padding: "24px 12px 8px",
          }}
        >
          <div
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "10px",
              color: "rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            📍 {spice.origin}
          </div>
        </div>
      </div>

      {/* ── CARD BODY ── */}
      <div
        style={{
          padding: "16px 18px 18px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Hindi name */}
        <div
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "11px",
            color: "#B8956A",
            marginBottom: "3px",
          }}
        >
          {spice.hindiName}
        </div>

        {/* English name */}
        <h3
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "16px",
            fontWeight: "700",
            color: "#2C1A0E",
            marginBottom: "5px",
            lineHeight: "1.3",
          }}
        >
          {spice.name}
        </h3>

        {/* Tagline — clamped to 2 lines so all cards same height */}
        <p
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "11px",
            color: "#7A5C44",
            lineHeight: "1.55",
            marginBottom: "10px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {spice.tagline}
        </p>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "14px",
          }}
        >
          <Stars rating={spice.rating} />
          <span
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "11px",
              color: "#7A5C44",
              fontWeight: "500",
            }}
          >
            {spice.rating} ({spice.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>

        {/* Spacer pushes price+button to bottom */}
        <div style={{ flex: 1 }} />

        {/* Price + Add button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "6px" }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "20px",
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
                    fontSize: "12px",
                    color: "#B8956A",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{spice.originalPrice}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "10px",
                color: "#B8956A",
                marginTop: "1px",
              }}
            >
              {spice.weight}
            </div>
          </div>

          {/* Add to Cart
              e.stopPropagation() — stops click reaching the
              card container, so card navigation doesn't fire */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (spice.inStock) onAdd(spice);
            }}
            disabled={!spice.inStock}
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "12px",
              fontWeight: "700",
              padding: "9px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: spice.inStock ? "pointer" : "not-allowed",
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
              background: !spice.inStock
                ? "#E8D5B0"
                : added
                  ? "#2C6E49"
                  : "#F4A31A",
              color: !spice.inStock ? "#B8956A" : added ? "white" : "#2C1A0E",
            }}
            onMouseEnter={(e) => {
              if (spice.inStock && !added) {
                e.currentTarget.style.background = "#D4880A";
                e.currentTarget.style.transform = "scale(1.04)";
              }
            }}
            onMouseLeave={(e) => {
              if (spice.inStock && !added) {
                e.currentTarget.style.background = "#F4A31A";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {!spice.inStock ? "Sold Out" : added ? "✓ Added!" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT: ListingPage
   ============================================================ */
export default function ListingPage() {
  /* ── STATE ── */

  /* searchQuery: live text from search bar */
  const [searchQuery, setSearchQuery] = useState("");

  /* activeCategory: which filter pill is selected */
  const [activeCategory, setActiveCategory] = useState("All");

  /* sortOrder: controls ordering of results */
  const [sortOrder, setSortOrder] = useState("default");

  /* addedIds: Set of recently-added spice ids
     Set is used because .has() lookup is O(1) — instant */
  const [addedIds, setAddedIds] = useState(new Set());

  /* ── HOOKS ── */
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchRef = useRef(null);
  const addToCart = useCartStore((state) => state.addToCart);

  /* ── EFFECT: Pre-select category from URL ──
     /listing?category=Blend → sets activeCategory to 'Blend'
     Used by Footer category links */
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.includes(cat)) setActiveCategory(cat);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ── DERIVED STATE: filteredAndSortedSpices ──
     useMemo: only recomputes when dependencies change
     Never stored in state — computed from existing state */
  const filteredAndSortedSpices = useMemo(() => {
    /* Step 1: Filter by category */
    let result = spices.filter((s) =>
      activeCategory === "All" ? true : s.category === activeCategory,
    );

    /* Step 2: Filter by search query */
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.hindiName.includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.origin.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    /* Step 3: Sort — spread first to avoid mutating original */
    const sorted = [...result];
    switch (sortOrder) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [searchQuery, activeCategory, sortOrder]);

  /* ── HANDLER: Add to cart ── */
  const handleAddToCart = (spice) => {
    addToCart(spice);
    setAddedIds((prev) => new Set([...prev, spice.id]));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(spice.id);
        return next;
      });
    }, 1500);
  };

  /* ── HANDLER: Category pill click ── */
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchQuery("");
    if (searchRef.current) searchRef.current.focus();
  };

  /* ── HANDLER: Clear search ── */
  const handleClearSearch = () => {
    setSearchQuery("");
    if (searchRef.current) searchRef.current.focus();
  };

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FEFAF4",
        paddingBottom: "80px",
      }}
    >
      {/* ── SECTION 1: PAGE HEADER ── */}
      <section
        style={{
          background: `
          radial-gradient(ellipse at 0% 100%, rgba(244,163,26,0.12) 0%, transparent 60%),
          radial-gradient(ellipse at 100% 0%, rgba(139,37,0,0.06) 0%, transparent 60%),
          linear-gradient(180deg, #F5EDD8 0%, #FEFAF4 100%)
        `,
          borderBottom: "1px solid #E8D5B0",
          padding: "48px 24px 40px",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
              fontFamily: "'Poppins',sans-serif",
              fontSize: "13px",
              color: "#B8956A",
            }}
          >
            <span
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "#F4A31A")}
              onMouseLeave={(e) => (e.target.style.color = "#B8956A")}
            >
              Home
            </span>
            <span>›</span>
            <span style={{ color: "#2C1A0E", fontWeight: "600" }}>
              All Spices
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: "800",
              color: "#2C1A0E",
              marginBottom: "10px",
            }}
          >
            Our Spice Collection
          </h1>
          <p
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "15px",
              color: "#7A5C44",
              maxWidth: "520px",
              lineHeight: "1.7",
            }}
          >
            From the foothills of the Himalayas to the coast of Kerala — every
            spice sourced with purpose, packed with purity.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: STICKY CONTROLS ── */}
      <section
        style={{
          background: "white",
          borderBottom: "1px solid #E8D5B0",
          padding: "20px 24px",
          position: "sticky",
          top: "70px" /* sits just below the 70px fixed Navbar */,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(44,26,14,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Row 1: Search + Sort */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Search bar */}
            <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  pointerEvents: "none",
                }}
              >
                🔍
              </div>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search spices... try 'saffron', 'jeera', 'haldi'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 42px",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "14px",
                  color: "#2C1A0E",
                  background: "#FEFAF4",
                  border: "1.5px solid #E8D5B0",
                  borderRadius: "12px",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#F4A31A";
                  e.target.style.boxShadow = "0 0 0 3px rgba(244,163,26,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8D5B0";
                  e.target.style.boxShadow = "none";
                }}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#E8D5B0",
                    border: "none",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    color: "#5C3D2E",
                    fontWeight: "700",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#C9922A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#E8D5B0")
                  }
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#2C1A0E",
                  background: "#FEFAF4",
                  border: "1.5px solid #E8D5B0",
                  borderRadius: "12px",
                  padding: "12px 36px 12px 14px",
                  cursor: "pointer",
                  outline: "none",
                  appearance: "none",
                  transition: "border-color 0.2s",
                  minWidth: "180px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#F4A31A")}
                onBlur={(e) => (e.target.style.borderColor = "#E8D5B0")}
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A → Z</option>
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "10px",
                  color: "#7A5C44",
                  pointerEvents: "none",
                }}
              >
                ▼
              </div>
            </div>
          </div>

          {/* Row 2: Category filter pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {["All", ...categories].map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "13px",
                    fontWeight: isActive ? "700" : "500",
                    padding: "7px 18px",
                    borderRadius: "100px",
                    border: isActive
                      ? "1.5px solid #F4A31A"
                      : "1.5px solid #E8D5B0",
                    background: isActive ? "#F4A31A" : "transparent",
                    color: isActive ? "#2C1A0E" : "#5C3D2E",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#F4A31A";
                      e.currentTarget.style.color = "#F4A31A";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#E8D5B0";
                      e.currentTarget.style.color = "#5C3D2E";
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: RESULTS + GRID ── */}
      <section
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px 0" }}
      >
        {/* Results count + clear filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "14px",
              color: "#7A5C44",
            }}
          >
            Showing{" "}
            <strong style={{ color: "#2C1A0E" }}>
              {filteredAndSortedSpices.length}
            </strong>{" "}
            {filteredAndSortedSpices.length === 1 ? "spice" : "spices"}
            {activeCategory !== "All" && (
              <span>
                {" "}
                in{" "}
                <strong style={{ color: "#F4A31A" }}>{activeCategory}</strong>
              </span>
            )}
            {searchQuery && (
              <span>
                {" "}
                for "<strong style={{ color: "#F4A31A" }}>{searchQuery}</strong>
                "
              </span>
            )}
          </div>

          {(searchQuery || activeCategory !== "All") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setSortOrder("default");
              }}
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "12px",
                fontWeight: "600",
                color: "#8B2500",
                background: "#FDECEA",
                border: "1px solid rgba(139,37,0,0.2)",
                borderRadius: "100px",
                padding: "5px 14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#FCCAC5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FDECEA")
              }
            >
              ✕ Clear all filters
            </button>
          )}
        </div>

        {/* Empty state */}
        {filteredAndSortedSpices.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "white",
              borderRadius: "24px",
              border: "1px solid #E8D5B0",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🔍</div>
            <h3
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#2C1A0E",
                marginBottom: "10px",
              }}
            >
              No spices found
            </h3>
            <p
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "14px",
                color: "#7A5C44",
                marginBottom: "28px",
              }}
            >
              We couldn't find any spice matching "
              <strong>{searchQuery}</strong>". Try a different name or browse
              all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "14px",
                fontWeight: "700",
                color: "#2C1A0E",
                background: "#F4A31A",
                border: "none",
                padding: "13px 32px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#D4880A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#F4A31A")
              }
            >
              Show All Spices
            </button>
          </div>
        )}

        {/* Product grid
            auto-fill: fills as many columns as fit
            minmax(260px,1fr): min 260px, max 1 fraction */}
        {filteredAndSortedSpices.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
              gap: "24px",
            }}
          >
            {filteredAndSortedSpices.map((spice) => (
              <SpiceCard
                key={spice.id}
                spice={spice}
                onAdd={handleAddToCart}
                added={addedIds.has(spice.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
