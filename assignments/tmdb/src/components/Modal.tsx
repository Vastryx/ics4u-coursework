import type { ReactNode } from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
			onClick={onClose}
		>
			<div
				className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-gray-800 bg-gray-950 text-gray-100 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};
