# First-Time Cookbook Onboarding

## Parent Project

[HelloFresh Cookbook — v1 Intent](./v1-intent.md)

## Problem Statement

The Cookbook's core action — saving a recipe from social media into HelloFresh — is unintuitive. Users arriving via deep link (from a social post or email campaign) land on an empty Cookbook with no context for what it is, why it's valuable, or how to use it. Without guided onboarding, most users will bounce before ever saving their first recipe.

We need to:

1. **Explain the value proposition** — what the Cookbook is and why it matters
2. **Create desire** — show appealing recipes that make the user want to try it
3. **Teach the mechanic** — walk the user through saving a recipe from social media into HelloFresh

## Chosen Approach

A progressive onboarding funnel with three stages: Watch → Browse → Try. Each stage has a clear purpose and a natural exit that advances the user to the next stage. The flow is interruptible — users can leave at any point and resume where they left off on their next visit.

### Key Decisions

- **Video dismissal** — Closing the video (via X or "Maybe later") marks it as seen and advances the user to the recipe suggestion stage. We never force the user to watch the video to proceed.
- **Swipe right = express interest, not save** — Swiping right on a suggested recipe deep links the user to that recipe on social media and launches the PIP tutorial. The actual save happens through the real share-to-HelloFresh flow. This teaches the mechanic they'll use going forward rather than giving them a fake shortcut.
- **Reject all suggestions** — If the user swipes left on every suggestion, we show a friendly fallback explaining they can save any recipe from social media on their own, with a brief text explanation.
- **First save celebration** — When the user returns after saving their first recipe, we show a brief celebration moment before transitioning to the normal Cookbook view.
- **PIP tutorial** — A pre-recorded video simulating the share-to-HelloFresh flow, played in a floating window overlay while the user is in the social media app.

## User States

The onboarding flow is driven by two flags: `hasSeenVideo` and `hasSavedRecipes`. These determine what the user sees when they land on the Cookbook screen.

| State | hasSeenVideo | hasSavedRecipes | Cookbook shows |
|-------|-------------|----------------|---------------|
| **Brand new** | false | false | Video prompt (Screen 1) |
| **Video seen, no saves** | true | false | Recipe suggestions (Screen 3) |
| **Has saved recipe(s)** | true/false | true | Normal Cookbook (from foundation PRD) |

Note: "Mid-tutorial dropout" (user swiped through suggestions but never completed a save) is equivalent to the "Video seen, no saves" state — they return to the recipe suggestions.

## Changes to Existing Screens

### Cookbook Empty State

The empty state from the foundation PRD is replaced by the onboarding flow for users who have never saved a recipe. The original empty state (with suggested starter collections like "Favorites", "Quick Dinners", "To Try") is no longer shown. Instead, the empty Cookbook becomes the container for the onboarding stages described below.

Once the user has saved at least one recipe, the Cookbook shows the normal populated view from the foundation PRD.

## New Screens

### Screen 1: Empty Cookbook — Video Prompt

**Purpose:** Introduce the Cookbook feature and motivate the user to watch the onboarding video.

**When shown:** User has `hasSeenVideo = false` and `hasSavedRecipes = false`.

