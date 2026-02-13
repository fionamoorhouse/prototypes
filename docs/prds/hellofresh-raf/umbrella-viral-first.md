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

Build a social ecosystem centered on two reinforcing loops:

```
┌─────────────────────────────────────────────────────┐
│                   USER JOURNEY                       │
│                                                      │
│   Cook a meal → Share the moment (Social Hub)        │
│       ↓                                              │
│   Build identity → Earn badges, streaks, stats       │
│       ↓                                              │
│   Feel generous → Gift a box (Gifting Engine)        │
│       ↓                                              │
│   Friend joins → Cooks their first meal              │
│       ↓                                              │
│   Friend shares → Loop continues                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Loop 1 — Transactional Virality (Gifting Engine):** A reimagined RAF where sharing is personal, gifting is altruistic, and redemption is frictionless. Extended with Meal Train for group gifting during life moments.

**Loop 2 — Engagement Virality (Social Hub):** A social layer where cooking generates shareable content — scorecards, badges, BeReal-style photos, community feeds — that drives organic impressions on social media and within the HelloFresh community.

The two loops reinforce each other: the Social Hub creates "happy moments" that trigger gifting; gifting brings new users who join the Social Hub and create more happy moments.

## Design Principles

These principles govern every feature across both teams:

1. **Lead with the gift, not the reward.** Never lead with "Get $35." Always lead with "Give a Box." Frame every sharing action around the benefit to the recipient or the community, not the referrer's incentive.

2. **Remove the "I'm a subscriber" barrier.** Every recipient-facing experience must feel like receiving a gift, not entering a sales funnel. No credit card upfront, no auto-renewal, no subscription pressure.

3. **Contextual nudges at happy moments.** Trigger sharing prompts after moments of genuine satisfaction (5-star rating, cooking streak milestone, nutrition achievement) — not at checkout, not on every app open, not via weekly spam.

4. **The message comes from the person, not the company.** Whether it's a referral, a meal photo, or a scorecard share — the content arrives in the recipient's world as something from a real person they know.

5. **Identity fuels sharing.** People share things that say something about who they are. Badges, personas, and stats give users a cooking identity worth expressing.

6. **Belonging over broadcasting.** The social features prioritize intimate groups (Teams, friends feed) over public broadcasting. Users share more when they feel safe.

---

## Architecture: Two Hubs

### Team A: Gifting Engine (Transactional Virality)

**Mission:** Make it effortless and emotionally rewarding to gift HelloFresh experiences to people you care about — and make receiving that gift feel genuinely free.

**Features:**

| Feature | Status | Description |
|---------|--------|-------------|
| **Personalized RAF** | Specced → [v1-intent.md](./v1-intent.md) | Gift-first sharing with personal message composer, AI assist, contextual nudges at happy moments, and a permanent Share Hub |
| **Frictionless Redemption** | Specced → [v1-intent.md](./v1-intent.md) | Friend claims a free box with no credit card, no subscription — just pick meals, enter address, confirm |
| **QR Code Sharing** | New (this doc) | In-person sharing via scannable QR code for offline happy moments |
| **Meal Train** | New (this doc) | Group gifting for life moments — multiple people contribute meals to someone in need |
| **Rewards Integration** | Specced → [v1-intent.md](./v1-intent.md) | Unified Rewards Hub showing loyalty tier, points, referral rewards, and discount bridge |

### Team B: Social Hub (Engagement Virality)

**Mission:** Give HelloFresh customers a social identity around cooking and a community to share it with — generating organic content that drives impressions, retention, and word-of-mouth.

**Features:**

| Feature | Status | Description |
|---------|--------|-------------|
| **Community Feed** | New (this doc) | Friends activity feed with group-based sharing of meals, tips, photos, and achievements |
| **Scorecards** | New (this doc) | Visual, shareable personal cooking stats and nutrition insights |
| **Identity Badges** | New (this doc) | Persona-based badges earned through cooking behavior (e.g., "Garlic Lover," "Fiber Champion") |
| **BeReal Moments** | New (this doc) | Prompted, unpolished meal photos shared to the community feed and externally |
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
  feedVisibility: 'friends' | 'team' | 'public'  // default sharing scope
  
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
| 5-star recipe rating | Post-cook | "Share the love — gift a box" nudge | "Snap a photo of what you made" prompt |
| Cooking streak milestone (7, 30, 100 days) | Daily check | — | Streak badge + scorecard share prompt |
| First cook after signup | Post-delivery | Post-cook nudge (gift a friend) | — |
| Nutrition milestone ("100g protein today") | Meal log | — | Scorecard unlock + share prompt |
| Order confirmed | Checkout | — | — (no nudge at checkout — principle #3) |
| Loyalty tier advancement | Points system | Reward upgrade announcement | Badge upgrade + share prompt |
| Meal Train contribution received | Gifting | Thank-you notification | "Your friends came through" feed post |
| Friend joined via your referral | Redemption | Reward granted notification | "[Friend] just joined!" feed story |

**Priority rules:** Only one nudge per session. Team A gifting nudges and Team B social nudges alternate. The user's recent engagement history determines which has higher priority (if they've been socially active recently → gift nudge; if they haven't shared in a while → social nudge).

### Sharing Infrastructure

Both teams use a shared sharing pipeline:

1. **Content assembly** — The feature creates a shareable payload (message text, image, link, metadata)
2. **Channel selection** — User picks: in-app feed, WhatsApp, iMessage, Instagram Stories, or copy link
3. **Personalization** — The payload is adapted per channel (rich link for messaging, story-formatted for Instagram, card for in-app feed)
4. **Attribution** — Every shared link carries referral attribution so the Gifting Engine can credit conversions even when sharing originates from the Social Hub

This means a scorecard shared to Instagram Stories carries a referral link. A BeReal photo sent to a friend via WhatsApp includes a "Try HelloFresh" link. The Social Hub generates organic content; the Gifting Engine captures the conversion.

---

## Team A: Gifting Engine — Detailed Requirements

### A1. Personalized RAF (Already Specced)

See [v1-intent.md](./v1-intent.md) for the full specification covering:
- Share Hub (permanent, emotional home for gifting)
- Message Composer (personal message with AI assist, photo selection, preview)
- Post-Signup Nudge and Post-Cook Nudge (contextual prompts at happy moments)
- Rewards Hub (unified loyalty + referral + discounts view)
- Friend Claim Flow (pick meals → delivery address → confirm — no payment)

**Changes from v1-intent to align with this umbrella:**

- The Share Hub gains a "Meal Train" entry point (see A3 below)
- The tab bar evolves: the "Share" tab becomes the entry point for all gifting (RAF + Meal Train + QR)
- Happy moment triggers expand to include Social Hub events (badge earned, streak milestone) as potential gifting nudge moments
- Referral attribution links are embedded in all Social Hub shares (see Shared Primitives)

### A2. QR Code Sharing

**Problem:** Many sharing opportunities happen offline — dinner parties, office lunches, gym conversations — where texting a link feels awkward. Users need a way to share instantly in person.

**Solution:** A personal QR code accessible from the Share Hub that encodes the user's referral link. Scanning it takes the friend directly to the Claim Landing Page.

**Location:** Inside the Share Hub, below the "Text" and "Share" buttons, as a third sharing method.

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
- Share Hub → "Start a Meal Train" card (below the standard RAF section)
- Profile → "Gift a Meal Train" option
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

**Solution:** An in-app activity feed where users share cooking moments, tips, meal photos, and achievements with their chosen audience (friends, teams, or public). The feed is group-scoped — users share `<content>` with their `<group>`.

**Entry point:** "Community" tab in bottom navigation.

#### Feed Architecture

The feed is organized around **groups**, not a global timeline:

| Group type | Description | Default visibility |
|------------|-------------|-------------------|
| **Friends** | Reciprocal connections (mutual follow) | Friends only |
| **Team** | Joined community group (see B5) | Team members |
| **Public** | Open to all HelloFresh users | Anyone |

When posting, the user selects their audience. The default is their last-used group. The feed view has tabs or a filter to switch between "Friends," "My Teams," and "Discover" (public).

#### Post Types

| Type | Content | Trigger | Shareable externally? |
|------|---------|---------|----------------------|
| **Meal photo** | Photo + caption + recipe tag | Manual or BeReal prompt | Yes (Instagram Stories, WhatsApp, etc.) |
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

**Solution:** Visual, shareable stat cards that surface personal cooking insights. Designed to be beautiful enough to screenshot and share on social media.

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

- **Card format:** Portrait-oriented (optimized for Instagram Stories and phone screenshots), 9:16 aspect ratio option and square option
- **Background:** Gradient or themed to the stat type (green for nutrition, orange for streaks, blue for sustainability)
- **Data visualization:** Large, bold number as the hero element. Supporting context in smaller text below. Minimal chart or icon where relevant.
- **Branding:** Small HelloFresh logo in corner. User's display name and avatar at the bottom. "hellofresh.com/[username]" as a subtle referral link.
- **Shareability:** "Share" button on each scorecard opens the sharing pipeline. Options: Instagram Stories (pre-formatted), feed post, WhatsApp, copy image, save to photos.

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

### B4. BeReal Moments

**Problem:** Food content on social media is heavily curated — perfect plating, ideal lighting, professional-looking photos. This creates an intimidation barrier for normal home cooks who want to share but feel their food "doesn't look good enough." Meanwhile, the authenticity trend (led by BeReal) shows that people crave unpolished, real-life content.

**Solution:** A prompted, time-boxed photo feature that encourages users to snap unpolished photos of their cooking moments — mid-cook chaos, imperfect plating, the real kitchen — and share them with their community.

#### How It Works

1. **The prompt:** At a random time during typical dinner-cooking hours (5–8pm, adjusted to user's time zone and cooking history), the user receives a notification: "🍳 BeReal Moment — show us what you're cooking!"
2. **The capture:** User opens the notification → camera launches in-app. They take a photo (rear camera for the food, option to flip for a selfie reaction — dual-photo like BeReal). 2-minute window to capture.
3. **The post:** Photo is automatically posted to the community feed with a "BeReal" badge. Minimal editing — no filters, no crop, no retouching. A caption and recipe tag are optional.
4. **The viewing:** BeReal posts in the feed have a distinct visual treatment (Polaroid-style border, timestamp, "BeReal" badge). Users who posted their own BeReal can see others'; users who didn't get a gentle prompt: "Share yours to see what others are cooking."

#### BeReal Prompt Timing

- **Frequency:** Max 1 prompt per day, only on days when the user has a HelloFresh delivery scheduled or recently delivered (within 3 days)
- **Time window:** Between 5pm and 8pm local time (adjustable in settings)
- **Smart timing:** If the user typically opens the app at 6:30pm, the prompt fires around then (±30 min)
- **Skip:** Users can dismiss the prompt. No penalty, no FOMO mechanics. It comes back another day.

#### BeReal Sharing

- **In-app:** Posted to the community feed (audience: Friends by default, changeable to Team or Public)
- **Recipe page:** If tagged to a recipe, the BeReal photo appears in a community photo gallery on that recipe's page ("See what others made")
- **Cookbook:** BeReal photos of recipes in the user's cookbook appear as "My cooking photos" on the recipe card
- **External:** "Share to Stories" (Instagram/TikTok), "Send to a friend" (WhatsApp/iMessage), "Save to photos"

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
→ Cooks first meal
→ Rates recipe 5 stars → Happy Moment trigger
    → "Snap a BeReal!" prompt (Team B)
    → Takes photo, posts to feed
    → Sees friend's activity, joins their Team
→ Earns "First Meal" badge (Team B)
    → Share prompt → posts to Instagram Stories (with referral link embedded)
→ Week 2: Cooking streak begins
    → Weekly Wrap scorecard unlocks (Team B)
→ Week 3: Gets comfortable
    → "Know someone who'd love this?" nudge (Team A)
    → Gifts a box to another friend → Loop continues
```

