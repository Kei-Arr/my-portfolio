interface ContributionDay {
    contributionCount: number;
    date: string;
    color: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

interface BackendGitHubResponse {
    success: boolean;
    data: {
        contributions: ContributionDay[];
        totalContributions: number;
        year: number;
        source: string;
    };
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchGitHubContributions(
    year?: number
): Promise<ContributionCalendar | null> {
    try {
        const targetYear = year || new Date().getFullYear();
        const response = await fetch(`${API_BASE_URL}api/github/contributions?year=${targetYear}`);

        if (!response.ok) {
            throw new Error(`Backend API error: ${response.status}`);
        }

        const result: BackendGitHubResponse = await response.json();

        if (result.success && result.data) {
            // Convert backend response to the format expected by the frontend
            const weeks: ContributionWeek[] = [];
            const contributions = result.data.contributions;

            // Group contributions by weeks (7 days each)
            for (let i = 0; i < contributions.length; i += 7) {
                weeks.push({
                    contributionDays: contributions.slice(i, i + 7)
                });
            }

            return {
                totalContributions: result.data.totalContributions,
                weeks
            };
        }

        throw new Error('Invalid backend response');
    } catch (error) {
        console.error('Error fetching GitHub contributions from backend:', error);
        return null;
    }
}

// Keep the public API as backup (though it's now handled by backend)
export async function fetchPublicGitHubContributions( year?: number): Promise<any> {
    try {
        const targetYear = year || new Date().getFullYear();
        const response = await fetch(`${API_BASE_URL}api/github/contributions?year=${targetYear}`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result: BackendGitHubResponse = await response.json();

        if (result.success) {
            // Transform to match expected format
            return {
                contributions: result.data.contributions.map(day => ({
                    count: day.contributionCount,
                    date: day.date
                }))
            };
        }

        throw new Error('Backend API error');
    } catch (error) {
        console.error('Error fetching public GitHub contributions:', error);
        return null;
    }
}

// Helper function to get color based on contribution count
export function getContributionColor(count: number): string {
    if (count === 0) return 'bg-dark-800';
    if (count <= 3) return 'bg-cream-100/20';
    if (count <= 6) return 'bg-cream-100/40';
    if (count <= 9) return 'bg-cream-100/70';
    return 'bg-cream-100';
}

// Generate mock data for development/fallback
export function generateMockContributions(year?: number): ContributionDay[] {
    const contributions: ContributionDay[] = [];
    const targetYear = year || new Date().getFullYear();
    const startDate = new Date(targetYear, 0, 1);
    const endDate = new Date(targetYear, 11, 31);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const count = Math.floor(Math.random() * 12);
        contributions.push({
            contributionCount: count,
            date: currentDate.toISOString().split('T')[0],
            color: getContributionColor(count)
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return contributions;
}

// Helper function to get available years for selection
export function getAvailableYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const years: number[] = [];

    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    return years;
} 