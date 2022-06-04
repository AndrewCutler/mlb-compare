import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Search from './Search';
import SearchResults from './SearchResults';

const Home = (): React.ReactElement => {
	// const { isLoading, isSuccess, data } = useQuery('test', () =>
	// 	fetch(`${process.env.REACT_APP_API ?? ''}/search/pete`).then((res) =>
	// 		res.json()
	// 	)
	// );

	return (
		<Box>
			<Search />
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