**Layout:**
- **Sticky header** — Back arrow, "Cookbook" title (serif) with "Beta" badge, three-dot overflow menu
- **Onboarding card** — Full-width card with light green (#E8F5E0) background, rounded corners
  - "NEW" badge (small green pill, top-left of card)
  - **Heading:** "Add recipes from socials" (bold, large)
  - **Subheading:** "Save your cooking inspiration in your cookbook now"
  - **Video thumbnail** — Large, rounded, shows a still frame from the onboarding video with a centered play button overlay
  - **CTA button:** "Save your first recipe" (black background, white text, full-width within card)
- **Bottom section** — "Want to know more?" with a link to a help article or longer explainer. This is the safety net for users who need more context.
- **Tab bar** — Standard HelloFresh bottom navigation with Cookbook tab active

**Interactions:**
- Tapping the video thumbnail or the CTA button opens the onboarding video (Screen 2) as a full-screen overlay
- Tapping "Want to know more?" opens a help/explainer page (out of scope for prototype — can link to a placeholder)

---

### Screen 2: Onboarding Video (Full-Screen Overlay)

**Purpose:** 20-second marketing video explaining the Cookbook value proposition. Ends with a CTA to start saving recipes.

**When shown:** Triggered from Screen 1 (tap on video thumbnail or CTA).

**Layout:**
- **Full-screen video player** — Video fills the screen, plays with sound
- **Close button** — X icon in top-left corner, semi-transparent dark background circle
- **End state** (after video completes or user scrubs to end):
  - Video pauses on final frame (woman cooking)
  - Social-style engagement indicators on the right edge (heart icon with count, comment icon with count) — decorative, reinforcing the social media connection
  - **CTA button:** "Save your first recipe" (white background, black text, full-width, positioned near bottom)
  - **Skip link:** "Maybe later" (underlined text, centered below CTA)

**Interactions:**
- Tapping X (close) at any point → Sets `hasSeenVideo = true`, dismisses overlay, returns to Cookbook which now shows Screen 3 (recipe suggestions)
- Video plays to completion → Shows end state with CTA and "Maybe later"
- Tapping "Save your first recipe" → Sets `hasSeenVideo = true`, dismisses overlay, transitions to Screen 3 (recipe suggestions)
- Tapping "Maybe later" → Sets `hasSeenVideo = true`, dismisses overlay, transitions to Screen 3 (recipe suggestions)

**Note:** All exit paths from the video mark it as seen. The user never sees Screen 1 again. The difference between the exits is intent signal only (useful for analytics), not flow branching.

---

### Screen 3: Recipe Suggestions (Swipe Cards)

**Purpose:** Spark desire by showing curated recipes, and guide the user toward trying the save-from-social flow.

**When shown:** User has `hasSeenVideo = true` and `hasSavedRecipes = false`.

**Layout:**
- **Header** — "Cookbook" title (serif, large, left-aligned)
- **Suggestion section:**
  - **Heading:** "Add your first favorite recipes"
  - **Recipe card** — Large, centered card (roughly 280x320px) with:
    - Full-bleed food photography
    - Gradient overlay at bottom (dark)
    - Recipe name (white, bold, over gradient)
    - Source icon (Instagram/TikTok) + "From {creator-name}" (white, smaller, over gradient)
  - **Action buttons** — Below the card, centered horizontally:
    - **Reject (X)** — Circular button with red outline, X icon. Swipe left equivalent.
    - **Save (bookmark)** — Circular button with dark outline, bookmark icon. Swipe right equivalent.
  - **Pagination** — Dot indicators showing position in the suggestion set (e.g., 5 dots) with left/right arrow buttons
- **Your Collection section** (below suggestions):
  - **Heading:** "Your collection" with "View All" link (right-aligned)
  - **Horizontal scroll:** "Create new" card (+ icon, dashed border). No pre-seeded collections — this section is empty until the user creates one.
- **Tab bar** — Standard HelloFresh bottom navigation

**Interactions:**
- **Swipe right on card / tap bookmark** → Transitions to Screen 4 (social media handoff for that recipe). The card animates off to the right.
- **Swipe left on card / tap X** → Card animates off to the left, next suggestion card slides in.
- **Exhaust all suggestions** → Transitions to Screen 3b (fallback state).
- **Tap "Create new" collection** → Opens "Create Collection" drawer from foundation PRD
- **Left/right arrows** → Navigate between suggestion cards (accessibility alternative to swiping)

**Content:**
- **Number of suggestions:** 5 curated recipes. Enough variety without overwhelming. These should be visually appealing, from recognizable creators, and span a few cuisines/styles.
- **Source of suggestions:** Real social media recipes from food creators that have been pre-indexed. Each recipe needs a corresponding deep link to the original social media post.

---

### Screen 3b: Suggestions Exhausted (Fallback)

**Purpose:** Catch users who rejected all suggestions and give them a path forward.

**When shown:** User swipes left on all suggestion cards.

**Layout:**
- Same header and tab bar as Screen 3
- **Illustration + message card** (centered, same area where swipe cards were):
  - Friendly illustration (e.g., phone with share icon)
  - **Heading:** "Save any recipe you find"
  - **Body text:** "See a recipe you love on Instagram or TikTok? Tap share, then choose HelloFresh to save it to your cookbook."
  - **CTA button:** "Browse recipes on Instagram" (optional — deep link to a curated Instagram collection or hashtag)
  - **Secondary link:** "Watch how it works" (re-plays the PIP tutorial video)
- **Your Collection section** — Same as Screen 3 ("Create new" card only)

---

### Screen 4: Social Media Handoff

**Purpose:** Send the user to the actual recipe on social media and launch the PIP tutorial to guide them through saving it.

**When shown:** User swipes right on a suggestion card or taps the bookmark button.

**Layout:** This is a transition moment, not a full screen. The flow is:

1. **Brief interstitial** (0.5–1s) — "Opening Instagram..." / "Opening TikTok..." with the app icon and a loading indicator. This sets expectations before the app switch.
2. **App switch** — HelloFresh deep links to the specific recipe post on Instagram/TikTok. The social media app opens to that post.
3. **PIP tutorial overlay** — A floating video window appears over the social media app showing a pre-recorded walkthrough of the share-to-HelloFresh flow.

**PIP Tutorial Details:**
- **Format:** Small floating video window (roughly 30% of screen width), positioned in the top-left corner to stay out of the way of social media UI elements
- **Content:** Pre-recorded screen recording showing:
  1. Tapping the share button on a social post
  2. Scrolling to or searching for "HelloFresh" in the share sheet
  3. Tapping HelloFresh to complete the save
- **Controls:** Tap to pause/resume, drag to reposition, X to dismiss
- **Duration:** ~10–15 seconds
- **Looping:** Plays once, then shows a replay button

**What happens when the user doesn't have the social app installed:**
- Fall back to opening the post in a mobile web browser
- PIP tutorial still launches over the browser

---

### Screen 5: First Save Celebration

**Purpose:** Reward the user for completing their first save and transition them to the normal Cookbook experience.

**When shown:** User returns to HelloFresh after saving their first recipe from social media. Sets `hasSavedRecipes = true`.

**Layout:**
- **Celebration overlay** — Brief, joyful moment:
  - Confetti animation or subtle sparkle effect
  - **Heading:** "Your cookbook has started!" (centered, large)
  - **Subheading:** "Your first recipe is saved. Keep collecting!"
  - Recipe card preview (the recipe they just saved — thumbnail, title, source)
  - **CTA button:** "View my cookbook" → Dismisses overlay, shows normal Cookbook view
  - **Secondary link:** "Save another recipe" → Returns to remaining suggestion cards (if any) or the fallback state

**Auto-dismiss:** If the user doesn't interact, the overlay auto-transitions to the Cookbook after 4–5 seconds.

## Navigation Map

```
Deep Link (social post / email)
└── Cookbook Screen
    ├── [hasSeenVideo=false, hasSavedRecipes=false]
    │   └── Screen 1: Video Prompt
    │       ├── Tap video/CTA → Screen 2: Onboarding Video
    │       │   ├── X (close) → Screen 3: Recipe Suggestions
    │       │   ├── "Save your first recipe" → Screen 3: Recipe Suggestions
    │       │   └── "Maybe later" → Screen 3: Recipe Suggestions
    │       └── "Want to know more?" → Help page (external)
    │
    ├── [hasSeenVideo=true, hasSavedRecipes=false]
    │   └── Screen 3: Recipe Suggestions
    │       ├── Swipe right / bookmark → Screen 4: Social Handoff + PIP Tutorial
    │       │   └── User saves recipe → Screen 5: Celebration
    │       │       ├── "View my cookbook" → Normal Cookbook
    │       │       └── "Save another recipe" → Screen 3 (remaining cards)
    │       ├── Swipe left on all → Screen 3b: Suggestions Exhausted
    │       │   ├── "Browse recipes on Instagram" → Instagram (external)
    │       │   └── "Watch how it works" → PIP tutorial replay
    │
    └── [hasSavedRecipes=true]
        └── Normal Cookbook (foundation PRD)
```

## Edge Cases & States

| Scenario | Behavior |
|----------|----------|
| **Deep link when not logged in** | Standard HelloFresh login flow first, then redirect to Cookbook. Onboarding state is preserved. |
| **Deep link when user already has saved recipes** | Skip onboarding entirely, show normal Cookbook. |
| **Video fails to load** | Show error state on video card with retry button. Offer "Skip to recipes" link so the user isn't blocked. |
| **Social media app not installed** | Open the recipe post in mobile web browser instead. PIP tutorial still plays. |
| **User returns from social without saving** | They land back on Screen 3 with the same suggestion card still active. No state change. |
| **User returns from social after saving** | Detect the new recipe in their Cookbook, trigger Screen 5 (celebration). |
| **User force-quits during video** | On next launch, `hasSeenVideo` may not be set (depends on when flag is persisted). They see Screen 1 again. Acceptable — the video is short. |
| **User on Android** | Out of scope for v1 (iPhone only per foundation PRD). |
| **Suggestion recipes become unavailable** | If a social media post is deleted, that card should be filtered out server-side. The suggestion set is curated and maintained. |
| **Slow network on social handoff** | The interstitial ("Opening Instagram...") provides a grace period. If the app switch takes too long, show a "Taking too long? Try again" option. |
| **PIP tutorial dismissed immediately** | User proceeds without guidance. If they return without saving, they're back on Screen 3. They can tap "Watch how it works" on Screen 3b if they need help later. |

## Analytics Events

Key events to track for funnel analysis:

| Event | Description |
|-------|-------------|
| `onboarding_video_started` | User tapped to play the video |
| `onboarding_video_completed` | Video played to the end |
| `onboarding_video_dismissed` | User tapped X before video ended (include `seconds_watched`) |
| `onboarding_video_cta_tapped` | "Save your first recipe" tapped on video end screen |
| `onboarding_video_skipped` | "Maybe later" tapped |
| `suggestion_card_shown` | A recipe suggestion was displayed (include `card_index`, `recipe_id`) |
| `suggestion_card_accepted` | Swipe right / bookmark (include `card_index`, `recipe_id`) |
| `suggestion_card_rejected` | Swipe left / X (include `card_index`, `recipe_id`) |
| `suggestions_exhausted` | User rejected all suggestion cards |
| `social_handoff_initiated` | App switch to social media triggered (include `platform`, `recipe_id`) |
| `pip_tutorial_started` | PIP tutorial video began playing |
| `pip_tutorial_completed` | PIP tutorial played to end |
| `pip_tutorial_dismissed` | PIP tutorial closed early |
| `first_recipe_saved` | User's first recipe successfully saved to Cookbook |
| `celebration_cta_tapped` | "View my cookbook" or "Save another recipe" tapped |

## Non-goals

- **Onboarding for non-deep-link users** — Users who discover Cookbook organically through the tab bar get the same flow, but we're not optimizing entry points other than deep links in v1.
- **Personalized suggestions** — Recipe suggestions are curated editorially, not algorithmically based on user preferences. Personalization is a future enhancement.
- **In-app recipe saving** — The onboarding teaches the social-media-to-HelloFresh save flow specifically. In-app save (from HelloFresh's own recipe catalog) is a separate feature.
- **Onboarding for the PIP tutorial itself** — We assume the floating video is self-explanatory. We don't tutorial-the-tutorial.
- **Re-engagement flows** — Push notifications or emails to bring back users who started onboarding but didn't finish are out of scope for this PRD.
- **A/B testing infrastructure** — We note where we'd want to test (e.g., number of suggestion cards, video length) but don't build the testing framework.

## Resolved Decisions

- **PIP tutorial** — Confirmed technically feasible; already built. This PRD covers the onboarding flow around it, not the PIP implementation itself.
- **Detection of first save** — The share extension writes the saved recipe to the API, which returns a success response. When HelloFresh foregrounds after the app switch, it checks for newly saved recipes to determine whether to show the celebration screen.
- **Collection pre-seeding** — No pre-seeded collections. The "Your collection" section shows only a "Create new" card until the user creates their first collection.
- **"+" button** — Removed from the onboarding screens. Manual URL/paste import is not part of this flow.

## Open Questions

1. **Suggestion card content** — Who curates the 5 suggested recipes? How often are they refreshed? Is there a content pipeline or are they hardcoded for launch?
2. **"Save to HelloFresh" share extension** — The entire flow assumes a working share extension exists. Is that being built in parallel? What's its status?
3. **Video hosting** — Where is the onboarding video hosted? CDN? Bundled in the app? This affects load time and the error state likelihood.