### Journey: Established User (Re-engaged via Social Hub)

```
Notification: "🍳 BeReal Moment!"
→ Opens app, snaps a meal photo
→ Posts to Friends feed → receives likes and comments
→ Checks profile → sees "Fiber Champion" badge unlocked
    → Shares scorecard to Instagram Stories
→ Friend sees the scorecard → taps referral link
    → Claims free box (Team A)
→ User gets notification: "[Friend] just joined!"
→ Invites friend to their Team
→ Team starts a "Try 5 new cuisines" challenge
→ Both users cook more → more BeReal moments → more organic sharing
```

### Journey: Altruistic Gifter (Meal Train)

```
Friend just had a baby
→ Opens Share Hub → "Start a Meal Train"
→ Creates 4-week Meal Train → invites 6 friends to contribute
→ Contributors chip in and add personal notes
→ Recipient claims → receives weekly boxes with messages
→ Meal Train updates appear in contributor's team/friends feeds (Team B)
→ Recipient posts a thank-you BeReal of the first meal
→ Emotional moment → contributors feel great → more likely to share HelloFresh organically
```

---

## Tab Bar Evolution

The bottom navigation evolves to accommodate both hubs:

**Current:** Home | My Menu | Search | Cookbook | Profile

**With Gifting Engine (Team A, Phase 1):**
Home | My Menu | **Share** | Cookbook | Profile

