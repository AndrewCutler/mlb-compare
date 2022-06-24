import { Box, Checkbox, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from './store/slice';

// const getAllUniqueAges = ()

const Ages = (): React.ReactElement => {
	const { selections } = useSelector(AppState);

	const [ages, setAges] = useState<string[]>([]);

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
			setAges(uniqueAges);
		}
	}, [selections]);

	const toggleAge = (age: string): void => {
		throw new Error('Not implement');
	};

	return (
		<Box mb={3}>
			<Text>Compare only these ages</Text>
			<Box>
				{ages.map((age) => (
					<Checkbox
						mr={5}
						key={age}
						size='lg'
						onClick={() => toggleAge(age)}
					>
						{age}
					</Checkbox>
				))}
			</Box>
		</Box>
	);
};

export default Ages;
