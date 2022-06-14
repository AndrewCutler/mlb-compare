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

export interface IPlayerStats {
	[age: string]: ISeasonStats;
}

export interface IStats {
	[name: string]: number;
}
