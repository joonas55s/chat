
import { HStack, Heading, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { IoCallSharp, IoVideocam } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { useContacts } from '@main/context/contacts-context'

interface HeaderCurrentChatController {
    showUser: Function;
}
const HeaderCurrentChat: React.FC <HeaderCurrentChatController> = ({showUser}) => {
	const {current} = useContacts()
	return (
		<HStack flexDir={'row'} w='100%' p='5' justifyContent='space-between'>
			<HStack>
				<Image
					borderRadius='full'
					boxSize='60px'
					src='https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_960_720.jpg'>
				</Image>
				<Heading fontSize='3xl'>{current?.name}</Heading >
			</HStack>
			<HStack>
				<Button borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
					<IoCallSharp size={25} color='#383838' />
				</Button>
				<Button borderRadius={'full'} w={'40px'} h={'40px'} p={0}>
					<IoVideocam size={25} color='#383838' />
				</Button>
				<Button borderRadius={'full'} w={'40px'} h={'40px'} p={0} onClick={()=>showUser()}>
					<IoMdSettings size={25} color='#383838' />
				</Button>
			</HStack>
		</HStack>
	)
}

export default HeaderCurrentChat