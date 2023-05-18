export default function getDayOfWeek (date: Date | number) {
	if (!date) return '';
	return Intl.DateTimeFormat('en', {
		weekday: 'long'
	}).format(new Date(date));
}
