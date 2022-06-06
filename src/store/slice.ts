import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ISearchResult, ISelectionPlayer } from '../models/api.models';
import { IStatSelection, STATS } from '../models/local.models';


export interface IAppState {
    searchResults: ISearchResult | undefined;
    selections: ISelectionPlayer[];
    stats: IStatSelection;
}

export interface IStore {
    app: IAppState;
}


const initialState: IAppState = {
    searchResults: undefined,
    selections: [],
    stats: STATS,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchResults: (state, { payload }: PayloadAction<ISearchResult | undefined>) => {
            state.searchResults = payload;

            return state;
        },
        addSelection: (state, { payload }: PayloadAction<ISelectionPlayer>) => {
            const old = state.selections;

            state.selections = [
                ...old,
                { ...payload }
            ];
        },
        toggleStat: (state, { payload }: PayloadAction<string>) => {
            state.stats.StatSelection = state.stats?.StatSelection.map((stat) => {
                if (payload === stat.Name) {
                    return {
                        ...stat,
                        IsChecked: !stat.IsChecked,
                    }
                }

                return stat;
            });
        }
    },
});

export const { setSearchResults, addSelection } = appSlice.actions;

export const AppState = (state: IStore) => state.app;

export default appSlice.reducer;
