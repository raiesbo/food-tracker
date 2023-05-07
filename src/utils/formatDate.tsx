import dayjs from 'dayjs';
import dayjsLocale from 'dayjs/locale/en';
import dayjsCalendar from 'dayjs/plugin/calendar';

dayjs.extend(dayjsCalendar);
dayjs.locale(dayjsLocale);

export default function formatDate(date: string | number | Date): string {
	return dayjs(date).calendar(null,{
		sameDay: '[Today] HH:mm', lastDay: '[Yesterday] HH:mm', lastWeek: 'DD.MM.YYYY, HH:mm', sameElse: 'DD.MM.YYYY, HH:mm'
	});
}
