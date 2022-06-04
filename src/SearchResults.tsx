import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { AppState } from './store/slice';

const SearchResults = (): React.ReactElement => {
	const { searchResults } = useSelector(AppState);

	return (
		<Flex flexDirection='column' w='280px'>
			{searchResults?.Data?.map(({ Name, Years, Endpoint }) => {
				return (
					<Flex justifyContent='space-between' key={Endpoint}>
						<Box>{Name}</Box>
						<Box>{Years}</Box>
					</Flex>
				);
			})}
		</Flex>
	);
};

export default SearchResults;
