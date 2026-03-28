# LifeOS Landing Page

Decision OS for Entrepreneurs & Thought Leaders
Powered by **Causal Knowledge Graphs** + **Hybrid AI** + **PMAS Framework**

---

## 🚀 Deploy Now (One Click)

Choose your platform and deploy in 1 minute:

### **Vercel (Recommended - Fastest)**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/markslavinmarkslavin/lifeos-landing&project-name=lifeos-landing&repo-name=lifeos-landing)

Or run locally:
```bash
npm install
node deploy.js vercel
```

### **Netlify**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/markslavinmarkslavin/lifeos-landing)

Or run locally:
```bash
npm install
node deploy.js netlify
```

---

## ✨ Features

- **Dark Theme Design** - Premium aesthetics (Dan Brown inspired)
- **Waitlist API** - Captures early adopters
- **Email Validation** - Built-in form validation
- **CORS Enabled** - Production-ready API
- **Auto-Deploy** - Push to GitHub = instant live update
- **HTTPS** - Free SSL certificate included

---

## 📁 Project Structure

```
lifeos-landing/
├── index.html                 # Main landing page
├── styles.css                 # Tailwind-based styling
├── netlify/functions/
│   └── waitlist.js            # Netlify serverless function
├── netlify.toml               # Netlify config
├── vercel.json                # Vercel config
├── package.json               # Dependencies
└── README.md                  # This file
```

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run local dev server (Netlify)
npm run dev

# Deploy to production
npm run build
git push origin master
```

---

## 📊 API Endpoints

### POST `/api/waitlist`
Submit email to waitlist

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "Founder",
  "challenge": "Scaling operations"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to LifeOS early access!"
}
```

### GET `/api/waitlist/stats`
Get waitlist statistics (demo mode)

---

## 🌍 Deployed Sites

- **Vercel:** https://lifeos-landing-xyz.vercel.app
- **Netlify:** https://lifeos-landing-xyz.netlify.app

(Replace `xyz` with your actual deployment)

---

## 📝 Environment Variables

For production database integration (optional):

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎯 Next Steps

1. **Deploy** - Click deploy button above
2. **Test Form** - Submit test email
3. **Monitor** - Check deployment logs
4. **Scale** - Add real database (Supabase, PostgreSQL, etc.)
5. **Monetize** - Launch SaaS MVP

---

Built with ❤️ by Mark Slavin
