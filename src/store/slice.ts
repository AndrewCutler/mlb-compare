import { ISearchResult, ISelectionPlayer } from '../models/api.models';
import { IStatSelection, STATS } from '../models/local.models';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAppState {
	searchResults: ISearchResult | undefined;
	selections: ISelectionPlayer[];
	stats: IStatSelection;
	ages: string[];
	resetSearch: boolean;
	tabIndex: number;
	isLoading: boolean;
}

export interface IStore {
	app: IAppState;
}

const initialState: IAppState = {
	searchResults: undefined,
	selections: [],
	// TODO: build yearly and radar stats
	stats: STATS,
	resetSearch: false,
	tabIndex: 0,
	ages: [],
	isLoading: false,
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
		setTabIndex: (state, { payload }: PayloadAction<number>) => {
			state.tabIndex = payload;
		},
		addSelection: (state, { payload }: PayloadAction<ISelectionPlayer>) => {
			const old = state.selections;

			state.selections = [
				...old,
				{ ...payload }
			];
		},
		removeSelection: (state, { payload }: PayloadAction<string>) => {
			state.selections = state.selections.filter(({ Name }) => Name !== payload);
		},
		toggleLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		toggleStat: (state, { payload }: PayloadAction<string>) => {
			state.stats = state.stats?.map((stat) => {
				if (payload === stat.Label) {
					return {
						...stat,
						IsChecked: !stat.IsChecked,
					}
				}

				return stat;
			});
		},
		// TODO: array is not the ideal data type here
		toggleAge: (state, { payload }: PayloadAction<string>) => {
			if (state.ages.includes(payload)) {
				state.ages = state.ages.filter(age => age !== payload);
			} else {
				state.ages = [
					...state.ages,
					payload,
				];
			}
		},
	},
});

export const { setResetSearch, setSearchResults, addSelection, toggleLoading, toggleAge, removeSelection, toggleStat, setTabIndex } = appSlice.actions;

export const AppState = (state: IStore) => state.app;

export const selectCheckedStats = (state: IStore) => state.app.stats.filter(({ IsChecked }) => IsChecked);

export default appSlice.reducer;
