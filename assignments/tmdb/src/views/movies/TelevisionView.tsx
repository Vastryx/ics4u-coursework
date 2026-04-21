import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ImageGrid, Link, Pagination } from '@/components';
import type { tvResponse } from '@/core/types';
import { useTmdb } from '@/hooks';

export const TelevisionView = () => {
	const navigate = useNavigate();
	const { category } = useParams();
	const [page, setPage] = useState<number>(1);
	const { data } = useTmdb<tvResponse>(`tv/${category.replace('-', '_')}`, { page }, [
		page,
		category,
	]);

	const gridData = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path,
		primaryText: result.original_title,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<>
			<Link to="/tv/category/airing-today">Now Playing</Link>
			<Link to="/tv/category/on-the-air">Popular</Link>
			<Link to="/tv/category/popular">Top Rated</Link>
			<Link to="/tv/category/top-rated">Upcoming</Link>
			<section className="mx-auto max-w-300 space-y-5 p-5">
				<h1 className="mb-4 text-3xl font-bold">Now Playing</h1>
				<ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
				<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
			</section>
		</>
	);
};
