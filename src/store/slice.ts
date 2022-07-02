import { ISearchResult, ISelectionPlayer } from '../models/api.models';
import { FilterType, IStatSelection, STATS } from '../models/local.models';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAppState {
	searchResults: ISearchResult | undefined;
	selections: ISelectionPlayer[];
	stats: IStatSelection;
	ages: string[];
	seasons: string[];
	resetSearch: boolean;
	tabIndex: number;
	isLoading: boolean;
	filter: FilterType;
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
	seasons: [],
	isLoading: false,
	filter: 'ages',
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
		// Map/Set would be a superior data structure, however they are not serializable
		// https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
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
		resetAges: (state, { payload }: PayloadAction<string[]>) => {
			state.ages = payload;
		},
		// Map/Set would be a superior data structure, however they are not serializable
		// https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
		toggleSeason: (state, { payload }: PayloadAction<string>) => {
			if (state.seasons.includes(payload)) {
				state.seasons = state.seasons.filter(season => season !== payload);
			} else {
				state.seasons = [
					...state.seasons,
					payload,
				];
			}
		},
		resetSeasons: (state, { payload }: PayloadAction<string[]>) => {
			state.seasons = payload;
		},
		toggleFilter: (state) => {
			if (state.filter === 'ages') {
				state.filter = 'seasons';
			} else {
				state.filter = 'ages';
			}
		}
	},
});

export const {
	setResetSearch,
	setSearchResults,
	addSelection,
	toggleLoading,
	toggleAge,
	toggleFilter,
	toggleSeason,
	resetSeasons,
	removeSelection,
	toggleStat,
	setTabIndex,
	resetAges
} = appSlice.actions;

export const AppState = (state: IStore) => state.app;

export const selectCheckedStats = (state: IStore) => state.app.stats.filter(({ IsChecked }) => IsChecked);

export default appSlice.reducer;
