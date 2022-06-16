import { AppState, selectCheckedStats } from './store/slice';
import { Center, Text, Wrap, WrapItem } from '@chakra-ui/react';

import { ReactElement } from 'react';
import YearlyChart from './YearlyChart';
import { useSelector } from 'react-redux';

const YearlyChartTab = ({ children }: any): ReactElement => {
	const stats = useSelector(selectCheckedStats);
	const { selections } = useSelector(AppState);

	const isDisabled = !selections || selections.length === 0;

	return (
		<Wrap>
			{!isDisabled &&
				stats.map(({ Label, DisplayLabel }) => (
					<WrapItem key={Label}>
						<Center flexDirection='column'>
							<Text>{DisplayLabel}</Text>
							{children}
							<YearlyChart stat={Label} playerData={selections} />
						</Center>
					</WrapItem>
				))}
		</Wrap>
	);
};

export default YearlyChartTab;
