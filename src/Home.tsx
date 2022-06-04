import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { ISearchPlayer, ISearchResult } from './api/models';
import Search from './Search';
import SearchResults from './SearchResults';

const Home = (): React.ReactElement => {
	// const { isLoading, isSuccess, data } = useQuery('test', () =>
	// 	fetch(`${process.env.REACT_APP_API ?? ''}/search/pete`).then((res) =>
	// 		res.json()
	// 	)
	// );
	const [searchResults, setSearchResults] = useState<ISearchPlayer[]>([]);
	const handleData = (data: ISearchResult): void => {
		console.log('Result: ', data);
		// setSearchResults(data?.Data ?? []);
	};

	return (
		<Box p={5}>
			<Search onData={handleData} />
			<SearchResults results={searchResults} />
			{/* {isLoading ? (
				'Loading...'
			) : isSuccess ? (
				<SearchResults results={data.Data} />
			) : (
				'Error'
			)} */}
		</Box>
	);
};

export default Home;
