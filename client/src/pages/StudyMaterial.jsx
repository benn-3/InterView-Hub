import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Star,
  AlertTriangle,
  FileEdit,
  Save,
  ChevronRight,
  ChevronLeft,
  List,
  Sparkles,
  BookOpen,
  HelpCircle,
  Brain,
  Layers
} from 'lucide-react';
import { getTopicById, getNextPreviousTopic, allMarkdownTopics, toSlug, getSubjectContent } from '../contentRegistry';
import {
  saveRecentTopic,
  getCompletedTopics,
  toggleCompletedTopic,
  getBookmarks,
  toggleBookmark,
  getImportantTopics,
  toggleImportantTopic,
  getDifficultTopics,
  toggleDifficultTopic,
  getNoteForTopic,
  setNote
} from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import MarkdownViewer from '../components/markdown/MarkdownViewer';
import TableOfContents from '../components/markdown/TableOfContents';
import DifficultyBadge from '../components/common/DifficultyBadge';
import ImportanceBadge from '../components/common/ImportanceBadge';
import EmptyState from '../components/common/EmptyState';

export default function StudyMaterial() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const progress = useProgress();

  const topic = useMemo(() => {
    return getTopicById(topicId) || allMarkdownTopics[0];
  }, [topicId]);

  // Sidebar topics in the same subject
  const subjectContent = useMemo(() => {
    if (!topic) return null;
    return getSubjectContent(topic.subjectId || topic.subject);
  }, [topic]);

  const subjectTopics = useMemo(() => {
    return subjectContent ? subjectContent.topics : [];
  }, [subjectContent]);

  const { prev: prevTopic, next: nextTopic } = useMemo(() => {
    if (!topic) return { prev: null, next: null };
    return getNextPreviousTopic(topic.id);
  }, [topic]);

  // Reactive study states
  const completedIds = getCompletedTopics();
  const bookmarkIds = getBookmarks();
  const importantIds = getImportantTopics();
  const difficultIds = getDifficultTopics();

  const isCompleted = topic ? completedIds.includes(topic.id) : false;
  const isBookmarked = topic ? bookmarkIds.includes(topic.id) : false;
  const isImportant = topic ? (importantIds.includes(topic.id) || topic.importance === 'high') : false;
  const isDifficult = topic ? difficultIds.includes(topic.id) : false;

  // Personal Notes state
  const [noteContent, setNoteContent] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteSavedMessage, setNoteSavedMessage] = useState(false);

  // Track as recently studied when opened
  useEffect(() => {
    if (topic) {
      saveRecentTopic(topic);
      setNoteContent(getNoteForTopic(topic.id));
      window.scrollTo(0, 0);
    }
  }, [topic]);

  if (!topic) {
    return (
      <EmptyState
        type="content"
        title="Topic not found"
        description="The requested interview topic could not be located."
        actionText="Browse Subjects"
        actionLink="/subjects"
      />
    );
  }

  const handleToggleComplete = () => {
    toggleCompletedTopic(topic.id);
    progress.refresh();
  };

  const handleToggleBookmark = () => {
    toggleBookmark(topic.id);
    progress.refresh();
  };

  const handleToggleImportant = () => {
    toggleImportantTopic(topic.id);
    progress.refresh();
  };

  const handleToggleDifficult = () => {
    toggleDifficultTopic(topic.id);
    progress.refresh();
  };

  const handleSaveNote = () => {
    setNote(topic.id, noteContent);
    setNoteSavedMessage(true);
    setTimeout(() => setNoteSavedMessage(false), 2000);
    setIsEditingNote(false);
  };

  const subjectSlug = subjectContent ? subjectContent.slug : toSlug(topic.subject);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '260px minmax(0, 1fr) 250px',
      gap: '2rem',
      alignItems: 'flex-start',
      position: 'relative'
    }}>
      {/* LEFT COLUMN: Subject Topic Navigation */}
      <aside
        style={{
          position: 'sticky',
          top: 'calc(var(--header-height) + 1.5rem)',
          maxHeight: 'calc(100vh - var(--header-height) - 3rem)',
          overflowY: 'auto',
          padding: '1.25rem 1rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
        className="study-left-sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <BookOpen size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {topic.subject}
            </span>
          </div>
          <Link
            to={`/subjects/${subjectSlug}`}
            style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 600 }}
          >
            Subject Hub
          </Link>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {subjectTopics.map((st) => {
            const isCurrent = st.id === topic.id;
            const completed = completedIds.includes(st.id);

            return (
              <Link
                key={st.id}
                to={`/topic/${st.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.65rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCurrent ? 'var(--accent-primary-light)' : 'transparent',
                  color: isCurrent ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: isCurrent ? 700 : 500,
                  fontSize: '0.825rem',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, overflow: 'hidden' }}>
                  {completed ? (
                    <CheckCircle2 size={14} color="var(--accent-success)" style={{ flexShrink: 0 }} />
                  ) : (
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isCurrent ? 'var(--accent-primary)' : 'var(--border-light)', flexShrink: 0 }} />
                  )}
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {st.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* CENTER COLUMN: Main Content & Controls */}
      <section style={{ minWidth: 0 }}>
        {/* Breadcrumb row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
          <Link to="/subjects" style={{ color: 'var(--text-muted)' }}>Subjects</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link to={`/subjects/${subjectSlug}`} style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>{topic.subject}</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{topic.title}</span>
        </div>

        {/* TOPIC HEADER & STUDY CONTROLS */}
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            marginBottom: '2rem',
            position: 'sticky',
            top: 'calc(var(--header-height) + 0.5rem)',
            zIndex: 40,
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <DifficultyBadge difficulty={topic.difficulty} />
              <ImportanceBadge importance={topic.importance} />
              <span className={`badge ${isCompleted ? 'badge-easy' : 'badge-primary'}`}>
                {isCompleted ? 'STATUS: COMPLETED' : 'STATUS: IN PROGRESS'}
              </span>
            </div>

            {/* Action Buttons: [Mark Complete], [Bookmark], [Important], [Difficult] */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleToggleComplete}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isCompleted ? 'var(--accent-success-light)' : 'var(--bg-tertiary)',
                  color: isCompleted ? 'var(--accent-success)' : 'var(--text-secondary)',
                  border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)'}`,
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <CheckCircle2 size={15} />
                <span>{isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
              </button>

              <button
                onClick={handleToggleBookmark}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isBookmarked ? 'var(--accent-warning-light)' : 'var(--bg-tertiary)',
                  color: isBookmarked ? 'var(--accent-warning)' : 'var(--text-secondary)',
                  border: `1px solid ${isBookmarked ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)'}`,
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              <button
                onClick={handleToggleImportant}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isImportant ? 'var(--accent-important-light)' : 'var(--bg-tertiary)',
                  color: isImportant ? 'var(--accent-important)' : 'var(--text-secondary)',
                  border: `1px solid ${isImportant ? 'rgba(236, 72, 153, 0.4)' : 'var(--border-color)'}`,
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Star size={15} fill={isImportant ? 'currentColor' : 'none'} />
                <span>{isImportant ? 'Important ⭐' : 'Important'}</span>
              </button>

              <button
                onClick={handleToggleDifficult}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: isDifficult ? 'var(--accent-danger-light)' : 'var(--bg-tertiary)',
                  color: isDifficult ? 'var(--accent-danger)' : 'var(--text-secondary)',
                  border: `1px solid ${isDifficult ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-color)'}`,
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <AlertTriangle size={15} />
                <span>{isDifficult ? 'Difficult ⚠' : 'Difficult'}</span>
              </button>
            </div>
          </div>

          {/* Tags */}
          {topic.tags && topic.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {topic.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.15rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
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

        {/* Markdown Rendered Content */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <MarkdownViewer content={topic.markdown} />
        </div>

        {/* SEQUENTIAL LESSON NAVIGATION (Previous / Next) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {prevTopic ? (
            <Link
              to={`/topic/${prevTopic.id}`}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--border-color)'
              }}
            >
              <ChevronLeft size={20} color="var(--accent-primary)" />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Previous Lesson
                </span>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {prevTopic.title}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              to={`/subjects/${subjectSlug}`}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--border-color)'
              }}
            >
              <ArrowLeft size={18} color="var(--text-muted)" />
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Curriculum Hub
                </span>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Back to {topic.subject}
                </div>
              </div>
            </Link>
          )}

          {nextTopic ? (
            <Link
              to={`/topic/${nextTopic.id}`}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                textAlign: 'right',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--border-color)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Next Lesson
                </span>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {nextTopic.title}
                </div>
              </div>
              <ChevronRight size={20} color="var(--accent-primary)" />
            </Link>
          ) : (
            <Link
              to={`/subjects/${subjectSlug}?tab=questions`}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                textAlign: 'right',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid var(--border-color)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-success)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Course Completed!
                </span>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Practice Subject Q&A →
                </div>
              </div>
              <ChevronRight size={20} color="var(--accent-success)" />
            </Link>
          )}
        </div>

        {/* RELATED INTERVIEW PRACTICE SECTION */}
        {subjectContent && (
          <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🎯 Test Your Understanding of {topic.subject}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Reinforce the concepts from this study material with real interview questions, MCQs, and flashcard drills.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <Link
                to={`/subjects/${subjectSlug}?tab=questions`}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <HelpCircle size={16} /> Interview Questions
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {subjectContent.counts.questions} technical Q&A with model answers
                </span>
              </Link>

              <Link
                to={`/subjects/${subjectSlug}?tab=mcqs`}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-secondary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Brain size={16} /> Interactive MCQs
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {subjectContent.counts.mcqs} timed practice questions with explanations
                </span>
              </Link>

              <Link
                to={`/subjects/${subjectSlug}?tab=flashcards`}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-warning)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Layers size={16} /> Rapid Flashcards
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {subjectContent.counts.flashcards} quick flip memory recall cards
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* PERSONAL NOTES SECTION */}
        <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileEdit size={18} color="var(--accent-warning)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                My Personal Topic Notes
              </h3>
            </div>
            {noteSavedMessage && (
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-success)', fontWeight: 600 }}>
                Notes saved to LocalStorage ✓
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Write down interview tips, mnemonics, or tricky traps for this topic. Persisted automatically in your browser.
          </p>

          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Example: '2NF removes partial dependency. 3NF removes transitive dependency...'"
            rows={4}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-code)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              outline: 'none',
              resize: 'vertical',
              marginBottom: '0.75rem'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSaveNote}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Save size={15} />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </section>

      {/* RIGHT COLUMN: Automatically generated Sticky Table of Contents */}
      <TableOfContents headings={topic.headings} />
    </div>
  );
}
