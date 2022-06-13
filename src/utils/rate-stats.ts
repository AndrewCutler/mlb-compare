import { IPlayerData, ISelectionPlayer, IStats } from '../models/api.models';

export const buildRateStats = (playerData: ISelectionPlayer): ISelectionPlayer => {
	const withBattingAverageYearly = appendYearlyBattingAverage(playerData);
	// const withCareer = calculateCareerStats(withBattingAverageYearly);

	// return withCareer;
	return withBattingAverageYearly;
}

// const calculateCareerStats = (playerData: ISelectionPlayer): ISelectionPlayer => {
// 	const stats = [calculateCareerBattingAverage(playerData)];

// 	return {
// 		...playerData,
// 		Data: [
// 			...playerData.Data,
// 			{ Year: 'Career', Stats: {...playerData.Data.Stats, calculateCareerBattingAverage(playerData) }
// 		]
// 	}
// }

const appendYearlyBattingAverage = (playerData: ISelectionPlayer): ISelectionPlayer => {
	for (let year of playerData.Data) {
		year = {
			...year, Stats: {
				...year.Stats, 'BattingAverage': buildYearlyBattingAverage(year)
			}
		};
	}
	return playerData;
}

const calculateCareerBattingAverage = (playerData: ISelectionPlayer): IStats => {
	const hitsTotal: number = playerData.Data.reduce((prev, curr) => {
		return prev = prev + getStatValue(curr.Stats, 'Hits');
	}, 0);
	const atBatsTotal: number = playerData.Data.reduce((prev, curr) => {
		return prev = prev + getStatValue(curr.Stats, 'AtBats');
	}, 0);

	return { 'BattingAverage': calculateBattingAverage(hitsTotal, atBatsTotal) }
}

const getStatValue = (stats: IStats, statName: string): number => Number(stats[statName]);

const calculateBattingAverage = (hits: number, atBats: number): number => parseFloat((hits / atBats).toFixed(3));

const buildYearlyBattingAverage = (data: IPlayerData): number => {
	const hits = getStatValue(data.Stats, 'Hits');
	const atBats = getStatValue(data.Stats, 'AtBats');

	return calculateBattingAverage(hits, atBats);
}

const buildYearlyOnBasePercentage = (data: IPlayerData): number => {
	// need HitByPitch from scraper
	return 0;
}