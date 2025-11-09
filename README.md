# 💙 Chatita - AI Diabetes Companion

**An AI-powered diabetes health companion app built with Claude API**

> Named after "abuelita" (grandmother in Spanish) - bringing the warmth and wisdom of a caring grandmother into diabetes management.

## 🌟 Overview

Chatita is a mobile health companion that helps people with diabetes make better food choices and understand their health patterns. Named after my grandmother "Chata," who continues to navigate diabetes daily, this app embodies the caring wisdom and support that makes managing a chronic condition feel less isolating.

The app features:

- 📸 **Real-time restaurant menu analysis** using Claude Vision API
- 💡 **Personalized weekly insights** using Claude Text API
- 💙 **Warm grandmother persona** that's encouraging, never judgmental
- 🌐 **Bilingual support** (English/Spanish) with cultural sensitivity

**The Personal Context:**
I was diagnosed with Type II diabetes in 2019. Watching my abuelita struggle with the same condition, and experiencing the emotional and physical toll myself, drove me to create a tool that makes diabetes care more intuitive and less overwhelming. Managing diabetes affects every moment of your life - your food, movement, mood, energy, and confidence. Chatita is designed to help people feel less alone, more informed, and more capable.

**Built for the Anthropic Hackathon - Best Use of Claude Track**

## ✨ Key Features

### 🍽️ Menu Analysis (Killer Feature!)
The app's standout feature uses **Claude Vision API** to analyze restaurant menus in real-time:

1. User photographs a restaurant menu
2. Claude Vision analyzes all menu items
3. Returns 2-3 diabetes-friendly recommendations
4. Provides practical "how to eat it" tips
5. Honors cravings while managing blood sugar

**Why it's special:**
- Solves real pain point (restaurant decision paralysis)
- Innovative use of Vision API
- Shows immediate, actionable results
- Perfect demo moment for judges

### 💡 Weekly Insights
Uses **Claude Text API** to analyze patterns:
- Reviews 7 days of meals, glucose, and mood data
- Generates 3-4 encouraging insight cards
- Celebrates wins, suggests improvements gently
- Personalized advice in grandmother's voice

### 🏠 Health Tracking
- Manual glucose input with color-coded status
- Mood tracking (Happy, Neutral, Stressed, Sad)
- Meal logging with photos
- Daily health tips rotation

### ⚙️ Settings & Personalization
- Language toggle (English ↔ Spanish)
- Notification preferences
- Data management

## 🏗️ Architecture

```
Frontend: React Native + Expo
    ↓ REST API
Backend: Node.js + Express
    ↓ Anthropic SDK
Claude API: Vision + Text
```

### Tech Stack

**Frontend:**
- React Native with Expo
- React Navigation
- TypeScript
- AsyncStorage for persistence
- Expo Image Picker

**Backend:**
- Node.js + Express
- Anthropic SDK
- TypeScript
- Multer for file uploads
- CORS enabled

## 🚀 Quick Start

### Prerequisites

**Before you start, you'll need:**

1. **Node.js 18+**
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **Anthropic API Key** (Required!)
   - Get one FREE at: https://console.anthropic.com
   - Steps:
     1. Sign up or log in at https://console.anthropic.com
     2. Click "API Keys" in the sidebar
     3. Click "Create Key"
     4. Name it "Chatita Development"
     5. Copy the key (starts with `sk-ant-api03-...`)
     6. Save it securely - you'll need it in step 2 below
   - New accounts get free credits for testing!

3. **Mobile Development Environment**
   - iOS Simulator (macOS only) - Install with Xcode
   - OR Android Emulator (any OS) - Install with Android Studio
   - OR Expo Go app on your phone (easiest option)

### Installation

```bash
# Navigate to project
cd chatita-mvp

# 1. Backend Setup
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your API key:
# ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
# (Get your key from https://console.anthropic.com)
nano .env  # or use any text editor

# Start backend
npm run dev

# 2. Frontend Setup (new terminal)
cd ../app
npm install
npx expo start

# 3. Run the app
# Press 'i' for iOS or 'a' for Android
```

**That's it!** Your app should now be running.

## 📱 Using the App

### First Time
1. **Home**: Tap glucose card → enter reading (e.g., 120)
2. **Home**: Select your mood → track emotional patterns
3. **Meals**: Tap "Analyze Restaurant Menu" → upload photo
4. **Meals**: Tap "✨ Analyze Menu" → wait 15-30s
5. **Insights**: Tap "✨ This Week's Insights" → wait 10-20s
6. **Settings**: Toggle to Spanish → see app in Spanish

