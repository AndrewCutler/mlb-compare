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
	Stats: PlayerStats;
}

export class PlayerStats {
	Ages: { [age: string]: IStats };
	Years: { [year: string]: IStats };

	constructor() {
		this.Ages = {};
		this.Years = {};
	}
}

export interface IStats {
	[name: string]: number;
}
