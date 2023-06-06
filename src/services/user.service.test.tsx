import userService from "./user.service";
import { describe, expect, it, vi } from "vitest";
import { IDBClient } from '../repositories/prismaClient';
import { NextApiRequest } from "next";

const createMock = vi.fn();

const PrismaClientMock = {
	instance: {
		user: { create: createMock }
	}
} as unknown as IDBClient;

const reqCreate = {
	body: JSON.stringify({
		firstName: 'mock-name',
		lastName: 'mock-surname',
		email: 'mock-email',
		isSP: true
	})
} as unknown as NextApiRequest;

describe('createNewUser', () => {
	it('returns the right object', async () => {
		createMock.mockResolvedValue({ id: 4909048 });

		const service = userService(PrismaClientMock).createNewUser;
		const { result, error } = await service(reqCreate);

		expect(result.id).toBe(4909048);
		expect(error).toBeUndefined();
	});
});
