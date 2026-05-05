export type * from '@/core/apiResponses';

export type ImageGridResults = Array<{
	id: number;
	imagePath: string | null;
	primaryText: string;
	secondaryText?: string;
	mediaType?: 'movie' | 'tv';
}>;

export type ImageGridProps = {
	results: ImageGridResults;
	onClick?: (id: number, result: ImageGridResults[number]) => void;
};

export type LinkGroupOptions = Array<{
	label: string;
	to: string;
	match?: string[];
}>;

export type LinkGroupProps = {
	options: LinkGroupOptions;
};
