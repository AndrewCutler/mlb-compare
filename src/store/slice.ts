import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ISearchResult, ISelectionPlayer } from '../api/models';

export interface IStore {
    app: IAppState;
}

export interface IAppState {
    searchResults: ISearchResult | undefined;
    selections: ISelectionPlayer[];
    blank: undefined;
}

export interface IStore {
    app: IAppState;
}


const initialState: IAppState = {
    searchResults: undefined,
    selections: [],
    blank: undefined,
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

            // return state;
        }
    },
});

export const { setSearchResults, addSelection } = appSlice.actions;

export const AppState = (state: IStore) => state.app;

export default appSlice.reducer;
