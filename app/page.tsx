'use client'

import { useState } from 'react'

const quickFills: Record<string, { text: string; name: string; category: string; avatar: string; services: { name: string; price: string }[] }> = {
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
  },
}

type Preview = {
  name: string
  category: string
  avatar: string
  services: { name: string; price: string }[]
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
}

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [activeQuick, setActiveQuick] = useState<string | null>(null)
  const [preview, setPreview] = useState<Preview>(defaultPreview)
  const [loading, setLoading] = useState(false)

  const handleQuickFill = (key: string) => {
    const fill = quickFills[key]
    if (!fill) return
    setActiveQuick(key)
    setInputText(fill.text)
    setPreview({ name: fill.name, category: fill.category, avatar: fill.avatar, services: fill.services })
  }

  const handleGenerate = async () => {
    if (loading) return
    setLoading(true)

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

    setTimeout(() => setLoading(false), 2200)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* LOADING OVERLAY */}
      {loading && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.95)',
          zIndex: 200, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 24,
        }}>
          <div style={{
            width: 64, height: 64,
            border: '2px solid rgba(200,169,110,0.2)',
            borderTopColor: 'var(--gold)', borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <div style={{ fontFamily: 'var(--font-syne)', fontSize: 18, color: 'var(--gold)' }}>
            מנתח את העסק שלך...
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>AI בונה את החנות שלך</div>
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
          <a onClick={() => scrollTo('live')} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 14, cursor: 'pointer' }}>מכירה בשידור חי</a>
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
              background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)',
              padding: '8px 16px', borderRadius: 100, fontSize: 13,
              color: 'var(--gold)', marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              מתחילים בתל אביב — הצטרפו לרשימת ההמתנה
            </div>
            <h1 className="fade-up-2" style={{
              fontFamily: 'var(--font-syne)', fontSize: 'clamp(42px, 5vw, 68px)',
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24,
            }}>
              העסק שלך.<br />
              <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>חי תוך 60 שניות.</em>
            </h1>
            <p className="fade-up-3" style={{
              fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7,
              marginBottom: 40, maxWidth: 440,
            }}>
              ספר ל-MAADRIM על העסק שלך. <strong style={{ color: 'var(--white)', fontWeight: 500 }}>AI בונה את חנות הוויטרינה, הלוגו והתוכן</strong> — ואז מפיץ אותם בכל מקום שהלקוחות שלך נמצאים.
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
                placeholder="ספר לנו על העסק שלך — שירותים, מחירים, מיקום, כל מה שיש לך..."
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
                  צור את החנות שלי
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>

            <div className="fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 13, color: 'var(--text-muted)', flexWrap: 'wrap' as const }}>
              {['7 ימים בחינם', 'ללא כרטיס אשראי', 'לעסקים אמיתיים'].map((item, i) => (
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
                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  {preview.category}
                  <span style={{ color: 'var(--gold)', fontSize: 11 }}>★ מאומת</span>
                </div>
              </div>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                {preview.services.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 0', borderBottom: i < preview.services.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
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
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                <button style={{
                  background: '#25D366', color: 'white', border: 'none',
                  padding: 12, borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.087.535 4.048 1.474 5.755L.057 24l6.394-1.394C8.06 23.498 10.001 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.892 0-3.665-.522-5.178-1.428l-.371-.22-3.796.827.846-3.705-.24-.381C2.537 15.616 2 13.879 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  הזמינו דרך WhatsApp
                </button>
                <button style={{
                  background: 'rgba(255,255,255,0.06)', color: 'var(--white)',
                  border: '1px solid var(--border)', padding: 12,
                  borderRadius: 'var(--radius-sm)', fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>📅 קביעת תור</button>
              </div>
              <div style={{
                padding: '12px 20px', background: 'rgba(255,255,255,0.02)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>שתפו דרך:</span>
                {[['W','rgba(37,211,102,0.15)','#25D366'],['I','rgba(225,48,108,0.15)','#e1306c'],['f','rgba(24,119,242,0.15)','#1877f2']].map(([letter, bg, color]) => (
                  <div key={letter} style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer', background: bg, color }}>{letter}</div>
                ))}
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
            מאפס ל<em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>עסק חי</em><br />ב-4 צעדים
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 60 }}>ללא ידע בעיצוב. ללא ידע טכני. רק תאר את העסק שלך ו-AI מטפל בשאר.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            {[
              { n: '01', icon: '📋', title: 'שתף את כל מה שיש לך', desc: 'שירותים, מחירים, תמונות, קישור לאינסטגרם — הכל. ככל שתיתן יותר כך התוצאה טובה יותר. חסר משהו? AI יצור אותו.' },
              { n: '02', icon: '🧠', title: 'AI מנתח ובונה', desc: 'MAADRIM קורא הכל, מייצר לוגו אם אין, כותב תיאורים ומעצב את החנות שלך אוטומטית.' },
              { n: '03', icon: '⚡', title: 'החנות שלך עולה לאוויר', desc: 'דף מכירה מלא עם מיתוג — עם הזמנת תורים, WhatsApp, שירותים ומחירים. מוכן תוך פחות מ-60 שניות.' },
              { n: '04', icon: '📡', title: 'שתף בכל מקום מיד', desc: 'לחיצה אחת כדי לדחוף את החנות שלך ל-WhatsApp, Instagram ו-Facebook. תגיע לכל הלקוחות שלך בבת אחת.' },
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
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 14, color: 'var(--gold)' }}>חנות מלאה — מוכנה למכירה</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>נוצרה תוך פחות מ-60 שניות</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* LIVE SELLING */}
      <section id="live" style={{ padding: '100px 48px', position: 'relative', zIndex: 1, background: 'linear-gradient(135deg, rgba(200,169,110,0.05) 0%, transparent 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>מכירה בשידור חי</div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>עלו לאוויר.</em> מכרו בזמן אמת.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>כמו TikTok Live — אבל לעסק שלך. הראו את העבודה, קבלו הזמנות ומכרו שירותים בזמן שהלקוחות צופים.</p>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20, marginBottom: 32 }}>
                {[
                  { icon: '🔴', title: 'עלו לשידור מכל מקום', desc: 'התחילו שידור חי מהטלפון. העוקבים שלכם מקבלים התראה מיידית.' },
                  { icon: '🛒', title: 'מכרו במהלך השידור', desc: 'הצמידו שירותים, הגדירו מבצעי זמן מוגבל ואפשרו ללקוחות להזמין או לקנות בזמן אמת.' },
                  { icon: '💬', title: 'אינטראקציה בזמן אמת', desc: 'לקוחות מצ\'אטים, שואלים שאלות ואתם עונים ישירות — בונים אמון וסוגרים עסקאות מיד.' },
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
              <button style={{
                background: 'var(--gold)', color: 'var(--black)', border: 'none',
                padding: '16px 36px', borderRadius: 'var(--radius-sm)',
                fontSize: 17, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-syne)', display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ background: '#e74c3c', width: 10, height: 10, borderRadius: '50%', display: 'inline-block' }} />
                התחילו למכור בשידור חי
              </button>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', maxWidth: 340 }}>
                <div style={{ background: '#e74c3c', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 14, color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite', display: 'inline-block' }} />
                    שידור חי
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>👁 47 צופים</div>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 16, marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>💅</div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>מבצע מניקור ג&apos;ל</h4>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>מבצע מוגבל — להיום בלבד</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-syne)' }}>₪99 <span style={{ fontSize: 14, textDecoration: 'line-through', color: 'var(--text-muted)', fontWeight: 400 }}>₪120</span></div>
                    </div>
                  </div>
                  <button style={{ width: '100%', background: 'var(--gold)', color: 'var(--black)', border: 'none', padding: 12, borderRadius: 'var(--radius-sm)', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-syne)', marginBottom: 12 }}>📅 הזמינו עכשיו</button>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                    {[['שרה כ.', 'אפשר מחר ב-15:00?'], ['דינה מ.', 'אוהבת את העבודה שלך! 🔥'], ['רינה ט.', 'אילו צבעים יש לך?']].map(([user, msg]) => (
                      <div key={user} style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: 'var(--gold)', fontWeight: 500 }}>{user}</span> {msg}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* DISTRIBUTION */}
      <section style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>הפצה מיידית</div>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
            פרסמו בכל מקום.<br /><em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>לחיצה אחת.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 60 }}>הפסיקו לפרסם ידנית בכל פלטפורמה. MAADRIM מפיץ את החנות שלך לכל הערוצים שלך מיידית.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '💬', name: 'WhatsApp', desc: 'שתפו את קישור החנות שלכם לכל אנשי הקשר והקבוצות שלכם ב-WhatsApp. שם הלקוחות הישראלים כבר נמצאים.' },
              { icon: '📸', name: 'Instagram', desc: 'יצירת פוסטים וסטוריז אוטומטית לאינסטגרם שלכם. קישור בביו, סטוריז ופוסטים — הכל בהקשה אחת.' },
              { icon: '📘', name: 'Facebook', desc: 'דחפו את החנות שלכם לדף ה-Facebook ולקבוצות עסקיות מקומיות שבהן לקוחות מקומיים יכולים למצוא אתכם.' },
            ].map((ch) => (
              <div key={ch.name} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '32px 28px', textAlign: 'center' as const, cursor: 'pointer' }}>
                <span style={{ fontSize: 36, marginBottom: 16, display: 'block' }}>{ch.icon}</span>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{ch.name}</div>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>{ch.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, textAlign: 'center' as const, padding: 40, background: 'rgba(200,169,110,0.04)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>&ldquo;הגיעו לכל הלקוחות שלכם בלחיצה אחת&rdquo;</div>
            <div style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 24 }}>הפסיקו לבזבז זמן על פרסום ידני. תנו ל-MAADRIM לטפל בהפצה שלכם.</div>
            <button onClick={() => scrollTo('pricing')} style={{
              background: 'var(--gold)', color: 'var(--black)', border: 'none',
              padding: '16px 36px', borderRadius: 'var(--radius-sm)',
              fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-syne)',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              התחילו להפיץ עכשיו
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* PRICING */}
      <section id="pricing" style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-syne)', marginBottom: 16 }}>מחירים</div>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
            התחילו בחינם. <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>גדלו כשמוכנים.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>ללא עמלות נסתרות. ללא חוזים מסובכים. התחילו בחינם ושדרגו כשהעסק שלכם גדל.</p>

          {/* AI LIMIT BANNER */}
          <div style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.3)', borderRadius: 'var(--radius)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60, gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', background: 'rgba(200,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>⚡</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>כמעט הגעתם למגבלת ה-AI השבועית</h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>התוכנית החינמית כוללת 5 יצירות AI בשבוע. שדרגו ל-Pro לגישה בלתי מוגבלת.</p>
                <div style={{ marginTop: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 100, height: 4, width: 200, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '85%', background: 'var(--gold)', borderRadius: 100 }} />
                </div>
              </div>
            </div>
            <button onClick={() => scrollTo('pricing')} style={{ background: 'var(--gold)', color: 'var(--black)', border: 'none', padding: '12px 24px', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-syne)', whiteSpace: 'nowrap' }}>שדרגו ל-Pro ←</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                name: 'חינם', price: '₪0', period: '/ חודש', trial: '7 ימי ניסיון על תכונות Pro',
                featured: false, badge: null,
                features: [
                  { check: true, text: 'חנות בסיסית' }, { check: true, text: 'כפתור WhatsApp' },
                  { check: true, text: '5 יצירות AI בשבוע' }, { check: true, text: '3 שירותים מוצגים' },
                  { check: false, text: 'מערכת הזמנות' }, { check: false, text: 'הפצה לרשתות חברתיות' },
                  { check: false, text: 'מכירה בשידור חי' }, { check: false, text: 'דומיין מותאם אישית' },
                ],
                btnStyle: { background: 'rgba(255,255,255,0.06)', color: 'var(--white)', border: '1px solid var(--border)' },
                btnText: 'התחילו בחינם',
              },
              {
                name: 'Pro', price: '₪79', period: '/ חודש', trial: '7 ימים ראשונים בחינם, ביטול בכל עת',
                featured: true, badge: 'הכי פופולרי',
                features: [
                  { check: true, text: 'חנות מלאה' }, { check: true, text: 'מערכת הזמנות' },
                  { check: true, text: 'שירותים ללא הגבלה' }, { check: true, text: 'הפצה לרשתות חברתיות' },
                  { check: true, text: '50 יצירות AI בשבוע' }, { check: true, text: 'דומיין מותאם אישית' },
                  { check: true, text: 'לוח אנליטיקס' }, { check: false, text: 'מכירה בשידור חי' },
                ],
                btnStyle: { background: 'var(--gold)', color: 'var(--black)', border: 'none' },
                btnText: 'התחילו למכור — ₪79/חודש',
              },
              {
                name: 'AI מתקדם', price: '₪139', period: '/ חודש', trial: 'כולל את כל תכונות Pro',
                featured: false, badge: null,
                features: [
                  { check: true, text: 'הכל ב-Pro' }, { check: true, text: 'פלטפורמת שידור חי' },
                  { check: true, text: 'AI ללא הגבלה' }, { check: true, text: 'פרומפטים AI מתקדמים' },
                  { check: true, text: 'תמיכה עדיפה' }, { check: true, text: 'יצירת תוכן AI' },
                  { check: true, text: 'גישת צוות' }, { check: true, text: 'גישת API' },
                ],
                btnStyle: { background: 'rgba(200,169,110,0.1)', color: 'var(--gold)', border: '1px solid rgba(200,169,110,0.3)' },
                btnText: 'פתחו את הכל',
              },
            ].map((plan) => (
              <div key={plan.name} style={{
                background: plan.featured ? 'rgba(200,169,110,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${plan.featured ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', padding: '36px 28px', position: 'relative',
              }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--black)', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 100, whiteSpace: 'nowrap', fontFamily: 'var(--font-syne)', letterSpacing: '0.05em' }}>{plan.badge}</div>
                )}
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: 12 }}>{plan.name}</div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 42, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>{plan.price} <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text-muted)' }}>{plan.period}</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>{plan.trial}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 12, marginBottom: 32 }}>
                  {plan.features.map((f) => (
                    <li key={f.text} style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: f.check ? 'var(--gold)' : 'rgba(255,255,255,0.2)', fontSize: 14 }}>{f.check ? '✓' : '✗'}</span>
                      <span style={{ color: f.check ? 'var(--white)' : 'var(--text-muted)' }}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={handleGenerate} style={{ width: '100%', padding: 14, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 700, cursor: 'pointer', ...plan.btnStyle }}>{plan.btnText}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 48px' }} />

      {/* BOTTOM CTA */}
      <div style={{ textAlign: 'center' as const, padding: '120px 48px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ position: 'absolute', width: 600, height: 600, background: 'radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        <h2 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20, position: 'relative' }}>
          העסק שלכם ראוי<br /><em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>להימצא.</em>
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
          <button onClick={() => scrollTo('live')} style={{
            background: 'transparent', color: 'var(--white)', border: '1px solid var(--border)',
            padding: '16px 36px', borderRadius: 'var(--radius-sm)',
            fontSize: 17, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-dm-sans)',
          }}>ראו איך זה עובד</button>
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
