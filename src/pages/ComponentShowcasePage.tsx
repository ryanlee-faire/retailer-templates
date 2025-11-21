import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RetailerLayout from "../components/RetailerLayout";
import { getTitleForComponentPath } from "../config/components";

// Import components
import RetailerGlobalNavLoggedIn from "../components/RetailerGlobalNavLoggedIn";
import Footer from "../components/Footer";
import { BrandInfo, BrandCartCard, BasicContainer, BrandTile, Carousel, CarouselHeader, CartTile, PostOrderSummary, ProductTile, PillButton } from "../components/shared";

// Carousel header example with navigation buttons
function CarouselHeaderExample() {
  const [navigationButtons, setNavigationButtons] = useState<React.ReactNode>(null);

  // Create mock navigation buttons for demonstration
  React.useEffect(() => {
    const ChevronLeftIcon = () => (
      <svg
        className="w-3 h-3"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
        style={{ color: "inherit", fill: "none", width: "12px", height: "12px" }}
      >
        <path
          d="m17 2-9.767 9.455A.77.77 0 0 0 7 12a.75.75 0 0 0 .233.545L17 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const ChevronRightIcon = () => (
      <svg
        className="w-3 h-3"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="presentation"
        style={{ color: "inherit", fill: "none", width: "12px", height: "12px" }}
      >
        <path
          d="m7 2 9.767 9.455A.77.77 0 0 1 17 12a.75.75 0 0 1-.233.545L7 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const buttons = (
      <>
        <button
          aria-label="Previous carousel slide"
          aria-disabled={false}
          className="shrink-0 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-500 ease-in-out relative"
          style={{
            boxSizing: "border-box",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
            gap: "10px",
            width: "32px",
            height: "32px",
            border: "1px solid #dfe0e1",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#dfe0e1",
            borderRadius: "100px",
            flex: "none",
            order: 1,
            flexGrow: 0,
            color: "#333333",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
          }}
        >
          <span 
            className="absolute rounded-[inherit] pointer-events-none" 
            style={{
              width: "44px",
              height: "44px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div className="flex items-center justify-center relative z-10">
            <ChevronLeftIcon />
          </div>
        </button>
        <button
          aria-label="Next carousel slide"
          aria-disabled={false}
          className="shrink-0 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-500 ease-in-out relative"
          style={{
            boxSizing: "border-box",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
            gap: "10px",
            width: "32px",
            height: "32px",
            border: "1px solid #dfe0e1",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#dfe0e1",
            borderRadius: "100px",
            flex: "none",
            order: 1,
            flexGrow: 0,
            color: "#333333",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
          }}
        >
          <span 
            className="absolute rounded-[inherit] pointer-events-none" 
            style={{
              width: "44px",
              height: "44px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div className="flex items-center justify-center relative z-10">
            <ChevronRightIcon />
          </div>
        </button>
      </>
    );
    setNavigationButtons(buttons);
  }, []);

  return (
    <CarouselHeader
      title="Brands you might like"
      shopAllLink={{
        href: "/see-more?seeMoreType=3",
        text: "Shop all",
      }}
      navigationButtons={navigationButtons}
    />
  );
}

// Carousel example component with header
function CarouselExample() {
  const [navigationButtons, setNavigationButtons] = useState<React.ReactNode>(null);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-xl font-semibold text-[#333333] mb-4">Brand tile carousel - Full width (6 tiles)</h3>
        <div
          className="retailer-12col-grid mx-auto"
          style={{
            maxWidth: "1920px",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <CarouselHeader
              title="Brands you might like"
              shopAllLink={{
                href: "/see-more?seeMoreType=3",
                text: "Shop all",
              }}
              navigationButtons={navigationButtons}
              className="px-4 md:px-0"
            />
          </div>
        </div>
        <Carousel
          variant="brand-tile"
          onNavigationButtonsReady={setNavigationButtons}
          brands={[
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
                  brandName: "Misewell",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 5.0,
                  minOrder: "$100 min",
                  freeShipping: true,
                  topShop: true,
                },
                {
                  imageUrl: "/images/products/product-image-03.webp",
                  brandName: "Top Shop",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 4.8,
                  minOrder: "$200 min",
                  freeShipping: false,
                },
                {
                  imageUrl: "/images/products/product-image-04.webp",
                  brandName: "Brand Four",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 5.0,
                  minOrder: "$75 min",
                  freeShipping: true,
                },
                {
                  imageUrl: "/images/products/product-image-05.webp",
                  brandName: "Brand Five",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 4.5,
                  minOrder: "$120 min",
                  freeShipping: false,
                  topShop: true,
                },
                {
                  imageUrl: "/images/products/product-image-06.webp",
                  brandName: "Brand Six",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 5.0,
                  minOrder: "$90 min",
                  freeShipping: true,
                },
                {
                  imageUrl: "/images/products/product-image-01.webp",
                  brandName: "Brand Seven",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 4.9,
                  minOrder: "$110 min",
                  freeShipping: true,
                },
                {
                  imageUrl: "/images/products/product-image-02.webp",
                  brandName: "Brand Eight",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 5.0,
                  minOrder: "$85 min",
                  freeShipping: false,
                  topShop: true,
                },
                {
                  imageUrl: "/images/products/product-image-03.webp",
                  brandName: "Brand Nine",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 4.7,
                  minOrder: "$130 min",
                  freeShipping: true,
                },
                {
                  imageUrl: "/images/products/product-image-04.webp",
                  brandName: "Brand Ten",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 5.0,
                  minOrder: "$95 min",
                  freeShipping: true,
                },
                {
                  imageUrl: "/images/products/product-image-05.webp",
                  brandName: "Brand Eleven",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 4.6,
                  minOrder: "$140 min",
                  freeShipping: false,
                },
                {
                  imageUrl: "/images/products/product-image-06.webp",
                  brandName: "Brand Twelve",
                  brandAvatarUrl: "/images/products/product-image-01.webp",
                  rating: 5.0,
                  minOrder: "$80 min",
                  freeShipping: true,
                  topShop: true,
                },
              ]}
        />
      </div>
    </div>
  );
}

export default function ComponentShowcasePage() {
  const location = useLocation();
  const componentPath = location.pathname;

  useEffect(() => {
    const title = getTitleForComponentPath(componentPath);
    document.title = title;
  }, [componentPath]);

  // State for pill button toggle example
  const [pressedFilter, setPressedFilter] = useState<string | null>(null);

  const renderComponent = () => {
    switch (componentPath) {
      case "/components/global-nav":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Standard variant</h3>
              <div className="border border-[#dfe0e1] rounded">
                <RetailerGlobalNavLoggedIn languageSelector={false} cartCount={13} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Focused variant</h3>
              <div className="border border-[#dfe0e1] rounded">
                <RetailerGlobalNavLoggedIn focused={true} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Focused variant 2</h3>
              <div className="border border-[#dfe0e1] rounded">
                <RetailerGlobalNavLoggedIn focused2={true} />
              </div>
            </div>
          </div>
        );

      case "/components/footer":
        return (
          <div className="border border-[#dfe0e1] rounded">
            <Footer />
          </div>
        );

      case "/components/brand-info":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">PDP variant</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <BrandInfo
                  brandName="Misewell"
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  rating={5.0}
                  badge="Top Shop"
                  minReached="$100 min reached"
                  variant="pdp"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">PDP variant with cart card</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <BrandInfo
                  brandName="Misewell"
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  rating={5.0}
                  badge="Top Shop"
                  minReached="$100 min reached"
                  showCartCard={true}
                  variant="pdp"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Checkout variant</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <BrandInfo
                  brandName="Misewell"
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  showInsider={true}
                  itemTotal="$319.00"
                  variant="checkout"
                />
              </div>
            </div>
          </div>
        );

      case "/components/brand-cart-toggle":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Default</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <BrandCartCard
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  brandName="Misewell"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Without avatar</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <BrandCartCard brandName="Misewell" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Number variant</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <BrandCartCard variant="number" number={123} />
              </div>
            </div>
          </div>
        );

      case "/components/brand-tile":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Default</h3>
              <div style={{ maxWidth: "400px" }}>
                <BrandTile
                  imageUrl="/images/products/product-image-01.webp"
                  brandName="P.F Candle"
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  rating={5.0}
                  minOrder="$150 min"
                  freeShipping={true}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">With top shop badge</h3>
              <div style={{ maxWidth: "400px" }}>
                <BrandTile
                  imageUrl="/images/products/product-image-02.webp"
                  brandName="Misewell"
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  rating={5.0}
                  minOrder="$100 min"
                  freeShipping={true}
                  topShop={true}
                  onFavorite={() => {}}
                  isFavorited={false}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Favorited state</h3>
              <div style={{ maxWidth: "400px" }}>
                <BrandTile
                  imageUrl="/images/products/product-image-03.webp"
                  brandName="Top Shop"
                  brandAvatarUrl="/images/products/product-image-01.webp"
                  rating={5.0}
                  minOrder="$200 min"
                  freeShipping={true}
                  topShop={true}
                  onFavorite={() => {}}
                  isFavorited={true}
                />
              </div>
            </div>
          </div>
        );

      case "/components/carousel":
        return <CarouselExample />;

      case "/components/carousel-header":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Default</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <CarouselHeader
                  title="Brands you might like"
                  shopAllLink={{
                    href: "/see-more?seeMoreType=3",
                    text: "Shop all",
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">With navigation buttons</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <CarouselHeaderExample />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Without shop all link</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <CarouselHeader title="Featured brands" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Custom shop all text</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <CarouselHeader
                  title="New arrivals"
                  shopAllLink={{
                    href: "/new-arrivals",
                    text: "View all",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case "/components/basic-container":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Default (24px padding)</h3>
              <BasicContainer>
                <p className="text-sm text-[#333333]">This is a basic container with default padding.</p>
              </BasicContainer>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Custom padding</h3>
              <BasicContainer padding="48px">
                <p className="text-sm text-[#333333]">This container has 48px padding.</p>
              </BasicContainer>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">With custom styles</h3>
              <BasicContainer style={{ backgroundColor: "#f5f5f5" }}>
                <p className="text-sm text-[#333333]">This container has a custom background color.</p>
              </BasicContainer>
            </div>
          </div>
        );

      case "/components/cart-tile":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Default</h3>
              <div style={{ maxWidth: "400px" }}>
                <CartTile
                  brandName="Boyd's of Texas"
                  avatarUrl="/images/products/product-image-01.webp"
                  productImages={[
                    "/images/products/product-image-01.webp",
                    "/images/products/product-image-02.webp",
                    "/images/products/product-image-03.webp",
                  ]}
                  additionalCount={3}
                />
              </div>
            </div>
          </div>
        );

      case "/components/post-order-summary-01":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Default</h3>
              <div style={{ maxWidth: "400px" }}>
                <PostOrderSummary
                  brandName="Fishwife"
                  orderNumber="J42FPN3PKA"
                  total="$1,234.00"
                  shippingAddress="100 Potrero Ave, San Francisco, CA 94107"
                  paymentMethod={{
                    type: "VISA",
                    lastFour: "5678",
                    terms: "60-day payment terms",
                  }}
                  itemCount={7}
                  itemImageUrl="/images/products/product-image-07.webp"
                  savings="$465.00"
                  savingsType="Insider & deals"
                />
              </div>
            </div>
          </div>
        );

      case "/components/product-tile":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Default</h3>
              <div style={{ maxWidth: "300px" }}>
                <ProductTile
                  id="1"
                  name="Brass Dice"
                  brandName="NOAH MARION"
                  imageUrl="https://cdn.faire.com/fastly/29a653dcf44f45f47bf8d8e52a358ac91deeb5a3e4a71de77542f3fd6002d0e6.png?bg-color=FFFFFF&dpr=1&fit=crop&format=jpg&height=720&precrop=839,838,x29,y0,safe&width=720"
                  price="$16.80"
                  msrp="$28"
                  minOrder="$150 min"
                  freeShipping={true}
                  isTopShop={true}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">With zoom button</h3>
              <div style={{ maxWidth: "300px" }}>
                <ProductTile
                  id="2"
                  name="Cubic Table Lamp"
                  brandName="Misewell"
                  imageUrl="/images/products/product-image-01.webp"
                  price="$159.50"
                  msrp="$319.00"
                  minOrder="$100 min"
                  freeShipping={false}
                  isTopShop={true}
                  zoomButton={true}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Without Top Shop badge</h3>
              <div style={{ maxWidth: "300px" }}>
                <ProductTile
                  id="3"
                  name="Pink Peppercorn"
                  brandName="Casa Bosques"
                  imageUrl="/images/products/product-image-03.webp"
                  price="$8.50"
                  msrp="$14"
                  minOrder="$85 min"
                  freeShipping={true}
                  isTopShop={false}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Grid example</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 1440:grid-cols-6 gap-4">
                <ProductTile
                  id="4"
                  name="Product One"
                  brandName="Brand Name"
                  imageUrl="/images/products/product-image-01.webp"
                  price="$10"
                  msrp="$20"
                  minOrder="$150 min"
                  freeShipping={true}
                  isTopShop={true}
                />
                <ProductTile
                  id="5"
                  name="Product Two"
                  brandName="Brand Name"
                  imageUrl="/images/products/product-image-02.webp"
                  price="$15"
                  msrp="$30"
                  minOrder="$150 min"
                  freeShipping={false}
                  isTopShop={false}
                />
                <ProductTile
                  id="6"
                  name="Product Three"
                  brandName="Brand Name"
                  imageUrl="/images/products/product-image-03.webp"
                  price="$20"
                  minOrder="$150 min"
                  freeShipping={true}
                  isTopShop={true}
                />
                <ProductTile
                  id="7"
                  name="Product Four"
                  brandName="Brand Name"
                  imageUrl="/images/products/product-image-04.webp"
                  price="$25"
                  msrp="$50"
                  minOrder="$150 min"
                  freeShipping={true}
                  isTopShop={false}
                />
                <ProductTile
                  id="8"
                  name="Product Five"
                  brandName="Brand Name"
                  imageUrl="/images/products/product-image-05.webp"
                  price="$30"
                  msrp="$60"
                  minOrder="$150 min"
                  freeShipping={false}
                  isTopShop={true}
                />
                <ProductTile
                  id="9"
                  name="Product Six"
                  brandName="Brand Name"
                  imageUrl="/images/products/product-image-06.webp"
                  price="$35"
                  msrp="$70"
                  minOrder="$150 min"
                  freeShipping={true}
                  isTopShop={false}
                />
              </div>
            </div>
          </div>
        );

      case "/components/pill-button":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Default State</h2>
              <div className="flex flex-wrap gap-2">
                <PillButton>Chocolate bars</PillButton>
                <PillButton>Spreads & nut butters</PillButton>
                <PillButton>Snacks</PillButton>
                <PillButton>Beverages</PillButton>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">With Toggle State</h2>
              <div className="flex flex-wrap gap-2">
                <PillButton
                  isPressed={pressedFilter === "chocolate"}
                  onClick={() => setPressedFilter(pressedFilter === "chocolate" ? null : "chocolate")}
                >
                  Chocolate bars
                </PillButton>
                <PillButton
                  isPressed={pressedFilter === "spreads"}
                  onClick={() => setPressedFilter(pressedFilter === "spreads" ? null : "spreads")}
                >
                  Spreads & nut butters
                </PillButton>
                <PillButton
                  isPressed={pressedFilter === "snacks"}
                  onClick={() => setPressedFilter(pressedFilter === "snacks" ? null : "snacks")}
                >
                  Snacks
                </PillButton>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Multiple Pressed</h2>
              <div className="flex flex-wrap gap-2">
                <PillButton isPressed={true}>Active filter</PillButton>
                <PillButton isPressed={true}>Another active</PillButton>
                <PillButton>Inactive filter</PillButton>
              </div>
            </div>
          </div>
        );

      default:
        return <p className="text-[#333333]">Component not found.</p>;
    }
  };

  return (
    <RetailerLayout languageSelector={false} cartCount={0}>
      <div
        className="retailer-12col-grid mx-auto"
        style={{
          maxWidth: "1920px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "48px",
        }}
      >
        <div style={{ gridColumn: "1 / -1" }}>
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">
            {getTitleForComponentPath(componentPath)}
          </h1>
          {renderComponent()}
        </div>
      </div>
    </RetailerLayout>
  );
}

