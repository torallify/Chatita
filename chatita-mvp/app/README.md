# Chatita Mobile App

React Native + Expo frontend for the Chatita diabetes companion app.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# Then press:
# - 'i' for iOS Simulator
# - 'a' for Android Emulator
# - Scan QR code with Expo Go app on your phone
```

## 📱 Features

- **Home Screen**: Glucose tracking, mood selector, daily tips
- **Meals Screen**: Menu photo analysis with Claude Vision API
- **Insights Screen**: Weekly insights from Claude Text API
- **Settings Screen**: Language toggle (English/Spanish)

## 🏗️ Architecture

```
src/
├── components/      # Reusable UI components
├── context/         # App state management
├── i18n/           # Bilingual translations
├── navigation/     # React Navigation setup
├── screens/        # Main app screens
├── services/       # API communication layer
├── theme/          # Design system (colors, typography)
└── types/          # TypeScript type definitions
```

## 🎨 Design System

### Colors
- Primary: #4A90E2 (Sky blue)
- Secondary: #6ED1C7 (Turquoise)
- Accent: #FFB6A6 (Warm coral)
- Background: #F2F6FA (Off-white blue)

### Components
All components follow the design system defined in `src/theme/`:
- Consistent spacing and padding
- Rounded corners (12-16px border radius)
- Soft shadows for depth
- Color-coded status indicators

## 🌐 API Configuration

The app connects to the backend server. Update the base URL in `src/services/api.ts` based on your platform:

```typescript
// iOS Simulator
const API_BASE_URL = 'http://localhost:3000';

// Android Emulator
const API_BASE_URL = 'http://10.0.2.2:3000';

// Physical Device (replace with your computer's IP)
const API_BASE_URL = 'http://192.168.1.XXX:3000';
```

## 📦 Dependencies

Key packages:
- `expo` - Development framework
- `react-navigation` - Navigation
- `expo-image-picker` - Camera and photo library access
- `@react-native-async-storage/async-storage` - Local data persistence
- `axios` - HTTP client

## 🔧 Development

### Run with Cache Clear
```bash
npx expo start -c
```

### Check for Issues
```bash
npm run lint  # If you add linting
```

### Build for Production
```bash
# iOS
npx expo build:ios

# Android
npx expo build:android
```

## 📱 Platform-Specific Notes

### iOS
- Requires macOS with Xcode
- Uses localhost for API connection
- Camera/photo permissions handled automatically

### Android
- Works on any OS with Android Studio
- Uses 10.0.2.2 for API connection (emulator)
- May need to enable camera permissions manually

### Physical Device
- Install "Expo Go" app
- Must be on same WiFi as backend server
- Update API URL to computer's local IP

## 🧪 Testing

Test all features before demo:
1. Glucose input and display
2. Mood tracking
3. Menu photo upload and analysis
4. Insights generation
5. Language toggle
6. Data persistence

See `../TESTING_CHECKLIST.md` for complete testing guide.

## 🐛 Troubleshooting

**"Cannot connect to Metro bundler"**
```bash
npx expo start -c
```

**"Network request failed"**
- Check backend is running
- Verify API URL matches your platform
- Check firewall settings

**"Module not found"**
```bash
rm -rf node_modules
npm install
```

**"Expo Go can't connect"**
- Ensure phone and computer on same WiFi
- Update API URL to computer's local IP
- Restart Expo server

## 📄 License

MIT License

## 💙 About

**Chatita** is named after my grandmother, whose nickname is "Chata."

I was diagnosed with Type II diabetes in 2019. I have watched my abuelita struggle with managing diabetes every day - navigating medication, glucose monitoring, and difficult food decisions without clear support. Seeing the emotional and physical toll on her, and experiencing it myself, drove me to create this app.

Managing diabetes affects every moment of your life - what you eat, how you move, your mood, your energy, and your confidence. Chatita is designed to help people feel less alone, more informed, and more capable of caring for themselves.

Built with love for the Anthropic Hackathon, in honor of everyone living with diabetes.
