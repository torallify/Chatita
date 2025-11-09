# ✅ Chatita Testing Checklist

Use this checklist before your hackathon demo to ensure everything works!

## 🔧 Pre-Testing Setup

- [ ] Backend server is running (`cd backend && npm run dev`)
- [ ] Frontend app is running (`cd app && npx expo start`)
- [ ] API key is configured in `backend/.env`
- [ ] App loads without errors on simulator/device

## 🏠 Home Screen Tests

### Glucose Tracking
- [ ] Can tap glucose card to open input modal
- [ ] Can enter a glucose value (e.g., 95)
- [ ] Glucose displays with correct color:
  - Green for 70-180 (in range)
  - Orange for >180 (high)
  - Red for <70 (low)
- [ ] Timestamp shows current time
- [ ] Modal closes after saving

### Mood Tracking
- [ ] Can tap each mood button (Happy, Neutral, Stressed, Sad)
- [ ] Selected mood highlights in blue
- [ ] Mood selection persists

### Daily Tips
- [ ] Daily tip card displays
- [ ] Tip message is readable and encouraging
- [ ] Tip changes each day

## 🍽️ Meals Screen Tests

### Photo Selection
- [ ] "Take Photo of Meal" button works
- [ ] Camera permission request appears
- [ ] Can take a photo with camera
- [ ] "Upload Menu Photo" button works
- [ ] Photo library permission request appears
- [ ] Can select photo from library

### Menu Analysis (KILLER FEATURE!)
- [ ] Selected photo displays correctly
- [ ] "✨ Analyze Menu" button appears
- [ ] Loading spinner shows during analysis
- [ ] Analysis completes in 15-30 seconds
- [ ] 2-3 recommendations appear
- [ ] Each recommendation shows:
  - Dish name
  - Reason it's good
  - Practical tips
  - Warnings (if applicable)
- [ ] General advice from Chatita appears
- [ ] "Log This Meal" button works
- [ ] Success message appears after logging
- [ ] Can analyze another menu

### Error Handling
- [ ] Graceful error if backend is down
- [ ] Graceful error if API key is invalid
- [ ] Graceful error if image upload fails

## 💡 Insights Screen Tests

### Weekly Insights Generation
- [ ] "✨ This Week's Insights" button appears
- [ ] Loading spinner shows during generation
- [ ] Generation completes in 10-20 seconds
- [ ] 3-4 insight cards appear
- [ ] Each card shows:
  - Emoji icon
  - Title
  - Encouraging message
  - Colored accent bar
- [ ] Can refresh insights
- [ ] Empty state shows if no data logged

### Error Handling
- [ ] Graceful error if backend is down
- [ ] Graceful error if no data available

## ⚙️ Settings Screen Tests

### Language Toggle
- [ ] English option shows checkmark when selected
- [ ] Spanish option shows checkmark when selected
- [ ] Switching to Spanish changes all text
- [ ] Home screen shows "Hola, mija! 💙"
- [ ] Meals screen shows Spanish labels
- [ ] Insights screen shows Spanish labels
- [ ] Switching back to English works

### Notifications (UI Only)
- [ ] Daily Reminders toggle works
- [ ] Glucose Alerts toggle works
- [ ] (These are just UI for hackathon - no actual notifications)

### About Section
- [ ] Shows Chatita emoji and message
- [ ] Shows version number

