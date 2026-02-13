# HelloFresh Refer a Friend — Reimagined

## Problem Statement

HelloFresh's current Refer a Friend (RAF) program is company-centric. It pushes referral prompts at every order, leads with the referrer's reward ("Share a FREE box and get $35 off"), and sends messages that feel corporate rather than personal. When a customer does share, the pre-filled message reads like marketing copy ("I've been loving the new expanded HelloFresh menu: bigger portions and 100+ weekly recipes"), and the friend receives an email from "Your friend via HelloFresh" — a branded template with cross-sell ads — rather than a genuine personal message. On WhatsApp, the referral is handled by a third-party bot (Charles) that messages the friend with a HelloFresh logo, completely stripping out the personal connection.

The friend's experience is equally broken. Redeeming a "free box" requires configuring a full meal plan (preferences, number of people, servings), entering payment information, and accepting auto-renewal subscription terms. What was framed as a casual gift becomes an overwhelming commitment.

The result: referrals feel transactional for the customer and suspicious to the friend. The program optimizes for volume (nudge at every order) rather than quality (nudge at the right moment with the right message).

**The vision:** Referring a friend should feel like a generous, personal act — not a transaction. The program should meet customers at moments of genuine excitement, make sharing effortless and personal, and give the friend a radically simple way to try HelloFresh without committing to anything.

## Chosen Approach

**Gift-First, Loyalty-Powered.** The customer-facing experience is warm, emotional, and framed around giving a gift to a friend. Under the hood, it's fully integrated with the loyalty tier system — your tier determines your referral reward, and completions earn loyalty points. But the two surfaces have different personalities: the sharing experience is personal and generous; the rewards hub is systematic and clear.

### Core principles

1. **Lead with the friend's benefit.** Every touchpoint frames the referral as something you're *giving*, not something you're *getting*. "Gift a free box to someone you care about" — not "Get $35 off."

2. **Right moment, not every moment.** Reduce frequency dramatically. Prompt at two key moments: post-signup excitement and post-first-successful-cook satisfaction. Outside of those, let the customer come to sharing on their own terms.

3. **The message comes from the customer, not from HelloFresh.** When the friend receives the referral, it arrives in their messaging app from a real person, in first-person language, with a personal touch. No bots, no corporate templates.

4. **Zero-commitment for the friend.** The friend redeems a voucher for a single free box. No payment info, no subscription auto-renewal. A radically simplified claim flow: pick meals, enter address, done.

5. **Rewards are real but secondary.** The unified rewards hub shows referral alongside loyalty tiers and discounts, making it easy for discount-seekers to discover. But even for them, the actual sharing flow is warm and personal.

### Key concepts

- **Invitations** — A customer's available referral credits. Allocated at predefined moments in the customer journey with an element of surprise (the rules aren't visible). When out of invitations, customers can request more — a gesture of trust and generosity from HelloFresh.

- **Share Hub** — The dedicated, permanent surface for sharing. Warm, emotional, Headspace-inspired. Accessed from the tab bar and from contextual nudges. This is where the gift-first framing lives.

- **Message Composer** — In-app message crafting before handoff to the messaging app. Customers see and edit a first-person message, optionally use AI to personalize it, preview how it will look, then send via WhatsApp/Messenger/iMessage. The message arrives from *them*.

- **Contextual Nudges** — Lightweight prompts at moments of genuine excitement (post-signup, post-first-cook). These allow sharing directly from the nudge without navigating to the Share Hub.

- **Rewards Hub** — Unified page showing loyalty tier, points, discounts, and referral benefits. The systematic counterpart to the emotional Share Hub. Serves discount-seekers and customers who want to understand the full picture.

- **Friend Claim Flow** — What the friend experiences. A simple landing page showing who sent the gift and what they get, followed by a minimal signup: pick meals, enter address, confirm. No payment, no subscription.

### Two referral scenarios

The prototype demonstrates both motivations for sharing:

