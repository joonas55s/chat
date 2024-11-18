import React, { useEffect } from 'react'
import { Circle, Heading, HStack, VStack, Text,Image, Button } from '@chakra-ui/react'
import { useAppSelector } from '@infra/adpters/redux/store'

interface IContactUi{
	name:string
	username:string
	select:Function
}
const ContactUi: React.FC <IContactUi>= ({name,username, select}) => {
	const chat = useAppSelector(state=>state.messagesCache.chat.find(e=>e.username == username))
	let time: Date = new Date()
	useEffect(()=>{
		if (chat?.lastMessage)
			time = new Date(chat?.lastMessage.sendAt)
	},[chat])

	return (
		<Button bg='white' padding={2} borderRadius={11} flexDir={'row'} w='100%' h='auto' onClick={()=>select()}>
			<Image
				borderRadius='full'
				boxSize='60px'
				marginRight={5}
				src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
			</Image>
			<VStack w='100%' alignItems='flex-start' justifyContent='flex-start'>
				<HStack w='100%' justifyContent='space-between'>
					<Heading fontSize='5xs' fontWeight={'medium'}>{name}</Heading >
					{chat?.lastMessage && (
						<Text fontSize='14px'>{chat?.lastMessage != null && time.getHours() + ':' + time.getSeconds() }</Text>
					)}
				</HStack>
				<HStack w='100%' justifyContent='space-between' >
					<Text textColor="#909294" maxW="140px" overflow="hidden" textOverflow="ellipsis">{chat?.lastMessage.message || ''}</Text>
					{chat && chat.amountOfNewMessages > 0 && <Circle bg='green' size='20px' color='white' fontSize='14px'>{chat.amountOfNewMessages}</Circle>}
				</HStack>
			</VStack>
		</Button>

	)
}

export default ContactUi