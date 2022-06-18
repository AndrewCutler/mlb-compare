import { Box } from '@chakra-ui/react';
import ChartTabset from './ChartTabset';
import Players from './Players';
import Search from './Search';
import Stats from './Stats';
import Title from './Title';

const Home = (): React.ReactElement => {
	return (
		<Box p={5}>
			<Title />
			<Search />
			<Players />
			<Stats />
			<ChartTabset />
		</Box>
	);
};

export default Home;
