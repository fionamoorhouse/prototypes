import { usePrototype } from '@/hooks/usePrototype'
import { useState } from 'react'
import {
  ChevronLeft,
  Share2,
  Heart,
  MessageCircle,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  Check,
  Bell,
  Play,
  Star,
  Mic,
  Camera,
  X,
  Compass,
  UtensilsCrossed,
  Search,
  BookOpen,
  User,
} from 'lucide-react'

/* ── helpers ── */
const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
const avatar = (id: string, s = 200) =>
  `https://images.unsplash.com/photo-${id}?w=${s}&h=${s}&fit=crop&crop=face&auto=format&q=80`

/* ── event data ── */
type EventType = 'ama' | 'cookAlong' | 'seasonal'

const events: Record<string, {
  id: string
  type: EventType
  title: string
  subtitle: string
  description: string
  host: { name: string; title: string; avatar: string }
  date: string
  time: string
  duration: string
  attendees: number
  maxAttendees: number | null
  image: string
  gradient: string
  accent: string
  emoji: string
  tags: string[]
  agenda: { time: string; title: string }[]
  rsvped: boolean
}> = {
  'chef-ama': {
    id: 'chef-ama',
    type: 'ama',
    title: 'Ask Me Anything: Chef Julia',
    subtitle: 'HelloFresh Head Chef answers your questions live',
    description: 'Join Chef Julia Anderson, Head Chef at HelloFresh, for a live Q&A session. Ask about recipe development, ingredient sourcing, cooking techniques, and what\'s coming next to your menu. She\'ll share behind-the-scenes stories from the HelloFresh kitchen and answer your most burning cooking questions.',
    host: {
      name: 'Chef Julia Anderson',
      title: 'Head Chef, HelloFresh',
      avatar: '1438761681033-6461ffad8d80',
    },
    date: 'Thursday, Feb 19',
    time: '7:00 PM EST',
    duration: '45 min',
    attendees: 186,
    maxAttendees: 500,
    image: '1556909114-f6e7ad7d3136',
    gradient: 'linear-gradient(135deg, #067A46, #10B981)',
    accent: '#067A46',
    emoji: '🎙️',
    tags: ['Live Q&A', 'Behind the Scenes', 'Cooking Tips'],
    agenda: [
      { time: '7:00', title: 'Welcome & Introduction' },
      { time: '7:05', title: 'Chef Julia\'s Story' },
      { time: '7:15', title: 'Live Q&A (submit questions now!)' },
      { time: '7:40', title: 'Sneak peek: March menu highlights' },
    ],
    rsvped: false,
  },
  'cook-along': {
    id: 'cook-along',
    type: 'cookAlong',
    title: 'Community Cook-Along: Ramen Night',
    subtitle: 'Cook together, eat together — virtually',
    description: 'Grab your HelloFresh Miso Ramen kit and join the Weeknight Warriors for a live cook-along session. Our community lead Marcus will walk through the recipe step by step while everyone cooks together in real time. Share photos of your progress, get tips, and enjoy the social cooking experience!',
    host: {
      name: 'Marcus T.',
      title: 'Community Lead, Weeknight Warriors',
      avatar: '1507003211169-0a1dd7228f2d',
    },
    date: 'Saturday, Feb 22',
    time: '6:30 PM EST',
    duration: '60 min',
    attendees: 42,
    maxAttendees: 100,
    image: '1569718212165-3a8922ada9e5',
    gradient: 'linear-gradient(135deg, #DC2626, #F97316)',
    accent: '#DC2626',
    emoji: '🍜',
    tags: ['Cook-Along', 'Weeknight Warriors', 'Ramen'],
    agenda: [
      { time: '6:30', title: 'Prep check: ingredients & tools' },
      { time: '6:40', title: 'Step 1: Broth & noodles' },
      { time: '6:55', title: 'Step 2: Toppings & assembly' },
      { time: '7:10', title: 'Photo share & taste test!' },
      { time: '7:20', title: 'Tips & variations' },
    ],
    rsvped: true,
  },
  'spring-kickoff': {
    id: 'spring-kickoff',
    type: 'seasonal',
    title: 'Spring Menu Launch Party',
    subtitle: 'First look at the new seasonal menu',
    description: 'Spring is here and so is our freshest menu ever! Join HelloFresh for an exclusive first look at the Spring 2026 menu. Preview new recipes, vote on featured meals, and get early access to add seasonal favorites to your upcoming boxes. Plus: a special discount code for attendees!',
    host: {
      name: 'HelloFresh',
      title: 'Official Event',
      avatar: '1556909114-f6e7ad7d3136',
    },
    date: 'Wednesday, Mar 4',
    time: '12:00 PM EST',
    duration: '30 min',
    attendees: 347,
    maxAttendees: null,
    image: '1490818387583-1bc5681bdf9b',
    gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    accent: '#7C3AED',
    emoji: '🌸',
    tags: ['Seasonal', 'New Menu', 'Exclusive Preview'],
    agenda: [
      { time: '12:00', title: 'Welcome from the HelloFresh team' },
      { time: '12:05', title: 'Spring menu reveal (15 new recipes!)' },
      { time: '12:15', title: 'Live vote: Community\'s Choice award' },
      { time: '12:25', title: 'Exclusive attendee discount' },
    ],
    rsvped: false,
  },
}

