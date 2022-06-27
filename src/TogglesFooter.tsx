import {
	Button,
	filter,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
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

const TogglesFooter = (): React.ReactElement => {
	const { selections, ages, seasons, filter } = useSelector(AppState);
	const bg = useColorModeValue('gray.300', 'gray.700');

	const [config, setConfig] = useState<ITimeframeFiltersConfig>({
		toggle: toggleAge,
		reset: resetAges,
		timeframes: ages
	});

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

	if (!selections || selections.length <= 0) {
		return <></>;
	}

	// TODO: do not close menu on selection
	return (
		<Flex
			justifyContent='space-between'
			position='fixed'
			bottom={0}
			px={10}
			py={5}
			left={0}
			bg={bg}
			zIndex={100}
			w='100%'
			h='80px'
		>
			<Menu>
				<MenuButton as={Button}>Stats</MenuButton>
				<MenuList>
					<MenuItem>
						<Stats fixed />
					</MenuItem>
				</MenuList>
			</Menu>
			<Menu>
				<MenuButton as={Button}>Ages</MenuButton>
				<MenuList>
					<MenuItem>
						<TimeframeFilters
							fixed
							toggle={config.toggle}
							reset={config.reset}
							timeframes={config.timeframes}
						/>
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default TogglesFooter;
