import { Spinner as ChakraSpinner, Flex } from '@chakra-ui/react';

import { AppState } from './store/slice';
import { useSelector } from 'react-redux';

const Spinner = (): React.ReactElement => {
	const { isLoading } = useSelector(AppState);

	if (isLoading) {
		return (
			<Flex
				w='100vw'
				h='100vh'
				position='absolute'
				top='0'
				left='0'
				alignItems='center'
				justifyContent='center'
				zIndex='10000'>
				<ChakraSpinner thickness='5px' size='xl' />
			</Flex>
		);
	}

	return <></>;
};

export default Spinner;
