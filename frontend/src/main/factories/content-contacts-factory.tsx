import React from 'react'
import ContactsGateway from '@infra/gateways/contacts/contacts-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { environment } from '../config/config'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'
import ContentContacts from '@presentation/pages/chat/components/content-contacts'
import ListContacts from '@aplication/usecase/list-contacts/ListContacts'
import GetMessages from '@aplication/usecase/get-messages/get-messages'
import MessagesGateway from '@infra/gateways/messages/messages-gateway'

const MakeContentContacts: React.FC = () => {
	const axiosAdapter = new AxiosAdapter(environment.API_CONTACTS_URL)
	const axiosAdapterMessagerApi = new AxiosAdapter(environment.API_MESSAGER)
	const contactsGateway = new ContactsGateway(axiosAdapter)
	const listContacts = new ListContacts(contactsGateway)
	const sessionStorageAdpter = new SessionStorageAdpter()
	const messagesGateway = new MessagesGateway(axiosAdapterMessagerApi)
	const getMessages = new GetMessages(messagesGateway)
	return <ContentContacts listContacts={listContacts} appStorage={sessionStorageAdpter} getMessages={getMessages}/>
}

export default MakeContentContacts