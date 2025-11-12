# 🔧 Meal Analysis Timeout Fix

## ✅ What I Fixed

### 1. Increased Timeouts
- **Frontend general timeout**: 30s → 60s
- **Meal analysis timeout**: 30s → 90s
- **Reason**: Claude Vision API can take 30-60 seconds for image processing

### 2. Better Error Messages
- More descriptive error messages
- Helps identify if it's timeout vs. server error vs. connection issue

### 3. Added Backend Logging
- See exactly what's happening during analysis
- Track API call duration
- Identify bottlenecks

---

## 🚀 How to Test the Fix

### Step 1: Restart Backend (REQUIRED!)

The backend code changed, so you MUST restart it:

```bash
# Stop the current backend (Ctrl+C in the terminal running it)

# Then restart:
cd /Users/lucerotoral/Chatita/chatita-mvp/backend
npm run dev
```

You should see:
```
🚀 Chatita Backend running on port 3000
📍 Health check: http://localhost:3000/health
🤖 Claude API Key configured: ✅ Yes
```

### Step 2: Restart the App

The app code also changed:

```bash
# In the app terminal, press 'r' to reload
# Or stop (Ctrl+C) and restart:
cd /Users/lucerotoral/Chatita/chatita-mvp/app
npx expo start
```

### Step 3: Test Meal Analysis

1. Open app
2. Tap "Add Meal" on Home screen
3. Tap "Upload Photo" or "Take Photo"
4. Select a food image
5. Watch the backend terminal for logs:
   ```
   🍽️ Meal analysis started...
   📸 Image received: meal.jpg (245678 bytes)
   🤖 Calling Claude Vision API...
   ✅ Claude API responded in 23456ms
   ✅ Analysis complete, sending response
   ```

6. App should show nutrition results after 15-60 seconds

---

## 🐛 If Still Getting Timeout

### Check 1: Backend is Running
```bash
curl http://localhost:3000/health
```

Should return:
```json
{"status":"ok","message":"Chatita Backend is running","timestamp":"..."}
```

### Check 2: API Key is Valid
```bash
cd /Users/lucerotoral/Chatita/chatita-mvp/backend
cat .env | grep ANTHROPIC_API_KEY
```

Should show your API key (starts with `sk-ant-api03-`)

### Check 3: Image Size
Large images (>5MB) can timeout. Try with a smaller image:
- Resize image to 1920x1080 or smaller
- Use JPEG instead of PNG (smaller file size)

### Check 4: Network Connection
Make sure your computer is online and can reach Anthropic's API

---

## 📱 Testing from iOS Simulator

If testing on iOS Simulator, make sure the API URL is correct:

In `chatita-mvp/app/src/services/api.ts`, line 15:
```typescript
return 'http://localhost:3000';  // iOS Simulator can use localhost
```

---

## 📱 Testing from Android Emulator

If testing on Android Emulator, the URL should be:

In `chatita-mvp/app/src/services/api.ts`, line 12:
```typescript
return 'http://10.0.2.2:3000';  // Android Emulator special IP
```

---

## 📱 Testing from Physical Device

If testing on a physical iPhone/Android device:

1. Find your computer's IP address:
   ```bash
   # Mac/Linux:
   ifconfig | grep "inet " | grep -v 127.0.0.1

   # Should show something like: 192.168.1.100
   ```

2. Update `chatita-mvp/app/src/services/api.ts`, line 15:
   ```typescript
   return 'http://YOUR_IP_HERE:3000';  // e.g., http://192.168.1.100:3000
   ```

3. Make sure your phone and computer are on the same WiFi network

---

## 🧪 Testing with a Sample Image

Try this test flow:

1. **Find a good test image:**
   - Search online for "healthy meal plate"
   - Save to your phone/device
   - Image should be clear, well-lit
   - Ideal size: 1-2MB

2. **Test the flow:**
   - Home → Add Meal
   - Upload Photo → Select test image
   - Wait (watch backend logs)
   - Should see results in 15-60 seconds

3. **Expected Results:**
   ```
   Detected Foods: [list of foods]
   Calories: ~400-600
   Carbs: ~30-50g
   Protein: ~20-35g
   Fat: ~10-20g
   Fiber: ~5-10g
   Sugar: ~5-15g
   Sodium: ~300-800mg
   Portion Size: "1 plate (300-400g)"
   ```

---

