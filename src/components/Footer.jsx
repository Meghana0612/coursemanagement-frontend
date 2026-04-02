import React from "react";
import { Link } from 'react-router-dom'
import { FiBookOpen, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon"><FiBookOpen /></span>
            <span>Course<strong>Hub</strong></span>
          </Link>
          <p className="footer__tagline">
            Build skills that matter.<br />Learn without limits.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="GitHub"><FiGithub /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>

        <div className="footer__links">
          <div>
            <h4>Platform</h4>
            <Link to="/courses">Browse Courses</Link>
            <Link to="/courses/add">Add Course</Link>
            <Link to="/enrolled">My Learning</Link>
          </div>
          <div>
            <h4>Categories</h4>
            <Link to="/courses?category=Backend">Backend</Link>
            <Link to="/courses?category=Frontend">Frontend</Link>
            <Link to="/courses?category=DevOps">DevOps</Link>
            <Link to="/courses?category=Data Science">Data Science</Link>
          </div>
          <div>
            <h4>API</h4>
            <a href="http://localhost:8080/h2-console" target="_blank" rel="noreferrer">H2 Console</a>
            <a href="http://localhost:8080/api/courses" target="_blank" rel="noreferrer">REST API</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} CourseHub. Built with React + Spring Boot.</span>
        </div>
      </div>

      <style>{`
        .footer {
          margin-top: 80px;
          border-top: 1px solid var(--border);
          background: var(--bg-card);
        }
        .footer__inner {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 48px;
          padding: 56px 24px 40px;
        }
        @media (max-width: 768px) {
          .footer__inner { grid-template-columns: 1fr; gap: 32px; }
        }
        .footer__logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-head); font-size: 1.15rem;
          color: var(--ink); margin-bottom: 14px;
        }
        .footer__logo-icon {
          width: 30px; height: 30px;
          background: var(--accent); border-radius: 9px;
          display: grid; place-items: center;
          color: #fff; font-size: 0.9rem;
        }
        .footer__logo strong { color: var(--accent-lt); }
        .footer__tagline { font-size: 0.88rem; color: var(--ink-muted); line-height: 1.7; margin-bottom: 20px; }
        .footer__socials { display: flex; gap: 12px; }
        .footer__socials a {
          width: 34px; height: 34px;
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          display: grid; place-items: center;
          color: var(--ink-muted); font-size: 1rem;
          transition: all var(--transition);
        }
        .footer__socials a:hover { border-color: var(--accent); color: var(--accent-lt); }
        .footer__links {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        @media (max-width: 480px) { .footer__links { grid-template-columns: 1fr 1fr; } }
        .footer__links h4 {
          font-family: var(--font-head); font-size: 0.75rem;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ink-dim); margin-bottom: 14px;
        }
        .footer__links a {
          display: block; font-size: 0.875rem;
          color: var(--ink-muted); margin-bottom: 9px;
          transition: color var(--transition);
        }
        .footer__links a:hover { color: var(--accent-lt); }
        .footer__bottom {
          border-top: 1px solid var(--border);
          padding: 18px 0;
        }
        .footer__bottom .container {
          display: flex; justify-content: center;
          font-size: 0.8rem; color: var(--ink-dim);
        }
      `}</style>
    </footer>
  )
}
