# Chatita Backend

Node.js + Express backend with Claude API integration for the Chatita diabetes companion app.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your Anthropic API key

# Start development server
npm run dev
```

Server will start on http://localhost:3000

## 🔑 Environment Variables

Create a `.env` file with:

```env
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

Get your API key from: https://console.anthropic.com

## 📡 API Endpoints

### Health Check
```
GET /health
```
Verify server is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Chatita Backend is running",
  "timestamp": "2025-01-09T12:00:00.000Z"
}
```

### Analyze Menu (Claude Vision)
```
POST /api/analyze-menu
```
Analyze restaurant menu photo using Claude Vision API.

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `menuImage` (file): Menu photo (JPEG, PNG, GIF)
  - `language` (string, optional): 'en' or 'es' (default: 'en')
  - `userPreferences` (string, optional): User's cravings or preferences

**Response:**
```json
{
  "success": true,
  "analysis": {
    "recommendations": [
      {
        "dishName": "Grilled Chicken Salad",
        "reason": "High in protein, low in carbs...",
        "tips": ["Eat vegetables first", "Ask for dressing on the side"],
        "warnings": ["Skip the croutons"]
      }
    ],
    "generalAdvice": "Mija, these are great choices..."
  },
  "timestamp": "2025-01-09T12:00:00.000Z"
}
```

### Generate Insights (Claude Text)
```
POST /api/generate-insights
```
Generate weekly insights from user health data.

**Request:**
```json
{
  "meals": [
    {
      "id": "1",
      "name": "Breakfast",
      "timestamp": "2025-01-09T08:00:00.000Z"
    }
  ],
  "glucoseReadings": [
    {
      "value": 120,
      "timestamp": "2025-01-09T09:00:00.000Z",
      "unit": "mg/dL"
    }
  ],
  "moodEntries": [
    {
      "mood": "happy",
      "timestamp": "2025-01-09T10:00:00.000Z"
    }
  ],
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "insights": {
    "insights": [
      {
        "title": "Great Week!",
        "message": "Mija, you logged meals 5 times this week...",
        "type": "positive",
        "icon": "🎉"
      }
    ]
  },
  "timestamp": "2025-01-09T12:00:00.000Z"
}
```

## 🏗️ Architecture

```
src/
├── routes/          # API route handlers
│   ├── analyzeMenu.ts
│   └── generateInsights.ts
├── services/        # Business logic
│   └── claudeService.ts
└── index.ts         # Express server setup
```

## 🤖 Claude API Integration

### Vision API (Menu Analysis)
- Model: `claude-sonnet-4-20250514`
- Uses image analysis capabilities
- Bilingual grandmother persona prompts
- Returns structured JSON recommendations

### Text API (Weekly Insights)
- Model: `claude-sonnet-4-20250514`
- Analyzes patterns in user data
- Generates personalized insight cards
- Encouraging, caring tone

## 🔒 Security

- CORS enabled for frontend access
- File upload size limit: 10MB
- File type validation (images only)
- Temporary file cleanup after processing
- API key stored in environment variables

## 📁 File Uploads

Uploaded files are stored temporarily in `uploads/` directory and deleted after processing.

Supported formats:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)

## 🧪 Testing

### Test Health Endpoint
```bash
curl http://localhost:3000/health
```

### Test Claude API Connection
```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'
```

## 🐛 Troubleshooting

**"Claude API Key not configured"**
- Check `.env` file exists
- Verify API key is correct
- Restart the server after adding key

**"Port 3000 already in use"**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port in .env
PORT=3001
```

**"Module not found"**
```bash
npm install
```

**"CORS errors"**
- CORS is pre-configured for all origins in development
- For production, restrict to your domain

## 📊 API Rate Limits

Claude API has rate limits. Monitor your usage at:
https://console.anthropic.com

For the hackathon demo:
- Menu analysis: ~15-30 seconds per request
- Insights generation: ~10-20 seconds per request

## 🚀 Production Deployment

### Build TypeScript
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables for Production
```env
ANTHROPIC_API_KEY=your_production_key
PORT=3000
NODE_ENV=production
```

### Recommended Hosting
- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## 📄 License

MIT License

## 💙 About

Backend service for **Chatita**, providing Claude API integration for menu analysis and health insights generation.

Chatita is named after my grandmother "Chata," who continues to navigate diabetes daily. This backend powers an app designed to help people living with diabetes feel less alone, more informed, and more capable - using AI to provide compassionate, actionable guidance in everyday moments.

Built with love for the Anthropic Hackathon.
