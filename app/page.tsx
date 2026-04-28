import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="landing-root" dir="rtl">

      {/* ── Navbar ── */}
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <span className="landing-logo">AccountingOps</span>
          <nav className="landing-nav-links">
            <Link href="/auth/login" className="landing-nav-link">כניסה</Link>
            <Link href="/auth/register" className="landing-cta-small">התחל בחינם</Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="landing-hero">
        <div className="hero-glow-1" aria-hidden="true" />
        <div className="hero-glow-2" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="landing-container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            לפירמות ראיית חשבון מודרניות
          </div>

          <h1 className="hero-headline">
            כל התיקים שלך<br />
            <span className="hero-gradient-text">במקום אחד</span>
          </h1>

          <p className="hero-sub">
            הפסיקו לאבד מסמכים בין ווטסאפ לאקסל.<br />
            AccountingOps נותן לכם שליטה מלאה על כל תיק לקוח — בזמן אמת.
          </p>

          <div className="hero-ctas">
            <Link href="/auth/register" className="btn-primary">
              התחל בחינם
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <Link href="/auth/login" className="btn-ghost">כניסה למערכת</Link>
          </div>

          {/* Dashboard mockup */}
          <div className="mockup-wrapper" aria-hidden="true">
            <div className="mockup-frame">
              <div className="mockup-topbar">
                <div className="mockup-dot" style={{background:'#ff5f57'}} />
                <div className="mockup-dot" style={{background:'#ffbd2e'}} />
                <div className="mockup-dot" style={{background:'#28c840'}} />
                <span className="mockup-url">accounting-ops-ai.vercel.app/dashboard</span>
              </div>
              <div className="mockup-body">
                {/* Sidebar */}
                <div className="mockup-sidebar">
                  <div className="mockup-brand">AccountingOps</div>
                  {['לוח בקרה','לקוחות','תור משימות'].map((item, i) => (
                    <div key={item} className={`mockup-nav-item ${i===0?'mockup-nav-active':''}`}>{item}</div>
                  ))}
                </div>
                {/* Content */}
                <div className="mockup-content">
                  <div className="mockup-page-title">לוח בקרה</div>
                  <div className="mockup-cards">
                    {[
                      {label:'תקועים', val:'3', color:'#ef4444'},
                      {label:'ממתינים', val:'7', color:'#f59e0b'},
                      {label:'בבדיקה', val:'4', color:'#3b82f6'},
                      {label:'מוכנים', val:'2', color:'#22c55e'},
                    ].map(c => (
                      <div key={c.label} className="mockup-card" style={{borderColor:c.color+'40'}}>
                        <div className="mockup-card-val" style={{color:c.color}}>{c.val}</div>
                        <div className="mockup-card-label">{c.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mockup-table-header">
                    <span>לקוח</span><span>שירות</span><span>סטטוס</span><span>חסרים</span>
                  </div>
                  {[
                    {name:'כהן ושות\'', svc:'הנה"ח חודשית', status:'ממתין ללקוח', statusColor:'#f59e0b', missing:'2'},
                    {name:'מאפיית גרין', svc:'הנה"ח חודשית', status:'תקוע', statusColor:'#ef4444', missing:'5'},
                    {name:'TechStart', svc:'דיווח מע"מ', status:'מוכן', statusColor:'#22c55e', missing:'—'},
                    {name:'מזרחי בנייה', svc:'דוח שנתי', status:'בבדיקה', statusColor:'#3b82f6', missing:'1'},
                  ].map(row => (
                    <div key={row.name} className="mockup-table-row">
                      <span className="mockup-row-name">{row.name}</span>
                      <span className="mockup-row-svc">{row.svc}</span>
                      <span className="mockup-status-badge" style={{color:row.statusColor, background:row.statusColor+'15'}}>{row.status}</span>
                      <span className="mockup-row-missing" style={{color: row.missing==='—'?'#475569':'#ef4444'}}>{row.missing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="landing-container stats-grid">
          {[
            {num:'30 שנייה', label:'להקמת תיק חדש עם צ\'קליסט מלא'},
            {num:'0 מסמכים', label:'שנשכחים בין ווטסאפ ואימייל'},
            {num:'100%', label:'שקיפות על סטטוס כל תיק בכל רגע'},
          ].map(s => (
            <div key={s.num} className="stat-item">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem → Solution ── */}
      <section className="landing-section">
        <div className="landing-container">
          <div className="section-eyebrow">הבעיה שאנחנו פותרים</div>
          <h2 className="section-title">ניהול תיקים לפני AccountingOps</h2>
          <div className="vs-grid">
            <div className="vs-card vs-bad">
              <div className="vs-card-title">
                <span className="vs-icon vs-icon-bad">✕</span>
                הכאוס של היום
              </div>
              <ul className="vs-list">
                {[
                  'מסמכים שנשלחו בווטסאפ ונעלמו',
                  'אקסל שאף אחד לא מעדכן',
                  'לא ברור מה חסר ואצל מי',
                  'כל בוקר מתחיל בסיבוב שאלות',
                  'לקוח שואל — אין תשובה מיידית',
                ].map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="vs-divider" aria-hidden="true">
              <div className="vs-arrow">←</div>
            </div>
            <div className="vs-card vs-good">
              <div className="vs-card-title">
                <span className="vs-icon vs-icon-good">✓</span>
                עם AccountingOps
              </div>
              <ul className="vs-list">
                {[
                  'צ\'קליסט אוטומטי נפתח עם כל תיק',
                  'סטטוס כל תיק גלוי בשניה',
                  'ברור בדיוק מה חסר ומי אחראי',
                  'הבוקר מתחיל עם לוח בקרה ברור',
                  'תשובה ללקוח בשלוש שניות',
                ].map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing-section features-section">
        <div className="landing-container">
          <div className="section-eyebrow">יכולות</div>
          <h2 className="section-title">כל מה שצריך, שום דבר מיותר</h2>
          <div className="features-grid">
            {[
              {
                icon: '📋',
                title: 'צ\'קליסט אוטומטי',
                desc: 'פתח תיק ובחר סוג שירות — המערכת מייצרת אוטומטית את רשימת המסמכים הנדרשים. מעולם לא שכחתם שום דבר.',
              },
              {
                icon: '🔴',
                title: 'זיהוי תקיעות מיידי',
                desc: 'תיקים תקועים בולטים אוטומטית. בלחיצה אחת ראה מה חסר, כמה ימים עבר, ומה צריך לעשות.',
              },
              {
                icon: '📝',
                title: 'יומן פעילות חכם',
                desc: 'כל שינוי סטטוס, כל מסמך שהתקבל, כל הערה פנימית — הכל מתועד אוטומטית עם תאריך ושעה.',
              },
              {
                icon: '⚡',
                title: 'עדכון בזמן אמת',
                desc: 'שנה סטטוס של מסמך — כל הצוות רואה מיד. אין יותר "לא ידעתי שזה כבר הגיע".',
              },
              {
                icon: '🔍',
                title: 'חיפוש בשניה',
                desc: 'כל תיק של כל לקוח בכל תקופה — נגיש מיד. מסננים לפי סטטוס, שירות, תקופה.',
              },
              {
                icon: '🔒',
                title: 'אבטחה ברמה גבוהה',
                desc: 'נתוני לקוחות מוגנים עם הצפנה מלאה, אימות דו-שלבי, וגישה מאובטחת בלבד.',
              },
            ].map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="landing-section">
        <div className="landing-container">
          <div className="section-eyebrow">איך זה עובד</div>
          <h2 className="section-title">שלושה צעדים לסדר מוחלט</h2>
          <div className="steps-grid">
            {[
              {n:'01', title:'פתח תיק', desc:'בחר לקוח, סוג שירות ותקופה. הצ\'קליסט נוצר אוטומטית תוך שניות.'},
              {n:'02', title:'עקוב אחר ההתקדמות', desc:'סמן מסמכים שהתקבלו, שנה סטטוסים, הוסף הערות. הכל במקום אחד.'},
              {n:'03', title:'הגש בלחיצה אחת', desc:'כשהכל מוכן — שנה ל"מוכן להגשה" ותיק נעלם מהתור. פשוט כך.'},
            ].map(s => (
              <div key={s.n} className="step-card">
                <div className="step-number">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="landing-container cta-inner">
          <div className="cta-glow" aria-hidden="true" />
          <div className="section-eyebrow cta-eyebrow">מוכנים להתחיל?</div>
          <h2 className="cta-title">תפסיקו לנהל בספירלות.<br />תתחילו לנהל בשליטה.</h2>
          <p className="cta-sub">הצטרפו לפירמות שכבר עבדו לסדר. בחינם לחלוטין.</p>
          <Link href="/auth/register" className="btn-primary btn-primary-lg">
            התחל בחינם עכשיו
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="landing-container footer-inner">
          <span className="landing-logo footer-logo">AccountingOps</span>
          <span className="footer-copy">© 2026 AccountingOps. כל הזכויות שמורות.</span>
        </div>
      </footer>

    </div>
  )
}
