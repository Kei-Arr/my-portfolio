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

interface GitHubContributionResponse {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: ContributionCalendar;
            };
        };
    };
}

export async function fetchGitHubContributions(
    username: string,
    token?: string,
    year?: number
): Promise<ContributionCalendar | null> {
    const currentYear = year || new Date().getFullYear();
    const from = `${currentYear}-01-01T00:00:00Z`;
    const to = `${currentYear}-12-31T23:59:59Z`;

    const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({
                query,
                variables: { username, from, to }
            }),
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data: GitHubContributionResponse = await response.json();

        if (data.data?.user?.contributionsCollection?.contributionCalendar) {
            return data.data.user.contributionsCollection.contributionCalendar;
        }

        throw new Error('Invalid response structure');
    } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        return null;
    }
}

// Alternative: Public API without authentication (less reliable)
export async function fetchPublicGitHubContributions(username: string, year?: number): Promise<any> {
    try {
        const targetYear = year || new Date().getFullYear();
        // Using a third-party service that scrapes GitHub's public contribution graph
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${targetYear}`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
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