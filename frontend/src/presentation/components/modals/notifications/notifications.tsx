import { UseCase } from '@aplication/usecase/use-case'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Divider, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import { AppStorage } from '@domain/appStorage'
import { useSideMenu } from '@main/context/side-menu-context'
import React, { useCallback, useEffect, useState } from 'react'
import { invite } from '@domain/entities/invite'
import MakeInviteItem from '@main/factories/invite-item-factory'

interface INotifications {
    listInvites:UseCase
    appStorage: AppStorage
}

const Notifications: React.FC <INotifications>= ({listInvites,appStorage}) => {
	const { isOpen,onOpen, onClose } = useDisclosure()
	const {isopenNotifications,openNotifications,setNotifications} = useSideMenu()
	const [invites,setInvites] = useState<invite[]>([])

	const closeModal = () => {
		openNotifications(false)
		onClose()
	}

	useEffect(() => {
		if (isopenNotifications) {
			findInvites()
			onOpen()
		}
	}, [isopenNotifications])
    
	const findInvites = useCallback(async () => {
		const ownerUsername = appStorage.getUser().username
		const invites = await listInvites.handle(ownerUsername)
		if (invites.isRight()) setInvites(invites.value)
		setNotifications(invites.value.length)
	}, [])

	useEffect(()=>{
		const interval = setInterval(async() => {
			await findInvites()		
		}, 60000)
		return () => clearInterval(interval)
	},[])

	return (
		<Modal isCentered isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			<ModalContent>
				<ModalHeader>Notificações</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack>
						<Divider />
						<VStack h={400} w={'100%'} spacing="4" p="5" overflowY="auto">
							{invites.map(e=> <MakeInviteItem key={e.requester_username} username={e.requester_username} name={e.requester_name} />)}  
						</VStack>
					</VStack>
				</ModalBody>
				<ModalFooter>
					<Button onClick={closeModal}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default Notifications