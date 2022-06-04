import { Box, Flex } from '@chakra-ui/react';
import { ISearchPlayer } from './api/models';

interface ISearchResultProps {
	results: ISearchPlayer[];
}
const SearchResults = ({ results }: ISearchResultProps): React.ReactElement => {
	return (
		<Flex flexDirection='column' w='280px'>
			{results.map(({ Name, Years }) => {
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
