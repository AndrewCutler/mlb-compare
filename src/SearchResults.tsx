import { Box, List, ListItem, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { addSelection, AppState, setSearchResults } from './store/slice';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { IPlayerData } from './models/api.models';

const request = async (endpoint: string) =>
	fetch(`${process.env.REACT_APP_API ?? ''}/stats/${endpoint}`).then((res) =>
		res.json()
	);

const SearchResults = (): React.ReactElement => {
	const dispatch = useDispatch();
	const { searchResults } = useSelector(AppState);

	const [endpoint, setEndpoint] = useState('');
	const [name, setName] = useState('');

	const { refetch, data, isFetched, isLoading, isError, error } = useQuery<
		IPlayerData[]
	>(['stats', endpoint], () => request(endpoint), {
		enabled: false
	});

	useEffect(() => {
		// doesn't make additional requests
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
	};

	return (
		<List display='flex' flexDirection='column' w='280px' mt={3}>
			{searchResults?.Data?.map(({ Name, Years, Endpoint }) => {
				return (
					<div key={Endpoint}>
						{(!isLoading || endpoint === Endpoint) && (
							<ListItem
								display='flex'
								justifyContent='space-between'
								cursor='pointer'
								_hover={{ textDecoration: 'underline' }}
								onClick={() => handleSelection(Endpoint, Name)}
							>
								<Box>{Name}</Box>
								<Box>{Years}</Box>
								{isLoading && endpoint === Endpoint && (
									<Spinner />
								)}
							</ListItem>
						)}
					</div>
				);
			})}
		</List>
	);
};

export default SearchResults;
