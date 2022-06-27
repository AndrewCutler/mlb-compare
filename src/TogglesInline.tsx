import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Stats from './Stats';
import {
	AppState,
	resetAges,
	resetSeasons,
	toggleAge,
	toggleSeason
} from './store/slice';
import TimeframeFilters, { ITimeframeFiltersConfig } from './TimeframeFilters';

const TogglesInline = (): React.ReactElement => {
	const { ages, seasons, filter } = useSelector(AppState);

	const [config, setConfig] = useState<ITimeframeFiltersConfig>({
		toggle: toggleAge,
		reset: resetAges,
		timeframes: ages
	});

	// TODO: these don't need to be props and can exist inside TimeframeFilters.tsx
	useEffect(() => {
		if (filter === 'ages') {
			setConfig({
				toggle: toggleAge,
				reset: resetAges,
				timeframes: ages
			});
		} else {
			setConfig({
				toggle: toggleSeason,
				reset: resetSeasons,
				timeframes: seasons
			});
		}
	}, [ages, filter, seasons]);

	return (
		<Box>
			<Stats />
			<TimeframeFilters
				toggle={config.toggle}
				reset={config.reset}
				timeframes={config.timeframes}
			/>
		</Box>
	);
};

export default TogglesInline;
