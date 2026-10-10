import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Sun, Moon, Sparkles } from 'lucide-react';
import { getTheme, setTheme } from '../../utils/storage';
import UserProfileMenu from '../auth/UserProfileMenu';
import './Header.css';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/subjects': 'Study Subjects',
  '/questions': 'Interview Q&A Library',
  '/companies': 'Company-Wise Preparation',
  '/search': 'Global Search',
  '/bookmarks': 'Bookmarked Topics',
  '/practice': 'Practice Hub',
  '/coding': 'Coding Problems',
  '/sql': 'SQL Playground',
  '/flashcards': 'Concept Flashcards',
  '/mock-interview': 'Mock Interview Simulation',
  '/revision': 'Last-Minute Revision Sheet',
  '/progress': 'Analytics & Progress',
  '/settings': 'Preferences & Settings'
};

export default function Header({ onOpenMobile, onOpenSearch, theme, onToggleTheme }) {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.startsWith('/topic/')) return 'Study Material';
    if (location.pathname.startsWith('/subjects/')) return 'Subject Overview';
    if (location.pathname.startsWith('/companies/')) return 'Company Preparation Kit';
    return PAGE_TITLES[location.pathname] || 'Interview Preparation';
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onOpenMobile}
          aria-label="Open mobile menu"
        >
          <Menu size={20} />
        </button>
        <h2 className="header-title">{getPageTitle()}</h2>
      </div>

      <div className="header-center">
        <button
          className="search-trigger-btn"
          onClick={onOpenSearch}
          aria-label="Search topics (Ctrl+K)"
        >
          <div className="search-hint">
            <Search size={16} />
            <span>Search topics, questions, tags...</span>
          </div>
          <kbd className="kbd-shortcut">Ctrl K</kbd>
        </button>
      </div>

      <div className="header-right">
        {/* Mobile search button */}
        <button
          className="theme-toggle-btn mobile-only"
          onClick={onOpenSearch}
          aria-label="Search"
          style={{ display: 'none' }}
        >
          <Search size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Real User Profile Menu with Google SSO */}
        <UserProfileMenu />
      </div>
    </header>
  );
}
