import { IPlayerData, ISelectionPlayer, IStat } from '../models/api.models';

const appendBattingAverage = (playerData: ISelectionPlayer) => {
	for (let datum of playerData.Data) {
		datum.Stats = [...datum.Stats, { Name: 'BattingAverage', Value: calculateBattingAverage(datum) }];
	}

	return playerData;
}

const getStatValue = (stats: IStat[], statName: string): number => Number(stats.find(({ Name }) => Name === statName)?.Value);

const calculateBattingAverage = (data: IPlayerData): number => {
	const hits = getStatValue(data.Stats, 'Hits');
	const atBats = getStatValue(data.Stats, 'AtBats');

	return parseFloat((hits / atBats).toFixed(3));
}

export default appendBattingAverage;