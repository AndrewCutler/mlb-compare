import ChartTabset from './ChartTabset';
import { Flex } from '@chakra-ui/react';
import Players from './Players';
import Search from './Search';
import Title from './Title';
import Toggles from './Toggles';

const Home = (): React.ReactElement => {
	return (
		<Flex justifyContent='center' flexDirection='column' p={5} maxW='85vw'>
			<Title />
			<Search />
			<Players />
			<Toggles />
			<ChartTabset />
		</Flex>
	);
};

export default Home;
