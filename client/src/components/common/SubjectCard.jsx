import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers, BookOpen, Brain, HelpCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { getSubjectMeta } from '../../utils/helpers';

export default function SubjectCard({ subject, progress = 0, completedCount = 0 }) {
  const subjectName = subject.title || subject.name;
  const slug = subject.slug || subject.id;
  const meta = getSubjectMeta(subjectName);
  
  const topicCount = subject.counts?.topics ?? subject.topicCount ?? 0;
  const questionCount = subject.counts?.questions ?? 0;
  const mcqCount = subject.counts?.mcqs ?? 0;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
      }}
    >
      {/* Subject accent top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: meta.color
        }}
      />

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div
            style={{
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              background: meta.bg,
              color: meta.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Layers size={22} />
          </div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-muted)'
          }}>
            {completedCount} / {topicCount} Lessons
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.35rem' }}>
          {subjectName}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          marginBottom: '1rem',
          lineHeight: '1.45',
          minHeight: '2.5rem'
        }}>
          {subject.description || (
            subject.categories && subject.categories.length > 0 
              ? subject.categories.slice(0, 3).join(' • ') 
              : 'Technical preparation & core interview notes'
          )}
        </p>

        {/* Content pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.25rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'var(--bg-tertiary)',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            <BookOpen size={12} /> {topicCount} Lessons
          </span>
          {questionCount > 0 && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'var(--bg-tertiary)',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <HelpCircle size={12} /> {questionCount} Q&As
            </span>
          )}
          {mcqCount > 0 && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'var(--bg-tertiary)',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <Brain size={12} /> {mcqCount} MCQs
            </span>
          )}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <ProgressBar progress={progress} color={meta.color} showLabel={true} />
        </div>

        <Link
          to={`/subjects/${slug}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.65rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            fontWeight: 600,
            border: '1px solid var(--border-color)',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = meta.color;
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-tertiary)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <span>Explore Curriculum</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
