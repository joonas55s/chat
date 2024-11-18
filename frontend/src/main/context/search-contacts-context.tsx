
import React, { createContext, useContext, useState } from 'react'

interface SearchContactsContextData {
    toogle: (value: boolean) => void
    visible: boolean
}

const SearchContactsContext = createContext<SearchContactsContextData>({} as SearchContactsContextData)

interface PropsSearchContactsProvider {
    children: React.ReactNode;
}

export const SearchContactsProvider: React.FC<PropsSearchContactsProvider> = ({ children }) => {
	const [visible, setVisible] = useState(false)
	const toogle = (value: boolean) => { setVisible(value) }

	return (
		<SearchContactsContext.Provider value={{ toogle, visible }}>
			{children}
		</SearchContactsContext.Provider>
	)
}

export function useSearchContacts(): SearchContactsContextData {
	const context = useContext(SearchContactsContext)
	if (!context) throw new Error('ScreenContext must be used within a ScreenProvider')
	return context
}