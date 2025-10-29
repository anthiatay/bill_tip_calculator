# Bill 🍕 Tip Calculator

A modern, sleek calculator that helps calculate either the bill, tip, or total — even when one of the three values is missing. Perfect for real-world restaurant use!

## Features

- ✨ **Smart Auto-Calculation**: Enter any two values (Bill, Tip, or Total) and the third automatically calculates
- 🎨 **Italian Pizzeria Theme**: Styled like a restaurant receipt with a fun, professional design
- 🌓 **Light/Dark Mode**: Toggle between light and dark themes
- 📱 **Fully Responsive**: Works beautifully on both mobile and desktop
- 🔄 **Reset Button**: Clear all fields with one click
- 📤 **Share Functionality**: Share results via native share API or copy to clipboard
- ⚡ **PWA Ready**: Install as a Progressive Web App on mobile devices

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Enter any **two** of the three values (Bill Amount, Tip Amount, Total Amount)
2. The missing value will automatically calculate
3. Use the Reset button to clear all fields
4. Use the Share button to copy or share your results

## Deployment

### Deploy as Web App

You can deploy this to any static hosting service:
- **Vercel**: Connect your repo or run `vercel`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the `gh-pages` package
- **Firebase Hosting**: Use `firebase deploy`

### Mobile App (PWA)

The app is configured as a Progressive Web App (PWA). Users can:
1. Visit the app on their mobile device
2. Look for the "Add to Home Screen" prompt
3. Install it like a native app

For full PWA functionality, you'll need to add icon files:
- `public/pwa-192x192.png` (192x192 pixels)
- `public/pwa-512x512.png` (512x512 pixels)

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS custom properties for theming
- **PWA Plugin** - Progressive Web App support

## Project Structure

```
bill_tip_calculator/
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   │   ├── Calculator.jsx
│   │   ├── Calculator.css
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── App.jsx       # Main app component
│   ├── App.css
│   ├── main.jsx      # Entry point
│   └── index.css    # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## License

MIT
# bill_tip_calculator
