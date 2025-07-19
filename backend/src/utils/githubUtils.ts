import type { ContributionDay } from '../types/github';

export function getContributionColor(count: number): string {
    if (count === 0) return 'bg-dark-800';
    if (count <= 3) return 'bg-cream-100/20';
    if (count <= 6) return 'bg-cream-100/40';
    if (count <= 9) return 'bg-cream-100/70';
    return 'bg-cream-100';
}

export function generateFullYearData(contributions: ContributionDay[], year: number): ContributionDay[] {
    const currentYear = new Date().getFullYear();
    const today = new Date();

    if (year < currentYear) {
        return contributions;
    }

    const fullYearData: ContributionDay[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const contributionMap = new Map<string, ContributionDay>();
    contributions.forEach(contrib => {
        contributionMap.set(contrib.date, contrib);
    });

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const isFutureDate = currentDate > today;

        if (contributionMap.has(dateStr) && !isFutureDate) {
            fullYearData.push(contributionMap.get(dateStr)!);
        } else {
            fullYearData.push({
                contributionCount: 0,
                date: dateStr,
                color: getContributionColor(0)
            });
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return fullYearData;
} 