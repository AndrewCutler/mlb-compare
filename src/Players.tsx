import { Badge, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, removeSelection } from './store/slice';
import { MdDelete } from 'react-icons/md';
const Players = (): React.ReactElement => {
	const dispatch = useDispatch();

	const { selections: players } = useSelector(AppState);

	const handleDelete = (playerName: string): void => {
		dispatch(removeSelection(playerName));
	};

	return (
		<Flex w='85vw' mb={3}>
			{players.map(({ Name }) => (
				<Badge
					display='flex'
					p={2}
					colorScheme='blue'
					_hover={{ textDecoration: 'underline' }}
					key={Name}
					mr={5}
				>
					<span style={{ marginRight: 4 }}>{Name}</span>{' '}
					<MdDelete
						style={{ fontSize: 20, cursor: 'pointer' }}
						onClick={() => handleDelete(Name)}
					/>
				</Badge>
			))}
		</Flex>
	);
};

export default Players;
