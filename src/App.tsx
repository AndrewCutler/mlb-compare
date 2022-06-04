import * as React from 'react';
import {
	ChakraProvider,
	Box,
	Text,
	Link,
	VStack,
	Code,
	Grid,
	theme
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './Home';

export const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={new QueryClient()}>
				<Home />
			</QueryClientProvider>
		</ChakraProvider>
	);
};
