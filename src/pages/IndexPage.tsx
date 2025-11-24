import React from "react";
import { Link, useLocation } from "react-router-dom";
import { components } from "../config/components";
import { 
  prototypes, 
  getExperimentalBySurface, 
  getTemplatesBySurface 
} from "../config/prototypes";

export default function IndexPage() {
  const location = useLocation();
  
  // Determine current section from URL path
  const currentPath = location.pathname;
  const isExperimental = currentPath === '/experimental';
  const isTemplates = currentPath === '/templates';
  const isComponents = currentPath === '/components';
  const isDefault = currentPath === '/';
  
  // Get build date from environment variable (set during build)
  const lastUpdated = process.env.REACT_APP_BUILD_DATE || new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  

  // Helper component for owner badges
  const OwnerBadge = ({ owner }: { owner: string }) => (
    <span className="text-xs bg-[#757575] text-white px-2 py-0.5 rounded">
      {owner}
    </span>
  );

  // Helper function to get placeholder gradient for prototype
  const getPlaceholderGradient = (id: string) => {
    const gradients: Record<string, string> = {
      // Experimental - Brand
      'bulk-editor': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      
      // Experimental - Retailer
      'compass-prototype': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'compass-full-surface': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'pdp-with-drawer': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'pdp-with-drawer-left': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'pdp-v2': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      
      // Templates - Brand
      'products-page': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      
      // Templates - Retailer
      'basic-logged-in': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'new-page': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'brand-page': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      'search-results': 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
      'pdp': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      'checkout': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      'order-confirmation': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      'category-page': 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    };
    
    return gradients[id] || 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)';
  };

  // Prototype card component
  const PrototypeCard = ({ prototype }: { prototype: typeof prototypes[0] }) => (
    <Link
      to={prototype.path}
      className="block bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Thumbnail preview */}
      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl mb-2">
        {prototype.thumbnail ? (
          <img 
            src={prototype.thumbnail} 
            alt={`${prototype.name} preview`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{ background: getPlaceholderGradient(prototype.id) }}
          ></div>
        )}
      </div>
      
      {/* Card content */}
      <div className="px-2 pb-2">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#333333] flex-1">
            {prototype.name}
          </h3>
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <OwnerBadge owner={prototype.owner} />
          </div>
        </div>
        
        <p className="text-sm text-[#757575] mb-3 leading-relaxed" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {prototype.description}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#757575]">
            Updated {prototype.lastUpdated}
          </span>
        </div>
      </div>
    </Link>
  );

  // Helper function to get placeholder for component
  const getComponentGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
      'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    ];
    return gradients[index % gradients.length];
  };

  // Component card (simpler than prototype card)
  const ComponentCard = ({ component, index }: { component: typeof components[0]; index: number }) => (
    <Link
      to={component.path}
      className="block bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Thumbnail preview */}
      <div 
        className="aspect-[4/3] relative overflow-hidden rounded-2xl mb-2"
        style={{ background: getComponentGradient(index) }}
      >
      </div>
      
      {/* Card content */}
      <div className="px-2 pb-2">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#333333] flex-1">
            {component.name}
          </h3>
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <OwnerBadge owner="Ryan" />
          </div>
        </div>
        {component.description && (
          <p className="text-sm text-[#757575] leading-relaxed" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {component.description}
          </p>
        )}
      </div>
    </Link>
  );

  // Surface section component
  const SurfaceSection = ({ 
    title, 
    prototypes: prototypeList 
  }: { 
    title: string; 
    prototypes: typeof prototypes 
  }) => {
    if (prototypeList.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#333333] mb-6">
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prototypeList.map((prototype) => (
            <PrototypeCard key={prototype.id} prototype={prototype} />
          ))}
        </div>
      </div>
    );
  };

  // Tab navigation component
  const TabNav = () => (
    <div className="flex gap-6 pr-4">
      <Link
        to="/experimental"
        className={`py-3 px-1 text-sm font-medium transition-colors relative ${
          isExperimental
            ? 'text-[#333333]'
            : 'text-[#757575] hover:text-[#333333]'
        }`}
      >
        Experimental
        {isExperimental && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#333333]"></div>
        )}
      </Link>
      
      <Link
        to="/templates"
        className={`py-3 px-1 text-sm font-medium transition-colors relative ${
          isTemplates
            ? 'text-[#333333]'
            : 'text-[#757575] hover:text-[#333333]'
        }`}
      >
        Templates
        {isTemplates && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#333333]"></div>
        )}
      </Link>
      
      <Link
        to="/components"
        className={`py-3 px-1 text-sm font-medium transition-colors relative ${
          isComponents
            ? 'text-[#333333]'
            : 'text-[#757575] hover:text-[#333333]'
        }`}
      >
        Components
        {isComponents && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#333333]"></div>
        )}
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header - Sticky with tabs in top-right */}
      <header className="sticky top-0 bg-[#f5f5f5] z-50" style={{ borderBottom: '1px solid #dfe0e1' }}>
        <div className="mx-auto px-12" style={{ maxWidth: "1440px", height: '64px' }}>
          <div className="flex items-center justify-between h-full">
            {/* Left: Faire logo */}
            <Link to="/" className="flex items-center">
              <img 
                alt="Faire Logo" 
                src="https://cdn.faire.com/static/logo.svg" 
                className="h-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "http://localhost:3845/assets/1e3ffc68be20eda669774f7388f9632f2f0bab67.svg";
                }}
              />
            </Link>
            
            {/* Right: Navigation tabs (always visible) */}
            <TabNav />
          </div>
        </div>
      </header>

      {/* Hero Section - Only on default page */}
      {isDefault && (
        <div className="relative py-32">
          {/* Centered Hero Text */}
          <div className="flex flex-col items-center justify-center px-12">
            <h1 className="text-6xl md:text-7xl text-[#333333] text-center mb-8 leading-tight" style={{ fontFamily: 'Nantes, serif', maxWidth: '999px' }}>
              A playground for rapid exploration and ideation
            </h1>
            <p className="text-sm text-[#757575] text-center tracking-wide">
              Faire Design Prototype Playground · <a 
                href="https://github.com/ryanlee-faire/faire-proto-playground" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-[#333333] transition-colors"
              >
                Last updated {lastUpdated}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* What is this card - only on default landing page */}
      {isDefault && (
        <div className="relative px-12 py-32">
        <div 
          className="mx-auto bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-8"
          style={{ maxWidth: '800px' }}
        >
          <h2 className="text-2xl font-semibold text-[#333333] mb-3">
            What is this?
          </h2>
          <p className="text-sm text-[#757575] mb-4">
            This playground is a space for designers and collaborators to rapidly prototype using similar-ish looking UI. It's not connected to production data or live experiments, it's a standalone environment for exploration and validation.
          </p>
          
          <a 
            href="https://www.notion.so/faire/Design-Prototyping-Playground-Leveraging-Slate-Community-Components-AI-Tooling-2a72efb5c25a80ad93fbd33a5f82ff82?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#333333] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#000000] transition-colors"
          >
            Learn more
          </a>
          
          <div className="border-t border-[#dfe0e1] my-6"></div>
          
          <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#333333] mb-2">✅ This Is:</h3>
                <ul className="space-y-1 text-sm text-[#757575]">
                  <li>• A local prototyping space</li>
                  <li>• For testing layouts & interactions</li>
                  <li>• Using familiar components</li>
                  <li>• Fast iteration without overhead</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-[#333333] mb-2">🚫 This Is Not:</h3>
                <ul className="space-y-1 text-sm text-[#757575]">
                  <li>• A source of truth for production</li>
                  <li>• Connected to live data</li>
                  <li>• A replacement for Storybook</li>
                  <li>• Production-ready code</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-[#333333] mb-2">📋 Fidelity:</h3>
                <ul className="space-y-1 text-sm text-[#757575]">
                  <li>• Visually close to production</li>
                  <li>• Behavioral intent, not logic</li>
                  <li>• Mock data is fine</li>
                  <li>• Focus on speed & clarity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Conditional based on route */}
      {(isExperimental || isTemplates || isComponents) && (
        <div className="px-12 py-12">
          <div className="mx-auto" style={{ maxWidth: "1440px" }}>
          
          {/* Experimental Tab */}
          {isExperimental && (
            <div>
              <h1 className="text-5xl md:text-6xl text-[#333333] mb-4" style={{ fontFamily: 'Nantes, serif' }}>
                Experimental
              </h1>
              <p className="text-sm text-[#757575] mb-12">
                Experimental prototypes are explorations and new ideas not yet in production. 
                These are works in progress that demonstrate potential future directions.
              </p>
              
              <SurfaceSection 
                title="Brand Surface Area" 
                prototypes={getExperimentalBySurface('Brand')} 
              />
              
              <SurfaceSection 
                title="Retailer Surface Area" 
                prototypes={getExperimentalBySurface('Retailer')} 
              />
              
              {getExperimentalBySurface('Brand').length === 0 && 
               getExperimentalBySurface('Retailer').length === 0 && (
                <div className="text-center py-12 text-[#757575]">
                  No experimental prototypes yet. Start building!
                </div>
              )}
            </div>
          )}

          {/* Templates Tab */}
          {isTemplates && (
            <div>
              <h1 className="text-5xl md:text-6xl text-[#333333] mb-4" style={{ fontFamily: 'Nantes, serif' }}>
                Templates
              </h1>
              <p className="text-sm text-[#757575] mb-12">
                Templates mirror current production experiences. Use these as starting points to fork 
                and build new variations, or to reference how existing surfaces work.
              </p>
              
              <SurfaceSection 
                title="Brand Surface Area" 
                prototypes={getTemplatesBySurface('Brand')} 
              />
              
              <SurfaceSection 
                title="Retailer Surface Area" 
                prototypes={getTemplatesBySurface('Retailer')} 
              />
            </div>
          )}

          {/* Components Tab */}
          {isComponents && (
            <div>
              <h1 className="text-5xl md:text-6xl text-[#333333] mb-4" style={{ fontFamily: 'Nantes, serif' }}>
                Components
              </h1>
              <p className="text-sm text-[#757575] mb-12">
                Individual UI components that serve as building blocks for templates and prototypes. 
                These showcase isolated component behavior and variants.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {components.map((component, index) => (
                  <ComponentCard key={component.path} component={component} index={index} />
                ))}
              </div>
            </div>
          )}
          
          </div>
        </div>
      )}
    </div>
  );
}
