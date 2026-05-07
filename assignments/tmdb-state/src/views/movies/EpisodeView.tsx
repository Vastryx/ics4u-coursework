import { useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { ImageCell, EpisodeResponse } from '@/core';
import { useTmdb } from '@/hooks';

export const EpisodeView = () => {
	const { id, seasonNumber } = useParams();
	const { data } = useTmdb<EpisodeResponse>(`tv/${id}/season/${seasonNumber}`);

	const gridData: ImageCell[] = (data?.episodes ?? []).map((result) => ({
		id: result.id,
		imageUrl: result.still_path,
		primaryText: result.name,
		secondaryText: `Episode ${result.episode_number} - ${result.air_date}`,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="px-2">
			<h2 className="mb-6 text-2xl font-bold">Episodes</h2>
			{data.episodes.length ? (
				<ImageGrid images={gridData} />
			) : (
				<p className="text-center text-gray-400">No episodes available.</p>
			)}
		</section>
	);
};
