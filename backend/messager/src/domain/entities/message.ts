export default class Message {

	constructor(readonly senderId: string, readonly recipientId: string,readonly message: string, readonly send_at:Date,readonly id?:string, readonly me?:boolean) {
		this.isValidSenderId(senderId)
		this.isValidRecipientId(recipientId)
		this.isValidMessage(message)
	}

	private isValidSenderId(senderId: string) {
		if (senderId.length <= 0) throw new Error('Sender Id cannot be null')
	}

	private isValidRecipientId(recipientId: string) {
		if (recipientId.length <= 0) throw new Error('Recipient Id cannot be null')
	}

	private isValidMessage(message: string) {
		if (message.length <= 0) throw new Error('Message cannot be null')
	}
}