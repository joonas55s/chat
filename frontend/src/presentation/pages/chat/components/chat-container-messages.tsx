import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { HStack, Button, Divider, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import {useSocket} from '@main/context/socket-context'
import HeaderCurrentChat from './header-current-chat'
import { store, useAppSelector } from '@infra/adpters/redux/store'
import Message from './message'
import { resetAmountOfNewMessages } from '@infra/adpters/redux/messages-slice'


type IChatContent = {
    recipientUsername?:string
	showDetails:Function
}

const ChatContainerMessages: React.FC<IChatContent> = ({recipientUsername,showDetails}) => {
	const inputMessage = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const socketContext = useSocket()
	const messages = useAppSelector(state=>state.messagesCache.chat.find(e=>e.username == recipientUsername))
	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(()=>{
		if (bottomRef){
			bottomRef.current?.scrollIntoView({behavior: 'auto'})
		}
		if (recipientUsername) store.dispatch(resetAmountOfNewMessages({username:recipientUsername}))
	},[recipientUsername])
	
	const sendMessage = (message:any) =>{
		if (message == null || recipientUsername == null) return
		if (inputMessage.current && inputMessage.current.value != ''){
			socketContext.sendMessage(recipientUsername,inputMessage.current.value)
			inputMessage.current.value = ''
			store.dispatch(resetAmountOfNewMessages({username:recipientUsername}))
		}
	}
	const handleKeyPress = (event:any) => {
		if (event.key === 'Enter' && buttonRef.current && inputMessage.current && inputMessage.current.value != '') {
			buttonRef.current.click()
		}
	}
  
	return (
		<HStack bg='#FAFCFF' h={'100%'} flex='1' width={'auto'} flexDir={'column'} >
			<HeaderCurrentChat showUser={showDetails} />
			<Divider orientation='horizontal' m={'0 !important'} />
			<VStack flex={1} w='100%' bg='#F6F8FC' overflowY="auto" margin={'0 !important'} padding={5}>
				{messages?.messages.map(e=> <Message key={e.id} message={e.message} me={e.me} sendAt={e.sendAt}/>)}
				<div ref={bottomRef} />
			</VStack> 
			<HStack h='80px' w='50%'>
				<InputGroup pb='3'>
					<InputRightElement
						pointerEvents='auto'
						children={
							<Button type='submit' bg='#191A1E' color='white' ref={buttonRef} onClick={()=>sendMessage(inputMessage)}>
								<ArrowForwardIcon />
							</Button>}
					/>
					<Input variant='default' type='tel' placeholder='Mensagem...' ref={inputMessage} onKeyPress={handleKeyPress} onChange={(e)=>e.target.value}/>
				</InputGroup>
			</HStack>
		</HStack>

	)
}

export default ChatContainerMessages

