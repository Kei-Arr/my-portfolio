import React from 'react';
import { getAvailableYears } from '@/lib/github';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  loading: boolean;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  onYearChange,
  loading
}) => {
  const availableYears = getAvailableYears();

  return (
    <div className="flex justify-end mt-4 gap-2">
      <div className="flex gap-1 overflow-x-auto max-w-full">

        <button
          onClick={() => onYearChange(0)}
          disabled={loading}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${selectedYear === 0
            ? 'bg-burgundy-500 text-cream-50 hover:bg-burgundy-600'
            : 'bg-transparent border border-dark-600 text-cream-300 hover:bg-dark-700'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Last Year
        </button>


        {availableYears.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            disabled={loading}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${selectedYear === year
              ? 'bg-burgundy-500 text-cream-50 hover:bg-burgundy-600'
              : 'bg-transparent border border-dark-600 text-cream-300 hover:bg-dark-700'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearSelector;