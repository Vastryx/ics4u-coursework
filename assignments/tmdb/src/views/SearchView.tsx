import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ImageGrid, Pagination } from '@/components';
import type { SearchResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';

export const SearchView = () => {
	const [page, setPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('q');
	const type = searchParams.get('type');
	const debouncedQuery = useDebounce(query, 500);
	const { data } = useTmdb<SearchResponse>(`search/${type}`, { query: debouncedQuery, page }, [
		debouncedQuery,
		page,
		type,
	]);

	useEffect(() => {
		setPage(1);
	}, [debouncedQuery]);

	const gridData = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path || result.profile_path,
		primaryText: result.original_title || result.original_name,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="mx-auto max-w-300 space-y-5 p-10">
			<ImageGrid results={gridData} />
			{data.results.length ? (
				<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
			) : (
				<p className="text-center text-gray-400">No search results found</p>
			)}
		</section>
	);
};
