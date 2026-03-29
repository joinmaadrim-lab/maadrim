'use client'

import { useState } from 'react'

const quickFills: Record<string, { text: string; name: string; category: string; avatar: string; services: { name: string; price: string }[]; latestPost: string }> = {
  nail: {
    text: "סלון מניקור מקצועי בתל אביב. שירותים: מניקור ג'ל מלא ₪120, עיצוב ציפורניים ₪80, פדיקור + לק ₪150. זמינה א'-ו' 9:00-20:00.",
    name: "סטודיו מאיה",
    category: "מניקוריסטית מקצועית",
    avatar: "מא",
    services: [
      { name: "מניקור ג'ל מלא", price: "₪120" },
      { name: "עיצוב ציפורניים", price: "₪80" },
      { name: "פדיקור + לק", price: "₪150" },
    ],
    latestPost: "🔥 מבצע הבוקר בלבד — מניקור ג'ל ב-₪99! מקומות אחרונים",
  },
  barber: {
    text: "ספרייה מקצועית בתל אביב. שירותים: תספורת קלאסית ₪70, עיצוב זקן ₪50, טיפול מלא ₪110. כניסה חופשית.",
    name: "הספרייה",
    category: "ספר מקצועי",
    avatar: "סב",
    services: [
      { name: "תספורת קלאסית", price: "₪70" },
      { name: "עיצוב זקן", price: "₪50" },
      { name: "טיפול מלא", price: "₪110" },
    ],
    latestPost: "✂️ יש מקום פנוי היום ב-16:00 — מי רוצה תספורת?",
  },
  tutor: {
    text: "מורה פרטי למתמטיקה ומדעים לתיכון בתל אביב. שיעור שעה ₪150, חבילת 5 שיעורים ₪650. אונליין ופנים אל פנים.",
    name: "מורה פרטי",
    category: "מורה פרטי",
    avatar: "מפ",
    services: [
      { name: "שיעור שעה", price: "₪150" },
      { name: "חבילת 5 שיעורים", price: "₪650" },
      { name: "הכנה לבחינות", price: "₪200" },
    ],
    latestPost: "📚 מחר מתחילת בגרות מתמטיקה — עוד מקום אחד להכנה אינטנסיבית",
  },
  coffee: {
    text: "בית קפה ספיישלטי בתל אביב. תפריט: אספרסו ₪12, פלט וויט ₪18, טוסט אבוקדו ₪38. פתוח כל יום 7:00-21:00.",
    name: "פינת הקפה",
    category: "קפה ספיישלטי",
    avatar: "פק",
    services: [
      { name: "אספרסו", price: "₪12" },
      { name: "פלט וויט", price: "₪18" },
      { name: "טוסט אבוקדו", price: "₪38" },
    ],
    latestPost: "☕ הבוקר קיבלנו פולים טריים מאתיופיה — בואו לנסות לפני שנגמר",
  },
}

type Preview = {
  name: string
  category: string
  avatar: string
  services: { name: string; price: string }[]
  latestPost: string
}

const defaultPreview: Preview = {
  name: "סטודיו מאיה",
  category: "מניקוריסטית מקצועית",
  avatar: "מא",
  services: [
    { name: "מניקור ג'ל מלא", price: "₪120" },
    { name: "עיצוב ציפורניים", price: "₪80" },
    { name: "פדיקור + לק", price: "₪150" },
  ],
  latestPost: "🔥 מבצע הבוקר בלבד — מניקור ג'ל ב-₪99! מקומות אחרונים",
}

