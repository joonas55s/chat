import React from 'react'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'
import { SocketProvider } from '@main/context/socket-context'
import SendMessage from '@aplication/usecase/send-message/send-message'
import SocketIoClientAdpter from '@infra/adpters/socket-io-client'

interface MakeSocketProvider {
    children: React.ReactNode
}

const MakeSocketProvider: React.FC<MakeSocketProvider> = ({children}) => {
	const appStorage = new SessionStorageAdpter()
	const socket = new SocketIoClientAdpter(appStorage)
	const sendMessage = new SendMessage(appStorage,socket)
	return <SocketProvider sendMessageUseCase={sendMessage} socket={socket}>
		{children}
	</SocketProvider>
}

export default MakeSocketProvider