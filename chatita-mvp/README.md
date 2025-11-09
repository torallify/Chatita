# 💙 Chatita - AI Diabetes Companion

**An AI-powered diabetes health companion app built with Claude API**

Chatita (named after "abuelita" - grandmother in Spanish) is a warm, caring AI companion that helps people with diabetes make better food choices and understand their health patterns. The app features real-time restaurant menu analysis using Claude Vision API and personalized weekly insights.

## 🎯 Features

### ✨ Menu Analysis (Killer Feature!)
- **Photograph restaurant menus** and get instant diabetes-friendly recommendations
- **Claude Vision API** analyzes all menu items
- **Personalized suggestions** with practical eating tips
- **Bilingual support** (English/Spanish) with grandmother persona

### 📊 Health Tracking
- **Manual glucose logging** with status indicators (low/in-range/high)
- **Mood tracking** to understand emotional patterns
- **Meal logging** with photo support

### 💡 Weekly Insights
- **Claude-generated insights** analyzing patterns in your data
- **Encouraging messages** celebrating wins
- **Gentle suggestions** for improvement areas
- **Personalized advice** based on your week

### 🌐 Bilingual Experience
- **English and Spanish** support throughout the app
- **Culturally sensitive** grandmother persona
- **Warm, caring tone** never judgmental

## 🏗️ Architecture

```
Frontend: React Native + Expo
    ↓
Backend: Node.js + Express
    ↓
Claude API: Text + Vision
```

### Tech Stack

**Frontend:**
- React Native (Expo)
- React Navigation
- TypeScript
- AsyncStorage for local data
- Expo Image Picker

