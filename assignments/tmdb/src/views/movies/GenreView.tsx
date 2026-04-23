import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ImageGrid, Pagination } from '@/components';
import { Link } from '@/components';
import type { Response } from '@/core/types';
import { useTmdb } from '@/hooks';

const genres = {
	movies: [
		{ name: 'Action', key: 28 },
		{ name: 'Adventure', key: 12 },
		{ name: 'Animation', key: 16 },
		{ name: 'Crime', key: 80 },
		{ name: 'Family', key: 10751 },
		{ name: 'Fantasy', key: 14 },
		{ name: 'History', key: 36 },
		{ name: 'Horror', key: 27 },
		{ name: 'Mystery', key: 9648 },
		{ name: 'Sci-Fi', key: 878 },
	],
	tv: [
		{ name: 'Action', key: 10759 },
		{ name: 'Animation', key: 16 },
		{ name: 'Comedy', key: 35 },
		{ name: 'Crime', key: 80 },
		{ name: 'Documentary', key: 99 },
		{ name: 'Drama', key: 18 },
		{ name: 'Family', key: 10751 },
		{ name: 'Kids', key: 10762 },
		{ name: 'Mystery', key: 9648 },
		{ name: 'Sci-Fi', key: 10765 },
	],
};

type CategoryType = 'movies' | 'tv';

export const GenreView = () => {
	const navigate = useNavigate();
	const { category, genre } = useParams();
	const [page, setPage] = useState<number>(1);
	const { data } = useTmdb<Response>(
		`discover/${category.replace('movies', 'movie')}`,
		{ with_genre: 'jdsafdlksalkd' },
		[page, category],
	);

	const gridData = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path,
		primaryText: result.original_title || result.original_name,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<>
			<Link to="/genre/movies">Movies</Link>
			<Link to="/genre/tv">TV</Link>
			<section className="mx-auto max-w-300 space-y-5 p-5">
				<div className="mb-4 flex items-center justify-between">
					<h1 className="text-3xl font-bold">Now Playing</h1>
				</div>
				<ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
				<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
			</section>
		</>
	);
};
