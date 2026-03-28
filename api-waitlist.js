/**
 * Simple Waitlist API for LifeOS Landing Page
 * Node.js + Express
 *
 * Usage:
 * node api-waitlist.js
 *
 * Then POST to http://localhost:3000/api/waitlist
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Waitlist file (local storage)
const WAITLIST_FILE = path.join(__dirname, '../../logs', 'waitlist-2026.jsonl');

// Ensure directory exists
const waitlistDir = path.dirname(WAITLIST_FILE);
if (!fs.existsSync(waitlistDir)) {
  fs.mkdirSync(waitlistDir, { recursive: true });
}

// Email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// POST /api/waitlist
app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: 'Valid email required'
    });
  }

  // Check if email already exists
  if (fs.existsSync(WAITLIST_FILE)) {
    const entries = fs.readFileSync(WAITLIST_FILE, 'utf-8')
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));

    if (entries.some(e => e.email === email)) {
      return res.status(409).json({
        success: false,
        error: 'Email already on waitlist'
      });
    }
  }

  // Append to waitlist
  const entry = {
    email,
    timestamp: new Date().toISOString(),
    source: 'landing-page'
  };

  fs.appendFileSync(WAITLIST_FILE, JSON.stringify(entry) + '\n');

  // Log event
  console.log(`✅ Waitlist signup: ${email} (${new Date().toLocaleString('de-DE')})`);

  res.json({
    success: true,
    message: 'Welcome to early access!'
  });
});

// GET /api/waitlist/stats (internal only)
app.get('/api/waitlist/stats', (req, res) => {
  if (!fs.existsSync(WAITLIST_FILE)) {
    return res.json({ count: 0, emails: [] });
  }

  const entries = fs.readFileSync(WAITLIST_FILE, 'utf-8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => JSON.parse(line));

  res.json({
    count: entries.length,
    emails: entries.map(e => e.email),
    lastSignup: entries[entries.length - 1]?.timestamp
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 LifeOS Waitlist API running on http://localhost:${PORT}`);
  console.log(`📊 Stats: GET /api/waitlist/stats`);
  console.log(`📧 Signup: POST /api/waitlist`);
});
