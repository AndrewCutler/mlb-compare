import { Box } from '@chakra-ui/react';
import Ages from './Ages';
import Stats from './Stats';

const TogglesInline = (): React.ReactElement => {
	return (
		<Box>
			<Stats />
			<Ages />
		</Box>
	);
};

export default TogglesInline;