**Backend:**
- Node.js + Express
- Anthropic SDK
- TypeScript
- Multer for file uploads
- CORS enabled

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Anthropic API Key ([Get one here](https://console.anthropic.com))
- iOS Simulator (macOS) or Android Emulator
- OR: Expo Go app on your phone

### Installation

#### 1. Clone and Navigate
```bash
cd chatita-mvp
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 3. Configure Backend
Create `.env` file in the `backend/` directory:
```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=development
```

#### 4. Install Frontend Dependencies
```bash
cd ../app
npm install
```

#### 5. Start the Backend Server
```bash
# In the backend directory
cd ../backend
npm run dev
```

You should see:
```
🚀 Chatita Backend running on port 3000
📍 Health check: http://localhost:3000/health
🤖 Claude API Key configured: ✅ Yes
```

#### 6. Start the Frontend App
Open a new terminal:
```bash
# In the app directory
cd chatita-mvp/app
npx expo start
```

#### 7. Run on Device/Simulator

**Option A: iOS Simulator (macOS only)**
```
Press 'i' in the Expo terminal
```

**Option B: Android Emulator**
```
Press 'a' in the Expo terminal
```

**Option C: Physical Device**
1. Install "Expo Go" from App Store/Play Store
2. Scan the QR code shown in terminal
3. Make sure you're on the same WiFi network

## 📱 Using the App

### First Time Setup
1. **Home Screen**: Tap the glucose card to enter your first reading
2. **Select your mood** to start tracking emotional patterns
3. **Read the daily tip** from Chatita

### Menu Analysis (The Killer Feature!)
1. Go to **Meals** tab
2. Tap **"Analyze Restaurant Menu"**
3. Upload or take a photo of a menu
4. Tap **"✨ Analyze Menu"**
5. Wait for Chatita to analyze (15-30 seconds)
6. Review recommendations and tap **"Log This Meal"**

### Weekly Insights
1. Go to **Insights** tab
2. Tap **"✨ This Week's Insights"**
3. Wait for Claude to generate insights (10-20 seconds)
4. Read your personalized cards

### Settings
1. Go to **Settings** tab
2. Toggle between **English/Spanish**
3. Enable/disable notifications (UI only for hackathon)
4. Clear all data if needed

## 🐛 Troubleshooting

### Backend Issues

**"Cannot connect to backend"**
```bash
# 1. Check backend is running
cd backend
npm run dev

# 2. Verify health endpoint
curl http://localhost:3000/health

# 3. Check API key is set
cat .env | grep ANTHROPIC_API_KEY
```

**"Claude API error"**
```bash
# Verify your API key
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'
```

### Frontend Issues

**"Module not found"**
```bash
cd app
rm -rf node_modules
npm install
```

**"Expo can't connect"**
- iOS Simulator: Backend should be on `http://localhost:3000` ✅
- Android Emulator: Change API URL to `http://10.0.2.2:3000`
  - Edit `app/src/services/api.ts` line 12
- Physical device: Use your computer's local IP
  - Edit `app/src/services/api.ts` line 12

**"Image picker not working"**
```bash
# Rebuild the app
cd app
npx expo start -c
```

### API Configuration for Different Platforms

Edit `app/src/services/api.ts`:

```typescript
// For iOS Simulator
const API_BASE_URL = 'http://localhost:3000';

// For Android Emulator
const API_BASE_URL = 'http://10.0.2.2:3000';

// For Physical Device (replace with your IP)
const API_BASE_URL = 'http://192.168.1.XXX:3000';
```

## 🎨 Design System

### Colors
- **Primary**: #4A90E2 (Sky blue)
- **Secondary**: #6ED1C7 (Turquoise)
- **Accent**: #FFB6A6 (Warm coral)
- **Background**: #F2F6FA (Off-white blue)

### Mood Emojis
- 😊 Happy
- 😐 Neutral
- 😰 Stressed
- 😢 Sad

### Glucose Status
- 🟢 In Range: 70-180 mg/dL
- 🟡 High: >180 mg/dL
- 🔴 Low: <70 mg/dL

## 📁 Project Structure

```
chatita-mvp/
├── app/                          # React Native frontend
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── GlucoseCard.tsx
│   │   │   ├── MoodSelector.tsx
│   │   │   ├── InsightCard.tsx
│   │   │   └── DailyTipCard.tsx
│   │   ├── context/              # App state management
│   │   │   └── AppContext.tsx
│   │   ├── i18n/                 # Translations
│   │   │   └── translations.ts
│   │   ├── navigation/           # React Navigation setup
│   │   │   └── AppNavigator.tsx
│   │   ├── screens/              # Main screens
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── MealsScreen.tsx
│   │   │   ├── InsightsScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── services/             # API communication
│   │   │   └── api.ts
│   │   ├── theme/                # Design system
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   └── componentStyles.ts
│   │   └── types/                # TypeScript types
│   │       └── index.ts
│   ├── App.tsx                   # App entry point
│   └── package.json
│
└── backend/                      # Node.js backend
    ├── src/
    │   ├── routes/               # API routes
    │   │   ├── analyzeMenu.ts
    │   │   └── generateInsights.ts
    │   ├── services/             # Business logic
    │   │   └── claudeService.ts
    │   └── index.ts              # Server entry point
    ├── .env.example              # Environment template
    └── package.json
```

## 🎤 Hackathon Pitch (2 minutes)

**Hook (20s):**
"33 million Americans have diabetes. Eating out is stressful - which menu items won't spike your blood sugar?"

**Solution (20s):**
"Meet Chatita - named after my grandmother. She's an AI companion who analyzes restaurant menus in real-time using Claude's Vision API."

**Demo (60s):**
[Show menu analysis feature]
"I photograph a menu... Chatita analyzes every item and recommends the best options. But she doesn't stop there - she tells me HOW to eat it. Vegetables first, drink water, portion control."

**Technical (20s):**
"Two innovative Claude API use cases: Vision for real-time menu analysis, Text for weekly insights. Bilingual grandmother persona shows sophisticated prompt engineering."

**Impact (20s):**
"Chatita isn't about restriction - it's about empowerment. People with diabetes can eat out confidently."

## 🔮 Future Enhancements

### Post-Hackathon Roadmap
- [ ] Real CGM integration (Dexcom, Libre APIs)
- [ ] Actual nutrition analysis for meal photos (Nutritionix API)
- [ ] Push notifications
- [ ] User authentication
- [ ] Cloud data sync (Firebase/Supabase)
- [ ] Medication tracking
- [ ] Exercise logging
- [ ] Blood pressure tracking
- [ ] Family sharing features
- [ ] Export health reports (PDF)

## 📄 License

MIT License - Built for the Anthropic Hackathon

## 💙 About

Chatita was created to honor the caring wisdom of grandmothers everywhere, bringing their warmth and guidance into diabetes management through AI.

**Made with love by Lucero** 🌟

---

## 🆘 Need Help?

- **Documentation**: See `/docs` folder
- **API Docs**: https://docs.anthropic.com/
- **Expo Docs**: https://docs.expo.dev/
- **Issues**: Open an issue on GitHub

**Good luck at the hackathon!** 🏆
