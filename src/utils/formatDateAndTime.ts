type Unit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

const dateUnits = { // in seconds
	year: 31536000,
	month: 2629800,
	day: 86400,
	hour: 3600,
	minute: 60,
	second: 1
};

const standardTF = new Intl.DateTimeFormat('de', {
	year: "2-digit",
	month: '2-digit',
	day: '2-digit',
	hour: 'numeric',
	minute: 'numeric'
});

const rtf = new Intl.RelativeTimeFormat(
	'en',
	{ numeric: 'auto' }
);

export default function formatDateAndTime(timestamp: string | number | Date) {
	const from = new Date(timestamp).getTime();
	const now = new Date().getTime();

	const elapsed = (from - now) / 1000;

	console.log(from, now, (from - now) / 1000);

	if (elapsed < dateUnits.day * -2) {
		return standardTF.format(from);
	}

	for (const unit in dateUnits) {
		if (Math.abs(elapsed) > dateUnits[unit as Unit]) {
			return rtf.format(
				Math.floor(elapsed / dateUnits[unit as Unit]),
				unit as Unit
			);
		}
	}

	// if less than one second, then is now
	return rtf.format(0, 'second');
}
