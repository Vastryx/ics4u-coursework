import { Outlet } from 'react-router-dom';

import { Footer } from '@/components';
import { Header } from '@/components/Header';

export const MainLayout = () => {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
			<Header />
			<main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
