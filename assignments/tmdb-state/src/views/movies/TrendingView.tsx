import { useNavigate, useSearchParams } from 'react-router-dom';

import { ButtonGroup, ImageGrid, LinkGroup, Pagination } from '@/components';
import type { ImageCell, MediaListResponse } from '@/core';
import { usePageParam, useTmdb } from '@/hooks';
import { ErrorView } from '@/views';

type TrendingViewProps = {
	category: 'movies' | 'tv';
};

export const TrendingView = ({ category }: TrendingViewProps) => {
	const navigate = useNavigate();
	const mediaCategory = category.replace('movies', 'movie');
	const [page, setPage] = usePageParam();
	const [searchParams, setSearchParams] = useSearchParams();
	const intervalParam = searchParams.get('interval');
	const interval = intervalParam || 'day';

	if (interval !== 'day' && interval !== 'week') {
		return <ErrorView />;
	}

	const { data } = useTmdb<MediaListResponse>(`trending/${mediaCategory}/${interval}`, {
		page,
		time_window: interval,
	});

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
		id: result.id,
		imageUrl: result.poster_path,
		primaryText: result.original_title || result.original_name || '',
	}));

	return (
		<section className="mx-auto max-w-300 space-y-5 p-5">
			<div className="mb-4 flex items-center">
				<div className="mr-auto flex gap-3">
					<LinkGroup
						options={[
							{
								label: 'Movies',
								to: '/trending/movies',
							},
							{
								label: 'TV',
								to: '/trending/tv',
							},
						]}
					/>
				</div>
				<ButtonGroup
					value={interval}
					options={[
						{
							label: 'Today',
							value: 'day',
						},
						{
							label: 'Week',
							value: 'week',
						},
					]}
					onClick={(value) =>
						setSearchParams(
							value === 'day'
								? {}
								: {
										interval: value,
									},
						)
					}
				/>
			</div>
			<ImageGrid
				images={gridData}
				onClick={(id) =>
					navigate(`/${mediaCategory}/${id}/${category === 'tv' ? 'seasons' : 'credits'}`)
				}
			/>
			<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
		</section>
	);
};
