import React, { useState, useMemo } from 'react';
import { ArrowLeft, Layers, CheckCircle2, RefreshCw, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { flashcardsData } from '../data/flashcards';
import { getFlashcardProgress, setFlashcardStatus } from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import Flashcard from '../components/practice/Flashcard';

export default function Flashcards() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const progress = useProgress();
  const fcProgress = getFlashcardProgress();

  const subjects = useMemo(() => {
    return Array.from(new Set(flashcardsData.map(f => f.subject)));
  }, []);

  const filteredCards = useMemo(() => {
    return flashcardsData.filter(card => {
      if (selectedSubject !== 'all' && card.subject !== selectedSubject) return false;
      const isKnown = fcProgress.known.includes(card.id);
      const isRev = fcProgress.needsRevision.includes(card.id);
      if (filterMode === 'known' && !isKnown) return false;
      if (filterMode === 'revision' && !isRev) return false;
      if (filterMode === 'unreviewed' && (isKnown || isRev)) return false;
      return true;
    });
  }, [selectedSubject, filterMode, fcProgress]);

  const handleStatusChange = (cardId, status) => {
    setFlashcardStatus(cardId, status);
    progress.refresh();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Link to="/practice" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Practice Hub
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Interview Flashcards</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Active recall practice for core concepts, OOP definitions, ACID, and architectural principles
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Decks</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{flashcardsData.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>Mastered</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-success)' }}>{fcProgress.known.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-warning)' }}>Needs Revision</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-warning)' }}>{fcProgress.needsRevision.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Filter size={15} />
          <span>Filters:</span>
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem'
          }}
        >
          <option value="all">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={filterMode}
          onChange={(e) => setFilterMode(e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem'
          }}
        >
          <option value="all">All Cards</option>
          <option value="unreviewed">Unreviewed Only</option>
          <option value="revision">Needs Revision Only</option>
          <option value="known">Mastered Only</option>
        </select>
      </div>

      {/* Flashcards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredCards.map(card => (
          <Flashcard
            key={card.id}
            card={card}
            isKnown={fcProgress.known.includes(card.id)}
            needsRevision={fcProgress.needsRevision.includes(card.id)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
