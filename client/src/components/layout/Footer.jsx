import React from 'react';
import { Github } from 'lucide-react';
import './Footer.css';

/**
 * Shared Footer component displaying credits and contact links
 * Uses the existing design system tokens and responsive layout.
 */
export default function Footer({ className = '' }) {
  return (
    <footer className={`app-footer ${className}`}>
      <div className="footer-inner">
        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} Interview Hub</span>
        </div>

        <div className="footer-credits">
          <span>Developed with ❤️ by </span>
          <a
            href="https://github.com/benn-3"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-author-link"
          >
            Benny Hinn
          </a>
        </div>

        <div className="footer-contact">
          <a
            href="https://github.com/benn-3"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <Github size={15} />
            <span>Contact on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
