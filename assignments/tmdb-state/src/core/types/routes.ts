export const movieCategories = ['now-playing', 'popular', 'top-rated', 'upcoming'] as const;
export const tvCategories = ['airing-today', 'on-the-air', 'popular', 'top-rated'] as const;
export const trendingCategories = ['movies', 'tv'] as const;

export const genres = {
	movies: {
		action: {
			label: 'Action',
			key: 28,
		},
		adventure: {
			label: 'Adventure',
			key: 12,
		},
		animation: {
			label: 'Animation',
			key: 16,
		},
		crime: {
			label: 'Crime',
			key: 80,
		},
		family: {
			label: 'Family',
			key: 10751,
		},
		fantasy: {
			label: 'Fantasy',
			key: 14,
		},
		history: {
			label: 'History',
			key: 36,
		},
		horror: {
			label: 'Horror',
			key: 27,
		},
		mystery: {
			label: 'Mystery',
			key: 9648,
		},
		'sci-fi': {
			label: 'Sci-Fi',
			key: 878,
		},
	},
	tv: {
		action: {
			label: 'Action',
			key: 10759,
		},
		animation: {
			label: 'Animation',
			key: 16,
		},
		comedy: {
			label: 'Comedy',
			key: 35,
		},
		crime: {
			label: 'Crime',
			key: 80,
		},
		documentary: {
			label: 'Documentary',
			key: 99,
		},
		drama: {
			label: 'Drama',
			key: 18,
		},
		family: {
			label: 'Family',
			key: 10751,
		},
		kids: {
			label: 'Kids',
			key: 10762,
		},
		mystery: {
			label: 'Mystery',
			key: 9648,
		},
		'sci-fi': {
			label: 'Sci-Fi',
			key: 10765,
		},
	},
} as const;
