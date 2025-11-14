import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="w-60 border-r border-[var(--color-border-subdued)] bg-white p-6">
      {/* Faire Logo and Icons */}
      <div className="mb-8 flex items-center justify-between">
        <img src="https://cdn.faire.com/static/logo-360px.svg" alt="Faire" className="h-6" />
        <div className="flex items-center gap-3">
          {/* Bell Icon */}
          <button className="text-[var(--color-text-subdued)] hover:text-[var(--color-text-primary)]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6.5C15 5.17 14.5 3.92 13.5 3C12.5 2.08 11.25 1.5 10 1.5C8.75 1.5 7.5 2.08 6.5 3C5.5 3.92 5 5.17 5 6.5C5 12.5 2.5 14 2.5 14H17.5C17.5 14 15 12.5 15 6.5Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.5 17.5C11.3 17.8 11 18 10.7 18.2C10.4 18.3 10.2 18.5 10 18.5C9.8 18.5 9.6 18.3 9.3 18.2C9 18 8.7 17.8 8.5 17.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Profile Avatar */}
          <div className="h-8 w-8 rounded-full border border-[var(--color-border-subdued)] bg-[var(--color-grey-200)] flex items-center justify-center overflow-hidden">
            <div className="h-6 w-6 rounded-full bg-[#E8DCD0] flex items-center justify-center">
              <span className="text-xs font-medium text-[#8B7355]">W</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1">
        <Link to="/" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Home
        </Link>
        <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          <span>
            Orders
            <span className="ml-2 type-label text-[var(--color-text-subdued)]">5</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Messages
          <span className="ml-2 type-label text-[var(--color-text-subdued)]">8</span>
        </a>
        <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Customers
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Marketing
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Products Section - Expanded */}
        <div>
          <Link to="/products" className="flex items-center justify-between rounded px-3 py-2 type-paragraph-medium bg-[var(--color-grey-300)] text-[var(--color-text-primary)]">
            Products
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 7.5L6 4.5L9 7.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <div className="ml-6 mt-1 space-y-1">
            <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
              Bulk upload
            </a>
            <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
              Inventory
            </a>
            <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
              Collections
            </a>
            <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
              Pricing review
            </a>
            <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
              Performance
            </a>
          </div>
        </div>

        <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Analytics
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Integrations
        </a>
        <a href="#" className="block rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Top Shop
        </a>
        <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          My shop
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
          Settings
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </nav>

      {/* Sales Channels Section */}
      <div className="mt-8">
        <div className="type-label mb-2 px-3 text-[var(--color-text-subdued)]">Sales channels</div>
        <nav className="space-y-1">
          <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
            Marketplace
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
            Faire Direct
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="flex items-center justify-between rounded px-3 py-2 type-paragraph text-[var(--color-text-subdued)] hover:bg-[var(--color-grey-300)]">
            Events
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </nav>
      </div>
    </aside>
  );
}

