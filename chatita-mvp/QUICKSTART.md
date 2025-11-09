# ⚡ Chatita Quick Start

**Get your app running in 5 minutes!**

## Step 1: Backend Setup (2 min)

```bash
# Navigate to backend
cd chatita-mvp/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` and add your Anthropic API key:**

Don't have an API key yet? Get one in 2 minutes:
1. Go to: https://console.anthropic.com
2. Sign up/log in with your email
3. Click "API Keys" → "Create Key"
4. Copy the key (starts with `sk-ant-api03-...`)
5. Paste it in .env:

```bash
# Edit .env file
nano .env  # or use any text editor

# Add this line with your actual key:
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

Save and close the file.

**Start the backend:**
```bash
npm run dev
```

You should see: `🚀 Chatita Backend running on port 3000`

✅ **Leave this terminal running!**

---

## Step 2: Frontend Setup (3 min)

**Open a NEW terminal:**

```bash
# Navigate to app
cd chatita-mvp/app

# Install dependencies
npm install

# Start Expo
npx expo start
```

**Press `i` for iOS or `a` for Android**

---

## 🎉 That's It!

Your app should now be running!

### First Steps:
1. **Home screen**: Tap glucose card → enter 120
2. **Meals tab**: Upload a menu photo → analyze it
3. **Insights tab**: Generate weekly insights
4. **Settings tab**: Switch to Spanish

### Having issues?
- Check `SETUP_GUIDE.md` for detailed troubleshooting
- Verify your API key is correct
- Make sure both backend and frontend are running

---

## 🚀 Ready for the Hackathon?

Use `TESTING_CHECKLIST.md` to verify everything works before your demo!

**Good luck! 💙**

---

**About Chatita:** Named after my grandmother "Chata," who inspired this app through her daily journey with diabetes. Built to help people feel less alone, more informed, and more capable in managing their health.
