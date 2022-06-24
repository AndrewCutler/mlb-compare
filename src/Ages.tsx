import { Box, Checkbox, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, toggleAge } from './store/slice';

const Ages = (): React.ReactElement => {
	const dispatch = useDispatch();

	const { selections, ages } = useSelector(AppState);

	const [uniqueAges, setUniqueAges] = useState<string[]>([]);

	useEffect(() => {
		if (selections && selections.length > 0) {
			const uniqueAges = Array.from(
				new Set(
					selections
						.map(({ StatsByAge }) => Object.keys(StatsByAge))
						.flat()
						.filter((age) => age !== 'Career')
						.sort()
				)
			);
			setUniqueAges(uniqueAges);
		}
	}, [selections]);

	return (
		<Box mb={3}>
			<Text>Compare only these ages</Text>
			<Box>
				{uniqueAges.map((age) => (
					<Checkbox
						mr={5}
						key={age}
						size='lg'
						checked={ages.includes(age)}
						onChange={() => dispatch(toggleAge(age))}
					>
						{age}
					</Checkbox>
				))}
			</Box>
		</Box>
	);
};

export default Ages;
