import React from 'react';
import { Star } from 'lucide-react';

export default function ImportanceBadge({ importance = 'medium' }) {
  const imp = (importance || 'medium').toLowerCase();
  const isHigh = imp === 'high' || imp === 'must-know';

  return (
    <span className={`badge ${isHigh ? 'badge-high' : 'badge-primary'}`}>
      {isHigh && <Star size={11} fill="currentColor" />}
      {isHigh ? 'MUST KNOW' : 'IMPORTANT'}
    </span>
  );
}
