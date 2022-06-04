import { Box, Flex } from '@chakra-ui/react';
interface SearchResult {
	Name: string;
	Years: string;
}

interface ISearchResultProps {
	results: SearchResult[];
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
