import { Stack, Text, HStack, CardBody, Image, Card, Link } from '@chakra-ui/react'
import React from 'react'

interface Message {
    me?: boolean
	message:any
	sendAt:number
}
const Message: React.FC<Message> = ({ me = true,message,sendAt }) => {
	const time = new Date(sendAt)
	function isUrl(value:string) {
		try {
			new URL(value)
			return true
			
		} catch (err) {
			return false
		}
	}
	return (
		<HStack p='2' minW='100%' justifyContent={me ? 'flex-end' : 'flex-start'}>
			<Card maxW='sm' height='auto' boxShadow='md' >
				<CardBody padding={2} margin={0} minW={'60px'}>
					{/* <Image
						src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
						alt='Green double couch with wooden legs'
						borderRadius='lg'
					/> */}
					<Stack mt='a' spacing='0'>
						{ isUrl(message) ?
							<Link href={message} isExternal color={'blue.400'}>
								{message}
							</Link> :
							<Text padding={0} margin={0} >
								{message}
							</Text>
						}
						<HStack justifyContent={'flex-end'} padding={0} margin={0}>
							<Text fontSize={12} color='#8A8C8E'>{time && time.getHours() + ':' + time.getSeconds() }</Text>
						</HStack>
					</Stack>
				</CardBody>
			</Card>
		</HStack>

	)
}

export default Message