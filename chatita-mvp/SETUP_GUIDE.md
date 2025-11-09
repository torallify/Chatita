# 🚀 Chatita Setup Guide

**Complete setup walkthrough for the hackathon demo**

## ⚡ Quick Setup (15 minutes)

### Step 1: Verify Prerequisites ✅

```bash
# Check Node.js version (need 18+)
node --version

# Check npm
npm --version
```

Don't have Node.js? Download from https://nodejs.org/

### Step 2: Get Your Anthropic API Key 🔑

**Detailed Instructions:**

1. **Go to the Anthropic Console**
   - Visit: https://console.anthropic.com
   - Bookmark this page - you'll need it for managing keys

2. **Create an Account or Sign In**
   - Click "Sign Up" if you're new
   - Use your email address
   - Verify your email
   - Or click "Log In" if you already have an account

3. **Navigate to API Keys**
   - After logging in, look at the left sidebar
   - Click on "API Keys" (or "Keys")
   - You'll see a list of your API keys (if any)

4. **Create a New Key**
   - Click the "Create Key" button (usually in the top right)
   - Give it a descriptive name: `Chatita Development`
   - Click "Create" or "Generate Key"

5. **Copy Your API Key**
   - The key will be shown ONCE - you cannot view it again!
   - It looks like: `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Click the "Copy" button or manually select and copy it
   - **Important:** Save it immediately in a secure location

6. **Verify Your Key Has Credits**
   - New accounts typically receive free credits for testing
   - Check your balance in the Console dashboard
   - If you need more credits, you can add payment information

**Key Format:**
Your API key should start with `sk-ant-api03-` followed by a long string of random characters.

**Example (fake key for reference):**
```
sk-ant-api03-AbCdEf123456789GhIjKl987654321MnOpQr135792468StUvWx
```

**Important Security Notes:**
- ⚠️ The key is shown ONLY ONCE after creation
- ⚠️ Never share your API key with anyone
- ⚠️ Never commit it to GitHub
- ⚠️ If exposed, revoke it immediately and create a new one
- ⚠️ Use different keys for development and production

**Managing Your Keys:**
- View all keys: https://console.anthropic.com/settings/keys
- Revoke compromised keys instantly from the Console
- Create separate keys for different projects
- Monitor usage to detect unauthorized access

### Step 3: Backend Setup ⚙️

```bash
# Navigate to backend
cd chatita-mvp/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and paste your API key
# Use nano, vim, or any text editor
nano .env

# Add this line with your actual key:
# ANTHROPIC_API_KEY=sk-ant-api03-...
```

Save and exit (Ctrl+X, then Y, then Enter in nano)

### Step 4: Start Backend 🚀

```bash
# Still in backend directory
npm run dev
```

You should see:
```
🚀 Chatita Backend running on port 3000
📍 Health check: http://localhost:3000/health
🤖 Claude API Key configured: ✅ Yes
```

**Leave this terminal running!**

### Step 5: Frontend Setup 📱

Open a **NEW terminal window**:

```bash
# Navigate to app directory
cd chatita-mvp/app

# Install dependencies
npm install
```

This will take 2-3 minutes. Perfect time for a coffee break! ☕

### Step 6: Start the App 🎉

```bash
# Still in app directory
npx expo start
```

You'll see the Expo menu with a QR code.

### Step 7: Run on Device 📲

**Choose your platform:**

#### Option A: iOS Simulator (macOS only)
```
Press 'i' in the terminal
```

The simulator will open automatically.

#### Option B: Android Emulator
```
1. Start your Android emulator first
2. Press 'a' in the terminal
```

#### Option C: Your Phone
```
1. Install "Expo Go" from App Store or Play Store
2. Scan the QR code with your camera (iOS) or Expo Go app (Android)
3. Make sure your phone is on the same WiFi as your computer
```

## ✅ Verify Everything Works

### Test 1: Home Screen
- [ ] App loads without errors
- [ ] See "Hello, mija! 💙" title
- [ ] Tap the glucose card
- [ ] Enter a number (e.g., 120)
- [ ] See the glucose display with color-coded status

### Test 2: Menu Analysis (The Star Feature!)
- [ ] Go to "Meals" tab
- [ ] Tap "Analyze Restaurant Menu"
- [ ] Upload or take a photo
- [ ] Tap "✨ Analyze Menu"
- [ ] Wait 15-30 seconds
- [ ] See 2-3 recommendations from Chatita
- [ ] Tap "Log This Meal"

### Test 3: Insights
- [ ] Go to "Insights" tab
- [ ] Tap "✨ This Week's Insights"
- [ ] Wait 10-20 seconds
- [ ] See personalized insight cards

### Test 4: Language Toggle
- [ ] Go to "Settings" tab
- [ ] Tap "🇲🇽 Español"
- [ ] See app switch to Spanish
- [ ] Go back to Home screen
- [ ] See "Hola, mija! 💙"

## 🐛 Common Issues

### Issue: "Cannot connect to backend"

**iOS Simulator:**
```typescript
// In app/src/services/api.ts
// Line 12 should be:
return 'http://localhost:3000';
```

**Android Emulator:**
```typescript
// In app/src/services/api.ts
// Line 12 should be:
return 'http://10.0.2.2:3000';
```

**Physical Device:**
```bash
# Find your computer's IP address

# On macOS:
ipconfig getifaddr en0

# On Windows:
ipconfig

# On Linux:
hostname -I

# Then update app/src/services/api.ts line 12:
return 'http://YOUR_IP_ADDRESS:3000';
```

### Issue: "Claude API error"

```bash
# Verify your API key works
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'
```

If this fails, your API key might be invalid or out of credits.

### Issue: Expo won't start

```bash
# Clear cache and restart
npx expo start -c
```

### Issue: Module not found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📋 Pre-Demo Checklist

Before your hackathon presentation:

- [ ] Backend is running (check terminal)
- [ ] Frontend is running (check Expo)
- [ ] App loads without errors
- [ ] Have a sample menu photo ready
- [ ] Have tested menu analysis once
- [ ] Have generated insights at least once
- [ ] Know your 2-minute pitch
- [ ] Have backup screenshots in case live demo fails
- [ ] Phone/laptop is fully charged
- [ ] Connected to reliable WiFi

## 🎬 Demo Flow

1. **Opening (10 sec)**: "Meet Chatita, my AI diabetes companion"
2. **Home screen (10 sec)**: Show glucose tracking
3. **Menu analysis (60 sec)**: Upload menu → get recommendations ⭐
4. **Insights (20 sec)**: Show weekly insights
5. **Language toggle (10 sec)**: Switch to Spanish
6. **Closing (10 sec)**: "Empowering diabetes management with AI"

## 🎯 Killer Feature Focus

Spend **most** of your demo time on menu analysis because:
- It uses Claude Vision API (innovative!)
- It solves a real pain point
- It's visually impressive
- It shows the grandmother persona clearly

## 💡 Pro Tips

1. **Pre-load data**: Log some meals and glucose before demo
2. **Test menu photo**: Use a clear, well-lit menu image
3. **Backup plan**: Take screenshots in case WiFi fails
4. **Energy**: Your enthusiasm sells the product!
5. **Story**: Mention it's named after your grandmother

## 🏆 You're Ready!

You now have:
- ✅ Working backend with Claude API
- ✅ Working frontend app
- ✅ Menu analysis (Vision API)
- ✅ Weekly insights (Text API)
- ✅ Bilingual support
- ✅ Beautiful UI

Go win that hackathon! 💙

---

**Questions?** Check README.md or the full documentation in `/docs`

**Good luck!** 🌟
