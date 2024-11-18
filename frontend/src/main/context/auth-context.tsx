import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'

interface AuthContextData {
    authenticate(value: boolean): void;
    authenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface PropsAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<PropsAuthProvider> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState<boolean>(false)
	useEffect(()=>{
		hasAuthenticated()
	},[])
	const authenticate = (value = false) =>{
		setAuthenticated(value)
	}
	const hasAuthenticated = () => {
		const token = sessionStorage.getItem('token')
		const name =sessionStorage.getItem('name')
		const username =sessionStorage.getItem('username')
		const email =sessionStorage.getItem('email')
		if (token && name && username && email) setAuthenticated(true)
	}
	return (
		<AuthContext.Provider value={{ authenticate, authenticated }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within a AuthProvider')
	return context
}