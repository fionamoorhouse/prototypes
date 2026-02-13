# HelloFresh Viral-First Social Ecosystem — Umbrella PRD

## Purpose of This Document

This is the umbrella PRD for HelloFresh's shift from a transactional referral program to a social ecosystem that generates organic virality. It defines the unified vision, the two workstreams (Team A: Gifting Engine, Team B: Social Hub), how they interconnect, and the shared primitives they rely on.

This document does **not** replace the detailed feature PRDs — it sits above them. For the Personalized RAF and Frictionless Redemption flows that are already specced, see [hellofresh-raf/v1-intent.md](./v1-intent.md). Future feature briefs for Meal Train, Community Feed, Scorecards, etc. will reference this umbrella for shared context.

---

## Problem Statement

HelloFresh's current Refer-a-Friend (RAF) program is the company's only virality mechanism, and it's broken in three ways:

1. **It's transactional, not emotional.** The program leads with the referrer's reward ("Get $35 off"), sends corporate-templated messages via third-party bots (Charles), and strips out personal connection. Sharing feels like doing HelloFresh's marketing job, not helping a friend.

2. **It's the only sharing surface.** There's no social layer in the product. Customers cook 3–5 meals a week with HelloFresh but have nowhere to share what they're making, celebrate milestones, or connect with other home cooks. Every "happy moment" (a great meal, a streak, a nutrition win) evaporates without a channel for expression.

3. **Redemption is a trap.** The friend's experience requires configuring a meal plan, entering credit card details, and accepting auto-renewal terms — for what was framed as a "free" box. The disconnect between promise and experience kills trust and conversion.

**The result:** HelloFresh has a large, engaged customer base that cooks frequently and enjoys the product — but no mechanism to convert that satisfaction into organic growth. Virality is forced through corporate nudges rather than enabled through genuine social behavior.

## The Vision

Build a social ecosystem centered on two complementary pillars:

