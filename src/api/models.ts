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