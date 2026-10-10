import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  Filter,
  Bookmark,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Tag,
  ArrowRight
} from 'lucide-react';
import { interviewQuestionsData } from '../data/interviewQuestions';
import { CURRICULUM_SUBJECTS } from '../contentRegistry';
import { useProgress } from '../hooks/useProgress';
import {
  getBookmarks,
  toggleBookmark,
  getCompletedTopics,
  toggleCompletedTopic
} from '../utils/storage';
import DifficultyBadge from '../components/common/DifficultyBadge';
import EmptyState from '../components/common/EmptyState';

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [expandedIds, setExpandedIds] = useState(new Set());
  const progress = useProgress();

  const bookmarkIds = getBookmarks();
  const completedIds = getCompletedTopics();

  // Extract distinct subjects
  const subjectsList = useMemo(() => {
    const fromData = Array.from(new Set(interviewQuestionsData.map(q => q.subject)));
    return fromData.sort();
  }, []);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    const qLower = searchQuery.trim().toLowerCase();

    return interviewQuestionsData.filter(q => {
      // Subject filter
      if (selectedSubject !== 'all' && q.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && q.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Search query
      if (qLower) {
        const promptMatch = q.interviewerPrompt.toLowerCase().includes(qLower);
        const answerMatch = (q.idealAnswer || '').toLowerCase().includes(qLower);
        const categoryMatch = (q.category || '').toLowerCase().includes(qLower);
        const conceptMatch = (q.expectedConcepts || []).some(c => c.toLowerCase().includes(qLower));
        const keyPointMatch = (q.keyPoints || []).some(k => k.toLowerCase().includes(qLower));

        if (!promptMatch && !answerMatch && !categoryMatch && !conceptMatch && !keyPointMatch) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedSubject, selectedDifficulty]);

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleBookmark = (id) => {
    toggleBookmark(id);
    progress.refresh();
  };

  const handleToggleComplete = (id) => {
    toggleCompletedTopic(id);
    progress.refresh();
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredQuestions.map(q => q.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
          <HelpCircle size={28} color="var(--accent-primary)" />
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Technical Interview Q&A Library</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Master {interviewQuestionsData.length} in-depth technical interview questions with model answers, evaluation rubrics, and conceptual deep-dives across 15 core domains.
        </p>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            flex: 1,
            minWidth: '240px'
          }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search questions, concepts, answers (e.g. deadlock, CAP theorem, indexing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>

          {/* Subject Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} color="var(--text-muted)" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                padding: '0.6rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem'
              }}
            >
              <option value="all">All Subjects ({interviewQuestionsData.length})</option>
              {subjectsList.map(s => {
                const count = interviewQuestionsData.filter(q => q.subject.toLowerCase() === s.toLowerCase()).length;
                return (
                  <option key={s} value={s}>{s} ({count})</option>
                );
              })}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{
                padding: '0.6rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
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
          </div>

          {/* Expand / Collapse All buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
            <button
              onClick={expandAll}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <span>
            Showing <strong>{filteredQuestions.length}</strong> of {interviewQuestionsData.length} interview questions
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-primary)',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          type="search"
          title="No questions match your filter"
          description="Try modifying your keyword search or resetting the subject and difficulty filters."
          actionText="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedSubject('all');
            setSelectedDifficulty('all');
          }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredQuestions.map((q, idx) => {
            const isExpanded = expandedIds.has(q.id);
            const isBookmarked = bookmarkIds.includes(q.id);
            const isMastered = completedIds.includes(q.id);

            return (
              <div
                key={q.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  border: isMastered ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {/* Header row: Subject, Category, Difficulty, Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--accent-primary-light)',
                      color: 'var(--accent-primary)',
                      textTransform: 'uppercase'
                    }}>
                      {q.subject}
                    </span>
                    {q.category && (
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)'
                      }}>
                        {q.category}
                      </span>
                    )}
                    <DifficultyBadge difficulty={q.difficulty} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      onClick={() => handleToggleComplete(q.id)}
                      title={isMastered ? "Mark as unmastered" : "Mark as mastered"}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.35rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isMastered ? 'var(--accent-success-light)' : 'var(--bg-tertiary)',
                        color: isMastered ? 'var(--accent-success)' : 'var(--text-muted)',
                        border: `1px solid ${isMastered ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)'}`,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <CheckCircle2 size={13} />
                      <span>{isMastered ? 'Mastered' : 'Mastered?'}</span>
                    </button>

                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      title={isBookmarked ? "Remove bookmark" : "Bookmark question"}
                      style={{
                        padding: '0.35rem 0.55rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isBookmarked ? 'var(--accent-warning-light)' : 'var(--bg-tertiary)',
                        color: isBookmarked ? 'var(--accent-warning)' : 'var(--text-muted)',
                        border: `1px solid ${isBookmarked ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)'}`,
                        cursor: 'pointer'
                      }}
                    >
                      <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <h3
                  onClick={() => toggleExpand(q.id)}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    lineHeight: 1.45,
                    marginBottom: '1rem',
                    cursor: 'pointer',
                    color: 'var(--text-primary)'
                  }}
                >
                  <span style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}>Q{idx + 1}.</span>
                  {q.interviewerPrompt}
                </h3>

                {/* Toggle Answer Button */}
                <button
                  onClick={() => toggleExpand(q.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: isExpanded ? 'var(--bg-tertiary)' : 'var(--accent-primary-light)',
                    color: isExpanded ? 'var(--text-secondary)' : 'var(--accent-primary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={15} />
                      <span>Hide Model Answer</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={15} />
                      <span>Reveal Ideal Model Answer</span>
                    </>
                  )}
                </button>

                {/* Expanded Answer Section */}
                {isExpanded && (
                  <div style={{
                    marginTop: '1.25rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    animation: 'fadeIn 0.2s ease-in-out'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', color: 'var(--accent-success)', fontWeight: 700, fontSize: '0.85rem' }}>
                        <Sparkles size={16} />
                        <span>Ideal Interviewer Response:</span>
                      </div>
                      <div style={{
                        fontSize: '0.925rem',
                        lineHeight: 1.65,
                        color: 'var(--text-secondary)',
                        whiteSpace: 'pre-line'
                      }}>
                        {q.idealAnswer}
                      </div>
                    </div>

                    {/* Key Evaluation Points */}
                    {q.keyPoints && q.keyPoints.length > 0 && (
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                          Key Points Evaluated by Interviewers:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {q.keyPoints.map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Expected Concepts Chips */}
                    {q.expectedConcepts && q.expectedConcepts.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Concepts:</span>
                        {q.expectedConcepts.map((concept, cIdx) => (
                          <span
                            key={cIdx}
                            style={{
                              fontSize: '0.725rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--border-color)'
                            }}
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Study Related Lesson Link */}
                    {q.relatedTopicId && (
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                          to={`/topic/${q.relatedTopicId}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.825rem',
                            fontWeight: 600,
                            color: 'var(--accent-secondary)'
                          }}
                        >
                          <BookOpen size={14} />
                          <span>Study Full Lesson on this Topic</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
