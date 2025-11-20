import React, { useState } from "react";
import RetailerLayout from "../components/RetailerLayout";
import BrandTile from "../components/shared/BrandTile";
import CarouselHeader from "../components/shared/CarouselHeader";
import Carousel from "../components/shared/Carousel";

export default function TemplatePage() {
  const [navigationButtons, setNavigationButtons] = useState<React.ReactNode>(null);

  // Mock data for "Your team's recently viewed"
  const recentlyViewedProducts = [
    {
      imageUrl: "/images/products/product-image-01.webp",
      brandName: "normal® ice cream",
      productName: "The Handle Ice Cream Bar",
      brandAvatarUrl: "/images/products/product-image-01.webp",
      price: 3.75,
      msrp: 5.50,
      rating: 4.9,
      minOrder: "$100 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: "/images/products/product-image-02.webp",
      brandName: "Silpaca",
      productName: "Alpaca Throw Blanket - Grapevine",
      brandAvatarUrl: "/images/products/product-image-02.webp",
      price: 58.00,
      msrp: 130.00,
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: true,
      topShop: true,
      isFavorited: true,
    },
    {
      imageUrl: "/images/products/product-image-03.webp",
      brandName: "Raaka Chocolate",
      productName: "Fig Ginger Snap Chocolate - Holiday Limited Batch",
      brandAvatarUrl: "/images/products/product-image-03.webp",
      price: 4.09,
      msrp: 8.00,
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: "/images/products/product-image-04.webp",
      brandName: "Papa Barista",
      productName: "Toasting To A Fine Wine Birthday | Celebration Greeting Card",
      brandAvatarUrl: "/images/products/product-image-04.webp",
      price: 2.50,
      msrp: 5.00,
      rating: 5.0,
      minOrder: "$75 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: "/images/products/product-image-05.webp",
      brandName: "Piecework",
      productName: "Top Dog Jigsaw Puzzle",
      brandAvatarUrl: "/images/products/product-image-05.webp",
      price: 20.00,
      msrp: 40.00,
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: false,
      topShop: false,
      isFavorited: false,
    },
    {
      imageUrl: "/images/products/product-image-06.webp",
      brandName: "Cellar Door Preserves",
      productName: "Dehydrated Orange Wheels",
      brandAvatarUrl: "/images/products/product-image-06.webp",
      price: 4.99,
      msrp: 9.99,
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
      imageUrl: "/images/products/product-image-01.webp",
      brandName: "Objet Paris",
      brandAvatarUrl: "/images/products/product-image-01.webp",
      rating: 4.8,
      minOrder: "$200 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: "/images/products/product-image-02.webp",
      brandName: "Cabi",
      brandAvatarUrl: "/images/products/product-image-02.webp",
      rating: 4.9,
      minOrder: "$150 min",
      freeShipping: true,
      topShop: false,
    },
    {
      imageUrl: "/images/products/product-image-03.webp",
      brandName: "Abrams",
      brandAvatarUrl: "/images/products/product-image-03.webp",
      rating: 5.0,
      minOrder: "$100 min",
      freeShipping: false,
      topShop: true,
    },
    {
      imageUrl: "/images/products/product-image-04.webp",
      brandName: "The Gourmet Kitchen",
      brandAvatarUrl: "/images/products/product-image-04.webp",
      rating: 4.7,
      minOrder: "$125 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: "/images/products/product-image-05.webp",
      brandName: "Hellenic Farms",
      brandAvatarUrl: "/images/products/product-image-05.webp",
      rating: 4.9,
      minOrder: "$175 min",
      freeShipping: true,
      topShop: false,
    },
    {
      imageUrl: "/images/products/product-image-06.webp",
      brandName: "Saarde",
      brandAvatarUrl: "/images/products/product-image-06.webp",
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: "/images/products/product-image-07.webp",
      brandName: "The Get Out",
      brandAvatarUrl: "/images/products/product-image-07.webp",
      rating: 4.8,
      minOrder: "$100 min",
      freeShipping: false,
      topShop: false,
    },
    {
      imageUrl: "/images/products/product-image-08.webp",
      brandName: "Cocktail Mixes",
      brandAvatarUrl: "/images/products/product-image-08.webp",
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
            Welcome back, Supper Club
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
                  src="/images/products/product-image-01.webp"
                  alt="Brand update"
                  className="w-12 h-14 object-cover rounded"
                />
                <img
                  src="/images/products/product-image-02.webp"
                  alt="Brand update"
                  className="w-10 h-12 object-cover rounded"
                />
              </div>
            </div>

            {/* Hellenic Farms card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">Hellenic Farms</h3>
                  <p className="text-sm text-[#757575]">On sale</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src="/images/products/product-image-03.webp"
                  alt="Hellenic Farms product"
                  className="w-10 h-14 object-cover rounded"
                />
                <img
                  src="/images/products/product-image-04.webp"
                  alt="Hellenic Farms product"
                  className="w-10 h-14 object-cover rounded"
                />
              </div>
            </div>

            {/* Saarde card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">Saarde</h3>
                  <p className="text-sm text-[#757575]">New products</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src="/images/products/product-image-05.webp"
                  alt="Saarde product"
                  className="w-14 h-16 object-cover rounded"
                />
                <img
                  src="/images/products/product-image-06.webp"
                  alt="Saarde product"
                  className="w-10 h-14 object-cover rounded"
                />
              </div>
            </div>

            {/* The Get Out card */}
            <div
              className="bg-[#f5f5f5] rounded-lg p-6 cursor-pointer hover:bg-[#ececec] transition-colors relative overflow-hidden"
              style={{ height: "128px" }}
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#333333] mb-1">The Get Out</h3>
                  <p className="text-sm text-[#757575]">Jump back in</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 flex gap-1.5 items-end" style={{ transform: "translate(4px, 4px)" }}>
                <img
                  src="/images/products/product-image-07.webp"
                  alt="The Get Out product"
                  className="w-12 h-14 object-cover rounded"
                />
                <img
                  src="/images/products/product-image-08.webp"
                  alt="The Get Out product"
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
                  src="/images/products/product-image-01.webp"
                  alt="Cocktail mix"
                  className="w-10 h-14 object-cover rounded"
                />
                <img
                  src="/images/products/product-image-02.webp"
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

