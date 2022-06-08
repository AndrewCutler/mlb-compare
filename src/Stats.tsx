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
		console.log(name);
		dispatch(toggleStat(name));
	};

	return (
		<Box>
			<Text>Compare stats</Text>
			<Stack spacing={[1, 3]} direction={['column', 'row']}>
				{stats.map(({ IsChecked, Name, Label }) => {
					return (
						<Checkbox
							isDisabled={selections && selections.length > 0}
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
