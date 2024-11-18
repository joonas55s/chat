import { userContact } from '@domain/entities/userContact'
import React, { createContext, useContext, useState } from 'react'


interface ContactsContextData {
 current:userContact | null
 setCurrentContact(contact:userContact):void
 refreshContacts:()=>void
 refresh:boolean
}

const ContactsContext = createContext<ContactsContextData>({} as ContactsContextData)

interface PropsContactsContextProvider {
    children: React.ReactNode
}

export const ContactsProvider: React.FC<PropsContactsContextProvider> = ({ children }) => {
	const [current,setCurrent] = useState<userContact | null>(null)
	const [refresh,setRefresh] = useState<boolean>(false)
	
	const setCurrentContact = (contact:userContact) => {
		setCurrent(contact)
	}
	const refreshContacts = () =>{
		setRefresh(!refresh)
	}
	return (
		<ContactsContext.Provider value={{current, setCurrentContact, refreshContacts, refresh }}>
			{children}
		</ContactsContext.Provider>
	)
}

export function useContacts(): ContactsContextData {
	const context = useContext(ContactsContext)
	if (!context) throw new Error('useSocket must be used within a SideMenuProvider')
	return context
}