import { Box } from '@chakra-ui/react';
import Search from './Search';
import SearchResults from './SearchResults';
import Stats from './Stats';

const Home = (): React.ReactElement => {
	return (
		<Box p={5}>
			<Search />
			<SearchResults />
			<Stats />
		</Box>
	);
};

export default Home;
