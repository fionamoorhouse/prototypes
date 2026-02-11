import { useState } from 'react'
import { usePrototype } from '@/hooks/usePrototype'
import {
  Search,
  ChevronLeft,
  MoreHorizontal,
  SlidersHorizontal,
  Star,
  Compass,
  CalendarDays,
  BookOpen,
  User,
  Users,
  Share2,
  Flag,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Image helper                                                       */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const avatarImg = (id: string, size = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&crop=face&auto=format&q=80`

const AVATARS = {
  michelle: '1438761681033-6461ffad8d80',
  mia: '1494790108377-be9c29b29330',
  alex: '1507003211169-0a1dd7228f2d',
  sarah: '1580489944761-15a19d654956',
  james: '1472099645785-5658abf4ff4e',
  elena: '1534528741775-53994a69daeb',
}

/* Owner data for public collections */
const OWNERS: Record<string, { name: string; avatar: string; type: string; badge: string; subscribers: string }> = {
  mia: { name: 'Mia Santos (@EasyMealsByMia)', avatar: AVATARS.mia, type: 'influencer', badge: 'Creator', subscribers: '1.2k' },
  alex: { name: 'Alex T.', avatar: AVATARS.alex, type: 'user', badge: '', subscribers: '892' },
  james: { name: 'James Rivera (@JamesCooks)', avatar: AVATARS.james, type: 'influencer', badge: 'Creator', subscribers: '2.1k' },
  michelle: { name: 'Michelle Doll Olson', avatar: AVATARS.michelle, type: 'hellofresh-chef', badge: 'HelloFresh Chef', subscribers: '3.2k' },
  elena: { name: 'Elena Rodriguez', avatar: AVATARS.elena, type: 'hellofresh-chef', badge: 'HelloFresh Chef', subscribers: '2.4k' },
}

/* Recipe creators (for showing attribution on cards) */
const RECIPE_CREATORS: Record<string, { name: string; avatar: string; id: string }> = {
  'Sarah Chen': { name: 'Sarah Chen', avatar: AVATARS.sarah, id: 'sarah' },
  'Mark Bittman': { name: 'Mark Bittman', avatar: AVATARS.james, id: 'james' },
  'Ina Garten': { name: 'Ina Garten', avatar: AVATARS.elena, id: 'elena' },
  'Yotam Ottolenghi': { name: 'Yotam Ottolenghi', avatar: AVATARS.alex, id: 'alex' },
  'Alison Roman': { name: 'Alison Roman', avatar: AVATARS.mia, id: 'mia' },
  'Samin Nosrat': { name: 'Samin Nosrat', avatar: AVATARS.sarah, id: 'sarah' },
  'David Chang': { name: 'David Chang', avatar: AVATARS.james, id: 'james' },
  'Claire Saffitz': { name: 'Claire Saffitz', avatar: AVATARS.elena, id: 'elena' },
  'Melissa Clark': { name: 'Melissa Clark', avatar: AVATARS.michelle, id: 'michelle' },
  'Andy Baraghani': { name: 'Andy Baraghani', avatar: AVATARS.alex, id: 'alex' },
  'Kenji López-Alt': { name: 'Kenji López-Alt', avatar: AVATARS.james, id: 'james' },
  'Marcella Hazan': { name: 'Marcella Hazan', avatar: AVATARS.elena, id: 'elena' },
  'Rick Bayless': { name: 'Rick Bayless', avatar: AVATARS.alex, id: 'alex' },
  'Thomas Keller': { name: 'Thomas Keller', avatar: AVATARS.james, id: 'james' },
  'Gordon Ramsay': { name: 'Gordon Ramsay', avatar: AVATARS.michelle, id: 'michelle' },
  'Giada De Laurentiis': { name: 'Giada De Laurentiis', avatar: AVATARS.mia, id: 'mia' },
  '@EasyMealsByMia': { name: '@EasyMealsByMia', avatar: AVATARS.mia, id: 'mia' },
  '@JamesCooks': { name: '@JamesCooks', avatar: AVATARS.james, id: 'james' },
  'Michelle Doll Olson': { name: 'Michelle Doll Olson', avatar: AVATARS.michelle, id: 'michelle' },
  'Sarah Williams': { name: 'Sarah Williams', avatar: AVATARS.sarah, id: 'sarah' },
  'Elena Rodriguez': { name: 'Elena Rodriguez', avatar: AVATARS.elena, id: 'elena' },
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FOOD = {
  chicken: '1532550907401-a500c9a57435',
  salmon: '1467003909585-2f8a72700288',
  veggies: '1546069901-ba9599a7e63c',
  pasta: '1473093295043-cdd812d0e601',
  stirfry: '1455619452474-d2be8b1e70cd',
  pizza: '1565299624946-b28f40a0ae38',
  salad: '1512621776951-a57141f2eefd',
  pancakes: '1567620905732-2d1ec7ab7445',
  steak: '1504674900247-0877df9cc836',
  sandwich: '1476224203421-9ac39bcb3327',
  bowl: '1540189549336-e6e99c3679fe',
  grilled: '1499028344343-cd173ffc68a9',
  avocado: '1482049016688-2d3e1b311543',
  brunch: '1490645935967-10de6ba17061',
}

interface Recipe {
  id: number
  title: string
  author: string
  rating: number
  reviews: string
  time: string
  image: string
}

const COLLECTIONS: Record<
  string,
  { name: string; recipes: Recipe[] }
> = {
  '1': {
    name: 'Air Fryer Gems',
    recipes: [
      { id: 1, title: 'Crispy Air Fryer Tofu', author: 'Sarah Chen', rating: 4.5, reviews: '312', time: '25 min', image: img(FOOD.veggies) },
      { id: 2, title: 'Honey Garlic Wings', author: 'Mark Bittman', rating: 5, reviews: '891', time: '35 min', image: img(FOOD.chicken) },
      { id: 3, title: 'Sweet Potato Fries', author: 'Ina Garten', rating: 4, reviews: '156', time: '20 min', image: img(FOOD.avocado) },
      { id: 4, title: 'Coconut Shrimp', author: 'Yotam Ottolenghi', rating: 4.5, reviews: '445', time: '30 min', image: img(FOOD.grilled) },
      { id: 5, title: 'Crispy Brussels Sprouts', author: 'Alison Roman', rating: 5, reviews: '672', time: '22 min', image: img(FOOD.salad) },
      { id: 6, title: 'Falafel Bites', author: 'Samin Nosrat', rating: 4, reviews: '289', time: '28 min', image: img(FOOD.bowl) },
      { id: 7, title: 'Chicken Tenders', author: 'David Chang', rating: 4.5, reviews: '534', time: '18 min', image: img(FOOD.sandwich) },
      { id: 8, title: 'Mozzarella Sticks', author: 'Claire Saffitz', rating: 5, reviews: '712', time: '15 min', image: img(FOOD.pizza) },
    ],
  },
  '2': {
    name: 'Quick Weeknight',
    recipes: [
      { id: 1, title: 'One-Pan Lemon Pasta', author: 'Melissa Clark', rating: 4.5, reviews: '1.2k', time: '20 min', image: img(FOOD.pasta) },
      { id: 2, title: 'Thai Basil Stir Fry', author: 'Andy Baraghani', rating: 5, reviews: '934', time: '15 min', image: img(FOOD.stirfry) },
      { id: 3, title: 'Sheet Pan Steak & Veg', author: 'Kenji López-Alt', rating: 4, reviews: '567', time: '25 min', image: img(FOOD.steak) },
      { id: 4, title: 'Caprese Sandwich', author: 'Ina Garten', rating: 4.5, reviews: '342', time: '10 min', image: img(FOOD.sandwich) },
      { id: 5, title: 'Miso Glazed Salmon', author: 'Samin Nosrat', rating: 5, reviews: '1.8k', time: '18 min', image: img(FOOD.salmon) },
      { id: 6, title: 'Veggie Fried Rice', author: 'Sarah Chen', rating: 4, reviews: '423', time: '12 min', image: img(FOOD.bowl) },
      { id: 7, title: 'Quick Chicken Tacos', author: 'Rick Bayless', rating: 4.5, reviews: '678', time: '20 min', image: img(FOOD.grilled) },
      { id: 8, title: 'Avocado Toast Deluxe', author: 'Alison Roman', rating: 4, reviews: '234', time: '8 min', image: img(FOOD.avocado) },
      { id: 9, title: 'Pancetta Carbonara', author: 'Marcella Hazan', rating: 5, reviews: '1.5k', time: '22 min', image: img(FOOD.pasta) },
      { id: 10, title: 'Black Bean Burrito Bowl', author: 'David Chang', rating: 4.5, reviews: '389', time: '15 min', image: img(FOOD.veggies) },
      { id: 11, title: 'Garlic Butter Shrimp', author: 'Ina Garten', rating: 5, reviews: '812', time: '12 min', image: img(FOOD.grilled) },
      { id: 12, title: 'Pesto Flatbread', author: 'Claire Saffitz', rating: 4, reviews: '267', time: '18 min', image: img(FOOD.pizza) },
    ],
  },
  '3': {
    name: 'Date Night',
    recipes: [
      { id: 1, title: 'Pan-Seared Salmon', author: 'Thomas Keller', rating: 5, reviews: '2.1k', time: '35 min', image: img(FOOD.salmon) },
      { id: 2, title: 'Truffle Mushroom Risotto', author: 'Marcella Hazan', rating: 5, reviews: '1.4k', time: '45 min', image: img(FOOD.bowl) },
      { id: 3, title: 'Filet Mignon', author: 'Gordon Ramsay', rating: 5, reviews: '3.2k', time: '40 min', image: img(FOOD.steak) },
      { id: 4, title: 'Lobster Linguine', author: 'Giada De Laurentiis', rating: 4.5, reviews: '892', time: '50 min', image: img(FOOD.pasta) },
      { id: 5, title: 'Chocolate Lava Cake', author: 'Claire Saffitz', rating: 5, reviews: '1.9k', time: '30 min', image: img(FOOD.pancakes) },
    ],
  },
  '4': {
    name: 'Meal Prep',
    recipes: [
      { id: 1, title: 'Quinoa Power Bowl', author: 'Melissa Clark', rating: 4.5, reviews: '567', time: '25 min', image: img(FOOD.salad) },
      { id: 2, title: 'Greek Chicken & Rice', author: 'Ina Garten', rating: 5, reviews: '1.1k', time: '35 min', image: img(FOOD.chicken) },
      { id: 3, title: 'Teriyaki Tofu Boxes', author: 'Sarah Chen', rating: 4, reviews: '345', time: '30 min', image: img(FOOD.veggies) },
      { id: 4, title: 'Turkey Meatball Bowls', author: 'Alison Roman', rating: 4.5, reviews: '678', time: '40 min', image: img(FOOD.bowl) },
      { id: 5, title: 'Chickpea Curry', author: 'Yotam Ottolenghi', rating: 5, reviews: '1.3k', time: '30 min', image: img(FOOD.stirfry) },
      { id: 6, title: 'Mason Jar Salads', author: 'Samin Nosrat', rating: 4, reviews: '234', time: '15 min', image: img(FOOD.avocado) },
      { id: 7, title: 'Overnight Oats 3 Ways', author: 'Claire Saffitz', rating: 4.5, reviews: '892', time: '10 min', image: img(FOOD.brunch) },
      { id: 8, title: 'Burrito Filling', author: 'Rick Bayless', rating: 4, reviews: '456', time: '35 min', image: img(FOOD.grilled) },
      { id: 9, title: 'Lentil Soup', author: 'Melissa Clark', rating: 5, reviews: '1.6k', time: '40 min', image: img(FOOD.bowl) },
      { id: 10, title: 'Marinated Chicken Thighs', author: 'David Chang', rating: 4.5, reviews: '723', time: '25 min', image: img(FOOD.chicken) },
      { id: 11, title: 'Roasted Veggie Medley', author: 'Ina Garten', rating: 4, reviews: '312', time: '35 min', image: img(FOOD.salad) },
      { id: 12, title: 'Egg Muffin Cups', author: 'Alison Roman', rating: 4.5, reviews: '534', time: '20 min', image: img(FOOD.brunch) },
      { id: 13, title: 'Peanut Noodles', author: 'Andy Baraghani', rating: 5, reviews: '1.1k', time: '15 min', image: img(FOOD.pasta) },
      { id: 14, title: 'BBQ Pulled Chicken', author: 'Kenji López-Alt', rating: 4.5, reviews: '678', time: '45 min', image: img(FOOD.sandwich) },
      { id: 15, title: 'Steel Cut Oatmeal', author: 'Samin Nosrat', rating: 4, reviews: '189', time: '30 min', image: img(FOOD.pancakes) },
    ],
  },
}

const FILTERS = ['Filter', 'Easy', 'Under 30 Min', 'High Protein', 'Top-Rated', 'Vegetarian']

/* Collections for public/subscribed views */
const PUBLIC_COLLECTIONS: Record<string, { name: string; recipes: Recipe[] }> = {
  'weeknight-winners': {
    name: 'Weeknight Winners',
    recipes: [
      { id: 1, title: '15-Min Garlic Butter Noodles', author: '@EasyMealsByMia', rating: 4.9, reviews: '2.3k', time: '15 min', image: img(FOOD.pasta) },
      { id: 2, title: 'Crispy Honey Soy Chicken', author: '@EasyMealsByMia', rating: 4.7, reviews: '1.8k', time: '25 min', image: img(FOOD.chicken) },
      { id: 3, title: 'One-Pan Cajun Shrimp', author: '@EasyMealsByMia', rating: 4.8, reviews: '1.2k', time: '20 min', image: img(FOOD.bowl) },
      { id: 4, title: 'Thai Basil Stir Fry', author: '@EasyMealsByMia', rating: 4.6, reviews: '934', time: '18 min', image: img(FOOD.stirfry) },
      { id: 5, title: 'Creamy Tuscan Salmon', author: '@EasyMealsByMia', rating: 4.9, reviews: '1.5k', time: '22 min', image: img(FOOD.salmon) },
      { id: 6, title: 'Spicy Korean Rice Bowl', author: '@EasyMealsByMia', rating: 4.5, reviews: '867', time: '25 min', image: img(FOOD.veggies) },
    ],
  },
  'high-protein-prep': {
    name: 'High Protein Meal Prep',
    recipes: [
      { id: 1, title: 'Greek Chicken & Rice', author: 'Michelle Doll Olson', rating: 5, reviews: '1.1k', time: '35 min', image: img(FOOD.chicken) },
      { id: 2, title: 'Teriyaki Tofu Boxes', author: '@EasyMealsByMia', rating: 4, reviews: '345', time: '30 min', image: img(FOOD.veggies) },
      { id: 3, title: 'Turkey Meatball Bowls', author: '@JamesCooks', rating: 4.5, reviews: '678', time: '40 min', image: img(FOOD.bowl) },
      { id: 4, title: 'Chickpea Curry', author: 'Sarah Williams', rating: 5, reviews: '1.3k', time: '30 min', image: img(FOOD.stirfry) },
      { id: 5, title: 'Pan-Seared Salmon', author: 'Michelle Doll Olson', rating: 4.5, reviews: '892', time: '25 min', image: img(FOOD.salmon) },
      { id: 6, title: 'Steak & Veggie Bowl', author: '@JamesCooks', rating: 4.8, reviews: '567', time: '35 min', image: img(FOOD.steak) },
    ],
  },
  'date-night-in': {
    name: 'Date Night In',
    recipes: [
      { id: 1, title: 'Pan-Seared Duck Breast', author: '@JamesCooks', rating: 4.9, reviews: '2.1k', time: '45 min', image: img(FOOD.steak) },
      { id: 2, title: 'Truffle Mushroom Pasta', author: '@JamesCooks', rating: 4.7, reviews: '1.8k', time: '30 min', image: img(FOOD.pasta) },
      { id: 3, title: 'Lobster Linguine', author: '@JamesCooks', rating: 4.8, reviews: '1.2k', time: '50 min', image: img(FOOD.salmon) },
      { id: 4, title: 'Chocolate Lava Cake', author: '@JamesCooks', rating: 5, reviews: '3.2k', time: '30 min', image: img(FOOD.pancakes) },
    ],
  },
  'one-pot-wonders': {
    name: 'One-Pot Wonders',
    recipes: [
      { id: 1, title: 'Creamy Tomato Soup', author: '@EasyMealsByMia', rating: 4.8, reviews: '1.5k', time: '25 min', image: img(FOOD.bowl) },
      { id: 2, title: 'Thai Green Curry', author: '@EasyMealsByMia', rating: 4.7, reviews: '1.2k', time: '30 min', image: img(FOOD.stirfry) },
      { id: 3, title: 'One-Pan Lemon Pasta', author: '@EasyMealsByMia', rating: 4.9, reviews: '2.1k', time: '20 min', image: img(FOOD.pasta) },
    ],
  },
  'summer-salads': {
    name: 'Fresh Summer Salads',
    recipes: [
      { id: 1, title: 'Cilantro Lime Bowl', author: 'Elena Rodriguez', rating: 4.8, reviews: '890', time: '25 min', image: img(FOOD.salad) },
      { id: 2, title: 'Avocado Crema Bowl', author: 'Elena Rodriguez', rating: 4.7, reviews: '567', time: '20 min', image: img(FOOD.avocado) },
      { id: 3, title: 'Mediterranean Quinoa', author: 'Elena Rodriguez', rating: 4.6, reviews: '456', time: '25 min', image: img(FOOD.veggies) },
    ],
  },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CollectionDetail() {
  const { goTo, searchParams } = usePrototype()
  const collectionId = searchParams.get('id') || '1'
  const ownerId = searchParams.get('owner') || ''
  const ownerType = searchParams.get('ownerType') || ''

  // Determine if this is a public/subscribed collection or own collection
  const isPublic = !!ownerId && ownerId !== 'self'
  const owner = isPublic ? OWNERS[ownerId] : null

  // Try public collections first, then fall back to own collections
  const collection = PUBLIC_COLLECTIONS[collectionId] || COLLECTIONS[collectionId] || COLLECTIONS['1']

  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [subscribed, setSubscribed] = useState(true) // default subscribed for demo
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredRecipes = collection.recipes.filter((r) =>
    r.title.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* ===== Status bar safe area ===== */}
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* ===== Header ===== */}
      <div
        style={{
          flexShrink: 0,
          padding: '0 20px',
        }}
      >
        <div
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => goTo('Cookbook')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              margin: -4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronLeft size={24} color="#242424" />
          </button>
          <span
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 18,
              fontWeight: 700,
              color: '#242424',
            }}
          >
            {collection.name}
          </span>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                margin: -4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MoreHorizontal size={22} color="#242424" />
            </button>
            {/* Menu dropdown for public collections */}
            {menuOpen && isPublic && (
              <>
                <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }} />
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 160, background: '#fff', borderRadius: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: '1px solid #eee', zIndex: 41, overflow: 'hidden' }}>
                  <button onClick={() => setMenuOpen(false)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#242424', textAlign: 'left' }}>
                    <Share2 size={16} color="#666" />
                    Share
                  </button>
                  <div style={{ height: 1, background: '#f0f0f0' }} />
                  <button onClick={() => setMenuOpen(false)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#242424', textAlign: 'left' }}>
                    <Flag size={16} color="#666" />
                    Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Owner attribution row (for public collections) */}
        {owner && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 12,
              paddingTop: 4,
            }}
          >
            <button
              onClick={() => goTo('CreatorProfile', { id: ownerId })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <img
                src={avatarImg(owner.avatar, 80)}
                alt=""
                style={{ width: 32, height: 32, borderRadius: 16, objectFit: 'cover' }}
              />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#242424', display: 'block' }}>
                  {owner.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
                  {owner.badge && (
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 99,
                      background: owner.type === 'hellofresh-chef' ? '#067A46' : '#242424',
                      color: '#fff',
                    }}>
                      {owner.badge}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: '#999', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Users size={10} />
                    {owner.subscribers} subscribers
                  </span>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSubscribed(!subscribed)}
              style={{
                padding: '6px 16px',
                borderRadius: 18,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: subscribed ? '1.5px solid #067A46' : 'none',
                background: subscribed ? '#fff' : '#067A46',
                color: subscribed ? '#067A46' : '#fff',
              }}
            >
              {subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </div>
        )}
      </div>

      {/* ===== Search bar ===== */}
      <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            color="#999"
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <input
            type="text"
            placeholder="Search this folder"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: '100%',
              height: 40,
              paddingLeft: 38,
              paddingRight: 14,
              borderRadius: 20,
              border: '1px solid #e5e5e5',
              background: '#fafafa',
              fontSize: 15,
              color: '#242424',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* ===== Filter chips ===== */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: 8,
          padding: '14px 20px',
          overflowX: 'auto',
          overflowY: 'hidden',
          flexShrink: 0,
        }}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter
          const isFilterBtn = filter === 'Filter'
          return (
            <button
              key={filter}
              onClick={() =>
                setActiveFilter(isActive ? null : filter)
              }
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: isActive
                  ? '1.5px solid #067A46'
                  : '1.5px solid #ddd',
                background: isActive ? '#067A46' : '#fff',
                color: isActive ? '#fff' : '#242424',
              }}
            >
              {isFilterBtn && (
                <SlidersHorizontal size={14} />
              )}
              {filter}
            </button>
          )
        })}
      </div>

      {/* ===== Divider ===== */}
      <div
        style={{
          height: 1,
          background: '#f0f0f0',
          flexShrink: 0,
        }}
      />

      {/* ===== Scrollable recipe content ===== */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Recipe count */}
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#242424',
            padding: '16px 20px 12px',
            margin: 0,
          }}
        >
          {filteredRecipes.length} recipe
          {filteredRecipes.length !== 1 ? 's' : ''}
        </p>

        {/* Recipe grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            padding: '0 20px 24px',
          }}
        >
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} goTo={goTo} />
          ))}
        </div>
      </div>

      {/* ===== Tab bar ===== */}
      <div
        style={{
          flexShrink: 0,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderTop: '1px solid #f0f0f0',
          background: '#fff',
        }}
      >
        {[
          { Icon: Compass, label: 'Discover', screen: 'Discover', active: false },
          { Icon: CalendarDays, label: 'Menu', screen: '', active: false },
          { Icon: Search, label: 'Search', screen: '', active: false },
          { Icon: BookOpen, label: 'Cookbook', screen: 'Cookbook', active: true },
          { Icon: User, label: 'Profile', screen: '', active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => tab.screen && goTo(tab.screen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              background: 'none',
              border: 'none',
              cursor: tab.screen ? 'pointer' : 'default',
              color: tab.active ? '#067A46' : '#aaa',
              padding: '4px 12px',
            }}
          >
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* ===== Home indicator safe area ===== */}
      <div
        style={{ height: 34, flexShrink: 0, background: '#fff' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Recipe card                                                        */
/* ------------------------------------------------------------------ */

function RecipeCard({ recipe, goTo }: { recipe: Recipe; goTo: (screen: string, params?: Record<string, string>) => void }) {
  const creator = RECIPE_CREATORS[recipe.author]

  return (
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
      }}
    >
      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: '100%',
          height: 120,
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Info */}
      <div style={{ padding: '10px 12px' }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#242424',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {recipe.title}
        </p>
        <button
          onClick={() => creator && goTo('CreatorProfile', { id: creator.id })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            marginTop: 4,
            background: 'none',
            border: 'none',
            cursor: creator ? 'pointer' : 'default',
            padding: 0,
          }}
        >
          {creator && (
            <img
              src={avatarImg(creator.avatar, 40)}
              alt=""
              style={{ width: 16, height: 16, borderRadius: 8, objectFit: 'cover' }}
            />
          )}
          <span style={{ fontSize: 12, color: '#666' }}>
            {recipe.author}
          </span>
        </button>
      </div>

      {/* Rating & time */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px 12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            fontSize: 12,
            color: '#555',
          }}
        >
          <Star
            size={12}
            fill="#f5a623"
            color="#f5a623"
          />
          <span style={{ fontWeight: 600 }}>
            {recipe.rating}
          </span>
          <span style={{ color: '#aaa' }}>
            ({recipe.reviews})
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#888' }}>
          {recipe.time}
        </span>
      </div>
    </div>
  )
}
