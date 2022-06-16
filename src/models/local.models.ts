export type IStatSelection = IStatOption[];


export interface IStatOption {
	Label: string;
	DisplayLabel: string;
	IsDisabled: boolean;
	IsChecked: boolean;
	FullMark?: number;
}

export const STATS: IStatSelection = [
	{ DisplayLabel: 'HR', Label: 'HR', IsDisabled: true, IsChecked: true },
	{ DisplayLabel: 'H', Label: 'H', IsDisabled: true, IsChecked: true },
	{ DisplayLabel: 'WAR', Label: 'WAR', IsDisabled: true, IsChecked: false },
	{ DisplayLabel: 'G', Label: 'G', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'PA', Label: 'PA', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'AB', Label: 'AB', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'R', Label: 'R', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: '2B', Label: '2B', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: '3B', Label: '3B', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'RBI', Label: 'RBI', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'SB', Label: 'SB', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'CS', Label: 'CS', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'BB', Label: 'BB', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'SO', Label: 'SO', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'TB', Label: 'TB', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'SF', Label: 'SF', IsDisabled: false, IsChecked: false },
	{ Label: 'batting_avg', DisplayLabel: 'BA', IsDisabled: false, IsChecked: false, FullMark: 450 },
	{ Label: 'onbase_perc', DisplayLabel: 'OBP', IsDisabled: false, IsChecked: false, FullMark: 625 },
	{ Label: 'slugging_perc', DisplayLabel: 'SLG', IsDisabled: false, IsChecked: false, FullMark: 850 },
	{ Label: 'onbase_plus_slugging', DisplayLabel: 'OPS', IsDisabled: false, IsChecked: false , FullMark: 1450},
];