'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Menu,
  Moon,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Target,
  X,
  Zap,
} from 'lucide-react'

const subjects = [
  { name: 'Mathematics', detail: 'Algebra, calculus & more', icon: '∑', color: 'violet' },
  { name: 'Physics', detail: 'Forces, energy & motion', icon: '◉', color: 'blue' },
  { name: 'Biology', detail: 'Life, cells & systems', icon: '⌁', color: 'green' },
  { name: 'History', detail: 'People, places & time', icon: '✦', color: 'amber' },
]

const activities = [
  { title: 'Quadratic Equations', subject: 'Mathematics', score: '92%', time: 'Today', color: 'violet' },
  { title: 'Newton’s Laws of Motion', subject: 'Physics', score: '84%', time: 'Yesterday', color: 'blue' },
  { title: 'Cellular Respiration', subject: 'Biology', score: '76%', time: 'May 18', color: 'green' },
]

function Brand() {
  return <div className="brand"><div className="brand-mark"><Sparkles /></div><span>Luma</span></div>
}

function Sidebar({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  const nav = [
    { label: 'Workspace', icon: LayoutDashboard },
    { label: 'My progress', icon: BarChart3 },
    { label: 'Saved topics', icon: BookOpen },
  ]
  return <aside className="sidebar">
    <Brand />
    <div className="sidebar-label">Learn</div>
    <nav className="side-nav" aria-label="Main navigation">
      {nav.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label)}><Icon />{label}</button>)}
    </nav>
    <div className="sidebar-label">Your space</div>
    <nav className="side-nav">
      <button className="nav-item"><Target />Learning goals</button>
      <button className="nav-item"><Settings />Settings</button>
    </nav>
    <div className="sidebar-bottom">
      <div className="upgrade-card"><div className="upgrade-icon"><Zap /></div><p>Make every study session count.</p><button onClick={() => setActive('My progress')}>View progress <ArrowRight /></button></div>
      <div className="user-row"><div className="avatar">AM</div><div><strong>Alex Morgan</strong><span>Student account</span></div><MoreHorizontal className="more" /></div>
    </div>
  </aside>
}

function SelectPill({ label, value, onClick }: { label: string; value: string; onClick: () => void }) {
  return <button className="select-pill" onClick={onClick}><span className="pill-label">{label}</span><strong>{value}</strong><ChevronDown /></button>
}

export default function Page() {
  const [active, setActive] = useState('Workspace')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [subject, setSubject] = useState('Mathematics')
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('University')
  const [difficulty, setDifficulty] = useState('Balanced')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState('Overview')

  function generate() {
    if (!topic.trim()) return
    setStatus('loading')
    window.setTimeout(() => setStatus('error'), 900)
  }

  return <div className={dark ? 'app-shell dark-mode' : 'app-shell'}>
    <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu /></button>
    {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)}><div className="mobile-drawer" onClick={(e) => e.stopPropagation()}><button className="drawer-close" onClick={() => setMobileOpen(false)}><X /></button><Sidebar active={active} setActive={(value) => { setActive(value); setMobileOpen(false) }} /></div></div>}
    <Sidebar active={active} setActive={setActive} />
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{active}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Search /></button><button className="icon-button" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button><div className="top-avatar">AM</div></div></header>
      <div className="content-wrap">
        <section className="hero"><div><p className="eyebrow">Tuesday, May 21, 2024 <span className="status-dot" /></p><h1>Good morning, Alex<span>.</span></h1><p className="hero-copy">What would you like to understand today?</p></div><div className="streak"><div className="streak-icon"><Zap /></div><div><strong>7 day streak</strong><span>Keep your momentum going</span></div></div></section>
        <section className="setup-card"><div className="setup-head"><div><div className="section-kicker"><Sparkles /> Learn something new</div><h2>Build your learning session</h2><p>Tell us what you’re working on and we’ll create a focused path for you.</p></div><div className="step-count"><span>01</span><div /><span>02</span><div /><span>03</span></div></div>
          <div className="subject-grid">{subjects.map((item) => <button key={item.name} className={`subject-card ${subject === item.name ? 'selected' : ''} ${item.color}`} onClick={() => setSubject(item.name)}><span className="subject-symbol">{item.icon}</span><span><strong>{item.name}</strong><small>{item.detail}</small></span>{subject === item.name && <span className="check"><Check /></span>}</button>)}</div>
          <div className="session-controls"><label className="topic-field"><span>What are you studying?</span><div className="input-wrap"><Lightbulb /><input value={topic} onChange={(e) => { setTopic(e.target.value); setStatus('idle') }} placeholder="e.g. Integration by parts" onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) generate() }} /><span className="optional">Optional</span></div></label><div className="select-group"><SelectPill label="Academic level" value={level} onClick={() => setLevel(level === 'University' ? 'High school' : 'University')} /><SelectPill label="Difficulty" value={difficulty} onClick={() => setDifficulty(difficulty === 'Balanced' ? 'Challenge' : 'Balanced')} /></div></div>
          <div className="setup-footer"><span className="ai-note"><CircleHelp /> Luma adapts to your answers as you learn.</span><button className="generate-button" onClick={generate} disabled={!topic.trim() || status === 'loading'}>{status === 'loading' ? 'Preparing session...' : 'Start learning'}<ArrowRight /></button></div>
          {status === 'error' && <div className="error-state"><CircleHelp /><span><strong>AI connection needed.</strong> Your session is ready, but an AI provider/API route needs to be connected before Luma can generate explanations.</span><button onClick={() => setStatus('idle')}>Dismiss</button></div>}
        </section>
        <section className="dashboard-section"><div className="section-title-row"><div><p className="eyebrow">Your learning space</p><h2>Keep making progress</h2></div><div className="tabs" role="tablist">{['Overview', 'Recent activity'].map(tab => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div></div><div className="stats-grid"><div className="stat-card stat-highlight"><div className="stat-icon"><Target /></div><span>Learning goal</span><strong>14 <small>/ 20 hrs</small></strong><div className="progress-track"><div style={{ width: '70%' }} /></div><p>6 hours left this week <ArrowRight /></p></div><div className="stat-card"><div className="stat-icon purple"><GraduationCap /></div><span>Topics mastered</span><strong>18</strong><p className="muted">+4 this month <span className="positive">↗ 28%</span></p></div><div className="stat-card"><div className="stat-icon orange"><Clock3 /></div><span>Study time</span><strong>6h 42m</strong><p className="muted">This week <span className="positive">↗ 12%</span></p></div></div>
          <div className="activity-header"><h3>Recent activity</h3><button onClick={() => setActive('My progress')}>View all <ArrowRight /></button></div><div className="activity-list">{activities.map(item => <div className="activity-row" key={item.title}><div className={`activity-icon ${item.color}`}>{item.color === 'violet' ? <FileText /> : <Play />}</div><div className="activity-name"><strong>{item.title}</strong><span>{item.subject}</span></div><div className="activity-score"><strong>{item.score}</strong><span>Quiz score</span></div><span className="activity-time">{item.time}</span><MoreHorizontal /></div>)}</div></section>
      </div>
    </main>
  </div>
}
