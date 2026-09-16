import { useMemo, useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Overview', icon: '◒', description: 'Your study snapshot and next steps.' },
  { label: 'Courses', icon: '▦', description: 'Eight pathways from first principles to fluency.' },
  { label: 'Practice', icon: '◇', description: 'Focused questions with instant feedback.' },
  { label: 'Progress', icon: '↗', description: 'See your momentum across every unit.' },
  { label: 'Resources', icon: '↗', description: 'Books, references, videos, and tools.' },
]

const courses = [
  { id: 'algebra', title: 'Algebra', short: 'ALG', color: 'coral', description: 'Expressions, equations, functions, and the structures behind them.', units: [
    { name: 'Foundations', topics: 'number sense · expressions · linear equations', lesson: 'Solve and simplify with confidence', detail: 'Translate words into symbols, use order of operations, simplify like terms, and solve one- and two-step equations.' },
    { name: 'Functions', topics: 'graphs · quadratics · polynomials', lesson: 'Read the language of change', detail: 'Work with domain, range, notation, transformations, factoring, roots, and the geometry of quadratic graphs.' },
    { name: 'Advanced structures', topics: 'systems · sequences · proof', lesson: 'Model patterns and relationships', detail: 'Solve systems, reason with inequalities, recognize sequences, and build short algebraic proofs.' },
  ] },
  { id: 'trigonometry', title: 'Trigonometry', short: 'TRI', color: 'lilac', description: 'Angles, triangles, waves, identities, and the unit circle.', units: [
    { name: 'Foundations', topics: 'right triangles · radians · unit circle', lesson: 'Build an angle intuition', detail: 'Connect degrees and radians, use sine/cosine/tangent, and locate exact values on the unit circle.' },
    { name: 'Identities', topics: 'compound angles · double angles · equations', lesson: 'Transform expressions cleanly', detail: 'Prove and apply Pythagorean, reciprocal, cofunction, sum, difference, and double-angle identities.' },
    { name: 'Applications', topics: 'waves · inverse functions · laws', lesson: 'Model periodic phenomena', detail: 'Solve oblique triangles and interpret amplitude, period, phase shift, and inverse trigonometric functions.' },
  ] },
  { id: 'geometry', title: 'Analytical Geometry', short: 'GEO', color: 'mint', description: 'Coordinate methods for lines, conics, distance, and space.', units: [
    { name: 'Foundations', topics: 'coordinates · lines · distance', lesson: 'See geometry algebraically', detail: 'Use slope, midpoint, distance, equations of lines, and intersections to solve geometric problems.' },
    { name: 'Conics', topics: 'circles · parabolas · ellipses', lesson: 'Recognize geometric families', detail: 'Complete the square and interpret focus, directrix, radius, axes, and eccentricity.' },
    { name: 'Space', topics: '3D coordinates · planes · loci', lesson: 'Reason in three dimensions', detail: 'Extend vectors and equations to space, including planes, spheres, and geometric loci.' },
  ] },
  { id: 'vectors', title: 'Vectors', short: 'VEC', color: 'gold', description: 'Magnitude, direction, products, and geometric transformations.', units: [
    { name: 'Foundations', topics: 'components · magnitude · direction', lesson: 'Move with coordinates', detail: 'Represent vectors, add and scale them, find magnitude, and resolve motion into components.' },
    { name: 'Products', topics: 'dot product · projection · angles', lesson: 'Measure alignment', detail: 'Use the dot product for work, orthogonality, projection, and the angle between vectors.' },
    { name: 'Advanced', topics: 'cross product · lines · planes', lesson: 'Model space and motion', detail: 'Use cross products, parametric equations, determinants, and vector equations of planes.' },
  ] },
  { id: 'statistics', title: 'Statistics & Probability', short: 'STA', color: 'blue', description: 'Data, uncertainty, distributions, and evidence-based decisions.', units: [
    { name: 'Foundations', topics: 'data · charts · averages', lesson: 'Describe what data says', detail: 'Distinguish populations and samples, choose displays, and interpret mean, median, spread, and outliers.' },
    { name: 'Probability', topics: 'counting · conditional probability · Bayes', lesson: 'Quantify uncertainty', detail: 'Build sample spaces, use permutations and combinations, conditional probability, and independence.' },
    { name: 'Inference', topics: 'distributions · confidence · testing', lesson: 'Make decisions from samples', detail: 'Understand normal models, sampling distributions, confidence intervals, correlation, and hypothesis tests.' },
  ] },
  { id: 'calculus', title: 'Calculus', short: 'CAL', color: 'indigo', description: 'Limits, derivatives, integrals, and the mathematics of change.', units: [
    { name: 'Foundations', topics: 'limits · continuity · rates', lesson: 'Approach change precisely', detail: 'Understand limits graphically and algebraically, continuity, average rate, and the derivative as a local rate.' },
    { name: 'Differentiation', topics: 'rules · applications · optimization', lesson: 'Control instantaneous change', detail: 'Apply product, quotient, chain, and implicit rules to motion, related rates, curve sketching, and optimization.' },
    { name: 'Integration', topics: 'area · techniques · differential equations', lesson: 'Accumulate what changes', detail: 'Connect derivatives and integrals, find areas and volumes, use substitution, and model simple differential equations.' },
  ] },
  { id: 'economics', title: 'Economics', short: 'ECO', color: 'sage', description: 'Choices, incentives, markets, growth, and policy.', units: [
    { name: 'Foundations', topics: 'scarcity · opportunity cost · demand', lesson: 'Model choices and trade-offs', detail: 'Use production possibilities, marginal analysis, demand, supply, equilibrium, and elasticity.' },
    { name: 'Markets', topics: 'firms · competition · externalities', lesson: 'Read market structures', detail: 'Compare costs and revenue, understand competition and monopoly, and evaluate taxes, subsidies, and externalities.' },
    { name: 'Macro', topics: 'GDP · inflation · unemployment', lesson: 'See the whole economy', detail: 'Interpret national accounts, business cycles, aggregate demand, fiscal and monetary policy, and growth.' },
  ] },
  { id: 'finance', title: 'Finance', short: 'FIN', color: 'plum', description: 'Interest, cash flow, risk, investing, and financial decisions.', units: [
    { name: 'Foundations', topics: 'percentages · interest · inflation', lesson: 'Make money measurable', detail: 'Convert rates, compare simple and compound interest, discount future value, and account for inflation.' },
    { name: 'Cash flow', topics: 'annuities · loans · amortization', lesson: 'Plan over time', detail: 'Calculate present and future value for annuities, repayments, sinking funds, and amortization schedules.' },
    { name: 'Risk & return', topics: 'bonds · portfolios · decisions', lesson: 'Balance uncertainty and reward', detail: 'Read bond prices, diversification, expected return, risk measures, and the time value of money.' },
  ] },
]

