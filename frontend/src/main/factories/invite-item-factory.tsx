import React from 'react'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { environment } from '../config/config'
import InviteItem from '@presentation/components/modals/notifications/components/invite-item'
import AcceptInvite from '@aplication/usecase/accept-invite/accept-invite'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'

interface IMakeInviteItem {
    name:string
    username:string
}
const MakeInviteItem: React.FC<IMakeInviteItem> = ({name,username}) => {
	const axiosAdapter = new AxiosAdapter(environment.API_CONTACTS_URL)
	const contactsGateway = new ContactsGateway(axiosAdapter)
	const listContacts = new AcceptInvite(contactsGateway)
	const sessionStorageAdpter = new SessionStorageAdpter()
	return <InviteItem acceptInvite={listContacts} name={name} username={username} appStorage={sessionStorageAdpter}/>
}

export default MakeInviteItem