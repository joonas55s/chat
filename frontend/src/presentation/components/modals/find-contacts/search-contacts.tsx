import React, { useCallback, useEffect, useState } from 'react'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	ModalOverlay,
	Input,
	Divider,
	VStack,
	useToast,
} from '@chakra-ui/react'
import ContactButton from './components/contact'
import Contact from '@domain/entities/contact'
import { useSearchContacts } from '@main/context/search-contacts-context'
import { UseCase } from '@aplication/usecase/use-case'
import { AppStorage } from '@domain/appStorage'

interface ISearchContacts {
  findContactsUsecase: UseCase
  inviteContactUsecase: UseCase
  appStorage: AppStorage
}

const SearchContacts: React.FC<ISearchContacts> = ({ findContactsUsecase, inviteContactUsecase, appStorage }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [users, setUsers] = useState<Contact[]>([])
	const { visible, toogle } = useSearchContacts()
	const ownerUsername = appStorage.getUser().username
	const toast = useToast()

	const closeModal = () => {
		toogle(false)
		onClose()
	}
	useEffect(() => {
		if (visible) onOpen()
		setUsers([])
	}, [visible])

	const findUsers = useCallback(async (identifier: string) => {
		const usersList = await findContactsUsecase.handle({
			identifier,
			ownerUsername,
		})
		if (usersList.isRight()) setUsers(usersList.value)
	}, [ownerUsername])

	const invite = useCallback(async (identifier: string) => {
		const input = {
			requester_username: ownerUsername,
			targuet_username: identifier,
		}
		const result = await inviteContactUsecase.handle(input)
		if (result.isLeft()){
			toast({
				title: 'Erro',
				description: result.value.message,
				position: 'top-right',
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
			return
		}
		toast({
			title: 'Sucesso',
			description: 'Convite enviado.',
			position: 'top-right',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}, [ownerUsername,toast])

	return (
		<Modal isCentered isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			<ModalContent>
				<ModalHeader>Buscar contatos</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack>
						<Input
							variant="filled"
							placeholder="Buscar..."
							onKeyUp={(value) => findUsers(value.currentTarget.value)}
						/>
						<Divider />
						<VStack h={400} w={'100%'} spacing="4" p="5" overflowY="auto">
							{users.map((user) => (
								<ContactButton
									name={user.name}
									email={user.email}
									username={user.username}
									key={user.id}
									invited={user.invited}
									isAContact={user.isAContact}
									invitePending={user.invitePending}
									action={()=>invite(user.username)}
								/>
							))}
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

export default SearchContacts
