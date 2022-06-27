import {
	Box,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Switch,
	Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, toggleFilter } from './store/slice';

export interface ITimeframeFiltersConfig {
	toggle: (payload: string) => { payload: string; type: string };
	reset: (payload: string[]) => { payload: string[]; type: string };
	timeframes: string[];
}

export interface ITimeframeFiltersProps extends ITimeframeFiltersConfig {
	fixed?: boolean;
}

const TimeframeFilters = ({
	fixed,
	toggle,
	reset,
	timeframes
}: ITimeframeFiltersProps): React.ReactElement => {
	const dispatch = useDispatch();

	const { selections, filter } = useSelector(AppState);

	const [uniqueTimeframes, setUniqueTimeframes] = useState<string[]>([]);

	useEffect(() => {
		let uniques;
		// if filter === 'ages', do this. Else, grab seasons.
		if (filter === 'ages') {
			uniques = Array.from(
				new Set(
					selections
						.map(({ StatsByAge }) => Object.keys(StatsByAge))
						.flat()
						.sort()
				)
			);
		} else {
			uniques = Array.from(
				new Set(
					selections
						.map(({ StatsByAge }) =>
							Object.values(StatsByAge).map(({ Year }) => Year)
						)
						.flat()
						.sort()
				)
			);
		}
		setUniqueTimeframes(uniques);
	}, [dispatch, filter, selections]);

	useEffect(() => {
		// Exlude 'Career' by default
		const individualTimeframes = uniqueTimeframes.filter(
			(timeframe) => timeframe !== 'Career'
		);
		dispatch(reset(individualTimeframes));
	}, [dispatch, reset, uniqueTimeframes]);

	if (!selections || selections.length <= 0) {
		return <></>;
	}

	return (
		<Box mb={3}>
			<Text>Compare only these {filter}</Text>
			<Flex flexDirection={fixed ? 'column' : 'row'}>
				{uniqueTimeframes.map((timeframe) => (
					<div key={timeframe}>
						<Checkbox
							mr={5}
							size='lg'
							isChecked={timeframes.includes(timeframe)}
							onChange={() => dispatch(toggle(timeframe))}
						>
							{timeframe}
						</Checkbox>
					</div>
				))}
			</Flex>
			<Box>
				<FormControl display='flex'>
					<Switch
						id='switch'
						size='sm'
						isChecked={filter === 'seasons'}
						mr={5}
						onChange={() => dispatch(toggleFilter())}
					/>
					<FormLabel htmlFor='switch'>
						Compare {filter === 'seasons' ? 'ages' : 'seasons'}
					</FormLabel>
				</FormControl>
			</Box>
		</Box>
	);
};

export default TimeframeFilters;
