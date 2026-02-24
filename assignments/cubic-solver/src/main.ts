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

	console.log(`p : ${p}`);
	console.log(`q : ${q}`);
	console.log(`discriminant : ${discriminant}`);

	if (discriminant < 0) {
		console.log(1);
	} else if (discriminant > 0) {
		const part = -q / 2;
		const part2 = Math.sqrt((q / 2) ** 2 + (p / 3) ** 3);
		const root1 = Math.cbrt(part + part2) + Math.cbrt(part - part2) - b / (3 * a);
		console.log(root1);
	} else {
		console.log(3);
	}
});
