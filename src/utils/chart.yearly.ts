import { ISelectionPlayer } from '../models/api.models';
import { v4 as uuidv4 } from 'uuid';

const createKey = (stat: string, name: string): string =>
	`${stat}_${name.replaceAll(/\s/g, '_')}`;

interface IBarKey {
	Key: string;
	Name: string;
}

const getValueForStatByAge = (
	player: ISelectionPlayer,
	age: string,
	stat: string
): number | undefined => player.StatsByAge[age]?.Stats[stat];

export const buildYearlyChartData = (stat: string, playerData: ISelectionPlayer[], ages: string[]) => {
	const uniqueAges = Array.from(
		new Set(
			playerData
				.map(({ StatsByAge }) => Object.keys(StatsByAge))
				.flat()
				.filter(age => {
					return ages?.includes(age);
				})
		)
	);
	const playerToId = playerData.reduce(
		(dict, player) => ({ ...dict, [player.Name]: uuidv4() }),
		{} as { [name: string]: string }
	);

	const uniqueKeys: IBarKey[] = [];

	const chartData = uniqueAges
		.map((age) => {
			// interface { Age: string; Year: string; [key in keyof Stats]: any }  (?)
			const result: any = { Age: age };
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
				}
			}

			return result;
		})
		.sort(({ Age: AgeA }, { Age: AgeB }) => (AgeA > AgeB ? 1 : -1));

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