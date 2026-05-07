import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { CreditsResponse, ImageCell } from '@/core';
import { useTmdb } from '@/hooks';

export const CreditsView = () => {
	const { pathname } = useLocation();
	const { id } = useParams();
	const mediaCategory = pathname.startsWith('/tv/') ? 'tv' : 'movie';
	const { data } = useTmdb<CreditsResponse>(`${mediaCategory}/${id}/credits`);
	const navigate = useNavigate();

	const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
		id: result.id,
		imageUrl: result.profile_path,
		primaryText: result.name,
		secondaryText: result.character,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return (
		<section className="px-2">
			<h2 className="mb-6 text-2xl font-bold">Credits</h2>
			{data.cast.length ? (
				<ImageGrid
					images={gridData}
					onClick={(id) => {
						void navigate(`/person/${id}/career`);
					}}
				/>
			) : (
				<p className="text-center text-gray-400">No credits available.</p>
			)}
		</section>
	);
};
