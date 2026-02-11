# Chef Attribution & Social Discovery

## Parent Project

[HelloFresh Cookbook — v1 Intent](./v1-intent.md)

## Problem Statement

HelloFresh recipes are anonymous. Users pick meals based on food photos and descriptions but have no connection to the person who developed the recipe. In the broader food world, trust in a creator is one of the strongest drivers of recipe discovery — users follow chefs on social media because they trust their taste and style. When those users save recipes to their HelloFresh Cookbook, there's no way to see who created what, browse more from that creator, or discover what others are collecting.

We need to:

1. **Attribute recipes to their creators** — whether that's a HelloFresh chef, a food influencer, or a community member
2. **Make creators browsable** — let users tap into a creator's profile and see their recipes
3. **Enable public collections** — let influencers and users publish curated collections that others can subscribe to
4. **Build a discovery surface** — a place to browse collections and creators beyond your own cookbook

## Chosen Approach

A layered attribution system where every recipe has a **creator** and every collection has an **owner**. These are distinct concepts:

- **Creator** = the person who originally made or published the recipe
- **Owner** = the person who assembled the collection

This distinction is critical. When a normal user saves an influencer's recipe and puts it in their own collection, the user owns the collection but the influencer remains the recipe's creator. This preserves credit while celebrating curation.

### Creator types

| Type | Who | Attribution source | Can publish public collections |
|------|-----|--------------------|-------------------------------|
| **HelloFresh Chef** | Staff recipe developers (e.g., Michelle Doll Olson) | Automatic from HelloFresh catalog | Yes (editorially managed) |
| **Influencer** | Food creators with social presence who use the Cookbook | Their HelloFresh account profile | Yes |
| **User** | Normal HelloFresh subscribers | Their HelloFresh account profile | Yes |

### Key concepts

- **Public collections** — Any user can toggle a collection to public. Public collections are discoverable and subscribable.
- **Subscribing** — A per-collection action. Like following a Spotify playlist. When the owner adds a recipe, it automatically appears in subscribers' cookbooks. Subscribed collections sit alongside your own on the Cookbook home screen.
- **Following** — A per-creator action. Following a creator subscribes you to all their current and future public collections. It's the "subscribe to everything" shortcut.
- **Discover** — A new tab in the bottom tab bar (replacing "Home") for browsing featured collections, creator profiles, and trending public collections.
- **Attribution on save** — When a user saves a recipe from social media, the system parses the original creator from post metadata (username, profile photo) and gives the user a chance to confirm or edit before finalizing.

## Data Model

### Recipe (updated)

Existing recipe fields remain. New additions:

```
creator: {
  id: string
  name: string
  avatar: string
  type: 'hellofresh-chef' | 'influencer' | 'user'
}
savedBy: userId  // the person who saved this instance to their cookbook
```

The `creator` and `savedBy` can be different people. A recipe card displays `creator`; the Cookbook home tracks `savedBy` for the "Recently Saved" section.

### Collection (updated)

```
owner: {
  id: string
  name: string
  avatar: string
  type: 'hellofresh-chef' | 'influencer' | 'user'
}
visibility: 'public' | 'private'
subscriberCount: number
```

### Creator Profile

```
{
  id: string
  name: string
  displayName: string         // user-chosen name for public collections (can differ from real name)
  avatar: string
  coverPhoto: string          // hero image for profile header
  type: 'hellofresh-chef' | 'influencer' | 'user'
  bio: string
  specialties: string[]       // e.g., "High Protein", "Comfort Food"
  role: string                // for chefs: "Head Chef", "Recipe Developer"
  socialLinks: { platform, url }[]
  followerCount: number       // users who "Follow" this creator
  recipeCount: number
  publicCollections: Collection[]
}
```

## Changes to Existing Screens

### Cookbook Home (Cookbook.tsx)

