import express from 'express';

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

// Helper function to get color based on contribution count
function getContributionColor(count: number): string {
    if (count === 0) return 'bg-dark-800';
    if (count <= 3) return 'bg-cream-100/20';
    if (count <= 6) return 'bg-cream-100/40';
    if (count <= 9) return 'bg-cream-100/70';
    return 'bg-cream-100';
}

async function fetchGitHubContributions(
    username: string,
    token: string,
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
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query,
                variables: { username, from, to }
            }),
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json() as GitHubContributionResponse;

        if (data.data?.user?.contributionsCollection?.contributionCalendar) {
            return data.data.user.contributionsCollection.contributionCalendar;
        }

        throw new Error('Invalid response structure');
    } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        return null;
    }
}

// Fallback: Public API without authentication
async function fetchPublicGitHubContributions(username: string, year?: number): Promise<any> {
    try {
        const targetYear = year || new Date().getFullYear();
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

export const getGitHubContributions = async (req: express.Request, res: express.Response) => {
    try {
        const { year } = req.query;
        const targetYear = year ? parseInt(year as string) : new Date().getFullYear();
        const username = 'Kei-Arr';

        const githubToken = process.env.GITHUB_TOKEN;

        let contributionData = null;

        // Try GraphQL API first if token is available
        if (githubToken) {
            contributionData = await fetchGitHubContributions(username, githubToken, targetYear);

            if (contributionData) {
                // Convert GraphQL response to frontend format
                const contributions: ContributionDay[] = [];

                contributionData.weeks.forEach(week => {
                    week.contributionDays.forEach(day => {
                        contributions.push({
                            contributionCount: day.contributionCount,
                            date: day.date,
                            color: getContributionColor(day.contributionCount)
                        });
                    });
                });

                return res.status(200).json({
                    success: true,
                    data: {
                        contributions,
                        totalContributions: contributionData.totalContributions,
                        year: targetYear,
                        source: 'graphql'
                    }
                });
            }
        }

        // Fallback to public API
        const publicData = await fetchPublicGitHubContributions(username, targetYear);

        if (publicData && publicData.contributions) {
            const contributions: ContributionDay[] = [];
            let totalContributions = 0;

            publicData.contributions.forEach((contribution: any) => {
                const count = contribution.count || 0;
                totalContributions += count;
                contributions.push({
                    contributionCount: count,
                    date: contribution.date,
                    color: getContributionColor(count)
                });
            });

            return res.status(200).json({
                success: true,
                data: {
                    contributions,
                    totalContributions,
                    year: targetYear,
                    source: 'public'
                }
            });
        }

        throw new Error('No data available from any source');

    } catch (error) {
        console.error('GitHub contributions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch GitHub contributions',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}; 