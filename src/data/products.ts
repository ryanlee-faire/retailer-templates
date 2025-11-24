/**
 * Centralized Product Repository
 * 
 * This file contains a comprehensive collection of real Faire products
 * that can be reused across the prototype. Products use real Faire CDN URLs
 * where available, and include realistic data for testing.
 */

export interface Product {
  id: string;
  name: string;
  brandName: string;
  imageUrl: string;
  price: string;
  msrp?: string;
  minOrder?: string;
  freeShipping?: boolean;
  isTopShop?: boolean;
  isBestseller?: boolean;
  rating?: number;
  category?: string;
}

export interface Brand {
  id: string;
  name: string;
  avatarUrl?: string;
  bannerUrl?: string;
  isTopShop?: boolean;
  rating?: number;
  location?: string;
  minOrder?: string;
  description?: string;
}

// Real Faire Brands
export const brands: Brand[] = [
  {
    id: "casa-bosques",
    name: "Casa Bosques",
    avatarUrl: "https://cdn.faire.com/fastly/f8d35214384d0cddc7711e8e5047d8a681ec72ecb1c2c682d77eebd47512c376.jpeg?dpr=1&fit=crop&format=jpg&height=192&width=192",
    bannerUrl: "https://cdn.faire.com/fastly/0c3d3d5e07d2f045fbd0fb530c84ebcc59678111fba895a326ec467f9612f085.jpeg?dpr=2&format=jpg&precrop=1200,272,x0,y598,safe",
    isTopShop: true,
    rating: 5.0,
    location: "NYC, New York",
    minOrder: "$150 min",
    description: "Artisan food products from Mexico",
  },
  {
    id: "state-the-label",
    name: "State The Label",
    avatarUrl: "https://cdn.faire.com/fastly/aa243ceeb9c2b926180d207a116276237980a2ad1b11eccf0b6286523b8b686e.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
    isTopShop: false,
    rating: 4.8,
    location: "Los Angeles, California",
    minOrder: "$100 min",
  },
  {
    id: "oskro",
    name: "Oskrö",
    avatarUrl: "/images/products/Snacks/24573b6d2416720d60dee119689f954845fa3fbc4f0f00d8bdeac49f33319658.webp",
    isTopShop: false,
    rating: 4.9,
    location: "New York, New York",
    minOrder: "$150 min",
  },
  {
    id: "fine-raw-chocolate",
    name: "Fine & Raw Chocolate",
    avatarUrl: "/images/products/Snacks/2819313c5b272de7600e6e3c15def77b3f1e27a1568bb76e920231f457dba29a.webp",
    isTopShop: false,
    rating: 4.9,
    location: "Brooklyn, New York",
    minOrder: "$100 min",
  },
  {
    id: "homemade-ish",
    name: "Homemade-ish",
    avatarUrl: "/images/products/Snacks/317f2a196aed93e463bb032231a7754cebc826dd01a27bf2ccae1b17f857c5b2.webp",
    isTopShop: false,
    rating: 4.8,
    location: "New York, New York",
    minOrder: "$125 min",
  },
  {
    id: "brooklyn-cookie-co",
    name: "Brooklyn Cookie Co.",
    avatarUrl: "/images/products/Snacks/610ac09abb418d2f372c411bd8c9e286232f7a5db6bdf02f4b5ace1a1c77fa51 (1).webp",
    isTopShop: false,
    rating: 4.8,
    location: "Brooklyn, New York",
    minOrder: "$100 min",
  },
  {
    id: "manhattan-snack-co",
    name: "Manhattan Snack Co.",
    avatarUrl: "/images/products/Snacks/76fb01af59b3bfe126d183beb792db2d5dd034a1ec5df7497bd4be010c547a27.webp",
    isTopShop: false,
    rating: 4.7,
    location: "New York, New York",
    minOrder: "$125 min",
  },
  {
    id: "pom-pom-popcorn-by-bessou",
    name: "Pom Pom Popcorn by Bessou",
    avatarUrl: "/images/brands/pom pom popcorn/1b6e0db3c93071abdb36005569057c5206a7e97b7def0b1704d993f6f7cb525b.webp",
    bannerUrl: "/images/brands/pom pom popcorn/7ac29f9d898b89d57504698a5e16378ee266c4197b31a613ffc9430ecf7ddc70.webp",
    isTopShop: true,
    rating: 5.0,
    location: "New York, New York",
    minOrder: "$100 min",
    description: "Pom Pom Popcorn brilliantly fuses authentic Japanese flavors with America's most iconic snack through small-batch, real-ingredient recipes born from a beloved NYC Japanese-American restaurant.",
  },
  {
    id: "astoria-granola-co",
    name: "Astoria Granola Co.",
    avatarUrl: "/images/products/Snacks/962c6db6cc9286024db28e9c82ad0720afcc867e46609576a553829bd8e2b18d.webp",
    isTopShop: false,
    rating: 4.7,
    location: "Astoria, New York",
    minOrder: "$100 min",
  },
];

