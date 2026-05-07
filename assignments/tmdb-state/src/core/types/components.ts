import type { ReactNode } from 'react';

export type ImageGridProps = {
	images: ImageCell[];
	onClick?: (image: ImageCell) => void;
	children?: (image: ImageCell) => ReactNode;
};

export type ImageCell = {
	id: number;
	imageUrl: string | null;
	primaryText: string | undefined;
	secondaryText?: string;
};

export type LinkGroupOptions = Array<{
	label: string;
	to: string;
	match?: string[];
}>;

export type LinkGroupProps = {
	options: LinkGroupOptions;
};
