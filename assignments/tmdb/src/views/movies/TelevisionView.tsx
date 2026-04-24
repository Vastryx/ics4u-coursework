import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ImageGrid, Link, Pagination } from '@/components';
import type { Response } from '@/core/types';
import { useTmdb } from '@/hooks';

export const TelevisionView = () => {
	const navigate = useNavigate();
	const { category } = useParams();
	const [page, setPage] = useState<number>(1);
	const { data } = useTmdb<Response>(`tv/${category.replaceAll('-', '_')}`, { page }, [
		page,
		category,
	]);

	const gridData = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path,
		primaryText: result.original_title || result.original_name,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="mx-auto max-w-300 space-y-5 p-5">
			<div className="flex gap-6">
				<Link to="/tv/category/airing-today">Airing Today</Link>
				<Link to="/tv/category/on-the-air">On The Air</Link>
				<Link to="/tv/category/popular">Popular</Link>
				<Link to="/tv/category/top-rated">Top Rated</Link>
			</div>
			<ImageGrid results={gridData} onClick={(id) => navigate(`/tv/${id}/credits`)} />
			<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
		</section>
	);
};
