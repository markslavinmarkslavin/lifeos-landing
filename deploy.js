#!/usr/bin/env node

/**
 * LifeOS Deploy Script
 * Opens browser with Vercel deploy link
 * One click → instant deployment
 */

const { spawn } = require('child_process');

const deployUrls = {
  vercel: 'https://vercel.com/new/clone?repository-url=https://github.com/markslavinmarkslavin/lifeos-landing&project-name=lifeos-landing&repo-name=lifeos-landing',
  netlify: 'https://app.netlify.com/start/deploy?repository=https://github.com/markslavinmarkslavin/lifeos-landing'
};

const provider = process.argv[2] || 'vercel';

console.log(`🚀 Opening ${provider.toUpperCase()} deploy portal...`);
console.log(`📖 Instructions:`);
console.log(`   1. Authorize with GitHub when prompted`);
console.log(`   2. Click "Deploy" or "Connect & Deploy"`);
console.log(`   3. Wait 1-2 minutes for deployment`);
console.log(`   4. Your site will be live! 🎉`);
console.log('');

// Open browser - platform specific
if (process.platform === 'win32') {
  spawn('start', [deployUrls[provider]], { shell: true });
} else if (process.platform === 'darwin') {
  spawn('open', [deployUrls[provider]]);
} else {
  spawn('xdg-open', [deployUrls[provider]]);
}

setTimeout(() => {
  console.log(`✅ Browser should open. If not, copy this URL:`);
  console.log(`   ${deployUrls[provider]}`);
}, 1000);
