import { SocketRepository } from '@domain/repository/users/socket-repository'
import RedisAdpter from '../adpters/redis-adpter'
import { userSocket } from '@domain/entities/userSocket'

export default class SocketRepositoryRedis implements SocketRepository{

	constructor(private redisAdpter:RedisAdpter){}

	async add(username: string, id: string): Promise<void> {
		await this.redisAdpter.set(`socket-${username}`,id)
	}

	async get(username: string): Promise<userSocket> {
		const result = await this.redisAdpter.get(`socket-${username}`)
		if (!result) return
		const output:userSocket = {
			username,
			id:result
		}
		return output
	}

	async update(username: string, id: string): Promise<void> {
		await this.redisAdpter.del(`socket-${username}`)
		await this.redisAdpter.set(`socket-${username}`,id)
	}


}