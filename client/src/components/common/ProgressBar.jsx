import React from 'react';

export default function ProgressBar({
  progress = 0,
  height = 8,
  color = 'var(--accent-primary)',
  showLabel = false,
  animated = false
}) {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.35rem',
          fontWeight: 500
        }}>
          <span>Progress</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{clamped}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative'
        }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            background: color,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: clamped > 0 ? `0 0 10px ${color}` : 'none'
          }}
        />
      </div>
    </div>
  );
}
