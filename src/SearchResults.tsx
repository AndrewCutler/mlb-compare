import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { AppState } from './store/slice';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const request = async (endpoint: string) =>
	fetch(`${process.env.REACT_APP_API ?? ''}/stats/${endpoint}`).then((res) =>
		res.json()
	);

const SearchResults = (): React.ReactElement => {
	const { searchResults } = useSelector(AppState);

	const [endpoint, setEndpoint] = useState('');
	const { refetch, data, isFetched, isError, error } = useQuery(
		['stats', endpoint],
		() => request(endpoint),
		{
			enabled: false
		}
	);

	useEffect(() => {
		// doesn't make additional requests
		if (!isFetched && endpoint) {
			refetch();
		}
	}, [isFetched, endpoint, refetch]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<List display='flex' flexDirection='column' w='280px'>
			{searchResults?.Data?.map(({ Name, Years, Endpoint }) => {
				return (
					<ListItem
						key={Endpoint}
						display='flex'
						justifyContent='space-between'
						cursor='pointer'
						_hover={{ textDecoration: 'underline' }}
						onClick={() => setEndpoint(Endpoint)}>
						<Box>{Name}</Box>
						<Box>{Years}</Box>
					</ListItem>
				);
			})}
		</List>
	);
};

export default SearchResults;
