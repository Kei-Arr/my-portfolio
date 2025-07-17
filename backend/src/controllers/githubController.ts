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
    let from: string;
    let to: string;

    if (year && year !== new Date().getFullYear()) {
        from = `${year}-01-01T00:00:00Z`;
        to = `${year}-12-31T23:59:59Z`;
    } else {
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        from = oneYearAgo.toISOString();
        to = today.toISOString();
    }

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

// Fallback API
async function fetchPublicGitHubContributions(username: string, year?: number): Promise<any> {
    try {
        let targetYear: number;

        if (year && year !== new Date().getFullYear()) {
            targetYear = year;
        } else {

            targetYear = new Date().getFullYear();
        }

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
        const targetYear = year ? parseInt(year as string) : undefined;
        const username = 'Kei-Arr';
        const githubToken = process.env.GITHUB_TOKEN;

        let contributionData = null;


        if (githubToken) {
            contributionData = await fetchGitHubContributions(username, githubToken, targetYear);

            if (contributionData) {

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

                const displayYear = targetYear || 'last year';

                return res.status(200).json({
                    success: true,
                    data: {
                        contributions,
                        totalContributions: contributionData.totalContributions,
                        year: displayYear,
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

            const displayYear = targetYear || 'last year';

            return res.status(200).json({
                success: true,
                data: {
                    contributions,
                    totalContributions,
                    year: displayYear,
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