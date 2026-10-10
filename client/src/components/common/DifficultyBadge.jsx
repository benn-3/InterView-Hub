import React from 'react';

export default function DifficultyBadge({ difficulty = 'medium' }) {
  const d = difficulty.toLowerCase();
  let className = 'badge badge-medium';
  if (d === 'easy') className = 'badge badge-easy';
  if (d === 'hard') className = 'badge badge-hard';

  return (
    <span className={className}>
      {difficulty.toUpperCase()}
    </span>
  );
}
