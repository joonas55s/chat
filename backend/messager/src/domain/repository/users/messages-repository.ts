import Message from '../../entities/message'

export interface MessagesRepository {
    save(message:Message): Promise<void>
    getMessages(senderUsername: string, recipientUsername: string): Promise<Message[]>
}