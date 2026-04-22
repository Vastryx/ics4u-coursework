import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { Link } from '@/components';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';

export const TrendingView = () => {
	const navigate = useNavigate();
	const { category } = useParams();
	const [page, setPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useSearchParams();
	const interval = searchParams.get('interval') || 'day';
	const { data } = useTmdb<MoviesResponse>(
		`trending/${category}/${interval}`,
		{ page, time_window: interval },
		[page, interval],
	);

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
			<Link to="/trending/movies">Movies</Link>
			<Link to="/trending/tv">TV</Link>
			<section className="mx-auto max-w-300 space-y-5 p-5">
				<div className="mb-4 flex items-center justify-between">
					<h1 className="text-3xl font-bold">Now Playing</h1>
					<ButtonGroup
						value={interval}
						options={[
							{ label: 'Today', value: 'day' },
							{ label: 'Week', value: 'week' },
						]}
						onClick={(value) => setSearchParams({ interval: value })}
					/>
				</div>
				<ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
				<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
			</section>
		</>
	);
};
