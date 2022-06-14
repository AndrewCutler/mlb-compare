import { ISearchResult, ISelectionPlayer } from '../models/api.models';
import { IStatSelection, STATS } from '../models/local.models';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { buildRateStats } from '../utils/rate-stats';

export interface IAppState {
	searchResults: ISearchResult | undefined;
	selections: ISelectionPlayer[];
	stats: IStatSelection;
	resetSearch: boolean;
}

export interface IStore {
	app: IAppState;
}

const initialState: IAppState = {
	searchResults: undefined,
	selections: [],
	stats: STATS,
	resetSearch: false,
}

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setResetSearch: (state, { payload }: PayloadAction<boolean>) => {
			state.resetSearch = payload;
		},
		setSearchResults: (state, { payload }: PayloadAction<ISearchResult | undefined>) => {
			state.searchResults = payload;

			return state;
		},
		addSelection: (state, { payload }: PayloadAction<ISelectionPlayer>) => {
			const old = state.selections;


			const withRateStats = buildRateStats(payload);

			state.selections = [
				...old,
				{ ...withRateStats }
			];
		},
		removeSelection: (state, { payload }: PayloadAction<string>) => {
			state.selections = state.selections.filter(({ Name }) => Name !== payload);
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

export const { setResetSearch, setSearchResults, addSelection, removeSelection, toggleStat } = appSlice.actions;

export const AppState = (state: IStore) => state.app;

export const selectCheckedStats = (state: IStore) => state.app.stats.StatSelection.filter(({ IsChecked }) => IsChecked);

export default appSlice.reducer;
