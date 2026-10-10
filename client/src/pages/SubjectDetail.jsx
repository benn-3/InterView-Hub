import React, { useState, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Filter,
  CheckCircle2,
  Bookmark,
  Layers,
  BookOpen,
  HelpCircle,
  Brain,
  Code2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award
} from 'lucide-react';
import { getSubjectContent } from '../contentRegistry';
import { useProgress } from '../hooks/useProgress';
import {
  getCompletedTopics,
  toggleCompletedTopic,
  getBookmarks,
  toggleBookmark,
  getImportantTopics,
  getDifficultTopics,
  getMCQProgress,
  saveMCQAttempt,
  getFlashcardProgress,
  setFlashcardStatus
} from '../utils/storage';
import TopicCard from '../components/common/TopicCard';
import ProgressBar from '../components/common/ProgressBar';
import EmptyState from '../components/common/EmptyState';
import MCQCard from '../components/practice/MCQCard';
import Flashcard from '../components/practice/Flashcard';
import DifficultyBadge from '../components/common/DifficultyBadge';
import CodingProblemCard from '../components/practice/CodingProblemCard';
import SQLPracticeCard from '../components/practice/SQLPracticeCard';

export default function SubjectDetail() {
  const { subject: subjectSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'lessons';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const subjectContent = useMemo(() => getSubjectContent(subjectSlug), [subjectSlug]);
  const progress = useProgress();

  const completedIds = getCompletedTopics();
  const bookmarkIds = getBookmarks();
  const importantIds = getImportantTopics();
  const difficultIds = getDifficultTopics();
  const mcqProgress = getMCQProgress();
  const flashcardProgress = getFlashcardProgress();

  const topics = subjectContent.topics || [];
  const completedInSubject = topics.filter(t => completedIds.includes(t.id)).length;
  const subjectPercent = topics.length > 0 
    ? Math.round((completedInSubject / topics.length) * 100) 
    : 0;

  const filteredTopics = useMemo(() => {
    return topics.filter(topic => {
      if (filterDifficulty !== 'all' && topic.difficulty !== filterDifficulty) return false;
      const isComp = completedIds.includes(topic.id);
      if (filterStatus === 'completed' && !isComp) return false;
      if (filterStatus === 'incomplete' && isComp) return false;
      return true;
    });
  }, [topics, filterDifficulty, filterStatus, completedIds]);

  const handleToggleComplete = (id) => {
    toggleCompletedTopic(id);
    progress.refresh();
  };

  const handleToggleBookmark = (id) => {
    toggleBookmark(id);
    progress.refresh();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleMCQAttempt = (questionId, optionIdx, isCorrect) => {
    saveMCQAttempt(questionId, optionIdx, isCorrect);
    progress.refresh();
  };

  const handleFlashcardStatus = (cardId, status) => {
    setFlashcardStatus(cardId, status);
    progress.refresh();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Back button */}
      <div>
        <Link
          to="/subjects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Subjects</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2.25rem',
          borderLeft: `5px solid ${subjectContent.color}`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ maxWidth: '680px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: subjectContent.color
            }}>
              {subjectContent.category} • MASTER CURRICULUM
            </span>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0' }}>
              {subjectContent.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {subjectContent.description}
            </p>
          </div>

          <div style={{ minWidth: '240px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Curriculum Progress</span>
              <span style={{ color: 'var(--text-primary)' }}>{completedInSubject} of {topics.length} ({subjectPercent}%)</span>
            </div>
            <ProgressBar progress={subjectPercent} height={10} color={subjectContent.color} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.25rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => handleTabChange('lessons')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'lessons' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: activeTab === 'lessons' ? '#ffffff' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'lessons' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <BookOpen size={16} />
            <span>Lessons ({subjectContent.counts.topics})</span>
          </button>

          <button
            onClick={() => handleTabChange('questions')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'questions' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: activeTab === 'questions' ? '#ffffff' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'questions' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <HelpCircle size={16} />
            <span>Interview Q&A ({subjectContent.counts.questions})</span>
          </button>

          <button
            onClick={() => handleTabChange('mcqs')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'mcqs' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: activeTab === 'mcqs' ? '#ffffff' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'mcqs' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Brain size={16} />
            <span>Practice MCQs ({subjectContent.counts.mcqs})</span>
          </button>

          <button
            onClick={() => handleTabChange('flashcards')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'flashcards' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: activeTab === 'flashcards' ? '#ffffff' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === 'flashcards' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Layers size={16} />
            <span>Flashcards ({subjectContent.counts.flashcards})</span>
          </button>

          {(subjectContent.counts.coding > 0 || subjectContent.counts.sql > 0) && (
            <button
              onClick={() => handleTabChange('problems')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'problems' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: activeTab === 'problems' ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === 'problems' ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Code2 size={16} />
              <span>Practice Problems ({subjectContent.counts.coding + subjectContent.counts.sql})</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: LESSONS */}
      {activeTab === 'lessons' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Filter row */}
          {topics.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Filter size={15} />
                <span>Filter:</span>
              </div>

              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.825rem',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.825rem',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed Only</option>
                <option value="incomplete">Incomplete Only</option>
              </select>
            </div>
          )}

          {/* Lessons Grid */}
          {filteredTopics.length === 0 ? (
            <EmptyState
              type="content"
              title={topics.length === 0 ? "No lessons published yet" : "No matching lessons"}
              description={topics.length === 0 
                ? `Study modules for ${subjectContent.title} are being populated. You can still practice interview questions, MCQs, and flashcards using the tabs above.`
                : "No topics match the chosen difficulty or completion filter."}
              actionText={topics.length === 0 ? "Practice Interview Questions" : "Reset Filter"}
              onAction={() => {
                if (topics.length === 0) handleTabChange('questions');
                else {
                  setFilterDifficulty('all');
                  setFilterStatus('all');
                }
              }}
            />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}>
              {filteredTopics.map(topic => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isCompleted={completedIds.includes(topic.id)}
                  isBookmarked={bookmarkIds.includes(topic.id)}
                  isImportant={importantIds.includes(topic.id) || topic.importance === 'high'}
                  isDifficult={difficultIds.includes(topic.id)}
                  onToggleComplete={handleToggleComplete}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INTERVIEW Q&A */}
      {activeTab === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {subjectContent.interviewQuestions.length === 0 ? (
            <EmptyState
              type="content"
              title="No interview questions yet"
              description={`Interview questions for ${subjectContent.title} will appear here.`}
            />
          ) : (
            subjectContent.interviewQuestions.map((q, idx) => {
              const isExpanded = expandedQuestionId === q.id;
              const isBookmarked = bookmarkIds.includes(q.id);

              return (
                <div
                  key={q.id || idx}
                  className="glass-panel"
                  style={{
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                        Q{idx + 1}.
                      </span>
                      <DifficultyBadge difficulty={q.difficulty || 'medium'} />
                      {q.category && (
                        <span style={{
                          fontSize: '0.75rem',
                          background: 'var(--bg-tertiary)',
                          padding: '0.15rem 0.55rem',
                          borderRadius: 'var(--radius-full)',
                          color: 'var(--text-secondary)'
                        }}>
                          {q.category}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleBookmark(q.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isBookmarked ? 'var(--accent-warning)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                      title="Bookmark Question"
                    >
                      <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.45' }}>
                    {q.interviewerPrompt}
                  </h3>

                  {/* Toggle Answer Button */}
                  <button
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.45rem 0.95rem',
                      borderRadius: 'var(--radius-md)',
                      background: isExpanded ? 'var(--accent-primary-light)' : 'var(--bg-tertiary)',
                      color: isExpanded ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginBottom: isExpanded ? '1.25rem' : '0'
                    }}
                  >
                    <span>{isExpanded ? 'Hide Ideal Technical Answer' : 'Reveal Ideal Answer & Key Evaluation Points'}</span>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  {/* Expanded Answer Content */}
                  {isExpanded && (
                    <div style={{
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-success)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                          Ideal Model Answer
                        </h4>
                        <div style={{
                          fontSize: '0.925rem',
                          lineHeight: '1.65',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-code)',
                          padding: '1.15rem',
                          borderRadius: 'var(--radius-md)',
                          whiteSpace: 'pre-line'
                        }}>
                          {q.idealAnswer}
                        </div>
                      </div>

                      {q.keyPoints && q.keyPoints.length > 0 && (
                        <div>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                            Must-Mention Key Points
                          </h4>
                          <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                            {q.keyPoints.map((point, pIdx) => (
                              <li key={pIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {q.expectedConcepts && q.expectedConcepts.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Core Keywords:</span>
                          {q.expectedConcepts.map((kw, kwIdx) => (
                            <span key={kwIdx} style={{
                              fontSize: '0.75rem',
                              padding: '0.15rem 0.55rem',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--accent-primary-light)',
                              color: 'var(--accent-primary)',
                              fontWeight: 600
                            }}>
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 3: PRACTICE MCQS */}
      {activeTab === 'mcqs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {subjectContent.mcqs.length === 0 ? (
            <EmptyState
              type="content"
              title="No MCQs for this subject yet"
              description={`MCQs for ${subjectContent.title} will be available shortly.`}
            />
          ) : (
            subjectContent.mcqs.map((mcq, idx) => (
              <MCQCard
                key={mcq.id || idx}
                question={mcq}
                savedAttempt={mcqProgress.attempted[mcq.id]}
                onAttempt={handleMCQAttempt}
              />
            ))
          )}
        </div>
      )}

      {/* TAB 4: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {subjectContent.flashcards.length === 0 ? (
            <EmptyState
              type="content"
              title="No flashcards for this subject yet"
              description={`Flashcards for ${subjectContent.title} will be available shortly.`}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {subjectContent.flashcards.map((card, idx) => (
                <Flashcard
                  key={card.id || idx}
                  card={card}
                  isKnown={(flashcardProgress.known || []).includes(card.id)}
                  needsRevision={(flashcardProgress.needsRevision || []).includes(card.id)}
                  onStatusChange={(status) => handleFlashcardStatus(card.id, status)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: CODING & SQL PROBLEMS */}
      {activeTab === 'problems' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {subjectContent.codingProblems.map((prob) => (
            <CodingProblemCard key={prob.id} problem={prob} />
          ))}
          {subjectContent.sqlProblems.map((prob) => (
            <SQLPracticeCard key={prob.id} problem={prob} />
          ))}
        </div>
      )}
    </div>
  );
}
