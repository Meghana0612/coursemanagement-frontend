import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiBook, FiUsers, FiAward, FiTrendingUp,
  FiCode, FiCloud, FiDatabase, FiSmartphone, FiLayers
} from 'react-icons/fi'
import courseService from '../services/courseService'
import CourseCard from '../components/CourseCard'

const STATS = [
  { icon: <FiBook />,      value: '200+',  label: 'Courses' },
  { icon: <FiUsers />,     value: '50K+',  label: 'Students' },
  { icon: <FiAward />,     value: '98%',   label: 'Satisfaction' },
  { icon: <FiTrendingUp />,value: '40+',   label: 'Instructors' },
]

const CATEGORY_ICONS = {
  Backend:      <FiCode />,
  Frontend:     <FiLayers />,
  DevOps:       <FiCloud />,
  'Data Science': <FiTrendingUp />,
  Cloud:        <FiCloud />,
  Mobile:       <FiSmartphone />,
  Database:     <FiDatabase />,
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    courseService.getAll()
      .then(({ data }) => {
        setFeatured(data.slice(0, 3))
        const cats = [...new Set(data.map(c => c.category))].slice(0, 6)
        setCategories(cats)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home page-wrapper">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__glow" />
        <div className="container hero__content">
          <div className="hero__eyebrow fade-up">
            <span>🎓</span> The next-generation learning platform
          </div>
          <h1 className="hero__title fade-up delay-1">
            Learn skills that<br />
            <span className="hero__title-accent">shape your future</span>
          </h1>
          <p className="hero__sub fade-up delay-2">
            Explore expert-led courses in development, cloud, data science, and beyond.
            Start learning today — no experience required.
          </p>
          <div className="hero__ctas fade-up delay-3">
            <Link to="/courses" className="btn btn-primary btn-lg">
              Browse Courses <FiArrowRight />
            </Link>
            <Link to="/courses/add" className="btn btn-secondary btn-lg">
              Add a Course
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats fade-up delay-4">
            {STATS.map(({ icon, value, label }) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-icon">{icon}</span>
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="container section">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <Link to="/courses" className="btn btn-ghost">View all <FiArrowRight /></Link>
        </div>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <Link
              key={cat}
              to={`/courses?category=${encodeURIComponent(cat)}`}
              className={`category-chip fade-up delay-${(i % 5) + 1}`}
            >
              <span className="category-chip__icon">
                {CATEGORY_ICONS[cat] || <FiBook />}
              </span>
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="container section">
        <div className="section-header">
          <h2>Featured Courses</h2>
          <Link to="/courses" className="btn btn-ghost">See all <FiArrowRight /></Link>
        </div>
        {loading ? (
          <div className="loader-wrap"><div className="spinner" /><span>Loading…</span></div>
        ) : (
          <div className="courses-grid">
            {featured.map((course, i) => (
              <div key={course.id} className={`fade-up delay-${i + 1}`}>
                <CourseCard
                  course={course}
                  onDelete={id => setFeatured(f => f.filter(c => c.id !== id))}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA Banner ── */}
      <section className="container section">
        <div className="cta-banner fade-up">
          <div>
            <h2 className="cta-banner__title">Ready to share your knowledge?</h2>
            <p className="cta-banner__sub">Create a course and reach thousands of eager learners.</p>
          </div>
          <Link to="/courses/add" className="btn btn-primary btn-lg">
            Create Course <FiArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        /* Hero */
        .hero { position: relative; padding: 60px 0 80px; overflow: hidden; }
        .hero__glow {
          position: absolute;
          top: -120px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse at center, rgba(124,106,255,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero__content { position: relative; text-align: center; }
        .hero__eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,106,255,0.1);
          border: 1px solid rgba(124,106,255,0.25);
          border-radius: 99px;
          padding: 6px 16px;
          font-size: 0.84rem;
          color: var(--accent-lt);
          margin-bottom: 28px;
        }
        .hero__title {
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          letter-spacing: -0.04em;
          line-height: 1.08;
          margin-bottom: 22px;
        }
        .hero__title-accent {
          background: linear-gradient(135deg, var(--accent-lt) 0%, var(--teal) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero__sub {
          font-size: 1.1rem;
          color: var(--ink-muted);
          max-width: 520px;
          margin: 0 auto 36px;
          line-height: 1.7;
        }
        .hero__ctas { display: flex; gap: 14px; justify-content: center; margin-bottom: 56px; flex-wrap: wrap; }
        .hero__stats {
          display: flex; gap: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          max-width: 600px;
          margin: 0 auto;
        }
        .hero__stat {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          padding: 20px 16px;
          border-right: 1px solid var(--border);
          gap: 4px;
        }
        .hero__stat:last-child { border-right: none; }
        .hero__stat-icon { color: var(--accent); font-size: 1.1rem; }
        .hero__stat-value { font-family: var(--font-head); font-size: 1.4rem; font-weight: 800; }
        .hero__stat-label { font-size: 0.75rem; color: var(--ink-muted); text-transform: uppercase; letter-spacing: 0.05em; }

        /* Section */
        .section { padding: 56px 0; }
        .section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px;
        }
        .section-header h2 { font-size: 1.6rem; letter-spacing: -0.03em; }

        /* Categories */
        .category-grid { display: flex; flex-wrap: wrap; gap: 12px; }
        .category-chip {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 10px 18px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--ink-muted);
          transition: all var(--transition);
        }
        .category-chip:hover {
          border-color: var(--accent);
          color: var(--accent-lt);
          background: rgba(124,106,255,0.08);
          transform: translateY(-2px);
        }
        .category-chip__icon { color: var(--accent); }

        /* CTA Banner */
        .cta-banner {
          background: linear-gradient(135deg, rgba(124,106,255,0.12) 0%, rgba(30,240,208,0.06) 100%);
          border: 1px solid rgba(124,106,255,0.25);
          border-radius: var(--radius-xl);
          padding: 44px 48px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
        }
        .cta-banner__title { font-size: 1.6rem; letter-spacing: -0.03em; margin-bottom: 8px; }
        .cta-banner__sub { color: var(--ink-muted); font-size: 0.95rem; }
      `}</style>
    </div>
  )
}