const questionBank = [
  { id: 1, course: 'Algebra', level: 'Beginner', prompt: 'Solve: 3x + 7 = 22', answer: '5', explanation: 'Subtract 7, then divide by 3: x = 15 / 3 = 5.' },
  { id: 2, course: 'Algebra', level: 'Intermediate', prompt: 'What is the vertex of y = (x - 2)² + 3?', answer: '(2, 3)', explanation: 'The vertex form y = (x - h)² + k gives the vertex (h, k).' },
  { id: 3, course: 'Trigonometry', level: 'Beginner', prompt: 'What is sin(30°)?', answer: '1/2', explanation: 'The unit circle and the 30-60-90 triangle give sin(30°) = 1/2.' },
  { id: 4, course: 'Analytical Geometry', level: 'Intermediate', prompt: 'Find the slope through (1, 2) and (5, 10).', answer: '2', explanation: 'Slope = (10 - 2) / (5 - 1) = 8 / 4 = 2.' },
  { id: 5, course: 'Vectors', level: 'Intermediate', prompt: 'What is the dot product of (2, 1) and (3, 4)?', answer: '10', explanation: 'Multiply matching components and add: 2(3) + 1(4) = 10.' },
  { id: 6, course: 'Statistics & Probability', level: 'Beginner', prompt: 'A fair coin is tossed once. What is P(heads)?', answer: '1/2', explanation: 'There are two equally likely outcomes and one favorable outcome.' },
  { id: 7, course: 'Calculus', level: 'Intermediate', prompt: 'What is the derivative of x³?', answer: '3x²', explanation: 'The power rule gives d(xⁿ)/dx = nxⁿ⁻¹.' },
  { id: 8, course: 'Economics', level: 'Beginner', prompt: 'What is the value of the next best alternative forgone?', answer: 'opportunity cost', explanation: 'Opportunity cost is the benefit sacrificed when choosing an option.' },
  { id: 9, course: 'Finance', level: 'Intermediate', prompt: 'At 5% simple interest, what is the interest on $1,000 for 2 years?', answer: '$100', explanation: 'I = Prt = 1000 × 0.05 × 2 = 100.' },
]

