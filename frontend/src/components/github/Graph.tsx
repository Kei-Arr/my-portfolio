import React from 'react';
import type { ContributionDay } from './types';
import ContributionGrid from './ContributionGrid';
import YearSelector from './YearSelector';
import LoadingSkeleton from './LoadingSkeleton';

interface ContributionGraphProps {
  contributions: ContributionDay[];
  totalContributions: number;
  loading: boolean;
  error: string | null;
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions,
  totalContributions,
  loading,
  error,
  selectedYear,
  onYearChange
}) => {
  return (
    <div className="reveal-up">
      <div className="bg-dark-800 rounded-2xl p-6 border border-dark-700 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-cream-50 mb-4 font-kurye-italic">
          GitHub Contribution Graph
        </h3>

        {loading && <LoadingSkeleton />}

        {error && (
          <div className="bg-dark-900/50 rounded-xl p-4 border border-red-500/50 text-center">
            <div className="text-red-400 mb-2">{error}</div>
            <div className="text-cream-300 text-sm">Showing sample data instead</div>
          </div>
        )}

        {!loading && (
          <ContributionGrid
            contributions={contributions}
            totalContributions={totalContributions}
            selectedYear={selectedYear}
          />
        )}

        <YearSelector
          selectedYear={selectedYear}
          onYearChange={onYearChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ContributionGraph;