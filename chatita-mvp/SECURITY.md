# 🔒 Security Guidelines for Chatita

## ⚠️ IMPORTANT: Protecting Sensitive Information

### Never Commit These Files

**NEVER commit files containing:**
- ✅ `.env` files (contains API keys)
- ✅ Any file with "secret" or "credential" in the name
- ✅ API keys or tokens
- ✅ Database passwords
- ✅ Private keys (.key, .p12, .p8 files)
- ✅ Authentication credentials
- ✅ User data or PII (Personally Identifiable Information)

### Files Protected by .gitignore

The project has multiple .gitignore files to protect:

```
/Chatita/.gitignore              # Root level protection
/chatita-mvp/.gitignore          # Project level protection
/chatita-mvp/backend/.gitignore  # Backend protection
/chatita-mvp/app/.gitignore      # App protection
```

### Anthropic API Key Security

#### How to Get Your API Key

1. **Visit:** https://console.anthropic.com
2. **Sign up/log in** with your email
3. **Navigate** to "API Keys" in the sidebar
4. **Create** a new key (give it a name like "Chatita Development")
5. **Copy** the key immediately (shown only once!)
6. **Save** it in `backend/.env` file

**Key Format:**
- Starts with: `sk-ant-api03-`
- Followed by a long random string
- Example: `sk-ant-api03-AbCdEf123456...`

#### Where Your API Key Should Be

**✅ SAFE Locations:**
- `backend/.env` file (local development only)
- Environment variables on hosting platform (production)
- Secure password manager (backup copy)

**❌ NEVER Put API Keys Here:**
- Hardcoded in source files (`.ts`, `.js`, `.tsx`)
- Committed to git (GitHub, GitLab, etc.)
- In screenshots or screen recordings
- Posted in Discord/Slack/forums/Stack Overflow
- In error messages or logs
- In frontend code (React components)
- In comments in your code

### Before Your First Commit

**Checklist:**
- [ ] Created `.env` file in `backend/` directory
- [ ] Added your ANTHROPIC_API_KEY to `.env`
- [ ] Verified `.env` is listed in `.gitignore`
- [ ] Checked that `.env` doesn't show in `git status`
- [ ] Never added `.env` with `git add`

### Verify Nothing Sensitive is Staged

Before committing, always check:

```bash
# See what files are staged
git status

# See what content is staged
git diff --cached

# If you see .env or secrets, STOP!
# Unstage them immediately:
git reset HEAD .env
git reset HEAD backend/.env
```

### If You Accidentally Committed Secrets

**If you committed an API key, act IMMEDIATELY:**

1. **Revoke the key:**
   - Go to https://console.anthropic.com
   - Delete the compromised API key
   - Generate a new one

2. **Remove from git history:**
   ```bash
   # If it was the last commit
   git reset --soft HEAD~1
   git reset HEAD .env
   git commit -m "Your commit message"

   # For older commits, consider:
   # - Using git filter-branch (complex)
   # - Starting a fresh repository (simpler)
   ```

3. **Update your local .env with new key**

4. **Consider the key compromised forever** - rotate it even if you remove it from git

### Environment Variables Setup

**For local development:**
```bash
cd backend
cp .env.example .env
# Edit .env with your actual API key
```

**For production deployment:**
Use your hosting platform's environment variable system:
- Heroku: `heroku config:set ANTHROPIC_API_KEY=xxx`
- Railway: Settings → Variables
- Render: Environment tab
- Vercel: Settings → Environment Variables

### File Upload Security

The backend accepts image uploads. Protections in place:
- ✅ File type validation (images only)
- ✅ File size limit (10MB)
- ✅ Temporary storage (files deleted after processing)
- ✅ Uploads folder in .gitignore

**Never commit the `uploads/` directory.**

### User Data Privacy

The app stores data locally on the device:
- ✅ No user authentication required
- ✅ No cloud sync (hackathon MVP)
- ✅ Data stays on user's device
- ✅ No tracking or analytics

**For future versions, consider:**
- Encryption at rest
- HIPAA compliance (if handling health data)
- Data deletion/export features
- Privacy policy

### Demo Safety

**During hackathon demo:**
- ✅ Use a demo API key (not your main key)
- ✅ Hide terminal showing environment variables
- ✅ Don't screenshot backend/.env
- ✅ Use sample data, not real health data
- ✅ Clear sensitive data after demo

### Code Review Checklist

Before pushing code, verify:
- [ ] No hardcoded API keys
- [ ] No console.log of sensitive data
- [ ] No commented-out secrets
- [ ] No TODO with credentials
- [ ] .gitignore includes all sensitive patterns

### Reporting Security Issues

If you find a security vulnerability:
1. **DO NOT** open a public GitHub issue
2. Email the maintainer directly
3. Include details of the vulnerability
4. Wait for acknowledgment before disclosure

### Best Practices

**Do:**
- ✅ Use environment variables for all secrets
- ✅ Keep .gitignore up to date
- ✅ Use .env.example as a template
- ✅ Rotate API keys regularly
- ✅ Use different keys for dev/production
- ✅ Monitor API usage for anomalies

**Don't:**
- ❌ Commit .env files
- ❌ Share API keys via chat/email
- ❌ Use production keys in development
- ❌ Hardcode secrets in code
- ❌ Store secrets in comments
- ❌ Push secrets to public repos

### Quick Reference: What's Protected

| File/Pattern | Protected | Why |
|--------------|-----------|-----|
| `.env` | ✅ Yes | Contains API keys |
| `backend/.env` | ✅ Yes | Contains API keys |
| `uploads/` | ✅ Yes | May contain user data |
| `node_modules/` | ✅ Yes | Large, regenerable |
| `.DS_Store` | ✅ Yes | OS metadata |
| `dist/` | ✅ Yes | Build artifacts |
| `*.log` | ✅ Yes | May contain sensitive info |
| `.vscode/` | ✅ Yes | Personal IDE settings |
| `*.key` | ✅ Yes | Private keys |
| `.env.example` | ❌ No | Template only, no secrets |
| `package.json` | ❌ No | Safe to commit |
| `README.md` | ❌ No | Documentation |

### Emergency Contacts

**If you suspect a security breach:**
1. Revoke compromised credentials immediately
2. Rotate all API keys
3. Review git history for leaked secrets
4. Check API usage logs for unauthorized activity
5. Document the incident

---

## 🛡️ Remember

**Security is not a one-time setup - it's an ongoing practice.**

- Review this document before each commit
- Keep .gitignore updated
- Never trust "I'll remove it later"
- When in doubt, don't commit it

**Your API key is like a password - treat it that way!**

---

*Stay secure! 💙*
