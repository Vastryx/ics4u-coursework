const form = document.getElementsByTagName('form')[0] as HTMLFormElement;

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(form);
	const [a, b, c, d] = formData.values().map(Number);

	document.getElementsByClassName('equation')[0].innerHTML =
		`${a}x³ ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x² ${c >= 0 ? '+' : '-'} ${Math.abs(c)}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)} = 0`;

	const p = (3 * a * c - b ** 2) / (3 * a ** 2);
	const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
	const discriminant = (q / 2) ** 2 + (p / 3) ** 3;

	function cardano(p: number, q: number) {
		const part = -q / 2;
		const part2 = Math.sqrt((q / 2) ** 2 + (p / 3) ** 3);
		return Math.cbrt(part + part2) + Math.cbrt(part - part2) - b / (3 * a);
	}

	function trig(p: number, q: number) {
		const angle = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3))));
		const part = 2 * Math.sqrt(-p / 3);
		const part2 = b / (3 * a);
		return Math.cbrt(part + part2) + Math.cbrt(part - part2) - b / (3 * a);
	}

	if (discriminant < 0) {
		// 3 real
		cardano(p, q);
	} else if (discriminant > 0) {
		// 1 real, 2 complex
		cardano(p, q);
	} else if (p !== 0) {
		// 3 real (Double and single root)
		cardano(p, q);
	} else {
		// 1 real (Triple)
		cardano(p, q);
	}
});
