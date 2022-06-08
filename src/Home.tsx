import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import Charts from './Charts';
import Search from './Search';
import SearchResults from './SearchResults';
import Stats from './Stats';
import { AppState } from './store/slice';
import Title from './Title';

const Home = (): React.ReactElement => {
	const { selections } = useSelector(AppState);

	return (
		<Box p={5}>
			<Title />
			<Search />
			<SearchResults />
			<Stats />
			<Charts />
			{/* <Chart stat='HomeRun' playerData={selections} /> */}
		</Box>
	);
};

export default Home;
