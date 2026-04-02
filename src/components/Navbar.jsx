import React from "react";
import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch, FiPlus, FiMenu, FiX, FiBookOpen } from 'react-icons/fi'

const navLinks = [
  { to: '/',        label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/enrolled',label: 'My Learning' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [query,     setQuery]     = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/courses?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMenuOpen(false)
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon"><FiBookOpen /></span>
          <span className="navbar__logo-text">Course<strong>Hub</strong></span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Search + CTA */}
        <div className="navbar__actions">
          <form onSubmit={handleSearch} className="navbar__search">
            <FiSearch className="navbar__search-icon" />
            <input
              type="text"
              placeholder="Search courses…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="navbar__search-input"
            />
          </form>
          <Link to="/courses/add" className="btn btn-primary btn-sm">
            <FiPlus /> New Course
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <form onSubmit={handleSearch} className="navbar__mobile-search">
            <FiSearch />
            <input
              type="text"
              placeholder="Search courses…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/courses/add"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            <FiPlus /> New Course
          </Link>
        </div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 72px;
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
          border-bottom: 1px solid transparent;
        }
        .navbar--scrolled {
          background: rgba(10,10,15,0.85);
          backdrop-filter: blur(20px);
          border-bottom-color: var(--border);
        }
        .navbar__inner {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-head);
          font-size: 1.2rem;
          color: var(--ink);
          flex-shrink: 0;
        }
        .navbar__logo-icon {
          width: 34px; height: 34px;
          background: var(--accent);
          border-radius: 10px;
          display: grid; place-items: center;
          font-size: 1rem;
          color: #fff;
          box-shadow: 0 4px 14px rgba(124,106,255,0.4);
        }
        .navbar__logo-text strong { color: var(--accent-lt); }
        .navbar__links {
          display: flex;
          gap: 4px;
          flex: 1;
        }
        .navbar__link {
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          color: var(--ink-muted);
          transition: color var(--transition), background var(--transition);
        }
        .navbar__link:hover { color: var(--ink); background: var(--bg-hover); }
        .navbar__link--active { color: var(--ink); background: var(--bg-hover); }
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .navbar__search {
          position: relative;
          display: flex;
          align-items: center;
        }
        .navbar__search-icon {
          position: absolute;
          left: 12px;
          color: var(--ink-dim);
          font-size: 0.9rem;
          pointer-events: none;
        }
        .navbar__search-input {
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--ink);
          font-size: 0.85rem;
          padding: 8px 14px 8px 34px;
          width: 220px;
          transition: border-color var(--transition), width 0.3s;
        }
        .navbar__search-input:focus {
          border-color: var(--accent);
          width: 260px;
        }
        .navbar__search-input::placeholder { color: var(--ink-dim); }
        .navbar__hamburger {
          display: none;
          background: none;
          border: none;
          color: var(--ink);
          font-size: 1.4rem;
          padding: 6px;
          margin-left: auto;
        }
        .navbar__mobile-menu {
          display: none;
          flex-direction: column;
          gap: 8px;
          padding: 16px 24px 24px;
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          animation: fadeIn 0.2s ease;
        }
        .navbar__mobile-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 9px 14px;
          color: var(--ink-muted);
          margin-bottom: 8px;
        }
        .navbar__mobile-search input {
          background: none;
          border: none;
          color: var(--ink);
          font-size: 0.9rem;
          flex: 1;
        }
        .navbar__mobile-link {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          color: var(--ink-muted);
          font-size: 0.95rem;
        }
        .navbar__mobile-link--active { color: var(--accent-lt); background: rgba(124,106,255,0.08); }
        @media (max-width: 768px) {
          .navbar__links, .navbar__actions { display: none; }
          .navbar__hamburger { display: flex; }
          .navbar__mobile-menu { display: flex; }
        }
      `}</style>
    </header>
  )
}
