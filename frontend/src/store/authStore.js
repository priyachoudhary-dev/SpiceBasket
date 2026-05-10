/* ============================================================
   FILE: src/store/authStore.js
   PURPOSE: Global authentication state using Zustand v5
   USED BY: Navbar (show Login vs Username), AuthPage, any
            page that needs to check if user is logged in

   CURRENTLY: Uses mock login (no real API yet)
   LATER: Replace login() body with real fetch() to your
          Node.js + Express backend at POST /api/auth/login
   ============================================================ */

import { create } from "zustand";

/* ------------------------------------------------------------
   useAuthStore — the hook every component calls for auth state

   HOW TO USE IN ANY COMPONENT:
   ─────────────────────────────────────────────────────────────
   import { useAuthStore } from '../store/authStore'

   // Inside your component:
   const { user, isAuthenticated, login, logout } = useAuthStore()

   // Check if logged in:
   if (isAuthenticated) { show user name }

   // Login with credentials:
   await login({ email: 'test@test.com', password: '1234' })

   // Logout:
   logout()
   ─────────────────────────────────────────────────────────────
------------------------------------------------------------ */
export const useAuthStore = create((set) => ({
  /* ----------------------------------------------------------
     STATE: user
     null = no one logged in
     object = logged in user's basic info

     Shape when logged in:
     {
       name: 'Priya Sharma',
       email: 'priya@gmail.com',
     }

     We do NOT store passwords here — ever.
     Only store what you need to display in the UI.
  ---------------------------------------------------------- */
  user: null,

  /* ----------------------------------------------------------
     STATE: isAuthenticated
     Simple boolean. Easier to check than `user !== null`.
     Both update together — they are never out of sync.
  ---------------------------------------------------------- */
  isAuthenticated: false,

  /* ----------------------------------------------------------
     STATE: isLoading
     True while the login/register API call is in progress.
     Used to show a spinner on the Login button and prevent
     the user from clicking it multiple times.
  ---------------------------------------------------------- */
  isLoading: false,

  /* ----------------------------------------------------------
     STATE: error
     Stores any login/register error message.
     Example: 'Invalid email or password'
     Shown as a red error box on the AuthPage form.
     Cleared when user starts typing again.
  ---------------------------------------------------------- */
  error: null,

  /* ----------------------------------------------------------
     ACTION: login
     Receives: { email, password } object from AuthPage form

     CURRENT BEHAVIOR (mock):
     - Simulates a 1-second API call with setTimeout
     - Accepts any email/password combination
     - Sets user with a display name extracted from email

     REPLACE LATER with:
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     })
     const data = await response.json()
     if (!response.ok) throw new Error(data.message)
     set({ user: data.user, isAuthenticated: true })
  ---------------------------------------------------------- */
  login: async ({ email, password }) => {
    // Start loading — disable the login button
    set({ isLoading: true, error: null });

    try {
      // MOCK: Simulate network delay (remove when using real API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // MOCK: Extract display name from email
      // 'priya@gmail.com' → 'Priya'
      const name = email.split("@")[0];
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

      // MOCK: Validate — just check email has @ and password is not empty
      if (!email.includes("@") || !password) {
        throw new Error("Please enter a valid email and password.");
      }

      // Success — set user and authenticated state
      set({
        user: { name: formattedName, email },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      // Failure — store error message, keep user logged out
      set({
        error: err.message || "Login failed. Please try again.",
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },

  /* ----------------------------------------------------------
     ACTION: register
     Receives: { name, email, password } from AuthPage register form

     CURRENT BEHAVIOR (mock):
     - Same mock behavior as login
     - In real app: POST /api/auth/register
  ---------------------------------------------------------- */
  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });

    try {
      // MOCK: Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // MOCK: Basic validation
      if (!name || !email.includes("@") || password.length < 6) {
        throw new Error(
          "Please fill all fields. Password must be at least 6 characters.",
        );
      }

      // Success — auto-login after registration
      set({
        user: { name, email },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        error: err.message || "Registration failed. Please try again.",
        isLoading: false,
      });
    }
  },

  /* ----------------------------------------------------------
     ACTION: logout
     Clears all auth state.
     Does NOT clear the cart — user might want to keep items.
     If you want to clear cart on logout, import useCartStore
     and call clearCart() here.
  ---------------------------------------------------------- */
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
    });
  },

  /* ----------------------------------------------------------
     ACTION: clearError
     Clears the error message.
     Called when user starts typing in the form again,
     so the error box disappears immediately.
  ---------------------------------------------------------- */
  clearError: () => {
    set({ error: null });
  },
}));
