import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ImageGrid, Pagination } from '@/components';
import type { SearchResponse } from '@/core/types';
import { useDebounce, useTmdb } from '@/hooks';

export const SearchView = () => {
	const [page, setPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('q');
	const debouncedQuery = useDebounce(query, 500);
	const { data } = useTmdb<SearchResponse>('search/person', { query: debouncedQuery, page }, [
		debouncedQuery,
		page,
	]);

	useEffect(() => {
		setPage(1);
	}, [debouncedQuery]);

	const gridData = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.profile_path,
		primaryText: result.name,
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
