import React, { useState } from "react";
import { Link } from "react-router-dom";
import { components } from "../config/components";
import { 
  prototypes, 
  getExperimentalBySurface, 
  getTemplatesBySurface 
} from "../config/prototypes";

type TabType = 'experimental' | 'templates' | 'components';

export default function IndexPage() {
  const [activeTab, setActiveTab] = useState<TabType>('experimental');

  // Helper component for status badges
  const StatusBadge = ({ status }: { status?: string }) => {
    if (!status) return null;
    
    const colors = {
      wip: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      ready: 'bg-blue-100 text-blue-800 border-blue-200',
      active: 'bg-green-100 text-green-800 border-green-200',
    };
    
    const labels = {
      wip: 'WIP',
      ready: 'Ready for feedback',
      active: 'Active',
    };
    
    return (
      <span className={`text-xs px-2 py-0.5 rounded border ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  // Helper component for owner badges
  const OwnerBadge = ({ owner }: { owner: string }) => (
    <span className="text-xs bg-[#757575] text-white px-2 py-0.5 rounded">
      {owner}
    </span>
  );

  // Helper component for surface area tags
  const SurfaceTag = ({ surface }: { surface: string }) => (
    <span className="text-xs px-2 py-0.5 rounded bg-[#f5f5f5] text-[#757575] border border-[#dfe0e1]">
      {surface}
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
      className="block border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:shadow-lg transition-all duration-300 bg-white overflow-hidden group"
    >
      {/* Thumbnail preview */}
      <div className="aspect-video border-b border-[#dfe0e1] relative overflow-hidden">
        {prototype.thumbnail ? (
          <img 
            src={prototype.thumbnail} 
            alt={`${prototype.name} preview`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ background: getPlaceholderGradient(prototype.id) }}
          >
            <div className="text-center text-white">
              <div className="mb-2 opacity-30">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs font-semibold opacity-50">{prototype.name}</p>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      {/* Card content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-[#333333] flex-1">
            {prototype.name}
          </h3>
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <OwnerBadge owner={prototype.owner} />
            <StatusBadge status={prototype.status} />
          </div>
        </div>
        
        <p className="text-sm text-[#757575] mb-4 leading-relaxed" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {prototype.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SurfaceTag surface={prototype.surfaceArea} />
          </div>
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
      className="block border border-[#dfe0e1] rounded-lg hover:border-[#333333] hover:shadow-lg transition-all duration-300 bg-white overflow-hidden group"
    >
      {/* Thumbnail preview */}
      <div 
        className="aspect-video border-b border-[#dfe0e1] relative overflow-hidden"
        style={{ background: getComponentGradient(index) }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-2 opacity-30">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <p className="text-xs font-semibold opacity-50">{component.name}</p>
          </div>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      {/* Card content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-[#333333] mb-2">
          {component.name}
        </h3>
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
        <h3 className="text-xl font-semibold text-[#333333] mb-4 pb-2 border-[#dfe0e1]">
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prototypeList.map((prototype) => (
            <PrototypeCard key={prototype.id} prototype={prototype} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header with logo only - NOT sticky */}
      <header className="bg-white">
        <div className="mx-auto" style={{ maxWidth: "1440px", paddingLeft: "48px", paddingRight: "48px" }}>
          <div className="py-4">
            {/* Faire logo */}
            <a href="/" className="flex items-center">
              <img 
                alt="Faire Logo" 
                src="https://cdn.faire.com/static/logo.svg" 
                className="h-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "http://localhost:3845/assets/1e3ffc68be20eda669774f7388f9632f2f0bab67.svg";
                }}
              />
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1440px",
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
      >

        {/* Introduction Section */}
        <div className="mb-12 p-6 rounded-lg border border-dashed border-[#dfe0e1]">
          <h1 className="text-4xl font-bold text-[#333333] mb-2">
            Design Prototype Playground
          </h1>
          <p className="text-lg text-[#757575] mb-6 pb-6 border-b border-[#dfe0e1]">
            A playground for rapid exploration and ideation
          </p>
          
          <h2 className="font-semibold text-[#333333] mb-2">
            What is this?
          </h2>
          <p className="text-sm text-[#757575] mb-4">
            This playground is a space for designers and collaborators to rapidly prototype using similar-ish looking UI. It's not connected to production data or live experiments, it's a standalone environment for exploration and validation.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div>
                <h3 className="font-semibold text-[#333333] mb-2">✅ This Is:</h3>
                <ul className="space-y-1 text-[#757575]">
                  <li>• A local prototyping space</li>
                  <li>• For testing layouts & interactions</li>
                  <li>• Using familiar components</li>
                  <li>• Fast iteration without overhead</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#333333] mb-2">🚫 This Is Not:</h3>
                <ul className="space-y-1 text-[#757575]">
                  <li>• A source of truth for production</li>
                  <li>• Connected to live data</li>
                  <li>• A replacement for Storybook</li>
                  <li>• Production-ready code</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#333333] mb-2">📋 Fidelity:</h3>
                <ul className="space-y-1 text-[#757575]">
                  <li>• Visually close to production</li>
                  <li>• Behavioral intent, not logic</li>
                  <li>• Mock data is fine</li>
                  <li>• Focus on speed & clarity</li>
                </ul>
              </div>
            </div>
        </div>

        {/* Tab Navigation - Sticky */}
        <div className="sticky top-0 bg-white mb-8 z-40" style={{ borderBottom: '1px solid #dfe0e1' }}>
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('experimental')}
              className={`py-3 px-1 font-medium transition-colors relative ${
                activeTab === 'experimental'
                  ? 'text-[#333333]'
                  : 'text-[#757575] hover:text-[#333333]'
              }`}
            >
              Experimental
              {activeTab === 'experimental' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#333333]"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-3 px-1 font-medium transition-colors relative ${
                activeTab === 'templates'
                  ? 'text-[#333333]'
                  : 'text-[#757575] hover:text-[#333333]'
              }`}
            >
              Templates
              {activeTab === 'templates' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#333333]"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('components')}
              className={`py-3 px-1 font-medium transition-colors relative ${
                activeTab === 'components'
                  ? 'text-[#333333]'
                  : 'text-[#757575] hover:text-[#333333]'
              }`}
            >
              Components
              {activeTab === 'components' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#333333]"></div>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Experimental Tab */}
          {activeTab === 'experimental' && (
            <div>
              <div className="mb-6">
                <p className="text-sm text-[#757575] mb-8">
                  Experimental prototypes are explorations and new ideas not yet in production. 
                  These are works in progress that demonstrate potential future directions.
                </p>
              </div>
              
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
          {activeTab === 'templates' && (
            <div>
              <div className="mb-6">
                <p className="text-sm text-[#757575] mb-8">
                  Templates mirror current production experiences. Use these as starting points to fork 
                  and build new variations, or to reference how existing surfaces work.
                </p>
              </div>
              
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
          {activeTab === 'components' && (
            <div>
              <div className="mb-6">
                <p className="text-sm text-[#757575] mb-8">
                  Individual UI components that serve as building blocks for templates and prototypes. 
                  These showcase isolated component behavior and variants.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map((component, index) => (
                  <ComponentCard key={component.path} component={component} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
