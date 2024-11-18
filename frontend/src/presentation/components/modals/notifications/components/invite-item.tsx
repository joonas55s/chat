import React, { useState } from 'react'
import { Heading, HStack, VStack, Image, Button, useToast } from '@chakra-ui/react'
import { BsCheckCircleFill } from 'react-icons/bs'
import {FcCancel} from 'react-icons/fc'
import { UseCase } from '@aplication/usecase/use-case'
import { AppStorage } from '@domain/appStorage'
import { useContacts } from '@main/context/contacts-context'


interface IInviteItem {
    name:string
    username:string
	acceptInvite:UseCase
	appStorage: AppStorage
}

const InviteItem: React.FC<IInviteItem> = ({ name, username, acceptInvite, appStorage }) => {
	const [isVisible,setIsVisible] = useState(true)
	const {refreshContacts} = useContacts()
	const toast = useToast()
	const accept = async() =>{
		const requester_username = appStorage.getUser().username
		const result = await acceptInvite.handle({requester_username:username,targuet_username:requester_username})
		if (result.isLeft()){
			toast({
				title: 'Erro',
				description: 'Não foi possivel confirmar o convite, por favor tente novamente mais tarde',
				position: 'top-right',
				status: 'error',
				duration: 2000,
				isClosable: true,
			})
			return
		}
		toast({
			title: 'Sucesso',
			description: 'Convite confirmado!',
			position: 'top-right',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
		refreshContacts()
		setIsVisible(false)
	}
	return (
		<HStack bg='white' padding={2} borderRadius={11} flexDir={'row'} w='100%' hidden={!isVisible}>
			<Image
				borderRadius='full'
				boxSize='60px'
				src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
			</Image>
			<HStack w='100%' alignItems='center' justifyContent='flex-start'>
				<VStack w='100%' justifyContent='space-between' alignItems='flex-start'>
					<Heading fontSize='5xs' fontWeight={'medium'}>{name} ({username})</Heading >
					<Heading fontSize='sm' fontWeight={'light'}>Convite de amizade</Heading >
				</VStack>
			</HStack>
			<Button disabled={true} onClick={accept}>
				<BsCheckCircleFill size={30} color="#008000"/>
			</Button>
			<Button disabled={true}>
				<FcCancel size={30} color="#008000"/>
			</Button>
		</HStack>
	)
}

export default InviteItem