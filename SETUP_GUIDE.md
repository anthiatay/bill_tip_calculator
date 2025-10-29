# Setup Guide for Bill 🍕 Tip Calculator

This guide will walk you through setting up and running the Bill Tip Calculator application.

## Step 1: Install Dependencies

First, make sure you have Node.js installed (version 16 or higher recommended). Then install the project dependencies:

```bash
npm install
```

## Step 2: Run the Development Server

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is in use).

## Step 3: Test the Application

1. Open your browser to the development URL
2. Try entering values in any two fields:
   - Enter Bill: `100` and Tip: `15` → Total should auto-calculate to `115.00`
   - Enter Bill: `50` and Total: `60` → Tip should auto-calculate to `10.00`
   - Enter Tip: `5` and Total: `25` → Bill should auto-calculate to `20.00`
3. Test the dark mode toggle in the header
4. Test the Reset button
5. Test the Share button (may show clipboard copy on desktop)

## Step 4: Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Step 5: Deploy

### Option A: Deploy to Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repository to Vercel for automatic deployments.

### Option B: Deploy to Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

### Option C: Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json` scripts: `"deploy": "vite build && gh-pages -d dist"`
3. Run: `npm run deploy`

## Step 6: Add PWA Icons (Optional)

For full PWA functionality, add these icon files to the `public` folder:
- `pwa-192x192.png` (192x192 pixels)
- `pwa-512x512.png` (512x512 pixels)

You can create these using any image editor or online tool. The icons will appear when users install the app on their mobile devices.

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

### PWA Not Installing
- Make sure you're accessing via HTTPS (required for PWA)
- Check that the manifest.json is properly configured in `vite.config.js`
- Add the icon files mentioned in Step 6

## Next Steps

- Customize colors in `src/index.css` (CSS custom properties)
- Modify the restaurant name in `src/components/Calculator.jsx`
- Add more features like tip percentage calculations
- Enhance sharing functionality
