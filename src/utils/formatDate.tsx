import dayjs from 'dayjs';
import dayjsLocale from 'dayjs/locale/de';
import dayjsCalendar from 'dayjs/plugin/calendar';

dayjs.extend(dayjsCalendar);
dayjs.locale(dayjsLocale);

export default function formatDate(date: string | number | Date): string {
	return dayjs(date).calendar(null,{
		sameDay: '[Heute] HH:mm', lastDay: '[Gestern] HH:mm', lastWeek: 'DD.MM.YYYY, HH:mm', sameElse: 'DD.MM.YYYY, HH:mm'
	});
}
