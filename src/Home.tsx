import ChartTabset from './ChartTabset';
import { Flex } from '@chakra-ui/react';
import Players from './Players';
import Search from './Search';
import Stats from './Stats';
import Title from './Title';
import Ages from './Ages';

const Home = (): React.ReactElement => {
	return (
		<Flex justifyContent='center' flexDirection='column' p={5} maxW='85vw'>
			<Title />
			<Search />
			<Players />
			<Stats />
			<Ages />
			<ChartTabset />
		</Flex>
	);
};

export default Home;
