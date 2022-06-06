import { Box, Checkbox, Text, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { AppState } from './store/slice';

const Stats = (): React.ReactElement => {
	const {
		stats: { StatSelection: stats }
	} = useSelector(AppState);

	const handleChange = (name: string): void => {
		console.log(name);
	};

	return (
		<Box>
			<Text>Compare stats</Text>
			<Stack spacing={[1, 3]} direction={['column', 'row']}>
				{stats.map(({ IsDisabled, IsChecked, Name, Label }) => {
					return (
						<Checkbox
							isDisabled={IsDisabled}
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
