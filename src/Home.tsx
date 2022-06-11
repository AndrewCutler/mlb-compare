import { Box } from '@chakra-ui/react';
import Charts from './Charts';
import Players from './Players';
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
			<Players />
			<Stats />
			{/* <Seasons /> */}
			<Charts />
			{/* <Chart stat='HomeRun' playerData={selections} /> */}
		</Box>
	);
};

export default Home;
