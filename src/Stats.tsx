import { Box, Checkbox, Text, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, toggleStat } from './store/slice';

const Stats = (): React.ReactElement => {
	const dispatch = useDispatch();

	const {
		stats: { StatSelection: stats },
		selections
	} = useSelector(AppState);

	const handleChange = (name: string): void => {
		dispatch(toggleStat(name));
	};

	const isDisabled = !selections || selections.length === 0;

	return (
		<Box mb={3}>
			<Text>Choose stats to compare</Text>
			<Stack spacing={[1, 3]} direction={['column', 'row']}>
				{stats.map(({ IsChecked, Name, Label }) => {
					return (
						<Checkbox
							isDisabled={isDisabled}
							isChecked={IsChecked}
							key={Name}
							onChange={() => handleChange(Name)}
						>
							{Label}
						</Checkbox>
					);
				})}
			</Stack>
		</Box>
	);
};

export default Stats;
