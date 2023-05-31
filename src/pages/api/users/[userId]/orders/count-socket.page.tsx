import { Server } from "socket.io";
import ordersService from "@/services/orders.service";
import PrismaDBClient from "@/repositories/prismaClient";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const ordersServiceInstance = ordersService(PrismaDBClient.instance);

async function handler(req, res) {
	// It means that socket server was already initialised
	if (res.socket?.server.io) {
		console.log("Socket is already running");
		return res.end();
	}

	console.log('Socket is initializing');

	const io = new Server(res.socket?.server);

	res.socket.server.io = io;

	io.on('connection', socket => {
		socket.on('count', async () => {

			const {
				result: count,
				error
			} = await ordersServiceInstance.countOpenOrdersByUser(req);

			console.log({ count, error });

			socket.broadcast.emit('count-update', error ? 0 : count);
		});
	});

	res.end();
}

export default withApiAuthRequired(handler);
