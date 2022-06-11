import { AppState, setResetSearch, setSearchResults } from './store/slice';
import { Button, Flex, Input, Tooltip } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { ISearchResult } from './models/api.models';
import { useQuery } from 'react-query';

const request = async (name: string) =>
	fetch(`${process.env.REACT_APP_API ?? ''}/search/${name}`).then((res) =>
		res.json()
	);

const Search = (): React.ReactElement => {
	const dispatch = useDispatch();
	const { resetSearch } = useSelector(AppState);

	const [inputText, setInputText] = useState<string>('');
	const [search, setSearch] = useState<string>('');

	const isSearchDisabled = search?.length < 3;

	const { refetch, data, isFetching, isError } = useQuery<ISearchResult>(
		['search', search],
		() => request(search),
		{
			enabled: false
		}
	);

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
			refetch();
		}
	}, [search, refetch]);

	useEffect(() => {
		dispatch(setSearchResults(data));
	}, [data, dispatch]);

	const handleSearch = (): void => {
		if (!isFetching && !isSearchDisabled) {
			refetch();
		}
	};

	return (
		<Flex>
			<Input
				placeholder='Search for players by name (three characters minimum)'
				value={inputText}
				onChange={({ target: { value } }) => setInputText(value)}
			/>
			<Tooltip
				label='At least three characters are required'
				isDisabled={!isSearchDisabled}
				shouldWrapChildren>
				<Button
					ml={2}
					isLoading={isFetching && !isError}
					variant='solid'
					disabled={isSearchDisabled}
					onClick={handleSearch}>
					Search
				</Button>
			</Tooltip>
		</Flex>
	);
};

export default Search;