const resources = [
  { type: 'Reference', title: 'Mathematics · Wikipedia', meta: 'Broad overview and links across every branch', url: 'https://en.wikipedia.org/wiki/Mathematics' },
  { type: 'Reference', title: 'OpenStax textbooks', meta: 'Free Algebra, Precalculus, Statistics, and Calculus books', url: 'https://openstax.org/subjects/math' },
  { type: 'Course', title: 'Khan Academy Math', meta: 'Guided practice from arithmetic to calculus', url: 'https://www.khanacademy.org/math' },
  { type: 'Course', title: 'MIT OpenCourseWare', meta: 'University lectures, problem sets, and exams', url: 'https://ocw.mit.edu/search/?d=Mathematics' },
  { type: 'Tool', title: 'Desmos Graphing Calculator', meta: 'Explore functions, data, and geometry visually', url: 'https://www.desmos.com/calculator' },
  { type: 'Reference', title: 'NIST Digital Library of Mathematical Functions', meta: 'Authoritative special functions and formulas', url: 'https://dlmf.nist.gov/' },
  { type: 'PDF', title: 'Paul’s Online Math Notes', meta: 'Clear lecture notes and practice for calculus', url: 'https://tutorial.math.lamar.edu/' },
  { type: 'Reference', title: 'CORE Econ', meta: 'Free, modern economics learning resources', url: 'https://www.core-econ.org/' },
]

function ProgressBar({ value, compact = false }) {
  return <div className={`progress-track ${compact ? 'compact' : ''}`}><span style={{ width: `${value}%` }} /></div>
}

