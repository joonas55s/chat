import React, { useEffect } from 'react'
import { VStack } from '@chakra-ui/react'
import ContactUi from './contact'
import { AppStorage } from '@domain/appStorage'
import { useContacts } from '@main/context/contacts-context'
import GetMessages from '@aplication/usecase/get-messages/get-messages'
import ListContacts from '@aplication/usecase/list-contacts/ListContacts'
import { store, useAppSelector } from '@infra/adpters/redux/store'
import { addMessage } from '@infra/adpters/redux/messages-slice'
import { addContact } from '@infra/adpters/redux/contacts-slice'
import { userContact } from '@domain/entities/userContact'

interface IContentContacts {
    listContacts:ListContacts
	getMessages:GetMessages
    appStorage: AppStorage
}
const ContentContacts: React.FC<IContentContacts> = ({ listContacts,appStorage,getMessages }) => {
	const contacts = useAppSelector(state=>state.contacts).contacts
	const {refresh} = useContacts()
	const ownerUsername = appStorage.getUser().username
	const {setCurrentContact} = useContacts()

	useEffect(() => {
		const fetchData = async () => {
			const fetchedContacts = await getContacts()
			if (!fetchedContacts) return
			await getMessagesByContacts(fetchedContacts)
		}
		fetchData()
	}, [refresh])

	const getContacts = async() => {
		const contacts = await listContacts.handle(ownerUsername)
		if (contacts.isLeft()) return
		for (const contact of contacts.value){
			store.dispatch(addContact({email:contact.email,id:contact.id,name:contact.name,username:contact.username}))
		}
		return contacts.value
	}

	const getMessagesByContacts = async(contacts:userContact[]) => {
		for (const contact of contacts){
			const messages = await getMessages.handle({contactName:contact.username,username:ownerUsername})
			if (messages.isLeft()) continue
			for (const messageObj of messages.value.messages){
				store.dispatch(addMessage({message:messageObj.message,sendAt:new Date(messageObj.send_at).getTime(),username:contact.username,me:messageObj.me,id:messageObj.id}))
			}
		}
	}


	return (
		<VStack w='100%' spacing='4' p='5' overflowY="auto">
			{contacts.map(contact => <ContactUi key={contact.username} name={contact.name} username={contact.username} select={()=>setCurrentContact(contact)}/>)}	
		</VStack>
	)
}

export default ContentContacts