/* ── upcoming events list ── */
const upcomingEvents = [
  { id: 'chef-ama', title: 'AMA: Chef Julia', date: 'Feb 19', emoji: '🎙️', color: '#067A46' },
  { id: 'cook-along', title: 'Community Cook-Along', date: 'Feb 22', emoji: '🍜', color: '#DC2626' },
  { id: 'spring-kickoff', title: 'Spring Menu Launch', date: 'Mar 4', emoji: '🌸', color: '#7C3AED' },
]

/* ── Q&A questions for AMA ── */
const preSubmittedQuestions = [
  { author: 'Lisa K.', avatar: '1544005313-94ddf0286df2', question: 'How do you decide which cuisines to feature each month?', upvotes: 34 },
  { author: 'Tom M.', avatar: '1500648767791-00dcc994a43e', question: 'What\'s the most challenging recipe you\'ve developed for HelloFresh?', upvotes: 28 },
  { author: 'Priya S.', avatar: '1534528741775-53994a69daeb', question: 'Any tips for making HelloFresh meals more kid-friendly?', upvotes: 22 },
  { author: 'Alex K.', avatar: '1472099645785-5658abf4ff4e', question: 'Will we ever get a spice level customization option?', upvotes: 19 },
]

export default function CommunityEvent() {
  const { goTo, searchParams } = usePrototype()
  const eventId = searchParams.get('id') || 'chef-ama'
  const event = events[eventId] || events['chef-ama']
  const [rsvped, setRsvped] = useState(event.rsvped)
  const [showList, setShowList] = useState(false)
  const [questionUpvotes, setQuestionUpvotes] = useState<Record<number, boolean>>({})
  const [reminder, setReminder] = useState(false)

  const typeConfig = {
    ama: { Icon: Mic, label: 'GUEST CHEF AMA' },
    cookAlong: { Icon: Camera, label: 'COOK-ALONG' },
    seasonal: { Icon: Star, label: 'SEASONAL EVENT' },
  }

  const tc = typeConfig[event.type]

  if (showList) {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#f5f5f5', overflow: 'hidden' }}>
        <div style={{ height: 54, flexShrink: 0, background: '#fff' }} />
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44, background: '#fff' }}>
          <button onClick={() => setShowList(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
            <ChevronLeft size={22} color="#242424" />
          </button>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#242424' }}>Community Events</span>
          <div style={{ width: 22 }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
          {/* Upcoming events */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 12 }}>Upcoming Events</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.values(events).map(ev => {
                const etc = typeConfig[ev.type]
                return (
                  <button
                    key={ev.id}
                    onClick={() => { goTo('CommunityEvent', { id: ev.id }); setShowList(false) }}
                    style={{
                      width: '100%', textAlign: 'left', borderRadius: 16, background: '#fff',
                      overflow: 'hidden', border: 'none', cursor: 'pointer', padding: 0,
                    }}
                  >
                    {/* Hero image */}
                    <div style={{ position: 'relative', height: 120 }}>
                      <img src={img(ev.image, 800, 300)} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.5))' }} />
                      <div style={{ position: 'absolute', top: 10, left: 10 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                          <etc.Icon size={10} color="#fff" />
                          <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>{etc.label}</span>
                        </div>
                      </div>
                      <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{ev.title}</div>
                      </div>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Calendar size={13} color="#999" />
                          <span style={{ fontSize: 12, color: '#666' }}>{ev.date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={13} color="#999" />
                          <span style={{ fontSize: 12, color: '#666' }}>{ev.time}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                          <Users size={13} color="#999" />
                          <span style={{ fontSize: 12, color: '#666' }}>{ev.attendees}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Past events placeholder */}
          <div style={{ padding: '24px 20px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 12 }}>Past Events</div>
            <div style={{ borderRadius: 14, background: '#fff', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📺</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#242424' }}>Watch past recordings</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Missed an event? Catch up on replays.</div>
            </div>
          </div>

          <div style={{ padding: '28px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#ddd', fontWeight: 600, letterSpacing: 0.5 }}>DEMO SCREENS</span>
            <button onClick={() => goTo('Discover')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Back to Discover</button>
            <button onClick={() => goTo('TeamHome')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Team Home</button>
          </div>
          <div style={{ height: 20 }} />
        </div>

        <BottomTabBar goTo={goTo} active="Discover" />
        <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 44 }}>
        <button onClick={() => goTo('Discover')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <ChevronLeft size={22} color="#242424" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <tc.Icon size={16} color={event.accent} />
          <span style={{ fontSize: 11, fontWeight: 700, color: event.accent, letterSpacing: 0.5, textTransform: 'uppercase' }}>{tc.label}</span>
        </div>
        <button onClick={() => setShowList(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, margin: -4 }}>
          <Calendar size={20} color="#999" />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0 }}>
        {/* Hero image */}
        <div style={{ position: 'relative', height: 200 }}>
          <img src={img(event.image, 800, 400)} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.6))' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{event.title}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{event.subtitle}</div>
          </div>
        </div>

        {/* Event meta row */}
        <div style={{ display: 'flex', gap: 12, padding: '16px 20px', borderBottom: '1px solid #f5f5f5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Calendar size={14} color={event.accent} />
            <span style={{ fontSize: 13, color: '#242424', fontWeight: 500 }}>{event.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={14} color={event.accent} />
            <span style={{ fontSize: 13, color: '#242424', fontWeight: 500 }}>{event.time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Users size={14} color="#999" />
            <span style={{ fontSize: 13, color: '#999' }}>{event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''}</span>
          </div>
        </div>

        {/* RSVP + Reminder row */}
        <div style={{ padding: '16px 20px', display: 'flex', gap: 10 }}>
          <button
            onClick={() => setRsvped(!rsvped)}
            style={{
              flex: 1, height: 52, borderRadius: 26,
              background: rsvped ? '#E8F5E0' : event.gradient,
              color: rsvped ? '#067A46' : '#fff',
              border: rsvped ? '1.5px solid #067A46' : 'none',
              cursor: 'pointer', fontSize: 16, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {rsvped ? <><Check size={18} /> I'm going</> : <><Play size={18} /> RSVP</>}
          </button>
          <button
            onClick={() => setReminder(!reminder)}
            style={{
              width: 52, height: 52, borderRadius: 26,
              background: reminder ? `${event.accent}15` : '#f5f5f5',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Bell size={20} color={reminder ? event.accent : '#999'} fill={reminder ? event.accent : 'none'} />
          </button>
        </div>

        {/* Host card */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 16, background: '#f9f9f9', border: '1px solid #f0f0f0' }}>
            <img src={avatar(event.host.avatar, 96)} alt={event.host.name} style={{ width: 48, height: 48, borderRadius: 24, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#242424' }}>{event.host.name}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>{event.host.title}</div>
            </div>
            {event.type === 'ama' && (
              <div style={{ padding: '4px 10px', borderRadius: 8, background: `${event.accent}15` }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: event.accent }}>Host</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: '0 20px 16px' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 8px' }}>About this event</h3>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>{event.description}</p>
        </div>

        {/* Tags */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {event.tags.map((tag, i) => (
              <span key={i} style={{ padding: '5px 12px', borderRadius: 16, background: `${event.accent}10`, fontSize: 12, fontWeight: 600, color: event.accent }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Agenda */}
        <div style={{ padding: '0 20px 16px' }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Agenda</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {event.agenda.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: i < event.agenda.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: event.accent, width: 40, flexShrink: 0 }}>{item.time}</span>
                <span style={{ fontSize: 14, color: '#242424' }}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AMA-specific: pre-submitted questions */}
        {event.type === 'ama' && (
          <div style={{ padding: '0 20px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: 0 }}>Community Questions</h3>
              <span style={{ fontSize: 12, color: '#999' }}>Upvote to prioritize</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {preSubmittedQuestions.map((q, i) => (
                <div key={i} style={{ borderRadius: 14, background: '#f9f9f9', border: '1px solid #f0f0f0', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <img src={avatar(q.avatar, 64)} alt={q.author} style={{ width: 28, height: 28, borderRadius: 14, objectFit: 'cover', marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#242424' }}>{q.author}</span>
                      <p style={{ fontSize: 14, color: '#333', lineHeight: 1.5, margin: '4px 0 0' }}>{q.question}</p>
                    </div>
                    <button
                      onClick={() => setQuestionUpvotes(prev => ({ ...prev, [i]: !prev[i] }))}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                        background: questionUpvotes[i] ? `${event.accent}10` : 'none',
                        border: questionUpvotes[i] ? `1.5px solid ${event.accent}` : '1.5px solid #e0e0e0',
                        borderRadius: 8, padding: '6px 8px', cursor: 'pointer', flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={questionUpvotes[i] ? event.accent : '#999'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                      <span style={{ fontSize: 11, fontWeight: 700, color: questionUpvotes[i] ? event.accent : '#999' }}>
                        {q.upvotes + (questionUpvotes[i] ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit question CTA */}
            <button style={{
              marginTop: 12, width: '100%', height: 44, borderRadius: 22,
              background: '#f5f5f5', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600, color: '#242424',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <MessageCircle size={16} /> Submit a question
            </button>
          </div>
        )}

        {/* Cook-Along specific: what to prepare */}
        {event.type === 'cookAlong' && (
          <div style={{ padding: '0 20px 16px' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>What you'll need</h3>
            <div style={{ borderRadius: 16, background: '#FEF3C720', border: '1px solid #FDE68A', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>🍜</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#242424' }}>HelloFresh Miso Ramen Kit</div>
                  <div style={{ fontSize: 12, color: '#999' }}>Available in your next box — add it now!</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Cutting board', 'Sharp knife', 'Large pot', 'Skillet', 'Colander'].map((item, i) => (
                  <span key={i} style={{ padding: '4px 10px', borderRadius: 12, background: '#fff', fontSize: 12, color: '#666', border: '1px solid #f0f0f0' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Seasonal specific: menu preview cards */}
        {event.type === 'seasonal' && (
          <div style={{ padding: '0 20px 16px' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: '#242424', margin: '0 0 12px' }}>Sneak Peek: New Recipes</h3>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
              {[
                { name: 'Spring Pea Risotto', img: '1551782450-a2132b4ba21d', tag: 'Vegetarian' },
                { name: 'Lemon Herb Chicken', img: '1567620905732-2d1ec7ab7445', tag: 'Family Friendly' },
                { name: 'Strawberry Spinach Salad', img: '1512058564366-18510be2db87', tag: 'Calorie Smart' },
              ].map((recipe, i) => (
                <div key={i} style={{ flexShrink: 0, width: 160, borderRadius: 14, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                  <div style={{ height: 100, overflow: 'hidden' }}>
                    <img src={img(recipe.img, 320, 200)} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#242424' }}>{recipe.name}</div>
                    <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 500, marginTop: 2 }}>{recipe.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other upcoming events */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', letterSpacing: 0.3, textTransform: 'uppercase' }}>More Events</div>
            <button onClick={() => setShowList(true)} style={{ fontSize: 12, color: '#067A46', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>See all</button>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
            {upcomingEvents.filter(e => e.id !== eventId).map(ev => (
              <button
                key={ev.id}
                onClick={() => goTo('CommunityEvent', { id: ev.id })}
                style={{
                  flexShrink: 0, width: 160, borderRadius: 14, overflow: 'hidden',
                  border: '1px solid #f0f0f0', background: '#fff', cursor: 'pointer',
                  textAlign: 'left', padding: 0,
                }}
              >
                <div style={{ height: 48, background: `linear-gradient(135deg, ${ev.color}20, ${ev.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {ev.emoji}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#242424' }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{ev.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Demo links */}
        <div style={{ padding: '28px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#ddd', fontWeight: 600, letterSpacing: 0.5 }}>DEMO SCREENS</span>
          <button onClick={() => goTo('CommunityEvent', { id: 'chef-ama' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Guest Chef AMA</button>
          <button onClick={() => goTo('CommunityEvent', { id: 'cook-along' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Community Cook-Along</button>
          <button onClick={() => goTo('CommunityEvent', { id: 'spring-kickoff' })} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Spring Menu Launch Party</button>
          <button onClick={() => goTo('Discover')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Back to Discover</button>
          <button onClick={() => goTo('TeamHome')} style={{ fontSize: 12, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Team Home</button>
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* Tab bar */}
      <BottomTabBar goTo={goTo} active="Discover" />
      <div style={{ height: 34, flexShrink: 0, background: '#fff' }} />
    </div>
  )
}

/* ── Bottom Tab Bar ── */
function BottomTabBar({ goTo, active }: { goTo: (s: string, p?: Record<string, string>) => void; active: string }) {
  const tabs = [
    { Icon: Compass, label: 'Discover', screen: 'Discover' },
    { Icon: UtensilsCrossed, label: 'My Menu', screen: '' },
    { Icon: Search, label: 'Search', screen: '' },
    { Icon: BookOpen, label: 'Cookbook', screen: '' },
    { Icon: User, label: 'Profile', screen: 'Profile' },
  ]
  return (
    <div style={{ flexShrink: 0, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
      {tabs.map((tab) => {
        const isActive = tab.label === active
        return (
          <button
            key={tab.label}
            onClick={() => tab.screen && goTo(tab.screen)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: tab.screen ? 'pointer' : 'default', color: isActive ? '#067A46' : '#aaa', padding: '4px 12px' }}
          >
            <tab.Icon size={20} />
            <span style={{ fontSize: 10, fontWeight: 500 }}>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
