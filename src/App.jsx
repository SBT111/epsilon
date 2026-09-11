import { useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Overview', description: 'Your study snapshot and next steps.' },
  { label: 'Courses', description: 'Browse your learning paths and lessons.' },
  { label: 'Practice', description: 'Sharpen your skills with focused drills.' },
  { label: 'Progress', description: 'Track mastery, streaks, and milestones.' },
  { label: 'Resources', description: 'Keep useful references close at hand.' },
]

const focusTasks = [
  'Review quadratic identities',
  'Complete 12 calculus drills',
  'Summarize geometric proofs',
]

const formulaList = [
  'a² - b² = (a - b)(a + b)',
  'sin²θ + cos²θ = 1',
  'v = s / t',
  'A = πr²',
]

const quickNotes = [
  'Focus on factoring patterns before solving.',
  'Use substitution in systems with matching coefficients.',
  'Remember the derivative of eˣ is itself.',
]

function App() {
  const [menuOpen, setMenuOpen] = useState(true)
  const [activePage, setActivePage] = useState('Overview')

  const pageContent = navItems.find((item) => item.label === activePage)

  const renderPageFramework = () => {
    if (activePage === 'Overview') {
      return (
        <>
          <section className="hero-section">
            <div className="hero-copy">
              <span className="badge">Spring sprint • 72% mastery</span>
              <h1>Deep focus for your next math breakthrough.</h1>
              <p>Build speed, sharpen reasoning, and lock in the formulas that matter.</p>

              <div className="cta-row">
                <button type="button" className="primary-btn">Resume lesson</button>
                <button type="button" className="secondary-btn" onClick={() => setActivePage('Practice')}>Practice set</button>
              </div>
            </div>

            <div className="hero-metrics">
              <div className="metric-card accent"><span>Accuracy</span><strong>89%</strong></div>
              <div className="metric-card"><span>Session</span><strong>42 min</strong></div>
              <div className="metric-card"><span>Milestone</span><strong>3/5</strong></div>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="panel">
              <div className="panel-header"><h3>Today&apos;s focus</h3><span>3 tasks</span></div>
              <ul className="task-list">
                {focusTasks.map((task, index) => <li key={task} className={index === 0 ? 'done' : ''}><span className="list-bullet" aria-hidden="true" />{task}</li>)}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header"><h3>Formula vault</h3><span>Quick recall</span></div>
              <div className="formula-list">{formulaList.map((formula) => <div key={formula} className="formula-pill">{formula}</div>)}</div>
            </div>
          </section>

          <section className="bottom-row">
            <div className="panel challenge-card">
              <div className="panel-header"><h3>Current challenge</h3><span>Algebra</span></div>
              <div className="problem-box">
                <p>Solve for x: 3x + 7 = 22</p>
                <div className="answer-row"><input type="text" placeholder="Type your answer" aria-label="Solve algebra question" /><button type="button">Check</button></div>
              </div>
            </div>

            <div className="panel notes-card">
              <div className="panel-header"><h3>Quick notes</h3><span>Study cues</span></div>
              <ul className="notes-list">{quickNotes.map((note) => <li key={note}>{note}</li>)}</ul>
            </div>
          </section>
        </>
      )
    }

    return (
      <section className="page-framework">
        <div className="page-heading">
          <span className="badge">Workspace</span>
          <h1>{activePage}</h1>
          <p>{pageContent.description}</p>
        </div>
        <div className="framework-grid">
          <div className="panel framework-panel"><span className="skeleton-line short" /><span className="skeleton-line" /><span className="skeleton-line" /></div>
          <div className="panel framework-panel"><span className="skeleton-line short" /><span className="skeleton-line" /><span className="skeleton-line" /></div>
          <div className="panel framework-panel wide"><span className="skeleton-line short" /><span className="skeleton-line" /><span className="skeleton-line" /></div>
        </div>
      </section>
    )
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : 'collapsed'}`}>
        <div className="brand-row">
          <div className="brand-mark">ε</div>
          <div className="brand-copy">
            <span className="eyebrow">Study Lab</span>
            <h2>EPSILON</h2>
          </div>
        </div>

        <nav className="nav-stack" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={item.label === activePage ? 'nav-item active' : 'nav-item'}
              title={item.label}
              aria-label={item.label}
              onClick={() => setActivePage(item.label)}
            >
              <span className="nav-dot" aria-hidden="true" />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="side-panel">
          <p className="side-label">Streak</p>
          <div className="streak-row">
            <strong>18 days</strong>
            <span>+4 this week</span>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            ☰
          </button>

          <label className="searchbox">
            <span className="search-icon">⌕</span>
            <input type="search" placeholder="Search concepts" aria-label="Search concepts" />
          </label>

          <div className="profile-pill">
            <div className="avatar">AL</div>
            <div>
              <strong>Alicia</strong>
              <small>Level 12</small>
            </div>
          </div>
        </header>

        {renderPageFramework()}
      </main>
    </div>
  )
}

export default App
