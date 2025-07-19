import type {
    ContributionDay,
    ContributionWeek,
    ContributionCalendar,
    GitHubContributionResponse
} from '../types/github';

export async function fetchGitHubContributions(
    username: string,
    token: string,
    year?: number
): Promise<ContributionCalendar | null> {
    let from: string;
    let to: string;

    if (year) {
        const currentYear = new Date().getFullYear();
        from = `${year}-01-01T00:00:00Z`;

        if (year === currentYear) {
            to = new Date().toISOString();
        } else {
            to = `${year}-12-31T23:59:59Z`;
        }
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

export async function fetchPublicGitHubContributions(username: string, year?: number): Promise<any> {
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