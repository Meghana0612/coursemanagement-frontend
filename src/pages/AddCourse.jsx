import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'
import courseService from '../services/courseService'
import CourseForm from '../components/CourseForm'

export default function AddCourse() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
  console.log("Form Data:", formData);

  try {
    setLoading(true); // optional loading

    await courseService.create(formData);

    alert("Course created successfully");
    navigate("/courses");

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 780 }}>
        {/* Back */}
        <Link to="/courses" className="btn btn-ghost" style={{ marginBottom: 24, paddingLeft: 0 }}>
          <FiArrowLeft /> Back to Courses
        </Link>

        <div className="form-page fade-up">
          <div className="form-page__header">
            <div className="form-page__icon">✦</div>
            <div>
              <h1>Add New Course</h1>
              <p>Fill in the details to publish your course on CourseHub.</p>
            </div>
          </div>
          <div className="divider" />
          <CourseForm
            onSubmit={handleSubmit}
            submitLabel="Publish Course"
            loading={loading}
          />
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
          display: flex; align-items: flex-start; gap: 18px;
          margin-bottom: 28px;
        }
        .form-page__icon {
          width: 48px; height: 48px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--accent), var(--teal));
          border-radius: var(--radius-md);
          display: grid; place-items: center;
          font-size: 1.4rem; color: #fff;
          box-shadow: 0 8px 24px rgba(124,106,255,0.35);
        }
        .form-page__header h1 {
          font-size: 1.6rem; letter-spacing: -0.03em; margin-bottom: 6px;
        }
        .form-page__header p { color: var(--ink-muted); font-size: 0.9rem; }
      `}</style>
    </div>
  )
}
