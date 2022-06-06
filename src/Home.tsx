import { Box } from '@chakra-ui/react';
import Chart from './Chart';
import Search from './Search';
import SearchResults from './SearchResults';
import Stats from './Stats';
import Title from './Title';

const Home = (): React.ReactElement => {
	return (
		<Box p={5}>
			<Title />
			<Search />
			<SearchResults />
			<Stats />
			<Chart />
		</Box>
	);
};

export default Home;
