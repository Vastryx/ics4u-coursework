import { useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';

export const SeasonsView = () => {
	const { id, category } = useParams();
	const mediaCategory = category ?? 'tv';
	const { data } = useTmdb<MovieRepsonse>(`${mediaCategory}/${id}`);

	const gridData = (data?.seasons ?? []).map((result) => ({
		id: result.id,
		imagePath: result.poster_path,
		primaryText: result.name,
		secondaryText: result.name,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="px-2">
			<h2 className="mb-6 text-2xl font-bold">Seasons</h2>
			{data.seasons?.length ? (
				<ImageGrid results={gridData} />
			) : (
				<p className="text-center text-gray-400">No seasons available.</p>
			)}
		</section>
	);
};
