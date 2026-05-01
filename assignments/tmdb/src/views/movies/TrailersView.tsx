import { useParams } from 'react-router-dom';

import type { MovieRepsonse } from '@/core/types';
import { useTmdb } from '@/hooks';

export const TrailersView = () => {
	const { id, category } = useParams();
	const { data } = useTmdb<MovieRepsonse>(
		`${category.replace('movies', 'movie')}/${id}`,
		{ append_to_response: 'videos' },
		[id],
	);

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	const trailerVideo =
		data?.videos?.results.find(
			(v) =>
				v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official'),
		) || data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

	return (
		<section className="space-y-4 px-2">
			<h2 className="text-2xl font-bold">Trailers</h2>
			{trailerVideo ? (
				<div className="aspect-video">
					<iframe
						className="h-full w-full rounded-xl"
						src={`https://www.youtube.com/embed/${trailerVideo.key}`}
						title="Movie Trailer"
						allowFullScreen
					/>
				</div>
			) : (
				<p className="text-center text-gray-400">No trailers available.</p>
			)}
		</section>
	);
};
