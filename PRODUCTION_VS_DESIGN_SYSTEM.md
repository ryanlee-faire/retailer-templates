# Production vs Design System Component Comparison

## Key Differences Between Faire.com Production Code and Design System Component

### 1. **HTML Structure**
**Production:**
- Uses semantic `<header>` element
- Uses `<a>` tags for logo and cart (actual links)
- Uses `<button>` elements for interactive elements
- Uses `<input>` for search (functional)

**Design System:**
- Uses `<div>` elements (less semantic)
- Logo is a component, not a link
- Search shows placeholder text, not a functional input
- Uses divs styled as buttons

### 2. **Styling System**
**Production:**
- Uses styled-components (sc-* classes)
- Custom design system tokens (f_* classes)
- CSS custom properties for responsive values:
  - `--f_spacer_size_mobile`
  - `--f_flex_direction_mobile`
  - `--f_t_color`
- Design tokens like `bg-fs-surface-primary`, `border-fs-border-muted`

**Design System:**
- Uses Tailwind CSS utility classes
- Hard-coded values in classes
- Responsive via Tailwind breakpoints (md:, lg:)

### 3. **Logo Implementation**
**Production:**
```html
<a href="/">
  <img alt="Faire Logo" src="https://cdn.faire.com/static/logo.svg">
</a>
```

**Design System:**
- Custom `Faire` component
- Image from localhost MCP server
- Not a clickable link

### 4. **Search Bar**
**Production:**
- Functional `<input>` element
- Placeholder: "Search products or brands"
- Has autocomplete attributes
- Includes search icon SVG

**Design System:**
- Displays placeholder text only
- Not a functional input field
- Search icon is an image

### 5. **Cart Component**
**Production:**
- Shows cart count badge (e.g., "13")
- Clickable link to `/cart`
- Has cart icon SVG
- Badge styling with count

**Design System:**
- Just shows icon
- No cart count
- Not a link

### 6. **Bottom Navigation Links**
**Production Links:**
1. Brand updates
2. Bestsellers
3. New products
4. New brands
5. Gifts
6. Home decor
7. Food & drink
8. Holiday Shop
9. Sale (with special styling)

**Design System Links:**
1. Bestsellers
2. New
3. Home decor
4. Jewelry
5. Father's Day
6. Sale

**Differences:**
- Production has 9 links vs 6 in design system
- Different link text
- Production links are actual `<a>` tags with hrefs
- Design system links are styled divs

### 7. **Icons**
**Production:**
- Inline SVG icons
- Accessible with `aria-labelledby` and `<title>` elements
- Uses CSS custom properties for colors (`--f-svg-color`)

**Design System:**
- Images from MCP server (localhost:3845)
- Less accessible (no aria labels)

### 8. **Accessibility**
**Production:**
- Proper ARIA attributes (`aria-label`, `aria-haspopup`, `aria-disabled`)
- Semantic HTML (`<header>`, `<button>`, `<a>`)
- Screen reader support

**Design System:**
- Limited accessibility features
- Uses divs instead of semantic elements

### 9. **Responsive Behavior**
**Production:**
- Uses CSS custom properties that change per breakpoint
- Spacer components with responsive sizes
- More granular control

**Design System:**
- Uses Tailwind responsive classes
- JavaScript-based viewport detection
- Three distinct layouts (Mobile/Tablet/Desktop)

### 10. **Z-index and Positioning**
**Production:**
- `z-301` on header (very high z-index)
- `print:hidden` class

**Design System:**
- No z-index specified
- No print styles

### 11. **Max Width**
**Production:**
- `max-width: 1920px` on container

**Design System:**
- `max-w-[1760px]` on container

### 12. **Spacing System**
**Production:**
- Uses spacer components (`f_spacer_base`)
- Dynamic spacing via CSS variables
- Different spacing per breakpoint

**Design System:**
- Fixed spacing values
- Tailwind gap utilities

## Recommendations

To align the design system component with production:

1. **Make it functional:**
   - Convert search to actual `<input>`
   - Make logo and cart clickable links
   - Add cart count badge

2. **Improve semantics:**
   - Use `<header>` instead of `<div>`
   - Use `<button>` for interactive elements
   - Use `<a>` for links

3. **Update links:**
   - Match production link text
   - Add all 9 links
   - Make them actual links with hrefs

4. **Improve accessibility:**
   - Add ARIA labels
   - Use semantic HTML
   - Add proper focus states

5. **Match styling:**
   - Consider using design tokens instead of hard-coded values
   - Match exact spacing and sizing

6. **Icons:**
   - Replace images with inline SVGs
   - Add accessibility attributes

