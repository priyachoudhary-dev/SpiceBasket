/* ============================================================
   FILE: src/pages/DetailPage.jsx
   ROUTE: /product/:id
   PURPOSE: Full single product detail view

   KEY CONCEPTS:
   - useParams()      → reads :id from URL
   - getSpiceById()   → finds product from data using id
   - quantity state   → local +/- counter (NOT in cart yet)
   - addToCart()      → Zustand — adds product × quantity
   - Related products → same category, excludes current product
   ============================================================ */

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSpiceById, getSpicesByCategory } from '../data/spices'
import { useCartStore } from '../store/cartStore'

/* ── Stars utility ── */
function Stars({ rating, size = 16 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? '#F4A31A' : '#E8D5B0', fontSize: `${size}px`, lineHeight: 1 }}>★</span>
      ))}
    </div>
  )
}

/* ── RelatedCard: small card in related products section ── */
function RelatedCard({ spice }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/product/${spice.id}`)}
      style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E8D5B0', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(44,26,14,0.06)' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(44,26,14,0.12)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(44,26,14,0.06)' }}
    >
      <div style={{ height: '140px', overflow: 'hidden', background: 'linear-gradient(135deg,#FEF3D4,#F5EDD8)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={spice.image.url} alt={spice.image.alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          onError={(e) => {
            e.target.style.display = 'none'
            const el = document.createElement('span')
            el.textContent = spice.image.fallback
            el.style.fontSize = '3rem'
            e.target.parentElement.appendChild(el)
          }}
        />
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '10px', color: '#B8956A', marginBottom: '3px' }}>{spice.hindiName}</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '14px', fontWeight: '700', color: '#2C1A0E', marginBottom: '6px', lineHeight: '1.3' }}>{spice.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '16px', fontWeight: '800', color: '#2C1A0E' }}>₹{spice.price}</span>
          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '10px', color: '#B8956A' }}>{spice.weight}</span>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   MAIN COMPONENT: DetailPage
   ============================================================ */
export default function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const spice = getSpiceById(id)

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const addToCart = useCartStore((state) => state.addToCart)

  /* Reset all state when product id changes (clicking related product) */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setQuantity(1)
    setAdded(false)
    setActiveTab('description')
    setImageLoaded(false)
    setImageError(false)
  }, [id])

  /* Related: same category, exclude current, max 4 */
  const relatedSpices = spice
    ? getSpicesByCategory(spice.category).filter((s) => s.id !== spice.id).slice(0, 4)
    : []

  const discount = spice?.originalPrice
    ? Math.round(((spice.originalPrice - spice.price) / spice.originalPrice) * 100)
    : null

  /* Add quantity times to cart */
  const handleAddToCart = () => {
    if (!spice.inStock) return
    for (let i = 0; i < quantity; i++) addToCart(spice)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!spice.inStock) return
    for (let i = 0; i < quantity; i++) addToCart(spice)
    navigate('/cart')
  }

  /* Product not found */
  if (!spice) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins',sans-serif", textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌶️</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', fontWeight: '800', color: '#2C1A0E', marginBottom: '12px' }}>Spice Not Found</h2>
        <p style={{ color: '#7A5C44', marginBottom: '28px', fontSize: '15px' }}>We couldn't find a spice with id "<strong>{id}</strong>".</p>
        <button onClick={() => navigate('/listing')} style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', fontWeight: '700', color: '#2C1A0E', background: '#F4A31A', border: 'none', padding: '13px 30px', borderRadius: '12px', cursor: 'pointer' }}>
          ← Browse All Spices
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FEFAF4', paddingBottom: '80px' }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ background: 'linear-gradient(180deg,#F5EDD8 0%,#FEFAF4 100%)', borderBottom: '1px solid #E8D5B0', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: '#B8956A', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#B8956A', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#F4A31A')} onMouseLeave={(e) => (e.target.style.color = '#B8956A')}>Home</Link>
          <span>›</span>
          <Link to="/listing" style={{ color: '#B8956A', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#F4A31A')} onMouseLeave={(e) => (e.target.style.color = '#B8956A')}>All Spices</Link>
          <span>›</span>
          <span style={{ color: '#2C1A0E', fontWeight: '600' }}>{spice.name}</span>
        </div>
      </div>

      {/* ── PRODUCT HERO — two columns ── */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'start' }}>

          {/* LEFT: Image */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{
              borderRadius: '24px', overflow: 'hidden',
              background: 'linear-gradient(135deg,#FEF3D4,#F5EDD8)',
              border: '1px solid #E8D5B0',
              boxShadow: '0 8px 40px rgba(44,26,14,0.12)',
              aspectRatio: '1/1', position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Emoji fallback while image loads */}
              {(!imageLoaded || imageError) && (
                <div style={{ fontSize: '8rem', position: 'absolute', zIndex: 1 }}>{spice.image.fallback}</div>
              )}
              {!imageError && (
                <img
                  src={spice.image.url} alt={spice.image.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 2, opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}
              {!spice.inStock && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'rgba(44,26,14,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem', fontWeight: '800', color: 'white', background: 'rgba(44,26,14,0.8)', padding: '12px 28px', borderRadius: '100px' }}>Out of Stock</span>
                </div>
              )}
            </div>

            {/* Badges below image */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              {spice.isBestseller && <span style={{ background: '#F4A31A', color: '#2C1A0E', fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: '700', padding: '5px 14px', borderRadius: '100px' }}>⭐ Bestseller</span>}
              {spice.isNew && <span style={{ background: '#2C6E49', color: 'white', fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: '700', padding: '5px 14px', borderRadius: '100px' }}>🆕 New Arrival</span>}
              {discount && <span style={{ background: '#8B2500', color: 'white', fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: '700', padding: '5px 14px', borderRadius: '100px' }}>🏷️ {discount}% OFF</span>}
              <span style={{ background: '#F5EDD8', color: '#5C3D2E', border: '1px solid #E8D5B0', fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: '600', padding: '5px 14px', borderRadius: '100px' }}>📍 {spice.origin}</span>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div>
            {/* Category pill */}
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: '600', color: '#C9922A', background: '#FEF3D4', border: '1px solid rgba(201,146,42,0.3)', padding: '4px 14px', borderRadius: '100px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {spice.category}
              </span>
            </div>

            {/* Hindi name */}
            <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', color: '#B8956A', marginBottom: '6px' }}>{spice.hindiName}</div>

            {/* Name */}
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: '800', color: '#2C1A0E', lineHeight: '1.2', marginBottom: '10px' }}>
              {spice.name}
            </h1>

            {/* Tagline */}
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '15px', color: '#5C3D2E', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.6' }}>
              "{spice.tagline}"
            </p>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <Stars rating={spice.rating} size={18} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', fontWeight: '700', color: '#2C1A0E' }}>{spice.rating}</span>
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: '#B8956A' }}>({spice.reviewCount.toLocaleString('en-IN')} reviews)</span>
            </div>

            <div style={{ height: '1px', background: '#E8D5B0', marginBottom: '24px' }} />

            {/* Price */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.4rem', fontWeight: '800', color: '#2C1A0E' }}>₹{spice.price}</span>
                {spice.originalPrice && <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '18px', color: '#B8956A', textDecoration: 'line-through' }}>₹{spice.originalPrice}</span>}
                {discount && <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', fontWeight: '700', color: '#8B2500', background: '#FDECEA', padding: '3px 10px', borderRadius: '6px' }}>You save ₹{spice.originalPrice - spice.price}</span>}
              </div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: '#7A5C44', marginTop: '4px' }}>
                Price per <strong>{spice.weight}</strong> · Inclusive of all taxes
              </div>
            </div>

            {/* Quantity selector */}
            {spice.inStock && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: '600', color: '#5C3D2E', marginBottom: '10px' }}>Quantity</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}
                    style={{ width: '40px', height: '40px', border: '1.5px solid #E8D5B0', borderRight: 'none', borderRadius: '10px 0 0 10px', background: quantity <= 1 ? '#F5EDD8' : 'white', color: quantity <= 1 ? '#B8956A' : '#2C1A0E', fontSize: '18px', fontWeight: '700', cursor: quantity <= 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >−</button>
                  <div style={{ width: '56px', height: '40px', border: '1.5px solid #E8D5B0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins',sans-serif", fontSize: '16px', fontWeight: '700', color: '#2C1A0E', background: 'white' }}>
                    {quantity}
                  </div>
                  <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} disabled={quantity >= 10}
                    style={{ width: '40px', height: '40px', border: '1.5px solid #E8D5B0', borderLeft: 'none', borderRadius: '0 10px 10px 0', background: quantity >= 10 ? '#F5EDD8' : 'white', color: quantity >= 10 ? '#B8956A' : '#2C1A0E', fontSize: '18px', fontWeight: '700', cursor: quantity >= 10 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >+</button>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: '#7A5C44', marginLeft: '16px' }}>
                    Total: <strong style={{ color: '#2C1A0E' }}>₹{spice.price * quantity}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart} disabled={!spice.inStock}
                style={{ flex: 1, minWidth: '160px', fontFamily: "'Poppins',sans-serif", fontSize: '15px', fontWeight: '700', padding: '15px 24px', borderRadius: '14px', border: 'none', cursor: spice.inStock ? 'pointer' : 'not-allowed', transition: 'all 0.25s ease', background: !spice.inStock ? '#E8D5B0' : added ? '#2C6E49' : '#F4A31A', color: !spice.inStock ? '#B8956A' : added ? 'white' : '#2C1A0E', boxShadow: spice.inStock && !added ? '0 4px 16px rgba(244,163,26,0.35)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onMouseEnter={(e) => { if (spice.inStock && !added) { e.currentTarget.style.background = '#D4880A'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
                onMouseLeave={(e) => { if (spice.inStock && !added) { e.currentTarget.style.background = '#F4A31A'; e.currentTarget.style.transform = 'translateY(0)' } }}
              >
                {!spice.inStock ? '❌ Out of Stock' : added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
              </button>
              {spice.inStock && (
                <button
                  onClick={handleBuyNow}
                  style={{ flex: 1, minWidth: '160px', fontFamily: "'Poppins',sans-serif", fontSize: '15px', fontWeight: '700', padding: '15px 24px', borderRadius: '14px', border: '2px solid #2C1A0E', background: '#2C1A0E', color: 'white', cursor: 'pointer', transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#5C3D2E'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#2C1A0E'; e.currentTarget.style.transform = 'translateY(0)' }}
                >⚡ Buy Now</button>
              )}
            </div>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '28px' }}>
              {[{ icon: '🌿', label: 'Farm Direct' }, { icon: '📦', label: 'Free Delivery ₹499+' }, { icon: '↩️', label: 'Easy Returns' }].map((b) => (
                <div key={b.label} style={{ background: '#F5EDD8', borderRadius: '10px', padding: '10px 8px', textAlign: 'center', border: '1px solid #E8D5B0' }}>
                  <div style={{ fontSize: '18px', marginBottom: '4px' }}>{b.icon}</div>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '10px', fontWeight: '600', color: '#5C3D2E', lineHeight: '1.3' }}>{b.label}</div>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', background: '#E8D5B0', marginBottom: '24px' }} />

            {/* Tabs */}
            <div>
              <div style={{ display: 'flex', borderBottom: '2px solid #E8D5B0', marginBottom: '20px' }}>
                {['description', 'benefits'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', fontWeight: activeTab === tab ? '700' : '500', padding: '10px 24px', background: 'transparent', border: 'none', color: activeTab === tab ? '#2C1A0E' : '#B8956A', cursor: 'pointer', borderBottom: activeTab === tab ? '3px solid #F4A31A' : '3px solid transparent', marginBottom: '-2px', transition: 'all 0.2s ease', textTransform: 'capitalize' }}
                  >{tab}</button>
                ))}
              </div>

              {activeTab === 'description' && (
                <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '14px', color: '#5C3D2E', lineHeight: '1.85' }}>
                  {spice.description}
                </p>
              )}

              {activeTab === 'benefits' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {spice.benefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#F5EDD8', borderRadius: '12px', padding: '14px 16px', border: '1px solid #E8D5B0' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F4A31A', color: '#2C1A0E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', flexShrink: 0, fontFamily: "'Poppins',sans-serif" }}>{i + 1}</span>
                      <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', color: '#2C1A0E', lineHeight: '1.6', fontWeight: '500' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedSpices.length > 0 && (
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px', borderTop: '1px solid #E8D5B0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: '600', color: '#F4A31A', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>You May Also Like</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: '800', color: '#2C1A0E' }}>More from {spice.category}</h2>
            </div>
            <Link to="/listing"
              style={{ fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: '600', color: '#F4A31A', textDecoration: 'none', border: '1.5px solid #F4A31A', padding: '8px 20px', borderRadius: '10px', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F4A31A'; e.currentTarget.style.color = '#2C1A0E' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#F4A31A' }}
            >View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '20px' }}>
            {relatedSpices.map((s) => <RelatedCard key={s.id} spice={s} />)}
          </div>
        </section>
      )}

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  )
}
