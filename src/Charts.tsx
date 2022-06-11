import { AppState, selectCheckedStats } from './store/slice';
import { Box, Center, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';

import Chart from './Chart';
import { ReactElement } from 'react';
import { mapStatToDisplayName } from './models/local.models';
import { useSelector } from 'react-redux';

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
							<Text>{mapStatToDisplayName(Name)}</Text>
							<Chart stat={Name} playerData={selections} />
						</Center>
					</WrapItem>
				))}
		</Wrap>
	);
};

export default Charts;
