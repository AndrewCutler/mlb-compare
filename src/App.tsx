import '@fontsource/inconsolata/700.css';

import {
	ChakraProvider,
	extendTheme,
	useBreakpointValue
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './Home';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import TogglesFooter from './TogglesFooter';
import { AppState } from './store/slice';

export const App = () => {
	const { selections } = useSelector(AppState);
	const breakpoint = useBreakpointValue({ base: 'fixed', sm: 'inline' });

	return (
		<QueryClientProvider client={new QueryClient()}>
			<Spinner />
			<Home />
			{breakpoint === 'fixed' && selections && selections.length > 0 && (
				<TogglesFooter />
			)}
		</QueryClientProvider>
	);
};
