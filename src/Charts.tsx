import { Box, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Chart from './Chart';
import { AppState, selectCheckedStats } from './store/slice';

const Charts = (): ReactElement => {
	const stats = useSelector(selectCheckedStats);
	const { selections } = useSelector(AppState);

	const isDisabled = !selections || selections.length === 0;

	return (
		<Stack>
			{!isDisabled &&
				stats.map(({ Name }) => (
					<Box key={Name}>
						<Text>{Name}</Text>
						<Chart stat={Name} playerData={selections} />
					</Box>
				))}
		</Stack>
	);
};

export default Charts;
