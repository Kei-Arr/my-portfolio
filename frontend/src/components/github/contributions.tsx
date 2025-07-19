import { useState, useEffect } from 'react';
import {
  fetchGitHubContributions,
  generateMockContributions
} from '@/lib/github';
import { ContributionGraph, ContributionStats } from './Index';
import type { ContributionDay } from './types';

export default function Graph() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(2025);


  useEffect(() => {
    async function loadContributions() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchGitHubContributions(selectedYear);

        if (data) {
          // Convert backend response
          const contributionData: ContributionDay[] = [];
          let total = data.totalContributions;

          data.weeks.forEach(week => {
            week.contributionDays.forEach(day => {
              contributionData.push({
                contributionCount: day.contributionCount,
                date: day.date,
                color: day.color
              });
            });
          });

          setContributions(contributionData);
          setTotalContributions(total);
        } else {
          throw new Error('No data received from backend');
        }
      } catch (err: any) {
        console.error('Failed to load contributions:', err);
        console.log(`⚠️ Frontend: Falling back to mock data for year ${selectedYear}`);
        setError(`Failed to load GitHub data for ${selectedYear}`);

        // Fallback to mock data
        const mockData = generateMockContributions(selectedYear);
        console.log(`🎭 Frontend: Generated ${mockData.length} mock days`);
        console.log(`📅 Frontend: Mock date range: ${mockData[0]?.date} to ${mockData[mockData.length - 1]?.date}`);
        setContributions(mockData);
        setTotalContributions(mockData.reduce((sum, day) => sum + day.contributionCount, 0));
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
  }, [selectedYear]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <section className="w-full relative overflow-hidden bg-dark-900 py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-burgundy-500 mb-4 font-kurye-italic">
            GitHub Activity
          </h2>
          <p className="text-cream-300 text-lg font-kurye-italic max-w-2xl mx-auto">
            My coding journey visualized through contributions
          </p>
        </div>

        <ContributionGraph
          contributions={contributions}
          totalContributions={totalContributions}
          loading={loading}
          error={error}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />

        <ContributionStats
          contributions={contributions}
          totalContributions={totalContributions}
          loading={loading}
        />
      </div>
    </section>
  );
}