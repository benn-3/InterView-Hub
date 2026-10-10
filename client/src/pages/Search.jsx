import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, X, Filter, BookOpen, ChevronRight, Tag } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { getSubjects } from '../utils/markdownLoader';
import DifficultyBadge from '../components/common/DifficultyBadge';
import EmptyState from '../components/common/EmptyState';

// Helper to highlight matching text occurrences
function HighlightText({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            style={{
              backgroundColor: 'rgba(234, 179, 8, 0.3)',
              color: 'var(--text-primary)',
              borderRadius: '2px',
              padding: '0 2px'
            }}
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function SearchPage() {
  const {
    query,
    setQuery,
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    results,
    totalCount
  } = useSearch('');

  const subjects = useMemo(() => getSubjects(), []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Search Study Material</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Full-text index across all markdown documents, code examples, tags and subject notes
        </p>
      </div>

      {/* Search Box & Filters */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          marginBottom: '1rem'
        }}>
          <SearchIcon size={20} color="var(--accent-primary)" />
          <input
            type="text"
            placeholder="Search keywords, concepts, questions... (e.g. polymorphism, 3NF, index, docker)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Filter size={15} />
            <span>Filter by:</span>
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem'
            }}
          >
            <option value="all">All Subjects</option>
            {subjects.map(s => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem'
            }}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
            Found {totalCount} matching topics
          </span>
        </div>
      </div>

      {/* Search Results List */}
      {results.length === 0 ? (
        <EmptyState
          type="search"
          title="No matching topics found."
          description={`No study materials matched "${query}". Try searching for broader terms or resetting filters.`}
          actionText="Clear Query"
          onAction={() => { setQuery(''); setSelectedSubject('all'); setSelectedDifficulty('all'); }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {results.map((topic) => (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'var(--accent-primary)'
                  }}>
                    <HighlightText text={topic.subject} query={query} />
                  </span>
                  <span style={{ color: 'var(--border-light)' }}>•</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {topic.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  <HighlightText text={topic.title} query={query} />
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '0.75rem'
                }}>
                  <HighlightText text={topic.snippet} query={query} />
                </p>

                {topic.tags && (
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {topic.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '4px',
                          background: 'var(--bg-tertiary)',
                          color: 'var(--text-muted)'
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <DifficultyBadge difficulty={topic.difficulty} />
                <ChevronRight size={18} color="var(--text-muted)" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
