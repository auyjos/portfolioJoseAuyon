import React from 'react';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  Algorithm:    { bg: 'rgba(102, 126, 234, 0.2)', color: '#667eea' },
  Programming:  { bg: 'rgba(118, 75, 162, 0.2)',  color: '#a78bfa' },
  Cloud:        { bg: 'rgba(6, 182, 212, 0.2)',   color: '#06b6d4' },
  DevOps:       { bg: 'rgba(16, 185, 129, 0.2)',  color: '#10b981' },
  'Soft Skills':{ bg: 'rgba(251, 191, 36, 0.2)',  color: '#f59e0b' },
  Framework:    { bg: 'rgba(239, 68, 68, 0.2)',   color: '#ef4444' },
  Engineering:  { bg: 'rgba(249, 115, 22, 0.2)',  color: '#f97316' },
  Database:     { bg: 'rgba(59, 130, 246, 0.2)',  color: '#3b82f6' },
};

const DEFAULT_COLORS = { bg: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.7)' };

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const colors = CATEGORY_COLORS[category] ?? DEFAULT_COLORS;

  return (
    <span
      className={`category-badge${className ? ` ${className}` : ''}`}
      style={{ backgroundColor: colors.bg, color: colors.color }}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
