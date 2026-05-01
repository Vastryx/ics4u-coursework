import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ImageGrid, LinkGroup, Pagination } from '@/components';
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
				<LinkGroup
					options={[
						{ label: 'Airing Today', to: '/tv/category/airing-today' },
						{ label: 'On The Air', to: '/tv/category/on-the-air' },
						{ label: 'Popular', to: '/tv/category/popular' },
						{ label: 'Top Rated', to: '/tv/category/top-rated' },
					]}
				/>
			</div>
			<ImageGrid results={gridData} onClick={(id) => navigate(`/tv/${id}/seasons`)} />
			<Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
		</section>
	);
};
