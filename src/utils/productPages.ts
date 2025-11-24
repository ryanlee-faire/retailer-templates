/**
 * Utility functions for generating product pages from folder structure
 */

export interface ProductPageData {
  name: string;
  folderName: string;
  images: string[];
  brand?: string;
  price?: string;
  msrp?: string;
  description?: string;
  details?: string;
}

/**
 * Get product data from folder name
 */
export function getProductDataFromFolder(folderName: string): ProductPageData {
  // Map folder names to product data
  const productMap: Record<string, Partial<ProductPageData>> = {
    "3oz Classic BjornQorn": {
      name: "3oz Classic BjornQorn",
      brand: "BjornQorn",
      price: "$8.50",
      msrp: "$14.00",
      description: "Classic BjornQorn popcorn in a convenient 3oz size. Perfect for snacking on the go.",
      details: "Made in United States\n\nProduct Language: English\n\nWeight: 3 oz (0.09 kg)",
    },
    "Fletcher & Lu Seed Cracker": {
      name: "Fletcher & Lu Seed Cracker",
      brand: "Fletcher & Lu",
      price: "$12.00",
      msrp: "$20.00",
      description: "Artisan seed crackers made with premium ingredients. Perfect for pairing with cheese or enjoying on their own.",
      details: "Made in United States\n\nProduct Language: English\n\nWeight: 4 oz (0.11 kg)",
    },
    "Handmade Sourdough Pretzels, Salted - 2.75 oz Bags": {
      name: "Handmade Sourdough Pretzels, Salted",
      brand: "Artisan Bakers",
      price: "$6.50",
      msrp: "$12.00",
      description: "Handcrafted sourdough pretzels with a perfect balance of salt. Made using traditional methods for authentic flavor.",
      details: "Made in United States\n\nProduct Language: English\n\nWeight: 2.75 oz (0.08 kg)",
    },
    "Momofuku Chili Chocolate Crunch - Limited Edition Batch": {
      name: "Momofuku Chili Chocolate Crunch",
      brand: "Momofuku",
      price: "$18.00",
      msrp: "$28.00",
      description: "Limited edition batch of spicy chili chocolate crunch. A unique combination of sweet and heat.",
      details: "Made in United States\n\nProduct Language: English\n\nWeight: 5 oz (0.14 kg)",
    },
    "Popcorn, Miso Caramel": {
      name: "Popcorn, Miso Caramel",
      brand: "Artisan Snacks",
      price: "$10.00",
      msrp: "$16.00",
      description: "Gourmet popcorn with a savory-sweet miso caramel coating. A unique twist on a classic snack.",
      details: "Made in United States\n\nProduct Language: English\n\nWeight: 4 oz (0.11 kg)",
    },
    "Vanilla Bean Marshmallows": {
      name: "Vanilla Bean Marshmallows",
      brand: "Sweet Treats Co.",
      price: "$14.00",
      msrp: "$22.00",
      description: "Handmade marshmallows infused with real vanilla bean. Light, fluffy, and perfect for hot cocoa or s'mores.",
      details: "Made in United States\n\nProduct Language: English\n\nWeight: 6 oz (0.17 kg)",
    },
  };

  const baseData = productMap[folderName] || {
    name: folderName,
    brand: "Artisan Brand",
    price: "$10.00",
    msrp: "$18.00",
    description: `${folderName} - A premium snack product.`,
    details: "Made in United States\n\nProduct Language: English",
  };

  // Get images from folder
  const imageFiles: string[] = [];
  
  // These will be populated based on the actual files in each folder
  if (folderName === "3oz Classic BjornQorn") {
    imageFiles.push(
      "/images/products/Snacks/3oz Classic BjornQorn/1d0e7303986c4a05985e9da8c68d451219fe55058243cdf0ebff2abfbf2dbbd5.webp",
      "/images/products/Snacks/3oz Classic BjornQorn/27d8647c2d5f4241a7093a009974176fef2bef7007e8fe8fcd897cace681be85.webp",
      "/images/products/Snacks/3oz Classic BjornQorn/3e901cf5ddb38c573dd76a288d303524e84aaa2c2fc3b8546ec8eb78136019da.jpg",
      "/images/products/Snacks/3oz Classic BjornQorn/83f298eaaeb44c249f9966fab29ece789a914fd0838950c00b7f4ccfce7ec33e.jpg",
      "/images/products/Snacks/3oz Classic BjornQorn/9a60d4046a55de1e13f845d381f8026958d94217e62d55b613577e363b7ef6ff.jpg"
    );
  } else if (folderName === "Fletcher & Lu Seed Cracker") {
    imageFiles.push(
      "/images/products/Snacks/Fletcher & Lu Seed Cracker/321043face6463604bf3c69f0dcd8faa77a718225940c5029c6d144cad503876.webp",
      "/images/products/Snacks/Fletcher & Lu Seed Cracker/7933b28c8406fa9b18c87105766c51457cd1d8c699204a7de79107f34723c212.webp",
      "/images/products/Snacks/Fletcher & Lu Seed Cracker/88b73c554680a387d4839166748f5ba15e3eefd756f720718452af307bfdc75f.webp",
      "/images/products/Snacks/Fletcher & Lu Seed Cracker/cb999fc83ebf4f03fd9fa96f59e0133a2a5cb73b06c447698b279e4e56787e2a.webp",
      "/images/products/Snacks/Fletcher & Lu Seed Cracker/e76a8890f0fc6f84524a121874338090717884de61b71eb60d459ca883eadf2f.webp"
    );
  } else if (folderName === "Handmade Sourdough Pretzels, Salted - 2.75 oz Bags") {
    imageFiles.push(
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/13d90b2c0f12c51ed4e0b317816b55feecb24c73b2668339cb0e5cbefcc8ca73.webp",
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/3e35e5ea38518caf1dcd8a193079e1ba5969497963b1c907eec6e79db18f3a78.webp",
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/7bad4b8b18254f3cd5cd3c70ff9acbfc6cfc8e6b03c73b01ebb281c3e163f431.webp",
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/7bf9ee7832b352b8e8e9fa3aa13d8d72489fc160bd767b8c3bfda45b69afa973.webp",
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/ac3f5f63a93903e703fb4799809eb84c5d0cb2b2b7d2553dbe1e9a3b3fd278fd.webp",
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/b68abcbf3e209a7c596bb6cc72599b124b44eeaabefff9cbaae2900c4583e577.webp",
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/bc90ffd0d3d315d5e66b9566ded3e2e6b069ea7d79e574610c3e8eed22d23ce1.webp",
      "/images/products/Snacks/Handmade Sourdough Pretzels, Salted - 2.75 oz Bags/c93d9531d6551d000a22563526a40e4fc15b7385c2bf3dd637f8485f86e7bf48.webp"
    );
  } else if (folderName === "Momofuku Chili Chocolate Crunch - Limited Edition Batch") {
    imageFiles.push(
      "/images/products/Snacks/Momofuku Chili Chocolate Crunch - Limited Edition Batch/2f2bedffbbe86291e84447636a7042646a860b3102a2a9b04950d9f167e78e00.webp",
      "/images/products/Snacks/Momofuku Chili Chocolate Crunch - Limited Edition Batch/8d416ce2c49d575e8b7045d7faaf0652589205278b657d9c54232e455c28e01d.webp",
      "/images/products/Snacks/Momofuku Chili Chocolate Crunch - Limited Edition Batch/f73511c5368ab406024b00d86717e5a045bcb234279c80e685e5bc1624eaed89.webp"
    );
  } else if (folderName === "Popcorn, Miso Caramel") {
    imageFiles.push(
      "/images/products/Snacks/Popcorn, Miso Caramel/0b8e02f4bdb8d7b6dbfb2119429f22fc270c645acf41645369a5360de9bf30ed.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/243fd1f255c35e5ba210e21502e0c709d8f4da65c0894b5bc1aba67ac414a322.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/369937f10d60592013a7a20c4d5a26b66b92d371bff746fca34f03cc6a1d70d4.jpg",
      "/images/products/Snacks/Popcorn, Miso Caramel/55a761505f6008d73738e34e46f6c89aedd7af5c5481ab2d24cf8908277dae7d.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/7411cc71ea1b1c5ea8e3fb62a4ede496b7fd7724c4e0d0bbdac4de649cf07711.jpg",
      "/images/products/Snacks/Popcorn, Miso Caramel/8b6ec1d1f08a4a586692b396f347267341805c7275c61e50457f0bac68700d07.webp",
      "/images/products/Snacks/Popcorn, Miso Caramel/e60508520166308dfe9fb1715906e1305f1f3396d1fa9d893f58082c15a341cc.jpg"
    );
  } else if (folderName === "Vanilla Bean Marshmallows") {
    imageFiles.push(
      "/images/products/Snacks/Vanilla Bean Marshmallows/220ecffc57b0aa816483610eff6edb2c2d4f5d5e980530e87fd3af8ad12328d8.webp",
      "/images/products/Snacks/Vanilla Bean Marshmallows/5f7a0982a3ae1449dfc1c1d678f9fba3139ca19f8e47374e0549c81752167d6c.webp",
      "/images/products/Snacks/Vanilla Bean Marshmallows/ee9010e42083b66e314cb62d65c5014db0c7235dfec28b7260b4cc76053a0a78.webp",
      "/images/products/Snacks/Vanilla Bean Marshmallows/f9d4614da84a1a590e634cce5fcd7056162db6409db1a36f22597dc2748f65a4.webp"
    );
  }

  return {
    folderName,
    images: imageFiles,
    ...baseData,
  } as ProductPageData;
}

/**
 * Get all snack product folder names
 */
export function getAllSnackProductFolders(): string[] {
  return [
    "3oz Classic BjornQorn",
    "Fletcher & Lu Seed Cracker",
    "Handmade Sourdough Pretzels, Salted - 2.75 oz Bags",
    "Momofuku Chili Chocolate Crunch - Limited Edition Batch",
    "Popcorn, Miso Caramel",
    "Vanilla Bean Marshmallows",
  ];
}

/**
 * Convert folder name to URL slug
 */
export function folderNameToSlug(folderName: string): string {
  return folderName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

