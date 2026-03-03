const form = document.getElementsByTagName('form')[0] as HTMLFormElement;

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(form);
	const [a, b, c, d] = formData.values().map(Number);
	document.getElementsByClassName('equation')[0].innerHTML =
		`${a}x³ ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x² ${c >= 0 ? '+' : '-'} ${Math.abs(c)}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)} = 0`;

	const pElement = document.getElementById('p') as HTMLTableCellElement;
	const qElement = document.getElementById('q') as HTMLTableCellElement;
	const discriminantElement = document.getElementById('discriminant') as HTMLTableCellElement;
	const root1Element = document.getElementById('root1') as HTMLTableCellElement;
	const root2Element = document.getElementById('root2') as HTMLTableCellElement;
	const root3Element = document.getElementById('root3') as HTMLTableCellElement;

	const p = (3 * a * c - b ** 2) / (3 * a ** 2);
	const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
	const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

	pElement.innerHTML = p.toString();
	qElement.innerHTML = q.toString();
	discriminantElement.innerHTML = discriminant.toString();

	function cardano(p: number, q: number) {
		const part = -q / 2;
		const part2 = Math.sqrt((q / 2) ** 2 + (p / 3) ** 3);
		return Math.cbrt(part + part2) + Math.cbrt(part - part2) - b / (3 * a);
	}

	function trig(p: number, q: number) {
		const angle = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3))));
		const part = 2 * Math.sqrt(-p / 3);
		const part2 = b / (3 * a);

		const x1 = part * Math.cos(angle) - part2;
		const x2 = part * Math.cos(angle + 2 * (Math.PI / 3)) - part2;
		const x3 = part * Math.cos(angle + 4 * (Math.PI / 3)) - part2;

		return [x1, x2, x3];
	}

	if (discriminant < 0) {
		// 3 real
		const [x1, x2, x3] = trig(p, q);
		root1Element.innerHTML = x1.toString();
		root2Element.innerHTML = x2.toString();
		root3Element.innerHTML = x3.toString();
	} else if (discriminant > 0) {
		// 1 real, 2 complex
		root1Element.innerHTML = cardano(p, q).toString();
		root2Element.innerHTML = 'Complex Number';
		root3Element.innerHTML = 'Complex Number';
	} else if (p === 0 && q === 0) {
		// 1 real (Triple)
		root1Element.innerHTML = cardano(p, q).toString();
	} else {
		// 3 real (Double and single root)
		root1Element.innerHTML = cardano(p, q).toString();
		root2Element.innerHTML = (Math.cbrt(q / 2) - b / (3 * a)).toString();
	}
});
