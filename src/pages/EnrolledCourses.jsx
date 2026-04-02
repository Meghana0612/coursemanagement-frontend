import React from "react";
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiBookOpen, FiClock, FiAward, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import courseService from '../services/courseService'

const ENROLLED_KEY = 'coursehub_enrolled'

const getEnrolled = () => {
  try { return JSON.parse(localStorage.getItem(ENROLLED_KEY) || '[]') } catch { return [] }
}
const saveEnrolled = (ids) => localStorage.setItem(ENROLLED_KEY, JSON.stringify(ids))

export default function EnrolledCourses() {
  const [courses,  setCourses]  = useState([])
  const [enrolled, setEnrolled] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const ids = getEnrolled()
    setEnrolled(ids)
    courseService.getAll()
      .then(({ data }) => {
        if (ids.length) setCourses(data.filter(c => ids.includes(c.id)))
        else setCourses([])
      })
      .finally(() => setLoading(false))
  }, [])

  const unenroll = (id) => {
    const next = enrolled.filter(x => x !== id)
    setEnrolled(next)
    saveEnrolled(next)
    setCourses(c => c.filter(x => x.id !== id))
  }

  const totalHours   = courses.reduce((s, c) => s + (c.durationHours || 0), 0)
  const totalCourses = courses.length

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-header fade-up">
          <h1>My Learning</h1>
          <p>Track your progress and continue where you left off.</p>
        </div>

        {/* Stats strip */}
        {courses.length > 0 && (
          <div className="enrolled-stats fade-up delay-1">
            <div className="enrolled-stat">
              <FiBookOpen />
              <span><strong>{totalCourses}</strong> Enrolled</span>
            </div>
            <div className="enrolled-stat">
              <FiClock />
              <span><strong>{totalHours}h</strong> Total Content</span>
            </div>
            <div className="enrolled-stat">
              <FiTrendingUp />
              <span><strong>In Progress</strong></span>
            </div>
            <div className="enrolled-stat">
              <FiAward />
              <span><strong>0</strong> Completed</span>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="loader-wrap"><div className="spinner" /><span>Loading…</span></div>
        ) : courses.length === 0 ? (
          <div className="enrolled-empty fade-up">
            <div className="enrolled-empty__icon">📚</div>
            <h2>No courses yet</h2>
            <p>You haven't enrolled in any courses. Browse and find something you love!</p>
            <Link to="/courses" className="btn btn-primary btn-lg">
              Browse Courses <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="enrolled-list fade-up delay-2">
            {courses.map((course, i) => (
              <div key={course.id} className={`enrolled-item fade-up delay-${(i % 5) + 1}`}>
                <div className="enrolled-item__color-bar" />
                <div className="enrolled-item__body">
                  <div className="enrolled-item__top">
                    <div>
                      <span className="enrolled-item__category">{course.category}</span>
                      <h3 className="enrolled-item__title">{course.title}</h3>
                      <p className="enrolled-item__instructor">by {course.instructor}</p>
                    </div>
                    <div className="enrolled-item__right">
                      <div className="enrolled-item__meta">
                        <span><FiClock size={12} /> {course.durationHours}h</span>
                        <span className={`badge ${
                          course.level === 'BEGINNER' ? 'badge-green' :
                          course.level === 'ADVANCED' ? 'badge-red' : 'badge-amber'
                        }`}>{course.level}</span>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => unenroll(course.id)}
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="progress-wrap">
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{ width: '0%' }} />
                    </div>
                    <span className="progress-label">0% complete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .enrolled-stats {
          display: flex; flex-wrap: wrap; gap: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin-bottom: 36px;
        }
        .enrolled-stat {
          flex: 1; min-width: 140px;
          display: flex; align-items: center; gap: 10px;
          padding: 20px 24px;
          border-right: 1px solid var(--border);
          font-size: 0.9rem; color: var(--ink-muted);
        }
        .enrolled-stat:last-child { border-right: none; }
        .enrolled-stat svg { color: var(--accent); }
        .enrolled-stat strong { color: var(--ink); }

        .enrolled-empty {
          text-align: center; padding: 80px 20px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .enrolled-empty__icon { font-size: 4rem; margin-bottom: 8px; }
        .enrolled-empty h2 { font-size: 1.8rem; letter-spacing: -0.03em; }
        .enrolled-empty p { color: var(--ink-muted); max-width: 420px; }

        .enrolled-list { display: flex; flex-direction: column; gap: 16px; }
        .enrolled-item {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform var(--transition), border-color var(--transition);
        }
        .enrolled-item:hover { transform: translateX(4px); border-color: var(--border-hl); }
        .enrolled-item__color-bar { width: 5px; background: var(--accent); flex-shrink: 0; }
        .enrolled-item__body { flex: 1; padding: 20px 24px; }
        .enrolled-item__top {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 16px; margin-bottom: 16px;
        }
        .enrolled-item__category {
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--accent-lt);
          font-family: var(--font-head);
        }
        .enrolled-item__title {
          font-size: 1.1rem; margin: 5px 0 4px;
          letter-spacing: -0.02em;
        }
        .enrolled-item__instructor { font-size: 0.84rem; color: var(--ink-muted); }
        .enrolled-item__right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 10px; flex-shrink: 0;
        }
        .enrolled-item__meta { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; color: var(--ink-muted); }
        .enrolled-item__meta span { display: flex; align-items: center; gap: 4px; }

        .progress-wrap { display: flex; align-items: center; gap: 12px; }
        .progress-bar {
          flex: 1; height: 6px;
          background: var(--border); border-radius: 99px; overflow: hidden;
        }
        .progress-bar__fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--teal));
          border-radius: 99px;
          transition: width 0.6s ease;
        }
        .progress-label { font-size: 0.75rem; color: var(--ink-dim); white-space: nowrap; }
      `}</style>
    </div>
  )
}
