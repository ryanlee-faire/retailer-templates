# Contributing to the Design Prototype Playground

Welcome to the Faire Design Prototype Playground! This guide will help you add new prototypes to the playground quickly and consistently.

## Overview

The Design Prototype Playground (DPP) is a lightweight prototyping environment where designers and collaborators can rapidly build and test product ideas using similar-ish looking UI. It's completely separate from production - no real data, no live experiments, just exploration.

**Vision:** [Read the full context](https://www.notion.so/faire/Design-Prototyping-Playground-Leveraging-Slate-Community-Components-AI-Tooling-2a72efb5c25a80ad93fbd33a5f82ff82)

## Quick Start: Adding a New Prototype

### Prerequisites

1. Node.js installed
2. Repo cloned locally
3. Dependencies installed (`npm install`)
4. Dev server running (`npm start`)

### Step-by-Step Guide

#### 1. Create Your Branch

```bash
# Option A: Branch from main (if index redesign is merged)
git checkout main
git pull
git checkout -b your-feature-name

# Option B: Branch from index-page-redesign (if you want the new gallery)
git checkout index-page-redesign
git pull
git checkout -b your-feature-name
```

#### 2. Create the Prototype Page

**File location:** `src/pages/[YourFeature]Page.tsx`

**Example structure:**

```tsx
import React from "react";
import RetailerLayout from "../components/RetailerLayout";
// or for Brand surface: no layout, build custom header

export default function YourFeaturePage() {
  // Your component logic here
  
  return (
    <RetailerLayout languageSelector={false} cartCount={0}>
      <div className="mx-auto" style={{ maxWidth: "1440px", padding: "48px" }}>
        <h1 className="text-4xl font-bold text-[#333333] mb-6">
          Your Feature Name
        </h1>
        
        {/* Your prototype content here */}
        
      </div>
    </RetailerLayout>
  );
}
```

**Tips:**
- Use existing components from `src/components/` when possible
- Keep mock data inline or in a separate file in `src/data/`
- Follow the existing color palette and spacing
- Focus on demonstrating the core interaction

#### 3. Add Route to App.tsx

Open `src/App.tsx` and add your route:

```tsx
import YourFeaturePage from "./pages/YourFeaturePage";

// In the Routes section:
<Route path="/your-feature" element={<RouteWrapper><YourFeaturePage /></RouteWrapper>} />
```

#### 4. Register in Prototypes Config

Open `src/config/prototypes.ts` and add your metadata:

```tsx
{
  id: 'your-feature-id',
  name: 'Your Feature Name',
  path: '/your-feature',
  description: 'Brief description of what this prototype demonstrates. 2-3 sentences explaining the purpose and key interactions.',
  owner: 'YourName',
  lastUpdated: '2024-11-24', // Today's date
  surfaceArea: 'Brand', // or 'Retailer' or 'Other'
  category: 'experimental', // or 'template'
  status: 'wip', // or 'ready' or 'active'
  thumbnail: undefined, // Optional: path to screenshot
}
```

#### 5. Test Your Prototype

1. **Direct access:** Navigate to `http://localhost:3000/your-feature`
2. **Check gallery:** Visit `http://localhost:3000/experimental` (or `/templates`)
3. **Verify card shows up** with correct metadata
4. **Test interactions** to ensure everything works
5. **Check no errors** in browser console

#### 6. Commit and Push

```bash
# Stage your changes
git add src/pages/YourFeaturePage.tsx
git add src/App.tsx
git add src/config/prototypes.ts

# Commit
git commit -m "Add [Your Feature Name] prototype

- Created prototype page for [feature]
- Demonstrates [key interactions]
- Added to [experimental/templates] section"

# Push
git push -u origin your-feature-name
```

#### 7. Create Pull Request

1. Go to GitHub: https://github.com/ryanlee-faire/faire-proto-playground
2. Click "Compare & pull request"
3. Fill out description
4. Tag reviewers (Gabe, etc.)
5. Include link to PRD/Notion doc for context

## Design System Guidelines

### Typography

- **Headings:** Use Nantes serif for large display text, Inter for UI headings
- **Body:** Inter, text-sm (14px) or text-base (16px)
- **Colors:** #333333 (primary), #757575 (secondary)

### Layout

- **Max width:** 1440px for content containers
- **Padding:** 48px on sides (px-12 in Tailwind)
- **Spacing:** 48px between major sections (mb-12), 32px for subsections (mb-8)

### Components

- **Cards:** `bg-white rounded-3xl shadow-sm`
- **Buttons:** `rounded-lg px-6 py-2.5`
- **Inputs:** `border border-[#dfe0e1] rounded`
- **Use hover states:** `hover:shadow-xl transition-shadow duration-300`

### Example Color Usage

```tsx
// Text
className="text-[#333333]"           // Primary text
className="text-[#757575]"           // Secondary text

// Backgrounds
className="bg-white"                 // Cards, modals
className="bg-[#f5f5f5]"            // Page background

// Borders
className="border-[#dfe0e1]"        // Default border
```

## Surface Areas

### Brand Surface
Prototypes related to brand/seller experiences:
- Brand portal features
- Seller tools
- Brand onboarding
- Catalog management

**Examples:** BulkEditorPage, ProductsPage

### Retailer Surface
Prototypes related to buyer/retailer experiences:
- Product discovery
- Shopping flows
- Checkout
- Search and browsing

**Examples:** ProductDetailPage, CheckoutPage, Compass prototypes

## Categories

### Experimental
New ideas and explorations NOT yet in production. Works in progress that demonstrate potential future directions.

### Templates
Production mirrors you can use as starting points. These reflect what currently exists on Faire.com.

## Best Practices

### DO:
- ✅ Read existing prototypes for patterns
- ✅ Use mock data liberally
- ✅ Keep prototypes self-contained
- ✅ Focus on core interactions
- ✅ Make it visually close to production
- ✅ Include helpful comments
- ✅ Test thoroughly before committing

### DON'T:
- ❌ Connect to real APIs or databases
- ❌ Modify other prototypes
- ❌ Overcomplicate - keep it simple
- ❌ Worry about edge cases
- ❌ Build production-ready code
- ❌ Create new design patterns (use existing)

## Working with Cursor Agents

### When Starting a New Prototype

A new agent should:

1. **Ask for context:**
   - "Do you have a PRD or Notion doc?"
   - "What surface area is this for?"
   - "What are the key flows to demonstrate?"

2. **Read existing examples** relevant to the surface area

3. **Propose a simple starting point** before building everything

4. **Build iteratively** - Get one screen working, then add more

5. **Keep user in the loop** - Show progress, ask for feedback

### Good First Message to Agent

```
I want to build a new prototype for [Feature Name]. 

Surface: [Brand/Retailer]
PRD: [Notion link if available]

Core idea: [Brief explanation of what you're prototyping]

Can you help me set this up?
```

## Troubleshooting

### Prototype doesn't show in gallery
- Check `src/config/prototypes.ts` entry is correct
- Verify category is 'experimental' or 'template'
- Ensure surfaceArea matches ('Brand' or 'Retailer')

### Route not working
- Check `src/App.tsx` has the route
- Verify path matches between App.tsx and prototypes.ts
- Ensure component import is correct

### Styling looks off
- Verify you're using the color constants (#333333, #757575, etc.)
- Check max-width is set on containers
- Ensure Tailwind classes are correct

## Sharing & Deployment

### Local Sharing
Run `npm start` and share `localhost:3000/your-prototype` (requires running locally)

### Deployed Version
The playground deploys to Vercel: https://retailer-template.vercel.app

After merging to main, your prototype will be live and shareable!

### Creating PRs

1. Push your branch to GitHub
2. Create PR from your branch → main
3. Tag reviewers (Gabe, Ryan, etc.)
4. Include PRD/Notion link in description
5. Add preview URLs (local or deployed)

## Resources

- **Notion Vision Doc:** [Design Prototyping Playground](https://www.notion.so/faire/Design-Prototyping-Playground-Leveraging-Slate-Community-Components-AI-Tooling-2a72efb5c25a80ad93fbd33a5f82ff82)
- **Example Prototypes:** See `src/pages/` directory
- **Tailwind Docs:** https://tailwindcss.com/docs
- **React Router Docs:** https://reactrouter.com

## Questions?

If you're stuck or unsure:
1. Look at existing prototypes for patterns
2. Ask in chat for help
3. Reference this guide
4. Check the Notion doc for vision/context

---

**Remember:** The goal is rapid exploration and validation. Don't overthink it - build something that demonstrates your idea clearly and iterate from there. Speed and clarity over perfection! 🚀

