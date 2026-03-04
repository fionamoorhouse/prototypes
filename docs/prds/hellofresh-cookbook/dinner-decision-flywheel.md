# Cookbook Dinner Decision Flywheel

## Parent Project

[HelloFresh Cookbook — v1 Intent](./v1-intent.md)

## Problem Statement

Users save recipes but never cook them — the Cookbook is an "inspiration graveyard." It's currently a passive save drawer that doesn't help users with their actual problem: deciding what to make for dinner tonight.

The goal is to transform the Cookbook from a save drawer into a dinner decision engine through a self-reinforcing flywheel with three parts:

1. **Fill It** — Make it effortless to build a meaningful recipe collection
2. **Solve Dinner** — Use the collection to answer "what's for dinner tonight?"
3. **Grow It** — Smart recommendations across app surfaces that keep the collection growing passively

## Chosen Approach

A three-part flywheel where each part makes the other two more valuable:

- A bigger collection → better dinner suggestions
- Better dinner suggestions → users actually cook
- Cooking creates engagement → surfaces more recipes to save

### Target User

Emanuel — Age 30-45, partner + two kids, both parents work. Cooks 3-4x/week. Sees himself as a creative cook but weeknights are survival mode. Actively saves recipes on Instagram and TikTok but rarely cooks them. Currently the household "food project manager."

## Changes to Existing Screens

### Cookbook Home (Complete Redesign)

The Cookbook home screen is reimagined as a dinner decision tool:

- **Tonight's Pick** — Hero spotlight card featuring one recipe from saved collection, with "Let's Make This" CTA
- **Quick Actions** — "What's in your fridge?" (AI Creator) + "Deciding together?" (Household collaboration)
- **Filter Chips** — "All Recipes", "Haven't Made Yet" (with count), "Quick < 30min"
- **Recipe Grid** — 2-column grid with cooked/uncooked badges
- **Import CTA** — "Import from social media" entry point at bottom
- **Grocery Planning** — "Plan meals & make grocery list" button

## New Screens

### Flow 1: Fill It — Bulk Import

1. **ImportPrompt** — "You have recipes saved on social media" with Instagram/TikTok connection cards and "Import All Recipes" CTA
2. **ImportProgress** — Animated grid showing recipes populating one by one with progress bar. Auto-advances when complete.
3. **ImportComplete** — "14 recipes imported!" celebration with confetti and recipe mosaic. CTAs to explore cookbook.

### Flow 2: Fill It — Photo Scan

1. **PhotoScan** — Camera viewfinder UI with scanning animation line, capture button, and "Point camera at a recipe page" instruction
2. **ScanProcessing** — AI processing with animated step indicators: Reading text → Extracting ingredients → Structuring steps → Done
3. **ScanResult** — Parsed recipe in standard card format with AI SCANNED badge, full ingredients/steps, and "Add to Cookbook" CTA

### Flow 3: Solve Dinner — AI Dinner Creator

1. **AIDinnerInput** — "What's in your fridge?" with text input, quick-add pantry staple chips, and ingredient tag management
2. **AIDinnerGenerating** — Animated loading with chef hat icon, rotating phrases, and ingredient chips display
3. **AIDinnerResult** — Full AI-generated recipe with "AI Created" badge, "Your ingredients used" section, and "Save to Cookbook" CTA

### Flow 4: Solve Dinner — Grocery List

1. **GrocerySelect** — Recipe selection with checkboxes, showing cook time and servings. "Generate Grocery List" CTA with meal count.
2. **GroceryList** — Combined, deduplicated ingredient list organized by category (Protein, Produce, Pantry, Grains, Dairy & Spices). Each item shows quantity and which recipes need it. Interactive checkboxes. Share and copy actions.

### Flow 5: Grow It — Recommendations

1. **PostSaveRecs** — After saving a recipe, shows "You might also like" with 3 related suggestions and quick save buttons
2. **HomeFeed** — Main HelloFresh home feed with "Recommended for Your Cookbook" section integrated natively among menu items
3. **RecipeDetail** — Full recipe detail with ingredients, steps, and "More Like This" section at bottom with 4 related recipes and save buttons

### Collaboration Widget (Bottom Sheet on CookbookHome)

- "What should we make?" heading with 3 dinner options
- Thumbs up/down voting per recipe
- "Share with household" CTA
- Shown via bottom sheet on CookbookHome

## Navigation Map

```
DemoLauncher
├── CookbookHome (main entry)
│   ├── Tonight's Pick → RecipeDetail
│   ├── "What's in your fridge?" → AIDinnerInput
│   │   → AIDinnerGenerating → AIDinnerResult → PostSaveRecs → CookbookHome
│   ├── "Deciding together?" → CollabSheet (bottom sheet)
│   ├── "Plan meals" → GrocerySelect → GroceryList
│   ├── Recipe card → RecipeDetail
│   │   └── "More Like This" save → PostSaveRecs
│   ├── "Import from social" → ImportPrompt
│   └── Camera icon → PhotoScan
│
├── ImportPrompt → ImportProgress → ImportComplete → CookbookHome
├── PhotoScan → ScanProcessing → ScanResult → PostSaveRecs → CookbookHome
├── AIDinnerInput → AIDinnerGenerating → AIDinnerResult
├── GrocerySelect → GroceryList
├── PostSaveRecs → CookbookHome
├── HomeFeed → CookbookHome / RecipeDetail
└── RecipeDetail → CookbookHome / PostSaveRecs
```

## Edge Cases & States

| Scenario | Behavior |
|----------|----------|
| Empty cookbook (no saved recipes) | Tonight's Pick hidden, import CTA promoted |
| All recipes cooked | "Haven't Made Yet" filter shows 0 count |
| AI recipe with minimal ingredients | Still generates a recipe with pantry staple assumptions |
| No social accounts connected | Import prompt explains the connection flow |
| Photo scan fails | Error state with retry button |
| Grocery list for single recipe | Still generates list, "1 meal planned" |

## Non-goals

- Recipe detail cooking mode (step-by-step timer)
- Real social media API integration
- Actual AI recipe generation backend
- Push notifications for dinner reminders
- Dietary restriction filtering
- Nutritional information display
- Payment or subscription flows

## Open Questions

1. Should the Daily Spotlight rotate automatically or require manual refresh?
2. How should the collaboration voting resolve — first to majority or time-based?
3. Should imported recipes be auto-organized into collections?
4. What's the right number of "More Like This" suggestions — 4 or 6?
