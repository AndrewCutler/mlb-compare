import { Box } from '@chakra-ui/react';
import ChartTabset from './ChartTabset';
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
			<ChartTabset />
			{/* <Chart stat='HomeRun' playerData={selections} /> */}
		</Box>
	);
};

export default Home;