// Real Faire Products - Using actual Faire CDN URLs and product data
export const products: Product[] = [
  // Casa Bosques Products
  {
    id: "casa-bosques-1",
    name: "Dried Fruits - Russ & Daughters",
    brandName: "Casa Bosques",
    imageUrl: "https://cdn.faire.com/fastly/aa243ceeb9c2b926180d207a116276237980a2ad1b11eccf0b6286523b8b686e.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
    price: "$10",
    msrp: "$20",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "casa-bosques-2",
    name: "Date Caramel 74%",
    brandName: "Casa Bosques",
    imageUrl: "https://cdn.faire.com/fastly/216eb341e6eb732447f5d37cd12ecb8b60a057b9682643e38ab1b9678dfa55d9.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
    price: "$10",
    msrp: "$20",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "casa-bosques-3",
    name: "Pink Peppercorn",
    brandName: "Casa Bosques",
    imageUrl: "https://cdn.faire.com/fastly/caf7209f6d2ccd2a0788d0e7d01c881a2ef681b83dade8fbc52a58c43b34b126.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
    price: "$8.50",
    msrp: "$14",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: true,
    isBestseller: false,
    rating: 4.9,
    category: "Food & Drink",
  },
  {
    id: "casa-bosques-4",
    name: "Cardamom",
    brandName: "Casa Bosques",
    imageUrl: "https://cdn.faire.com/fastly/66a505dfc938a93c14399d106e0c98cf441f3b5d01b31473dc2974ee2bb69bad.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
    price: "$8.50",
    msrp: "$14",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 4.9,
    category: "Food & Drink",
  },
  {
    id: "casa-bosques-5",
    name: "Black Toasted Sesame, Cacao Shell and Nib",
    brandName: "Casa Bosques",
    imageUrl: "https://cdn.faire.com/fastly/aa243ceeb9c2b926180d207a116276237980a2ad1b11eccf0b6286523b8b686e.jpeg?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=960&width=720",
    price: "$10",
    msrp: "$20",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "casa-bosques-6",
    name: "Sardinha Yellow Package",
    brandName: "Casa Bosques",
    imageUrl: "/images/products/product-image-01.webp",
    price: "$12",
    msrp: "$20",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: true,
    isBestseller: false,
    rating: 4.8,
    category: "Food & Drink",
  },
  {
    id: "casa-bosques-7",
    name: "Sardinha Green Package",
    brandName: "Casa Bosques",
    imageUrl: "/images/products/product-image-02.webp",
    price: "$12",
    msrp: "$20",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 4.8,
    category: "Food & Drink",
  },
  {
    id: "casa-bosques-8",
    name: "Night Blooms Earth Candle",
    brandName: "Casa Bosques",
    imageUrl: "/images/products/product-image-04.webp",
    price: "$28",
    msrp: "$42",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: true,
    isBestseller: true,
    rating: 4.9,
    category: "Home & Living",
  },
  {
    id: "casa-bosques-9",
    name: "Meadow Land Incense Cones",
    brandName: "Casa Bosques",
    imageUrl: "/images/products/product-image-05.webp",
    price: "$18",
    msrp: "$28",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 4.7,
    category: "Home & Living",
  },
  {
    id: "casa-bosques-10",
    name: "Dream Lion Incense",
    brandName: "Casa Bosques",
    imageUrl: "/images/products/product-image-06.webp",
    price: "$18",
    msrp: "$28",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: true,
    isBestseller: false,
    rating: 4.7,
    category: "Home & Living",
  },
  
  // Oskrö Products
  {
    id: "oskro-1",
    name: "Creamy Pistachio Spread",
    brandName: "Oskrö",
    imageUrl: "/images/products/Snacks/24573b6d2416720d60dee119689f954845fa3fbc4f0f00d8bdeac49f33319658.webp",
    price: "$14.50",
    msrp: "$24",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: true,
    rating: 4.9,
    category: "Food & Drink",
  },
  
  // Fine & Raw Chocolate Products
  {
    id: "fine-raw-1",
    name: "Waffle Cone Chunky Chocolate Bar",
    brandName: "Fine & Raw Chocolate",
    imageUrl: "/images/products/Snacks/2819313c5b272de7600e6e3c15def77b3f1e27a1568bb76e920231f457dba29a.webp",
    price: "$8.50",
    msrp: "$14",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: true,
    rating: 4.9,
    category: "Food & Drink",
  },
  
  // Homemade-ish Products
  {
    id: "homemade-ish-1",
    name: "Dry Cookie Mix - Starter Kit",
    brandName: "Homemade-ish",
    imageUrl: "/images/products/Snacks/317f2a196aed93e463bb032231a7754cebc826dd01a27bf2ccae1b17f857c5b2.webp",
    price: "$16",
    msrp: "$26",
    minOrder: "$125 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 4.8,
    category: "Food & Drink",
  },
  
  // Brooklyn Cookie Co. Products
  {
    id: "brooklyn-cookie-1",
    name: "Artisan Chocolate Chip Cookies",
    brandName: "Brooklyn Cookie Co.",
    imageUrl: "/images/products/Snacks/610ac09abb418d2f372c411bd8c9e286232f7a5db6bdf02f4b5ace1a1c77fa51 (1).webp",
    price: "$12",
    msrp: "$20",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 4.8,
    category: "Food & Drink",
  },
  
  // Manhattan Snack Co. Products
  {
    id: "manhattan-snack-1",
    name: "Gourmet Snack Mix",
    brandName: "Manhattan Snack Co.",
    imageUrl: "/images/products/Snacks/76fb01af59b3bfe126d183beb792db2d5dd034a1ec5df7497bd4be010c547a27.webp",
    price: "$11",
    msrp: "$18",
    minOrder: "$125 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 4.7,
    category: "Food & Drink",
  },
  
  // Astoria Granola Co. Products
  {
    id: "astoria-granola-1",
    name: "Artisan Granola Mix",
    brandName: "Astoria Granola Co.",
    imageUrl: "/images/products/Snacks/962c6db6cc9286024db28e9c82ad0720afcc867e46609576a553829bd8e2b18d.webp",
    price: "$13",
    msrp: "$22",
    minOrder: "$100 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: false,
    rating: 4.7,
    category: "Food & Drink",
  },
  
  // Beverages
  {
    id: "beverage-1",
    name: "Artisan Coffee Blend",
    brandName: "Craft Beverages",
    imageUrl: "/images/products/Beverages/1af80bb68795c95bc8f17984c85ff676c852704454d76c902cf46504dcb78af0.webp",
    price: "$18",
    msrp: "$28",
    minOrder: "$125 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: true,
    rating: 4.8,
    category: "Food & Drink",
  },
  {
    id: "beverage-2",
    name: "Organic Tea Collection",
    brandName: "Tea Leaf Co.",
    imageUrl: "/images/products/Beverages/277decc60dd215a873a650de92461fc19bf8da26600adc872963b6be4e2344b3.webp",
    price: "$16",
    msrp: "$24",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 4.9,
    category: "Food & Drink",
  },
  {
    id: "beverage-3",
    name: "Cold Brew Concentrate",
    brandName: "Craft Beverages",
    imageUrl: "/images/products/Beverages/42ffe8ed6df49f4923667177f0245984ff77d3fec0f7a88aa426d3a168cd53b3.webp",
    price: "$22",
    msrp: "$35",
    minOrder: "$125 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: true,
    rating: 4.8,
    category: "Food & Drink",
  },
  {
    id: "beverage-4",
    name: "Herbal Tea Infusion",
    brandName: "Tea Leaf Co.",
    imageUrl: "/images/products/Beverages/573ec1cd6edd9e7f0d175303d4a59e926de75c90d4990d619d13a676acd9516f.webp",
    price: "$14",
    msrp: "$22",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 4.9,
    category: "Food & Drink",
  },
  {
    id: "beverage-5",
    name: "Sparkling Water Collection",
    brandName: "Craft Beverages",
    imageUrl: "/images/products/Beverages/9790084a71e9edd02cd3c64da2bb5a2540485286d84187ef2219547b8fbc9610.webp",
    price: "$20",
    msrp: "$32",
    minOrder: "$125 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: false,
    rating: 4.7,
    category: "Food & Drink",
  },
  {
    id: "beverage-6",
    name: "Matcha Green Tea Powder",
    brandName: "Tea Leaf Co.",
    imageUrl: "/images/products/Beverages/bd4bba0af0bdce6f441697e452879b56520aa54f617a1bdc879efe759dea1d57.webp",
    price: "$24",
    msrp: "$38",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "beverage-7",
    name: "Kombucha Starter Kit",
    brandName: "Craft Beverages",
    imageUrl: "/images/products/Beverages/c59f78f17849a8767433b0ba0a9f9961f408d5a23e32ff4eb0176eaba09cadc7.webp",
    price: "$28",
    msrp: "$42",
    minOrder: "$125 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: false,
    rating: 4.6,
    category: "Food & Drink",
  },
  {
    id: "beverage-8",
    name: "Chai Tea Blend",
    brandName: "Tea Leaf Co.",
    imageUrl: "/images/products/Beverages/e7e669c7fa882e0e4b0491f2927044a4faa3f0bad3efc7b1fd16d90ce9702563.webp",
    price: "$16",
    msrp: "$24",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: true,
    rating: 4.9,
    category: "Food & Drink",
  },
  {
    id: "beverage-9",
    name: "Organic Juice Collection",
    brandName: "Craft Beverages",
    imageUrl: "/images/products/Beverages/f295219299f6362d8cf7c3497e586d6d016c57ebc0076e4fbc67eeee2111fc1b.webp",
    price: "$18",
    msrp: "$28",
    minOrder: "$125 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: false,
    rating: 4.7,
    category: "Food & Drink",
  },
  
  // Bath Products
  {
    id: "bath-1",
    name: "Lavender Soap Bar",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/2d11f172c4f45f1335831731323b4e4eba6d81060c74ea8b2f03c6cffa8ad46c.webp",
    price: "$8",
    msrp: "$14",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: true,
    rating: 4.9,
    category: "Beauty & Personal Care",
  },
  {
    id: "bath-2",
    name: "Eucalyptus Body Wash",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/2d8076cd8b55f1d36bc452a5aabac271612b97c362de07c92a13a1642a4b34e7.webp",
    price: "$12",
    msrp: "$20",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 4.8,
    category: "Beauty & Personal Care",
  },
  {
    id: "bath-3",
    name: "Rose Petal Bath Bombs",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/72d79f29e45f61d42a8ac65546e99a12075cfa33a3adfdfa072e132ad829ceba.webp",
    price: "$10",
    msrp: "$16",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: true,
    rating: 4.9,
    category: "Beauty & Personal Care",
  },
  {
    id: "bath-4",
    name: "Citrus Hand Soap",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/833fbca0e8d16a7611c64d857d0d5704969ce7fd3346c4f3d9065c805dbba310.jpeg",
    price: "$9",
    msrp: "$15",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 4.7,
    category: "Beauty & Personal Care",
  },
  {
    id: "bath-5",
    name: "Vanilla Body Lotion",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/9b5a8a555f58b9db8901c46ec3721a7bc198d06b18e5b77c1402c44e7d1034c8.webp",
    price: "$14",
    msrp: "$22",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: false,
    rating: 4.8,
    category: "Beauty & Personal Care",
  },
  {
    id: "bath-6",
    name: "Mint Shampoo Bar",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/ab42c07ab173778d1e76e86f574c88554f92d918d2a33d7e3aaf0e2dda1892e0.webp",
    price: "$11",
    msrp: "$18",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: true,
    rating: 4.9,
    category: "Beauty & Personal Care",
  },
  {
    id: "bath-7",
    name: "Jasmine Face Mask",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/f1d8cce2aecf3eea05614a83edfa56197fba40e689c45a770efb5a4e4813e835.webp",
    price: "$16",
    msrp: "$26",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: false,
    rating: 4.8,
    category: "Beauty & Personal Care",
  },
  {
    id: "bath-8",
    name: "Coconut Oil Body Scrub",
    brandName: "Pure Soap Co.",
    imageUrl: "/images/products/bath products/f33c1a24307c52e72ee95366e8a91a6a4b0753af3b67e6e088784a7afd56b817.webp",
    price: "$13",
    msrp: "$21",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: true,
    rating: 4.9,
    category: "Beauty & Personal Care",
  },
  
  // Default/General Products
  {
    id: "default-1",
    name: "Ceramic Planter Pot - Terracotta",
    brandName: "Terracotta Pottery",
    imageUrl: "/images/products/Default/1565290934.webp",
    price: "$18.50",
    msrp: "$32",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 4.9,
    category: "Home & Living",
  },
  {
    id: "default-2",
    name: "Linen Throw Pillow Cover - Natural",
    brandName: "Linen & Co.",
    imageUrl: "/images/products/Default/1618166dde38754f57692881a20b111002a6f9fae9cc8e93ebd58c08448351a2.webp",
    price: "$24",
    msrp: "$42",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Home & Living",
  },
  {
    id: "default-3",
    name: "Extra Virgin Olive Oil - 500ml",
    brandName: "Olive Grove Co.",
    imageUrl: "/images/products/Default/3001b77de13a4072a16dd12ee09773fe51fabff290db53967c58d6510f52ff07.webp",
    price: "$16.75",
    msrp: "$28",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "default-4",
    name: "Soy Candle - Vanilla & Sandalwood",
    brandName: "Scented Home",
    imageUrl: "/images/products/Default/553bf4b20a923f7c10f179813993b30cd027e8dc1c513a6db5e47e9a513e5d53.webp",
    price: "$19.50",
    msrp: "$34",
    minOrder: "$75 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 5.0,
    category: "Home & Living",
  },
  {
    id: "default-5",
    name: "Rattan Storage Basket - Medium",
    brandName: "Natural Woven",
    imageUrl: "/images/products/Default/57a0c96049999c0e7be3f320c5e01ca92d4953a7da174c3b07fb1606316aacbf.webp",
    price: "$22",
    msrp: "$38",
    minOrder: "$150 min",
    freeShipping: false,
    isTopShop: false,
    isBestseller: false,
    rating: 5.0,
    category: "Home & Living",
  },
  {
    id: "default-6",
    name: "Raw Honey Jar - 12oz",
    brandName: "Wildflower Honey",
    imageUrl: "/images/products/Default/58db048f069354bfaa564a07f97b2d4159b4a3fea081c277809a7e8c204229b4.webp",
    price: "$14.99",
    msrp: "$24",
    minOrder: "$150 min",
    freeShipping: true,
    isTopShop: false,
    isBestseller: false,
    rating: 5.0,
    category: "Food & Drink",
  },
  
  // Pom Pom Popcorn by Bessou Products
  {
    id: "pom-pom-1",
    name: "Popcorn, Miso Caramel",
    brandName: "Pom Pom Popcorn by Bessou",
    imageUrl: "/images/products/Snacks/Popcorn, Miso Caramel/0b8e02f4bdb8d7b6dbfb2119429f22fc270c645acf41645369a5360de9bf30ed.webp",
    price: "$10.00",
    msrp: "$16.00",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "pom-pom-2",
    name: "Popcorn, Matcha",
    brandName: "Pom Pom Popcorn by Bessou",
    imageUrl: "/images/products/Snacks/Popcorn, Miso Caramel/243fd1f255c35e5ba210e21502e0c709d8f4da65c0894b5bc1aba67ac414a322.webp",
    price: "$10.00",
    msrp: "$16.00",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "pom-pom-3",
    name: "Popcorn, Classic",
    brandName: "Pom Pom Popcorn by Bessou",
    imageUrl: "/images/products/Snacks/Popcorn, Miso Caramel/369937f10d60592013a7a20c4d5a26b66b92d371bff746fca34f03cc6a1d70d4.jpg",
    price: "$8.00",
    msrp: "$14.00",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "pom-pom-4",
    name: "Popcorn, Sour Cream & Onion",
    brandName: "Pom Pom Popcorn by Bessou",
    imageUrl: "/images/products/Snacks/Popcorn, Miso Caramel/55a761505f6008d73738e34e46f6c89aedd7af5c5481ab2d24cf8908277dae7d.webp",
    price: "$10.00",
    msrp: "$16.00",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "pom-pom-5",
    name: "Popcorn, Caramel",
    brandName: "Pom Pom Popcorn by Bessou",
    imageUrl: "/images/products/Snacks/Popcorn, Miso Caramel/7411cc71ea1b1c5ea8e3fb62a4ede496b7fd7724c4e0d0bbdac4de649cf07711.jpg",
    price: "$10.00",
    msrp: "$16.00",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: true,
    rating: 5.0,
    category: "Food & Drink",
  },
  {
    id: "pom-pom-6",
    name: "Popcorn, Umami",
    brandName: "Pom Pom Popcorn by Bessou",
    imageUrl: "/images/products/Snacks/Popcorn, Miso Caramel/8b6ec1d1f08a4a586692b396f347267341805c7275c61e50457f0bac68700d07.webp",
    price: "$10.00",
    msrp: "$16.00",
    minOrder: "$100 min",
    freeShipping: false,
    isTopShop: true,
    isBestseller: false,
    rating: 5.0,
    category: "Food & Drink",
  },
];

/**
 * Helper function to get products by brand
 */
export function getProductsByBrand(brandName: string): Product[] {
  return products.filter((p) => p.brandName === brandName);
}

/**
 * Helper function to get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

/**
 * Helper function to get a random selection of products
 */
export function getRandomProducts(count: number): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Helper function to get products for a grid (ensures enough products for rows)
 */
export function getProductsForGrid(rows: number, columns: number = 6): Product[] {
  const totalNeeded = rows * columns;
  if (totalNeeded <= products.length) {
    return products.slice(0, totalNeeded);
  }
  // If we need more products than we have, repeat the array
  const repeated = [];
  for (let i = 0; i < totalNeeded; i++) {
    repeated.push(products[i % products.length]);
  }
  return repeated;
}

/**
 * Helper function to get a brand by ID
 */
export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

/**
 * Helper function to get a brand by name
 */
export function getBrandByName(name: string): Brand | undefined {
  return brands.find((b) => b.name === name);
}

/**
 * Helper function to convert brand name to URL slug
 */
export function brandNameToSlug(brandName: string): string {
  return brandName.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Helper function to get brand by slug
 */
export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => brandNameToSlug(b.name) === slug);
}

