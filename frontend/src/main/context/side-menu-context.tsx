import React, { createContext, useContext } from 'react'
import { useState } from 'react'

interface SideMenuContextData {
    openContentContacts(value: boolean): void
    isOpenContentContacts: boolean
	openNotifications(value: boolean): void
	isopenNotifications: boolean,
	notifications:number,
	setNotifications:React.Dispatch<React.SetStateAction<number>>,
}

const SideMenuContext = createContext<SideMenuContextData>({} as SideMenuContextData)

interface PropsSideMenuContextProvider {
    children: React.ReactNode
}

export const SideMenuProvider: React.FC<PropsSideMenuContextProvider> = ({ children }) => {
	const [isOpenContentContacts, setIsOpenContentContacts] = useState<boolean>(true)
	const [isopenNotifications, setIsopenNotifications] = useState<boolean>(false)
	const [notifications,setNotifications] = useState<number>(0)

	const openContentContacts = (value = false) =>{
		setIsOpenContentContacts(value)
	}
	const openNotifications = (value = false) =>{
		setIsopenNotifications(value)
	}

	return (
		<SideMenuContext.Provider value={{ openContentContacts, isOpenContentContacts, isopenNotifications, openNotifications,notifications,setNotifications }}>
			{children}
		</SideMenuContext.Provider>
	)
}

export function useSideMenu(): SideMenuContextData {
	const context = useContext(SideMenuContext)
	if (!context) throw new Error('useSideMenu must be used within a SideMenuProvider')
	return context
}