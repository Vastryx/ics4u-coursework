import { IoLogoGithub } from 'react-icons/io';

export const Footer = () => {
	return (
		<footer className="mt-auto w-full pb-8 text-sm font-medium text-slate-500">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<p>Built with React, Vite and React Router</p>
				<a
					href="https://github.com/Vastryx/ics4u-coursework"
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-2 transition-colors duration-200 hover:text-slate-300"
				>
					<IoLogoGithub className="h-5 w-5" />
					<span>GitHub</span>
				</a>
			</div>
		</footer>
	);
};
