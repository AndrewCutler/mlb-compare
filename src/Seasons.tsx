import { useEffect, useState } from 'react';

import { AppState, resetSeasons, toggleSeason } from './store/slice';
import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Seasons = ({ fixed }: { fixed?: boolean }): React.ReactElement => {
	const dispatch = useDispatch();
	const { selections, seasons } = useSelector(AppState);

	const [uniqueSeasons, setUniqueSeasons] = useState<string[]>([]);

	useEffect(() => {
		const uniques = Array.from(
			new Set(
				selections
					.map(({ StatsByAge }) => Object.keys(StatsByAge))
					.flat()
					.sort()
			)
		);
		setUniqueSeasons(uniques);
	}, [dispatch, selections]);

	useEffect(() => {
		dispatch(resetSeasons(uniqueSeasons));
	}, [dispatch, uniqueSeasons]);

	return (
		<Box mb={3}>
			<Text>Compare only these ages</Text>
			<Flex flexDirection={fixed ? 'column' : 'row'}>
				{uniqueSeasons.map((season) => (
					<div key={season}>
						<Checkbox
							mr={5}
							size='lg'
							isChecked={seasons.includes(season)}
							onChange={() => dispatch(toggleSeason(season))}
						>
							{season}
						</Checkbox>
					</div>
				))}
			</Flex>
		</Box>
	);
};

export default Seasons;
