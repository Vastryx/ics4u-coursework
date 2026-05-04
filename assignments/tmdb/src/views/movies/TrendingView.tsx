import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { ButtonGroup, ImageGrid, LinkGroup, Pagination } from '@/components';
import type { Response } from '@/core/types';
import { useTmdb } from '@/hooks';

export const TrendingView = () => {
	const navigate = useNavigate();
	const { category } = useParams();
	const mediaCategory = category?.replace('movies', 'movie') ?? 'movie';
	const [page, setPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useSearchParams();
	const interval = searchParams.get('interval') || 'day';
	const { data } = useTmdb<Response>(`trending/${mediaCategory}/${interval}`, {
		page,
		time_window: interval,
	});

	const gridData = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path,
		primaryText: result.original_title || result.original_name || '',
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="mx-auto max-w-300 space-y-5 p-5">
			<div className="mb-4 flex items-center">
				<div className="mr-auto flex gap-3">
					<LinkGroup
						options={[
							{ label: 'Movies', to: '/trending/movies' },
							{ label: 'TV', to: '/trending/tv' },
						]}
					/>
				</div>
				<ButtonGroup
					value={interval}
					options={[
						{ label: 'Today', value: 'day' },
						{ label: 'Week', value: 'week' },
					]}
					onClick={(value) => setSearchParams({ interval: value })}
				/>
			</div>
			<ImageGrid
				results={gridData}
				onClick={(id) =>
					navigate(`/${mediaCategory}/${id}/${category === 'tv' ? 'seasons' : 'credits'}`)
				}
			/>
			<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
		</section>
	);
};
