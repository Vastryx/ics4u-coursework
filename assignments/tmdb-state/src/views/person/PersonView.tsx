import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Button, LinkGroup } from '@/components';
import { IMAGE_BASE_URL } from '@/core/constants';
import type { PersonResponse } from '@/core/types/apiResponses';
import { useTmdb } from '@/hooks';
import { ErrorView } from '@/views/ErrorView';

const formatValue = (value: string | null) => value || 'N/A';

export const PersonView = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data } = useTmdb<PersonResponse>(`person/${id}`);

	if (data === undefined) {
		return <p className="text-center text-gray-400">Loading...</p>;
	} else if (data === null) {
		return <ErrorView />;
	}

	return (
		<section className="mx-auto max-w-360 px-8 py-8 text-white">
			<div className="grid gap-8 lg:grid-cols-[250px_1fr]">
				<aside className="space-y-4">
					<div className="aspect-2/3 overflow-hidden rounded-xl bg-slate-800">
						{data.profile_path ? (
							<img
								className="h-full w-full object-cover"
								src={`${IMAGE_BASE_URL}${data.profile_path}`}
								alt={data.name}
							/>
						) : (
							<div className="flex h-full items-center justify-center text-slate-500">No Image</div>
						)}
					</div>
					<div className="flex justify-center">
						<Button onClick={() => navigate(-1)}>← Back</Button>
					</div>
				</aside>

				<div className="space-y-6">
					<h1 className="text-5xl font-bold tracking-normal">{data.name}</h1>

					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
						<Stat label="Place of Birth" value={formatValue(data.place_of_birth)} />
						<Stat label="Born" value={formatValue(data.birthday)} />
						<Stat label="Died" value={formatValue(data.deathday)} />
						<Stat label="Known For" value={formatValue(data.known_for_department)} />
					</div>

					<p className="text-xl leading-relaxed text-slate-100">
						{data.biography || 'No biography available.'}
					</p>

					<LinkGroup
						options={[
							{ label: 'Career', to: 'career' },
							{ label: 'Images', to: 'images' },
						]}
					/>
				</div>
			</div>

			<div className="mt-12">
				<Outlet />
			</div>
		</section>
	);
};

type StatProps = {
	label: string;
	value: string;
};

const Stat = ({ label, value }: StatProps) => (
	<div className="rounded-lg bg-slate-800 px-4 py-4">
		<p className="text-sm text-slate-400">{label}</p>
		<p className="mt-1 font-bold text-white">{value}</p>
	</div>
);