### The Demo Flow (2 minutes)
1. **Opening (20s)**: Introduce problem and solution
2. **Menu Analysis (60s)**: Upload menu → show recommendations ⭐
3. **Insights (20s)**: Show weekly insights
4. **Language (10s)**: Toggle to Spanish
5. **Closing (10s)**: Impact statement

## 🎯 What Makes This Special

### Technical Innovation
✅ **Dual Claude API usage** (Vision + Text in one app)
✅ **Real-time image analysis** with Vision API
✅ **Sophisticated prompt engineering** for grandmother persona
✅ **Bilingual support** with cultural context
✅ **Full-stack mobile implementation**

### User Experience
✅ **Solves real pain point** (eating out with diabetes)
✅ **Warm, caring tone** (never judgmental)
✅ **Actionable advice** (not just data tracking)
✅ **Immediate utility** (works on day 1)
✅ **Beautiful UI** matching design system

### Hackathon Appeal
✅ **Working demo** (fully functional)
✅ **Innovative API use** (Vision + Text)
✅ **Visual impact** (great for presentations)
✅ **Compelling story** (grandmother inspiration)
✅ **Social impact** (helps 33 million Americans)

## 📁 Project Structure

```
chatita-mvp/
├── app/                        # React Native frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/           # App state management
│   │   ├── i18n/              # Bilingual translations
│   │   ├── navigation/        # React Navigation
│   │   ├── screens/           # Main app screens
│   │   ├── services/          # API communication
│   │   ├── theme/             # Design system
│   │   └── types/             # TypeScript types
│   ├── App.tsx
│   └── package.json
│
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Claude API integration
│   │   └── index.ts
│   ├── .env.example
│   └── package.json
│
├── README.md                   # This file
├── SETUP_GUIDE.md             # Detailed setup
├── TESTING_CHECKLIST.md       # Pre-demo testing
├── QUICKSTART.md              # 5-minute start
└── PROJECT_SUMMARY.md         # Complete overview
```

## 🎨 Design System

### Color Palette
- **Primary**: #4A90E2 (Sky blue)
- **Secondary**: #6ED1C7 (Turquoise)
- **Accent**: #FFB6A6 (Warm coral)
- **Background**: #F2F6FA (Off-white blue)

Inspired by warmth, care, and Latino cultural aesthetics.

### Typography
- Headers: Bold (700)
- Body: Regular (400)
- Glucose display: 56px bold
- System fonts (San Francisco on iOS, Roboto on Android)

### Components
- Cards: 16px border radius, subtle shadows
- Buttons: 12px border radius, generous padding
- Status indicators: Color-coded (green/yellow/red)

## 🐛 Troubleshooting

### Backend Issues

**"Cannot connect to backend"**
```bash
# Verify backend is running
curl http://localhost:3000/health
```

**"Claude API error"**
- Check API key in `.env`
- Verify key has credits at console.anthropic.com
- Check backend terminal for detailed errors

### Frontend Issues

**"Expo can't connect"**
- iOS Simulator: Use `http://localhost:3000`
- Android Emulator: Use `http://10.0.2.2:3000`
- Physical device: Use `http://YOUR_IP:3000`

Edit `app/src/services/api.ts` to change the URL.

**"Module not found"**
```bash
cd app
rm -rf node_modules
npm install
```

See `SETUP_GUIDE.md` for detailed troubleshooting.

## 🎤 Hackathon Pitch (2 minutes)

**Hook (20s):**
"I was diagnosed with Type II diabetes in 2019. I've watched my grandmother, Chata, struggle with it for years. Managing diabetes affects every moment of your life - what you eat, how you move, your mood, your energy. When blood sugar isn't well managed, even simple tasks feel impossible. And it's incredibly isolating."

**Solution (20s):**
"That's why I built Chatita - named after my grandmother. She's an AI companion who uses Claude's Vision API to analyze restaurant menus in real-time and give you diabetes-friendly recommendations. Because eating out shouldn't be stressful."

**Demo (60s):**
[Show menu analysis] "I photograph a menu... Chatita analyzes every item and recommends the best options. But she doesn't stop there - she tells me HOW to eat it. Vegetables first, drink water, portion control. It's like having my grandmother with me."

**Technical (20s):**
"Two innovative Claude API use cases: Vision for real-time menu analysis, Text for weekly insights. Bilingual grandmother persona shows sophisticated prompt engineering."

**Impact (20s):**
"This isn't about restriction - it's about empowerment. My goal is to help people like my grandmother and me feel less alone, more informed, and more capable of caring for ourselves. Because managing diabetes shouldn't mean giving up joy or confidence. It should feel like having someone who cares by your side."

## 🔮 Future Roadmap

