import { Flex, Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const request = async (name: string) =>
	fetch(`${process.env.REACT_APP_API ?? ''}/search/${name}`).then((res) =>
		res.json()
	);

export interface ISearchProps {
	onData: (data: any) => void;
}

const Search = ({ onData }: ISearchProps): React.ReactElement => {
	const [inputText, setInputText] = useState<string>('');
	const [search, setSearch] = useState<string>('');

	const { refetch, data, isFetching } = useQuery(
		['search', search],
		() => request(search),
		{
			enabled: false
		}
	);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSearch(inputText);
		}, 500);

		return () => clearTimeout(timeout);
	}, [inputText]);

	useEffect(() => {
		if (!!search.trim()) {
			refetch();
		}
	}, [search, refetch]);

	useEffect(() => {
		onData(data);
	}, [data, onData]);

	const handleSearch = (): void => {
		if (!isFetching) {
			refetch();
		}
	};

	return (
		<Flex>
			<Input
				placeholder='Search for players by name'
				value={inputText}
				onChange={({ target: { value } }) => setInputText(value)}
			/>
			<Button
				ml={2}
				isLoading={isFetching}
				variant='solid'
				onClick={handleSearch}
			>
				Search
			</Button>
		</Flex>
	);
};

export default Search;
