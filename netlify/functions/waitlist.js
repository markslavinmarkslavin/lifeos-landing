/**
 * Netlify Function: Waitlist API
 * Accepts email signups and stores them (demo mode logs to console)
 */

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// In-memory storage for demo (replace with DB in production)
const waitlist = new Set();

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // POST /api/waitlist
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { email, name, role, challenge } = body;

      if (!email || !isValidEmail(email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Valid email required'
          })
        };
      }

      // Check if already exists
      if (waitlist.has(email.toLowerCase())) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Email already on waitlist'
          })
        };
      }

      // Add to waitlist
      waitlist.add(email.toLowerCase());
      const timestamp = new Date().toISOString();

      console.log(`✅ Waitlist signup: ${email} | Name: ${name} | Role: ${role} | At: ${timestamp}`);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: `Welcome to LifeOS early access, ${name || 'friend'}!`,
          email: email.toLowerCase(),
          timestamp: timestamp
        })
      };
    } catch (error) {
      console.error('Error:', error.message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Server error'
        })
      };
    }
  }

  // GET /.netlify/functions/waitlist/stats
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        count: waitlist.size,
        message: 'Waitlist stats (demo mode - resets on redeploy)'
      })
    };
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: 'Not found' })
  };
};
