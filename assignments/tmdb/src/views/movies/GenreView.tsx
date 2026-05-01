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
} as const;

export const GenreView = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState<number>(1);
	const { category, genre } = useParams();
	const { data } = useTmdb<Response>(
		`discover/${category.replace('movies', 'movie')}`,
		{ page, with_genres: genres[category].find((f) => f.name.toLowerCase() === genre).key },
		[page, category, genre],
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
		<section className="mx-auto max-w-300 space-y-5 p-5">
			<div className="flex gap-6">
				<Link to="/genre/movies/action" match={['/genre/movies']}>
					Movies
				</Link>
				<Link to="/genre/tv/action" match={['/genre/tv']}>
					TV
				</Link>
			</div>
			<div>
				<div className="flex gap-6">
					{genres[category].map((f, i) => {
						return (
							<Link key={i} to={`/genre/${category}/${f.name.toLowerCase()}`}>
								{f.name}
							</Link>
						);
					})}
				</div>
			</div>
			<ImageGrid
				results={gridData}
				onClick={(id) =>
					navigate(
						`/${category.replace('movies', 'movie')}/${id}/${category === 'tv' ? 'seasons' : 'credits'}`,
					)
				}
			/>
			<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
		</section>
	);
};
