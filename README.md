# Retailer Template

A set of components, core screens and flows that can be used to spin up quick local prototypes. The UI mimics production and pulls from the Slate system through the Figma MCP, but is not pixel perfect.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Figma MCP server running at `http://localhost:3845` (for image assets)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The app will automatically open at [http://localhost:3000](http://localhost:3000)

   ⚠️ **Important:** You cannot open `index.html` directly in a browser. This is a React application that must be run through the development server.

## 📁 Project Structure

```
retailer-template/
├── src/
│   ├── components/
│   │   └── RetailerGlobalNavLoggedIn.tsx  # Main navigation component
│   ├── pages/
│   │   └── TemplatePage.tsx              # Blank template page
│   ├── App.tsx                            # Main app component
│   ├── App.css                            # App styles
│   ├── index.tsx                          # Entry point
│   └── index.css                           # Global styles with Tailwind
├── public/
│   └── index.html                          # HTML template
├── package.json                            # Dependencies and scripts
├── tsconfig.json                           # TypeScript configuration
├── tailwind.config.js                     # Tailwind CSS configuration
└── postcss.config.js                      # PostCSS configuration
```

## 🧩 Components

### RetailerGlobalNavLoggedIn
The main navigation component with support for:
- **Desktop** layout (default)
- **Tablet** layout
- **Mobile web** layout

**Props:**
- `device?: "Desktop" | "Tablet" | "Mobile web"` - Layout variant
- `languageSelector?: boolean` - Show/hide language selector

**Example:**
```tsx
<RetailerGlobalNavLoggedIn device="Desktop" languageSelector={false} />
```

## 🛠️ Available Scripts

- `npm start` - Start development server (runs on port 3000)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 📝 Notes

- **Image Assets:** Images are loaded from the Figma MCP server at `http://localhost:3845/assets/`. Make sure the Figma MCP server is running for images to display correctly.
- **Styling:** The component uses Tailwind CSS classes. Tailwind is configured and ready to use.
- **TypeScript:** The project uses TypeScript for type safety.

## 🔧 Troubleshooting

### Images not loading?
- Ensure the Figma MCP server is running at `http://localhost:3845`
- Check browser console for CORS or network errors

### Port 3000 already in use?
- The dev server will prompt you to use a different port
- Or stop the process using port 3000

### Build errors?
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

