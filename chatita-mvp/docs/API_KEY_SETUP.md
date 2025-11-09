# 🔑 Getting Your Anthropic API Key

## Quick Guide (2 Minutes)

### Step 1: Visit Anthropic Console
Go to: **https://console.anthropic.com**

### Step 2: Create Account or Sign In
- **New user?** Click "Sign Up"
  - Enter your email address
  - Create a password
  - Verify your email
  - Complete the sign-up process

- **Existing user?** Click "Log In"
  - Enter your credentials
  - Access your dashboard

### Step 3: Navigate to API Keys
Once logged in:
1. Look at the **left sidebar**
2. Click on **"API Keys"** or **"Keys"**
3. You'll see your API keys management page

### Step 4: Create New Key
1. Click the **"Create Key"** button (usually top right)
2. Give it a descriptive name:
   - For development: `Chatita Development`
   - For production: `Chatita Production`
3. Click **"Create"** or **"Generate Key"**

### Step 5: Copy Your Key
**⚠️ CRITICAL: The key is shown ONLY ONCE!**

1. Your key will appear on screen
2. It looks like: `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. Click the **"Copy"** button
4. **Immediately paste it somewhere safe**

**Key Format:**
```
sk-ant-api03-AbCdEf123456789GhIjKl987654321MnOpQr135792468StUvWx
```
- Starts with: `sk-ant-api03-`
- Followed by ~60 random characters
- Total length: ~70 characters

### Step 6: Add Key to Your Project
1. Open your terminal
2. Navigate to the backend folder:
   ```bash
   cd /Users/lucerotoral/Chatita/chatita-mvp/backend
   ```
3. Open the `.env` file:
   ```bash
   nano .env
   # or use any text editor
   ```
4. Paste your key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
   ```
5. Save and close the file

### Step 7: Verify It Works
1. Start the backend:
   ```bash
   npm run dev
   ```
2. Look for this message:
   ```
   🤖 Claude API Key configured: ✅ Yes
   ```
3. If you see ✅ Yes, you're ready!
4. If you see ❌ No, check your `.env` file

---

## Detailed Walkthrough (With Screenshots)

### What You'll See

**1. Console Home Page**
```
┌─────────────────────────────────────────┐
│  Anthropic Console                      │
├─────────────────────────────────────────┤
│  ☰ Dashboard                            │
│  🔑 API Keys        ← Click here        │
│  📊 Usage                               │
│  ⚙️  Settings                           │
│  💳 Billing                             │
└─────────────────────────────────────────┘
```

**2. API Keys Page**
```
┌─────────────────────────────────────────┐
│  API Keys                 [Create Key]  │
├─────────────────────────────────────────┤
│  Name            Created      Actions   │
│  ─────────────────────────────────────  │
│  (Your keys will appear here)           │
└─────────────────────────────────────────┘
```

**3. Create Key Dialog**
```
┌─────────────────────────────────────────┐
│  Create API Key                         │
├─────────────────────────────────────────┤
│  Name: [Chatita Development          ]  │
│                                         │
│  [ Cancel ]            [ Create Key ]  │
└─────────────────────────────────────────┘
```

**4. Key Created (COPY NOW!)**
```
┌─────────────────────────────────────────┐
│  API Key Created                        │
├─────────────────────────────────────────┤
│  ⚠️  Save this key now!                 │
│  You won't be able to see it again.    │
│                                         │
│  sk-ant-api03-AbCdEf12...   [Copy]     │
│                                         │
│  [ Done ]                               │
└─────────────────────────────────────────┘
```

---

## Free Credits

### What You Get
- **New accounts** receive free credits for testing
- Enough for building and testing your hackathon project
- No credit card required initially

### Checking Your Balance
1. Go to https://console.anthropic.com
2. Look at the top right corner
3. You'll see your credit balance
4. Click on it for detailed usage

### If You Run Out
- Add payment information in the Billing section
- Pay-as-you-go pricing
- Check current rates: https://www.anthropic.com/api

