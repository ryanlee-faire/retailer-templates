import React, { useState } from "react";
import RetailerLayout from "../components/RetailerLayout";
import BrandTile from "../components/shared/BrandTile";
import CarouselHeader from "../components/shared/CarouselHeader";
import Carousel from "../components/shared/Carousel";

/**
 * CompassContainedHomePage - Isolated version of John's Compass prototype homepage
 * This is a contained flow that doesn't interfere with the existing Compass implementations
 * Route: /compass-contained/home
 */
export default function CompassContainedHomePage() {
  const [navigationButtons, setNavigationButtons] = useState<React.ReactNode>(null);

  // Array of realistic product images from Default directory
  const defaultImages = [
    "/images/products/Default/1565290934.webp",
    "/images/products/Default/1618166dde38754f57692881a20b111002a6f9fae9cc8e93ebd58c08448351a2.webp",
    "/images/products/Default/3001b77de13a4072a16dd12ee09773fe51fabff290db53967c58d6510f52ff07.webp",
    "/images/products/Default/553bf4b20a923f7c10f179813993b30cd027e8dc1c513a6db5e47e9a513e5d53.webp",
    "/images/products/Default/57a0c96049999c0e7be3f320c5e01ca92d4953a7da174c3b07fb1606316aacbf.webp",
    "/images/products/Default/58db048f069354bfaa564a07f97b2d4159b4a3fea081c277809a7e8c204229b4.webp",
    "/images/products/Default/5e6981ab0f39041ce2422cb55672eabbd3cbacfc59e6435af05f9a53a544e3cf.webp",
    "/images/products/Default/7265a0c9750cb54fc9c03862cbe90568bd7ab3271da4180f5764e7feb6764c55.webp",
    "/images/products/Default/7a9b5d2cdc4e1ff5078d71528529ba1bc2c4aff48c7202766bc88f1e5f62990a.webp",
    "/images/products/Default/8078c47c34f8aef4404782deaeadee1e80c650b05db0f534c2ac6d8696669bb2.webp",
    "/images/products/Default/958b63ee76666b0280650779b05e4abbb1ae0309990b024e61a21f1c5c19de2d.webp",
    "/images/products/Default/9adeb822f48a470da18e78becbcf650740169e3ca49b8ca633af8760994bee97.webp",
    "/images/products/Default/9c280de0751734a2c550be885d5cbc756c76b79708a58550ca08b121ce367587.webp",
    "/images/products/Default/a1457c95983e68fca0a5d977b67de565e8722ac9c4ed1d11b6de12fa05001228.webp",
    "/images/products/Default/b0291b855e92bf283e3dcedf70c904645dc008cdef5a317125cea816c21de932.webp",
    "/images/products/Default/bfd8233b3934b80196bf56bc39b9f98a1652a60f03498eec830a39c0b24e4421.webp",
    "/images/products/Default/ca98a03ecefa2d01952e4ed1da31728ea62d0a424c195ec165bfc5ad66845e68.webp",
    "/images/products/Default/e36dcab586d885d817289d12d571109c89b1ca0eacc20ea515d8ff03293bdfb5.webp",
    "/images/products/Default/e39504ca29716992ba120454f7a89060c63896f580b047900060dae0e664ca8e.webp",
    "/images/products/Default/e6e0203a7912a7c3025adb94e72754d7ae01ceb5dea68cb2f5b7179a9930f983.webp",
  ];

  // Mock data for "Your team's recently viewed"
  const recentlyViewedProducts = [
    {
      imageUrl: defaultImages[0],
      brandName: "Terracotta Pottery",
      productName: "Ceramic Planter Pot - Terracotta",
      brandAvatarUrl: defaultImages[0],
      price: 18.50,
      msrp: 32.00,
      rating: 4.9,
      minOrder: "$100 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: defaultImages[1],
      brandName: "Linen & Co.",
      productName: "Linen Throw Pillow Cover - Natural",
      brandAvatarUrl: defaultImages[1],
      price: 24.00,
      msrp: 42.00,
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: true,
      topShop: true,
      isFavorited: true,
    },
    {
      imageUrl: defaultImages[2],
      brandName: "Olive Grove Co.",
      productName: "Extra Virgin Olive Oil - 500ml",
      brandAvatarUrl: defaultImages[2],
      price: 16.75,
      msrp: 28.00,
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: defaultImages[3],
      brandName: "Scented Home",
      productName: "Soy Candle - Vanilla & Sandalwood",
      brandAvatarUrl: defaultImages[3],
      price: 19.50,
      msrp: 34.00,
      rating: 5.0,
      minOrder: "$75 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: defaultImages[4],
      brandName: "Natural Woven",
      productName: "Rattan Storage Basket - Medium",
      brandAvatarUrl: defaultImages[4],
      price: 22.00,
      msrp: 38.00,
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: defaultImages[5],
      brandName: "Wildflower Honey",
      productName: "Raw Honey Jar - 12oz",
      brandAvatarUrl: defaultImages[5],
      price: 14.99,
      msrp: 24.00,
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: true,
      topShop: false,
      isFavorited: false,
    },
  ];

  // Mock data for carousel
  const brandUpdates = [
    {
      imageUrl: defaultImages[6],
      brandName: "Garden Vases",
      brandAvatarUrl: defaultImages[6],
      rating: 4.8,
      minOrder: "$200 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: defaultImages[7],
      brandName: "Pure Soap Co.",
      brandAvatarUrl: defaultImages[7],
      rating: 4.9,
      minOrder: "$150 min",
      freeShipping: true,
      topShop: false,
    },
    {
      imageUrl: defaultImages[8],
      brandName: "Tea Leaf Co.",
      brandAvatarUrl: defaultImages[8],
      rating: 5.0,
      minOrder: "$100 min",
      freeShipping: false,
      topShop: true,
    },
    {
      imageUrl: defaultImages[9],
      brandName: "Clay Pottery",
      brandAvatarUrl: defaultImages[9],
      rating: 4.7,
      minOrder: "$125 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: defaultImages[10],
      brandName: "Skin Essentials",
      brandAvatarUrl: defaultImages[10],
      rating: 4.9,
      minOrder: "$175 min",
      freeShipping: true,
      topShop: false,
    },
    {
      imageUrl: defaultImages[11],
      brandName: "Beach House Decor",
      brandAvatarUrl: defaultImages[11],
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: defaultImages[12],
      brandName: "Gourmet Pantry",
      brandAvatarUrl: defaultImages[12],
      rating: 4.8,
      minOrder: "$100 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: defaultImages[13],
      brandName: "Craft Beverages",
      brandAvatarUrl: defaultImages[13],
      rating: 4.9,
      minOrder: "$125 min",
      freeShipping: true,
      topShop: false,
    },
  ];

  return (
    <RetailerLayout languageSelector={false} cartCount={13}>
      {/* Main content area */}
      <div className="mx-auto" style={{ maxWidth: "1920px", paddingLeft: "48px", paddingRight: "48px" }}>
        {/* Welcome heading */}
        <div className="pt-8">
          <h1
            className="text-[#333333] mb-4"
            style={{
              fontFamily: "Nantes, serif",
              fontWeight: 400,
              fontSize: "22px",
              lineHeight: "28px",
              letterSpacing: "-0.3px",
            }}
          >
            Welcome back, [retailer]
          </h1>
        </div>

        {/* Spotlight cards */}
        <div className="mb-12">
          <div className="grid grid-cols-5 gap-4">
            {/* Brand updates card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">Brand updates</h3>
                  <p className="text-sm text-[#757575]">25+ new</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src={defaultImages[14]}
                  alt="Brand update"
                  className="w-12 h-14 object-cover rounded"
                />
                <img
                  src={defaultImages[15]}
                  alt="Brand update"
                  className="w-10 h-12 object-cover rounded"
                />
              </div>
            </div>

            {/* Skin Essentials card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">Skin Essentials</h3>
                  <p className="text-sm text-[#757575]">On sale</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src={defaultImages[16]}
                  alt="Skin Essentials product"
                  className="w-10 h-14 object-cover rounded"
                />
                <img
                  src={defaultImages[17]}
                  alt="Skin Essentials product"
                  className="w-10 h-14 object-cover rounded"
                />
              </div>
            </div>

            {/* Beach House Decor card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">Beach House Decor</h3>
                  <p className="text-sm text-[#757575]">New products</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src={defaultImages[18]}
                  alt="Beach House Decor product"
                  className="w-14 h-16 object-cover rounded"
                />
                <img
                  src={defaultImages[19]}
                  alt="Beach House Decor product"
                  className="w-10 h-14 object-cover rounded"
                />
              </div>
            </div>

            {/* Gourmet Pantry card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">Gourmet Pantry</h3>
                  <p className="text-sm text-[#757575]">Jump back in</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src={defaultImages[0]}
                  alt="Gourmet Pantry product"
                  className="w-12 h-14 object-cover rounded"
                />
                <img
                  src={defaultImages[1]}
                  alt="Gourmet Pantry product"
                  className="w-12 h-14 object-cover rounded"
                />
              </div>
            </div>

            {/* Cocktail mixes card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">Cocktail mixes & elixirs</h3>
                  <p className="text-sm text-[#757575]">Trending</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src={defaultImages[2]}
                  alt="Cocktail mix"
                  className="w-10 h-14 object-cover rounded"
                />
                <img
                  src={defaultImages[3]}
                  alt="Cocktail mix"
                  className="w-10 h-14 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Your team's recently viewed */}
        <div className="mb-12">
          <div className="mb-4">
            <h2
              className="text-[#333333]"
              style={{
                fontFamily: "Nantes, serif",
                fontWeight: 400,
                fontSize: "22px",
                lineHeight: "28px",
                letterSpacing: "-0.3px",
              }}
            >
              Your team's recently viewed
            </h2>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {recentlyViewedProducts.map((product, index) => (
              <BrandTile
                key={index}
                imageUrl={product.imageUrl}
                brandName={product.brandName}
                productName={product.productName}
                price={product.price}
                msrp={product.msrp}
                brandAvatarUrl={product.brandAvatarUrl}
                rating={product.rating}
                minOrder={product.minOrder}
                freeShipping={product.freeShipping}
                topShop={product.topShop}
                onFavorite={() => console.log("Favorited:", product.brandName)}
                isFavorited={product.isFavorited}
                onClick={() => console.log("Clicked:", product.brandName)}
              />
            ))}
          </div>
        </div>

        {/* Updates from your team's brands */}
        <div className="mb-12">
          <h2
            className="text-[#333333] mb-4"
            style={{
              fontFamily: "Nantes, serif",
              fontWeight: 400,
              fontSize: "22px",
              lineHeight: "28px",
              letterSpacing: "-0.3px",
            }}
          >
            Updates from your team's brands
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Brand update cards */}
            {brandUpdates.slice(0, 3).map((brand, index) => (
              <div
                key={index}
                className="bg-white border border-[#dfe0e1] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={brand.brandAvatarUrl}
                    alt={brand.brandName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#333333]">{brand.brandName}</p>
                    <p className="text-sm text-[#757575]">added new products • 5h</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <img
                    src={brand.imageUrl}
                    alt={`${brand.brandName} product 1`}
                    className="w-full aspect-square object-cover rounded"
                  />
                  <img
                    src={brandUpdates[(index + 1) % brandUpdates.length].imageUrl}
                    alt={`${brand.brandName} product 2`}
                    className="w-full aspect-square object-cover rounded"
                  />
                  <img
                    src={brandUpdates[(index + 2) % brandUpdates.length].imageUrl}
                    alt={`${brand.brandName} product 3`}
                    className="w-full aspect-square object-cover rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products you might like */}
        <div className="mb-12">
          <h2
            className="text-[#333333] mb-4"
            style={{
              fontFamily: "Nantes, serif",
              fontWeight: 400,
              fontSize: "22px",
              lineHeight: "28px",
              letterSpacing: "-0.3px",
            }}
          >
            Products you might like
          </h2>
          <div className="grid grid-cols-6 gap-4">
            {recentlyViewedProducts.map((product, index) => (
              <BrandTile
                key={`recommended-${index}`}
                imageUrl={product.imageUrl}
                brandName={product.brandName}
                productName={product.productName}
                price={product.price}
                msrp={product.msrp}
                brandAvatarUrl={product.brandAvatarUrl}
                rating={product.rating}
                minOrder={product.minOrder}
                freeShipping={product.freeShipping}
                topShop={product.topShop}
                onFavorite={() => console.log("Favorited:", product.brandName)}
                isFavorited={product.isFavorited}
                onClick={() => console.log("Clicked:", product.brandName)}
              />
            ))}
          </div>
        </div>
      </div>
    </RetailerLayout>
  );
}

