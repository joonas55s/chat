import RedisAdpter from '@infra/adpters/redis-adpter'
import SocketIoAdpter from '@infra/adpters/socketio-adpter'
import { Queue } from '@infra/queue/queue'
import SocketRepositoryRedis from '@infra/repository/socket-repository-redis'

export const makeSocketIo = (queue:Queue) => {
	const redisAdpter = new RedisAdpter()
	const socketRepositoryRedis = new SocketRepositoryRedis(redisAdpter)
	const socketIoAdpter2 = new SocketIoAdpter(socketRepositoryRedis,queue)
	return socketIoAdpter2
}