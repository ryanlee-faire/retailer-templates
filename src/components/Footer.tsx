import React from "react";

// Social Media Icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-instagram"
      role="img"
      style={{ fill: "#333333" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6.5A4.5 4.5 0 0 1 7.5 2h10A4.5 4.5 0 0 1 22 6.5v10a4.5 4.5 0 0 1-4.5 4.5h-10A4.5 4.5 0 0 1 3 16.5zM7.5 3A3.5 3.5 0 0 0 4 6.5v10A3.5 3.5 0 0 0 7.5 20h10a3.5 3.5 0 0 0 3.5-3.5v-10A3.5 3.5 0 0 0 17.5 3zm.5 8.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM12.5 8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
        fill="#333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-instagram">Instagram</title>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      aria-labelledby="titleAccess-facebook"
      role="img"
      style={{ fill: "#333333" }}
    >
      <path
        d="M13.714 6.857c0-1.714.857-1.714 1.714-1.714h1.029A1.286 1.286 0 0 0 17.76 3.84V2.229A1.304 1.304 0 0 0 16.44.926L14.005.89a4.903 4.903 0 0 0-5.057 5.486v2.486H7.594a1.303 1.303 0 0 0-1.303 1.303v1.611a1.303 1.303 0 0 0 1.303 1.303h1.354v9.206a.857.857 0 0 0 .857.857h3.103a.857.857 0 0 0 .806-.857V13.08h1.508a1.303 1.303 0 0 0 1.303-1.303v-1.611a1.303 1.303 0 0 0-1.303-1.303h-1.508z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <title id="titleAccess-facebook">Facebook</title>
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      viewBox="0 0 16 16"
      aria-labelledby="titleAccess-x"
      role="img"
      style={{ fill: "none", width: "15px", height: "15px" }}
    >
      <path d="M0 0L11.3548 16H16L4.64516 0H0ZM2.99754 1.54839L12.1547 14.4516H13.0025L3.84534 1.54839H2.99754Z" fill="#333333" />
      <path d="M1.54814 16H0.257812L13.9352 0H15.2256L1.54814 16Z" fill="#333333" />
      <title id="titleAccess-x">X icon</title>
    </svg>
  );
}

