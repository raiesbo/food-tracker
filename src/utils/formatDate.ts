export default function formatDate(date: string | number | Date): string {
	const today = new Date();
	const validatedDate = new Date(date);
	var daydiff = (validatedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
	const formatter = new Intl.DateTimeFormat('de', {
		year: "2-digit",
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: 'numeric'
	});
	const timeFormatter = new Intl.DateTimeFormat('de', {
		hour: 'numeric',
		minute: 'numeric'
	});

	const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

	if (daydiff > -2) {
		return `${relativeFormatter.format(Math.floor(daydiff), 'day')}, ${timeFormatter.format(validatedDate)}`;
	}

	return formatter.format(validatedDate);
}
