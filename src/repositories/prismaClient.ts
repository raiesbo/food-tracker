import { PrismaClient } from '@prisma/client';

const PrismaDBClient = { instance: new PrismaClient() };

export type IDBClient = typeof PrismaDBClient;

Object.freeze(PrismaDBClient);

export default PrismaDBClient;
