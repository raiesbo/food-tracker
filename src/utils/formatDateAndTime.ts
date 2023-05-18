export default function formatDateAndTime(date: string | number | Date): string {
	const today = new Date();
	const validatedDate = new Date(date);
	let dayDiff = (validatedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
	const relativeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
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

	const dateToday = today.getDate();
	const dateValidated = validatedDate.getDate();

	if (dayDiff > 0 && dayDiff < 1 && dateToday !== dateValidated) dayDiff = 1;
	if (dayDiff > -2 && dayDiff < -1 && dateToday !== dateValidated) dayDiff = Math.ceil(dayDiff);

	if (dayDiff > -2) {
		return `${relativeFormatter.format(Math.floor(dayDiff), 'day')}, ${timeFormatter.format(validatedDate)}`;
	}

	return formatter.format(validatedDate);
}
