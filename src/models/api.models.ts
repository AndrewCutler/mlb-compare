export interface ISearchResult {
	[name: string]: ISearchPlayer[];
}

export interface ISearchPlayer {
	Endpoint: string;
	Name: string;
	Years: string;
}


export interface ISelectionPlayer {
	Name: string;
	Data: IPlayerData[];
}

export interface IPlayerData {
	Year: string;
	Age: string;
	Stats: IStats;
}

export interface IStats {
	[name: string]: number;
}