- **Recipe cards** in the "Recently Saved" carousel now include a creator attribution row below the title: small avatar (20px circle) + creator name (13px, #666). Tapping navigates to the creator's profile.
- **Collections section** is renamed from "Your Collections" to **"Collections"** and now intermingles:
  - **Own collections** — displayed as before (thumbnail collage, name, recipe count)
  - **Subscribed collections** — same card format but with a small owner avatar overlaid on the thumbnail corner and a subtle "Subscribed" label beneath the collection name
- **"Discover" entry point** — a link or button ("Discover more collections") at the bottom of the collections grid, linking to the Discover screen.

### Collection Detail (CollectionDetail.tsx)

- **Collection header** gains an owner attribution row: owner avatar (32px) + name + type badge ("HelloFresh Chef" / "Creator") + "Public" or "Private" pill
- **Subscribe button** — When viewing someone else's public collection, a green "Subscribe" pill button appears in the header. Toggles to "Subscribed ✓" (gray) when active.
- **Recipe cards** in the grid now show creator attribution (small avatar + name) beneath each recipe title.
- **Three-dot menu** for collections you don't own shows "Share" and "Report" (not "Edit" or "Delete").

### Recipe Cards (all contexts)

Every recipe card — in carousels, grids, collection details, and search results — gains a creator line:

- Small circular avatar (20px) + creator name (13px, secondary color)
- Positioned below the recipe title and above metadata (cook time, tags)
- Tapping the creator line navigates to that creator's profile

### Save from Social Flow

After a recipe is saved from Instagram/TikTok and the user returns to the app, the attribution confirmation appears (see new screen below). This is layered on top of the existing celebration/confirmation flow — for the **first save**, the celebration drawer still appears but includes attribution; for **subsequent saves**, only the attribution toast appears.

## New Screens

### Screen: Discover

**Purpose:** Browse collections, creators, and recipes beyond your own cookbook. This is the social discovery layer of the Cookbook feature.

**Entry points:**
- **Discover tab** in the bottom tab bar (replaces the existing "Home" tab)
- "Discover" link on Cookbook home screen (secondary entry point)

**Layout:**

- **Header** — "Discover" title (serif, large), search icon (top right)
- **Saved by you** — Horizontal carousel of the user's own recently saved recipes (quick access to personal content). Recipe cards with thumbnail + title + source badge. "View all" link → All Recipes screen.
- **Featured Collections** — Full-width horizontal scroll of large editorial cards. Each card: cover image collage with gradient overlay, collection name (white, bold, over gradient), owner avatar + name, recipe count. Mix of HelloFresh curated collections and popular influencer collections.
- **Top Creators** — Horizontal scroll of circular avatar thumbnails (64px) with names underneath. Mix of HelloFresh chefs and popular influencers. Tapping opens Creator Profile.
- **Most Recent** — 2-column grid of recipes recently published across the platform (not just the user's saves). Shows recipe thumbnail, title, creator avatar + name. "View all" link.
- **Trending Collections** — 2-column grid of public collections sorted by subscriber count. Cards show: thumbnail collage, collection name, owner avatar + name, subscriber count. "See all" link.
- **Tab bar** — Updated bottom navigation: **Discover** (replaces Home), Menu, Search, Cookbook, Profile

**Interactions:**
- Tap a collection card → Collection Detail (public view, with Subscribe button)
- Tap a creator avatar → Creator Profile
- Tap a recipe card → (no-op in prototype; future: recipe detail)
- Tap search icon → search overlay (not functional in prototype, shown for completeness)

---

### Screen: Creator Profile

**Purpose:** Lightweight profile for any creator type. Shows who they are, what they cook, and their public collections.

**Layout varies by type:**

#### HelloFresh Chef
- **Hero area** — Large photo (top 40% of screen, similar to Mob's chef pages). Name overlaid on gradient at bottom of photo. "HelloFresh Chef" badge (green pill) + role text (e.g., "Head Chef").
- **Specialty tags** — Horizontal row of rounded tag pills (e.g., "Locally Sourced", "Comfort Food with a Twist")
- **Bio** — 2-3 sentences. Truncated with "Read more" if long. Clean serif heading, sans-serif body.
- **Recipes by [Name]** — 2-column grid of recipe cards showing HelloFresh catalog recipes they developed. Each card: thumbnail, title, cook time, difficulty. A save/bookmark icon on each card allows saving to cookbook.
- No collections section for v1 (HelloFresh chef collections are shown editorially on Discover)

#### Influencer
- **Hero area** — Large photo with name overlay. "Creator" badge (charcoal pill). Follower count. Social media links (Instagram/TikTok icons).
- **Bio** — Short description. "Read more" / "Show less" toggle.
- **Section toggle** — "Cookbook" and "Recipes" tabs (reference: Pepper's profile tabs)
  - **Cookbook tab** — 2-column grid of their public collections. Cards: thumbnail collage, collection name, recipe count, subscriber count.
  - **Recipes tab** — 2-column grid of individual recipes they've created.
- **Follow button** — At the top, next to the name. Following a creator subscribes you to all their current and future public collections. Toggles to "Following ✓".

#### Regular User (Curator)
- **Profile area** — Smaller avatar (80px circle) + display name + follower count. No hero photo (simpler than influencer). "Follow" button.
- **Bio** — Optional. Many users won't have one.
- **Collections** — 2-column grid of their public collections. This is the primary content for curators.
- No "Recipes" tab (regular users don't create recipes; they curate them)

**Interactions:**
- Tap a collection → Collection Detail
- Tap a recipe card → (no-op in prototype)
- Tap "Follow" → toggles to "Following ✓" (subscribes to all their public collections)
- Tap social link → opens social media app/browser
- Back arrow → previous screen

---

### Screen: Attribution Confirmation (Toast)

**Purpose:** After saving a recipe from social media, confirm the detected creator attribution.

**This is not a full screen.** It's a floating card/toast that appears at the top of whatever screen the user returns to (usually Cookbook home).

**Layout:**
- Slide-down card from top of screen, branded green left border
- Small recipe thumbnail (48px, rounded) on the left
- "Saved to Cookbook" (bold, 15px)
- "Recipe by [Creator Name]" with small avatar (20px) — parsed from social post metadata
- "Edit" text link on the right
- Auto-dismisses after 5 seconds, or user taps to dismiss
- Tapping "Edit" expands inline: text input for creator name + "Done" button

**For the first save:** This attribution info is embedded within the existing celebration drawer instead of appearing as a separate toast. The celebration drawer shows the recipe card with creator name, and an "Edit creator" link.

**For subsequent saves:** The lightweight toast appears.

## Navigation Map

```
Cookbook Home (updated)
├── Recently Saved carousel
│   └── Recipe cards → tap creator → Creator Profile
├── Collections section
│   ├── Own collections → Collection Detail
│   ├── Subscribed collections → Collection Detail (public, with Unsubscribe)
│   └── "Discover more" → Discover screen
└── Three-dot menu (existing)

Discover (new)
├── Saved by you → View all → All Recipes
├── Featured Collections → Collection Detail (public)
│   └── Subscribe → adds to Cookbook Home
├── Top Creators → Creator Profile
│   ├── Collections → Collection Detail
│   └── Recipes → (recipe cards)
├── Most Recent → View all → (filtered recipe grid)
└── Trending Collections → Collection Detail (public)

Creator Profile (new)
├── [Chef] Recipes grid → (save to cookbook)
├── [Influencer] Cookbook tab → Collection Detail
├── [Influencer] Recipes tab → (recipe cards)
├── [User] Collections grid → Collection Detail
└── Back → previous screen

Collection Detail (updated)
├── Owner header (avatar + name + badge + Subscribe)
├── Recipe grid → tap creator → Creator Profile
└── Back → previous screen

Attribution Confirmation (toast, after social save)
├── Auto-dismiss (5s)
├── "Edit" → inline name edit
└── Tap to dismiss
```

## Prototype Scenarios

The prototype should demonstrate these four scenarios, navigable via demo links:

### Scenario A: HelloFresh Chef Attribution
Start on the Cookbook home with saved recipes. A HelloFresh recipe ("Crispy Salmon Rice Bowls") shows "Michelle Doll Olson" as creator with her avatar. Tap her name → her Chef Profile. See her bio, specialty tags, and other recipes. Tap back → return to Cookbook.

### Scenario B: Influencer Public Collection
Start on the Discover screen. See a featured collection: "@EasyMealsByMia's Weeknight Winners." Tap it → Collection Detail showing Mia as the owner, 1.2k subscribers, and a grid of her recipes (each attributed to her). Tap "Subscribe" → button toggles. Go to Cookbook home → the subscribed collection now appears in the Collections section alongside own collections.

### Scenario C: Normal User as Curator
From the Discover screen, find a trending collection: "High Protein Meal Prep" by "Alex T." Tap it → Collection Detail shows Alex as the owner. Inside, recipes are attributed to various creators (some HelloFresh chefs, some influencers). The value is Alex's curation, not recipe creation. Tap a creator name on one of the recipes → that creator's profile.

### Scenario D: Save & Attribute from Social
Trigger a save from social media (reuse the existing SocialHandoff flow). When returning to the app, the attribution toast appears: "Saved to Cookbook — Recipe by @ChefMaria." Option to "Edit" if the detected creator is wrong. The recipe then shows up in the Cookbook with ChefMaria's avatar and name.

## Visual Direction

- **Creator avatars:** 20px on recipe cards, 32px on collection headers, 64px on Discover creator row, 80-120px on profile hero
- **Type badges:** Colored pills — "HelloFresh Chef" (green #067A46 bg, white text), "Creator" (charcoal #242424 bg, white text), "Public" (gray outline), "Subscribed" (green outline #067A46)
- **Subscribe button:** Green (#067A46) rounded pill with white text. Subscribed state: white bg, green border, "Subscribed ✓" text
- **Discover featured cards:** Full-width (or near) with food photography and gradient text overlay. Inspired by Mob's collection cards and the reference screenshot showing "Saved by you" and "Most recent" sections.
- **Profile hero:** Photo fills top ~40% of screen. Name in bold white over dark gradient. Inspired by Mob's creator pages (Finn Tonry, Ben Lippett examples).
- **Collection ownership indicator on Cookbook home:** Small avatar (24px) in bottom-right corner of the collection thumbnail for subscribed collections
- **Attribution toast:** Rounded card, white bg, subtle shadow, green left border accent (#067A46), slides down from top

## Edge Cases & States

| Scenario | Behavior |
|----------|----------|
| **Recipe saved before attribution existed** | Shows "Unknown creator" with generic avatar. "Add creator" link available. |
| **Social post has no parseable creator** | Attribution toast shows "Unknown creator" and prompts manual entry. |
| **Creator deletes their account** | Recipes retain cached name + photo. Profile shows "This creator is no longer active." Collections they owned become read-only for subscribers. |
| **User unsubscribes from collection** | Collection removed from Cookbook home. Recipes from that collection already saved individually remain. |
| **Owner makes public collection private** | Subscribers lose access. Collection disappears from their Cookbook. |
| **Creator has no public collections** | Profile shows only the Recipes section; Collections section hidden. |
| **User views their own profile** | Same layout as the curator profile, but with "Edit profile" instead of "Follow." |
| **Subscribed collection has zero recipes** | Shows empty state: "No recipes yet — check back soon!" |
| **Multiple creators for one recipe** | v1 supports single creator only. First creator detected wins. |

## Non-goals

- **Recipe detail view** — Tapping a recipe card still doesn't open a full recipe (consistent with foundation PRD)
- **Meal kit menu attribution** — Covered by a separate team's prototype
- **Algorithmic recommendations** — Discover content is editorially curated for v1
- **Social engagement features** — No likes, comments, or ratings on collections or recipes
- **Creator verification** — No formal verification system for influencers
- **Notifications** — No push notifications for subscribed collection updates
- **Search functionality** — Search UI shown on Discover but not functional in prototype
- **Revenue/monetization** — No paid collections, sponsored placements, or creator payouts
- **Content moderation** — No reporting workflow or content review pipeline
- **Creator onboarding flow** — We assume creators and their profiles already exist

## Resolved Decisions

- **Tab bar placement** — Discover gets its own tab in the bottom bar, replacing "Home." Tab order: Discover, Menu, Search, Cookbook, Profile.
- **Display names** — Users can choose a display name for their public-facing profile and collections. This does not need to match their real name.
- **Follow vs. Subscribe** — These are distinct actions. "Subscribe" is per-collection (like following a Spotify playlist). "Follow" is per-creator and automatically subscribes you to all their current and future public collections.

## Open Questions

1. **Subscription sync cadence** — When an influencer adds a recipe to a subscribed collection, how quickly does it appear for subscribers? Real-time? Daily batch? Doesn't affect the prototype but matters for production.
2. **HelloFresh chef data backfill** — Are existing HelloFresh recipes already tagged with their recipe developer in the backend, or does this require data migration?
3. **Attribution editing after save** — Can users edit recipe attribution later (from the recipe card or a settings menu), or only at the moment of save?
4. **Content moderation** — What moderation is needed for public collections and display names?
