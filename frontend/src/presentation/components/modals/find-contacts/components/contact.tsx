import React from 'react'
import { Heading, HStack, VStack, Image, Button } from '@chakra-ui/react'
import { IoMdPersonAdd, IoMdPeople } from 'react-icons/io'
import {MdPendingActions} from 'react-icons/md'

interface IContactButton {
    name: string,
    username: string,
    email: string,
	isAContact: boolean,
    invited:boolean,
    invitePending?: boolean
	action: Function
}

const ContactButton: React.FC<IContactButton> = ({ email, name, username, isAContact , action, invitePending}) => {
	function renderActionButton(){
		if (isAContact){
			return <Button disabled={true}>
				<IoMdPeople size={25} color="#008000"/>
			</Button>
		}	
		if (invitePending){
			return <Button disabled={true}>
				<MdPendingActions size={25} color="#008000"/>
			</Button>
		}
		return <Button onClick={()=>action()}>
			<IoMdPersonAdd size={25} color="#008000"/>
		</Button>
	}

	return (
		<HStack bg='white' padding={2} borderRadius={11} flexDir={'row'} w='100%'>
			<Image
				borderRadius='full'
				boxSize='60px'
				src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
			</Image>
			<HStack w='100%' alignItems='center' justifyContent='flex-start'>
				<VStack w='100%' justifyContent='space-between' alignItems='flex-start'>
					<Heading fontSize='5xs' fontWeight={'medium'}>{name}</Heading >
					<Heading fontSize='sm' fontWeight={'light'}>{username}</Heading >
					<Heading fontSize='sm' fontWeight={'light'}>{email}</Heading >
				</VStack>
				{renderActionButton()}
			</HStack>
		</HStack>
	)
}

export default ContactButton