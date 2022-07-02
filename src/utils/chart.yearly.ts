import { ISelectionPlayer, } from '../models/api.models';
import { v4 as uuidv4 } from 'uuid';
import { FilterType, IBarKey } from '../models/local.models';

const createKey = (stat: string, name: string): string =>
	`${stat}_${name.replaceAll(/\s/g, '_')}`;

export const buildYearlyChartData = (stat: string, playerData: ISelectionPlayer[], timeframes: Set<string>, filter: FilterType) => {
	const playerToId = playerData.reduce(
		(dict, player) => ({ ...dict, [player.Name]: uuidv4() }),
		{} as { [name: string]: string }
	);
	const uniqueKeys: IBarKey[] = [];

	const chartData = Array.from(timeframes)
		.map(timeframe => {
			const result: { [key: string]: string | number | undefined } = { Timeframe: timeframe };
			for (const player of playerData) {
				const current = filter === 'ages' ? player.Stats.Ages[timeframe] : player.Stats.Years[timeframe];
				if (current) {
					const id = playerToId[player.Name];
					const statKey = createKey(stat, id);
					if (
						!uniqueKeys.map(({ Key }) => Key).includes(statKey)
					) {
						uniqueKeys.push({
							Key: statKey,
							Name: player.Name
						});
					}

					result[statKey] = current[stat];
					result[`Age_${id}`] = current.Age;
					result[`Year_${id}`] = current.Year;
				}
			}

			return result;
		})
		.sort((a, b) => {
			return a.Timeframe! > b.Timeframe! ? 1 : -1;
		});

	return { chartData, uniqueKeys };
}

export const getTooltipYear = (payload: any, dataKey: string, filter: FilterType) => {
	const prefix = filter === 'ages' ? 'Year' : 'Age';
	const id = dataKey?.split('_')[1];
	for (const key in payload) {
		if (key === `${prefix}_${id}`) {
			return payload[key];
		}
	}
}