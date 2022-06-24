import { AppState, toggleStat } from './store/slice';
import { Box, Checkbox, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { TABS } from './models/local.models';

const Stats = (): React.ReactElement => {
	const dispatch = useDispatch();

	const { stats, selections, tabIndex } = useSelector(AppState);

	const handleChange = (label: string): void => {
		dispatch(toggleStat(label));
	};

	const isDisabled = !selections || selections.length === 0;

	return (
		<Box mb={3}>
			<Text>Choose stats to compare</Text>
			<Box>
				{stats
					.filter((stat) =>
						TABS[tabIndex] === 'RADAR' ? stat.IsRadar : true
					)
					.map(({ IsChecked, Label, DisplayLabel }) => {
						return (
							<Checkbox
								isDisabled={isDisabled}
								isChecked={IsChecked}
								mr={5}
								size='lg'
								key={DisplayLabel}
								onChange={() => handleChange(Label)}
							>
								{DisplayLabel ?? Label}
							</Checkbox>
						);
					})}
			</Box>
		</Box>
	);
};

export default Stats;
