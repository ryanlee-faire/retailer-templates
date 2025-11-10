import React from "react";
import RetailerLayout from "../components/RetailerLayout";
import { BasicContainer, BrandTile, Carousel, CarouselHeader, CartTile } from "../components/shared";

export default function OrderConfirmationPage() {
  // Mock order data
  const order = {
    orderNumber: "J42FPN3PKA",
    brand: "Fishwife",
    total: "$1,234.00",
    shippingAddress: "100 Potrero Ave, San Francisco, CA 94107",
    paymentMethod: {
      type: "VISA",
      lastFour: "5678",
      terms: "60-day payment terms",
    },
    itemCount: 7,
    savings: "$465.00",
    savingsType: "Insider & deals",
  };

  // Brands to finish ordering - using CartTile format
  const finishOrderingBrands = [
    {
      brandName: "Boyd's of Texas",
      avatarUrl: "/images/products/product-image-01.webp",
      productImages: [
        "/images/products/product-image-01.webp",
        "/images/products/product-image-02.webp",
        "/images/products/product-image-03.webp",
      ],
      additionalCount: 3,
    },
    {
      brandName: "Nopalero",
      avatarUrl: "/images/products/product-image-02.webp",
      productImages: [
        "/images/products/product-image-02.webp",
        "/images/products/product-image-03.webp",
        "/images/products/product-image-04.webp",
      ],
      additionalCount: 3,
    },
    {
      brandName: "Like Family",
      avatarUrl: "/images/products/product-image-03.webp",
      productImages: [
        "/images/products/product-image-03.webp",
        "/images/products/product-image-04.webp",
        "/images/products/product-image-05.webp",
      ],
      additionalCount: 3,
    },
  ];

  // Brands in cart for carousel
  const brandsInCart = [
    {
      imageUrl: "/images/products/product-image-01.webp",
      brandName: "P.F Candle",
      brandAvatarUrl: "/images/products/product-image-01.webp",
      rating: 5.0,
      minOrder: "$150 min",
      freeShipping: true,
    },
    {
      imageUrl: "/images/products/product-image-02.webp",
      brandName: "Looshi",
      brandAvatarUrl: "/images/products/product-image-01.webp",
      rating: 5.0,
      minOrder: "$100 min",
      freeShipping: true,
    },
    {
      imageUrl: "/images/products/product-image-03.webp",
      brandName: "Boheme Fragrances",
      brandAvatarUrl: "/images/products/product-image-01.webp",
      rating: 4.8,
      minOrder: "$200 min",
      freeShipping: false,
    },
    {
      imageUrl: "/images/products/product-image-04.webp",
      brandName: "BOTANICA",
      brandAvatarUrl: "/images/products/product-image-01.webp",
      rating: 5.0,
      minOrder: "$75 min",
      freeShipping: true,
    },
    {
      imageUrl: "/images/products/product-image-05.webp",
      brandName: "Wild house paper",
      brandAvatarUrl: "/images/products/product-image-01.webp",
      rating: 4.5,
      minOrder: "$120 min",
      freeShipping: false,
    },
  ];

  return (
    <RetailerLayout>
      <div
        className="retailer-12col-grid mx-auto"
        style={{
          maxWidth: "1920px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "48px",
          paddingBottom: "120px",
        }}
      >
        {/* Main Content - Two Column Layout */}
        <div style={{ gridColumn: "2 / 8" }}>
          {/* Thanks for your order Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-medium text-[#333333] mb-4">Thanks for your order</h1>
            <p className="text-sm text-[#333333] mb-6">
              Save hours of time by connecting your POS system to automatically sync your orders and inventory.
            </p>
            
            {/* Product Images Gallery */}
            <div className="flex gap-2 mb-6">
              <img
                src="/images/products/product-image-01.webp"
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
              <img
                src="/images/products/product-image-02.webp"
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
              <img
                src="/images/products/product-image-03.webp"
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
              <img
                src="/images/products/product-image-04.webp"
                alt="Product"
                className="w-16 h-16 object-cover rounded"
              />
            </div>

            {/* Connect your POS Button */}
            <button className="bg-[#333333] text-white py-3 px-6 rounded font-medium mb-6 hover:bg-[#222222] transition-colors duration-500 ease-in-out">
              Connect your POS
            </button>

            {/* POS Logos */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#757575]">shopify</span>
              <span className="text-xs text-[#757575]">Square</span>
              <span className="text-xs text-[#757575]">clover</span>
            </div>
          </div>

        </div>

        {/* Order Summary - Right Column */}
        <div style={{ gridColumn: "8 / 12" }}>
          <BasicContainer>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[#333333] mb-2">{order.brand}</h3>
              <p className="text-sm text-[#333333] mb-1">Order {order.orderNumber}</p>
              <p className="text-lg font-medium text-[#333333]">Total: {order.total}</p>
            </div>

            <div className="mb-6 pb-6 border-b border-[#dfe0e1]">
              <p className="text-sm text-[#333333] mb-2">Ship to {order.shippingAddress}</p>
              <p className="text-sm text-[#333333]">
                {order.paymentMethod.type} .... {order.paymentMethod.lastFour} {order.paymentMethod.terms}
              </p>
            </div>

            {/* Item Count Image */}
            <div className="mb-6 flex justify-end">
              <div className="relative">
                <img
                  src="/images/products/product-image-01.webp"
                  alt="Order items"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="absolute -top-2 -right-2 bg-[#333333] text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-medium">{order.itemCount}</span>
                </div>
              </div>
            </div>

            {/* Savings Bar */}
            <div className="bg-[#f2f5f5] rounded p-3">
              <p className="text-sm text-[#333333]">
                Saving <span className="font-medium">{order.savings}</span> with {order.savingsType}
              </p>
            </div>
          </BasicContainer>
        </div>

        {/* Finish ordering - Columns 2-11 */}
        <div style={{ gridColumn: "2 / 12", marginTop: "48px" }}>
          <h2 className="text-2xl font-medium text-[#333333] mb-6">Finish ordering</h2>
          <div className="flex gap-4">
            {finishOrderingBrands.map((brand, index) => (
              <div key={index} style={{ flex: 1 }}>
                <CartTile
                  brandName={brand.brandName}
                  avatarUrl={brand.avatarUrl}
                  productImages={brand.productImages}
                  additionalCount={brand.additionalCount}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Brands in your cart - Columns 2-11 */}
        <div style={{ gridColumn: "2 / 12", marginTop: "48px" }}>
          <CarouselHeader
            title="Brands in your cart"
            shopAllLink={{
              href: "/cart",
              text: "See all",
            }}
            navigationButtons={null}
          />
          <Carousel
            variant="brand-tile"
            brands={brandsInCart}
            tilesPerView={5}
          />
        </div>
      </div>
    </RetailerLayout>
  );
}
