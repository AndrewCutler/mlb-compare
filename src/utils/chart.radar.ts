import { IPlayerStats } from '../models/api.models';
import { IStatSelection } from '../models/local.models';

export const mapToChartData = (data: IPlayerStats, stats: IStatSelection, ages: number[], playerName: string) => {
	console.log(data);
	if (!ages || ages.length === 0) {
		const career = data['Career'];

		// const result = [
		// 	{
		// 		stat: 'Batting Average',
		// 		[playerName]: average * 1000,
		// 		fullMark: 500
		// 	},
		// 	{
		// 		stat: 'OBP',
		// 		[playerName]: (average + 0.09) * 1000,
		// 		fullMark: 500
		// 	},
		// 	{
		// 		stat: 'wRC',
		// 		[playerName]: 150,
		// 		fullMark: 500
		// 	},
		// 	{
		// 		stat: 'wRC',
		// 		[playerName]: 150,
		// 		fullMark: 500
		// 	}
		// ];

		const result = stats.map(stat => {
			const value = career.Stats[stat.Label];
			return {
				stat: stat.DisplayLabel,
				[playerName]: value,
				fullMark: stat.FullMark
			}
		});

		console.log(result);

		return result;
	}

	return [];
};