import ChartTabset from './ChartTabset';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import Players from './Players';
import Search from './Search';
import Title from './Title';
import TogglesInline from './TogglesInline';

const Home = (): React.ReactElement => {
	const breakpoint = useBreakpointValue({ base: 'fixed', sm: 'inline' });

	return (
		<Flex justifyContent='center' flexDirection='column' p={5}>
			<Title />
			<Search />
			<Players />
			{breakpoint === 'inline' && <TogglesInline />}
			<ChartTabset />
		</Flex>
	);
};

export default Home;