**With Social Hub (Team B, Phase 2):**
**Community** | My Menu | **Share** | Cookbook | Profile

**Full ecosystem:**
| Tab | Purpose | Badge/indicator |
|-----|---------|-----------------|
| **Community** | Social Hub — feed, teams, discover | Red dot for new activity |
| **My Menu** | Existing menu/ordering flow | — |
| **Share** | Gifting Engine — RAF, Meal Train, QR | Gift count remaining |
| **Cookbook** | Recipe collection (existing) | — |
| **Profile** | Identity, badges, stats, scorecards, settings | New badge notification |

---

## Phasing

### Phase 1: Gifting Engine Foundation
**Team A focus. Ship first.**

- Personalized RAF (Share Hub, Message Composer, Nudges) — *already specced*
- Frictionless Redemption (Friend Claim Flow) — *already specced*
- QR Code Sharing — *new, small scope*
- Rewards Hub integration — *already specced*

**Why first:** Directly impacts acquisition metrics. Lower complexity. Doesn't require a social graph to exist yet.

### Phase 2: Social Identity
**Team B foundation. Builds the social graph.**

- Identity Badges — unlocking and display on profile
- Scorecards — generation, viewing, and external sharing
- Basic profile extension (display name, bio, persona)
- Sharing pipeline (external sharing of badges/scorecards)

