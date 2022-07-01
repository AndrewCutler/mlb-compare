import { PlayerStats } from '../models/api.models';
import { ISelectionPlayer } from './../models/api.models';
import { IStatSelection } from '../models/local.models';

export const buildRadarChartData = (data: ISelectionPlayer[], stats: IStatSelection, ages: number[], seasons: []) => {
	if (!ages || ages.length === 0) {
		const nameToStats = data.reduce((prev, curr) => ({ ...prev, [curr.Name]: curr.Stats }), {} as { [name: string]: PlayerStats });

		const result = stats.map(stat => {
			let current = {
				stat: stat.DisplayLabel,
				// fullMark: stat.FullMark
			};
			// for (const name in nameToStats) {
			// 	const career = nameToStats[name]['Career'];
			// 	const value = career.Stats[stat.Label];
			// 	current = {
			// 		...current,
			// 		[name]: value,
			// 	}
			// }

			return current;
		});

		return result;
	}

	return [];
};

export const buildDomain = (chartData: any[]): number[] => {
	const numerics = chartData.reduce((prev, curr) => {
		for (const key in curr) {
			if (typeof curr[key] === 'number') {
				prev = [...prev, curr[key]];
			}
		}

		return prev;
	}, []);

	const min = +(Math.min(...numerics) * 0.5).toPrecision(3);
	const max = +(Math.max(...numerics) * 1.2).toPrecision(3);

	return [min, max];
};