import React from 'react';
import type { ContributionDay } from './types';

interface ContributionStatsProps {
  contributions: ContributionDay[];
  totalContributions: number;
  loading: boolean;
}

const ContributionStats: React.FC<ContributionStatsProps> = ({ 
  contributions, 
  totalContributions, 
  loading 
}) => {
  const activeDays = contributions.filter(day => day.contributionCount > 0).length;
  const weeklyAverage = Math.floor(totalContributions / 52);

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 reveal-up max-w-4xl mx-auto">
      <div className="bg-dark-800 rounded-xl p-4 border border-dark-700 text-center">
        <div className="text-2xl font-bold text-burgundy-500 mb-1">
          {loading ? '...' : activeDays}
        </div>
        <div className="text-cream-300 text-sm font-kurye-italic">Days of Code</div>
      </div>
      <div className="bg-dark-800 rounded-xl p-4 border border-dark-700 text-center">
        <div className="text-2xl font-bold text-burgundy-500 mb-1">
          {loading ? '...' : totalContributions.toLocaleString()}
        </div>
        <div className="text-cream-300 text-sm font-kurye-italic">Contributions</div>
      </div>
      <div className="bg-dark-800 rounded-xl p-4 border border-dark-700 text-center">
        <div className="text-2xl font-bold text-burgundy-500 mb-1">
          {loading ? '...' : weeklyAverage}
        </div>
        <div className="text-cream-300 text-sm font-kurye-italic">Weekly Average</div>
      </div>
    </div>
  );
};

export default ContributionStats;
