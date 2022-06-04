import { Flex, Button, Input, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setSearchResults } from './store/slice';
import fake from './fake.json';

const request = async (name: string) =>
	fetch(`${process.env.REACT_APP_API ?? ''}/search/${name}`).then((res) =>
		res.json()
	);

const Search = (): React.ReactElement => {
	const dispatch = useDispatch();

	const [inputText, setInputText] = useState<string>('');
	const [search, setSearch] = useState<string>('');

	const isSearchDisabled = search?.length < 3;

	const { refetch, data, isFetching, isError, error } = useQuery(
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
		if (search?.trim()?.length > 2) {
			refetch();
		}
	}, [search, refetch]);

	useEffect(() => {
		dispatch(setSearchResults(data));
	}, [data, dispatch]);

	useEffect(() => {
		if (isError) {
			console.error(error);
		}
	}, [isError, error]);

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
				shouldWrapChildren
			>
				<Button
					ml={2}
					isLoading={isFetching && !isError}
					variant='solid'
					disabled={isSearchDisabled}
					onClick={handleSearch}
				>
					Search
				</Button>
			</Tooltip>
		</Flex>
	);
};

export default Search;
