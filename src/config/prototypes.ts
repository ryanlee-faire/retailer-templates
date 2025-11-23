export interface Prototype {
  id: string;
  name: string;
  path: string;
  description: string;
  owner: string;
  lastUpdated: string;
  surfaceArea: 'Brand' | 'Retailer' | 'Other';
  category: 'experimental' | 'template';
  status?: 'wip' | 'ready' | 'active';
  thumbnail?: string;
}

export const prototypes: Prototype[] = [
  // Experimental - Brand
  {
    id: 'bulk-editor',
    name: 'Bulk Editor Page',
    path: '/faire/bulk-editor',
    description: 'Bulk product attribute editor for Upmarket Plus. A remix of the existing bulk editor with experimental features for managing product catalogs at scale.',
    owner: 'John',
    lastUpdated: '2024-11-23',
    surfaceArea: 'Brand',
    category: 'experimental',
    status: 'wip',
  },
  
  // Experimental - Retailer
  {
    id: 'compass-prototype',
    name: '🧭 Compass Prototype (JI)',
    path: '/template',
    description: 'AI-powered product discovery that helps retailers find multiple product types in one search. Features progressive search animation and conversational refinement.',
    owner: 'John',
    lastUpdated: '2024-11-23',
    surfaceArea: 'Retailer',
    category: 'experimental',
    status: 'active',
  },
  {
    id: 'compass-full-surface',
    name: '🧭 Compass Full Surface',
    path: '/compass-full-surface',
    description: 'Full surface page for Compass interface. Explores the full-page Compass experience beyond the side panel.',
    owner: 'Ryan',
    lastUpdated: '2024-11-20',
    surfaceArea: 'Retailer',
    category: 'experimental',
    status: 'ready',
  },
  {
    id: 'pdp-with-drawer',
    name: 'PDP with Drawer',
    path: '/pdp-with-drawer',
    description: 'Product detail page with Compass integration via side drawer. Explores how Compass could work within the product browsing experience.',
    owner: 'Ryan',
    lastUpdated: '2024-11-20',
    surfaceArea: 'Retailer',
    category: 'experimental',
    status: 'ready',
  },
  {
    id: 'pdp-with-drawer-left',
    name: 'PDP with Drawer (Left)',
    path: '/pdp-with-drawer-left',
    description: 'Alternative PDP layout with Compass drawer opening from the left side. Tests different spatial arrangements for the Compass integration.',
    owner: 'Ryan',
    lastUpdated: '2024-11-20',
    surfaceArea: 'Retailer',
    category: 'experimental',
    status: 'ready',
  },
  {
    id: 'pdp-v2',
    name: 'PDP v2',
    path: '/pdp-v2',
    description: 'Experimental variant of the product detail page. Explores alternative layouts and interaction patterns for product browsing.',
    owner: 'Ryan',
    lastUpdated: '2024-11-15',
    surfaceArea: 'Retailer',
    category: 'experimental',
    status: 'ready',
  },
  
  // Templates - Brand
  {
    id: 'products-page',
    name: 'Products Page',
    path: '/faire/products',
    description: 'Product listing and management page. Mirrors the current production brand portal products experience with filtering and bulk actions.',
    owner: 'John',
    lastUpdated: '2024-11-14',
    surfaceArea: 'Brand',
    category: 'template',
    status: 'active',
  },
  
  // Templates - Retailer
  {
    id: 'basic-logged-in',
    name: 'Basic Logged-in',
    path: '/template',
    description: 'Foundation template for logged-in retailer experience. Includes global navigation, search, and standard layout structure.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
  {
    id: 'new-page',
    name: 'New Page',
    path: '/new-page',
    description: 'Blank template for starting new retailer pages. Provides the basic layout structure and navigation chrome.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
  {
    id: 'brand-page',
    name: 'Brand Page',
    path: '/brand',
    description: 'Brand detail page template showing brand information, products, and filtering. Mirrors current production brand page layout.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
  {
    id: 'search-results',
    name: 'Search Results',
    path: '/search-results',
    description: 'Search results page template with product grid, filters, and sorting. Reflects current production search experience.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
  {
    id: 'pdp',
    name: 'PDP',
    path: '/pdp',
    description: 'Standard product detail page template. Mirrors current production PDP with images, product info, pricing, and add to cart.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
  {
    id: 'checkout',
    name: 'Checkout',
    path: '/checkout',
    description: 'Checkout flow template including cart review, shipping, and payment. Reflects current production checkout experience.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
  {
    id: 'order-confirmation',
    name: 'Order Confirmation',
    path: '/order-confirmation',
    description: 'Post-purchase confirmation page template. Shows order summary, shipping details, and next steps.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
  {
    id: 'category-page',
    name: 'Category Page',
    path: '/category/:categoryName',
    description: 'Category browsing page template with product grid and category-specific filtering.',
    owner: 'Ryan',
    lastUpdated: '2024-11-10',
    surfaceArea: 'Retailer',
    category: 'template',
    status: 'active',
  },
];

// Helper functions to filter prototypes
export const getExperimentalPrototypes = () => 
  prototypes.filter(p => p.category === 'experimental');

export const getTemplatePrototypes = () => 
  prototypes.filter(p => p.category === 'template');

export const getPrototypesBySurface = (surfaceArea: 'Brand' | 'Retailer' | 'Other') => 
  prototypes.filter(p => p.surfaceArea === surfaceArea);

export const getExperimentalBySurface = (surfaceArea: 'Brand' | 'Retailer' | 'Other') => 
  prototypes.filter(p => p.category === 'experimental' && p.surfaceArea === surfaceArea);

export const getTemplatesBySurface = (surfaceArea: 'Brand' | 'Retailer' | 'Other') => 
  prototypes.filter(p => p.category === 'template' && p.surfaceArea === surfaceArea);

