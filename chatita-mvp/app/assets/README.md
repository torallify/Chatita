# App Assets

## Required Assets for Production

For the hackathon MVP, placeholder assets are fine. For production, you'll need:

### Icon (Required)
- **icon.png** - 1024x1024px
- Used for: App icon on home screen
- Source: Use the logo from `/downloads/logo-guided-by-light.svg`

### Splash Screen (Required)
- **splash.png** - 1242x2436px
- Used for: Loading screen when app starts
- Background: #F2F6FA (off-white blue)
- Center: Chatita logo

### Adaptive Icon (Android)
- **adaptive-icon.png** - 1024x1024px
- Used for: Android adaptive icons
- Should have transparent background

### Favicon (Web)
- **favicon.png** - 48x48px
- Used for: Web version (optional)

## Creating Assets from SVG Logo

If you have the logo SVG file:

### Option 1: Online Converter
1. Go to https://cloudconvert.com/svg-to-png
2. Upload logo-guided-by-light.svg
3. Set output size to 1024x1024
4. Download and save as icon.png

### Option 2: Command Line (macOS/Linux)
```bash
# Install librsvg
# macOS: brew install librsvg
# Linux: sudo apt-get install librsvg2-bin

# Convert to PNG
rsvg-convert -w 1024 -h 1024 logo-guided-by-light.svg -o icon.png

# Create splash screen (larger)
rsvg-convert -w 1242 -h 2436 logo-guided-by-light.svg -o splash.png
```

## Temporary Placeholders

For the hackathon, you can use emoji placeholders:

Create these files with solid colors:
- icon.png: 1024x1024 with the 💙 emoji on #F2F6FA background
- splash.png: 1242x2436 with the 💙 emoji centered on #F2F6FA background
- adaptive-icon.png: Same as icon.png
- favicon.png: 48x48 version of icon

Or just use Expo's default icons for now - the app will work fine!

## Current Status

The app will run without custom assets. Expo will use default placeholders.

If you want to add the logo before the hackathon:
1. Convert the SVG to PNG (1024x1024)
2. Save as `icon.png` in this directory
3. Copy to `splash.png`
4. Copy to `adaptive-icon.png`
5. Restart the Expo server

That's it! The app will pick up the new icons automatically.
