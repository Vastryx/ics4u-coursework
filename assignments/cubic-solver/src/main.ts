const form = document.getElementsByTagName('form')[0] as HTMLFormElement;
const canvas = document.getElementById('graph') as HTMLCanvasElement;
const graph = canvas.getContext('2d');

function cardano(p: number, q: number, a: number, b: number) {
	const part = -q / 2;
	const discriminant = (q / 2) ** 2 + (p / 3) ** 3;
	// Account for floating point errors
	// Clamp to 0 to avoid negative square root
	const part2 = Math.sqrt(Math.max(discriminant, 0));
	return Math.cbrt(part + part2) + Math.cbrt(part - part2) - b / (3 * a);
}

function trig(p: number, q: number, a: number, b: number) {
	const angle = Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3)))) / 3;
	const part = 2 * Math.sqrt(-p / 3);
	const part2 = b / (3 * a);

	const x1 = part * Math.cos(angle) - part2;
	const x2 = part * Math.cos(angle + 2 * (Math.PI / 3)) - part2;
	const x3 = part * Math.cos(angle + 4 * (Math.PI / 3)) - part2;

	return [x1, x2, x3];
}

function drawGraph(a: number, b: number, c: number, d: number, roots: number[]) {
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

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(form);
	const [a, b, c, d] = formData.values().map(Number);

	if (a === 0) return;

	const terms: [number, string][] = [
		[a, 'x³'],
		[b, 'x²'],
		[c, 'x'],
		[d, ''],
	];
	const term = (coeff: number, value: string) =>
		`${coeff > 0 ? '+ ' : '- '}${value && Math.abs(coeff) === 1 ? value : Math.abs(coeff) + value}`;
	const equation = terms
		.filter(([coeff]) => coeff !== 0)
		.map(([coeff, value], i) =>
			i === 0 ? term(coeff, value).replace('+ ', '') : term(coeff, value),
		)
		.join(' ');

	(document.getElementById('equation') as HTMLElement).textContent = `${equation} = 0`;

	const pElement = document.getElementById('p') as HTMLTableCellElement;
	const qElement = document.getElementById('q') as HTMLTableCellElement;
	const discriminantElement = document.getElementById('discriminant') as HTMLTableCellElement;
	const root1Element = document.getElementById('root1') as HTMLTableCellElement;
	const root2Element = document.getElementById('root2') as HTMLTableCellElement;
	const root3Element = document.getElementById('root3') as HTMLTableCellElement;

	const p = (3 * a * c - b ** 2) / (3 * a ** 2);
	const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
	const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

	pElement.textContent = p.toPrecision(5);
	qElement.textContent = q.toPrecision(5);
	discriminantElement.textContent = discriminant.toPrecision(5);

	// Account for floating point errors
	// Scale tolerance to term with largest magnitude
	const discriminantTolerance =
		Number.EPSILON * Math.max(1, Math.abs((q / 2) ** 2), Math.abs((p / 3) ** 3)) * 1024;
	const roots: number[] = [];

	if (discriminant < -discriminantTolerance) {
		// 3 real
		const [x1, x2, x3] = trig(p, q, a, b);
		roots.push(x1, x2, x3);
		root1Element.textContent = x1.toPrecision(5);
		root2Element.textContent = x2.toPrecision(5);
		root3Element.textContent = x3.toPrecision(5);
	} else if (discriminant > discriminantTolerance) {
		// 1 real, 2 complex
		const realRoot = cardano(p, q, a, b);
		roots.push(realRoot);
		root1Element.textContent = realRoot.toPrecision(5);
		root2Element.textContent = 'Complex Number';
		root3Element.textContent = 'Complex Number';
	} else if (Math.abs(p) < discriminantTolerance && Math.abs(q) < discriminantTolerance) {
		// 1 real (Triple)
		const tripleRoot = cardano(p, q, a, b);
		roots.push(tripleRoot);
		root1Element.textContent = tripleRoot.toPrecision(5);
		root2Element.textContent = 'None';
		root3Element.textContent = 'None';
	} else {
		// 3 real (Double and single root)
		const repeatedRoot = cardano(p, q, a, b);
		const singleRoot = Math.cbrt(q / 2) - b / (3 * a);
		roots.push(repeatedRoot, singleRoot);
		root1Element.textContent = repeatedRoot.toPrecision(5);
		root2Element.textContent = singleRoot.toPrecision(5);
		root3Element.textContent = 'None';
	}

	drawGraph(a, b, c, d, roots);
});
