// import dayjs from 'dayjs/esm';
// import dayjsLocale from 'dayjs/locale/en';
// import dayjsCalendar from 'dayjs/plugin/calendar';

export default function formatDate(date: string | number | Date): string {
	const formatter = Intl.DateTimeFormat('de', {
		year: "2-digit",
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: 'numeric'
	});
	// dayjs.extend(dayjsCalendar);
	// dayjs.locale(dayjsLocale);
	//
	// return dayjs(date).calendar(null,{
	// 	sameDay: '[Today] HH:mm', lastDay: '[Yesterday] HH:mm', lastWeek: 'DD.MM.YYYY, HH:mm', sameElse: 'DD.MM.YYYY, HH:mm'
	// });

	return formatter.format(new Date(date));
}
