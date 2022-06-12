import { AppState, selectCheckedStats } from './store/slice';
import { Center, Text, Wrap, WrapItem } from '@chakra-ui/react';

import { ReactElement } from 'react';
import YearlyChart from './YearlyChart';
import { mapStatToDisplayName } from './models/local.models';
import { useSelector } from 'react-redux';

const YearlyChartTab = ({ children }: any): ReactElement => {
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
							{children}
							<YearlyChart stat={Name} playerData={selections} />
						</Center>
					</WrapItem>
				))}
		</Wrap>
	);
};

export default YearlyChartTab;
