import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiSearch, FiFilter, FiX, FiPlus, FiSliders } from 'react-icons/fi'
import courseService from '../services/courseService'
import CourseCard from '../components/CourseCard'

const CATEGORIES = ['All','Backend','Frontend','DevOps','Data Science','Cloud','Mobile','Career','Database']
const LEVELS     = ['All','BEGINNER','INTERMEDIATE','ADVANCED']
const SORTS      = [
  { value: 'default',    label: 'Default' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular',    label: 'Most Popular' },
  { value: 'newest',     label: 'Newest' },
]

export default function Courses() {
  const [params, setParams]     = useSearchParams()
  const [courses, setCourses]   = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState(params.get('search') || '')
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [level, setLevel]       = useState('All')
  const [sort, setSort]         = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  // Load courses
  useEffect(() => {
    setLoading(true)
    courseService.getAll()
      .then(({ data }) => setCourses(data))
      .finally(() => setLoading(false))
  }, [])

  // Filter + sort
  useEffect(() => {
    let res = [...courses]
    if (search.trim())     res = res.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
    )
    if (category !== 'All') res = res.filter(c => c.category === category)
    if (level !== 'All')    res = res.filter(c => c.level === level)

    if (sort === 'price-asc')  res.sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') res.sort((a,b) => b.price - a.price)
    if (sort === 'popular')    res.sort((a,b) => (b.enrolledStudents||0) - (a.enrolledStudents||0))
    if (sort === 'newest')     res.sort((a,b) => b.id - a.id)

    setFiltered(res)
  }, [courses, search, category, level, sort])

  const clearFilters = () => {
    setSearch(''); setCategory('All'); setLevel('All'); setSort('default')
    setParams({})
  }
  const hasFilters = search || category !== 'All' || level !== 'All' || sort !== 'default'

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="courses-header fade-up">
          <div>
            <h1 className="page-header__title">All Courses</h1>
            <p style={{ color: 'var(--ink-muted)', marginTop: 6 }}>
              {filtered.length} course{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <Link to="/courses/add" className="btn btn-primary">
            <FiPlus /> New Course
          </Link>
        </div>

        {/* Search + Filters bar */}
        <div className="courses-toolbar fade-up delay-1">
          {/* Search */}
          <div className="courses-search">
            <FiSearch className="courses-search__icon" />
            <input
              type="text"
              placeholder="Search by title, description, instructor…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="courses-search__input"
            />
            {search && (
              <button onClick={() => setSearch('')} className="courses-search__clear">
                <FiX />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            className="form-select courses-sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* Filter toggle */}
          <button
            className={`btn btn-secondary ${showFilters ? 'btn-active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiSliders /> Filters
            {hasFilters && <span className="filter-dot" />}
          </button>

          {hasFilters && (
            <button className="btn btn-ghost" onClick={clearFilters}>
              <FiX /> Clear
            </button>
          )}
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="courses-filters fade-in">
            <div className="courses-filters__group">
              <span className="form-label">Category</span>
              <div className="filter-pills">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`filter-pill ${category === cat ? 'active' : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="courses-filters__group">
              <span className="form-label">Level</span>
              <div className="filter-pills">
                {LEVELS.map(l => (
                  <button
                    key={l}
                    className={`filter-pill ${level === l ? 'active' : ''}`}
                    onClick={() => setLevel(l)}
                  >
                    {l === 'All' ? 'All Levels' : l[0] + l.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="loader-wrap"><div className="spinner" /><span>Loading courses…</span></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters.</p>
            {hasFilters && (
              <button className="btn btn-secondary" style={{ marginTop: 20 }} onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="courses-grid" style={{ marginTop: 28 }}>
            {filtered.map((course, i) => (
              <div key={course.id} className={`fade-up delay-${(i % 5) + 1}`}>
                <CourseCard
                  course={course}
                  onDelete={id => setCourses(c => c.filter(x => x.id !== id))}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .courses-header {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 28px; gap: 16px;
        }
        .page-header__title {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, var(--ink) 0%, var(--accent-lt) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .courses-toolbar {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .courses-search {
          position: relative; flex: 1; min-width: 240px;
          display: flex; align-items: center;
        }
        .courses-search__icon {
          position: absolute; left: 13px;
          color: var(--ink-dim); font-size: 0.9rem; pointer-events: none;
        }
        .courses-search__input {
          width: 100%; background: var(--bg-card);
          border: 1.5px solid var(--border); border-radius: var(--radius-sm);
          color: var(--ink); font-size: 0.9rem;
          padding: 10px 36px 10px 38px;
          transition: border-color var(--transition);
        }
        .courses-search__input:focus { border-color: var(--accent); outline: none; }
        .courses-search__input::placeholder { color: var(--ink-dim); }
        .courses-search__clear {
          position: absolute; right: 10px;
          background: none; border: none;
          color: var(--ink-muted); font-size: 1rem; cursor: pointer;
          display: grid; place-items: center;
        }
        .courses-sort {
          min-width: 180px;
          padding: 10px 14px;
          font-size: 0.875rem;
        }
        .btn-active { border-color: var(--accent) !important; color: var(--accent-lt) !important; }
        .filter-dot {
          width: 7px; height: 7px;
          background: var(--accent); border-radius: 50%;
          margin-left: 2px;
        }
        .courses-filters {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          margin-bottom: 20px;
          display: flex; flex-direction: column; gap: 18px;
        }
        .courses-filters__group { display: flex; flex-direction: column; gap: 10px; }
        .filter-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .filter-pill {
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 0.8rem; font-weight: 500;
          background: var(--bg); border: 1.5px solid var(--border);
          color: var(--ink-muted);
          transition: all var(--transition);
          cursor: pointer; font-family: var(--font-body);
        }
        .filter-pill:hover { border-color: var(--accent); color: var(--accent-lt); }
        .filter-pill.active {
          background: rgba(124,106,255,0.12);
          border-color: var(--accent); color: var(--accent-lt);
        }
      `}</style>
    </div>
  )
}
