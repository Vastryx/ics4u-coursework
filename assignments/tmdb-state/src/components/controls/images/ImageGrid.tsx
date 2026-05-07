import { IMAGE_BASE_URL, type ImageGridProps } from '@/core';

export const ImageGrid = ({ images, onClick }: ImageGridProps) => {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
			{images.map((result) => (
				<div
					key={result.id}
					className={`${onClick ? 'cursor-pointer' : ''} group relative flex flex-col overflow-hidden rounded-xl bg-slate-900 shadow-sm ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:ring-blue-500/50`}
					onClick={() => onClick?.(result)}
				>
					<div className="relative aspect-2/3 w-full overflow-hidden bg-slate-800">
						{result.imageUrl ? (
							<img
								className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								src={`${IMAGE_BASE_URL}${result.imageUrl}`}
								alt={result.primaryText}
								loading="lazy"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-slate-600">
								No Image
							</div>
						)}
						<div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
					</div>
					<div className="absolute bottom-0 w-full p-4 text-left">
						<p className="line-clamp-2 text-sm font-bold text-white transition-colors group-hover:text-blue-400">
							{result.primaryText}
						</p>
						{result.secondaryText && (
							<p className="mt-1 line-clamp-1 text-xs font-medium text-slate-300">
								{result.secondaryText}
							</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
};
