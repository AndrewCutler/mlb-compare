import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState, IAppState } from './store/slice';

const SearchResults = (): React.ReactElement => {
	const { searchResults } = useSelector(AppState);

	useEffect(() => {
		console.log(searchResults);
	}, [searchResults]);

	return (
		<Flex flexDirection='column' w='280px'>
			<span>hello</span>
			{searchResults?.Data?.map(({ Name, Years }) => {
				return (
					<Flex justifyContent='space-between'>
						<Box>{Name}</Box>
						<Box>{Years}</Box>
					</Flex>
				);
			})}
		</Flex>
	);
};

export default SearchResults;
