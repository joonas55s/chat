import 'dotenv/config'

export const environment = {
	MONGODB_URI: process.env.MONGODB_URI,
	MONGODB_NAME: process.env.MONGODB_NAME,
	SECRETE: process.env.SECRETE,
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD
}