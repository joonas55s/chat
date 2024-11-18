
import Message from '../../../../src/domain/entities/message'


describe('Message', () => {
	test('Deve criar uma mensagem', () => {
		const message = new Message('1234','1400','Olá mundo', new Date(),'fakeId')
		expect(message.message).toBe('Olá mundo')
		expect(message.senderId).toBe('1234')
		expect(message.recipientId).toBe('1400')
	})

	test('Não deve criar uma mensagem vazia', () => {
		expect(()=>new Message('1234','1400','', new Date(),'fakeId')).toThrow(new Error('Message cannot be null'))
	})

	test('Não deve criar uma mensagem sem senderId', () => {
		expect(()=>new Message('','1400','Olá mundo', new Date(),'fakeId')).toThrow(new Error('Sender Id cannot be null'))
	})

	test('Não deve criar uma mensagem sem recipientId', () => {
		expect(()=>new Message('4002','','Olá mundo', new Date(),'fakeId')).toThrow(new Error('Recipient Id cannot be null'))
	})
})