import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: 'teal' | 'blue' | 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'teal', 
  size = 'md', 
  showPercentage = false 
}) => {
  const colorClasses = {
    teal: 'bg-teal-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    red: 'bg-red-600'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className={`w-full bg-slate-200 rounded-full ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
      {showPercentage && (
        <div className="mt-1 text-sm text-slate-600 text-right">
          {clampedProgress}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
