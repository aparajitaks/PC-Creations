import React from 'react';
import { Star } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#fbbf24', fontWeight: '700' }}>
          <Star size={14} fill="#fbbf24" /> 4.9 Star Rating on Google Reviews
        </span>
        <span>•</span>
        <span>Bangalore’s Premier AI & Creative Marketing Agency</span>
        <span>•</span>
        <a 
          href="https://share.google/nDXFKdY4OcAeUelra" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Verified Reviews &rarr;
        </a>
      </div>
    </div>
  );
}
