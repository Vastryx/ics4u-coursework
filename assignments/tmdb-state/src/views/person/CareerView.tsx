import { useNavigate, useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { ImageCell, CareerResponse } from '@/core';
import { useTmdb } from '@/hooks';

export const CareerView = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data } = useTmdb<CareerResponse>(`person/${id}/combined_credits`);

	const gridData: ImageCell[] = (data?.cast ?? []).map((credit) => ({
		id: credit.id,
		imageUrl: credit.poster_path,
		primaryText: credit.title || credit.name || '',
		secondaryText: credit.character,
		mediaType: credit.media_type,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return data.cast.length ? (
		<ImageGrid
			images={gridData}
			onClick={(result) =>
				navigate(
					`/${result.mediaType}/${result.id}/${result.mediaType === 'tv' ? 'seasons' : 'credits'}`,
				)
			}
		/>
	) : (
		<p className="text-center text-gray-400">No career credits available.</p>
	);
};
