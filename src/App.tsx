import * as React from 'react';

import {
	ChakraProvider,
	theme
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import Home from './Home';
import { Provider } from 'react-redux';
import store from './store/store';

export const App = () => {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<QueryClientProvider client={new QueryClient()}>
					<Home />
					<ColorModeSwitcher/>
				</QueryClientProvider>
			</Provider>
		</ChakraProvider>
	);
};
