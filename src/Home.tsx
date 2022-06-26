import ChartTabset from './ChartTabset';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import Players from './Players';
import Search from './Search';
import Title from './Title';
import TogglesInline from './TogglesInline';
import { useSelector } from 'react-redux';
import { AppState } from './store/slice';

const Home = (): React.ReactElement => {
	const { selections } = useSelector(AppState);
	const breakpoint = useBreakpointValue({ base: 'fixed', sm: 'inline' });

	return (
		<Flex justifyContent='center' flexDirection='column' p={5}>
			<Title />
			<Search />
			<Players />
			{breakpoint === 'inline' && selections && selections.length > 0 && (
				<TogglesInline />
			)}
			<ChartTabset />
		</Flex>
	);
};

export default Home;