| Scenario | Motivation | Entry point | Framing |
|----------|-----------|-------------|---------|
| **Altruistic** | "I want to give something valuable to my friend because I care about them" | Post-cook nudge → Share Hub → Composer | Friend-benefit led: "Gift them a free box" |
| **Self-interested** | "I want to earn rewards by referring" | Rewards Hub → Share Hub → Composer | Reward-visible but sharing flow is still warm |

Both paths converge at the same Share Hub and Composer. The difference is the entry point and what the customer sees before they arrive.

### Reduced noise strategy

To make the right-moment nudges land, the overall referral noise must decrease:

- **Remove** persistent in-app RAF banners and push notifications
- **Reduce** CRM frequency from every-order to ~1x/month, timing delegated to ML-driven CRM
- **Replace** generic "refer and earn" messaging with contextual, moment-specific copy
- **Consolidate** the current "HelloFriends" tab into a warmer "Share" surface

## User Context

- **User (referrer):** Active HelloFresh subscriber, on mobile (iPhone)
- **User (friend/receiver):** Someone the referrer knows personally — may be a new prospect or a lapsed HelloFresh customer. Not required to commit to a subscription.
- **Brand:** HelloFresh — green (#067A46), charcoal (#242424), white (#FFFFFF), with a warmer emotional palette for the Share experience
- **Typography:** Bold serif for headings, clean sans-serif for body

## Screens

### 1. Share Hub

The permanent, emotional home for sharing. Replaces the current "HelloFriends" tab.

**Purpose:** Inspire customers to gift a free box to someone they care about. This is the primary RAF surface.

**Entry points:**
- "Share" tab in bottom navigation (replaces HelloFriends)
- Contextual nudges (post-signup, post-cook)
- Rewards Hub → "Share with friends" card

**Layout:**
- **Hero illustration** — Warm, full-width illustration of friends/family sharing a meal together (inspired by the Headspace guest pass visual and the HelloFresh mockup). Takes up the top ~40% of the screen.
- **Headline:** "Share that Home-Cooked Feeling" (serif, large, centered)
- **Subheading:** "Help your friends stress less and eat better. Gift them a free box to bring everyone together." (sans-serif, secondary color, centered)
- **Share buttons** — Two primary buttons side by side:
  - **"Text"** — green pill with chat bubble icon (opens iMessage composer)
  - **"Share"** — green pill with share icon (opens native share sheet for WhatsApp, Messenger, etc.)
- **Copy link section** — "OR COPY YOUR LINK" label, then a card showing personalized short link (e.g., `hellofresh.com/x/share-sarah-j`) with "COPY" button
- **Invitations remaining** — Subtle indicator: "You have 3 free boxes to give" with a small gift icon. Not the hero — just context.
- **Sharing activity** — Collapsible section below: "People you've shared with" showing name/avatar, date sent, status (Pending / Claimed / Cooking). Empty state: "You haven't shared yet — your first invitation is waiting!"
- **Link to Rewards Hub** — Small text link at bottom: "See your rewards & loyalty status →"
- **Tab bar** — Home, My Menu, **Share** (gift icon, active), Cookbook, Profile

**Interactions:**
- Tap "Text" → opens Message Composer (iMessage variant)
- Tap "Share" → opens native share sheet; selecting an app opens Message Composer with that channel pre-selected
- Tap "COPY" → copies link to clipboard, shows brief "Copied!" confirmation
- Tap a person in sharing activity → expands to show detail (no-op in prototype)
- Tap "See your rewards" → navigates to Rewards Hub

---

### 2. Message Composer

In-app message crafting before handing off to the messaging app. The customer composes a personal, first-person message and previews how it will look to the friend.

**Purpose:** Help the customer craft a message that sounds like *them*, not like HelloFresh. Provide AI assistance for those who want it, but keep manual editing front and center.

**Entry points:**
- Share Hub → "Text" or "Share" button
- Contextual nudge → "Send" button

**Layout:**
- **Header** — Back arrow, "Send to a friend" title, channel icon (WhatsApp/iMessage/Messenger)
- **Message preview card** — A visual preview of what the friend will see in their messaging app:
  - Food photo (appetizing, warm — a HelloFresh dish the customer recently cooked, or a default hero image)
  - Personal message text (editable, in a text area overlay on the card)
  - Default message example: "Hey! I've been cooking with HelloFresh and honestly it's been amazing. Thought you'd love it — I'm sending you a free box so you can try it. No strings attached, just pick your meals and they'll deliver everything you need. 💚"
  - The customer's name and small avatar at the bottom of the card
  - The personalized link (subtle, below the card content)
- **Edit controls:**
  - **"Edit message"** — tapping the message text makes it editable inline
  - **"AI assist" button** — sparkle icon + "Make it personal". Tapping generates a more personalized version based on the customer's cooking history (e.g., "I just made the most incredible Tuscan chicken — you'd love it"). The customer can accept, regenerate, or revert.
  - **"Change photo"** — lets the customer pick from recent HelloFresh meals they've cooked or a gallery of appetizing defaults
- **Send button** — Full-width green CTA: "Send via [WhatsApp/iMessage/etc.]"
- **How it works note** — Small text below send: "Your message will open in [app name]. You can make final edits there too."

**Interactions:**
- Edit message inline → text area becomes active, keyboard appears
- Tap "AI assist" → message text animates/morphs into a new personalized version. "Try another" and "Use original" links appear.
- Tap "Change photo" → bottom sheet with photo options
- Tap "Send via..." → hands off to the native messaging app with the composed message and rich link preview pre-filled. Customer can make final edits in the messaging app before actually sending.

**What the friend actually receives:**
- A message *from the customer's phone number/account* in WhatsApp/iMessage/Messenger
- The personal text (as composed)
- A rich link preview card: food photo, "Sarah sent you a free HelloFresh box", link to claim
- This is NOT an email from HelloFresh, NOT a bot message, NOT a corporate template

---

### 3. Post-Signup Nudge

A celebratory prompt shown immediately after a new customer completes their first subscription signup.

**Purpose:** Capitalize on the excitement of just signing up. "You just did something great for yourself — now do it for a friend."

**When shown:** Immediately after subscription confirmation screen. Appears as a bottom sheet overlay.

**Layout:**
- **Bottom sheet** (slides up, rounded top corners, handle bar)
- **Small illustration** — Friends sharing / gift motif (consistent with Share Hub visual language)
- **Headline:** "Know someone who'd love this too?" (serif, bold)
- **Body:** "You just signed up for something great. Gift a friend a free box — they can try HelloFresh without any commitment." (sans-serif, secondary)
- **Share buttons** — Same "Text" + "Share" pill buttons as the Share Hub
- **Dismiss link:** "Maybe later" (underlined, centered below buttons)

**Interactions:**
- Tap "Text" / "Share" → opens Message Composer (same as from Share Hub)
- Tap "Maybe later" or swipe down → dismisses sheet, no further prompting until the post-cook moment
- Sheet does NOT reappear if dismissed

---

### 4. Post-Cook Nudge

A contextual prompt shown after the customer has received their first delivery and returned to the app (proxy for "cooked and enjoyed a meal").

**Purpose:** Catch the customer at a moment of satisfaction — they've just experienced the product and are feeling good about it. This is the highest-intent moment for an authentic referral.

**When shown:** First app open after the first delivery has been marked as delivered. Appears as a card at the top of the Home screen (not a blocking modal).

**Layout:**
- **Inline card** on Home screen (not a bottom sheet — less interruptive, more native-feeling)
- **Background:** Warm, light green tint (#E8F5E0)
- **Small food photo** — Thumbnail of a recipe from the customer's first box (left side)
- **Text block:**
  - **Headline:** "Love what you made?" (bold, 16px)
  - **Body:** "Share that feeling — gift a friend a free HelloFresh box" (14px, secondary)
- **Action:** "Send a free box →" text link (green, right-aligned or below text)
- **Dismiss:** X button (top-right corner of card)

**Interactions:**
- Tap "Send a free box" → opens Message Composer directly (skips Share Hub — the nudge IS the prompt)
- Tap X → dismisses card permanently for this trigger (the Share Hub remains available in the tab bar)
- Card does NOT reappear once dismissed or acted on

---

### 5. Rewards Hub

The unified page showing the customer's full benefits picture: loyalty tier, points, discounts, and referral rewards.

**Purpose:** Give customers (especially discount-seekers) one place to understand everything they've earned and can earn. Referral is positioned as one way to earn more — framed within the loyalty context.

**Entry points:**
- Profile tab → "My Rewards" row
- Share Hub → "See your rewards" link
- Home screen (when marketing discounts have run out — a small prompt: "Earn more with your rewards →")

**Layout:**
- **Header** — Back arrow, "My Rewards" title
- **Loyalty tier card** — Prominent card at top showing:
  - Current tier name + icon (e.g., "Gold Member" with star)
  - Progress bar toward next tier
  - Points balance
  - "You're 2 orders away from Platinum" type motivational text
- **Active benefits section** — "Your Benefits" heading
  - **Discount cards** — Any active marketing discounts. Each shows: discount amount, expiry, "Use now" link. When empty: "No discounts right now" with a subtle note: "You can earn rewards by sharing with friends ↓"
  - **Referral reward card** — Highlighted card with gift icon:
    - "Your referral reward: **$45 off** your next box" (reward amount tied to current loyalty tier)
    - "At your Platinum tier, you earn 3x loyalty points per referral"
    - "You have 3 invitations available"
    - **CTA:** "Share with a friend" (green button) → navigates to Share Hub
  - **Loyalty missions** — Other ways to earn points (order frequency, reviews, etc.) shown as a list. "Invite a friend" is one mission with its points value shown.
- **Referral history** — Collapsible section: "Your referral activity"
  - Shows past referrals: friend name, date, status, reward earned
  - Total earned from referrals

**Key design detail for discount seekers:**
When a customer has no active marketing discounts, the referral reward card becomes more prominent — it moves higher on the page and gets a subtle "Earn your next discount" framing. This catches discount-seekers at the moment they're most receptive (they just lost their discounts and are looking for a way to avoid paying full price).

**Interactions:**
- Tap "Share with a friend" → navigates to Share Hub
- Tap a discount card → deep link to menu/checkout (no-op in prototype)
- Expand/collapse referral history

---

### 6. Friend: Message Received

What the friend sees in their messaging app when the referral arrives. This is not an app screen — it's a representation of the WhatsApp/iMessage conversation for prototype purposes.

**Purpose:** Show how the referral looks from the friend's perspective. It should feel like a genuine message from someone they know, not a corporate ad.

**Layout (simulated messaging app view):**
- **Conversation header** — Friend's name (the referrer), their profile photo
- **Message bubble** — Contains:
  - The personal text the customer composed (e.g., "Hey! I've been cooking with HelloFresh and it's been genuinely great. Sending you a free box — no subscription needed, just pick some meals and they deliver everything. Think you'd really love it 💚")
  - **Rich link preview** below the text:
    - Appetizing food photo (the one the referrer selected)
    - **Title:** "[Sarah] sent you a free HelloFresh box"
    - **Subtitle:** "Pick your meals and we'll deliver everything you need. No commitment."
    - hellofresh.com domain shown

**Key contrast with current experience:**
- Message is FROM the friend's actual account (not from "HelloFresh" or a bot)
- The text is personal and first-person (not marketing copy)
- The link preview is clean and warm (not a blast of "YOU JUST SCORED" with knife cross-sells)
- No ugly promo code URL — just a clean short link

---

### 7. Friend: Claim Landing Page

The web page the friend lands on after tapping the link in the message. This is the bridge between the personal message and the claim flow.

**Purpose:** Reassure the friend that this is real, show them what they're getting, and make the next step obvious. Zero pressure, zero complexity.

**Layout:**
- **Hero section** — Warm food photography background with gradient overlay
  - **Referrer attribution** — Small circular avatar of the referrer + "From [Sarah]" — reinforcing that this came from a real person they know
  - **Headline:** "A free HelloFresh box, from Sarah" (serif, large, white over gradient)
  - **Subheading:** "Pick your favorite meals and we'll deliver everything you need to cook them. No subscription, no commitment." (sans-serif, white)
- **What you get section** —
  - "Your free box includes:" heading
  - Clean list or icon row: "3 recipes for 2 people" + "Fresh pre-portioned ingredients" + "Step-by-step recipe cards" + "Free delivery"
  - Small print: "No payment required. No auto-renewal."
- **CTA button** — "Claim your free box" (green, full-width, prominent)
- **Social proof** — Optional: "4.6★ on App Store" or "Loved by 10M+ households" — light, non-pushy
- **Footer** — HelloFresh logo (small), privacy link, terms link

**Interactions:**
- Tap "Claim your free box" → opens Friend Claim Flow (simplified signup)

---

### 8. Friend: Claim Flow

The radically simplified signup experience for the friend. The goal: get them from "I'll try this" to "confirmed delivery" in under 2 minutes.

**Purpose:** Remove every possible barrier. No plan configuration, no payment, no subscription terms. Just: what do you want to eat, and where should we send it?

**Layout (multi-step, minimal):**

**Step 1: Pick your meals**
- **Header:** "Choose 3 meals" (with "1 of 3" step indicator)
- **Meal grid** — 2-column grid of available meals for the week. Each card: food photo, meal name, tags (e.g., "20 min", "Veggie"). Tap to select (green check overlay). Pre-select 3 popular ones as defaults that the friend can change.
- **Bottom bar:** "3 selected" count + "Next" button
- No plan type selection, no number-of-people configuration — defaults to 3 meals for 2 people (the free box spec)

**Step 2: Delivery details**
- **Header:** "Where should we deliver?" (with "2 of 3" step indicator)
- **Fields:** Name, delivery address (with autocomplete), preferred delivery date (date picker showing next available dates)
- **Bottom bar:** "Next" button

**Step 3: Create account & confirm**
- **Header:** "Confirm your free box" (with "3 of 3" step indicator)
- **Summary card:**
  - 3 selected meals (small thumbnails + names)
  - Delivery date and address
  - "Total: **Free**" (prominent, green)
  - "Sent by [Sarah]" with avatar — maintaining the personal connection to the end
- **Account creation:** Email + password fields (or "Sign in with Apple/Google" buttons)
- **Explicit no-commitment copy:** "This is a one-time gift. No payment needed, no subscription. If you love it, you can subscribe later."
- **CTA:** "Confirm my free box" (green, full-width)

**After confirmation:**
- Brief celebration screen: "Your free box is on its way! 🎉"
- "Sarah will be so happy" (reinforcing the social connection)
- "Delivery arriving [date]"
- "Download the HelloFresh app" link (optional)

## Navigation Map

```
Tab Bar: Home | My Menu | Share | Cookbook | Profile

Share Hub (tab)
├── "Text" → Message Composer (iMessage) → Native iMessage app
├── "Share" → Native share sheet → Message Composer (selected app) → Native app
├── "Copy link" → Clipboard
├── Sharing activity (view only)
└── "See your rewards →" → Rewards Hub

Post-Signup Nudge (bottom sheet, after signup)
├── "Text" / "Share" → Message Composer → Native messaging app
└── "Maybe later" → Dismiss

Post-Cook Nudge (inline card, after first delivery)
├── "Send a free box →" → Message Composer → Native messaging app
└── X → Dismiss

Rewards Hub (from Profile > My Rewards, or Share Hub link)
├── Loyalty tier card (view only)
├── Active discounts (view only)
├── Referral reward card
│   └── "Share with a friend" → Share Hub
├── Loyalty missions (view only)
└── Referral history (expandable)

Friend: Message Received (simulated messaging app)
└── Tap link preview → Friend: Claim Landing Page
    └── "Claim your free box" → Friend: Claim Flow
        ├── Step 1: Pick meals → Step 2: Delivery → Step 3: Confirm
        └── Confirmation: "Your free box is on its way!"
```

## Prototype Scenarios

The prototype demonstrates these scenarios, navigable via demo links at the bottom of screens:

### Scenario 1: Altruistic Sharing (Post-Cook Moment)

The customer has just received their first HelloFresh delivery and opens the app. The Post-Cook Nudge appears: "Love what you made? Share that feeling." They tap "Send a free box," compose a personal message with AI assist, and send it via WhatsApp. We then switch to the friend's perspective: they see the message in WhatsApp, tap the link, land on the claim page, and complete the simplified signup in three easy steps.

**Flow:** Home (with nudge) → Message Composer → Friend Message Received → Friend Landing Page → Friend Claim Flow → Confirmation

### Scenario 2: Self-Interested Sharing (Rewards Discovery)

A customer who has used up their marketing discounts visits the Rewards Hub looking for deals. They see their loyalty tier, notice they have no active discounts, and spot the referral reward card: "Earn $45 off by sharing with a friend." They tap through to the Share Hub, which feels warm and personal despite their transactional motivation. They compose and send a message.

**Flow:** Rewards Hub (no discounts) → Share Hub → Message Composer → (end of referrer-side flow)

### Scenario 3: Post-Signup Excitement

A brand new customer just completed their first subscription. The Post-Signup Nudge appears as a bottom sheet: "Know someone who'd love this too?" They share immediately while still excited.

**Flow:** (Post-signup confirmation) → Post-Signup Nudge → Message Composer → (end of referrer-side flow)

### Scenario 4: Organic Visit to Share Hub

A customer opens the Share tab on their own. They see the warm hub, review their sharing activity, and decide to send another invitation.

**Flow:** Share Hub → Message Composer → (end of referrer-side flow)

## Visual Direction

### Overall tone
Warm, emotional, friend-focused. Inspired by Headspace's referral screens (bold illustration, benefit-focused copy, single clear CTA) and the HelloFresh mockup showing a family dinner illustration with "Share that Home-Cooked Feeling."

### Referrer-side (Share Hub, Composer, Nudges)
- **Illustrations:** Warm, friendly illustrations of people sharing meals together. Consistent style across Share Hub hero and nudge graphics. NOT generic cartoon clip art (contrast with current HelloFriends illustrations).
- **Color palette:** HelloFresh green (#067A46) for CTAs and accents. Warm background tints — light sage/green (#E8F5E0) for nudge cards, cream/warm white for Share Hub background. Charcoal (#242424) for text.
- **Typography:** Serif headlines (emotional, editorial), sans-serif body text
- **Share buttons:** Green (#067A46) rounded pills with white text and icons. Consistent across all surfaces.
- **Illustrations vs. photos:** Hero areas use illustration (emotional, ownable). Message Composer and friend-facing screens use food photography (appetizing, real).

### Friend-side (Message, Landing Page, Claim Flow)
- **Message preview:** Clean, native-looking. The rich link preview card should feel premium but not heavy. Food photo, warm text, clean layout.
- **Landing page:** Photo-led hero with gradient overlay. Warm, inviting. The referrer's name and avatar are present throughout — "this is from a person, not a company."
- **Claim flow:** Minimal chrome, generous white space, green CTAs. Step indicator is simple dots or "1 of 3" text. No sidebar, no complex navigation. Feels more like filling out a party RSVP than configuring a subscription.
- **Confirmation:** Brief celebration with warmth. "Sarah will be so happy" — the social connection persists to the end.

### Rewards Hub
- **Tone shift:** More systematic and informational than the Share Hub. Clean cards, clear hierarchy.
- **Loyalty tier:** Prominent card with progress visualization. Tier-appropriate colors.
- **Referral reward:** Highlighted with gift icon and green accent. When discounts are empty, this card gets visual prominence (larger, higher position).

### Key visual contrasts with current RAF
| Current | Redesigned |
|---------|-----------|
| "HelloFriends 🙌" branding with generic clip art | "Share that Home-Cooked Feeling" with warm illustration |
| "$35 off" in the headline | Friend's benefit in the headline |
| Green branded header bar | Clean white/cream background with illustration hero |
| "Send free meals" (generic black button) | "Text" + "Share" (specific, actionable green pills) |
| Email field with "Send now" | In-app message composer with AI assist and photo selection |
| Corporate email to friend with knife cross-sell | Personal message in WhatsApp/iMessage from a real person |
| Full subscription signup for friend | 3-step claim flow: meals → address → confirm (no payment) |

## Edge Cases & States

| Scenario | Behavior |
|----------|----------|
| **Customer has 0 invitations** | Share Hub shows "You've used all your free boxes" with a "Request more" button. Tapping it shows a brief confirmation: "We'll add more to your account soon!" (fulfilled within 24h). |
| **Customer has never cooked** | Post-cook nudge doesn't appear. Share Hub is still accessible via tab bar. |
| **Friend is a lapsed HelloFresh customer** | The claim flow works the same — they are NOT rejected. They create a new account (or log into their existing one) and claim the free box. |
| **Friend already has an active subscription** | Landing page detects this (via email at account creation) and shows: "Looks like you already have HelloFresh! [Sarah]'s gift has been added as a credit to your next box." |
| **Customer dismissed post-signup nudge** | It never reappears. The post-cook nudge can still appear later at its own trigger. |
| **Customer dismissed post-cook nudge** | It never reappears. Share Hub remains available. |
| **AI-generated message is inappropriate** | AI uses safe, food-focused templates. Customer always sees the message before sending and can edit freely. |
| **Friend never claims the free box** | Status shows as "Pending" in the referrer's sharing activity. After 30 days, it shows "Expired" and the invitation credit is returned to the customer. |
| **Friend claims but never cooks** | Referrer's reward is triggered on friend's claim (not on friend cooking). Status shows "Claimed ✓". |
| **Multiple friends referred** | Sharing activity shows a list. Each has independent status. |
| **Customer at lowest loyalty tier** | Referral reward is the base amount (e.g., $25 off). The Rewards Hub shows how referring can help them advance to the next tier for bigger rewards. |
| **No internet during message composition** | Message is saved locally. "Send" button shows "No connection — try again" state. |

## Non-goals

- **QR code generation** — Planned for future iteration, not in this prototype
- **"Order for your friend" flow** — Secondary concept where referrer orders a box to the friend's address. Not in v1 prototype.
- **Lapsed customer campaigns** — Marketing campaigns telling customers to re-refer lapsed friends with "things are better now" messaging. Documented as a future feature, not prototyped.
- **CRM/email redesign** — The reduced-frequency email strategy is a backend/CRM change, not an app prototype concern
- **Loyalty program full build** — The Rewards Hub shows loyalty tier and points but the full loyalty program (missions, tier advancement, etc.) is not fully designed here. We show enough to demonstrate integration.
- **Push notifications** — No push notification design for referral prompts
- **A/B testing variants** — Single design direction, no variant exploration
- **Android** — iPhone only
- **Real AI integration** — AI message assist is simulated with pre-written variants
- **Payment processing** — Friend claim flow has no payment step by design
- **Recipe detail views** — Tapping a meal in the claim flow shows selection state only, not a full recipe page

## Open Questions

1. **Invitation allocation rules** — What moments trigger new invitation grants? How many at a time? How quickly are "request more" invitations fulfilled? These matter for production but can be simulated in the prototype.
2. **AI message personalization depth** — How much cooking history data feeds the AI? Just last meal cooked? Full order history? Favorite cuisines? For the prototype, we'll use a few canned variants.
3. **Rich link preview generation** — Can we generate true rich previews (Open Graph) that show the food photo and personal text in messaging apps? Or will it be a generic HelloFresh preview? Technical feasibility TBD — prototype assumes rich preview works.
4. **Free box size** — Is it always 3 meals for 2 people? Or does the friend get to choose a size? Prototype assumes fixed 3-for-2.
5. **Reward timing** — Is the referrer's reward granted when the friend claims (low barrier, faster gratification) or when the friend's box is delivered (higher signal of value)? Prototype assumes on-claim.
6. **Loyalty tier ↔ referral reward mapping** — Exact reward amounts per tier. Prototype will use placeholder values.
7. **Message template compliance** — Do legal/compliance teams need to approve the default message templates? Are there restrictions on what AI can generate?
8. **Lapsed customer detection** — When a friend turns out to be a lapsed customer, does the referrer get the same reward? Or a different one?
