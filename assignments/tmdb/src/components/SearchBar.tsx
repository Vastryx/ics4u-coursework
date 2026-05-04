import { useEffect, useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ButtonGroup } from './ButtonGroup';

export const SearchBar = () => {
	const navigate = useNavigate();
	const [type, setType] = useState('movie');
	const [query, setQuery] = useState('');
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathname.startsWith('/search')) {
			void navigate(`/search?q=${query}&type=${type}`);
		}
	}, [navigate, pathname, query, type]);

	return (
		<>
			<input
				type="search"
				value={query}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					const nextQuery = e.target.value;
					setQuery(nextQuery);
					if (!pathname.startsWith('/search')) {
						void navigate(`/search?q=${nextQuery}&type=${type}`);
					}
				}}
				placeholder="Search actors, directors..."
				className="w-full rounded-xl border border-gray-700 bg-gray-800 p-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<ButtonGroup
				value={type}
				options={[
					{ label: 'Movies', value: 'movie' },
					{ label: 'TV', value: 'tv' },
					{ label: 'Person', value: 'person' },
				]}
				onClick={setType}
			/>
		</>
	);
};
