# Technical Guide: How It All Works

This document explains the architecture and implementation details of the Bill Tip Calculator.

## 1. React Project Setup

### Technology Stack
- **Vite**: Modern build tool that's faster than Create React App
- **React 18**: Latest React with hooks and modern patterns
- **CSS3**: Custom properties for theming, no CSS framework needed
- **PWA Plugin**: Adds Progressive Web App capabilities

### Project Structure
```
bill_tip_calculator/
├── public/              # Static assets (icons, etc.)
├── src/
│   ├── components/      # React components
│   │   ├── Calculator.jsx/.css
│   │   └── Header.jsx/.css
│   ├── App.jsx/.css     # Main app wrapper
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

### Why Vite?
- **Faster Development**: Instant server start, hot module replacement
- **Optimized Builds**: Production builds are smaller and faster
- **Modern**: Uses native ES modules, no bundling in dev mode

## 2. Design and Styling

### Italian Pizzeria Theme

**Color Palette** (defined in `src/index.css`):
- **Primary Red** (`#c41e3a`): Italian flag red, used for accents
- **Accent Green** (`#2d5016`): Dark green for dark mode accents
- **Receipt Background**: Off-white (`#fffef7`) to mimic paper receipts
- **Borders**: Soft grays for that receipt border look

**Design Elements**:
1. **Receipt Container**: Card with dashed borders, subtle shadow
2. **Receipt Header**: Dashed divider line, centered restaurant name
3. **Input Fields**: Large, monospace font (like receipt printers)
4. **Currency Symbol**: Positioned inside inputs, prominent
5. **Divider Lines**: Dashed/dotted lines between sections
6. **Total Section**: Emphasized with thicker border, larger font

### Responsive Design

**Breakpoints**:
- Desktop: Default styles (up to 600px max-width container)
- Mobile (`@media (max-width: 480px)`):
  - Smaller fonts
  - Reduced padding
  - Full-width buttons
  - Adjusted input sizing

**CSS Custom Properties (Variables)**:
- All colors stored as CSS variables
- Easy theme switching (light/dark mode)
- Maintainable and scalable

## 3. Calculation Logic

### How Auto-Calculation Works

Located in `src/components/Calculator.jsx`, the `useEffect` hook watches for changes:

```javascript
// When exactly 2 fields have values:
if (filledCount === 2) {
  if (!hasBill && hasTip && hasTotal) {
    // Calculate: bill = total - tip
  } else if (hasBill && !hasTip && hasTotal) {
    // Calculate: tip = total - bill
  } else if (hasBill && hasTip && !hasTotal) {
    // Calculate: total = bill + tip
  }
}
```

**Logic Flow**:
1. User types in a field → `handleChange` updates state
2. `useEffect` detects state change
3. Checks which fields have valid values (> 0)
4. If exactly 2 fields filled → calculates the third
5. Updates the empty field automatically

**Edge Cases Handled**:
- Empty strings treated as 0
- Invalid calculations (negative results) prevented
- Decimal precision maintained (2 decimal places)
- Only calculates when exactly 2 fields filled (prevents loops)

### Input Validation

Each input handler (`handleBillChange`, `handleTipChange`, `handleTotalChange`):
- Accepts only numbers and one decimal point
- Prevents negative values
- Validates decimal format
- Allows empty string (for clearing)

**Regex Pattern**: `/^\d*\.?\d*$/`
- `\d*` - Zero or more digits
- `\.?` - Optional decimal point
- `\d*` - Zero or more digits after decimal

## 4. Features Implementation

### Light/Dark Mode

**Implementation**:
1. State stored in `App.jsx` using `useState`
2. Persisted to `localStorage` for user preference
3. CSS class toggled on `<body>` tag
4. CSS variables change based on mode

**Theme Toggle**:
- Located in header
- Animated button with hover effects
- Stores preference between sessions

### Reset Functionality

Simple state reset:
```javascript
const handleReset = () => {
  setBill('')
  setTip('')
  setTotal('')
  setLastChanged(null)
  setFocusedField(null)
}
```

### Share Functionality

**Progressive Enhancement**:
1. Checks if `navigator.share` API available (mobile)
2. Uses native share if available
3. Falls back to clipboard copy on desktop
4. Shows alert feedback when copied

## 5. Deployment Options

### Web App Deployment

**Vercel** (Easiest):
```bash
npm i -g vercel
vercel
```
- Free hosting
- Automatic HTTPS
- Global CDN
- Git integration for auto-deploy

**Netlify**:
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```
- Drag-and-drop option available
- Custom domain support
- Form handling available

**GitHub Pages**:
```bash
npm install --save-dev gh-pages
# Add to package.json: "deploy": "vite build && gh-pages -d dist"
npm run deploy
```
- Free for public repos
- Uses GitHub Actions or gh-pages

### Mobile App (PWA)

**How PWA Works**:
1. Service worker caches assets (via vite-plugin-pwa)
2. Manifest.json defines app metadata
3. Icons for home screen
4. Works offline after first visit

**Installation Process**:
1. User visits site on mobile
2. Browser shows "Add to Home Screen" prompt
3. User installs
4. App appears like native app
5. Can work offline (cached)

**Requirements**:
- HTTPS (required for service workers)
- Valid manifest.json
- Icon files (192x192 and 512x512)
- Service worker registration

### React Native (Alternative)

If you want a truly native mobile app:

1. **React Native Setup**:
```bash
npx react-native init BillTipCalculator
```

2. **Convert Components**:
- Replace HTML elements with React Native components
- `<div>` → `<View>`
- `<input>` → `<TextInput>`
- CSS → StyleSheet API or styled-components

3. **Platform-Specific Code**:
- iOS: Xcode required
- Android: Android Studio required

**Trade-offs**:
- **PWA**: Easier, one codebase, web-based
- **React Native**: Native performance, separate builds per platform

For this use case, **PWA is recommended** because:
- One codebase for all platforms
- No app store approval needed
- Easy updates (just deploy)
- Works on any device with a browser

## 6. Performance Optimizations

**Already Implemented**:
- Vite's code splitting
- CSS minification in production
- Tree-shaking of unused code
- Lazy loading (if you add routes later)

**Future Optimizations** (if needed):
- Code splitting by route
- Image optimization
- Service worker caching strategies
- React.memo for expensive components

## 7. Accessibility

**Current Features**:
- Semantic HTML (`<label>` for inputs)
- ARIA labels on buttons
- Keyboard navigation support
- Proper input types (`inputMode="decimal"`)

**Could Add**:
- Screen reader announcements for calculations
- Focus management
- Error messages (currently uses validation)

## Questions & Answers

**Q: Why not use Create React App?**
A: Vite is faster, more modern, and has better defaults. CRA is in maintenance mode.

**Q: Why no CSS framework?**
A: The design is simple enough that vanilla CSS is cleaner and lighter. Custom properties make theming easy.

**Q: Could this use TypeScript?**
A: Yes! You'd just rename `.jsx` to `.tsx` and add type definitions. Vite supports TypeScript out of the box.

**Q: How to add percentage-based tips?**
A: Add a toggle/select for "$ amount" vs "% amount", then calculate tip differently based on mode.

**Q: Can I add more fields (like split between people)?**
A: Absolutely! Just add new state variables and update the calculation logic in `useEffect`.
