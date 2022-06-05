import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ISearchResult } from '../api/models';

export interface IAppState {
    searchResults: ISearchResult | undefined;
}

export interface IStore {
	app: IAppState;
}


const initialState: IAppState = {
    searchResults: undefined,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchResults: (state, { payload }: PayloadAction<ISearchResult>) => {
            state.searchResults = payload;

            return state;
        }
    },
});

export const { setSearchResults } = appSlice.actions;

export const AppState = (state: IStore) => state.app;

export default appSlice.reducer;
