import dayjs from 'dayjs';
import dayjsLocale from 'dayjs/locale/en';
import dayjsCalendar from 'dayjs/plugin/calendar';

export default function formatDate(date: string | number | Date): string {
	dayjs.extend(dayjsCalendar);
	dayjs.locale(dayjsLocale);

	return dayjs(date).calendar(null,{
		sameDay: '[Today] HH:mm', lastDay: '[Yesterday] HH:mm', lastWeek: 'DD.MM.YYYY, HH:mm', sameElse: 'DD.MM.YYYY, HH:mm'
	});
}
