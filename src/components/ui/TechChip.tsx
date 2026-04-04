import React from 'react';

interface TechChipProps {
  label: string;
  className?: string;
}

const TechChip: React.FC<TechChipProps> = ({ label, className = '' }) => {
  return (
    <span className={`tech-chip${className ? ` ${className}` : ''}`}>
      {label}
    </span>
  );
};

export default TechChip;
