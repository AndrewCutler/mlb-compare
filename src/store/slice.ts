import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchResult } from '../api/models';

export interface IAppState {
    searchResults: ISearchResult | undefined;
}


const initialState: IAppState = {
    searchResults: undefined,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchResults: (state, { payload }: PayloadAction<ISearchResult>) => {
            console.log('in reducer', payload)
            state.searchResults = payload;

            return state;
        }
    },
});

export const { setSearchResults } = appSlice.actions;

export const AppState = (state: IAppState) => state;

export default appSlice.reducer;
