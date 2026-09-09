export type Benefit = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  words: string;
  price: number;
  base: string;
  dark: string;
  light: string;
  description: string;
  benefits: Benefit[];
  ingredients: string[];
  swirls: string[];
};

export const products: Product[] = [
  {
    id: "crimson",
    name: "Crimson Seduction",
    words: "Hydrates · Revitalizes · Antioxidant-Rich",
    price: 79,
    base: "#722F37",
    dark: "#440000",
    light: "#990F02",
    swirls: ["M40 112 C 130 76, 180 156, 282 112"],
    description: "Red wine extract and vitamin E turn an ordinary wash into a quiet indulgence. Crimson Seduction works into a rich, blush-toned lather, leaving skin feeling soft while its warm, wine-inspired fragrance lingers just a moment longer.",
    benefits: [
      { title: "Red wine ritual", description: "Red wine extract brings a deep, antioxidant-rich botanical touch to every lather." },
      { title: "Guards the glow", description: "Vitamin E helps condition skin and leaves it feeling smooth and cared for." },
      { title: "Warm, lingering scent", description: "A wine-inspired fragrance settles softly on the skin after rinsing." },
    ],
    ingredients: ["Red wine extract", "Vitamin E", "Wine-inspired fragrance"],
  },
  {
    id: "honey",
    name: "Milk & Honey",
    words: "Hydrate · Repair · Soften",
    price: 60,
    base: "#EDDBB0",
    dark: "#B8862B",
    light: "#F7EBCB",
    swirls: ["M24 78 C 110 38, 208 108, 296 66", "M20 150 C 118 186, 196 118, 300 152"],
    description: "Wild forest honey and creamy milk — a humectant dream that pulls moisture to the skin and keeps it there. It lathers like a warm hug, and it is very much not sorry about it.",
    benefits: [
      { title: "Locks in moisture", description: "Wild honey draws water to your skin and holds it." },
      { title: "Repairs dryness", description: "Milk cream helps smooth rough, flaky patches." },
      { title: "Softens head to toe", description: "Beloved by elbows, knees and heels." },
    ],
    ingredients: ["Forest honey", "Milk cream", "Cocoa butter", "Almond oil"],
  },
  {
    id: "avocado",
    name: "Avocado",
    words: "Nourish · Restore · Protect",
    price: 60,
    base: "#9AAB76",
    dark: "#5B6B3D",
    light: "#BFC99B",
    swirls: [],
    description: "Buttery avocado purée and cold-pressed avocado oil, loaded with vitamin E and omegas. Quite literally a meal for thirsty skin — the bar we recommend after sun, travel or a long winter.",
    benefits: [
      { title: "Vitamin E heavyweight", description: "Cold-pressed avocado oil feeds thirsty skin." },
      { title: "Barrier repair", description: "Omegas 3 & 9 help rebuild a tired moisture barrier." },
      { title: "Silky finish", description: "Skin feels plush, never greasy." },
    ],
    ingredients: ["Avocado purée", "Avocado oil", "Shea butter"],
  },
  {
    id: "neem",
    name: "Neem & Tulsi",
    words: "Purify · Clarify · Balance",
    price: 60,
    base: "#A9B98B",
    dark: "#66744A",
    light: "#CBD5AF",
    swirls: ["M40 112 C 130 76, 180 156, 282 112"],
    description: "Two of Ayurveda’s most revered leaves, steeped together in the oils. Neem purifies while tulsi clears congestion in tired, city-worn skin — a daily reset for faces that face traffic.",
    benefits: [
      { title: "Naturally antibacterial", description: "Neem has been doing this job for two thousand years." },
      { title: "Clears & clarifies", description: "Tulsi helps decongest dull, congested skin." },
      { title: "Balances oil", description: "A daily reset for oily and combination skin." },
    ],
    ingredients: ["Neem leaf extract", "Tulsi essential oil", "Coconut oil", "Castor oil"],
  },
  {
    id: "goat",
    name: "Goat Milk",
    words: "Soothe · Nourish · Calm",
    price: 60,
    base: "#F2EADB",
    dark: "#B4A47E",
    light: "#FBF6EB",
    swirls: [],
    description: "Fresh goat milk poured straight into the batch — rich in butterfat and lactic acid, it cleanses without ever stripping. The bar we reach for when skin is feeling raw, rashy or simply tired.",
    benefits: [
      { title: "Deeply moisturising", description: "Butterfat conditions skin while it cleans." },
      { title: "Kind to sensitive skin", description: "A light fragrance load for eczema-prone days." },
      { title: "pH-skin friendly", description: "Cleans at a pH your acid mantle actually likes." },
    ],
    ingredients: ["Goat milk", "Shea butter", "Coconut oil", "Olive oil"],
  },
  {
    id: "saffron",
    name: "Royal Saffron",
    words: "Brighten · Glow · Indulge",
    price: 69,
    base: "#E2A44C",
    dark: "#A86F1E",
    light: "#F0C283",
    swirls: ["M24 78 C 110 38, 208 108, 296 66", "M20 150 C 118 186, 196 118, 300 152", "M40 112 C 130 76, 180 156, 282 112"],
    description: "Kashmiri saffron threads — the world’s most precious spice — steeped for weeks before the pour, then sent whole into the mould. Traditionally loved for brightening and evening out tone. Our most decadent bar.",
    benefits: [
      { title: "Brightens & evens tone", description: "Saffron is treasured for its glow-giving nature." },
      { title: "Antioxidant-rich", description: "Threads steeped for weeks, then poured whole." },
      { title: "A luxurious lather", description: "Dense, slow, cream-coloured foam." },
    ],
    ingredients: ["Kashmiri saffron", "Milk cream", "Safflower oil"],
  },
  {
    id: "citrus",
    name: "Citrus Euphoria",
    words: "Refresh · Energise · Uplift",
    price: 60,
    base: "#D5DC96",
    dark: "#8F9A3E",
    light: "#E8EDB8",
    swirls: ["M20 150 C 118 186, 196 118, 300 152"],
    description: "Lime, sweet orange and a whisper of lemongrass — a cold shower for the senses. The bar that makes six a.m. slightly forgivable, and the one guests always ask about.",
    benefits: [
      { title: "Wakes you up", description: "Lime, sweet orange and lemongrass — sunshine, bottled." },
      { title: "Fresh, deep cleanse", description: "Citrus oils cut through grime and sunscreen." },
      { title: "Uplifting ritual", description: "The 6 a.m. bar. Slightly addictive." },
    ],
    ingredients: ["Lime peel", "Sweet orange oil", "Lemongrass", "Coconut oil"],
  },
];
