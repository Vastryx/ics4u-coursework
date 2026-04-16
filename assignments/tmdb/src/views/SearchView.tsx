import { useEffect, useState } from 'react';

import { ImageGrid, Pagination, SearchBar } from '@/components';
import { SEARCH_ENDPOINT } from '@/core/constants';
import type { SearchResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';

export const SearchView = () => {
	const [query, setQuery] = useState('');
	const [page, setPage] = useState<number>(1);
	const debouncedQuery = useDebounce(query, 500);
	const { data } = useTmdb<SearchResponse>(SEARCH_ENDPOINT, { query: debouncedQuery, page }, [
		debouncedQuery,
		page,
	]);

	const gridData = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.profile_path,
		primaryText: result.name,
	}));

	useEffect(() => {
		setPage(1);
	}, [debouncedQuery]);

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="mx-auto max-w-[1200px] space-y-5 p-10">
			<SearchBar value={query} onChange={setQuery} />
			{data.results.length ? (
				<>
					<ImageGrid results={gridData} />
					<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
				</>
			) : (
				<p className="text-center text-gray-400">No search results found</p>
			)}
		</section>
	);
};
