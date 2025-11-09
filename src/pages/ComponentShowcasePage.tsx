import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RetailerLayout from "../components/RetailerLayout";
import { getTitleForComponentPath } from "../config/components";

// Import components
import RetailerGlobalNavLoggedIn from "../components/RetailerGlobalNavLoggedIn";
import Footer from "../components/Footer";
import { BrandInfo, BrandCartCard, BasicContainer } from "../components/shared";

export default function ComponentShowcasePage() {
  const location = useLocation();
  const componentPath = location.pathname;

  useEffect(() => {
    const title = getTitleForComponentPath(componentPath);
    document.title = title;
  }, [componentPath]);

  const renderComponent = () => {
    switch (componentPath) {
      case "/components/global-nav":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Standard Variant</h3>
              <div className="border border-[#dfe0e1] rounded">
                <RetailerGlobalNavLoggedIn languageSelector={false} cartCount={13} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Focused Variant</h3>
              <div className="border border-[#dfe0e1] rounded">
                <RetailerGlobalNavLoggedIn focused={true} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Focused Variant 2</h3>
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
              <h3 className="text-xl font-semibold text-[#333333] mb-4">PDP Variant</h3>
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
              <h3 className="text-xl font-semibold text-[#333333] mb-4">PDP Variant with Cart Card</h3>
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
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Checkout Variant</h3>
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

      case "/components/brand-cart-card":
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
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Without Avatar</h3>
              <div className="border border-[#dfe0e1] rounded p-6">
                <BrandCartCard brandName="Misewell" />
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
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Custom Padding</h3>
              <BasicContainer padding="48px">
                <p className="text-sm text-[#333333]">This container has 48px padding.</p>
              </BasicContainer>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">With Custom Styles</h3>
              <BasicContainer style={{ backgroundColor: "#f5f5f5" }}>
                <p className="text-sm text-[#333333]">This container has a custom background color.</p>
              </BasicContainer>
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

