export default function formatTime(time?: number | Date | string | null) {
	return time ? Intl.DateTimeFormat('de', {
		hour: "numeric",
		minute: "numeric"
	}).format(new Date(time)) : '--:--';
}
