// app/utils/exam.ts
/** Human description of the negative marking rule. */
function negativeMarkingLabel(exam) {
	if (!exam.negative_marking || !exam.negative_marking_value) return "No negative marking";
	if (exam.negative_marking_type === "fixed") return `−${exam.negative_marking_value} mark${exam.negative_marking_value === 1 ? "" : "s"} per wrong answer`;
	const value = exam.negative_marking_value;
	return `−${{
		"0.25": "¼",
		"0.33": "⅓",
		"0.5": "½",
		"1": "1×"
	}[String(value)] ?? value}${value === 1 ? "" : "×"} of the question marks per wrong answer`;
}
function formatClock(totalSeconds) {
	const safe = Math.max(0, Math.floor(totalSeconds));
	const h = Math.floor(safe / 3600);
	const m = Math.floor(safe % 3600 / 60);
	const s = safe % 60;
	const mm = String(m).padStart(2, "0");
	const ss = String(s).padStart(2, "0");
	return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export { formatClock as f, negativeMarkingLabel as n };
//# sourceMappingURL=exam-CSv7Xs_5.mjs.map
