export interface ISearchResult {
    Count: number;
    Data: ISearchPlayer[];
}

export interface ISearchPlayer {
    Endpoint: string;
    IsActive: boolean;
    Name: string;
    Years: string;
}


export interface ISelectionPlayer {
    Name: string;
    Data: IPlayerData[];
}

export interface IPlayerData {
    Year: string;
    Stats: IStat[];
}

export interface IStat {
    Name: string;
    Value: number;
}
