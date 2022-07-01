import { ISelectionPlayer, IStats, } from '../models/api.models';
import { v4 as uuidv4 } from 'uuid';

const createKey = (stat: string, name: string): string =>
	`${stat}_${name.replaceAll(/\s/g, '_')}`;

export interface IBarKey {
	Key: string;
	Name: string;
}

const getValueForStatByAge = (
	player: ISelectionPlayer,
	age: string,
	stat: string
	// ): number | undefined => player.Stats[age]?.Stats[stat];
): number | undefined => 1;

const getValueForStatByYear = (
	player: ISelectionPlayer,
	year: string,
	stat: string): number | undefined => Object.values(player.Stats).find(({ Year }) => Year === year)?.Stats[stat];

export const buildYearlyChartData = (stat: string, playerData: ISelectionPlayer[], timeframes: Set<string>, filter: 'ages' | 'seasons') => {
	const playerToId = playerData.reduce(
		(dict, player) => ({ ...dict, [player.Name]: uuidv4() }),
		{} as { [name: string]: string }
	);
	const uniqueKeys: IBarKey[] = [];

	const chartData = Array.from(timeframes)
		.map((timeframe) => {
			const result: { [key: string]: string | number | undefined } = { Timeframe: timeframe };
			for (const player of playerData) {
				const playerStats = filter === 'ages' ? player.Stats.Ages : player.Stats.Years;
				if (playerStats[timeframe]) {
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

					result[statKey] = getValueForStatByAge(
						player,
						timeframe,
						stat
					);

					// const seasonKey = createKey('Season', id);
					// result[seasonKey] = player.Stats[timeframe].Year;
					// console.log(result);
				}
			}

			return result;
		})
		.sort((a, b) => {
			if (filter === 'ages') {
				return a['Age']! > b['Age']! ? 1 : -1;
			}

			return a['Season']! > b['Season']! ? 1 : -1;
		});

	return { chartData, uniqueKeys };
}

export const getTooltipYear = (payload: any, dataKey: string) => {
	const id = dataKey?.split('_')[1];
	for (const key in payload) {
		if (key === `Season_${id}`) {
			return payload[key];
		}
	}
}