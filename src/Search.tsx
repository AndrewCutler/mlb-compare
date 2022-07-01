import {
	AppState,
	addSelection,
	setResetSearch,
	setSearchResults,
	toggleLoading
} from './store/slice';
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList
} from '@choc-ui/chakra-autocomplete';
import { Box, Flex } from '@chakra-ui/react';
import { PlayerStats, ISearchResult } from './models/api.models';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import apiUrl from './utils/api';

import { useQuery } from 'react-query';

const searchRequest = async (name: string) =>
	fetch(`${apiUrl}/search/${name}`).then((res) => res.json());
const endpointRequest = async (endpoint: string) =>
	fetch(`${apiUrl}/stats/${endpoint}`).then((res) => res.json());

// TODO: refactor; probably has unnecessary stuff. Could be componentized? Create hooks for queries?
const Search = (): React.ReactElement => {
	const dispatch = useDispatch();
	const { searchResults, resetSearch } = useSelector(AppState);

	const [inputText, setInputText] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const [endpoint, setEndpoint] = useState('');
	const [name, setName] = useState('');

	const {
		refetch: searchRefetch,
		data: searchData,
		isFetching: isSearchFetching
	} = useQuery<ISearchResult>(
		['search', search],
		() => searchRequest(search),
		{
			enabled: false
		}
	);

	// TODO: add error handling?
	const {
		refetch: endpointRefetch,
		data: endpointData,
		isFetched: isEndpointFetched,
		isFetching: isEndpointFetching
	} = useQuery<PlayerStats>(
		['stats', endpoint],
		() => endpointRequest(endpoint),
		{
			enabled: false
		}
	);

	useEffect(() => {
		dispatch(toggleLoading(isSearchFetching || isEndpointFetching));
	}, [isSearchFetching, isEndpointFetching, dispatch]);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSearch(inputText);
		}, 500);

		return () => clearTimeout(timeout);
	}, [inputText]);

	useEffect(() => {
		if (resetSearch) {
			setInputText('');
			dispatch(setResetSearch(false));
		}
	}, [dispatch, resetSearch]);

	useEffect(() => {
		if (search?.trim()?.length > 2) {
			searchRefetch();
		}
	}, [search, searchRefetch]);

	useEffect(() => {
		dispatch(setSearchResults(searchData));
	}, [searchData, dispatch]);

	useEffect(() => {
		if (!isEndpointFetched && endpoint) {
			endpointRefetch();
		}
	}, [isEndpointFetched, endpoint, endpointRefetch]);

	useEffect(() => {
		if (endpointData && name) {
			dispatch(
				addSelection({
					Name: name,
					Stats: endpointData
				})
			);
			setName('');
			dispatch(setSearchResults(undefined));
		}
	}, [endpointData, name, dispatch]);

	const handleSelection = (endpoint: string, name: string): void => {
		setEndpoint(endpoint);
		setName(name);
		dispatch(setResetSearch(true));
	};

	return (
		<Flex>
			<AutoComplete
				openOnFocus={false}
				emptyState={<Box px={1}>No results</Box>}
			>
				<AutoCompleteInput
					value={inputText}
					onChange={({ target: { value } }) => setInputText(value)}
					placeholder='Search for players by name (three characters minimum)'
				/>
				<AutoCompleteList>
					{searchResults &&
						Object.keys(searchResults)
							.map((key) => {
								return searchResults[key].map(
									({ Name, Years, Endpoint }) => {
										return (
											<AutoCompleteItem
												key={Endpoint}
												onClick={() =>
													handleSelection(
														Endpoint,
														Name
													)
												}
												value={Name}
											>
												<Flex
													w='100%'
													justifyContent='space-between'
												>
													<Box>{Name}</Box>
													<Box>{Years}</Box>
												</Flex>
											</AutoCompleteItem>
										);
									}
								);
							})
							.flat()}
				</AutoCompleteList>
			</AutoComplete>
		</Flex>
	);
};

export default Search;
