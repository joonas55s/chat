import React from 'react'
import { Input, VStack, Flex, Button, FormControl, FormLabel, Heading, Divider, useToast, Text } from '@chakra-ui/react'
import SignInUseCase from '@aplication/usecase/sign-in/sign-in'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { useAuth } from '@main/context/auth-context'

interface ISingIn {
    signInUseCase: SignInUseCase
}

const userSchema = object().shape({
	email: string().email('E-mail inválido').required('Campo obrigatório'),
	password: string().min(6, 'Minímo de 6 letras').required('Campo obrigatório'),
})

const SingIn: React.FC<ISingIn> = ({ signInUseCase }) => {
	const { authenticate } = useAuth()
	const toast = useToast()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: userSchema,
		onSubmit: async (values) => {
			const result = await signInUseCase.handle(values)
			if (result.isLeft()) {
				toast({
					title: 'Erro',
					description: result.value.message,
					position: 'top-right',
					status: 'error',
					duration: 2000,
					isClosable: true,
				})
				return
			}
			authenticate(true)
		},
	})


	return (
		<VStack w={'50%'} spacing={4} justifyContent='center' alignItems={'center'} p='10'>
			<Flex minW='350' flexDir={'column'} justifyContent={'center'} alignItems='center'>
				<VStack spacing={4} w='100%' marginBottom={5}>
					<Heading variant={'h1'}>
                        BEM VINDO
					</Heading>
					<Divider />
					<Heading variant={'h2'}>
                        Entrar
					</Heading>
				</VStack>
				<form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
					<VStack spacing='6' w='100%'>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input name='email' placeholder="Email" onChange={formik.handleChange} />
							{formik.errors.email ? <Text variant={'error'}>{formik.errors.email}</Text> : null}
						</FormControl>
						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input name='password' type='password' placeholder="Password" onChange={formik.handleChange} />
							{formik.errors.password ? <Text variant={'error'}>{formik.errors.password}</Text> : null}
						</FormControl>
						<Button type='submit' variant={'default'} w='100%'>Login</Button>
					</VStack>
				</form>
			</Flex>
		</VStack>
	)
}

export default SingIn