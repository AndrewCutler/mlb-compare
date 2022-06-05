import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { AppState } from './store/slice';

const Players = (): React.ReactElement => {
	const { selections: players } = useSelector(AppState);

	return <Flex w='85vw' justifyContent='space-between'></Flex>;
};

export default Players;
