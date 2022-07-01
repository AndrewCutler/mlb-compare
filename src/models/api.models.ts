export interface ISearchResult {
	[name: string]: ISearchPlayer[];
}

export interface ISearchPlayer {
	Endpoint: string;
	Name: string;
	Years: string;
}

export interface ISeasonStats {
	Year: string;
	Stats: IStats;
}


export interface ISelectionPlayer {
	Name: string;
	StatsByAge: IPlayerStats;
}

interface IPlayerStats {
	Stats: IStats;
}

export interface IAgeStats extends IPlayerStats {
	Age: string;
}

export interface IYearStats extends IPlayerStats {
	Year: string;
}

export class PlayerStats {
	Ages: IAgeStats[];
	Years: IYearStats[];

	constructor() {
		this.Ages = [];
		this.Years = [];
	}
}

export interface IStats {
	[name: string]: number;
}
