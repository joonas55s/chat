import SendMessage from '@aplication/usecase/send-message/send-message'
import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { useAuth } from './auth-context'
import { AppSocket } from '@domain/appSocket'
import { useAppDispatch } from '@infra/adpters/redux/store'
import { addMessage } from '@infra/adpters/redux/messages-slice'
import {v4} from 'uuid'

interface SocketContextData {
 sendMessage:(recipientUsername:string,message:string)=>void
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData)

interface PropsSocketContextProvider {
    sendMessageUseCase:SendMessage
	socket:AppSocket
    children: React.ReactNode
}

export const SocketProvider: React.FC<PropsSocketContextProvider> = ({ children,sendMessageUseCase,socket }) => {
	const {authenticated} = useAuth()
	const dispatch = useAppDispatch()
	useEffect(()=>{
		if (authenticated){
			socket.connect()
		}
	},[authenticated])

	const sendMessage = useCallback(async(recipientUsername:string,message:string)=>{
		await sendMessageUseCase.handle({recipientUsername,message})
		dispatch(addMessage({username:recipientUsername,message,me:true,sendAt:new Date().getTime(),id:v4()}))
	},[dispatch])

	return (
		<SocketContext.Provider value={{ sendMessage }}>
			{children}
		</SocketContext.Provider>
	)
}

export function useSocket(): SocketContextData {
	const context = useContext(SocketContext)
	if (!context) throw new Error('useSocket must be used within a SideMenuProvider')
	return context
}