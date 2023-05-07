export default function formatTime(time?: number | Date) {
	return time ? Intl.DateTimeFormat('de', {
		hour: "numeric",
		minute: "numeric"
	}).format(time) : '--:--';
}
