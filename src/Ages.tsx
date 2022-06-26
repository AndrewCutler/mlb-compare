import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, resetAges, toggleAge } from './store/slice';

const Ages = ({ fixed }: { fixed?: boolean }): React.ReactElement => {
	const dispatch = useDispatch();

	const { selections, ages } = useSelector(AppState);

	const [uniqueAges, setUniqueAges] = useState<string[]>([]);

	useEffect(() => {
		const uniques = Array.from(
			new Set(
				selections
					.map(({ StatsByAge }) => Object.keys(StatsByAge))
					.flat()
					.sort()
			)
		);
		setUniqueAges(uniques);
	}, [dispatch, selections]);

	useEffect(() => {
		// exlude 'Career' by default
		const ageSeasons = uniqueAges.filter((age) => age !== 'Career');
		dispatch(resetAges(ageSeasons));
	}, [dispatch, uniqueAges]);

	if (!selections || selections.length <= 0) {
		return <></>;
	}

	return (
		<Box mb={3}>
			<Text>Compare only these ages</Text>
			<Flex flexDirection={fixed ? 'column' : 'row'}>
				{uniqueAges.map((age) => (
					<div key={age}>
						<Checkbox
							mr={5}
							size='lg'
							isChecked={ages.includes(age)}
							onChange={() => dispatch(toggleAge(age))}
						>
							{age}
						</Checkbox>
					</div>
				))}
			</Flex>
		</Box>
	);
};

export default Ages;
