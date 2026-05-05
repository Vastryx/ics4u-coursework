import { useNavigate } from 'react-router-dom';

import { ImageGrid, LinkGroup, Pagination } from '@/components';
import type { MediaListResponse } from '@/core/apiResponses';
import type { ImageGridResults } from '@/core/types';
import { usePageParam, useTmdb } from '@/hooks';

type MoviesViewProps = {
	category: string;
};

export const MoviesView = ({ category }: MoviesViewProps) => {
	const navigate = useNavigate();
	const mediaCategory = category.replaceAll('-', '_');
	const [page, setPage] = usePageParam();
	const { data } = useTmdb<MediaListResponse>(`movie/${mediaCategory}`, { page });

	const gridData: ImageGridResults = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path,
		primaryText: result.original_title || result.original_name || '',
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<>
			<section className="mx-auto max-w-300 space-y-5 p-5">
				<div className="flex gap-6">
					<LinkGroup
						options={[
							{ label: 'Now Playing', to: '/movies/category/now-playing' },
							{ label: 'Popular', to: '/movies/category/popular' },
							{ label: 'Top Rated', to: '/movies/category/top-rated' },
							{ label: 'Upcoming', to: '/movies/category/upcoming' },
						]}
					/>
				</div>
				<ImageGrid results={gridData} onClick={(id) => navigate(`/movie/${id}/credits`)} />
				<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
			</section>
		</>
	);
};
