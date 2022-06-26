import '@fontsource/inconsolata/700.css';

import { useBreakpointValue } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './Home';
import Spinner from './Spinner';
import TogglesFooter from './TogglesFooter';

export const App = () => {
	const breakpoint = useBreakpointValue({ base: 'fixed', sm: 'inline' });

	return (
		<QueryClientProvider client={new QueryClient()}>
			<Spinner />
			<Home />
			{breakpoint === 'fixed' && <TogglesFooter />}
		</QueryClientProvider>
	);
};
