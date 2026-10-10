import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, ChevronRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import DifficultyBadge from './DifficultyBadge';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { results } = useSearch(searchTerm);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (topic) => {
    onClose();
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '680px',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '75vh'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-color)',
          gap: '0.75rem',
          background: 'var(--bg-tertiary)'
        }}>
          <Search size={22} color="var(--accent-primary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, questions, tags, or concepts... (e.g. polymorphism, 3NF, index)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={{ color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          )}
          <span style={{
            fontSize: '0.75rem',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            background: 'var(--bg-card)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border-color)'
          }}>
            ESC
          </span>
        </div>

        {/* Results List */}
        <div style={{
          padding: '0.75rem',
          overflowY: 'auto',
          flex: 1
        }}>
          {results.length === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '0.95rem' }}>No topics match "{searchTerm}"</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Try searching by subject name (OOP, SQL, Java) or keywords.</p>
            </div>
          ) : (
            results.slice(0, 10).map((topic) => (
              <div
                key={topic.id}
                onClick={() => handleSelect(topic)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)',
                  borderBottom: '1px solid rgba(255,255,255,0.03)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ flex: 1, minWidth: 0, paddingRight: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {topic.subject}
                    </span>
                    <span style={{ color: 'var(--border-light)' }}>•</span>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {topic.title}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {topic.snippet}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <DifficultyBadge difficulty={topic.difficulty} />
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.65rem 1.25rem',
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>Showing {Math.min(10, results.length)} of {results.length} results</span>
          <span>Press Enter to navigate</span>
        </div>
      </div>
    </div>
  );
}
