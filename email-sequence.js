/**
 * LifeOS Waitlist Email Sequence
 * Auto-send emails at key milestones
 *
 * Requires: Sendgrid API or similar
 * Usage: Triggered on signup from api-waitlist.js
 */

const emailSequence = [
  {
    id: 'welcome',
    triggerDays: 0,
    subject: 'Welcome to LifeOS — Here\'s Your Early Access',
    template: `Hi there,

You're in! 🎉

You're one of the first 100 early adopters of LifeOS — the only decision system that combines proven methodology (PMAS v2 + RAPID), hybrid AI privacy (local + cloud routing), and predictive risk chains.

What you get:
✅ Lifetime 20% discount (€23/mo instead of €29)
✅ Free RAPID template pack (€99 value)
✅ 1:1 onboarding call (optional, 30 min)

Quick wins to start:
- Watch the 5-min demo: [link to video]
- Read the case study: How I turned a housing crisis into a 20-minute decision
- Try beta (opens April 10): [beta link]

Questions? Reply to this email.

See you soon,
Mark

P.S. We're launching in May. First users get priority support.`
  },
  {
    id: 'casestudy',
    triggerDays: 3,
    subject: 'The 20-Minute Decision That Changed Everything',
    template: `Hi there,

Real example: My housing crisis.

Three weeks ago, I faced a complex decision: apply for WBS (government housing subsidy)? Risk: bureaucratic rejection, lost time. Gain: €200/month buffer, housing security.

Old way (before LifeOS):
- Day 1: Panic, research for 3 hours
- Day 2: Call lawyer, long emotional talk with partner
- Day 3: Still unsure, slept poorly, low confidence (65%)
- Total: 6–7 hours of stress spread over 3 days

With PMAS v2 + RAPID (LifeOS):
- 20 minutes: Structured decision framework
- 1 page of notes: F1/F2/F3 scores, causal chains, 3 action paths
- Clear recommendation: Apply (with fallback)
- Final: 95% confidence, zero anxiety
- Action: Called next morning, WBS in motion

The system doesn't remove the decision. It removes the **paralysis**.

This is what you get with LifeOS.

Deep dive: [Full case study PDF]

Ready to see it in action? Try beta (April 10): [link]

Mark`
  },
  {
    id: 'beta_launch',
    triggerDays: 10,
    subject: 'Beta is Live — Try LifeOS Free for 14 Days',
    template: `Hi there,

Beta is live! 🚀

You asked for it. We built it. Now test it.

14-day free trial (Professional plan, full access):
✅ Dashboard + heute.js daily planner
✅ Hybrid AI router (local + cloud)
✅ RAPID decision templates
✅ Causal Knowledge Graph
✅ Priority support (email, 24h response)

Start here: [beta.lifeos.dev]
No credit card required.

What we want from you:
- Use it for 3–5 real decisions
- Tell us what breaks (feedback)
- Share if it saves you time/stress

Bugs and feature requests: feedback@lifeos.dev

P.S. We're also starting consulting (implement PMAS in your team/org). If interested: [calendly link]

See you in beta,
Mark`
  },
  {
    id: 'pricing_launch',
    triggerDays: 21,
    subject: 'LifeOS is Now Live — Lock In Your Lifetime Discount',
    template: `Hi there,

LifeOS is officially live. 🎉

You've been with us since early access. Here's what's changed:
✅ Beta feedback integrated (UI faster, 3 new templates)
✅ Pricing live: Personal €29/mo, Professional €79/mo
✅ Your discount: Still 20% off (€23 or €63/mo, lifetime)

Three ways to use LifeOS:

**1. DIY (Self-Service)**
Personal plan (€29/mo) — you + your decisions. No support.

**2. Guided (Most Popular)**
Professional plan (€79/mo) — dashboard + weekly coaching calls + template library.

**3. Full Transformation (Teams)**
Business plan (€500/mo) — dedicated setup, your org, white-label option.

Which fits you?
[Personal] [Professional] [Business]

Or just hit reply — let's chat.

Mark

P.S. Early access discount expires May 31. Lock it in now: [link]`
  },
  {
    id: 'case_customer',
    triggerDays: 35,
    subject: 'Success Story: How Elena Cut Decision Time by 80%',
    template: `Hi there,

New case study from our beta:

Elena runs a small marketing agency. She was drowning in decisions:
- Client priorities (who to focus on?)
- Hire vs outsource? (€50K decision)
- New service line? (6-month research vs rapid pilot?)

3 months with LifeOS:
- PMAS framework inside her team (alignment)
- RAPID templates for quick decisions (hiring decision: 30 min vs 2 weeks)
- Knowledge graph of her clients (cascade risk: if she loses Client X → revenue drop → can't hire)

Result: 80% less decision overhead, team happier, faster pivots.

Read the full story: [link]

Your story could be next. Using LifeOS for a real decision?
Reply with your case study (we'll anonymize if needed) → featured in our newsletter.

Mark`
  }
];

module.exports = emailSequence;
