/**
 * Vercel Serverless Function: Waitlist API
 * POST /api/waitlist - Add email to waitlist
 * GET /api/waitlist - Get waitlist stats (for admin)
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client (use env vars in production)
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST /api/waitlist
  if (req.method === 'POST') {
    const { email, name, role, challenge } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email required'
      });
    }

    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();

      if (existing) {
        return res.status(409).json({
          success: false,
          error: 'Email already on waitlist'
        });
      }

      // Insert new entry
      const { error } = await supabase.from('waitlist').insert({
        email: email.toLowerCase(),
        name: name || null,
        role: role || null,
        challenge: challenge || null,
        created_at: new Date().toISOString(),
        source: 'landing-page'
      });

      if (error) {
        console.error('Supabase error:', error);
        // If Supabase not configured, log and return success for demo
        console.log(`[DEMO] Waitlist signup: ${email}`);
        return res.json({
          success: true,
          message: 'Welcome to early access! (Demo mode)',
          demo: true
        });
      }

      console.log(`✅ Waitlist signup: ${email}`);
      return res.json({
        success: true,
        message: 'Welcome to early access!'
      });

    } catch (error) {
      console.error('Server error:', error);
      // Fallback for demo mode
      console.log(`[DEMO] Waitlist signup: ${email}`);
      return res.json({
        success: true,
        message: 'Welcome to early access! (Demo mode)',
        demo: true
      });
    }
  }

  // GET /api/waitlist/stats
  if (req.method === 'GET' && req.url.includes('stats')) {
    try {
      const { data, count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact' });

      return res.json({
        count: count || 0,
        lastSignup: data?.[data.length - 1]?.created_at
      });
    } catch (error) {
      return res.json({ count: 0, error: 'Database not configured' });
    }
  }

  return res.status(404).json({ error: 'Not found' });
};
