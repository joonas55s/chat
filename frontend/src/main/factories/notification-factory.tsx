import React from 'react'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { environment } from '../config/config'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'
import Notifications from '@presentation/components/modals/notifications/notifications'
import ListInvites from '@aplication/usecase/list-invites/list-invites'


const MakeNotifications: React.FC = () => {
	const axiosAdapter = new AxiosAdapter(environment.API_CONTACTS_URL)
	const contactsGateway = new ContactsGateway(axiosAdapter)
	const listContacts = new ListInvites(contactsGateway)
	const sessionStorageAdpter = new SessionStorageAdpter()
	return <Notifications listInvites={listContacts} appStorage={sessionStorageAdpter}/>
}

export default MakeNotifications