'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Brain, CheckCircle2, Code2, Compass, Lightbulb, Sparkles, Target, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const sections = [
  { id: 'what', label: 'What LumaLearn is', icon: Sparkles },
  { id: 'features', label: 'Core features', icon: Lightbulb },
  { id: 'process', label: 'How it works', icon: Compass },
  { id: 'technology', label: 'Technology', icon: Code2 },
  { id: 'future', label: 'What comes next', icon: TrendingUp },
]

function Brand() {
  return <Link href="/" className="brand about-brand"><div className="brand-mark"><Sparkles /></div><span>Luma</span></Link>
}

export default function AboutPage() {
  const [dark, setDark] = useState(true)

  return (
    <div className={dark ? 'app-shell dark-mode about-shell' : 'app-shell about-shell'}>
      <aside className="sidebar about-sidebar">
        <Brand />
        <div className="sidebar-label">Explore</div>
        <nav className="side-nav" aria-label="About navigation">
          <Link href="/" className="nav-item"><ArrowLeft />Workspace</Link>
          {sections.map(({ id, label, icon: Icon }) => <a key={id} href={`#${id}`} className="nav-item about-nav-item"><Icon />{label}</a>)}
        </nav>
        <div className="sidebar-bottom"><div className="about-sidebar-note"><BookOpen /><p>A clearer way to make progress on the topics that matter to you.</p></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><Link href="/">Workspace</Link><span>/</span><strong>About LumaLearn</strong></div><div className="top-actions"><button className="icon-button" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? '☼' : '◐'}</button><div className="top-avatar">AM</div></div></header>
        <div className="content-wrap about-content">
          <section className="about-hero"><div><p className="eyebrow">The LumaLearn project <span className="status-dot" /></p><h1>Learning should feel <span>clearer.</span></h1><p className="about-lede">LumaLearn is a focused study workspace that turns a topic you want to understand into a structured, active learning session.</p><div className="about-actions"><Link href="/" className="generate-button">Start a learning session <ArrowLeft className="flip-icon" /></Link></div></div><div className="about-hero-card"><div className="about-orbit"><Sparkles /></div><strong>Learn with intention</strong><span>Understand the idea. Test your thinking. Keep moving.</span></div></section>

          <section className="about-section about-intro" id="what"><div className="about-section-label"><Target />01 / The idea</div><div><h2>Less noise. More understanding.</h2><p>Many study tools give learners more information without helping them build a mental model. LumaLearn solves that problem by creating a calm, guided path: start with an explanation, connect it to examples, practice the idea, then check what stuck.</p><p>The current experience is powered by a local, predefined educational content engine. That makes every lesson dependable, transparent, and available without an external AI service or payment method.</p></div></section>

          <section className="about-section" id="features"><div className="about-section-label"><Lightbulb />02 / Core features</div><div className="about-feature-grid"><article><span className="feature-number">01</span><h3>Structured lessons</h3><p>Clear explanations and key ideas give each topic a useful starting point.</p></article><article><span className="feature-number">02</span><h3>Worked examples</h3><p>See concepts in context before you try applying them yourself.</p></article><article><span className="feature-number">03</span><h3>Active practice</h3><p>Hints and answers support learning without giving away the thinking too early.</p></article><article><span className="feature-number">04</span><h3>Knowledge checks</h3><p>Multiple-choice questions provide instant grading and an explanation for every answer.</p></article></div></section>

          <section className="about-section process-section" id="process"><div className="about-section-label"><Compass />03 / The learning loop</div><div><h2>A simple path from curiosity to confidence.</h2><div className="process-list"><div><span>01</span><div><h3>Choose a topic</h3><p>Select a subject, name what you want to learn, and set the level and difficulty.</p></div></div><div><span>02</span><div><h3>Build your understanding</h3><p>Read the focused explanation, key ideas, and examples in one continuous workspace.</p></div></div><div><span>03</span><div><h3>Practice and reflect</h3><p>Work through prompts, reveal hints when needed, and take the knowledge check.</p></div></div><div><span>04</span><div><h3>Use the feedback</h3><p>Review your score, answer explanations, and concise summary to decide what to revisit.</p></div></div></div></div></section>

          <section className="about-section technology-section" id="technology"><div className="about-section-label"><Code2 />04 / Under the hood</div><div><h2>Built to be useful now and adaptable later.</h2><div className="tech-pills"><span><Code2 />Next.js</span><span><Brain />React</span><span><CheckCircle2 />TypeScript</span><span><Sparkles />Local content engine</span></div><p>LumaLearn uses a Next.js App Router interface with React and TypeScript. Lessons are selected and assembled on the server from versioned subject content, keeping the client responsive and the content behavior explicit.</p><p>The learning route is intentionally provider-agnostic. A future secure server-side adapter can connect a real AI provider without changing the learning interface or exposing credentials in the browser.</p></div></section>

          <section className="about-section future-section" id="future"><div className="about-section-label"><TrendingUp />05 / The roadmap</div><div><h2>The foundation is local. The direction is personal.</h2><p>Future improvements can build on this core without compromising the clarity of the current experience.</p><div className="future-list"><span><CheckCircle2 />More subjects and deeper curriculum paths</span><span><CheckCircle2 />Saved sessions and progress history</span><span><CheckCircle2 />Personalized review recommendations</span><span><CheckCircle2 />Optional provider-backed explanations through a secure server integration</span></div></div></section>

          <footer className="about-footer"><div><div className="brand about-footer-brand"><div className="brand-mark"><Sparkles /></div><span>Luma</span></div><p>A focused learning workspace for making progress one topic at a time.</p></div><Link href="/" className="secondary-button">Back to workspace <ArrowLeft className="flip-icon" /></Link></footer>
        </div>
      </main>
    </div>
  )
}
