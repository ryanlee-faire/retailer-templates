# Setup Instructions

## First Time Setup

1. **Navigate to the project directory:**
   ```bash
   cd /Users/ryan.lee/retailer-template
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages including React, TypeScript, Tailwind CSS, etc.

3. **Start the development server:**
   ```bash
   npm start
   ```
   This will:
   - Compile the React/TypeScript code
   - Start a development server (usually on port 3000)
   - Automatically open your browser to http://localhost:3000

## Important Notes

⚠️ **You cannot open `index.html` directly in a browser!**

This is a React application that needs to be:
- Compiled from TypeScript to JavaScript
- Bundled with all dependencies
- Served through a development server

The `npm start` command does all of this for you.

## What You'll See

Once the dev server is running, you should see:
- The Retailer Global Nav Logged In component at the top
- A blank template area below with placeholder text

## Making Changes

- Edit files in the `src/` directory
- Changes will automatically reload in the browser (hot reload)
- The dev server watches for file changes

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

