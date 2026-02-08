# HelloFresh Cookbook

## Problem Statement

HelloFresh users discover recipes on Instagram, TikTok, and food blogs but have no way to save and organize them within HelloFresh. Recipes get lost in phone screenshots and scattered bookmarks. Users want a personal cookbook — a place to collect, organize, and browse saved recipes when deciding what to cook.

## Chosen Approach

Folder-based collections (inspired by Pinterest boards and NYT Cooking cookbooks). Users can save recipes and organize them into named collections. The model is familiar and low-friction: save first, organize later.

## User Context

- **User:** HelloFresh subscribers who actively discover recipes on social media
- **Platform:** Mobile app (iPhone)
- **Brand:** HelloFresh — signature green (#067A46), deep charcoal (#242424), white (#FFFFFF)
- **Typography:** Bold serif for headings, clean sans-serif for body

## Screens

### 1. Cookbook (Home)

The main screen and entry point for the feature.

**Layout:**
- **Sticky header** — "Cookbook" title (serif) + search icon
- **Recently Saved carousel** — horizontal scroll of recipe cards showing image, title, and source badge (Instagram/TikTok). Each card has a "Folder Plus" icon for quick saving to a collection.
- **"See all saved recipes" button** — full-width, positioned between the carousel and collections grid. Opens the All Recipes screen.
- **Your Collections grid** — heading with "+ New" button on the right. 2-column grid of collection folders with collage-style thumbnails (2x2 image grid), folder name, and recipe count.
- **Tab bar** — sticky bottom navigation

**Interactions:**
- Tapping the Folder Plus icon on a recipe card opens the "Add to Collection" drawer
- Tapping "+ New" opens a simple "Create Collection" drawer (name input only)
- Tapping a collection folder navigates to Collection Detail
- Tapping "See all saved recipes" navigates to All Recipes

### 2. Cookbook Empty State

Shown when the user has zero collections.

**Layout:**
- Same header and tab bar as Cookbook
- Message explaining no collections yet
- Suggested chips for quick-start folders: "Favorites", "Quick Dinners", "To Try"
- Button to navigate to the populated Cookbook view (for demo purposes)

### 3. Collection Detail

Shows the recipes within a specific collection. Slides in from the right.

**Layout:**
- **Top nav** — back arrow (returns to Cookbook), collection name (serif, centered), three-dot menu
- **Search bar** — "Search this folder"
- **Filter carousel** — horizontal chips (e.g., "Filter", "Easy", "Under 30 Min", "High Protein", "Low Carb")
- **Recipe count header** — e.g., "12 Recipes"
- **2-column recipe grid** — cards showing thumbnail, title, author/source, star rating, cooking time

### 4. All Recipes

Shows every recipe in the user's cookbook. Functionally identical to Collection Detail but scoped to all saved recipes.

**Layout:**
- **Header** — back arrow, "All Saved Recipes" title
- **Search bar**
- **Filter chips** — same set as Collection Detail
- **Sort functionality** — "Recently Added", "Top Rated", "Quickest First"
- **Recipe count**
- **2-column recipe grid** — same card format as Collection Detail

## Navigation Map

```
Cookbook (home)
├── → All Recipes (via "See all saved recipes" button)
│   └── ← back to Cookbook
├── → Collection Detail (via tapping a collection folder)
│   └── ← back to Cookbook
├── ↑ "Add to Collection" drawer (via Folder Plus on recipe card)
│   ├── select existing collection → close drawer
│   └── "+ Create New Collection" → inline name input → confirm → recipe added + close
├── ↑ "Create Collection" drawer (via "+ New" button)
│   └── enter name → confirm → close
└── → Cookbook Empty State (demo link)
    └── → back to Cookbook
```

## Visual Direction

- **Brand colors:** HelloFresh green (#067A46), charcoal (#242424), white (#FFFFFF)
- **Reference apps:** NYT Cooking (collection grid, recipe cards), Pinterest (folder/board model)
- **Cards:** 16px rounded corners, subtle drop shadows on carousel cards
- **Images:** High-quality food photography (Unsplash placeholders)
- **Transitions:** Smooth slide-in for screen navigation, slide-up for bottom sheets

## Edge Cases & States

- **Empty collections** — shown via dedicated CookbookEmpty screen with suggested starter collections
- **Search with no results** — not explicitly handled in v1 (returns empty grid)
- **Bottom sheet modes** — distinct UIs for "create new" (name only) vs. "add to collection" (list + inline create)

## Non-goals

- Actual recipe import from external URLs
- Real data persistence (all data is hardcoded placeholders)
- Recipe detail view (tapping a recipe card does not open a full recipe)
- Backend API integration
- Authentication
- Cross-device sync

## Open Questions

- Should users be able to reorder recipes within a collection?
- Should there be a "Recently Viewed" section separate from "Recently Saved"?
- How should recipe cards handle very long titles (truncation strategy)?
