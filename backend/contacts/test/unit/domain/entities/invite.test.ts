import Invite from '../../../../src/domain/entities/invite'

describe('Invite',()=>{
	test('Deve criar um invite',()=>{
		const requester_username = 'fakeUsername'
		const targuet_username = 'fakeUsername2'
		expect(new Invite(requester_username,targuet_username,'fakeName1','fakeName2',false)).toBeTruthy()
	})
})