import { IPlayerStats } from '../models/api.models';

export const mapToChartData = (data: IPlayerStats, ages: number[], playerName: string) => {
	console.log(data);
	if (!ages || ages.length === 0) {
		const average =
			data['Career']?.Stats['BattingAverage'] ??
			0;

		const result = [
			{
				stat: 'Batting Average',
				[playerName]: average * 1000,
				fullMark: 450
			},
			{
				stat: 'OBP',
				[playerName]: (average + 0.09) * 1000,
				fullMark: 500
			},
			{
				stat: 'wRC',
				[playerName]: 150,
				fullMark: 300
			},
			{
				stat: 'OPS+',
				[playerName]: 150,
				fullMark: 300
			}
		];

		console.log(result);

		return result;
	}
	
	return [];
};