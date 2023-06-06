import getDateWeek from "@/utils/getDateWeek";
import getDayOfWeek from "@/utils/getDayOfWeek";

type Props = {
	scheduleDay: string | null,
	eventDate?: Date | number | null
}

export default function matchesWeekAndDay({ scheduleDay, eventDate }: Props) {
	if (!eventDate || !scheduleDay) return false;
	const currentWeek = getDateWeek(new Date());
	return getDateWeek(eventDate) === currentWeek
		&& scheduleDay.toLowerCase() === getDayOfWeek(eventDate).toLowerCase();
}
