type Props = {
	params: {
		userId: string
	}
}
export default async function EventsPage({ params: { userId } }: Props) {
	return (
		<div>
			{userId}
		</div>
	);
}
