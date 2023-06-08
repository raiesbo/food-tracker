import { IDBClient } from "../repositories/prismaClient";
import { NextApiRequest } from "next";
import { RequestResult } from "@/types";
import { Schedule } from "@prisma/client";

export default function scheduleService({ instance }: IDBClient) {
	return {
		updateManySchedules: async (req: NextApiRequest): Promise<RequestResult<boolean>> => {
			try {
				const schedules = JSON.parse(req.body);

				await instance.$transaction(
					schedules.map((schedule: Schedule) => instance.schedule.updateMany({
						where: { id: schedule.id },
						data: schedule
					}))
				);

				return { result: true };
			} catch (e) {
				const { message } = e as { message: string };
				console.error(e);
				return {
					result: false,
					error: {
						status: 400,
						message
					}
				};
			}
		}
	};
}
