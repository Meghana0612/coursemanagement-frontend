import React from "react";
import { useState } from 'react'
import { FiSave, FiLoader } from 'react-icons/fi'

const CATEGORIES = ['Backend','Frontend','DevOps','Data Science','Cloud','Mobile','Career','Database','Design','Security']
const LEVELS     = ['BEGINNER','INTERMEDIATE','ADVANCED']

const INITIAL = {
  title: '', description: '', instructor: '',
  durationHours: '', price: '', category: '',
  level: 'BEGINNER', isActive: true,
}

export default function CourseForm({ initialData, onSubmit, submitLabel = 'Save Course', loading }) {
  const [form,   setForm]   = useState({ ...INITIAL, ...initialData })
  const [errors, setErrors] = useState({})

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim())                         e.title       = 'Title is required'
    else if (form.title.trim().length < 3)          e.title       = 'Min 3 characters'
    if (!form.description.trim())                   e.description = 'Description is required'
    if (!form.instructor.trim())                    e.instructor  = 'Instructor is required'
    if (!form.durationHours)                        e.durationHours = 'Duration is required'
    else if (Number(form.durationHours) < 1)        e.durationHours = 'Min 1 hour'
    if (form.price === '' || form.price === null)   e.price       = 'Price is required'
    else if (Number(form.price) < 0)                e.price       = 'Cannot be negative'
    if (!form.category)                             e.category    = 'Category is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    onSubmit({
      ...form,
      durationHours: Number(form.durationHours),
      price: Number(form.price),
    })
  }

  const Field = ({ name, label, children }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {children}
      {errors[name] && <span className="form-error">⚠ {errors[name]}</span>}
    </div>
  )

  return (
    <form className="course-form" onSubmit={handleSubmit} noValidate>
      {/* Row 1 */}
      <div className="course-form__row">
        <Field name="title" label="Course Title">
          <input
            className={`form-input ${errors.title ? 'form-input--error' : ''}`}
            placeholder="e.g. Java Spring Boot Masterclass"
            value={form.title}
            onChange={e => set('title', e.target.value)}
          />
        </Field>
        <Field name="instructor" label="Instructor">
          <input
            className={`form-input ${errors.instructor ? 'form-input--error' : ''}`}
            placeholder="e.g. John Smith"
            value={form.instructor}
            onChange={e => set('instructor', e.target.value)}
          />
        </Field>
      </div>

      {/* Description */}
      <Field name="description" label="Description">
        <textarea
          className={`form-textarea ${errors.description ? 'form-input--error' : ''}`}
          placeholder="Describe what students will learn…"
          value={form.description}
          onChange={e => set('description', e.target.value)}
          rows={4}
        />
      </Field>

      {/* Row 2 */}
      <div className="course-form__row">
        <Field name="category" label="Category">
          <select
            className={`form-select ${errors.category ? 'form-input--error' : ''}`}
            value={form.category}
            onChange={e => set('category', e.target.value)}
          >
            <option value="">Select category…</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field name="level" label="Level">
          <div className="course-form__level-pills">
            {LEVELS.map(l => (
              <button
                key={l}
                type="button"
                className={`course-form__level-pill ${form.level === l ? 'active' : ''}`}
                onClick={() => set('level', l)}
              >
                {l[0] + l.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </Field>
      </div>

      {/* Row 3 */}
      <div className="course-form__row">
        <Field name="durationHours" label="Duration (hours)">
          <input
            type="number"
            className={`form-input ${errors.durationHours ? 'form-input--error' : ''}`}
            placeholder="e.g. 40"
            min="1"
            value={form.durationHours}
            onChange={e => set('durationHours', e.target.value)}
          />
        </Field>
        <Field name="price" label="Price (USD)">
          <input
            type="number"
            className={`form-input ${errors.price ? 'form-input--error' : ''}`}
            placeholder="e.g. 99.99"
            min="0"
            step="0.01"
            value={form.price}
            onChange={e => set('price', e.target.value)}
          />
        </Field>
      </div>

      {/* Active toggle */}
      <div className="course-form__toggle-row">
        <span className="form-label" style={{ marginBottom: 0 }}>Active</span>
        <button
          type="button"
          className={`toggle ${form.isActive ? 'toggle--on' : ''}`}
          onClick={() => set('isActive', !form.isActive)}
          aria-label="Toggle active"
        >
          <span className="toggle__thumb" />
        </button>
        <span style={{ fontSize: '0.84rem', color: 'var(--ink-muted)' }}>
          {form.isActive ? 'Published — visible to students' : 'Draft — hidden from students'}
        </span>
      </div>

      {/* Submit */}
      <div className="course-form__submit">
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? <><FiLoader className="spin" /> Saving…</> : <><FiSave /> {submitLabel}</>}
        </button>
      </div>

      <style>{`
        .course-form { display: flex; flex-direction: column; gap: 22px; }
        .course-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) { .course-form__row { grid-template-columns: 1fr; } }

        .form-input--error { border-color: var(--red) !important; }

        .course-form__level-pills {
          display: flex;
          gap: 8px;
          padding: 4px 0;
        }
        .course-form__level-pill {
          flex: 1;
          padding: 9px 0;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          border: 1.5px solid var(--border);
          background: var(--bg-card);
          color: var(--ink-muted);
          transition: all var(--transition);
          font-family: var(--font-head);
        }
        .course-form__level-pill:hover { border-color: var(--accent); color: var(--accent-lt); }
        .course-form__level-pill.active {
          border-color: var(--accent);
          background: rgba(124,106,255,0.12);
          color: var(--accent-lt);
        }

        .course-form__toggle-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .toggle {
          width: 44px; height: 24px;
          background: var(--border-hl);
          border-radius: 99px;
          border: none;
          position: relative;
          transition: background var(--transition);
          flex-shrink: 0;
        }
        .toggle--on { background: var(--accent); }
        .toggle__thumb {
          position: absolute;
          top: 3px; left: 3px;
          width: 18px; height: 18px;
          background: #fff;
          border-radius: 50%;
          transition: transform var(--transition);
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
        .toggle--on .toggle__thumb { transform: translateX(20px); }

        .course-form__submit { display: flex; justify-content: flex-end; padding-top: 8px; }

        .spin { animation: spin 0.7s linear infinite; }
      `}</style>
    </form>
  )
}
