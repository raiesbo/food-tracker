export default function formatDate(date: string | number | Date): string {
	const rtf = new Intl.RelativeTimeFormat('en-UK', { numeric: 'auto' });
	const formatHour = new Intl.DateTimeFormat('en-UK', {
		hour: 'numeric',
		minute: 'numeric'
	});
	const formatFullDate = new Intl.DateTimeFormat('en-UK', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});

	const oneDayInMiliseconds = 86399990;
	const today = (new Date()).getTime();
	const dateInSeconds = (new Date(date)).getTime();
	const difference = Math.floor((today - dateInSeconds) / oneDayInMiliseconds) * -1;

	if (difference > -2) {
		return `${rtf.format(difference, 'day')} ${formatHour.format(dateInSeconds)}`;
	}

	return formatFullDate.format(dateInSeconds);
}
