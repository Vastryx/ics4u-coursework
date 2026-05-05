import { useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { PersonImagesResponse } from '@/core/apiResponses';
import type { ImageGridResults } from '@/core/types';
import { useTmdb } from '@/hooks';

export const ImagesView = () => {
	const { id } = useParams();
	const { data } = useTmdb<PersonImagesResponse>(`person/${id}/images`);

	const gridData: ImageGridResults = (data?.profiles ?? []).map((image, index) => ({
		id: index,
		imagePath: image.file_path,
		primaryText: `${image.width} x ${image.height}`,
		secondaryText: `Rating ${image.vote_average.toFixed(1)}`,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return data.profiles.length ? (
		<ImageGrid results={gridData} />
	) : (
		<p className="text-center text-gray-400">No images available.</p>
	);
};
