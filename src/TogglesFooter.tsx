import {
	Box,
	Button,
	filter,
	Flex,
	FormControl,
	FormLabel,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Switch,
	useColorModeValue
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stats from './Stats';
import {
	AppState,
	resetAges,
	resetSeasons,
	toggleAge,
	toggleFilter,
	toggleSeason
} from './store/slice';
import TimeframeFilters, { ITimeframeFiltersConfig } from './TimeframeFilters';

const TogglesFooter = (): React.ReactElement => {
	const dispatch = useDispatch();
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
			<Box>
				<FormControl
					display='flex'
					flexDirection='column'
					alignItems='center'
				>
					<Switch
						id='switch'
						size='sm'
						isChecked={filter === 'seasons'}
						mr={5}
						onChange={() => dispatch(toggleFilter())}
					/>
					<FormLabel htmlFor='switch' fontSize='xs'>
						{filter === 'seasons' ? 'Ages' : 'Seasons'}
					</FormLabel>
				</FormControl>
			</Box>
			<Menu>
				<MenuButton as={Button}>
					{filter.replace(/^\w/, (c) => c.toUpperCase())}
				</MenuButton>
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
