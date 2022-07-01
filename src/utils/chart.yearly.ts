import { ISelectionPlayer, IStats } from '../models/api.models';
import { v4 as uuidv4 } from 'uuid';

/** 
* Abandon all hope ye who enter here.
*/

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
): number | undefined => player.StatsByAge[age]?.Stats[stat];

const getValueForStatByYear = (
	player: ISelectionPlayer,
	year: string,
	stat: string): number | undefined => Object.values(player.StatsByAge).find(({ Year }) => Year === year)?.Stats[stat];

export const buildYearlyChartData = (stat: string, playerData: ISelectionPlayer[], timeframes: string[], filter: 'ages' | 'seasons') => {
	const uniqueTimeframes = Array.from(
		new Set(
			playerData
				.map(({ StatsByAge }) => {
					if (filter === 'ages') {
						return Object.keys(StatsByAge);
					}

					return Object.values(StatsByAge).map(({ Year }) => Year);
				})
				.flat()
				.filter(timeframe => {
					return timeframes?.includes(timeframe);
				})
		)
	);
	const playerToId = playerData.reduce(
		(dict, player) => ({ ...dict, [player.Name]: uuidv4() }),
		{} as { [name: string]: string }
	);

	const uniqueKeys: IBarKey[] = [];

	const chartData = uniqueTimeframes
		.map((age) => {
			const result: { [key: string]: string | number | undefined } = { Age: age };
			if (filter === 'ages') {
				for (const player of playerData) {
					if (player.StatsByAge[age]) {
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
							age,
							stat
						);

						const seasonKey = createKey('Season', id);
						result[seasonKey] = player.StatsByAge[age].Year;
						console.log(result);
					}
				}


			}

			if (filter === 'seasons') {
				const seasonKey = Object.keys(result).find((el) => el.startsWith('Season_'))!;
				console.log(Object.keys(result))

				return {
					...result,
					Season: result[seasonKey]
				};
				// return Object.keys(result).map((yearKey) => {
				// 	// const yearKey = Object.keys(datum).find((el) => el.startsWith('Season_'))!;
				// 	const year = result[yearKey];
				// 	return {
				// 		...result,
				// 		Season: year,
				// 	}
				// });
				// }

				console.log(result)
				return result;
				// }

				// for (const player of playerData) {
				// 	const playerYearsDictionary = Object
				// 		.values(player.StatsByAge)
				// 		.reduce((prev, curr) => ({ ...prev, [curr.Year]: curr.Stats }), {} as { [year: string]: IStats });
				// 	if (playerYearsDictionary[timeframe]) {
				// 		const id = playerToId[player.Name];
				// 		const statKey = createKey(stat, id);
				// 		if (
				// 			!uniqueKeys.map(({ Key }) => Key).includes(statKey)
				// 		) {
				// 			uniqueKeys.push({
				// 				Key: statKey,
				// 				Name: player.Name
				// 			});
				// 		}

				// 		result[statKey] = getValueForStatByYear(
				// 			player,
				// 			timeframe,
				// 			stat
				// 		);

				// 		// const seasonKey = createKey('Season', id);
				// 		// result[seasonKey] = player.StatsByAge[timeframe].Year;
				// 	}
				// }


				// return {};
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