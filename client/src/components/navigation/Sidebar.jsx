import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Search,
  Bookmark,
  Brain,
  Code2,
  Database,
  Layers,
  Zap,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquareCode,
  HelpCircle
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/subjects', label: 'Subjects', icon: BookOpen },
  { path: '/questions', label: 'Questions', icon: HelpCircle },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { path: '/practice', label: 'Practice', icon: Brain },
  { path: '/coding', label: 'Coding', icon: Code2 },
  { path: '/sql', label: 'SQL', icon: Database },
  { path: '/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/mock-interview', label: 'Mock Interview', icon: MessageSquareCode },
  { path: '/revision', label: 'Revision', icon: Zap },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <NavLink to="/" className="sidebar-brand" onClick={onCloseMobile}>
            <div className="brand-icon-box">
              <Zap size={20} fill="currentColor" />
            </div>
            {!collapsed && (
              <div className="brand-text">
                <span className="brand-title">INTERVIEW</span>
                <span className="brand-sub">HUB</span>
              </div>
            )}
          </NavLink>

          <button
            className="collapse-toggle"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={onCloseMobile}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className="nav-icon" />
                {!collapsed && <span className="nav-text">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <p>© 2026 Interview Hub</p>
          <p style={{ color: 'var(--accent-secondary)' }}>Frontend Only Edition</p>
        </div>
      </aside>
    </>
  );
}
