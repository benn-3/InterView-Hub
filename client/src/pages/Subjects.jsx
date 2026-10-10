import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, BookOpen } from 'lucide-react';
import { getAllSubjects } from '../contentRegistry';
import { getCompletedTopics } from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import SubjectCard from '../components/common/SubjectCard';
import EmptyState from '../components/common/EmptyState';

export default function Subjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const subjects = useMemo(() => getAllSubjects(), []);
  const progress = useProgress();
  const completedIds = getCompletedTopics();

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(['All']);
    subjects.forEach(s => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, [subjects]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subj => {
      const matchesSearch =
        subj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subj.shortTitle.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCat = selectedCategory === 'All' || subj.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [subjects, searchTerm, selectedCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)' }}>
            Curriculum Library
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.25rem 0' }}>
            Technical Subjects
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Complete master syllabus for software engineering & infrastructure interviews
          </p>
        </div>

        {/* Search input filter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          padding: '0.55rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          width: '100%',
          maxWidth: '320px'
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              width: '100%'
            }}
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginRight: '0.5rem' }}>
          <Filter size={14} />
          <span>Category:</span>
        </div>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
              border: `1px solid ${selectedCategory === cat ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Subject Cards */}
      {filteredSubjects.length === 0 ? (
        <EmptyState
          type="content"
          title="No matching subjects found"
          description={`No subjects matched your filter query "${searchTerm}".`}
          actionText="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredSubjects.map(subj => {
            const completedCount = subj.topics.filter(t => completedIds.includes(t.id)).length;
            const percent = subj.topics.length > 0
              ? Math.round((completedCount / subj.topics.length) * 100)
              : 0;

            return (
              <SubjectCard
                key={subj.slug}
                subject={subj}
                progress={percent}
                completedCount={completedCount}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
