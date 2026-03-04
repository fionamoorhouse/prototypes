# Cookbook Dinner Decision Flywheel — Handoff Brief

## Idea Napkin

**Name:** Cookbook Dinner Decision Flywheel

**Overview:** The Dinner Decision Flywheel transforms the HelloFresh Cookbook from a passive recipe save drawer into an active dinner decision engine. It works as a self-reinforcing loop with three parts: *Fill It* (bulk import recipes from social media, scan physical cookbooks), *Solve Dinner* (a daily AI-powered dinner suggestion with personalized reasoning, plus an AI recipe creator from fridge ingredients and grocery list generation), and *Grow It* (smart recommendations across app surfaces that keep the collection growing). Each part strengthens the others — a bigger collection produces better suggestions, better suggestions get people cooking, and cooking creates engagement that surfaces more recipes to save.

**Problem:** HelloFresh users — primarily working parents aged 30-45 who cook 3-4 times a week — actively save recipes from Instagram and TikTok but rarely cook them, turning their saved collections into "inspiration graveyards." They carry the mental load of deciding what's for dinner every night, and the current Cookbook does nothing to help with that decision. Browsing a big grid of saved recipes actually makes the problem worse by creating decision paralysis, and bulk-adding more recipes only deepens the graveyard effect. The core tension is that users *want* to cook interesting meals but are stuck in weeknight survival mode, and the tool they use to collect inspiration has no bridge to action.

**Solution:** Instead of showing users their full collection when they open the Cookbook, the flywheel presents a single daily dinner suggestion — one recipe from their saved collection paired with AI-generated reasoning that explains *why tonight* (e.g., "You saved this 3 weeks ago and haven't tried it yet — tonight's the night" or "You've saved 4 Southeast Asian recipes, let's lean into those bold flavors"). This reduces the decision from "pick from 14+ options" to "yes or not tonight," with a simple rotate button to see the next pick. The import flow is reframed around feeding the engine ("The more you save, the smarter your picks get") rather than hoarding recipes, and secondary features like the AI fridge-to-recipe creator and grocery list generation sit below the fold as utilities rather than competing for attention. The result is a Cookbook that answers the nightly question of "what's for dinner?" instead of just storing aspirations.

---

## Project Location
- **Prototype code:** `frontend/src/projects/hellofresh-flywheel/`
- **PRD:** `docs/prds/hellofresh-cookbook/dinner-decision-flywheel.md`
- **Previous conversation:** f426a6b8-98cb-4895-9bd0-cc0f0859f94f

## What This Is

A prototype for HelloFresh that reimagines the Cookbook (where users save recipes from Instagram/TikTok/websites) from a passive save drawer into a **dinner decision engine**. The concept has three reinforcing parts:

1. **Fill It** — Bulk import recipes from social media, scan physical cookbooks
2. **Solve Dinner** — Daily dinner suggestion, AI recipe creator from fridge ingredients, grocery list generation
3. **Grow It** — Smart recommendations across app surfaces that keep the collection growing

## The Feedback & Pivot

After building the initial 16-screen prototype, workshop feedback identified three problems:

1. **"Graveyard" risk** — Bulk-adding recipes passively creates more aspirational saves that never get cooked
2. **Redundancy** — "Solve dinner" content overlaps with existing discovery features
3. **Decision paralysis** — Showing a big grid of 14+ recipes doesn't help decide; it overwhelms

**The refinement (now implemented):** The CookbookHome screen was rebuilt around a **single daily dinner suggestion** with AI-generated reasoning. Instead of browsing a collection, you open the Cookbook and see ONE recipe with a persuasive "why" — e.g., *"You've saved 4 Southeast Asian recipes — let's lean into those bold flavors tonight"* or *"You saved this 3 weeks ago and haven't tried it yet. Tonight's the night."*

## What Changed in CookbookHome

**Before:** Spotlight card + filter chips + 14-recipe grid + AI dinner button + collaboration widget + grocery CTA + import CTA — lots of competing elements.

**After:**
- **Hero section (~60% of viewport):** "What's for dinner tonight?" headline, AI theme pill, one large recipe card (280px image, title, cook time), warm yellow AI reasoning callout, "Let's Make This" CTA + "Not tonight" rotate button, dot indicators for 5 daily suggestions
- **Compact secondary rows below the fold:** AI dinner creator, grocery list/meal planning, "Your saved recipes (14)" as a simple link — deliberately buried
- **Bottom nudge:** "The more you save, the smarter picks get" with import link — reframes collection-building as input to the recommendation engine, not an end goal

## Import Flow Reframing

- ImportPrompt headline: "Teach your Cookbook what you love" (was: "You have recipes saved on social media")
- ImportPrompt body: "The more recipes you import, the better your daily dinner picks get"
- ImportComplete CTA: "See Tonight's Pick" (was: "Explore My Cookbook")

## All Screens in the Prototype

| Screen | Flow | Status |
|--------|------|--------|
| `DemoLauncher` | Entry | Built |
| `CookbookHome` | Core | **Rebuilt with feedback** |
| `ImportPrompt` | Fill It | Updated messaging |
| `ImportProgress` | Fill It | Built |
| `ImportComplete` | Fill It | Updated messaging |
| `PhotoScan` | Fill It | Built |
| `ScanProcessing` | Fill It | Built |
| `ScanResult` | Fill It | Built |
| `AIDinnerInput` | Solve Dinner | Built |
| `AIDinnerGenerating` | Solve Dinner | Built |
| `AIDinnerResult` | Solve Dinner | Built |
| `GrocerySelect` | Solve Dinner | Built |
| `GroceryList` | Solve Dinner | Built |
| `PostSaveRecs` | Grow It | Built |
| `HomeFeed` | Grow It | Built |
| `RecipeDetail` | Grow It | Built |

## Technical Patterns

- **Navigation:** `usePrototype()` hook provides `goTo('ScreenName')` and `searchParams`
- **Images:** Unsplash via `img(photoId, w, h)` helper, `FOOD` map for consistent food photos
- **Styling:** Inline styles, HelloFresh green `#067A46`, charcoal `#242424`, serif headings (Georgia), system sans-serif body
- **Brand:** iOS-native feel, 54px status bar, 34px home indicator, `TabBar` component with Discover/Menu/Search/Cookbook/Profile

## Target User

Emanuel — 30-45, partner + two kids, both work, $125K+. Cooks 3-4x/week. Saves recipes on social but rarely cooks them. Carries the mental load of figuring out dinner every night.

## What Needs Refinement

The CookbookHome redesign is functionally complete but could benefit from:
- **DemoLauncher updates** — the launcher still describes the pre-feedback concept; could be updated to reflect the "daily concierge" framing
- **Walkthrough narrative tuning** — the demo flow for stakeholders should emphasize: open Cookbook → see tonight's pick with reasoning → tap "not tonight" to see another → "Let's Make This" → recipe detail → grocery list
- **Visual polish** — animation on the "not tonight" transition, the AI reasoning callout design, overall spacing
- **Collaboration feature** — the household voting widget was removed; could be re-introduced in a lighter form (e.g., "Share tonight's pick with Sarah" as a single action rather than a full collaboration sheet)
