import { Box } from '@chakra-ui/react';
import Search from './Search';
import SearchResults from './SearchResults';

const Home = (): React.ReactElement => {
	return (
		<Box p={5}>
			<Search />
			<SearchResults />
		</Box>
	);
};

export default Home;
