import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const request = async (name: string) =>
	fetch(`${process.env.REACT_APP_API ?? ''}/search/${name}`).then((res) =>
		res.json()
	);

const Search = (): React.ReactElement => {
	const [inputText, setInputText] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const { refetch } = useQuery(['search', search], () => request(search), {
		enabled: false
	});

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
	}, [search]);

	const handleSearch = (query: string): void => {
		setInputText(query);
	};

	return (
		<Input
			value={inputText}
			onChange={({ target: { value } }) => handleSearch(value)}
		/>
	);
};

export default Search;
