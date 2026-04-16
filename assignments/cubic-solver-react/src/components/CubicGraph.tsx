import { useEffect, useRef } from 'react';

type CubicGraphProps = {
	a: number;
	b: number;
	c: number;
	d: number;
	roots: (number | null)[];
};

export function CubicGraph({ a, b, c, d, roots }: CubicGraphProps) {
	const canvas = useRef(null);

	function drawGraph(
		a: number,
		b: number,
		c: number,
		d: number,
		roots: number[],
		canvas: HTMLCanvasElement,
	) {
		const graph = canvas.getContext('2d');
		if (!graph) return;

		graph.reset();

		// Coordinate ranges
		const xMax = 10;
		const xMin = -xMax;
		const yMax = 10;
		const yMin = -yMax;

		function toPixel(x: number, y: number) {
			const px = ((x - xMin) / (xMax - xMin)) * canvas.width;
			const py = canvas.height - ((y - yMin) / (yMax - yMin)) * canvas.height;
			return [px, py];
		}

		graph.beginPath();
		graph.strokeStyle = '#e4e4e7';
		graph.lineWidth = 1;

		for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
			const [px] = toPixel(x, 0);
			graph.moveTo(px, 0);
			graph.lineTo(px, canvas.height);
		}

		for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
			const [, py] = toPixel(0, y);
			graph.moveTo(0, py);
			graph.lineTo(canvas.width, py);
		}

		graph.stroke();

		graph.beginPath();
		graph.strokeStyle = '#52525b';
		graph.lineWidth = 1.5;
		// x-axis
		graph.moveTo(0, canvas.height / 2);
		graph.lineTo(canvas.width, canvas.height / 2);
		// y-axis
		graph.moveTo(canvas.width / 2, 0);
		graph.lineTo(canvas.width / 2, canvas.height);
		graph.stroke();

		graph.strokeStyle = 'blue';
		graph.lineWidth = 2;
		graph.beginPath();

		if (a === 0) {
			return;
		}

		for (let px = 0; px <= canvas.width; px++) {
			const x = xMin + (px / canvas.width) * (xMax - xMin);
			const y = a * x ** 3 + b * x ** 2 + c * x + d;
			const [cx, cy] = toPixel(x, y);
			if (px === 0) {
				graph.moveTo(cx, cy);
				continue;
			}
			graph.lineTo(cx, cy);
		}

		graph.stroke();

		graph.fillStyle = '#dc2626';
		graph.strokeStyle = '#ffffff';
		graph.lineWidth = 2;

		for (const root of roots) {
			const [px, py] = toPixel(root, 0);
			graph.beginPath();
			graph.arc(px, py, 6, 0, Math.PI * 2);
			graph.fill();
			graph.stroke();
		}
	}

	useEffect(() => {
		if (canvas.current != null) {
			drawGraph(
				a,
				b,
				c,
				d,
				roots.filter((root) => root !== null),
				canvas.current,
			);
		}
	}, [a, b, c, d, roots]);

	return (
		<canvas
			ref={canvas}
			id="graph"
			width="600"
			height="520"
			className="h-auto w-full max-w-full rounded-xl border border-gray-300 md:w-auto"
		></canvas>
	);
}