```
┌──────────────────────────────────────────────────────────────┐
│                      USER JOURNEY                             │
│                                                               │
│   Cook a meal → Share the moment → Get feedback & likes       │
│       ↓                                                       │
│   Build identity → Earn badges, streaks, stats                │
│       ↓                                                       │
│   Feel connected → Join communities, participate in challenges│
│       ↓                                                       │
│   Cook more → Deeper engagement → More sharing                │
│                                                               │
│   ── At natural moments of generosity ──                      │
│   Gift a box to a friend → Friend joins → Friend cooks        │
│       → Friend shares → Community grows                       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**The Social Hub (primary value driver):** A social layer where cooking generates shareable content — scorecards, badges, prompted photos, community feeds — that drives engagement, retention, and organic impressions. This is the beating heart of the ecosystem. When people feel part of a cooking community, they cook more, engage more, and naturally talk about HelloFresh to the people around them. The community and social features are the major benefit — they make HelloFresh sticky and personally meaningful, not just a delivery service.

**The Gifting Engine (acquisition driver):** A reimagined RAF where sharing is personal, gifting is altruistic, and redemption is frictionless. Extended with Meal Train for group gifting during life moments. Gifting is an important part of the product, but it's not the centerpiece — it's a natural extension of the social ecosystem. When users are deeply engaged, some of that goodwill naturally converts into referrals.

The two pillars are complementary: the Social Hub builds the engagement and emotional connection that makes users *want* to share HelloFresh with friends. The Gifting Engine makes it easy to act on that impulse when it naturally arises. But the Social Hub succeeds on its own terms — driving retention, cooking frequency, and brand affinity — regardless of whether it leads to referrals.

## Design Principles

These principles govern every feature across both teams:

1. **Community first.** The social features — feed, communities, badges, scorecards — are the primary value. They make HelloFresh personally meaningful and sticky. Referrals are a natural byproduct of engagement, not the goal of every interaction.

2. **Lead with the gift, not the reward.** When gifting does happen, never lead with "Get $35." Always lead with "Give a Box." Frame sharing around the benefit to the recipient, not the referrer's incentive.

3. **Remove the "I'm a subscriber" barrier.** Every recipient-facing experience must feel like receiving a gift, not entering a sales funnel. No credit card upfront, no auto-renewal, no subscription pressure.

4. **Contextual nudges at happy moments.** Trigger sharing prompts after moments of genuine satisfaction (a 4 or 5-star recipe rating, a cooking streak milestone, a nutrition achievement) — not at checkout, not on every app open, not via weekly spam.

5. **The message comes from the person, not the company.** Whether it's a referral, a meal photo, or a scorecard share — the content arrives in the recipient's world as something from a real person they know.

6. **Identity fuels sharing.** People share things that say something about who they are. Badges, personas, and stats give users a cooking identity worth expressing.

7. **Share anywhere, from intimate to public.** Users choose their audience: a private friends group, a community team, or the global feed. The social features support both intimate sharing and public broadcasting — the choice is the user's, and the default adapts to their comfort level.

---

## Architecture: Two Hubs

### Team A: Gifting Engine (Transactional Virality)

**Mission:** Make it effortless and emotionally rewarding to gift HelloFresh experiences to people you care about — and make receiving that gift feel genuinely free.

**Features:**

| Feature | Status | Description |
|---------|--------|-------------|
| **Personalized RAF** | Specced → [v1-intent.md](./v1-intent.md) | Gift-first sharing with personal message composer, AI assist, and contextual nudges at happy moments. Gifting surfaces live within the existing app experience (Profile, contextual nudges) — not in a dedicated tab. |
| **Frictionless Redemption** | Specced → [v1-intent.md](./v1-intent.md) | Friend claims a free box with no credit card, no subscription — just pick meals, enter address, confirm |
| **QR Code Sharing** | New (this doc) | In-person sharing via scannable QR code for offline happy moments |
| **Meal Train** | New (this doc) | Group gifting for life moments — multiple people contribute meals to someone in need |
| **Rewards Integration** | Specced → [v1-intent.md](./v1-intent.md) | Unified Rewards Hub showing loyalty tier, points, referral rewards, and discount bridge |

### Team B: Social Hub (Engagement Virality)

**Mission:** Give HelloFresh customers a social identity around cooking and a community to share it with — generating organic content that drives impressions, retention, and word-of-mouth.

**Features:**

| Feature | Status | Description |
|---------|--------|-------------|
| **Community Feed** | New (this doc) | Activity feed with friends, communities, and global timeline for sharing meals, tips, photos, and achievements |
| **Scorecards** | New (this doc) | Visual, directly shareable personal cooking stats and nutrition insights |
| **Identity Badges** | New (this doc) | Persona-based badges earned through cooking behavior (e.g., "Garlic Lover," "Fiber Champion") |
| **Cooking Moments** | New (this doc) | Prompted photos and commentary at natural cooking moments, shared to the feed, social media, or saved privately |
| **Teams** | New (this doc) | Peloton-style community groups with challenges, shared goals, and mutual encouragement |

---

## Shared Primitives

Both teams depend on these common building blocks:

### User Profile (Extended)

The existing HelloFresh profile is extended with social and identity fields:

```
{
  // Existing
  name, email, avatar, address, subscriptionPlan

  // New — Identity
  displayName: string              // public-facing name (can differ from account name)
  bio: string                      // short personal description
  cookingPersona: string           // algorithmically assigned (e.g., "Veggie Connoisseur")
  badges: Badge[]                  // earned identity badges
  stats: CookingStats              // aggregated cooking data for scorecards

  // New — Social
  friends: UserId[]                // reciprocal connections
  teams: TeamId[]                  // community group memberships
  feedVisibility: 'friends' | 'community' | 'public'  // default sharing scope (user's last-used audience)
  
  // New — Gifting
  invitationsRemaining: number     // available referral credits
  giftHistory: GiftRecord[]        // sent gifts and their status
  mealTrainContributions: MealTrainContribution[]
}
```

### Happy Moment Triggers

A shared event system that both teams consume. When a trigger fires, the orchestration layer decides which nudge (if any) to show — preventing the user from being bombarded.

| Trigger | Source | Team A Response | Team B Response |
|---------|--------|----------------|----------------|
| 4 or 5-star recipe rating | Post-cook | "Share the love — gift a box" nudge (low frequency) | "Snap a photo of what you made" prompt |
| Cooking streak milestone (7, 30, 100 days) | Daily check | — | Streak badge + scorecard share prompt |
| First cook after signup | Post-delivery | Post-cook nudge (gift a friend) | — |
| Nutrition milestone ("100g protein today") | Meal log | — | Scorecard unlock + share prompt |
| Order confirmed | Checkout | — | — (no nudge at checkout — principle #3) |
| Loyalty tier advancement | Points system | Reward upgrade announcement | Badge upgrade + share prompt |
| Meal Train contribution received | Gifting | Thank-you notification | "Your friends came through" feed post |
| Friend joined via your referral | Redemption | Reward granted notification | "[Friend] just joined!" feed story |

**Priority rules:** Only one nudge per session. Social Hub prompts take priority — community engagement is the primary goal. Gifting nudges are shown sparingly and only when the moment is clearly right (e.g., post-first-cook, not every time someone rates a meal). The user should never feel like the social features are a funnel to get them to refer.

### Sharing Infrastructure

Both teams use a shared sharing pipeline:

1. **Content assembly** — The feature creates a shareable payload (message text, image, link, metadata)
2. **Channel selection** — User picks: in-app feed, WhatsApp, iMessage, Instagram Stories, or copy link
3. **Personalization** — The payload is adapted per channel (rich link for messaging, story-formatted for Instagram, card for in-app feed)
4. **Subtle attribution** — Shared content includes a lightweight, non-intrusive link back to HelloFresh (e.g., a small "hellofresh.com/[username]" watermark on scorecard images, or a clean domain link at the bottom of a shared card). This is *not* a "Try HelloFresh FREE!" banner — it's quiet branding that lets curious viewers find their way in without making the sharer feel like they're running an ad for the company.

The Social Hub generates organic content; the Gifting Engine benefits when some of that content naturally drives awareness. But the social sharing experience must feel authentic — the moment it feels like a referral scheme wrapped in social features, users will stop sharing.

---

## Team A: Gifting Engine — Detailed Requirements

### A1. Personalized RAF (Already Specced)

See [v1-intent.md](./v1-intent.md) for the full specification covering:
- Message Composer (personal message with AI assist, photo selection, preview)
- Post-Signup Nudge and Post-Cook Nudge (contextual prompts at happy moments)
- Rewards Hub (unified loyalty + referral + discounts view)
- Friend Claim Flow (pick meals → delivery address → confirm — no payment)

**Changes from v1-intent to align with this umbrella:**

- **No standalone Share Hub or Share tab.** The v1-intent specced a permanent "Share Hub" as a tab in the bottom navigation. Under the umbrella vision, gifting surfaces are contextual — they live within Profile (gifting section, QR code, Meal Train), within the Rewards Hub, and within contextual nudges at happy moments. There is no dedicated gifting tab. This prevents the product from feeling referral-centric and keeps the social features front and center.
- Gifting entry points are: Profile → "Gift a box" / "Start a Meal Train" section, Rewards Hub → referral card, contextual nudges (post-signup, post-cook), and the QR code (accessible from Profile)
- Happy moment triggers expand to include Social Hub events (badge earned, streak milestone) as *occasional* gifting nudge moments — but social prompts take priority
- Shared content from the Social Hub includes subtle HelloFresh branding (see Sharing Infrastructure) but does not include explicit referral CTAs

### A2. QR Code Sharing

**Problem:** Many sharing opportunities happen offline — dinner parties, office lunches, gym conversations — where texting a link feels awkward. Users need a way to share instantly in person.

**Solution:** A personal QR code accessible from the user's Profile that encodes their referral link. Scanning it takes the friend directly to the Claim Landing Page.

**Location:** Inside Profile → "Gift a box" section, as a sharing method alongside text and link options.

**Layout:**
- **Section header:** "Share in person" with a small QR icon
- **QR code card:** White card with the user's personal QR code (centered, ~200px), their display name below it, and "Scan to claim a free HelloFresh box" text
- **"Full screen" button:** Expands the QR code to fill the screen (for easier scanning in dim environments or at a distance)
- **"Save to Wallet" link:** Adds the QR code as a pass to Apple Wallet for quick access without opening the app

**QR destination:** The same Friend Claim Landing Page from v1-intent.md, pre-attributed to the referrer. The friend sees "[Name] is giving you a free HelloFresh box" with the referrer's avatar.

**Edge cases:**
- QR code is unique per user and persistent (doesn't change per invitation)
- Scanning when the user has 0 invitations remaining → the friend sees a waitlist page: "Your friend is getting more invitations — we'll let you know when your box is ready"
- QR code works offline for the scanner (it's just a URL) but the landing page requires internet

### A3. Meal Train

**Problem:** Life events — a new baby, illness recovery, loss of a loved one, a big move — create moments where people want to help but don't know how. Cooking is one of the most universal forms of care, but coordinating meal deliveries among a group of friends is logistically painful.

**Solution:** A "Meal Train" feature where a user can initiate a group gift of HelloFresh boxes for someone going through a life moment. Multiple people contribute, the recipient receives curated boxes over a set period, and it can include a limited-time subscription that automatically ends.

**Entry points:**
- Profile → "Start a Meal Train" card (within the gifting section)
- Rewards Hub → "Gift a Meal Train" option
- Deep link shared by the organizer to invite contributors

#### Screen: Meal Train — Create

**Purpose:** The organizer sets up the Meal Train: who it's for, why, how long, and what to include.

**Layout:**
- **Header:** Back arrow, "Start a Meal Train" title
- **Recipient section:**
  - "Who is this for?" — Name input + optional avatar/photo upload
  - "What's the occasion?" — Preset chips: "New baby," "Recovery," "Bereavement," "Big move," "Just because," "Other" (free text)
- **Gift configuration:**
  - **Duration selector:** "How many weeks?" — Stepper (1–8 weeks), default 4. Each week = one box delivery.
  - **Box size:** "Meals per week" — 3 meals for 2 people (default) / 3 meals for 4 people / 4 meals for 4 people
  - **Meal selection mode:**
    - "Let [recipient name] choose" (default) — recipient picks their own meals each week
    - "Curate a care package" — organizer (and optionally contributors) pre-select meals. A grid of available meals appears for selection. Organizer can add a note per meal ("This one's amazing for busy nights").
  - **Personal message:** Text area for a group message that accompanies the first delivery
- **Cost summary:**
  - Per-week cost, total cost, "Split between X contributors" estimate
  - "Your contribution: [amount]" — updates dynamically as contributors are added
- **CTA:** "Invite contributors" (green, full-width)

**Interactions:**
- Filling in recipient and occasion → enables the gift configuration section
- Selecting "Curate a care package" → expands meal selection grid below
- Tapping "Invite contributors" → transitions to the contributor invitation screen

#### Screen: Meal Train — Invite Contributors

**Purpose:** The organizer invites friends to split the cost and optionally contribute meal selections.

**Layout:**
- **Header:** Back arrow, "Invite friends to contribute"
- **Meal Train summary card:** Recipient name, occasion badge, duration, estimated cost per person (based on current contributor count)
- **Contributor list:**
  - Organizer (you) — shown with checkmark, "Organizer" label, contribution amount
  - "Add contributor" rows — Each has: name/phone input, or "Pick from contacts" button
  - As contributors are added, the per-person cost updates in real time
- **Share link section:** "Or share an invite link" — generates a unique Meal Train invite URL. Contributors who open the link can add themselves and set their contribution amount.
- **Contribution model toggle:**
  - "Split evenly" (default) — total divided equally
  - "Set your own" — each contributor chooses their amount; the organizer covers the remainder
- **CTA:** "Send invitations" (green) — sends invites via the shared message composer (same pipeline as RAF)

#### Screen: Meal Train — Contributor View

**Purpose:** A friend receives an invitation to contribute to a Meal Train and decides how much to give.

**Layout:**
- **Hero card:** "[Organizer name] started a Meal Train for [Recipient name]" with occasion badge and personal message
- **Details:** Duration (e.g., "4 weeks of home-cooked meals"), box size, number of contributors so far, amount still needed
- **Contribution input:** Slider or preset amounts ($25 / $50 / $75 / Custom). The "covers X meals" equivalent is shown.
- **Optional meal picks:** If the organizer chose "Curate a care package," the contributor can optionally add 1–2 meal suggestions with a note
- **Optional personal note:** "Add a message for [Recipient]" — text area
- **Payment:** Standard payment form (card or Apple Pay). This is the one place where payment is required — contributors are buying a gift, not signing up for a subscription.
- **CTA:** "Contribute [amount]" (green)

#### Screen: Meal Train — Recipient Claim

**Purpose:** The recipient learns that friends have organized meals for them and claims their deliveries.

**Layout:**
- **Emotional hero:** Warm illustration + "[Friends] are sending you home-cooked meals" (serif, large)
- **Message card:** The group message from the organizer, with contributor avatars (stacked circles) and names
- **Individual notes:** If contributors added personal notes, they appear as a scrollable card stack
- **What you're getting:**
  - "[X] weeks of HelloFresh boxes"
  - "[Y] meals per week"
  - "Everything you need to cook — delivered to your door"
  - If meals were pre-curated: "Your friends picked these meals for you" with a preview grid. Recipient can swap meals if they have dietary restrictions.
  - If recipient chooses: "Pick your meals each week" with a link to meal selection
- **Delivery details:** Address input (pre-filled if existing customer), first delivery date
- **CTA:** "Claim your meals" (green) — no payment required for the recipient
- **After claim:** Thank-you screen with option to send a group thank-you message back to contributors

#### Meal Train Edge Cases

| Scenario | Behavior |
|----------|----------|
| **Not enough contributions to cover full duration** | Organizer is notified. Options: cover the gap themselves, reduce duration, or send a reminder to contributors. |
| **Recipient is an existing subscriber** | Meal Train boxes are added as bonus deliveries alongside their regular subscription. They choose meals separately for gift boxes. |
| **Recipient never claims** | After 7 days, organizer is notified. After 14 days, contributors are offered a refund or can redirect to a different recipient. |
| **Contributor backs out after committing** | Their contribution is refunded. Other contributors and the organizer are notified, with option to cover the gap. |
| **Meal Train duration ends** | The subscription automatically stops. No action required from the recipient. A gentle prompt appears: "Enjoyed your Meal Train? Start your own subscription" — but no auto-renewal. |
| **Recipient has dietary restrictions** | If meals were pre-curated, recipient can swap any meal for an alternative at claim time. Allergen labels are shown. |
| **Organizer is the sole contributor** | Works fine — this is effectively a "gift subscription" from one person. The Meal Train framing still applies for the emotional wrapper. |

---

## Team B: Social Hub — Detailed Requirements

### B1. Community Feed

**Problem:** HelloFresh customers cook frequently but have no channel to share what they're making, celebrate wins, or connect with other home cooks. Social sharing of HelloFresh content currently requires leaving the app and manually creating posts — high friction, low volume.

**Solution:** An in-app activity feed where users share cooking moments, tips, meal photos, and achievements with their chosen audience (friends, communities, or the world). The feed supports both group-scoped sharing — users share `<content>` with their `<group>` — and a global timeline for broader discovery.

**Entry point:** "Discover" tab in bottom navigation. The Discover tab is the home for all social and community features — the feed, communities, and trending content all live here.

#### Feed Architecture

The feed has multiple views, toggled via tabs at the top:

| Feed view | What it shows | Content source |
|-----------|--------------|----------------|
| **For You** (default) | Global timeline of public posts from across HelloFresh, weighted toward recency | All public posts from any user |
| **Friends** | Posts from reciprocal connections (mutual follow) | Friends only |
| **My Communities** | Aggregated feed from all communities/teams the user belongs to | Team/community members |

When posting, the user selects their audience: Friends, a specific community, or Public. The default is their last-used audience. Posts shared to Public appear in the global "For You" timeline. Posts shared to Friends or a community appear only in those scoped feeds.

#### Post Types

| Type | Content | Trigger | Shareable externally? |
|------|---------|---------|----------------------|
| **Meal photo** | Photo + caption + recipe tag | Manual or Cooking Moment prompt | Yes (Instagram Stories, WhatsApp, etc.) |
| **Recipe tip** | Text + optional photo, tagged to a specific recipe | Manual (from recipe page or feed) | Yes |
| **Recipe rating** | Star rating + optional comment, auto-generated card | After rating a recipe | Yes (as a visual card) |
| **Achievement** | Badge earned, streak milestone, scorecard unlock | Automatic (with user opt-in to post) | Yes (as a visual card) |
| **Meal Train update** | "Friends started a Meal Train for [name]" | Automatic (for contributors) | No (private) |
| **Cookbook share** | "I saved [recipe] to my cookbook" | Manual opt-in after saving | Yes |

#### Feed Card Layout

Each feed item follows a consistent card structure:

- **Author row:** Avatar (32px) + display name + time ago + audience badge (Friends / Team name / Public)
- **Content area:** Varies by post type (photo, text, visual card, etc.)
- **Recipe tag:** If tagged to a recipe, a small recipe pill (thumbnail + name) appears below the content. Tappable → recipe detail.
- **Engagement row:** 
  - ❤️ Like count (tap to like)
  - 💬 Comment count (tap to open comment thread)
  - ↗️ Share (opens sharing pipeline — in-app repost to another group, or external share)
- **No algorithmic ranking.** Feed is reverse-chronological within each group. Simplicity over engagement optimization.

#### Feed Interactions

- **Pull to refresh** at top
- **Long-press a post** → options: Save, Report, Mute author (if not a friend)
- **Tap author avatar** → profile view
- **Tap recipe tag** → recipe detail (future — no-op in prototype)
- **Floating "+" button** (bottom-right) → new post composer
- **New post composer:** Photo picker + text input + recipe tag search + audience selector + "Post" CTA

### B2. Scorecards

**Problem:** Users accumulate meaningful cooking data over time (meals cooked, nutrients consumed, environmental impact, variety of cuisines tried) but have no way to see or celebrate it. These stats could drive organic sharing — people love personalized data summaries (Spotify Wrapped, Apple Health rings, Strava year-in-review).

**Solution:** Visual, shareable stat cards that surface personal cooking insights. Each scorecard has built-in direct sharing — users tap "Share" and choose their destination (Instagram Stories, WhatsApp, feed post, etc.) without needing to screenshot.

#### Scorecard Types

| Scorecard | Data source | Example |
|-----------|------------|---------|
| **Cooking Streak** | Consecutive weeks with a cooked meal logged | "12-week cooking streak 🔥" |
| **Nutrition Champion** | Aggregate nutritional data from meals cooked | "Fiber Champion — avg 32g/day this month" |
| **Meals Cooked** | Lifetime count | "100 Meals Cooked 🎉" |
| **Carbon Footprint** | Environmental impact calculation per meal | "You've saved 45kg of CO₂ vs. takeout this year" |
| **Cuisine Explorer** | Variety of cuisine types cooked | "Tried 12 cuisines this year — your top: Italian 🇮🇹" |
| **Weekly Wrap** | Summary of the past week's cooking | "This week: 4 meals, 2 new recipes, 28g avg protein" |
| **Monthly Wrap** | Monthly summary with trends | Similar to Spotify Wrapped but for cooking |
| **Persona Card** | Dynamic card based on current identity badge | "You're a Veggie Connoisseur — 73% plant-based meals this month" |

#### Scorecard Visual Design

- **Card format:** Portrait-oriented (optimized for Instagram Stories), 9:16 aspect ratio option and square option
- **Background:** Gradient or themed to the stat type (green for nutrition, orange for streaks, blue for sustainability)
- **Data visualization:** Large, bold number as the hero element. Supporting context in smaller text below. Minimal chart or icon where relevant.
- **Branding:** Small HelloFresh logo in corner. User's display name and avatar at the bottom. Subtle "hellofresh.com/[username]" watermark.
- **Direct sharing:** "Share" button on each scorecard opens the sharing pipeline directly — no screenshotting needed. Options: Instagram Stories (pre-formatted as a story-ready image), feed post, WhatsApp (as a rich card), save to photos. The sharing flow handles format conversion per channel automatically.

#### Scorecard Triggers

Scorecards are unlocked at milestones and surfaced proactively:

- **Milestone unlock:** "You just hit 50 meals cooked!" → scorecard auto-generates → push notification → user opens and can share
- **Weekly/monthly wraps:** Generated every Sunday / first of the month → notification + card on the feed
- **On-demand:** Users can visit their profile → "My Stats" section → browse all earned scorecards

#### Scorecard Data Sources

- **HelloFresh order history** — meals ordered, cooked (if marked), cuisine types, nutritional data
- **Manual input** — users can log meals they cooked outside HelloFresh (stretch goal)
- **Integrations** — Apple Health (nutrition sync), fitness trackers (stretch goal, not in v1)
- **Calculations** — Carbon footprint based on ingredient sourcing data HelloFresh already tracks

### B3. Identity Badges

**Problem:** Cooking is part of how people see themselves ("I'm a healthy eater," "I love spicy food," "I'm adventurous with cuisines") but HelloFresh doesn't reflect any of that identity back. Users have no cooking persona within the app.

**Solution:** Algorithmically assigned badges based on cooking behavior that become part of the user's profile and identity. Badges evolve over time as cooking patterns change.

#### Badge System

| Badge | Criteria | Visual |
|-------|----------|--------|
| **Garlic Lover** | 60%+ of meals contain garlic | Garlic bulb icon, warm gold |
| **Veggie Connoisseur** | 70%+ plant-based meals over 30 days | Leaf icon, green |
| **Protein Machine** | Avg protein per meal > 40g over 30 days | Dumbbell icon, red |
| **Fiber Champion** | Avg daily fiber > 30g over 30 days | Grain icon, amber |
| **Spice Explorer** | Ordered 5+ recipes with "spicy" tag | Chili icon, red-orange |
| **World Traveler** | Cooked meals from 8+ cuisines | Globe icon, blue |
| **Speed Demon** | 60%+ meals are under-30-minute recipes | Lightning bolt, yellow |
| **Comfort King/Queen** | High frequency of comfort food tags | Couch icon, warm brown |
| **Meal Prep Master** | Consistently orders 4+ meals/week for 8+ weeks | Calendar icon, teal |
| **Night Owl** | Most meals cooked after 8pm (self-reported or inferred) | Moon icon, navy |
| **Weekend Warrior** | Cooks significantly more on weekends | Sun icon, orange |

#### Badge Mechanics

- **Primary badge:** The most strongly-matched badge becomes the user's "cooking persona" — displayed on their profile, on feed posts, and on scorecards. Users can override this with a different earned badge.
- **Badge collection:** All earned badges visible on the profile in a grid. Unearned badges shown as locked silhouettes with criteria hints ("Cook 5 more spicy dishes to unlock").
- **Badge evolution:** Badges can upgrade: Bronze → Silver → Gold based on how extreme the behavior is (e.g., "Garlic Lover" bronze at 60%, silver at 80%, gold at 95%).
- **Badge announcement:** When a new badge is earned, a celebratory card appears (similar to achievement unlocks in games). User is prompted to share to the feed.
- **Shareability:** Each badge has a designed share card (visual, branded) that can be posted to the feed or shared externally.

### B4. Cooking Moments

**Problem:** Food content on social media is heavily curated — perfect plating, ideal lighting, professional-looking photos. This creates an intimidation barrier for normal home cooks who want to share but feel their food "doesn't look good enough." Meanwhile, the trend toward authenticity shows that people crave unpolished, real-life content. HelloFresh has a unique advantage: we know when users are likely cooking, and with Sous Chef we know when they've just finished — making us able to prompt at exactly the right moment.

**Solution:** Contextual photo and commentary prompts that catch users at natural cooking moments — when they've just finished a recipe, when it's dinnertime, when they've hit a milestone. Prompts vary to keep the experience fresh and drive different types of content. Photos and tips can be shared to the community feed, posted to social media, or simply saved to the user's private cookbook as a personal record.

#### How It Works

1. **The prompt:** At a natural cooking moment, the user receives a notification with a specific, varied prompt (see Prompt Types below).
2. **The capture:** User opens the notification → camera or text input launches in-app. No time pressure — the user captures whenever they're ready. Option for rear camera (the food) and/or front camera (selfie reaction).
3. **The choice:** After capturing, the user chooses what to do with it:
   - **Share to feed** — post to Friends, a community, or Public with an optional caption and recipe tag
   - **Share externally** — post directly to Instagram Stories, TikTok, WhatsApp, or iMessage
   - **Save privately** — save to their cookbook as a personal cooking photo (no public posting). This is a first-class option, not a hidden escape hatch.
4. **The viewing:** Cooking Moment posts in the feed have a distinct visual treatment (Polaroid-style border, timestamp, prompt text shown). When saved privately, photos appear in the user's cookbook under the tagged recipe.

#### Prompt Types

Prompts rotate to keep the experience fresh and drive variety in content:

| Prompt | When triggered | Content type |
|--------|---------------|-------------|
| "Snap a pic of your first cook!" | After completing first-ever HelloFresh recipe (detected via Sous Chef) | Photo |
| "Show us what's on the plate" | ~7pm local time on delivery days, or when Sous Chef session ends | Photo |
| "Show us your table setting" | Weekend evenings (Fri–Sun) | Photo |
| "How did it turn out?" | After a Sous Chef session completes | Photo + optional rating |
| "Any tips for next time?" | After rating a recipe 4–5 stars | Text (tip/comment) |
| "What's your secret ingredient?" | After cooking 5+ recipes in a cuisine | Text |
| "Cooking for someone special?" | Weekend evenings, when box has 4-person meals | Photo + caption |
| "Show us the chaos" | Mid-cook (timed to ~halfway through Sous Chef estimated duration) | Photo |

#### Prompt Triggers

- **Time-based:** Default prompt fires around 7pm local time on days when the user has a HelloFresh delivery recently delivered (within 3 days). Time is adjustable in settings.
- **Sous Chef–based:** When the user completes a Sous Chef cooking session, a prompt fires immediately — this is the highest-signal moment because we *know* they just finished cooking.
- **Milestone-based:** First cook, 10th cook, first time trying a new cuisine, etc. — these get special prompts (see table above).
- **Frequency:** Max 1 prompt per day. Skip gracefully — no penalty, no FOMO mechanics. A skipped prompt comes back with a different variation another day.
- **Smart deduplication:** If the user already posted a cooking photo today (manually or via prompt), no prompt fires.

#### Cooking Moments Destinations

- **Feed:** Posted to the community feed (audience: user's choice — Friends, a specific community, or Public)
- **Recipe page:** If tagged to a recipe, the photo appears in a community photo gallery on that recipe's page ("See what others made")
- **Cookbook (private):** Photos saved privately appear as "My cooking photos" on the recipe card in the user's cookbook. Over time, this builds a personal visual record of meals cooked — the foundation for future "Memories" features (e.g., "A year ago you cooked this for the first time").
- **External:** Direct share to Instagram Stories, TikTok, WhatsApp, iMessage, or save to the phone's photo library

### B5. Teams

**Problem:** Cooking can feel solitary, especially for people cooking alone during the week. Users want a sense of community and shared purpose — to cook "with" others even when they're in separate kitchens. Fitness apps (Peloton, Strava) have proven that community groups with shared challenges dramatically increase engagement and retention.

**Solution:** Joinable community groups (Teams) where members share cooking activity, compete in challenges, and encourage each other.

#### Team Types

| Type | Size | Creation | Example |
|------|------|----------|---------|
| **Friends group** | 2–20 | User-created, invite-only | "The Johnsons & Smiths," "College roommates" |
| **Interest group** | 10–100 | User-created, joinable via link or search | "High Protein Cooks," "Vegetarian Families" |
| **HelloFresh community** | 100–10,000 | HelloFresh-created, open join | "Weeknight Warriors," "Meal Prep Nation" |

#### Team Features

**Team Home Screen:**
- **Header:** Team name, member count, team avatar/banner
- **Activity feed:** Team-scoped feed showing members' posts, achievements, and challenge progress
- **Challenge card** (if active): Current challenge name, progress bar, leaderboard preview, time remaining
- **Members list:** Avatars in a horizontal scroll, "See all" link, "Invite" button
- **Team stats:** Aggregate stats card — "This week: 47 meals cooked by 12 members"

**Challenges:**
- **Duration:** 1–4 weeks
- **Types:**
  - Cooking frequency ("Cook 5 meals this week")
  - Cuisine exploration ("Try 3 new cuisines this month")
  - Nutrition targets ("Average 30g fiber/day for 2 weeks")
  - Recipe variety ("Cook 10 recipes you've never tried")
  - Team goals ("Team cooks 100 meals this month")
- **Leaderboard:** Ranked by challenge metric. Friendly, not punitive — emphasis on participation, not just winning.
- **Completion:** At challenge end, participants receive a challenge badge. Top 3 get a special "podium" variant. Results posted to the team feed.
- **Creation:** Team admins (or HelloFresh for community teams) can create challenges from templates or custom parameters.

**Team Interactions:**
- **Join:** Via invite link, search, or browse (for HelloFresh communities)
- **Leave:** Anytime, no friction
- **Invite:** Share a team invite link via the sharing pipeline
- **Mute:** Mute a team's notifications without leaving
- **Create:** Any user can create a Friends group or Interest group. HelloFresh communities are editorially managed.

---

## Cross-Hub User Journey

This is the unified journey showing how a user moves through both hubs:

### Journey: New User (Referred via Gift)

```
Friend receives gift message (Team A)
→ Claims free box (Team A — Frictionless Redemption)
→ Cooks first meal using Sous Chef
→ Sous Chef session ends → Cooking Moment prompt: "Snap a pic of your first cook!"
    → Takes photo → chooses to post to Friends feed
    → Sees friend's activity, joins their community
