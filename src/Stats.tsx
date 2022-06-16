import { AppState, toggleStat } from './store/slice';
import { Box, Checkbox, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Stats = (): React.ReactElement => {
	const dispatch = useDispatch();

	const {
		stats,
		selections
	} = useSelector(AppState);

	const handleChange = (label: string): void => {
		dispatch(toggleStat(label));
	};

	const isDisabled = !selections || selections.length === 0;

	return (
		<Box mb={3}>
			<Text>Choose stats to compare</Text>
			<Box>
				{stats.map(({ IsChecked, Label, DisplayLabel }) => {
					return (
						<Checkbox
							isDisabled={isDisabled || DisplayLabel === 'WAR'}
							isChecked={IsChecked}
							mr={5}
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
