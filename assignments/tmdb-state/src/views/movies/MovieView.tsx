import { FaCalendarAlt } from 'react-icons/fa';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { LinkGroup, Modal } from '@/components';
import { IMAGE_BASE_URL, ORIGINAL_IMAGE_BASE_URL } from '@/core/constants/images';
import type { MovieResponse } from '@/core/types/apiResponses';
import type { LinkGroupOptions } from '@/core/types/components';
import { useTmdb } from '@/hooks';
import { ErrorView } from '@/views/site/ErrorView';

export const MovieView = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { id } = useParams();
	const mediaCategory = pathname.startsWith('/tv/') ? 'tv' : 'movie';
	const { data } = useTmdb<MovieResponse>(`${mediaCategory}/${id}`);

	if (data === undefined) {
		return <p className="text-center text-gray-400">Loading...</p>;
	} else if (data === null) {
		return <ErrorView />;
	}

	const options: LinkGroupOptions = [
		{ label: 'Credits', to: 'credits' },
		{ label: 'Trailers', to: 'trailers' },
		{ label: 'Reviews', to: 'reviews' },
	];

	if (mediaCategory === 'tv') {
		options.unshift({
			label: 'Seasons',
			to: 'seasons',
			match: ['tv/:id/season'],
		});
	}

	return (
		<Modal onClose={() => navigate(-1)}>
			<div className="space-y-6 p-6">
				<div
					className="h-105 rounded-2xl bg-cover bg-center"
					style={{
						backgroundImage: `url(${ORIGINAL_IMAGE_BASE_URL}${data.backdrop_path})`,
					}}
				/>
				<div className="flex gap-8">
					<img
						className="h-82.5 w-55 rounded-xl object-cover"
						src={`${IMAGE_BASE_URL}${data.poster_path}`}
						alt={data.title || data.name}
					/>
					<div className="flex-1 space-y-4">
						<h1 className="text-3xl font-bold">{data.title || data.name}</h1>
						<p className="flex items-center gap-2 text-gray-400">
							<FaCalendarAlt />
							{data.release_date || data.first_air_date}
						</p>
						{mediaCategory === 'tv' && (
							<p>{`${data.number_of_seasons} Seasons - ${data.number_of_episodes} Episodes`}</p>
						)}
						<p className="text-gray-300">{data.overview}</p>
						<LinkGroup options={options} />
					</div>
				</div>
				<Outlet />
			</div>
		</Modal>
	);
};
