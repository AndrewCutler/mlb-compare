import { Box, Center, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import { AppState, selectCheckedStats } from './store/slice';

const Charts = (): ReactElement => {
	const stats = useSelector(selectCheckedStats);
	const { selections } = useSelector(AppState);

	const isDisabled = !selections || selections.length === 0;

	return (
		<Wrap>
			{!isDisabled &&
				stats.map(({ Name }) => (
					<WrapItem key={Name}>
						<Center flexDirection='column'>
							<Text>{Name}</Text>
							<Chart stat={Name} playerData={selections} />
						</Center>
					</WrapItem>
				))}
		</Wrap>
	);
};

export default Charts;
