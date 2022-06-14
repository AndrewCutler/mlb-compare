import { useEffect, useState } from 'react';

import { AppState } from './store/slice';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Seasons = (): React.ReactElement => {
	const { selections } = useSelector(AppState);

	const [overlaps, setOverlaps] = useState<string[]>([]);

	// useEffect(() => {
	// 	const years = selections
	// 		.map(({ StatsByAge: Data }) => Data.map(({ Year }) => Year))
	// 		.flat();
	// 	const uniques = new Set<string>();
	// 	const duplicates: string[] = [];
		
	// 	for (const year of years) {
	// 		if (!uniques.has(year)) {
	// 			uniques.add(year);
	// 		} else {
	// 			duplicates.push(year);
	// 		}
	// 	}

	// 	setOverlaps(duplicates);
	// }, [selections]);

	return (
		<Box>{overlaps.length > 0 && overlaps.map((year) => <span key={year}>{year}</span>)}</Box>
	);
};

export default Seasons;
