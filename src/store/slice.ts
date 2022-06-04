import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchResult } from '../api/models';

export interface IStore {
    app: IAppState;
}

export interface IAppState {
    searchResults: ISearchResult | undefined;
    blank: undefined;
}


const initialState: IAppState = {
    searchResults: undefined,
    blank: undefined,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchResults(state, { payload }: PayloadAction<ISearchResult>) {
            state = {
                ...state,
                searchResults: payload
            };

            return state;
        }
    },
});

export const { setSearchResults } = appSlice.actions;

export const AppState = (state: IStore) => state.app;

export default appSlice.reducer;
