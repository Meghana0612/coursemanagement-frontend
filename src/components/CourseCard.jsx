import React from "react";
import { Link } from 'react-router-dom'
import {
  FiClock, FiUsers, FiDollarSign, FiEdit2, FiTrash2,
  FiBookOpen, FiStar, FiTrendingUp
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import courseService from '../services/courseService'

const LEVEL_CONFIG = {
  BEGINNER:     { label: 'Beginner',     cls: 'badge-green' },
  INTERMEDIATE: { label: 'Intermediate', cls: 'badge-amber' },
  ADVANCED:     { label: 'Advanced',     cls: 'badge-red'   },
}

const CATEGORY_COLORS = [
  '#7c6aff','#1ef0d0','#ffb830','#ff5757','#3ddc84',
  '#ff8c42','#a897ff','#4ecdc4',
]
const categoryColor = (cat) =>
  CATEGORY_COLORS[Math.abs([...cat].reduce((s,c)=>s+c.charCodeAt(0),0)) % CATEGORY_COLORS.length]

export default function CourseCard({ course, onDelete, onEnroll, enrolled }) {
  const level = LEVEL_CONFIG[course.level] || { label: course.level, cls: 'badge-muted' }
  const catColor = categoryColor(course.category || 'General')

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${course.title}"?`)) return
    try {
      await courseService.delete(course.id)
      toast.success('Course deleted')
      onDelete?.(course.id)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleEnroll = async () => {
    try {
      await courseService.enroll(course.id)
      toast.success('Enrolled successfully! 🎉')
      onEnroll?.(course.id)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <article className="course-card card">
      {/* Top color bar */}
      <div className="course-card__bar" style={{ background: catColor }} />

      <div className="course-card__body">
        {/* Header row */}
        <div className="course-card__header">
          <span className="course-card__category" style={{ color: catColor }}>
            {course.category}
          </span>
          <span className={`badge ${level.cls}`}>
            <FiTrendingUp size={10} /> {level.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="course-card__title">{course.title}</h3>

        {/* Description */}
        <p className="course-card__desc">{course.description}</p>

        {/* Instructor */}
        <div className="course-card__instructor">
          <div className="course-card__avatar">
            {course.instructor?.[0]?.toUpperCase() || '?'}
          </div>
          <span>{course.instructor}</span>
        </div>

        <div className="divider" style={{ margin: '14px 0' }} />

        {/* Meta row */}
        <div className="course-card__meta">
          <span className="course-card__meta-item">
            <FiClock size={13} />
            {course.durationHours}h
          </span>
          <span className="course-card__meta-item">
            <FiUsers size={13} />
            {course.enrolledStudents?.toLocaleString() || 0}
          </span>
          <span className={`badge ${course.isActive ? 'badge-green' : 'badge-muted'}`}>
            {course.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Price + Actions */}
        <div className="course-card__footer">
          <div className="course-card__price">
            <FiDollarSign size={15} />
            <span>{course.price?.toFixed(2)}</span>
          </div>
          <div className="course-card__actions">
            {enrolled ? (
              <span className="badge badge-teal"><FiStar size={10} /> Enrolled</span>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={handleEnroll}>
                Enroll
              </button>
            )}
            <Link to={`/courses/edit/${course.id}`} className="btn btn-ghost btn-sm">
              <FiEdit2 />
            </Link>
            <button className="btn btn-ghost btn-sm" onClick={handleDelete}>
              <FiTrash2 style={{ color: 'var(--red)' }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .course-card { position: relative; overflow: hidden; }
        .course-card__bar { height: 4px; }
        .course-card__body { padding: 20px; }
        .course-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .course-card__category {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: var(--font-head);
        }
        .course-card__title {
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 8px;
          color: var(--ink);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .course-card__desc {
          font-size: 0.84rem;
          color: var(--ink-muted);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 14px;
        }
        .course-card__instructor {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 0.84rem;
          color: var(--ink-muted);
        }
        .course-card__avatar {
          width: 26px; height: 26px;
          background: var(--accent);
          border-radius: 50%;
          display: grid; place-items: center;
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          font-family: var(--font-head);
          flex-shrink: 0;
        }
        .course-card__meta {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .course-card__meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.82rem;
          color: var(--ink-muted);
        }
        .course-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .course-card__price {
          display: flex;
          align-items: center;
          gap: 3px;
          font-family: var(--font-head);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--ink);
        }
        .course-card__actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>
    </article>
  )
}