### Clear Data
- [ ] Confirmation dialog appears
- [ ] Cancel button works (doesn't delete)
- [ ] Delete button clears all data
- [ ] Success message appears

## 🌐 Language Tests

### English Mode
- [ ] All labels in English
- [ ] Menu analysis responds in English
- [ ] Insights respond in English
- [ ] Grandmother persona uses English

### Spanish Mode
- [ ] All labels in Spanish
- [ ] Menu analysis responds in Spanish
- [ ] Insights respond in Spanish
- [ ] Grandmother persona uses Spanish

## 🚀 Performance Tests

- [ ] App loads in <3 seconds
- [ ] Navigation between tabs is smooth
- [ ] No lag when typing in inputs
- [ ] Photos load quickly
- [ ] No crashes during normal use
- [ ] Memory usage is reasonable

## 📱 Platform-Specific Tests

### iOS Simulator
- [ ] All features work
- [ ] Backend connects on localhost:3000
- [ ] Photos can be selected from library
- [ ] Bottom tab navigation looks correct

### Android Emulator
- [ ] All features work
- [ ] Backend connects on 10.0.2.2:3000
- [ ] Photos can be selected from library
- [ ] Bottom tab navigation looks correct

### Physical Device
- [ ] All features work
- [ ] Backend connects to computer's IP
- [ ] Camera works for photos
- [ ] Photo library access works
- [ ] App doesn't crash

## 🎬 Demo Preparation

### Data Pre-loading
- [ ] Log at least 3 glucose readings
- [ ] Log at least 2 meals
- [ ] Add at least 2 mood entries
- [ ] Generate insights once

### Demo Assets Ready
- [ ] Clear, well-lit menu photo ready
- [ ] Practice menu photo uploaded
- [ ] Know which menu items will be recommended
- [ ] Screenshots of key features taken

### Backup Plan
- [ ] Screenshots of each screen
- [ ] Screenshots of menu analysis results
- [ ] Screenshots of insights
- [ ] Can demo from screenshots if WiFi fails

## 💡 Hackathon Demo Flow

Practice this flow 3 times before presenting:

1. **Opening (10 sec)**
   - [ ] "Meet Chatita, named after my grandmother"
   - [ ] "AI companion for diabetes management"

2. **Home Screen (10 sec)**
   - [ ] Show glucose tracking
   - [ ] Show mood selector
   - [ ] Show daily tip

3. **Menu Analysis (60 sec) ⭐**
   - [ ] "The killer feature - real-time menu analysis"
   - [ ] Upload menu photo
   - [ ] Wait for analysis (have backup screenshot ready)
   - [ ] Show 2-3 recommendations
   - [ ] Read one recommendation out loud
   - [ ] Emphasize grandmother's caring advice

4. **Insights (20 sec)**
   - [ ] Show weekly insights
   - [ ] Read one insight card
   - [ ] "Claude analyzes patterns and celebrates wins"

5. **Language Toggle (10 sec)**
   - [ ] Switch to Spanish
   - [ ] "Bilingual support with cultural sensitivity"

6. **Closing (10 sec)**
   - [ ] "Two innovative Claude API use cases"
   - [ ] "Vision for menus, Text for insights"
   - [ ] "Empowering 33 million Americans"

## 🏆 Final Pre-Demo Check

**1 hour before presenting:**

- [ ] Backend is running and responsive
- [ ] Frontend is running without errors
- [ ] Tested full demo flow once
- [ ] Backup screenshots ready
- [ ] Phone/laptop is charged
- [ ] Connected to stable WiFi
- [ ] Know the 2-minute pitch by heart
- [ ] Practice one more time!

## ⚠️ Known Limitations (Be Ready to Explain)

These are acceptable for a hackathon MVP:

- No real nutrition analysis (just meal logging)
- No real CGM integration (manual glucose entry)
- No actual push notifications
- No user authentication
- No cloud sync
- Stores data locally only

**But you have:**
- ✅ Real Claude Vision API for menu analysis
- ✅ Real Claude Text API for insights
- ✅ Bilingual grandmother persona
- ✅ Beautiful, functional UI
- ✅ Solves a real problem

## 📞 Emergency Troubleshooting

**If demo crashes:**
1. Stay calm
2. Switch to backup screenshots
3. Say: "Let me show you what this looks like"
4. Continue with enthusiasm

**If WiFi fails:**
1. Use backup screenshots
2. Say: "I've prepared some examples"
3. Focus on explaining the technology

**If judges ask hard questions:**
1. Be honest about limitations
2. Focus on what you DID build
3. Explain the vision for future

## 🎯 Key Talking Points

Memorize these:

- "Named after my grandmother - Chatita means little abuela"
- "Two Claude API use cases: Vision and Text"
- "Sophisticated prompt engineering for personality"
- "Solves real pain point: eating out with diabetes"
- "Culturally sensitive, bilingual support"
- "Not restriction, but empowerment"

## ✨ You're Ready!

If you've checked off all the critical items, you're ready to present.

**Remember:**
- Energy and enthusiasm matter!
- Tell the story, don't just show features
- The menu analysis is your star - spend time on it
- Be proud of what you built
- Have fun!

**Good luck! You've got this! 💙🏆**
