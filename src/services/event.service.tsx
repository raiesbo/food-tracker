import { IDBClient } from "@/repositories/prismaClient";
import { NextApiRequest } from "next";
import { Prisma } from "@prisma/client";

const validateCreateRequestProps = (props: Prisma.EventUncheckedCreateInput & Prisma.LocationUncheckedCreateInput) => {
	let validatedProps = {
		event: {} as Prisma.EventUncheckedCreateInput,
		location: {} as Prisma.LocationUncheckedCreateInput
	};

	if (props.name) validatedProps.event.name = props.name;
	if (props.date) validatedProps.event.date = props.date;
	if (props.opening_hour) validatedProps.event.opening_hour = props.opening_hour;
	if (props.closing_hour) validatedProps.event.closing_hour = props.closing_hour;
	if (props.streetName) validatedProps.location.streetName = props.streetName;
	if (props.streetNumber) validatedProps.location.streetNumber = props.streetNumber;
	if (props.zip) validatedProps.location.zip = props.zip;
	if (props.city) validatedProps.location.city = props.city;
	if (props.zip) validatedProps.location.zip = props.zip;

	return validatedProps;
};

export default function eventsService(instance: IDBClient['instance']) {
	return {
		createEvent: async (req: NextApiRequest) => {
			const { restaurantId } = req.query as { restaurantId: string };

			try {
				const validatedProps = validateCreateRequestProps(JSON.parse(req.body));

				const event = await instance.event.create({
					data: {
						...validatedProps.event,
						location: {
							create: {
								...validatedProps.location
							}
						}
					} as Prisma.EventUncheckedCreateInput
				});

				await instance.restaurant.update({
					where: { id: Number(restaurantId) },
					data: { events: { connect: [{ id: event.id }] } }
				});
				return { result: event };
			} catch (e) {
				console.error(e);
				const { message } = e as { message: string };
				return {
					result: {},
					error: { status: 400, message }
				};
			}
		},
		deleteEvent: async (req: NextApiRequest) => {
			const { eventId } = req.query as { eventId: string };

			try {
				await instance.event.delete({ where: { id: Number(eventId) } });
				return { result: {} };
			} catch (e) {
				console.error(e);
				const { message } = e as { message: string };
				return {
					result: {},
					error: { status: 400, message }
				};
			}
		}
	};
}
