import { useNavigate } from 'react-router-dom';

import { ImageGrid, Pagination } from '@/components';
import { LinkGroup } from '@/components';
import { genres, type ImageCell } from '@/core';
import type { MediaListResponse } from '@/core/types/apiResponses';
import { usePageParam, useTmdb } from '@/hooks';

type GenreViewProps = {
	category: 'movies' | 'tv';
	genre: string;
};

export const GenreView = ({ category, genre }: GenreViewProps) => {
	const navigate = useNavigate();
	const genreData = genres[category][genre as keyof (typeof genres)[typeof category]];
	const genreKey = genreData.key;
	const [page, setPage] = usePageParam();
	const { data } = useTmdb<MediaListResponse>(
		`discover/${category === 'movies' ? 'movie' : 'tv'}`,
		{
			page,
			with_genres: genreKey,
		},
	);

	const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
		id: result.id,
		imageUrl: result.poster_path,
		primaryText: result.original_title || result.original_name || '',
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="mx-auto max-w-300 space-y-5 p-5">
			<LinkGroup
				options={[
					{
						label: 'Movies',
						to: '/genre/movies/action',
						match: ['/genre/movies'],
					},
					{
						label: 'TV',
						to: '/genre/tv/action',
						match: ['/genre/tv'],
					},
				]}
			/>
			<div>
				<LinkGroup
					options={Object.entries(genres[category]).map(([slug, item]) => ({
						label: item.label,
						to: `/genre/${category}/${slug}`,
					}))}
				/>
			</div>
			<ImageGrid
				images={gridData}
				onClick={(id) =>
					navigate(
						`/${category === 'movies' ? 'movie' : 'tv'}/${id}/${category === 'tv' ? 'seasons' : 'credits'}`,
					)
				}
			/>
			<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
		</section>
	);
};
