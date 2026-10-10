import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Star,
  CheckCircle2,
  BookOpen,
  Code2,
  Database,
  ArrowRight,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { allTopics } from '../utils/markdownLoader';
import { sqlProblemsData } from '../data/sqlProblems';
import { codingProblemsData } from '../data/codingProblems';
import { interviewQuestionsData } from '../data/interviewQuestions';
import CodeBlock from '../components/markdown/CodeBlock';
import DifficultyBadge from '../components/common/DifficultyBadge';

export default function RevisionMode() {
  const [activeTab, setActiveTab] = useState('must-know');

  // Topics with importance: high or must-know
  const highPriorityTopics = useMemo(() => {
    return allTopics.filter(t => t.importance === 'high');
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2.25rem',
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <Zap size={28} color="var(--accent-important)" fill="currentColor" />
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800 }}>LAST-MINUTE REVISION</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '720px' }}>
          High-yield summary extracted from Markdown metadata (<code>importance: high</code>), curated for the final 24 hours before your technical interview.
        </p>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginTop: '1.75rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1rem'
        }}>
          {[
            { id: 'must-know', label: 'MUST KNOW TOPICS' },
            { id: 'differences', label: 'IMPORTANT DIFFERENCES' },
            { id: 'questions', label: 'COMMON QUESTIONS' },
            { id: 'code', label: 'IMPORTANT CODE' },
            { id: 'sql', label: 'IMPORTANT SQL QUERIES' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: activeTab === tab.id ? 'var(--accent-important)' : 'var(--bg-card)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.825rem',
                border: '1px solid var(--border-color)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: MUST KNOW */}
      {activeTab === 'must-know' && (
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={20} color="var(--accent-warning)" fill="currentColor" />
            <span>High-Yield Study Topics ({highPriorityTopics.length})</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}>
            {highPriorityTopics.map(topic => (
              <div
                key={topic.id}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: '3px solid var(--accent-important)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                      {topic.subject}
                    </span>
                    <DifficultyBadge difficulty={topic.difficulty} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {topic.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineClamp: 2 }}>
                    {topic.markdown.slice(0, 110)}...
                  </p>
                </div>

                <Link
                  to={`/topic/${topic.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-important)'
                  }}
                >
                  <span>Quick Read</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: IMPORTANT DIFFERENCES */}
      {activeTab === 'differences' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              1. Method Overloading vs Method Overriding
            </h3>
            <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem' }}>Property</th>
                  <th style={{ padding: '0.75rem' }}>Overloading (Static)</th>
                  <th style={{ padding: '0.75rem' }}>Overriding (Dynamic)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Resolution Time</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Compile-time</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Runtime (Dynamic Dispatch)</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Scope</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Same class</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Parent and child subclass</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Method Signature</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Must differ in parameters</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Must be identical</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              2. Abstract Class vs Interface (Java 8+)
            </h3>
            <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem' }}>Feature</th>
                  <th style={{ padding: '0.75rem' }}>Abstract Class</th>
                  <th style={{ padding: '0.75rem' }}>Interface</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Inheritance</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Single inheritance only</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Multiple interfaces can be implemented</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>State & Variables</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Instance variables allowed</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Only public static final constants</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>Constructors</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Can have constructors</td>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Cannot have constructors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: COMMON & TRICKY QUESTIONS */}
      {activeTab === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {interviewQuestionsData.map((q) => (
            <div key={q.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {q.subject}
                </span>
                <span style={{ color: 'var(--border-light)' }}>•</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.category}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                {q.interviewerPrompt}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {q.idealAnswer}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: IMPORTANT CODE */}
      {activeTab === 'code' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {codingProblemsData.slice(0, 3).map((p) => (
            <div key={p.id} className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{p.title}</h3>
                <DifficultyBadge difficulty={p.difficulty} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {p.expectedApproach}
              </p>
              <CodeBlock language="java" value={p.solution} />
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: IMPORTANT SQL QUERIES */}
      {activeTab === 'sql' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {sqlProblemsData.map((s) => (
            <div key={s.id} className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{s.title}</h3>
                <DifficultyBadge difficulty={s.difficulty} />
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                {s.question}
              </p>
              <CodeBlock language="sql" value={s.expectedQuery} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
