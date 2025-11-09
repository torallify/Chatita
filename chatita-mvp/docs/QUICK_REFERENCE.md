# ⚡ Chatita Quick Reference Card

## 🔑 Getting Anthropic API Key

**URL:** https://console.anthropic.com

**Steps:**
1. Sign up/Log in
2. Click "API Keys"
3. Click "Create Key"
4. Name it: "Chatita Development"
5. Copy key (starts with `sk-ant-api03-...`)
6. Save immediately (shown only once!)

**Key format:** `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🚀 Quick Setup

```bash
# Backend
cd chatita-mvp/backend
npm install
cp .env.example .env
# Edit .env with your API key
npm run dev

# Frontend (new terminal)
cd chatita-mvp/app
npm install
npx expo start
# Press 'i' for iOS or 'a' for Android
```

---

## 📍 Important Links

| Resource | URL |
|----------|-----|
| Get API Key | https://console.anthropic.com |
| Manage Keys | https://console.anthropic.com/settings/keys |
| Check Usage | https://console.anthropic.com → Usage |
| Documentation | https://docs.anthropic.com/ |
| Project Repo | (Your GitHub URL) |

---

## 🔒 Security Reminders

**✅ DO:**
- Keep API key in `.env` file
- Use different keys for dev/prod
- Revoke compromised keys immediately

**❌ NEVER:**
- Commit `.env` to git
- Share keys in screenshots
- Hardcode keys in source files
- Post keys in forums/chat

---

## 🐛 Troubleshooting

**"Cannot connect to backend"**
```bash
curl http://localhost:3000/health
```

**"Claude API error"**
- Check API key in `backend/.env`
- Verify format: `sk-ant-api03-...`
- Check credits at console.anthropic.com

**"Module not found"**
```bash
rm -rf node_modules && npm install
```

---

## 📱 Demo Checklist

Before presenting:
- [ ] Backend running (Terminal 1)
- [ ] Frontend running (Terminal 2)
- [ ] Sample menu photo ready
- [ ] API key has credits
- [ ] Backup screenshots ready
- [ ] 2-minute pitch practiced

---

## 🎯 Key Features to Demo

1. **Menu Analysis** (60 sec) - The killer feature!
2. **Weekly Insights** (20 sec)
3. **Language Toggle** (10 sec)

---

**Need help?** Check `docs/API_KEY_SETUP.md` for detailed instructions!
