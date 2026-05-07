import { useNavigate, useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { ImageCell, MovieResponse } from '@/core';
import { useTmdb } from '@/hooks';

export const SeasonsView = () => {
	const { id } = useParams();
	const { data } = useTmdb<MovieResponse>(`tv/${id}`);
	const navigate = useNavigate();

	const gridData: ImageCell[] = (data?.seasons ?? []).map((result) => ({
		id: result.season_number,
		imageUrl: result.poster_path,
		primaryText: result.name,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="px-2">
			<h2 className="mb-6 text-2xl font-bold">Seasons</h2>
			{data.seasons?.length ? (
				<ImageGrid
					images={gridData}
					onClick={(seasonNumber) => {
						void navigate(`/tv/${id}/season/${seasonNumber}`);
					}}
				/>
			) : (
				<p className="text-center text-gray-400">No seasons available.</p>
			)}
		</section>
	);
};
