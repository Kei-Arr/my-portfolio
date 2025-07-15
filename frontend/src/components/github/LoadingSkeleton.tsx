import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700/50 overflow-x-auto">
      <div className="text-cream-300 mb-4 text-center">Loading GitHub contributions...</div>

      {/* Month labels*/}
      <div className="flex justify-between mb-3 text-xs text-cream-300/50 min-w-[800px]">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
          <span key={month} className="animate-pulse">{month}</span>
        ))}
      </div>

      {/* Loading grid */}
      <div className="animate-pulse flex gap-[2px] mb-3 min-w-[800px]">
        {Array.from({ length: 53 }, (_, i) => (
          <div key={i} className="flex flex-col gap-[2px]">
            {Array.from({ length: 7 }, (_, j) => (
              <div key={j} className="w-[14px] h-[14px] bg-dark-700 rounded-sm"></div>
            ))}
          </div>
        ))}
      </div>

      
      <div className="flex justify-between items-center text-xs text-cream-300/50 min-w-[800px]">
        <span className="animate-pulse">Loading contributions...</span>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-[10px] h-[10px] rounded-sm bg-dark-700 animate-pulse"></div>
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;