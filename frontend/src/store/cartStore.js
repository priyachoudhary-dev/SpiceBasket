/* ============================================================
   FILE: src/store/cartStore.js
   PURPOSE: Global cart state using Zustand v5
   USED BY: Navbar (badge count), CartPage, DetailPage, SpiceCard

   ZUSTAND v5 IMPORTANT:
   - Import is NAMED:  import { create } from 'zustand'
   - NOT default:      import create from 'zustand'  ← WRONG, crashes
   ============================================================ */

import { create } from "zustand";

/* ------------------------------------------------------------
   useCartStore — the hook every component calls to access cart

   HOW TO USE IN ANY COMPONENT:
   ─────────────────────────────────────────────────────────────
   import { useCartStore } from '../store/cartStore'

   // Inside your component:
   const { items, addToCart, totalItems } = useCartStore()

   // Add a product:
   addToCart(spiceObject)

   // Show badge:
   <span>{totalItems}</span>
   ─────────────────────────────────────────────────────────────
------------------------------------------------------------ */
export const useCartStore = create((set, get) => ({
  /* ----------------------------------------------------------
     STATE: items
     Array of cart entries. Each entry is the full spice object
     PLUS a `quantity` field added by addToCart.

     Example of one item in the array:
     {
       id: 'kashmiri-saffron',
       name: 'Kashmiri Saffron',
       price: 899,
       weight: '2g',
       emoji: '🌸',
       image: { url: '...', fallback: '🌸', alt: '...' },
       quantity: 2        ← added by our store, not in spices.js
     }
  ---------------------------------------------------------- */
  items: [],

  /* ----------------------------------------------------------
     ACTION: addToCart
     Receives the full spice object from spices.js
     Logic:
       1. Check if item with same id already exists in items[]
       2. If YES → increase its quantity by 1
       3. If NO  → add it to the array with quantity: 1

     `set` is Zustand's way of updating state.
     We always return a NEW array (never mutate the existing one).
  ---------------------------------------------------------- */
  addToCart: (spice) => {
    // get() reads the current state inside an action
    const currentItems = get().items;

    // Check if this spice is already in the cart
    const existingItem = currentItems.find((item) => item.id === spice.id);

    if (existingItem) {
      // Item already in cart → increase quantity by 1
      // map() creates a NEW array — we never mutate state directly
      set({
        items: currentItems.map(
          (item) =>
            item.id === spice.id
              ? { ...item, quantity: item.quantity + 1 } // spread existing, override quantity
              : item, // return unchanged items as-is
        ),
      });
    } else {
      // Item not in cart → add it with quantity 1
      // Spread the full spice object, then add quantity field
      set({
        items: [...currentItems, { ...spice, quantity: 1 }],
      });
    }
  },

  /* ----------------------------------------------------------
     ACTION: removeFromCart
     Receives the spice id (string)
     Removes the item completely from the cart array
     Uses filter() to return all items EXCEPT the one with this id
  ---------------------------------------------------------- */
  removeFromCart: (spiceId) => {
    set({
      items: get().items.filter((item) => item.id !== spiceId),
    });
  },

  /* ----------------------------------------------------------
     ACTION: updateQuantity
     Receives: spiceId (string), newQuantity (number)
     Logic:
       - If newQuantity <= 0 → remove the item completely
       - If newQuantity >= 1 → update the quantity value
     This handles the +/- buttons on CartPage
  ---------------------------------------------------------- */
  updateQuantity: (spiceId, newQuantity) => {
    if (newQuantity <= 0) {
      // Quantity dropped to zero → remove item
      get().removeFromCart(spiceId);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === spiceId ? { ...item, quantity: newQuantity } : item,
      ),
    });
  },

  /* ----------------------------------------------------------
     ACTION: clearCart
     Empties the entire cart.
     Called after a successful order placement.
  ---------------------------------------------------------- */
  clearCart: () => {
    set({ items: [] });
  },

  /* ----------------------------------------------------------
     COMPUTED: totalItems
     Returns total COUNT of items (sum of all quantities).
     Example: 2 saffron + 3 turmeric = 5 total items
     This number shows in the Navbar cart badge.

     NOTE: In Zustand, computed values are just functions.
     Call it as: useCartStore().totalItems()
     (notice the parentheses — it's a function, not a property)
  ---------------------------------------------------------- */
  totalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  /* ----------------------------------------------------------
     COMPUTED: totalPrice
     Returns total PRICE (sum of price × quantity for each item).
     Example: saffron ₹899 × 2 + turmeric ₹149 × 1 = ₹1947
     This shows in CartPage as the order total.
  ---------------------------------------------------------- */
  totalPrice: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },
}));
