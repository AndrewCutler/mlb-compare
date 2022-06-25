import {
	Box,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useBreakpointValue,
	useColorModeValue
} from '@chakra-ui/react';
import Ages from './Ages';
import Stats from './Stats';

const Toggles = (): React.ReactElement => {
	const breakpoint = useBreakpointValue({ base: 'fixed', sm: 'inline' });
	const bg = useColorModeValue('gray.300', 'gray.700');

	if (breakpoint === 'fixed') {
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
				w='100vw'
				h='10vh'
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
	}

	return (
		<Box>
			<Stats />
			<Ages />
		</Box>
	);
};

export default Toggles;
