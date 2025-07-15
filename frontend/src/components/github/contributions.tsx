import { useState, useEffect } from 'react';
import {
  fetchPublicGitHubContributions,
  fetchGitHubContributions,
  getContributionColor,
  generateMockContributions
} from '@/lib/github';
import { ContributionGraph, ContributionStats } from './Index';
import type { ContributionDay } from './types';

export default function Graph() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const GITHUB_USERNAME = 'Kei-Arr';
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const USE_GRAPHQL = import.meta.env.VITE_USE_GITHUB_GRAPHQL === 'true';

  useEffect(() => {
    async function loadContributions() {
      setLoading(true);
      setError(null);

      try {
        let data = null;

   
        if (GITHUB_TOKEN && USE_GRAPHQL) {
          data = await fetchGitHubContributions(GITHUB_USERNAME, GITHUB_TOKEN, selectedYear);

          if (data) {
            // Convert GraphQL response
            const contributionData: ContributionDay[] = [];
            let total = data.totalContributions;

            data.weeks.forEach(week => {
              week.contributionDays.forEach(day => {
                contributionData.push({
                  contributionCount: day.contributionCount,
                  date: day.date,
                  color: getContributionColor(day.contributionCount)
                });
              });
            });

            setContributions(contributionData);
            setTotalContributions(total);
            return;
          }
        }

        // Fallback to public API
        data = await fetchPublicGitHubContributions(GITHUB_USERNAME, selectedYear);

        if (data && data.contributions) {
          
          const contributionData: ContributionDay[] = [];
          let total = 0;

          data.contributions.forEach((contribution: any) => {
            const count = contribution.count || 0;
            total += count;
            contributionData.push({
              contributionCount: count,
              date: contribution.date,
              color: getContributionColor(count)
            });
          });

          setContributions(contributionData);
          setTotalContributions(total);
         
        } else {
          throw new Error('No data received from APIs');
        }
      } catch (err) {
        console.error('Failed to load contributions:', err);
        setError(`Failed to load GitHub data for ${selectedYear}`);

        // Fallback to mock data
     
        const mockData = generateMockContributions(selectedYear);
        setContributions(mockData);
        setTotalContributions(mockData.reduce((sum, day) => sum + day.contributionCount, 0));
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
  }, [selectedYear, GITHUB_TOKEN, USE_GRAPHQL]);

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