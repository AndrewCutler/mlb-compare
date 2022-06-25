import { AppState, toggleStat } from './store/slice';
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { TABS } from './models/local.models';

const Stats = ({ fixed }: { fixed?: boolean }): React.ReactElement => {
	const dispatch = useDispatch();

	const { stats, selections, tabIndex } = useSelector(AppState);

	const handleChange = (label: string): void => {
		dispatch(toggleStat(label));
	};

	const isDisabled = !selections || selections.length === 0;

	return (
		<Box mb={3}>
			<Text>Compare only these stats</Text>
			<Flex flexDirection={fixed ? 'column' : 'row'}>
				{stats
					.filter((stat) =>
						TABS[tabIndex] === 'RADAR' ? stat.IsRadar : true
					)
					.map(({ IsChecked, Label, DisplayLabel }) => {
						return (
							<div>
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
							</div>
						);
					})}
			</Flex>
		</Box>
	);
};

export default Stats;
