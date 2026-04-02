import React from "react";
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'
import courseService from '../services/courseService'
import CourseForm from '../components/CourseForm'

export default function EditCourse() {
  const { id }  = useParams()
  const navigate = useNavigate()
  const [course,  setCourse]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching,setFetching]= useState(true)

  useEffect(() => {
    courseService.getById(id)
      .then(({ data }) => setCourse(data))
      .catch(err => { toast.error(err.message); navigate('/courses') })
      .finally(() => setFetching(false))
  }, [id])

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await courseService.update(id, data)
      toast.success('Course updated successfully! ✅')
      navigate('/courses')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="page-wrapper">
        <div className="loader-wrap"><div className="spinner" /><span>Loading course…</span></div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 780 }}>
        <Link to="/courses" className="btn btn-ghost" style={{ marginBottom: 24, paddingLeft: 0 }}>
          <FiArrowLeft /> Back to Courses
        </Link>

        <div className="form-page fade-up">
          <div className="form-page__header">
            <div className="form-page__icon">✎</div>
            <div>
              <h1>Edit Course</h1>
              <p>Update the details for <strong style={{ color: 'var(--ink)' }}>{course?.title}</strong></p>
            </div>
          </div>
          <div className="divider" />
          {course && (
            <CourseForm
              initialData={course}
              onSubmit={handleSubmit}
              submitLabel="Save Changes"
              loading={loading}
            />
          )}
        </div>
      </div>

      <style>{`
        .form-page {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px;
        }
        @media (max-width: 600px) { .form-page { padding: 24px 18px; } }
        .form-page__header {
          display: flex; align-items: flex-start; gap: 18px; margin-bottom: 28px;
        }
        .form-page__icon {
          width: 48px; height: 48px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--amber), #ff8c42);
          border-radius: var(--radius-md);
          display: grid; place-items: center;
          font-size: 1.3rem; color: #fff;
          box-shadow: 0 8px 24px rgba(255,184,48,0.3);
        }
        .form-page__header h1 { font-size: 1.6rem; letter-spacing: -0.03em; margin-bottom: 6px; }
        .form-page__header p { color: var(--ink-muted); font-size: 0.9rem; }
      `}</style>
    </div>
  )
}
