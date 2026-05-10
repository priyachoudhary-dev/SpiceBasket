/* ============================================================
   FILE: src/App.jsx
   PURPOSE: Application shell — sets up routing for all pages

   HOW REACT ROUTER WORKS HERE:
   ─────────────────────────────────────────────────────────────
   BrowserRouter  → wraps the entire app, enables routing
   Routes         → container for all Route definitions
   Route          → maps a URL path to a component

   URL: /          → renders HomePage
   URL: /listing   → renders ListingPage
   URL: /product/:id → renders DetailPage (id is a URL param)
   URL: /cart      → renders CartPage
   URL: /auth      → renders AuthPage

   LAYOUT PATTERN:
   Every page route is wrapped in <Layout> which renders:
     <Navbar />          ← always at top
     <main>{page}</main> ← the page content changes
     <Footer />          ← always at bottom

   This means you NEVER import Navbar/Footer in page files.
   ─────────────────────────────────────────────────────────────

   NOTE: We use react-router-dom v7 installed in your project.
   The <Routes> + <Route> syntax is compatible with v7.
   ============================================================ */

import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Shared layout components */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* Pages */
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";

/* ------------------------------------------------------------
   COMPONENT: Layout
   Wraps every page with Navbar + Footer.
   `children` = the page component rendered between them.

   `paddingTop: '70px'` on <main> is critical:
   Our Navbar is `position: fixed` with height 70px.
   Without this padding, the top of every page would hide
   BEHIND the navbar. This offset pushes content down.
------------------------------------------------------------ */
function Layout({ children }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <main style={{ paddingTop: "70px", flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------
   COMPONENT: App
   Root component — sets up the entire routing tree.
------------------------------------------------------------ */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* LISTING */}
        <Route
          path="/listing"
          element={
            <Layout>
              <ListingPage />
            </Layout>
          }
        />

        {/* DETAIL — :id is a dynamic URL param */}
        <Route
          path="/product/:id"
          element={
            <Layout>
              <DetailPage />
            </Layout>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />

        {/* AUTH */}
        <Route
          path="/auth"
          element={
            <Layout>
              <AuthPage />
            </Layout>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

/* ------------------------------------------------------------
   COMPONENT: NotFound
------------------------------------------------------------ */
function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins',sans-serif",
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ fontSize: "5rem", marginBottom: "24px" }}>🌶️</div>
      <h1
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "3rem",
          fontWeight: "800",
          color: "#2C1A0E",
          marginBottom: "12px",
        }}
      >
        404
      </h1>
      <p style={{ fontSize: "16px", color: "#7A5C44", marginBottom: "32px" }}>
        This page seems to have gone missing — like a rare spice!
      </p>
      <a
        href="/"
        style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: "15px",
          fontWeight: "700",
          color: "#2C1A0E",
          background: "#F4A31A",
          padding: "14px 32px",
          borderRadius: "12px",
          textDecoration: "none",
        }}
      >
        ← Back to Home
      </a>
    </div>
  );
}
