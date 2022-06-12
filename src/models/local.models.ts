export interface IStatSelection {
	StatSelection: IStatOption[];
}

export interface IStatOption {
	Name: string;
	Label: string;
	IsDisabled: boolean;
	IsChecked: boolean;
}

export const STATS: IStatSelection = {
	StatSelection: [
		{ Name: 'HomeRun', Label: 'HR', IsDisabled: true, IsChecked: true },
		{ Name: 'Hits', Label: 'H', IsDisabled: true, IsChecked: true },
		{ Name: 'WAR', Label: 'WAR', IsDisabled: true, IsChecked: false },
		{ Name: 'Games', Label: 'G', IsDisabled: false, IsChecked: false },
		{ Name: 'PlateAppearances', Label: 'PA', IsDisabled: false, IsChecked: false },
		{ Name: 'AtBats', Label: 'AB', IsDisabled: false, IsChecked: false },
		{ Name: 'Runs', Label: 'R', IsDisabled: false, IsChecked: false },
		{ Name: 'Doubles', Label: '2B', IsDisabled: false, IsChecked: false },
		{ Name: 'Triples', Label: '3B', IsDisabled: false, IsChecked: false },
		{ Name: 'RunsBattedIn', Label: 'RBI', IsDisabled: false, IsChecked: false },
		{ Name: 'StolenBases', Label: 'SB', IsDisabled: false, IsChecked: false },
		{ Name: 'CaughtStealing', Label: 'CS', IsDisabled: false, IsChecked: false },
		{ Name: 'Walks', Label: 'BB', IsDisabled: false, IsChecked: false },
		{ Name: 'Strikeouts', Label: 'SO', IsDisabled: false, IsChecked: false },
		{ Name: 'TotalBases', Label: 'TB', IsDisabled: false, IsChecked: false },
		{ Name: 'SacFlys', Label: 'SF', IsDisabled: false, IsChecked: false },
	]
}

export const mapStatToDisplayName = (name: string): string => {
	switch (name) {
		case 'HomeRun':
			return 'Home runs';
		case 'PlateAppearances':
			return 'Plate appearances';
		case 'AtBats':
			return 'At bats';
		case 'RunsBattedIn':
			return 'Runs batted in';
		case 'StolenBases':
			return 'Stolen bases';
		case 'CaughtStealing':
			return 'Caught stealing';
		case 'TotalBases':
			return 'Total bases';
		case 'SacFlys':
			return 'Sacrifice flys';
		default:
			return name;
	}
}