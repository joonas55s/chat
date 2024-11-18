import 'dotenv/config'

export const environment = {
	MONGODB_URI: process.env.MONGODB_URI,
	MONGODB_NAME: process.env.MONGODB_NAME,
	SECRETE: process.env.SECRETE,
	clientId: process.env.CLIENTID,
	brokers: process.env.BROKERS
}