import { AppState, toggleStat } from './store/slice';
import { Box, Checkbox, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Stats = (): React.ReactElement => {
	const dispatch = useDispatch();

	const {
		stats,
		selections
	} = useSelector(AppState);

	const handleChange = (name: string): void => {
		dispatch(toggleStat(name));
	};

	const isDisabled = !selections || selections.length === 0;

	return (
		<Box mb={3}>
			<Text>Choose stats to compare</Text>
			<Box>
				{stats.map(({ IsChecked, Name, Label, DisplayLabel }) => {
					return (
						<Checkbox
							isDisabled={isDisabled || Name === 'WAR'}
							isChecked={IsChecked}
							mr={5}
							key={Name}
							onChange={() => handleChange(Name)}
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
