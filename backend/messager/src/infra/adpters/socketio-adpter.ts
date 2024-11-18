import { Server as ServerHttp } from 'http'
import { AppSocket } from '@domain/appSocket'
import { Server, Socket } from 'socket.io'
import { SocketRepository } from '@domain/repository/users/socket-repository'
import { Queue } from '../queue/queue'


export default class SocketIoAdpter implements AppSocket {
	private io:Server

	constructor(private sockerRepository:SocketRepository, private queue:Queue){}

	async start(server: ServerHttp) {
		this.io = new Server(server,{
			cors: {
				origin: '*',
			}
		})

		this.io.on('connection', (socket: Socket) => {
			const username = socket.handshake.query.username as string
			const id = socket.id
			this.addUsers(username,id)
			socket.on('messages', async (body: any) => {
				const { senderUsername, recipientUsername, message, send_at } = body
				this.queue.publish('messages',body)
				const target = await this.sockerRepository.get(recipientUsername)
				if (target) socket.to(target.id).emit('messages', { senderUsername, message, send_at, id:target.id})
			})
			socket.on('disconnect', () => {
				console.log('Cliente desconectado.')
			})
		})
	}

	private async addUsers(recipientUsername:string,id:string){
		const exist = await this.sockerRepository.get(recipientUsername)
		if (!exist) {
			await this.sockerRepository.add(recipientUsername,id)
			return
		}
		await this.sockerRepository.update(recipientUsername,id)
	}
    
}