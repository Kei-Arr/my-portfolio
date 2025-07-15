import React from 'react';
import type { ContributionDay } from './types';

interface ContributionGridProps {
  contributions: ContributionDay[];
  totalContributions: number;
  selectedYear: number;
}

const ContributionGrid: React.FC<ContributionGridProps> = ({ 
  contributions, 
  totalContributions, 
  selectedYear 
}) => {
  // Group contributions by weeks (7 days each)
  const groupContributionsByWeeks = (contributions: ContributionDay[]) => {
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7));
    }
    return weeks;
  };

  const weeks = groupContributionsByWeeks(contributions);

  return (
    <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700/50 overflow-x-auto">
      {/* Month labels */}
      <div className="flex justify-between mb-3 text-xs text-cream-300 min-w-[800px]">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>

      {/* Contribution grid */}
      <div className="flex gap-[2px] mb-3 min-w-[800px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-[14px] h-[14px] rounded-sm ${day.color} border border-gray-700/30 hover:ring-1 hover:ring-burgundy-400 transition-all duration-200 cursor-pointer`}
                title={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom info */}
      <div className="flex justify-between items-center text-xs text-cream-300 min-w-[800px]">
        <span className="font-medium">
          {totalContributions.toLocaleString()} contributions in {selectedYear}
        </span>

        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[10px] h-[10px] rounded-sm bg-dark-800 border border-dark-700/30"></div>
            <div className="w-[10px] h-[10px] rounded-sm bg-cream-100/20 border border-dark-700/30"></div>
            <div className="w-[10px] h-[10px] rounded-sm bg-cream-100/40 border border-dark-700/30"></div>
            <div className="w-[10px] h-[10px] rounded-sm bg-cream-100/70 border border-dark-700/30"></div>
            <div className="w-[10px] h-[10px] rounded-sm bg-cream-100 border border-dark-700/30"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGrid;