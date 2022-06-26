import ChartTabset from './ChartTabset';
import { Flex } from '@chakra-ui/react';
import Players from './Players';
import Search from './Search';
import Title from './Title';
import Toggles from './Toggles';
import { useSelector } from 'react-redux';
import { AppState } from './store/slice';

const Home = (): React.ReactElement => {
	const { selections } = useSelector(AppState);

	return (
		<Flex justifyContent='center' flexDirection='column' p={5}>
			<Title />
			<Search />
			<Players />
			{selections && selections.length > 0 && <Toggles />}
			<ChartTabset />
		</Flex>
	);
};

export default Home;
