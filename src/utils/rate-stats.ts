import { IPlayerStats, ISeasonStats, ISelectionPlayer, IStats } from '../models/api.models';

const getStatValue = (stats: IStats, statName: string): number => Number(stats[statName]);

const calculateBattingAverage = (hits: number, atBats: number): number => parseFloat((hits / atBats).toFixed(3));
