import Redis from 'ioredis'
import {environment} from '@main/config/config'
import { promisify } from 'util'

export default class RedisAdpter{
	private redisclient: Redis

	constructor(){
		this.redisclient = new Redis({
			host: environment.REDIS_HOST,
			port: parseInt(environment.REDIS_PORT),
			password: environment.REDIS_PASSWORD
		})
	}

	get(key:string){
		const syncRedisGet = promisify(this.redisclient.get).bind(this.redisclient)
		return syncRedisGet(key)
	}

	set(key:string,value:string){
		const syncRedisSet = promisify(this.redisclient.set).bind(this.redisclient)
		return syncRedisSet(key,value)
	}

	del(key:string){
		const syncRedisDel = promisify(this.redisclient.del).bind(this.redisclient)
		return syncRedisDel(key)
	}
}