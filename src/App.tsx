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
import { Provider } from 'react-redux';
import store from './store/store';

export const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<QueryClientProvider client={new QueryClient()}>
					<Home />
				</QueryClientProvider>
			</Provider>
		</ChakraProvider>
	);
};
