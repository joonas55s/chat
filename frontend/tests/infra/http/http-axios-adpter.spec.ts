import { right } from '@shared/either'
import AxiosAdapter from '@infra/http/http-axios-adpter'


describe('AxiosAdapter',()=>{

	const sut = new AxiosAdapter('fake url')

	test('Deve criar uma instancia do AxiosAdapter',()=>{
		expect(new AxiosAdapter('fake url')).toBeTruthy()
	})
    
	test('Deve criar uma instancia do AxiosAdapter com jwt',()=>{
		sessionStorage.setItem('jwt','fake token')
		expect(new AxiosAdapter('fake url')).toBeTruthy()
	})

	test('Deve fazer um post e retornar right',async ()=>{
		jest.spyOn(sut.apiAxios,'post').mockResolvedValueOnce(
			Promise.resolve({data:{}})
		)
		const result = await sut.post('fake url',{})
		expect(result.isRight()).toBe(true)
	})

	test('Deve fazer um post e retornar left',async ()=>{
		jest.spyOn(sut.apiAxios,'post').mockRejectedValueOnce({
			response: {
				data: 'erro fake',
				status: 500
			}
		})
		const result = await sut.post('fake url',{})
		expect(result.isLeft()).toBe(true)
	})

	test('Deve fazer um get e retornar right',async ()=>{
		jest.spyOn(sut.apiAxios,'get').mockResolvedValueOnce(
			Promise.resolve(right('fake data'))
		)
		const result = await sut.get('fake url')
		expect(result.isRight()).toBe(true)
	})

	test('Deve fazer um get e retornar left',async ()=>{
		jest.spyOn(sut.apiAxios,'get').mockRejectedValueOnce({
			response: {
				data: 'erro fake',
				status: 500
			}
		})
		const result = await sut.get('fake url')
		expect(result.isLeft()).toBe(true)
	})

	test('Deve fazer um put e retornar right',async ()=>{
		jest.spyOn(sut.apiAxios,'put').mockResolvedValueOnce(
			Promise.resolve(right('fake data'))
		)
		const result = await sut.put('fake url',{})
		expect(result.isRight()).toBe(true)
	})

	test('Deve fazer um put e retornar left',async ()=>{
		jest.spyOn(sut.apiAxios,'put').mockRejectedValueOnce({
			response: {
				data: 'erro fake',
				status: 500
			}
		})
		const result = await sut.put('fake url',{})
		expect(result.isLeft()).toBe(true)
	})

	test('Deve fazer um delete e retornar right',async ()=>{
		jest.spyOn(sut.apiAxios,'delete').mockResolvedValueOnce(
			Promise.resolve(right('fake data'))
		)
		const result = await sut.delete('fake url')
		expect(result.isRight()).toBe(true)
	})

	test('Deve fazer um delete e retornar left',async ()=>{
		jest.spyOn(sut.apiAxios,'delete').mockRejectedValueOnce({
			response: {
				data: 'erro fake',
				status: 500
			}
		})
		const result = await sut.delete('fake url')
		expect(result.isLeft()).toBe(true)
	})
})