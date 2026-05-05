import { useNavigate } from 'react-router-dom';

import { ImageGrid, LinkGroup, Pagination } from '@/components';
import type { ImageGridResults } from '@/core/types';
import type { MediaListResponse } from '@/core/types/apiResponses';
import { usePageParam, useTmdb } from '@/hooks';

type TelevisionViewProps = {
	category: string;
};

export const TelevisionView = ({ category }: TelevisionViewProps) => {
	const navigate = useNavigate();
	const mediaCategory = category.replaceAll('-', '_');
	const [page, setPage] = usePageParam();
	const { data } = useTmdb<MediaListResponse>(`tv/${mediaCategory}`, { page });

	const gridData: ImageGridResults = (data?.results ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path,
		primaryText: result.original_title || result.original_name || '',
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
