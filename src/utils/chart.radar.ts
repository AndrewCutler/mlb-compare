import { IPlayerStats } from '../models/api.models';
import { ISelectionPlayer } from './../models/api.models';
import { IStatSelection } from '../models/local.models';

export const mapToChartData = (data: ISelectionPlayer[], stats: IStatSelection, ages: number[]) => {
	if (!ages || ages.length === 0) {
		const nameToStats = data.reduce((prev, curr) => ({ ...prev, [curr.Name]: curr.StatsByAge }), {} as { [name: string]: IPlayerStats });

		const result = stats.map(stat => {
			let current = {
				stat: stat.DisplayLabel,
				// fullMark: stat.FullMark
			};
			for (const name in nameToStats) {
				const career = nameToStats[name]['Career'];
				const value = career.Stats[stat.Label];
				current = {
					...current,
					[name]: value,
				}
			}

			return current;
		});

		console.log(result);

		return result;
	}
	
	return [];
};