## 🔍 Debug: Check Backend Logs

When you upload a photo, watch the backend terminal. You should see:

**Success:**
```
🍽️ Meal analysis started...
📸 Image received: IMG_1234.jpg (1234567 bytes)
🤖 Calling Claude Vision API...
✅ Claude API responded in 23456ms
✅ Analysis complete, sending response
```

**If you see timeout:**
```
🍽️ Meal analysis started...
📸 Image received: IMG_1234.jpg (8765432 bytes)  ← Large image!
🤖 Calling Claude Vision API...
[waits forever, then times out]
```
**Solution:** Use a smaller image

**If you see API error:**
```
🍽️ Meal analysis started...
📸 Image received: IMG_1234.jpg (1234567 bytes)
🤖 Calling Claude Vision API...
❌ Error: API key invalid
```
**Solution:** Check your API key in `.env`

---

## 🚨 Common Issues & Solutions

### Issue 1: "timeout of 90000ms exceeded"
**Cause:** Image is too large or internet is slow
**Solution:**
- Use smaller image (resize to 1920x1080)
- Check internet connection
- Try again (sometimes API is slow)

### Issue 2: "Server error. Please make sure backend is running"
**Cause:** Backend is not running or crashed
**Solution:**
```bash
cd /Users/lucerotoral/Chatita/chatita-mvp/backend
npm run dev
```

### Issue 3: "Network Error" or "ECONNREFUSED"
**Cause:** App can't reach backend
**Solution:**
- Check backend is running
- Check API URL is correct (localhost vs. IP address)
- If on physical device, check WiFi

### Issue 4: Analysis returns all zeros
**Cause:** Claude couldn't parse the image or response
**Solution:**
- Check backend logs for parsing errors
- Try a different image (clearer, better lit)
- Make sure image actually shows food

---

## 💡 Pro Tips

### Use Good Quality Images:
✅ **Good:**
- Clear, well-lit food photos
- Food fills most of the frame
- Single meal or plate
- Common foods (easier for AI to recognize)

❌ **Avoid:**
- Blurry or dark photos
- Food far away or tiny
- Multiple meals in one photo
- Unfamiliar or exotic foods (AI might guess)

### Best Test Images:
1. Grilled chicken with rice and vegetables
2. Salad with protein (salmon, chicken)
3. Breakfast (eggs, toast, bacon)
4. Sandwich with side salad
5. Pasta with sauce and vegetables

---

## 🎯 Expected Performance

**Normal Analysis Time:**
- Small image (< 1MB): 15-30 seconds
- Medium image (1-3MB): 30-60 seconds
- Large image (3-5MB): 60-90 seconds

**Claude API Processing:**
- Image upload: ~2-5 seconds
- AI analysis: ~15-30 seconds
- Response parsing: <1 second

**Total: Usually 20-40 seconds**

---

## 📊 What Changed in the Code

### Frontend (`app/src/services/api.ts`):
```typescript
// Before:
timeout: 30000  // 30 seconds

// After:
timeout: 60000  // 60 seconds (general)
timeout: 90000  // 90 seconds (meal analysis)
```

### Backend (`backend/src/routes/analyzeMeal.ts`):
```typescript
// Added logging:
console.log('🍽️ Meal analysis started...')
console.log('📸 Image received: ...')
console.log('🤖 Calling Claude Vision API...')
console.log('✅ Claude API responded in Xms')
console.log('✅ Analysis complete')
```

---

## ✅ Success Checklist

Before reporting the issue as unfixed:

- [ ] Backend restarted after code changes
- [ ] App restarted/reloaded
- [ ] Backend health check works (`curl http://localhost:3000/health`)
- [ ] API key is in `.env` file
- [ ] Image is reasonable size (< 3MB)
- [ ] Waited at least 60 seconds
- [ ] Checked backend logs for errors
- [ ] API URL is correct for your device type

---

## 🆘 Still Not Working?

If you've tried everything above and it still doesn't work:

### Quick Test: Test with curl

```bash
# Test backend directly:
curl -X POST http://localhost:3000/api/analyze-meal \
  -H "Content-Type: multipart/form-data" \
  -F "mealImage=@/path/to/your/food/image.jpg" \
  -F "language=en"
```

This will tell you if the problem is:
- Backend issue (if curl fails)
- Frontend issue (if curl works)

---

**Need more help? Let me know what you see in the backend logs! 🔍**