### Post-Hackathon Features
- Real CGM integration (Dexcom, Libre APIs)
- Actual nutrition analysis for meal photos (Nutritionix API)
- Push notifications
- User authentication
- Cloud data sync (Firebase/Supabase)
- Family sharing features
- Medication tracking
- Exercise logging
- Export health reports (PDF)

## 📊 Project Stats

- **21 TypeScript files** created
- **4 backend files** (Express + Claude API)
- **16 frontend files** (React Native screens + components)
- **2 AI integrations** (Vision + Text APIs)
- **Bilingual support** (English + Spanish)
- **~3-4 hours** from concept to working demo

## 🏆 Hackathon Success Factors

**What judges will love:**
1. **Innovation**: Creative use of Claude Vision API
2. **Execution**: Fully functional, not just slides
3. **Design**: Beautiful, accessible interface
4. **Impact**: Solves real health challenge
5. **Technical**: Full-stack + sophisticated AI integration
6. **Story**: Personal inspiration (grandmother)

**Differentiators:**
- Most teams use Text API only → You use Vision + Text
- Most are English-only → You're bilingual
- Most are clinical → You're warm and caring
- Most track data → You give actionable guidance

## 📚 Documentation

### Getting Started
- **QUICKSTART.md** - Get running in 5 minutes
- **chatita-mvp/docs/API_KEY_SETUP.md** - Detailed guide to get your Anthropic API key
- **SETUP_GUIDE.md** - Complete setup with troubleshooting
- **chatita-mvp/docs/QUICK_REFERENCE.md** - One-page cheat sheet

### Development
- **app/README.md** - Frontend documentation
- **backend/README.md** - Backend API documentation
- **SECURITY.md** - Security best practices

### Hackathon Prep
- **TESTING_CHECKLIST.md** - Pre-demo testing guide
- **PROJECT_SUMMARY.md** - Technical overview
- **STORY.md** - The personal story behind Chatita

## ⚠️ Known Limitations

Acceptable for hackathon MVP:
- No real CGM integration (manual glucose entry)
- No real nutrition API (meal logging only)
- No push notifications (UI only)
- No user authentication
- No cloud sync (local storage only)

**But you have:**
- ✅ Real Claude Vision API integration
- ✅ Real Claude Text API integration
- ✅ Bilingual grandmother persona
- ✅ Beautiful, functional UI
- ✅ Solves real problem

## 🧪 Testing

Before your demo, test:
- [ ] Glucose input works
- [ ] Menu analysis completes (15-30s)
- [ ] Insights generation works (10-20s)
- [ ] Language toggle works
- [ ] All screens navigate smoothly
- [ ] Have backup screenshots ready

See `TESTING_CHECKLIST.md` for complete checklist.

## 📄 License

MIT License

## 💙 About

### The Personal Story Behind Chatita

**Chatita** is named after my grandmother, whose nickname is "Chata."

I was diagnosed with Type II diabetes in 2019, and I have watched many of my loved ones, especially my abuelita, struggle with managing it every day. She continues to navigate medication, glucose monitoring, and difficult food decisions, often without support or clear feedback. Seeing the emotional and physical toll on her, and experiencing it myself, has driven my desire to make diabetes care more intuitive and less overwhelming.

Managing diabetes affects every moment of your life - what you eat, how you move, your mood, your energy, and your confidence. When blood sugar is not well managed, even simple tasks can feel impossible. I know that feeling personally, and I know how isolating it can be.

**That is why Chatita is designed as a compassionate health companion** that uses AI to help people understand how meals, movement, mood, and glucose all connect, without constant tedious tracking.

### The Mission

My goal is to help people living with diabetes feel:
- **Less alone** - A caring companion, always there
- **More informed** - Clear insights without overwhelming data
- **More capable** - Actionable guidance for everyday decisions

Through this project, I want to build technology that empowers people, especially those who feel left behind by traditional healthcare tools. Families like mine deserve to live healthier and more confident lives.

**Built with love by Lucero for the Anthropic Hackathon**
*In honor of my abuelita, Chata, and everyone living with diabetes* 💙

## 🙏 Acknowledgments

- **Claude API** for making sophisticated AI accessible
- **Anthropic** for the hackathon opportunity
- **Expo** for excellent mobile development tools
- **My grandmother** for the inspiration 💙

## 📞 Support

- **Issues**: Check `SETUP_GUIDE.md` first
- **API Docs**: https://docs.anthropic.com/
- **Expo Docs**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/

---

**Ready to get started?**

Open `QUICKSTART.md` for a 5-minute setup guide!

**Going to present at the hackathon?**

Open `TESTING_CHECKLIST.md` to make sure everything works!

---

*Built with 💙 using Claude API*

**Good luck at the hackathon! Go win it! 🏆🚀**
