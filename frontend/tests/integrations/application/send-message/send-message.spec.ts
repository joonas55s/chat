import SendMessage from '@aplication/usecase/send-message/send-message'
import { AppSocket } from '@domain/appSocket'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'
import SocketIoClientAdpter from '@infra/adpters/socket-io-client'

describe('SendMessage',()=>{
	let sut:SendMessage
	let appSocket:AppSocket
	beforeAll(()=>{
		const appStorage = new SessionStorageAdpter()
		appSocket = new SocketIoClientAdpter(appStorage)
		sut = new SendMessage(appStorage,appSocket)
	})

	test('Deve enviar uma mensagem',async ()=>{
		jest.spyOn(appSocket,'emit').mockImplementationOnce(()=>{return})
		const result = await sut.handle({recipientUsername:'fakeusername',message:'fake message'})
		expect(result.isRight()).toBe(true)
	})

	test('Deve falhar ao enviar uma mensagem e retornar erro',async ()=>{
		jest.spyOn(appSocket,'emit').mockImplementationOnce(()=>{ throw new Error('Fake erro')})
		const result = await sut.handle({recipientUsername:'fakeusername',message:'fake message'})
		expect(result.isLeft()).toBe(true)
	})
})