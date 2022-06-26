import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Ages from './Ages';
import Stats from './Stats';
import { AppState } from './store/slice';

const TogglesFooter = (): React.ReactElement => {
	const { selections } = useSelector(AppState);
	const bg = useColorModeValue('gray.300', 'gray.700');

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
						<Ages fixed />
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default TogglesFooter;
