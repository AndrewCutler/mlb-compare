import { AppState, addSelection, setResetSearch, setSearchResults } from './store/slice';
import { Box, List, ListItem, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { IPlayerData } from './models/api.models';
import { useQuery } from 'react-query';

const request = async (endpoint: string) =>
	fetch(`${process.env.REACT_APP_API ?? ''}/stats/${endpoint}`).then((res) =>
		res.json()
	);

const SearchResults = (): React.ReactElement => {
	const dispatch = useDispatch();
	const { searchResults } = useSelector(AppState);

	const [endpoint, setEndpoint] = useState('');
	const [name, setName] = useState('');

	// TODO: add error handling?
	const { refetch, data, isFetched, isLoading } = useQuery<
		IPlayerData[]
	>(['stats', endpoint], () => request(endpoint), {
		enabled: false
	});

	useEffect(() => {
		// doesn't make additional requests?
		if (!isFetched && endpoint) {
			refetch();
		}
	}, [isFetched, endpoint, refetch]);

	useEffect(() => {
		if (data && name) {
			dispatch(
				addSelection({
					Name: name,
					Data: data
				})
			);
			setName('');
			dispatch(setSearchResults(undefined));
		}
	}, [data, name, dispatch]);

	const handleSelection = (endpoint: string, name: string): void => {
		setEndpoint(endpoint);
		setName(name);
		dispatch(setResetSearch(true));
	};

	return (
		<List display='flex' flexDirection='column' w='280px' mt={1}>
			{searchResults &&
				Object.keys(searchResults)
					.map((key) => {
						return searchResults[key].map(
							({ Name, Years, Endpoint }) => {
								return (
									// TODO: move to SearchResult component
									<div key={Endpoint}>
										{(!isLoading ||
											endpoint === Endpoint) && (
											<ListItem
												display='flex'
												p={1}
												justifyContent='space-between'
												cursor='pointer'
												background='whiteAlpha.300'
												_hover={{
													textDecoration: 'underline'
												}}
												onClick={() =>
													handleSelection(
														Endpoint,
														Name
													)
												}
											>
												<Box>{Name}</Box>
												<Box>{Years}</Box>
												{isLoading &&
													endpoint === Endpoint && (
														<Spinner />
													)}
											</ListItem>
										)}
									</div>
								);
							}
						);
					})
					.flat()}
			);
		</List>
	);
};

export default SearchResults;