export default function Footer() {
  const companyLinks = [
    { label: "About us", href: "/about" },
    { label: "Newsroom", href: "/news", external: true },
    { label: "Careers", href: "/careers" },
    { label: "Affiliates", href: "/affiliates" },
    { label: "Blog", href: "https://www.faire.com/blog/", external: true },
  ];

  const exploreLinks = [
    { label: "Help center", href: "/support/retailers", external: true },
    { label: "Open with Faire", href: "/open-with-faire", external: true },
    { label: "Faire Markets", href: "/markets", external: true },
    { label: "Sell on Faire", href: "/brands" },
    { label: "Small Business Grant", href: "/small-business-grant" },
    { label: "POS integration", href: "/point-of-sale/about" },
  ];

  const legalLinks = [
    { label: "Terms of Service", href: "/tos", external: true },
    { label: "Privacy Policy", href: "/privacy", external: true },
    { label: "Cookie Policy", href: "/privacy/cookies", external: true },
    { label: "IP Policy", href: "/copyright", external: true },
    { label: "Accessibility Policy", href: "/aoda", external: true },
    { label: "Sitemap", href: "/site-map", external: true },
  ];

  return (
    <footer className="mx-auto flex w-full flex-col justify-between self-stretch overflow-auto px-4 py-8 md:px-6 lg:p-12 2xl:p-20">
      <hr style={{ borderBlockEnd: "0px", borderInline: "0px", inlineSize: "100vw", margin: "0px calc(-50vw + 50%)", blockSize: "1px", borderBlockStart: "1px solid rgb(223, 224, 225)" }} />
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start" style={{ marginTop: "60px" }}>
        {/* App Download Section */}
        <div className="w-full pb-8 md:w-[430px] md:pb-0 lg:w-[470px] xl:w-[670px] flex flex-col">
          <p 
            className="text-[#333333]" 
            style={{ 
              fontFamily: "Nantes, serif",
              fontWeight: 400,
              fontSize: "38px",
              lineHeight: "50px",
              letterSpacing: "0px"
            }}
          >
            Discover products on the go with the Faire app
          </p>
          <div style={{ height: "24px" }} />
          <div className="flex items-center flex-row">
            <button className="bg-transparent border-0 p-0 cursor-pointer" aria-label="Download on App Store">
              <img
                width="120"
                alt="Apple App Store Badge"
                src="https://cdn.faire.com/static/download-badges/app-store-en.svg"
                style={{ display: "block" }}
              />
            </button>
            <div style={{ width: "16px", height: "0px" }} />
            <button className="bg-transparent border-0 p-0 cursor-pointer" aria-label="Get it on Google Play">
              <img
                width="156"
                alt="Google Play Store Badge"
                src="https://cdn.faire.com/static/download-badges/google-play-en.png"
              />
            </button>
          </div>
        </div>

        {/* Divider for mobile */}
        <hr className="md:hidden" style={{ borderBlockEnd: "0px", borderInline: "0px", inlineSize: "100vw", margin: "0px -16px", blockSize: "1px", borderBlockStart: "1px solid rgb(223, 224, 225)" }} />

        {/* Links Section */}
        <div className="w-full py-8 md:mt-2 md:w-max md:pt-0 md:pb-8 md:pl-[50px] lg:mt-3 lg:pl-0 xl:mt-4 flex flex-col md:flex-row md:items-start">
          <div className="w-full md:w-fit flex flex-row md:flex-row md:justify-start md:gap-6 lg:gap-8">
            {/* Company Links */}
            <div className="min-w-[140px] gap-3 xl:w-[220px] 2xl:w-[280px] flex flex-col">
              <p className="text-[#333333] text-sm font-medium mb-3">Company</p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.href} className="flex items-center">
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[#333333] text-sm no-underline hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore Links */}
            <div className="min-w-[140px] gap-3 xl:w-[220px] 2xl:w-[280px] flex flex-col">
              <p className="text-[#333333] text-sm font-medium mb-3">Explore</p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {exploreLinks.map((link) => (
                  <li key={link.href} className="flex items-center">
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[#333333] text-sm no-underline hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="w-fit pt-8 lg:pt-0 flex items-center md:items-start lg:items-start gap-8 flex-row ml-auto">
            <a
              href="https://www.instagram.com/faire_wholesale/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#333333] no-underline"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/fairewholesale/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#333333] no-underline"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/faire_wholesale"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#333333] no-underline"
              aria-label="X (Twitter)"
            >
              <XIcon className="w-4 h-4 mt-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: "32px" }} className="hidden md:block" />

      {/* Bottom Section - Copyright and Legal Links */}
      <div className="flex flex-col md:flex-row md:justify-start">
        <div className="w-full flex flex-wrap flex-col md:flex-row md:items-start">
          <p className="text-[#333333] text-sm font-medium">©2025 Faire Wholesale, Inc.</p>
          <div style={{ width: "8px", height: "8px" }} className="hidden md:block" />
          <div className="flex flex-col md:flex-row gap-3 md:gap-0">
            {legalLinks.map((link, index) => (
              <div key={link.href} className="flex flex-row items-center">
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-[#333333] text-sm no-underline hover:underline"
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && (
                  <div className="hidden md:flex flex-row items-center">
                    <div style={{ width: "4px" }} />
                    <p className="text-[#757575] text-sm"> • </p>
                    <div style={{ width: "4px" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div style={{ height: "56px" }} className="md:hidden" />
      <div style={{ height: "16px" }} className="hidden md:block" />
    </footer>
  );
}