const loadingSteps = [
  'קורא את העסק שלך...',
  'מנתח קהל יעד...',
  'בונה זהות ויזואלית...',
  'מייצר לוגו ומיתוג...',
  'כותב תיאורי שירותים...',
  'מחבר לרשתות חברתיות...',
  'החנות שלך מוכנה ✓',
]

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [activeQuick, setActiveQuick] = useState<string | null>(null)
  const [preview, setPreview] = useState<Preview>(defaultPreview)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleQuickFill = (key: string) => {
    const fill = quickFills[key]
    if (!fill) return
    setActiveQuick(key)
    setInputText(fill.text)
    setPreview(fill)
    setIsFollowing(false)
  }

  const handleGenerate = async () => {
    if (loading) return
    setLoading(true)
    setLoadingStep(0)

    // Cycle through steps visually
    loadingSteps.forEach((_, i) => {
      setTimeout(() => setLoadingStep(i), i * 400)
    })

    try {
      await fetch('/api/create-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_type: activeQuick ?? 'custom',
          description: inputText,
        }),
      })
    } catch (err) {
      console.error('Failed to save lead:', err)
    }

    setTimeout(() => setLoading(false), loadingSteps.length * 400 + 300)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* LOADING OVERLAY */}
      {loading && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.97)',
          zIndex: 200, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          {/* Spinning ring */}
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            <div style={{
              position: 'absolute', inset: 0,
              border: '2px solid rgba(200,169,110,0.15)',
              borderTopColor: 'var(--gold)', borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 10,
              border: '1px solid rgba(200,169,110,0.08)',
              borderBottomColor: 'var(--gold-dark)', borderRadius: '50%',
              animation: 'spin 1.5s linear infinite reverse',
            }} />
          </div>

          {/* Steps list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 260 }}>
            {loadingSteps.map((step, i) => {
              const done = i < loadingStep
              const active = i === loadingStep
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  opacity: done || active ? 1 : 0.25,
                  transition: 'opacity 0.3s',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11,
                    background: done ? 'rgba(200,169,110,0.2)' : active ? 'rgba(200,169,110,0.1)' : 'transparent',
                    border: `1px solid ${done ? 'var(--gold)' : active ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    color: 'var(--gold)',
                  }}>
                    {done ? '✓' : active ? '·' : ''}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-syne)', fontSize: 14,
                    color: done ? 'var(--gold)' : active ? 'var(--white)' : 'var(--text-muted)',
                  }}>{step}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        background: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <a href="#" style={{
          fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 22,
          letterSpacing: '0.12em', color: 'var(--gold)', textDecoration: 'none',
        }}>MAADRIM</a>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a onClick={() => scrollTo('how')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, cursor: 'pointer' }}>איך זה עובד</a>
          <a onClick={() => scrollTo('distribution')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, cursor: 'pointer' }}>הפצה אוטומטית</a>
          <a onClick={() => scrollTo('pricing')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, cursor: 'pointer' }}>מחירים</a>
          <a onClick={() => scrollTo('pricing')} style={{
            background: 'var(--gold)', color: 'var(--black)',
            padding: '10px 22px', borderRadius: 'var(--radius-sm)',
            fontWeight: 500, fontSize: 14, cursor: 'pointer', textDecoration: 'none',
          }}>צור את החנות שלך</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 48px 80px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'center', position: 'relative', zIndex: 1,
        }}>
          {/* LEFT */}
          <div>
            <div className="fade-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)',
              padding: '8px 16px', borderRadius: 100, fontSize: 13,
              color: 'var(--gold)', marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              מתחילים בתל אביב
            </div>
            <h1 className="fade-up-2" style={{
              fontFamily: 'var(--font-syne)', fontSize: 'clamp(42px, 5vw, 68px)',
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24,
            }}>
              תאר את העסק שלך.<br />
              <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>אנחנו עושים את השאר.</em>
            </h1>
            <p className="fade-up-3" style={{
              fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7,
              marginBottom: 40, maxWidth: 440,
            }}>
              כתוב כמה משפטים על העסק שלך. MAADRIM מבין, בונה ומפיץ — <strong style={{ color: 'var(--white)', fontWeight: 500 }}>תוך שניות יש לך נוכחות דיגיטלית מלאה בכל הרשתות.</strong>
            </p>

            {/* INPUT AREA */}
            <div className="fade-up-4" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: 20, marginBottom: 16,
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 14 }}>
                {(['nail', 'barber', 'tutor', 'coffee'] as const).map((key) => {
                  const labels: Record<string, string> = { nail: '💅 סלון מניקור', barber: '✂️ ספרייה', tutor: '📚 מורה פרטי', coffee: '☕ בית קפה' }
                  return (
                    <button key={key} onClick={() => handleQuickFill(key)} style={{
                      background: activeQuick === key ? 'var(--gold)' : 'rgba(200,169,110,0.08)',
                      border: `1px solid ${activeQuick === key ? 'var(--gold)' : 'rgba(200,169,110,0.2)'}`,
                      color: activeQuick === key ? 'var(--black)' : 'var(--gold)',
                      padding: '6px 14px', borderRadius: 100, fontSize: 13,
                      cursor: 'pointer', fontFamily: 'var(--font-dm-sans)',
                    }}>{labels[key]}</button>
                  )
                })}
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
                placeholder="תאר לי את העסק שלך. אני אבנה את השאר..."
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  outline: 'none', color: 'var(--white)', fontFamily: 'var(--font-dm-sans)',
                  fontSize: 15, resize: 'none', lineHeight: 1.6, textAlign: 'right',
                }}
              />
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  אין לך הכל? AI יבנה את השאר.
                </span>
                <button onClick={handleGenerate} style={{
                  background: 'var(--gold)', color: 'var(--black)', border: 'none',
                  padding: '12px 24px', borderRadius: 'var(--radius-sm)',
                  fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-syne)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  תנו ל-AI לבנות
                </button>
              </div>
            </div>

            <div className="fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 13, color: 'var(--text-muted)', flexWrap: 'wrap' as const }}>
              {['בונה תוך שניות', 'מפיץ לכל הרשתות אוטומטית', 'לקוחות עוקבים ומזמינים'].map((item, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {i > 0 && <span style={{ width: 4, height: 4, background: 'var(--text-muted)', borderRadius: '50%', display: 'inline-block' }} />}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* PREVIEW PHONE */}
          <div className="fade-up-3" style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: 12, fontFamily: 'var(--font-syne)' }}>
              תצוגה מקדימה של החנות שלך
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
              borderRadius: 24, overflow: 'hidden', maxWidth: 320, margin: '0 auto',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            }}>
              {/* HEADER */}
              <div style={{ padding: 20, textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: 14, right: 14,
                  background: '#e74c3c', color: 'white', fontSize: 10,
                  fontWeight: 600, padding: '3px 8px', borderRadius: 100,
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontFamily: 'var(--font-syne)', letterSpacing: '0.05em',
                }}>
                  <span style={{ width: 5, height: 5, background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite', display: 'inline-block' }} />
                  LIVE
                </div>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
                  margin: '0 auto 12px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontFamily: 'var(--font-syne)',
                  fontSize: 22, fontWeight: 800, color: 'var(--black)',
                }}>{preview.avatar}</div>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{preview.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{preview.category}</div>

                {/* SOCIAL LINKS */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
                  {[['W', 'rgba(37,211,102,0.15)', '#25D366'], ['I', 'rgba(225,48,108,0.15)', '#e1306c'], ['f', 'rgba(24,119,242,0.15)', '#1877f2'], ['T', 'rgba(0,0,0,0.3)', '#ffffff']].map(([letter, bg, color]) => (
                    <div key={letter} style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, cursor: 'pointer', background: bg, color, border: '1px solid rgba(255,255,255,0.1)' }}>{letter}</div>
                  ))}
                </div>

                {/* FOLLOW BUTTON */}
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  style={{
                    background: isFollowing ? 'rgba(200,169,110,0.15)' : 'var(--gold)',
                    color: isFollowing ? 'var(--gold)' : 'var(--black)',
                    border: isFollowing ? '1px solid var(--gold)' : 'none',
                    padding: '8px 28px', borderRadius: 100,
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'var(--font-syne)', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto',
                  }}>
                  {isFollowing ? '✓ עוקב' : '+ עקוב לעדכונים'}
                </button>
              </div>

              {/* LATEST POST */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(200,169,110,0.04)' }}>
                <div style={{ fontSize: 10, color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 6, letterSpacing: '0.1em' }}>עדכון אחרון</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>{preview.latestPost}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>💬</span> 12 תגובות
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>❤️</span> 34 לייקים
                  </div>
                </div>
              </div>

              {/* SERVICES */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                {preview.services.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0', borderBottom: i < preview.services.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <span style={{ fontSize: 13 }}>{s.name}</span>
                    <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, fontFamily: 'var(--font-syne)' }}>{s.price}</span>
                    <button style={{
                      fontSize: 10, background: 'rgba(200,169,110,0.12)', color: 'var(--gold)',
                      border: '1px solid rgba(200,169,110,0.3)', padding: '3px 10px',
                      borderRadius: 100, cursor: 'pointer',
                    }}>הזמן</button>
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                <button style={{
                  background: '#25D366', color: 'white', border: 'none',
                  padding: 10, borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <svg width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.087.535 4.048 1.474 5.755L.057 24l6.394-1.394C8.06 23.498 10.001 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.892 0-3.665-.522-5.178-1.428l-.371-.22-3.796.827.846-3.705-.24-.381C2.537 15.616 2 13.879 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  הזמינו דרך WhatsApp
                </button>
                <button style={{
                  background: 'rgba(255,255,255,0.06)', color: 'var(--white)',
                  border: '1px solid var(--border)', padding: 10,
                  borderRadius: 'var(--radius-sm)', fontSize: 13, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>📅 קביעת תור</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>איך זה עובד</div>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
            מאפס ל<em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>עסק חי עם קהל</em><br />ב-4 צעדים
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 60 }}>ללא ידע בעיצוב. ללא ידע טכני. רק תאר את העסק שלך ו-AI מטפל בשאר.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            {[
              { n: '01', icon: '📋', title: 'שתף את מה שיש לך', desc: 'שירותים, מחירים, תמונות, קישורי רשתות חברתיות — הכל. ככל שתיתן יותר כך התוצאה טובה יותר. חסר משהו? AI יצור אותו.' },
              { n: '02', icon: '🧠', title: 'AI בונה חנות חיה', desc: 'MAADRIM מייצר לוגו, כותב תיאורים ובונה חנות שהיא גם פיד תוכן — לא רק כרטיס ביקור סטטי.' },
              { n: '03', icon: '🔔', title: 'לקוחות עוקבים', desc: 'כל מי שנכנס לחנות יכול ללחוץ "עקוב" ולקבל עדכונים ישירות. בונה קהל נאמן שחוזר שוב ושוב.' },
              { n: '04', icon: '📡', title: 'פרסם פעם אחת — הגע לכולם', desc: 'העלה עדכון אחד ו-MAADRIM שולח אותו אוטומטית ל-WhatsApp, אינסטגרם ופייסבוק בפורמט הנכון לכל רשת.' },
            ].map((step) => (
              <div key={step.n} style={{ background: 'var(--black)', padding: '36px 28px' }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 48, fontWeight: 800, color: 'rgba(200,169,110,0.12)', lineHeight: 1, marginBottom: 16 }}>{step.n}</div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{step.title}</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* AUTO DISTRIBUTION */}
      <section id="distribution" style={{ padding: '100px 48px', position: 'relative', zIndex: 1, background: 'linear-gradient(135deg, rgba(200,169,110,0.05) 0%, transparent 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>הפצה אוטומטית</div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                פרסם <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>פעם אחת.</em><br />הגע לכולם.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
                כתבת מבצע? צילמת עבודה חדשה? יש לך מקום פנוי ב-14:00? — העלה פעם אחת ב-MAADRIM. הוא יפרסם אוטומטית בכל הרשתות בפורמט הנכון לכל אחת.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
                {[
                  { icon: '💬', title: 'WhatsApp', desc: 'סטטוס לכל אנשי הקשר + הודעה לקבוצות שלך.' },
                  { icon: '📸', title: 'Instagram', desc: 'סטורי + פוסט עם הכיתוב המושלם — כבר מוכן.' },
                  { icon: '📘', title: 'Facebook', desc: 'פוסט לדף העסק ולקבוצות המקומיות שלך.' },
                  { icon: '🎵', title: 'TikTok', desc: 'עוד נמצא בפיתוח — בקרוב.' },
                ].map((f) => (
                  <div key={f.title} style={{ display: 'flex', gap: 16, padding: '14px 20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--card-bg)', alignItems: 'center' }}>
                    <div style={{ fontSize: 24, width: 40, textAlign: 'center' as const, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{f.title}</h4>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{f.desc}</p>
                    </div>
                    <div style={{ marginRight: 'auto', fontSize: 11, color: f.title === 'TikTok' ? 'var(--text-muted)' : '#4ade80', background: f.title === 'TikTok' ? 'rgba(255,255,255,0.05)' : 'rgba(74,222,128,0.1)', padding: '3px 10px', borderRadius: 100 }}>
                      {f.title === 'TikTok' ? 'בקרוב' : 'פעיל'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VISUAL: POST ONCE FLOW */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
              {/* INPUT */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20 }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 10, letterSpacing: '0.1em' }}>עדכון חדש מבעל העסק</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>🔥 מבצע הבוקר בלבד — מניקור ג&apos;ל ב-₪99! מקומות אחרונים, מי רוצה?</div>
                <button style={{ background: 'var(--gold)', color: 'var(--black)', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-syne)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  פרסם בכל הרשתות
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>

              {/* ARROW */}
              <div style={{ textAlign: 'center' as const, fontSize: 20, color: 'var(--gold)' }}>↓</div>

              {/* DISTRIBUTED TO */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { icon: '💬', platform: 'WhatsApp', format: 'סטטוס + קבוצות', color: '#25D366' },
                  { icon: '📸', platform: 'Instagram', format: 'סטורי + פוסט', color: '#e1306c' },
                  { icon: '📘', platform: 'Facebook', format: 'פוסט לדף', color: '#1877f2' },
                  { icon: '🔔', platform: 'עוקבים', format: 'התראה מיידית', color: 'var(--gold)' },
                ].map((dest) => (
                  <div key={dest.platform} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{dest.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-syne)', color: dest.color }}>{dest.platform}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{dest.format}</div>
                    </div>
                    <span style={{ marginRight: 'auto', color: '#4ade80', fontSize: 14 }}>✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* AI CREATION ENGINE */}
      <section style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>מנוע יצירה AI</div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                יש לך או אין — <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>AI מכסה אותך</em>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>לרוב העסקים אין הכל מוכן. זה בסדר. MAADRIM AI ממלא כל חוסר — כדי שתשיק בכל מקרה.</p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
                {[
                  { icon: '🖼️', title: 'לוגו וזהות ויזואלית', desc: 'יש לך לוגו? AI משתמש בו. אין לך? AI מייצר לוגו מקצועי שמתאים לעסק שלך.' },
                  { icon: '✍️', title: 'טקסטים ותיאורים', desc: 'אין לך זמן לכתוב? AI כותב תיאורי שירותים משכנעים, הביוגרפיה שלך וטקסטי מכירה.' },
                  { icon: '🎨', title: 'מיתוג וצבעים', desc: 'AI מתאים את הצבעים, הפונטים והאסתטיקה שלך כדי ליצור מותג עקבי ומקצועי מיידית.' },
                ].map((f) => (
                  <div key={f.title} style={{ display: 'flex', gap: 16, padding: 20, borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--card-bg)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'rgba(200,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{f.title}</h4>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 32, textAlign: 'center' as const }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginBottom: 24, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>מה אתה נותן ← מה AI בונה</div>
              {[
                { check: 'has', label: 'שירותים ומחירים', status: 'סיפקת', statusClass: false },
                { check: 'has', label: 'מיקום / WhatsApp', status: 'סיפקת', statusClass: false },
                { check: 'ai', label: 'לוגו', status: 'נוצר על ידי AI', statusClass: true },
                { check: 'ai', label: 'תיאור העסק', status: 'נוצר על ידי AI', statusClass: true },
                { check: 'ai', label: 'מיתוג ועיצוב', status: 'נוצר על ידי AI', statusClass: true },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', marginBottom: 8, border: '1px solid var(--border)' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0, background: row.check === 'has' ? 'rgba(200,169,110,0.15)' : 'rgba(100,200,100,0.15)', color: row.check === 'has' ? 'var(--gold)' : '#4ade80' }}>{row.check === 'has' ? '✓' : '✦'}</div>
                  <div style={{ fontSize: 13, flex: 1, textAlign: 'right' as const }}>{row.label}</div>
                  <div style={{ fontSize: 11, color: row.statusClass ? '#4ade80' : 'var(--text-muted)' }}>{row.status}</div>
                </div>
              ))}
              <div style={{ fontSize: 24, color: 'var(--gold)', margin: '16px 0' }}>↓</div>
              <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 'var(--radius-sm)', padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 14, color: 'var(--gold)' }}>חנות חיה עם פיד, עוקבים והפצה — מוכנה</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>נוצרה תוך פחות מ-60 שניות</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* SUSPENDED STATE */}
      <section style={{ padding: '80px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>7 ימים בחינם</div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                נסו בחינם.<br /><em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>תשלמו רק כשרואים תוצאות.</em>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                אחרי 7 ימים החנות נשארת פעילה — אבל הלקוחות שלך יראו שהעסק <strong style={{ color: 'var(--white)' }}>מושעה</strong>. זה הלחץ שמביא בעלי עסק לשדרג מהר.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                {[
                  '✓ 7 ימים מלאים — כל הפיצ\'רים פתוחים',
                  '✓ ללא כרטיס אשראי לפני הסוף',
                  '✓ הודעת תזכורת יום לפני הסיום',
                  '✓ ביטול בלחיצה אחת בכל עת',
                ].map((item) => (
                  <div key={item} style={{ fontSize: 15, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: 'var(--gold)' }}>{item.slice(0, 1)}</span>
                    {item.slice(2)}
                  </div>
                ))}
              </div>
            </div>

            {/* SUSPENDED VISUAL */}
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', maxWidth: 320 }}>
                {/* UPGRADE BANNER */}
                <div style={{ background: 'rgba(231,76,60,0.15)', border: 'none', borderBottom: '1px solid rgba(231,76,60,0.3)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-syne)', color: '#ff6b6b' }}>תקופת הניסיון הסתיימה</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>שדרגו כדי להמשיך למכור</div>
                  </div>
                  <button style={{ background: 'var(--gold)', color: 'var(--black)', border: 'none', padding: '6px 14px', borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-syne)', whiteSpace: 'nowrap' }}>שדרגו ←</button>
                </div>

                {/* STORE CONTENT — BLURRED */}
                <div style={{ filter: 'blur(2px)', opacity: 0.5, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontSize: 16, fontWeight: 800, color: 'var(--black)' }}>מא</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 14 }}>סטודיו מאיה</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>מניקוריסטית מקצועית</div>
                    </div>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, width: '70%', marginBottom: 16 }} />
                  <div style={{ height: 36, background: 'rgba(255,255,255,0.06)', borderRadius: 8 }} />
                </div>

                {/* FOLLOWERS SUSPENDED */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>העוקבים שלך רואים:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: 14 }}>🔒</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#ff6b6b' }}>סטודיו מאיה — מושעה זמנית</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>126 עוקבים ממתינים לחזרה</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* PRICING */}
      <section id="pricing" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' as const }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>מחירים</div>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
            7 ימים בחינם.<br /><em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>אחר כך ₪79 בלבד.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 60 }}>מחיר אחד. כל הפיצ&#39;רים. ללא הפתעות.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 700, margin: '0 auto 48px' }}>
            {[
              {
                name: 'ניסיון חינם', price: '₪0', period: 'ל-7 ימים',
                featured: false,
                features: [
                  'חנות חיה עם AI מלא',
                  'פיד עדכונים + עוקבים',
                  'הפצה אוטומטית לכל הרשתות',
                  'מערכת הזמנות ו-WhatsApp',
                  'ללא כרטיס אשראי',
                ],
                btnText: 'התחילו בחינם',
                btnStyle: { background: 'rgba(255,255,255,0.06)', color: 'var(--white)', border: '1px solid var(--border)' },
              },
              {
                name: 'Pro', price: '₪79', period: '/ חודש',
                featured: true,
                features: [
                  'הכל מהניסיון החינמי',
                  'הפצה אוטומטית ללא הגבלה',
                  'AI ללא הגבלה',
                  'אנליטיקס ונתוני עוקבים',
                  'דומיין מותאם אישית',
                ],
                btnText: 'התחילו 7 ימים חינם',
                btnStyle: { background: 'var(--gold)', color: 'var(--black)', border: 'none' },
              },
            ].map((plan) => (
              <div key={plan.name} style={{
                background: plan.featured ? 'rgba(200,169,110,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${plan.featured ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', padding: '36px 28px', position: 'relative', textAlign: 'right' as const,
              }}>
                {plan.featured && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--black)', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100, whiteSpace: 'nowrap', fontFamily: 'var(--font-syne)' }}>הכי פופולרי</div>
                )}
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginBottom: 12 }}>{plan.name}</div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 42, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>{plan.price} <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text-muted)' }}>{plan.period}</span></div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 12, margin: '24px 0 28px' }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={handleGenerate} style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 700, cursor: 'pointer', ...plan.btnStyle }}>{plan.btnText}</button>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>ביטול בכל עת · ללא עמלות נסתרות · תמיכה בעברית</p>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* BOTTOM CTA */}
      <div style={{ textAlign: 'center' as const, padding: '120px 48px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ position: 'absolute', width: 600, height: 600, background: 'radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20, position: 'relative' }}>
          העסק שלכם ראוי<br /><em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>להימצא בכל מקום.</em>
        </h2>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 40, position: 'relative' }}>הצטרפו לעסקים אמיתיים בתל אביב שמשיקים עם MAADRIM.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const, position: 'relative' }}>
          <button onClick={handleGenerate} style={{
            background: 'var(--gold)', color: 'var(--black)', border: 'none',
            padding: '16px 36px', borderRadius: 'var(--radius-sm)',
            fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-syne)',
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            צרו את החנות שלכם — בחינם
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button onClick={() => scrollTo('distribution')} style={{
            background: 'transparent', color: 'var(--white)', border: '1px solid var(--border)',
            padding: '16px 36px', borderRadius: 'var(--radius-sm)',
            fontSize: 17, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-dm-sans)',
          }}>ראו איך ההפצה עובדת</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 18, letterSpacing: '0.12em', color: 'var(--gold)' }}>MAADRIM</div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--text-muted)' }}>
          {['פרטיות', 'תנאי שימוש', 'צור קשר', 'תמיכה'].map((l) => (
            <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
          <span style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          מתחילים בתל אביב, ישראל 🇮🇱
        </div>
      </footer>
    </>
  )
}