**Why second:** Gives users a reason to engage socially before the feed exists. Scorecards and badges are shareable on existing social platforms, generating organic impressions immediately.

### Phase 3: Community Layer
**Team B expansion. Requires social graph from Phase 2.**

- Community Feed (friends, teams, public)
- BeReal Moments (prompted photos)
- Teams (creation, joining, team feed)

**Why third:** A feed is only valuable when there's content to fill it. Phase 2 ensures users have badges, scorecards, and a nascent social identity before the feed launches.

### Phase 4: Group Gifting
**Team A expansion. Benefits from the social graph.**

- Meal Train (create, contribute, claim)
- Meal Train ↔ Feed integration (updates posted to contributor feeds)
- Gift subscription as a standalone (Meal Train for one contributor)

**Why fourth:** Meal Train is higher complexity (group coordination, payments, multi-week fulfillment). It also works better when contributors are already socially connected within the app (Phase 3).

### Phase 5: Challenges & Gamification
**Team B expansion. Deepens engagement.**

- Team challenges (templates, custom creation, leaderboards)
- Challenge badges and rewards
- Cross-team challenges (HelloFresh community events)

**Why fifth:** Challenges require active teams (Phase 3) and are an engagement deepening tool, not a growth driver. Ship after the core social and gifting loops are established.

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
| **BeReal response rate** | % of BeReal prompts that result in a posted photo | >25% |
| **Scorecard share rate** | % of unlocked scorecards shared externally | >15% |
| **External impressions** | Social media impressions from shared scorecards/badges/BeReals | New metric |
| **Team join rate** | % of eligible users who join ≥1 team | >40% within 6mo |
| **Challenge participation** | % of team members who participate in active challenges | >50% |
| **Organic referral attribution** | New signups attributed to Social Hub shared content (via embedded referral links) | New metric |

### Cross-Hub

| Metric | Definition | Target |
|--------|-----------|--------|
| **Happy moment → share conversion** | % of happy moment triggers that result in any share action (gift or social) | >10% |
| **Social → gifting pipeline** | % of Social Hub sharers who also send a referral within 30 days | >5% |
| **Retention lift** | 12-week retention of users engaged with Social Hub vs. control | +15% |

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
2. **BeReal notification cadence** — Daily is aggressive. Every-other-day? Only on delivery days? Need to balance engagement with annoyance.
3. **Scorecard data accuracy** — Nutritional calculations depend on users actually cooking the ordered meals (vs. skipping or substituting). How much do we trust order history as a proxy for meals cooked?
4. **Meal Train payment processing** — Who is the merchant of record? How are refunds handled if the Meal Train is cancelled? Does HelloFresh hold funds in escrow until the recipient claims?
5. **Badge gaming** — Can users manipulate their order patterns to earn specific badges? Is this a problem or a feature (it drives orders)?
6. **Team moderation** — Who moderates user-created teams? What content policies apply to team feeds?
7. **Feed content quality** — Without an algorithm, how do we prevent the feed from being dominated by low-quality posts in large public/community groups?
8. **Cross-hub attribution** — When someone clicks a referral link embedded in a shared scorecard, does the Social Hub user get RAF credit? How does this interact with invitation limits?
9. **Privacy** — What cooking data is visible to friends vs. team members vs. public? Users need granular control over what's shared about their cooking habits and nutrition data.
10. **Integration timeline** — External integrations (Apple Health, fitness trackers) dramatically increase scorecard value but add complexity. When do we invest?
