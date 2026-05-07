import { useParams } from 'react-router-dom';

import { ImageGrid } from '@/components';
import type { ImageCell, PersonImagesResponse } from '@/core';
import { useTmdb } from '@/hooks';

export const ImagesView = () => {
	const { id } = useParams();
	const { data } = useTmdb<PersonImagesResponse>(`person/${id}/images`);

	const gridData: ImageCell[] = (data?.profiles ?? []).map((image, index) => ({
		id: index,
		imageUrl: image.file_path,
		primaryText: `${image.width} x ${image.height}`,
		secondaryText: `Rating ${image.vote_average.toFixed(1)}`,
	}));

	if (!data) {
		return <p className="text-center text-gray-400">Loading...</p>;
	}

	return data.profiles.length ? (
		<ImageGrid images={gridData} />
	) : (
		<p className="text-center text-gray-400">No images available.</p>
	);
};
