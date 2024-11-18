import { HStack, VStack, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import MakeSingIn from '@main/factories/sing-in-factory'
import MakeSingUp from '@main/factories/sing-up-factory'
import backgroundImage from '@public/assets/unsplash-2.jpg'

const Sing: React.FC = () => {
	const [toogle, settoogle] = useState<boolean>(true)

	return (
		<HStack bg='#FAFCFF' w='100%' h='100%'>
			{toogle ? <MakeSingIn/> : <MakeSingUp />}
			<VStack w={'50%'} h='100%' spacing={4} justifyContent='center' alignItems={'center'} p='0'
				backgroundImage={`url(${backgroundImage})`}
				backgroundSize='cover'
				backgroundPosition={'center'}
			>
				<Button onClick={() => settoogle(!toogle)}>{toogle ? 'Cadastrar' : 'Entrar'}</Button>
			</VStack>
		</HStack>
	)
}

export default Sing