/* ============================================================
   FILE: src/data/spices.js
   PURPOSE: Placeholder product data for all spice listings
   USAGE:  import { spices, categories } from '../data/spices.js'
   REPLACE LATER: Swap with API call to your Node.js backend
   ============================================================ */

/* ------------------------------------------------------------
   HELPER: Image object structure
   - url     → Unsplash photo URL (real photo, needs internet)
   - fallback → emoji shown if image fails to load
   - alt     → accessibility description for screen readers
   ------------------------------------------------------------ */

/* ------------------------------------------------------------
   CATEGORIES LIST
   Used in ListingPage.jsx to render filter buttons
   'All' is added manually in the component as first option
   ------------------------------------------------------------ */
export const categories = [
  "Whole Spice",
  "Ground Spice",
  "Blend",
  "Seeds",
  "Exotic",
];

/* ------------------------------------------------------------
   SPICE DATA ARRAY
   15 products — each object has identical keys (consistent shape)

   Fields explained:
   id          → unique string identifier (used in URL: /product/:id)
   name        → display name shown on cards and detail page
   hindiName   → Hindi name — adds cultural authenticity for Indian audience
   tagline     → short marketing line shown on product card
   description → full paragraph shown on detail page
   category    → must match one value from categories array above
   price       → number in Indian Rupees (₹)
   originalPrice → if set, shows strikethrough + discount badge
   weight      → package weight shown on card
   rating      → number 1–5 (shown as stars)
   reviewCount → number of reviews
   inStock     → boolean — false shows "Out of Stock" badge
   isNew       → boolean — shows "New" badge on card
   isBestseller→ boolean — shows "Bestseller" badge
   image       → object with url, fallback emoji, alt text
   benefits    → array of strings shown as bullet points on detail page
   origin      → where this spice comes from (Indian state/region)
   tags        → array of strings used for search matching
   ------------------------------------------------------------ */