→ Earns "First Meal" badge (Team B)
    → Shares badge to Instagram Stories
→ Week 2: Cooking streak begins
    → Weekly Wrap scorecard unlocks (Team B)
    → Browses the For You feed on Discover → discovers communities and trending content
→ Week 4: Gets comfortable, feels part of the community
    → After a great cook, a gentle nudge: "Know someone who'd love this?"
    → Gifts a box to another friend → Community grows
```

### Journey: Established User (Deepened by Social Hub)

```
7pm notification: "🍳 How did tonight's meal turn out?"
→ Opens app, snaps a photo of their plate
→ Posts to their "Weeknight Warriors" community → receives likes and comments
→ Checks profile → sees "Fiber Champion" badge unlocked
    → Taps "Share" → directly shares scorecard to Instagram Stories
→ A non-HelloFresh friend sees the scorecard → curious, visits hellofresh.com
→ User browses the For You feed → discovers a "High Protein January" challenge
→ Joins the challenge → cooks more adventurously → earns new badges
→ After weeks of engagement, sees a contextual nudge to gift a friend a box
```

### Journey: Altruistic Gifter (Meal Train)

```
Friend just had a baby
→ Opens Profile → "Start a Meal Train"
→ Creates 4-week Meal Train → invites 6 friends to contribute
→ Contributors chip in and add personal notes
→ Recipient claims → receives weekly boxes with messages
→ Meal Train updates appear in contributor's community/friends feeds (Team B)
→ Recipient posts a thank-you Cooking Moment of the first meal
→ Emotional moment → contributors feel great → deeper engagement with the community
```

---

## Tab Bar Evolution

The bottom navigation evolves to accommodate the social ecosystem without adding clutter:

**Current:** Home | My Menu | Search | Cookbook | Profile

**Full ecosystem:**
| Tab | Purpose | Badge/indicator |
|-----|---------|-----------------|
| **Discover** | Social Hub home — community feed (For You / Friends / My Communities), trending content, team browsing, challenges | Red dot for new activity |
| **My Menu** | Existing menu/ordering flow | — |
| **Search** | Existing search | — |
| **Cookbook** | Recipe collection (existing), includes privately saved Cooking Moment photos | — |
| **Profile** | Identity, badges, stats, scorecards, gifting section (RAF, Meal Train, QR code), settings | New badge notification |

**Key decisions:**
- **No dedicated Share/Gifting tab.** Gifting surfaces live within Profile and contextual nudges. This keeps the product from feeling referral-centric.
- **Discover replaces Home** as the primary landing tab once the social ecosystem is live. The "Home" content (upcoming deliveries, order status) moves into My Menu.
- **Community is inside Discover**, not a separate tab. The Discover tab serves as the unified entry point for all social features — the feed, communities, trending content, and creator discovery.

---

## Phasing

### Phase 1: Social Identity + Gifting Foundation
**Both teams start in parallel.**

**Team A:**
- Personalized RAF (Message Composer, Contextual Nudges, gifting section in Profile) — *already specced, adapted from v1-intent*
- Frictionless Redemption (Friend Claim Flow) — *already specced*
- QR Code Sharing — *new, small scope*
- Rewards Hub integration — *already specced*

**Team B:**
- Identity Badges — unlocking and display on profile
- Scorecards — generation, viewing, and direct external sharing
- Basic profile extension (display name, bio, persona)
- Sharing pipeline (direct sharing of badges/scorecards to social platforms)

**Why together:** The Gifting Engine is lower complexity and directly impacts acquisition. Social Identity gives users something worth sharing immediately — scorecards and badges are shareable on existing social platforms before the in-app feed even exists. Running both in parallel maximizes time-to-value.

### Phase 2: Community Layer
**Team B focus. The heart of the ecosystem.**

- Community Feed (For You global timeline, Friends feed, community-scoped feeds)
- Cooking Moments (prompted photos with Sous Chef integration)
- Teams / Communities (creation, joining, community feed)
- Discover tab (replacing Home — unified entry point for all social features)

**Why second:** A feed is only valuable when there's content to fill it. Phase 1 ensures users have badges, scorecards, and a nascent social identity before the feed launches. Cooking Moments drives photo content into the feed from day one.

### Phase 3: Challenges & Gamification
**Team B expansion. Deepens engagement.**

- Team challenges (templates, custom creation, leaderboards)
- Challenge badges and rewards
- Cross-team challenges (HelloFresh community events)

**Why third:** Challenges require active communities (Phase 2) and are an engagement deepening tool. Ship after the core community is established and generating organic activity.

### Phase 4: Group Gifting
**Team A expansion. Benefits from the social graph.**

- Meal Train (create, contribute, claim)
- Meal Train ↔ Feed integration (updates posted to contributor feeds)
- Gift subscription as a standalone (Meal Train for one contributor)

**Why fourth:** Meal Train is higher complexity (group coordination, payments, multi-week fulfillment). It also works better when contributors are already socially connected within the app (Phase 2–3).

### Phase 5: Memories & Advanced Social
**Team B expansion. Long-term engagement plays.**

- Cooking Memories ("A year ago you cooked this for the first time") — built on privately saved Cooking Moment photos
- Cooking Moments prompt expansion (seasonal, event-based prompts)
- Advanced scorecard types (year-in-review, comparison with friends)
- Enhanced community features (community events, guest chef AMAs)

**Why fifth:** These features build on a mature base of user-generated content and social engagement from earlier phases. They deepen the emotional connection and make HelloFresh feel like a personal cooking journal, not just a delivery service.

---

## Metrics

### Team A: Gifting Engine

| Metric | Definition | Target |
|--------|-----------|--------|
| **Referral send rate** | % of active users who send ≥1 referral/month | 2x current |
| **Referral conversion rate** | % of sent referrals that result in a claimed box | 3x current |
| **Friend-to-subscriber rate** | % of free box claimers who become paying subscribers | Baseline + 20% |
| **Message personalization rate** | % of referrals sent with edited (non-default) message | >60% |
| **QR code scans** | Monthly QR code scans resulting in landing page visits | New metric |
| **Meal Train completion rate** | % of created Meal Trains that are fully funded and claimed | >70% |
| **Time to claim** | Average time from message receipt to box claimed | <5 min |

### Team B: Social Hub

| Metric | Definition | Target |
|--------|-----------|--------|
| **Feed DAU** | % of active users who view the community feed daily | >30% within 6mo |
| **Post rate** | Posts per active user per week | >1 |
| **Cooking Moment response rate** | % of Cooking Moment prompts that result in a captured photo (posted or saved privately) | >25% |
| **Cooking Moment share rate** | % of captured Cooking Moments shared to feed or externally (vs. saved privately) | >40% |
| **Scorecard share rate** | % of unlocked scorecards shared (to feed or externally) | >15% |
| **External impressions** | Social media impressions from shared scorecards/badges/Cooking Moments | New metric |
| **Community join rate** | % of eligible users who join ≥1 community or team | >40% within 6mo |
| **Challenge participation** | % of community members who participate in active challenges | >50% |
| **Private photo saves** | Cooking Moment photos saved privately to cookbook (leading indicator for Memories feature) | New metric |
| **Organic referral attribution** | New signups attributed to Social Hub shared content (via subtle branding links) | New metric |

### Cross-Hub

| Metric | Definition | Target |
|--------|-----------|--------|
| **Happy moment → engagement** | % of happy moment triggers that result in any action (photo, share, badge view, feed post) | >15% |
| **Retention lift** | 12-week retention of users engaged with Social Hub vs. control | +15% |
| **Cooking frequency lift** | Average meals cooked per week for Social Hub engaged users vs. control | +10% |
| **Organic referral rate** | % of Social Hub engaged users who send ≥1 referral within 90 days (natural, not prompted) | New metric |

---

## Non-goals (Ecosystem Level)

- **Algorithmic feed ranking** — Feed is chronological. No engagement-optimized algorithm.
- **Direct messaging** — No in-app 1:1 chat. Users communicate via external messaging apps.
- **Marketplace** — No user-to-user recipe selling, paid content, or creator monetization.
- **Recipe creation** — Users don't create or publish recipes within HelloFresh. They cook HelloFresh recipes and share the experience.
- **Competitive leaderboards beyond teams** — No global leaderboards. Competition stays within opted-in teams.
- **Push notification overhaul** — We define when triggers fire, but notification infrastructure and frequency capping is a platform team concern.
- **Android** — iPhone only for all prototypes.
- **Real backend/API** — All data is simulated for prototype purposes.
- **Content moderation system** — UI for reporting exists; the moderation pipeline behind it is out of scope.
- **Internationalization** — English only for prototypes.

## Open Questions

1. **Social graph bootstrapping** — How do we seed the friends graph? Import from phone contacts? Suggest HelloFresh users who share a delivery address? This affects how quickly the Community Feed becomes valuable.
2. **Cooking Moment prompt cadence** — Daily prompts on delivery days may be too aggressive for some users. Should we start with delivery-day-only and expand? What's the opt-out/snooze mechanism?
3. **Sous Chef integration depth** — How tightly do Cooking Moment prompts integrate with Sous Chef session data? Do we need explicit user consent to use Sous Chef timing for prompts?
4. **Scorecard data accuracy** — Nutritional calculations depend on users actually cooking the ordered meals (vs. skipping or substituting). How much do we trust order history as a proxy for meals cooked?
5. **Meal Train payment processing** — Who is the merchant of record? How are refunds handled if the Meal Train is cancelled? Does HelloFresh hold funds in escrow until the recipient claims?
6. **Badge gaming** — Can users manipulate their order patterns to earn specific badges? Is this a problem or a feature (it drives orders)?
7. **Community moderation** — Who moderates user-created communities? What content policies apply to community feeds and the global For You timeline?
8. **For You feed curation** — The global timeline uses reverse-chronological ordering. At scale, will we need lightweight curation (trending, staff picks) to keep content quality high without a full algorithm?
9. **Privacy** — What cooking data is visible to friends vs. community members vs. public? Users need granular control over what's shared about their cooking habits and nutrition data.
10. **Integration timeline** — External integrations (Apple Health, fitness trackers) dramatically increase scorecard value but add complexity. When do we invest?
11. **Subtle branding calibration** — How prominent should the HelloFresh watermark be on externally shared content? Too subtle and it provides no value; too prominent and users feel like ad vehicles. Need user testing.
12. **Memories feature roadmap** — Privately saved Cooking Moment photos are the foundation for a "Memories" feature. What's the minimum photo volume per user needed before Memories becomes valuable? How does this inform prompt frequency strategy?
