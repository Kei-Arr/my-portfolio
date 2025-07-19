import express from 'express';
import { fetchGitHubContributions, fetchPublicGitHubContributions } from '../services/githubService';
import { getContributionColor, generateFullYearData } from '../utils/githubUtils';
import type { ContributionDay } from '../types/github';

export const getGitHubContributions = async (req: express.Request, res: express.Response) => {
    try {
        const { year } = req.query;
        const targetYear = year ? parseInt(year as string) : undefined;
        const username = 'Kei-Arr';
        const githubToken = process.env.GITHUB_TOKEN;

        let contributionData = null;

        // Try GraphQL API first (requires token)
        if (githubToken) {
            contributionData = await fetchGitHubContributions(username, githubToken, targetYear);

            if (contributionData) {
                // Convert weeks to flat array
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

                // Generate full year data
                const fullYearContributions = generateFullYearData(contributions, targetYear || new Date().getFullYear());

                const displayYear = targetYear || 'last year';

                return res.status(200).json({
                    success: true,
                    data: {
                        contributions: fullYearContributions,
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
            const currentYear = new Date().getFullYear();
            const today = new Date().toISOString().split('T')[0];

            publicData.contributions.forEach((contribution: any) => {
                const contributionDate = contribution.date;

                // For current year, only include dates up to today
                if (targetYear === currentYear && contributionDate > today) {
                    return; // Skip future dates
                }

                const count = contribution.count || 0;
                totalContributions += count;
                contributions.push({
                    contributionCount: count,
                    date: contributionDate,
                    color: getContributionColor(count)
                });
            });

            // Generate full year data
            const fullYearContributions = generateFullYearData(contributions, targetYear || new Date().getFullYear());

            const displayYear = targetYear || 'last year';

            return res.status(200).json({
                success: true,
                data: {
                    contributions: fullYearContributions,
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