export const spices = [
  /* ── PRODUCT 1 ── */
  {
    id: "kashmiri-saffron",
    name: "Kashmiri Saffron",
    hindiName: "कश्मीरी केसर",
    tagline: "The world's finest — hand-harvested at dawn",
    description:
      "Sourced directly from the Karewa fields of Pampore, Kashmir, our saffron is harvested by hand at sunrise when the crocus blooms are at their most fragrant. Each thread is a deep crimson with a golden tip — the mark of Grade A Mongra saffron. Imparts an unmistakable floral aroma and rich golden hue to biryanis, kheer, and lassi.",
    category: "Exotic",
    price: 899,
    originalPrice: 1199,
    weight: "2g",
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    isNew: false,
    isBestseller: true,
    image: {
      url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
      fallback: "🌸",
      alt: "Kashmiri saffron threads in a small bowl",
    },
    benefits: [
      "Boosts mood and reduces anxiety naturally",
      "Rich in antioxidants — crocin and safranal",
      "Aids digestion and reduces bloating",
      "Skin brightening properties in Ayurvedic use",
    ],
    origin: "Pampore, Jammu & Kashmir",
    tags: [
      "saffron",
      "kesar",
      "kashmiri",
      "exotic",
      "premium",
      "biryani",
      "kheer",
    ],
  },

  /* ── PRODUCT 2 ── */
  {
    id: "black-cardamom",
    name: "Black Cardamom",
    hindiName: "बड़ी इलायची",
    tagline: "Smoky, bold, earthy — the soul of North Indian curries",
    description:
      "Dried over fire in the foothills of the Himalayas, black cardamom carries a distinctive smoky camphor aroma that no other spice can replicate. Whole pods are essential in dum biryani, rajma, and chana masala. Our pods are plump, tightly sealed, and dried to perfection — no shriveled or hollow pods in our pack.",
    category: "Whole Spice",
    price: 189,
    originalPrice: null,
    weight: "50g",
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    isNew: false,
    isBestseller: true,
    image: {
      url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80",
      fallback: "🫛",
      alt: "Black cardamom pods on a wooden surface",
    },
    benefits: [
      "Aids respiratory health — used in Ayurvedic cough remedies",
      "Natural mouth freshener after meals",
      "Improves blood circulation",
      "Anti-inflammatory properties",
    ],
    origin: "Sikkim & North Bengal",
    tags: ["cardamom", "badi elaichi", "whole", "biryani", "curry", "smoky"],
  },

  /* ── PRODUCT 3 ── */
  {
    id: "turmeric-powder",
    name: "Lakadong Turmeric Powder",
    hindiName: "लकाडोंग हल्दी",
    tagline: "Highest curcumin content in India — 7–12%",
    description:
      "Lakadong is a remote village in Meghalaya where this exceptional variety of turmeric grows. Unlike the common Salem or Erode turmeric (2–3% curcumin), Lakadong turmeric contains 7–12% curcumin — the active compound responsible for anti-inflammatory and antioxidant benefits. Deep orange colour, warm earthy aroma, and a slightly bitter finish that elevates every dish.",
    category: "Ground Spice",
    price: 149,
    originalPrice: 199,
    weight: "100g",
    rating: 4.8,
    reviewCount: 445,
    inStock: true,
    isNew: false,
    isBestseller: true,
    image: {
      url: "https://images.unsplash.com/photo-1615485291234-9d694218aeb3?w=600&q=80",
      fallback: "🟡",
      alt: "Bright orange turmeric powder in a bowl",
    },
    benefits: [
      "Anti-inflammatory — highest curcumin content available",
      "Boosts immunity when taken with warm milk (haldi doodh)",
      "Supports liver detoxification",
      "Natural antiseptic for wounds",
    ],
    origin: "Lakadong, Meghalaya",
    tags: [
      "turmeric",
      "haldi",
      "lakadong",
      "curcumin",
      "ground",
      "health",
      "powder",
    ],
  },

  /* ── PRODUCT 4 ── */
  {
    id: "kerala-black-pepper",
    name: "Kerala Black Pepper",
    hindiName: "काली मिर्च",
    tagline: "The King of Spices — bold heat, floral finish",
    description:
      "Grown in the Western Ghats of Kerala where pepper has been traded for over 3,000 years, our Malabar black pepper berries are harvested just before full ripeness, sun-dried for 5 days, and hand-sorted for size consistency. The result is a pepper with bold pungency that hits immediately and a subtle floral finish that lingers.",
    category: "Whole Spice",
    price: 129,
    originalPrice: null,
    weight: "100g",
    rating: 4.6,
    reviewCount: 287,
    inStock: true,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1506368083636-6defb67639a7?w=600&q=80",
      fallback: "⚫",
      alt: "Black pepper corns in a wooden bowl",
    },
    benefits: [
      "Enhances nutrient absorption — especially curcumin from turmeric",
      "Improves digestion by stimulating stomach acid",
      "Natural decongestant",
      "Rich in piperine — antioxidant and anti-bacterial",
    ],
    origin: "Wayanad, Kerala",
    tags: [
      "black pepper",
      "kali mirch",
      "whole",
      "malabar",
      "pungent",
      "kerala",
    ],
  },

  /* ── PRODUCT 5 ── */
  {
    id: "garam-masala-blend",
    name: "Ancestral Garam Masala",
    hindiName: "घर का गरम मसाला",
    tagline: "A 12-spice blend ground fresh in small batches",
    description:
      "Our garam masala is not the factory-blended powder you find on supermarket shelves. It is a 12-spice recipe passed down through a family of masala traders from Old Delhi — whole spices individually roasted, cooled, and ground in small batches every week. Black cardamom, cinnamon, cloves, pepper, cumin, coriander, nutmeg, mace, star anise, bay leaf, fennel, and dried rose petals.",
    category: "Blend",
    price: 169,
    originalPrice: 220,
    weight: "75g",
    rating: 4.9,
    reviewCount: 523,
    inStock: true,
    isNew: false,
    isBestseller: true,
    image: {
      url: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80",
      fallback: "🟤",
      alt: "Garam masala blend in a small bowl with whole spices around it",
    },
    benefits: [
      "Aids digestion when added at end of cooking",
      "Warming spices boost circulation in winter",
      "Contains anti-inflammatory cloves and cinnamon",
      "No preservatives or artificial colour",
    ],
    origin: "Old Delhi blend, spices from across India",
    tags: [
      "garam masala",
      "blend",
      "masala",
      "curry",
      "biryani",
      "dal",
      "mixed",
    ],
  },

  /* ── PRODUCT 6 ── */
  {
    id: "coriander-seeds",
    name: "Rajasthani Coriander Seeds",
    hindiName: "धनिया साबुत",
    tagline: "Citrusy, sweet, aromatic — the base of every curry",
    description:
      "Kota and Baran districts of Rajasthan produce India's finest coriander — bold, plump seeds with a naturally sweet citrus aroma unlike the flat, musty seeds from mass production. Dry roast and grind for fresh dhania powder, or use whole in tadka. Every batch is triple-cleaned and free of stones, dust, and broken seeds.",
    category: "Seeds",
    price: 79,
    originalPrice: null,
    weight: "200g",
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1628687963647-b4f1d40bb00d?w=600&q=80",
      fallback: "🟢",
      alt: "Coriander seeds close up",
    },
    benefits: [
      "Lowers blood sugar levels naturally",
      "Reduces LDL cholesterol",
      "Powerful digestive — relieves IBS symptoms",
      "Diuretic properties support kidney health",
    ],
    origin: "Kota, Rajasthan",
    tags: ["coriander", "dhania", "seeds", "whole", "rajasthani", "curry base"],
  },

  /* ── PRODUCT 7 ── */
  {
    id: "cumin-seeds",
    name: "Unjha Cumin Seeds",
    hindiName: "जीरा",
    tagline: "From the cumin capital of India — intense, earthy aroma",
    description:
      "Unjha in Gujarat is Asia's largest cumin trading hub, and for good reason — the black soil and dry climate of this region produces seeds that are darker, thinner, and three times more aromatic than seeds from other regions. A single teaspoon in hot ghee releases a fragrance that fills the entire kitchen. Essential for tadka dal, jeera rice, and raita.",
    category: "Seeds",
    price: 89,
    originalPrice: 110,
    weight: "150g",
    rating: 4.7,
    reviewCount: 334,
    inStock: true,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1599909533731-0de7c5ece29d?w=600&q=80",
      fallback: "🌾",
      alt: "Cumin seeds in a wooden spoon",
    },
    benefits: [
      "Improves digestion and reduces bloating",
      "Rich in iron — beneficial for anaemia",
      "Boosts immunity with thymol and antioxidants",
      "Promotes weight loss by boosting metabolism",
    ],
    origin: "Unjha, Gujarat",
    tags: ["cumin", "jeera", "seeds", "unjha", "gujarat", "tadka", "dal"],
  },

  /* ── PRODUCT 8 ── */
  {
    id: "kashmiri-chilli-powder",
    name: "Kashmiri Chilli Powder",
    hindiName: "कश्मीरी लाल मिर्च",
    tagline: "Vibrant red colour, mild heat — beauty without the burn",
    description:
      "Kashmiri chillies are the secret behind the brilliant red colour of restaurant-style tandoori, rogan josh, and butter chicken — without the aggressive heat. Our powder is stone-ground from whole Kashmiri chillies, giving it a deep brick-red colour and a sweet, slightly smoky flavour. Use generously without worrying about making the dish too hot.",
    category: "Ground Spice",
    price: 109,
    originalPrice: null,
    weight: "100g",
    rating: 4.6,
    reviewCount: 278,
    inStock: true,
    isNew: true,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
      fallback: "🔴",
      alt: "Bright red Kashmiri chilli powder",
    },
    benefits: [
      "Rich in capsaicin — natural pain reliever",
      "Packed with Vitamin C — immunity booster",
      "Improves blood circulation",
      "Low heat index — safe for children's meals",
    ],
    origin: "Sopore, Jammu & Kashmir",
    tags: [
      "chilli",
      "mirch",
      "kashmiri",
      "red",
      "powder",
      "tandoori",
      "mild",
      "colour",
    ],
  },

  /* ── PRODUCT 9 ── */
  {
    id: "green-cardamom",
    name: "Green Cardamom",
    hindiName: "हरी इलायची",
    tagline: "The Queen of Spices — floral, sweet, intensely fragrant",
    description:
      "Our green cardamom is sourced from small estates in Idukki district of Kerala — the heart of cardamom cultivation in India. These pods are picked when bright green, carefully dried, and stored in airtight conditions to preserve the volatile oils that give cardamom its signature floral sweetness. Essential for chai, kheer, ladoo, and biryani.",
    category: "Whole Spice",
    price: 249,
    originalPrice: 299,
    weight: "50g",
    rating: 4.8,
    reviewCount: 412,
    inStock: true,
    isNew: false,
    isBestseller: true,
    image: {
      url: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80",
      fallback: "💚",
      alt: "Green cardamom pods arranged on a surface",
    },
    benefits: [
      "Freshens breath instantly — natural mouth freshener",
      "Soothes digestive discomfort and nausea",
      "Improves heart health by lowering blood pressure",
      "Antimicrobial properties fight oral bacteria",
    ],
    origin: "Idukki, Kerala",
    tags: [
      "cardamom",
      "elaichi",
      "green",
      "whole",
      "chai",
      "sweet",
      "fragrant",
    ],
  },

  /* ── PRODUCT 10 ── */
  {
    id: "star-anise",
    name: "Star Anise",
    hindiName: "चक्र फूल",
    tagline: "Eight-pointed stars of liquorice warmth",
    description:
      "Star anise is the secret ingredient that gives biryani and nihari their depth and warmth. These whole stars are sourced from Arunachal Pradesh and Nagaland, where they grow wild in the subtropical forests. Our stars are unbroken, fully dried, and intensely fragrant — one or two stars is all you need for an entire pot.",
    category: "Whole Spice",
    price: 99,
    originalPrice: null,
    weight: "50g",
    rating: 4.5,
    reviewCount: 134,
    inStock: true,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=600&q=80",
      fallback: "⭐",
      alt: "Star anise pods on a dark wooden surface",
    },
    benefits: [
      "Powerful antiviral — contains shikimic acid (base of Tamiflu)",
      "Relieves cough and congestion",
      "Eases bloating and digestive spasms",
      "Rich in antioxidants",
    ],
    origin: "Arunachal Pradesh",
    tags: [
      "star anise",
      "chakra phool",
      "whole",
      "biryani",
      "nihari",
      "liquorice",
    ],
  },

  /* ── PRODUCT 11 ── */
  {
    id: "mustard-seeds",
    name: "Black Mustard Seeds",
    hindiName: "राई",
    tagline: "The pop that starts every South Indian dish",
    description:
      "You haven't made a proper South Indian dish until you've heard mustard seeds pop in hot oil. Our black mustard seeds (Rai) from Rajasthan are small, intensely pungent, and pop quickly in hot oil — releasing a nutty, sharp aroma that is the foundation of sambhar, rasam, idli podi, and tempering. Larger than yellow mustard, more pungent, more authentic.",
    category: "Seeds",
    price: 59,
    originalPrice: null,
    weight: "200g",
    rating: 4.4,
    reviewCount: 89,
    inStock: true,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1599909533731-0de7c5ece29d?w=600&q=80",
      fallback: "🟣",
      alt: "Black mustard seeds in a bowl",
    },
    benefits: [
      "Rich in omega-3 fatty acids",
      "Contains glucosinolates — anti-cancer compounds",
      "Relieves muscle pain and arthritis when applied externally",
      "Boosts metabolism",
    ],
    origin: "Bharatpur, Rajasthan",
    tags: [
      "mustard",
      "rai",
      "sarson",
      "seeds",
      "south indian",
      "tadka",
      "tempering",
    ],
  },

  /* ── PRODUCT 12 ── */
  {
    id: "cinnamon-sticks",
    name: "True Ceylon Cinnamon",
    hindiName: "दालचीनी",
    tagline: "Not cassia — real cinnamon, soft and sweet",
    description:
      "Most cinnamon sold in India is actually cassia — a cheaper, harder bark with a harsh taste and high coumarin content. Our cinnamon is true Ceylon cinnamon (Cinnamomum verum) — thin, papery, multi-layered quills with a naturally sweet, delicate flavour that does not overpower. Safe for daily consumption, diabetic-friendly, and strikingly aromatic.",
    category: "Whole Spice",
    price: 159,
    originalPrice: 199,
    weight: "50g",
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    isNew: true,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
      fallback: "🪵",
      alt: "Ceylon cinnamon sticks tied together",
    },
    benefits: [
      "Regulates blood sugar — beneficial for Type 2 diabetes",
      "Low coumarin — safe for daily use unlike cassia",
      "Powerful anti-inflammatory and antioxidant",
      "Improves heart health markers",
    ],
    origin: "Sri Lanka (imported via Kerala traders)",
    tags: [
      "cinnamon",
      "dalchini",
      "ceylon",
      "whole",
      "stick",
      "sweet",
      "diabetic",
    ],
  },

  /* ── PRODUCT 13 ── */
  {
    id: "chaat-masala",
    name: "Mumbai Chaat Masala",
    hindiName: "चाट मसाला",
    tagline: "Tangy, spicy, black salt magic — the taste of Mumbai streets",
    description:
      "Authentic chaat masala is not just a blend — it is a memory. Ours captures the exact balance of amchur (dried mango), black salt (kala namak), roasted cumin, black pepper, coriander, and dried ginger that defines the street food of Mumbai's Chowpatty Beach. A pinch transforms fruit salad, pani puri water, samosa, or curd into something unforgettable.",
    category: "Blend",
    price: 89,
    originalPrice: null,
    weight: "75g",
    rating: 4.6,
    reviewCount: 367,
    inStock: true,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80",
      fallback: "🫙",
      alt: "Chaat masala in a jar with spices around it",
    },
    benefits: [
      "Black salt aids digestion and reduces acidity",
      "Amchur provides Vitamin C boost",
      "Improves appetite and salivation",
      "Zero artificial flavours or colours",
    ],
    origin: "Mumbai recipe, spices from across India",
    tags: [
      "chaat masala",
      "chaat",
      "blend",
      "tangy",
      "mumbai",
      "street food",
      "amchur",
    ],
  },

  /* ── PRODUCT 14 ── */
  {
    id: "fenugreek-seeds",
    name: "Fenugreek Seeds",
    hindiName: "मेथी दाना",
    tagline: "Bitter gold — the most underrated spice in every kitchen",
    description:
      "Methi dana is one of Ayurveda's most revered seeds — bitter in taste, golden in benefit. Our fenugreek seeds from Rajasthan's dry fields are hard, square, and intensely aromatic. Use sparingly in fish curry, pickles, and dal — just a quarter teaspoon adds a depth you cannot achieve with any other spice. Also used to make fenugreek water for blood sugar control.",
    category: "Seeds",
    price: 65,
    originalPrice: null,
    weight: "150g",
    rating: 4.4,
    reviewCount: 112,
    inStock: true,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1628687963647-b4f1d40bb00d?w=600&q=80",
      fallback: "🟨",
      alt: "Fenugreek seeds in a wooden bowl",
    },
    benefits: [
      "Lowers blood sugar — recommended for diabetes management",
      "Boosts breast milk production in new mothers",
      "Reduces inflammation and arthritis pain",
      "Improves testosterone and libido in men",
    ],
    origin: "Nagaur, Rajasthan",
    tags: [
      "fenugreek",
      "methi",
      "methi dana",
      "seeds",
      "bitter",
      "ayurveda",
      "diabetes",
    ],
  },

  /* ── PRODUCT 15 ── */
  {
    id: "cloves",
    name: "Zanzibar Cloves",
    hindiName: "लौंग",
    tagline: "Oil-rich, intensely aromatic — the dentist's spice",
    description:
      "Our cloves are sourced from Zanzibar, Tanzania — the world's premium clove origin — and imported through Kerala's spice trading networks. These cloves are plump, oil-rich, and deeply fragrant. Press one between your fingers — the oil should appear immediately. Use in biryani, chai, masala, and as a natural toothache remedy. A spice that earns its place in every Indian pantry.",
    category: "Whole Spice",
    price: 139,
    originalPrice: 179,
    weight: "50g",
    rating: 4.8,
    reviewCount: 234,
    inStock: false,
    isNew: false,
    isBestseller: false,
    image: {
      url: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=600&q=80",
      fallback: "🟫",
      alt: "Dark brown cloves in a bowl",
    },
    benefits: [
      "Eugenol — natural anaesthetic used for toothache",
      "Powerful antimicrobial and antifungal",
      "Improves liver health",
      "Regulates blood sugar levels",
    ],
    origin: "Zanzibar, Tanzania (via Kerala traders)",
    tags: [
      "cloves",
      "laung",
      "whole",
      "zanzibar",
      "toothache",
      "biryani",
      "chai",
    ],
  },
];

/* ------------------------------------------------------------
   HELPER FUNCTIONS
   Use these in components instead of repeating logic
   ------------------------------------------------------------ */

/* Get a single spice by its id — used in DetailPage */
export const getSpiceById = (id) => {
  return spices.find((spice) => spice.id === id) || null;
};

/* Get spices filtered by category — used in ListingPage */
export const getSpicesByCategory = (category) => {
  if (!category || category === "All") return spices;
  return spices.filter((spice) => spice.category === category);
};

/* Get bestseller spices — used in HomePage featured section */
export const getBestsellers = () => {
  return spices.filter((spice) => spice.isBestseller);
};

/* Search spices by name, hindiName, or tags — used in ListingPage */
export const searchSpices = (query) => {
  if (!query || query.trim() === "") return spices;
  const q = query.toLowerCase().trim();
  return spices.filter(
    (spice) =>
      spice.name.toLowerCase().includes(q) ||
      spice.hindiName.includes(q) ||
      spice.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      spice.category.toLowerCase().includes(q),
  );
};