---

## Managing Your Keys

### Viewing All Keys
- URL: https://console.anthropic.com/settings/keys
- See all your API keys
- Check creation dates
- Monitor which keys are active

### Revoking a Key
If your key is compromised:
1. Go to API Keys page
2. Find the compromised key
3. Click the "Revoke" or "Delete" button
4. Confirm the action
5. Create a new key immediately

### Best Practices

**✅ DO:**
- Create separate keys for different projects
- Use different keys for development vs production
- Name your keys descriptively
- Revoke unused keys
- Monitor usage regularly

**❌ DON'T:**
- Share keys between projects
- Use production keys in development
- Share keys with others
- Post keys in public places
- Keep unused keys active

---

## Troubleshooting

### "Invalid API Key" Error

**Possible causes:**
1. Key was copied incorrectly (missing characters)
2. Extra spaces before/after the key
3. Key was revoked in the Console
4. Using the wrong key format

**Solution:**
```bash
# Check your .env file
cat backend/.env

# Key should look like:
# ANTHROPIC_API_KEY=sk-ant-api03-xxxxx...

# No quotes needed
# No spaces
# No line breaks
```

### "Insufficient Credits" Error

**Solution:**
1. Check your balance in Console
2. Add payment information if needed
3. Or wait for credits to refresh (if on free tier)

### Can't See the Key After Creating It

**This is normal!** Keys are shown only once for security.

**Solution:**
1. Create a new key
2. Copy it immediately
3. Store it securely
4. Revoke the old key you couldn't copy

### Key Not Working

**Checklist:**
- [ ] Copied the entire key (starts with `sk-ant-api03-`)
- [ ] No extra spaces or characters
- [ ] Saved in correct location (`backend/.env`)
- [ ] Restarted the backend after adding key
- [ ] Key not revoked in Console

---

## Security Reminders

### Treat Your API Key Like a Password

**Your API key:**
- ✅ Gives access to your Anthropic account
- ✅ Can incur charges if used
- ✅ Can be used by anyone who has it
- ✅ Cannot be recovered if lost (must create new)

### If Your Key is Exposed

**Act immediately:**
1. Go to https://console.anthropic.com/settings/keys
2. Revoke the compromised key
3. Create a new key
4. Update your `.env` file
5. Review recent usage for unauthorized access
6. Consider rotating all keys as a precaution

### Where Keys Can Be Exposed

**Common mistakes:**
- Committing `.env` to GitHub
- Sharing screenshots with Terminal open
- Pasting into chat/forums for debugging
- Hardcoding in source files
- Leaving in comments
- Sending via email/Slack

**Always:**
- Keep keys in `.env` files only
- Never commit `.env` to git
- Use `.env.example` as template
- Double-check before sharing code

---

## Quick Reference

| Action | URL |
|--------|-----|
| Sign up | https://console.anthropic.com |
| Get API key | https://console.anthropic.com → API Keys → Create |
| Manage keys | https://console.anthropic.com/settings/keys |
| Check usage | https://console.anthropic.com → Usage |
| View pricing | https://www.anthropic.com/api |
| Documentation | https://docs.anthropic.com/ |

---

## Need Help?

**Common Questions:**

**Q: Do I need a credit card to get an API key?**
A: No! New accounts get free credits. You only need payment info when you want to add more credits.

**Q: How long does it take to get approved?**
A: Account creation is instant! You can get your API key immediately after signing up.

**Q: Can I use the same key for multiple projects?**
A: Yes, but it's better to create separate keys for easier management and security.

**Q: What happens if I lose my key?**
A: You cannot recover it. You must create a new key and update your project.

**Q: Is the free tier enough for the hackathon?**
A: Yes! Free credits are sufficient for development and testing your hackathon project.

---

**Ready to go?**

Head to https://console.anthropic.com and get your key in 2 minutes! 🚀

Then come back and continue with the setup guide.

---

*Need more help? Check `SETUP_GUIDE.md` for complete setup instructions.*
