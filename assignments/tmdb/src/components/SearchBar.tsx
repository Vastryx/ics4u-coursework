import { useEffect, useState, type ChangeEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
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
		<div className="flex w-full items-center gap-2">
			<div className="relative flex-1">
				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
					<FiSearch className="h-4 w-4 text-slate-400" aria-hidden="true" />
				</div>
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
					className="block w-full rounded-full border border-white/10 bg-slate-800/50 p-2.5 pl-10 text-sm text-white placeholder-slate-400 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
			<div className="hidden sm:block">
				<ButtonGroup
					value={type}
					options={[
						{ label: 'Movies', value: 'movie' },
						{ label: 'TV', value: 'tv' },
						{ label: 'Person', value: 'person' },
					]}
					onClick={setType}
				/>
			</div>
		</div>
	);
};
