import { Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Title = (): React.ReactElement => {
	return (
		<Flex justifyContent='space-between' mb={3}>
			<div>MLB Compare</div>
			<ColorModeSwitcher />
		</Flex>
	);
};

export default Title;
