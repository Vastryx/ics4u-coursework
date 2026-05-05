import { useNavigate, useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { ImageGridResults } from '@/core/types';
import type { CareerResponse } from '@/core/types/apiResponses';
import { useTmdb } from '@/hooks';

export const CareerView = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data } = useTmdb<CareerResponse>(`person/${id}/combined_credits`);

	const gridData: ImageGridResults = (data?.cast ?? []).map((credit) => ({
		id: credit.id,
		imagePath: credit.poster_path,
		primaryText: credit.title || credit.name || '',
		secondaryText: credit.character,
		mediaType: credit.media_type,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return data.cast.length ? (
		<ImageGrid
			results={gridData}
			onClick={(mediaId, result) =>
				navigate(
					`/${result.mediaType}/${mediaId}/${result.mediaType === 'tv' ? 'seasons' : 'credits'}`,
				)
			}
		/>
	) : (
		<p className="text-center text-gray-400">No career credits available.</p>
	);
};
