import { useState, useEffect } from 'react';
import {
    fetchPublicGitHubContributions,
    fetchGitHubContributions,
    getContributionColor,
    generateMockContributions,
    getAvailableYears
} from '@/lib/github';

interface ContributionDay {
    contributionCount: number;
    date: string;
    color: string;
}

export default function Graph() {
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Replace with your GitHub username
    const GITHUB_USERNAME = 'Kei-Arr';

    // Get environment variables
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    const USE_GRAPHQL = import.meta.env.VITE_USE_GITHUB_GRAPHQL === 'true';

    // Available years for selection
    const availableYears = getAvailableYears();

    useEffect(() => {
        async function loadContributions() {
            setLoading(true);
            setError(null);

            try {
                let data = null;

                // Try GraphQL API first if token is available and enabled
                if (GITHUB_TOKEN && USE_GRAPHQL) {
                    console.log('Using GitHub GraphQL API...');
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
                        console.log(`✅ Loaded ${total} contributions from GraphQL API`);
                        return;
                    }
                }

                // Fallback to public API
                console.log('Using public GitHub API...');
                data = await fetchPublicGitHubContributions(GITHUB_USERNAME, selectedYear);

                if (data && data.contributions) {
                    // Convert public API response
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
                    console.log(`✅ Loaded ${total} contributions from public API`);
                } else {
                    throw new Error('No data received from APIs');
                }
            } catch (err) {
                console.error('Failed to load contributions:', err);
                setError(`Failed to load GitHub data for ${selectedYear}`);

                // Fallback to mock data
                console.log('Using mock data as fallback...');
                const mockData = generateMockContributions(selectedYear);
                setContributions(mockData);
                setTotalContributions(mockData.reduce((sum, day) => sum + day.contributionCount, 0));
            } finally {
                setLoading(false);
            }
        }

        loadContributions();
    }, [selectedYear, GITHUB_TOKEN, USE_GRAPHQL]);

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

                <div className="reveal-up">
                    <div className="bg-dark-800 rounded-2xl p-6 border border-dark-700 max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold text-cream-50 mb-4 font-kurye-italic">
                            GitHub Contribution Graph
                        </h3>

                        {loading && (
                            <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700/50 overflow-x-auto">
                                <div className="text-cream-300 mb-4 text-center">Loading GitHub contributions...</div>

                                {/* Month labels skeleton */}
                                <div className="flex justify-between mb-3 text-xs text-cream-300/50 min-w-[800px]">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                                        <span key={month} className="animate-pulse">{month}</span>
                                    ))}
                                </div>

                                {/* Loading grid skeleton */}
                                <div className="animate-pulse flex gap-[2px] mb-3 min-w-[800px]">
                                    {Array.from({ length: 53 }, (_, i) => (
                                        <div key={i} className="flex flex-col gap-[2px]">
                                            {Array.from({ length: 7 }, (_, j) => (
                                                <div key={j} className="w-[14px] h-[14px] bg-dark-700 rounded-sm"></div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom info skeleton */}
                                <div className="flex justify-between items-center text-xs text-cream-300/50 min-w-[800px]">
                                    <span className="animate-pulse">Loading contributions...</span>
                                    <div className="flex items-center gap-2">
                                        <span>Less</span>
                                        <div className="flex gap-1">
                                            <div className="w-[10px] h-[10px] rounded-sm bg-dark-700 animate-pulse"></div>
                                            <div className="w-[10px] h-[10px] rounded-sm bg-dark-700 animate-pulse"></div>
                                            <div className="w-[10px] h-[10px] rounded-sm bg-dark-700 animate-pulse"></div>
                                            <div className="w-[10px] h-[10px] rounded-sm bg-dark-700 animate-pulse"></div>
                                            <div className="w-[10px] h-[10px] rounded-sm bg-dark-700 animate-pulse"></div>
                                        </div>
                                        <span>More</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-dark-900/50 rounded-xl p-4 border border-red-500/50 text-center">
                                <div className="text-red-400 mb-2">{error}</div>
                                <div className="text-cream-300 text-sm">Showing sample data instead</div>
                            </div>
                        )}

                        {!loading && (
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
                        )}

                        {/* Year selector */}
                        <div className="flex justify-end mt-4 gap-2">
                            <div className="flex gap-1 overflow-x-auto max-w-full">
                                {availableYears.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
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
                    </div>
                </div>

                {/* Additional stats */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 reveal-up max-w-4xl mx-auto">
                    <div className="bg-dark-800 rounded-xl p-4 border border-dark-700 text-center">
                        <div className="text-2xl font-bold text-burgundy-500 mb-1">
                            {loading ? '...' : Math.max(contributions.filter(day => day.contributionCount > 0).length, 365)}
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
                            {loading ? '...' : Math.floor(totalContributions / 52)}
                        </div>
                        <div className="text-cream-300 text-sm font-kurye-italic">Weekly Average</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
