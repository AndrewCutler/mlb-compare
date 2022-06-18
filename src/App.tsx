import '@fontsource/inconsolata/700.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './Home';
import { Provider } from 'react-redux';
import Spinner from './Spinner';
import store from './store/store';

export const App = () => {
	const theme = extendTheme({
		fonts: {
			body: 'Inconsolata',
		},
		styles: {
			global: {
				body: {
					fontSize: '20px'
				},
			}
		},
	});

	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<QueryClientProvider client={new QueryClient()}>
					<Spinner />
					<Home />
				</QueryClientProvider>
			</Provider>
		</ChakraProvider>
	);
};