function CourseCard({ course, onOpen }) {
  return <button type="button" className="course-card" onClick={onOpen}><div className="course-card-top"><span className={`course-icon ${course.color}`}>{course.short}</span><span>{course.done}/3</span></div><h3>{course.title}</h3><p>{course.description}</p><ProgressBar compact value={(course.done / 3) * 100} /><small>{course.done === 0 ? 'Ready to begin' : `${Math.round((course.done / 3) * 100)}% explored`}</small></button>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(true)
  const [activePage, setActivePage] = useState('Overview')
  const [selectedCourse, setSelectedCourse] = useState('calculus')
  const [selectedLevel, setSelectedLevel] = useState('All levels')
  const [completedLessons, setCompletedLessons] = useState([])
  const [answered, setAnswered] = useState({})
  const [search, setSearch] = useState('')
  const [resourceFilter, setResourceFilter] = useState('All')

  const totalLessons = courses.length * 3
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100)
  const activeCourse = courses.find((course) => course.id === selectedCourse)
  const filteredQuestions = questionBank.filter((question) => {
    const matchesLevel = selectedLevel === 'All levels' || question.level === selectedLevel
    const query = search.toLowerCase()
    return matchesLevel && (!query || `${question.course} ${question.prompt}`.toLowerCase().includes(query))
  })
  const filteredResources = resources.filter((resource) => resourceFilter === 'All' || resource.type === resourceFilter)
  const masteryByCourse = useMemo(() => courses.map((course) => ({ ...course, done: completedLessons.filter((id) => id.startsWith(`${course.id}-`)).length })), [completedLessons])
  const goTo = (page) => setActivePage(page)
  const toggleLesson = (lessonId) => setCompletedLessons((current) => current.includes(lessonId) ? current.filter((id) => id !== lessonId) : [...current, lessonId])
  const answerQuestion = (question, value) => setAnswered((current) => ({ ...current, [question.id]: value.trim().toLowerCase() === question.answer.toLowerCase() ? 'correct' : 'retry' }))

  const renderOverview = () => <>
    <section className="hero-section"><div className="hero-copy"><span className="badge">Learning studio · {overallProgress}% complete</span><h1>Make the abstract feel inevitable.</h1><p>Eight mathematical pathways, explained from first principles and built toward confident problem solving.</p><div className="cta-row"><button type="button" className="primary-btn" onClick={() => goTo('Courses')}>Open curriculum <span>→</span></button><button type="button" className="secondary-btn" onClick={() => goTo('Practice')}>Try a practice set</button></div><div className="overview-progress"><div><strong>Overall progress</strong><span>{completedLessons.length} of {totalLessons} lessons</span></div><ProgressBar value={overallProgress} /></div></div><div className="hero-metrics"><div className="metric-card accent"><span>Current focus</span><strong>Limits & continuity</strong><small>Calculus · Intermediate</small></div><div className="metric-card"><span>Practice accuracy</span><strong>86%</strong><small>Across {Object.keys(answered).length} answered questions</small></div><div className="metric-card"><span>Study rhythm</span><strong>18 days</strong><small>Keep your chain moving</small></div></div></section>
    <section className="section-intro"><div><span className="eyebrow dark">Your map</span><h2>Choose a direction</h2></div><button type="button" className="text-btn" onClick={() => goTo('Courses')}>View all courses →</button></section>
    <section className="course-grid compact-grid">{masteryByCourse.slice(0, 4).map((course) => <CourseCard key={course.id} course={course} onOpen={() => { setSelectedCourse(course.id); goTo('Courses') }} />)}</section>
    <section className="dashboard-grid"><div className="panel"><div className="panel-header"><h3>Next best step</h3><span>12 min</span></div><div className="next-step"><div className="step-number">01</div><div><strong>Limits & continuity</strong><p>Build the idea of approaching a value before you apply the rules.</p><button type="button" className="text-btn" onClick={() => { setSelectedCourse('calculus'); goTo('Courses') }}>Continue lesson →</button></div></div></div><div className="panel"><div className="panel-header"><h3>Formula vault</h3><span>Quick recall</span></div><div className="formula-list"><div className="formula-pill">a² − b² = (a − b)(a + b)</div><div className="formula-pill">sin²θ + cos²θ = 1</div><div className="formula-pill">d(xⁿ)/dx = nxⁿ⁻¹</div><div className="formula-pill">A = P(1 + r/n)ⁿᵗ</div></div></div></section>
  </>

  const renderCourses = () => <section className="page-framework"><div className="page-heading"><span className="badge">Curriculum · 8 units</span><h1>Learn in layers.</h1><p>Start with intuition, add technique, then stretch into proof and application.</p></div><div className="course-layout"><div className="course-list">{courses.map((course) => <button type="button" key={course.id} className={`course-tab ${course.id === selectedCourse ? 'selected' : ''}`} onClick={() => setSelectedCourse(course.id)}><span className={`course-icon ${course.color}`}>{course.short}</span><span><strong>{course.title}</strong><small>{course.description}</small></span><b>{masteryByCourse.find((item) => item.id === course.id)?.done}/3</b></button>)}</div><div className="course-detail"><div className="detail-heading"><div><span className={`course-icon large ${activeCourse.color}`}>{activeCourse.short}</span><div><span className="eyebrow dark">{activeCourse.title}</span><h2>{activeCourse.description}</h2></div></div><span className="course-count">{masteryByCourse.find((item) => item.id === activeCourse.id)?.done}/3 complete</span></div><div className="level-summary"><span><strong>Beginner</strong> Build the language</span><span><strong>Intermediate</strong> Connect the ideas</span><span><strong>Advanced</strong> Transfer and prove</span></div><div className="unit-stack">{activeCourse.units.map((unit, index) => { const id = `${activeCourse.id}-${index}`; const done = completedLessons.includes(id); return <article className={`unit-card ${done ? 'complete' : ''}`} key={unit.name}><div className="unit-index">0{index + 1}</div><div className="unit-copy"><div className="unit-top"><span className="level-tag">{index === 0 ? 'Beginner' : index === 1 ? 'Intermediate' : 'Advanced'}</span>{done && <span className="done-tag">Completed</span>}</div><h3>{unit.name}: {unit.lesson}</h3><p>{unit.detail}</p><small>{unit.topics}</small></div><button type="button" className={done ? 'complete-btn checked' : 'complete-btn'} onClick={() => toggleLesson(id)} aria-label={`${done ? 'Mark incomplete' : 'Mark complete'} ${unit.name}`}>{done ? '✓' : '○'}</button></article> })}</div></div></div></section>

  const renderPractice = () => <section className="page-framework"><div className="page-heading practice-heading"><div><span className="badge">Practice lab · {filteredQuestions.length} sets</span><h1>Think, then check.</h1><p>Short questions across every unit. A wrong answer is a useful map, not a verdict.</p></div><div className="level-switcher">{['All levels', 'Beginner', 'Intermediate'].map((level) => <button type="button" key={level} className={selectedLevel === level ? 'active' : ''} onClick={() => setSelectedLevel(level)}>{level}</button>)}</div></div><div className="practice-grid">{filteredQuestions.map((question) => <article className="question-card" key={question.id}><div className="question-meta"><span>{question.course}</span><span>{question.level}</span></div><h3>{question.prompt}</h3><div className="answer-row"><input aria-label={`Answer for ${question.prompt}`} placeholder="Your answer" onKeyDown={(event) => { if (event.key === 'Enter') answerQuestion(question, event.currentTarget.value) }} /><button type="button" onClick={(event) => answerQuestion(question, event.currentTarget.previousElementSibling.value)}>Check</button></div>{answered[question.id] && <div className={`feedback ${answered[question.id]}`}><strong>{answered[question.id] === 'correct' ? 'Correct.' : 'Try once more.'}</strong> {answered[question.id] === 'correct' ? question.explanation : 'Look for the operation or definition that connects the quantities.'}</div>}</article>)}</div></section>

  const renderProgress = () => <section className="page-framework"><div className="page-heading"><span className="badge">Progress report</span><h1>Your proof of practice.</h1><p>Small completed lessons compound into a durable working knowledge.</p></div><div className="progress-hero panel"><div><span className="eyebrow dark">Total curriculum</span><strong>{overallProgress}%</strong><p>{completedLessons.length} lessons completed across {courses.length} mathematical units.</p></div><div className="big-progress"><ProgressBar value={overallProgress} /><span>Keep going: the next lesson is always close.</span></div></div><div className="progress-list">{masteryByCourse.map((course) => <div className="progress-row" key={course.id}><span className={`course-icon ${course.color}`}>{course.short}</span><div><strong>{course.title}</strong><ProgressBar compact value={Math.round((course.done / 3) * 100)} /></div><b>{Math.round((course.done / 3) * 100)}%</b></div>)}</div></section>

  const renderResources = () => <section className="page-framework"><div className="page-heading"><span className="badge">Resource shelf</span><h1>Good references, neatly kept.</h1><p>Go deeper with trusted explanations, open textbooks, visual tools, and complete courses.</p></div><div className="resource-filters">{['All', 'Reference', 'Course', 'Tool', 'PDF'].map((filter) => <button type="button" key={filter} className={resourceFilter === filter ? 'active' : ''} onClick={() => setResourceFilter(filter)}>{filter}</button>)}</div><div className="resource-grid">{filteredResources.map((resource) => <a className="resource-card" href={resource.url} target="_blank" rel="noreferrer" key={resource.title}><div className="resource-top"><span>{resource.type}</span><strong>↗</strong></div><h3>{resource.title}</h3><p>{resource.meta}</p></a>)}</div></section>

  const pageRenderer = { Overview: renderOverview, Courses: renderCourses, Practice: renderPractice, Progress: renderProgress, Resources: renderResources }
  return <div className="app-shell"><aside className={`sidebar ${menuOpen ? 'open' : 'collapsed'}`}><div className="brand-row"><div className="brand-mark">ε</div><div className="brand-copy"><span className="eyebrow">Study Lab</span><h2>EPSILON</h2></div></div><nav className="nav-stack" aria-label="Main navigation">{navItems.map((item) => <button key={item.label} type="button" className={item.label === activePage ? 'nav-item active' : 'nav-item'} title={item.label} onClick={() => goTo(item.label)}><span className="nav-dot">{item.icon}</span><span className="nav-label">{item.label}</span></button>)}</nav><div className="side-panel"><p className="side-label">Streak</p><div className="streak-row"><strong>18 days</strong><span>+4 this week</span></div><ProgressBar value={overallProgress} compact /></div></aside><main className="main-panel"><header className="topbar"><button type="button" className="menu-toggle" aria-label="Toggle navigation menu" onClick={() => setMenuOpen((value) => !value)}>☰</button><label className="searchbox"><span className="search-icon">⌕</span><input type="search" placeholder="Search concepts, courses, questions" aria-label="Search concepts" value={search} onChange={(event) => setSearch(event.target.value)} /></label><div className="profile-pill"><div className="avatar">AL</div><div><strong>Alicia</strong><small>Level 12</small></div></div></header>{pageRenderer[activePage]()}</main></div>
}

export default App
