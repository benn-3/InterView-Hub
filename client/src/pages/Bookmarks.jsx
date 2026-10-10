import React, { useState, useMemo } from 'react';
import { Bookmark, Star, ArrowRight, BookOpen, HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allTopics } from '../utils/markdownLoader';
import { interviewQuestionsData } from '../data/interviewQuestions';
import {
  getBookmarks,
  toggleBookmark,
  getCompletedTopics,
  toggleCompletedTopic,
  getImportantTopics,
  getDifficultTopics
} from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import TopicCard from '../components/common/TopicCard';
import DifficultyBadge from '../components/common/DifficultyBadge';
import EmptyState from '../components/common/EmptyState';

export default function Bookmarks() {
  const [activeTab, setActiveTab] = useState('lessons');
  const [expandedQuestionIds, setExpandedQuestionIds] = useState(new Set());
  const progress = useProgress();

  const bookmarkIds = getBookmarks();
  const completedIds = getCompletedTopics();
  const importantIds = getImportantTopics();
  const difficultIds = getDifficultTopics();

  const bookmarkedTopics = useMemo(() => {
    return allTopics.filter(t => bookmarkIds.includes(t.id));
  }, [bookmarkIds]);

  const bookmarkedQuestions = useMemo(() => {
    return interviewQuestionsData.filter(q => bookmarkIds.includes(q.id));
  }, [bookmarkIds]);

  const handleToggleBookmark = (id) => {
    toggleBookmark(id);
    progress.refresh();
  };

  const handleToggleComplete = (id) => {
    toggleCompletedTopic(id);
    progress.refresh();
  };

  const toggleQuestionExpand = (id) => {
    setExpandedQuestionIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
          <Bookmark size={26} color="var(--accent-warning)" fill="currentColor" />
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Saved Bookmarks</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Quickly access and revise your pinned study lessons and saved interview questions
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('lessons')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: activeTab === 'lessons' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            color: activeTab === 'lessons' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <BookOpen size={16} />
          <span>Study Lessons ({bookmarkedTopics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: activeTab === 'questions' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            color: activeTab === 'questions' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          <HelpCircle size={16} />
          <span>Interview Q&A ({bookmarkedQuestions.length})</span>
        </button>
      </div>

      {/* Tab Content: Lessons */}
      {activeTab === 'lessons' && (
        <>
          {bookmarkedTopics.length === 0 ? (
            <EmptyState
              type="bookmarks"
              title="You haven't bookmarked any study lessons yet."
              description="Click the bookmark icon on any topic card or study guide page to pin it here for quick access."
              actionText="Explore Subjects"
              actionLink="/subjects"
            />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {bookmarkedTopics.map(topic => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isCompleted={completedIds.includes(topic.id)}
                  isBookmarked={true}
                  isImportant={importantIds.includes(topic.id) || topic.importance === 'high'}
                  isDifficult={difficultIds.includes(topic.id)}
                  onToggleBookmark={handleToggleBookmark}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Tab Content: Questions */}
      {activeTab === 'questions' && (
        <>
          {bookmarkedQuestions.length === 0 ? (
            <EmptyState
              type="bookmarks"
              title="You haven't bookmarked any interview questions yet."
              description="Visit the Technical Interview Questions Library or subject Q&A tabs to bookmark questions for targeted review."
              actionText="Browse Interview Questions"
              actionLink="/questions"
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {bookmarkedQuestions.map(q => {
                const isExpanded = expandedQuestionIds.has(q.id);
                const isMastered = completedIds.includes(q.id);

                return (
                  <div
                    key={q.id}
                    className="glass-panel"
                    style={{
                      padding: '1.5rem',
                      border: isMastered ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)'
                    }}
                  >
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
                          title="Remove bookmark"
                          style={{
                            padding: '0.35rem 0.55rem',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--accent-warning-light)',
                            color: 'var(--accent-warning)',
                            border: '1px solid rgba(245, 158, 11, 0.4)',
                            cursor: 'pointer'
                          }}
                        >
                          <Bookmark size={14} fill="currentColor" />
                        </button>
                      </div>
                    </div>

                    <h3
                      onClick={() => toggleQuestionExpand(q.id)}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        lineHeight: 1.45,
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {q.interviewerPrompt}
                    </h3>

                    <button
                      onClick={() => toggleQuestionExpand(q.id)}
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
                          <span>Reveal Model Answer</span>
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <div style={{
                        marginTop: '1.25rem',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', color: 'var(--accent-success)', fontWeight: 700, fontSize: '0.85rem' }}>
                            <Sparkles size={16} />
                            <span>Ideal Model Answer:</span>
                          </div>
                          <div style={{ fontSize: '0.925rem', lineHeight: 1.65, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                            {q.idealAnswer}
                          </div>
                        </div>

                        {q.keyPoints && q.keyPoints.length > 0 && (
                          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                              Key Evaluator Points:
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                              {q.keyPoints.map((pt, pIdx) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        )}

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
                              <span>Go to Study Guide</span>
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
        </>
      )}
    </div>
  );
}
