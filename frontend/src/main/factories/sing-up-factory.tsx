import React from 'react'
import SingUpUseCase from '@aplication/usecase/sign-up/sign-up'
import SignGateway from '@infra/gateways/sign/sign-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import SignUp from '@presentation/pages/sing-in/components/sing-up'
import { environment } from '../config/config'
import SignInUseCase from '@aplication/usecase/sign-in/sign-in'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'

const MakeSingUp: React.FC = () => {
	const axiosAdapter = new AxiosAdapter(environment.API_AUTH)
	const signGateway = new SignGateway(axiosAdapter)
	const singUpUseCase = new SingUpUseCase(signGateway)
	const appStorage = new SessionStorageAdpter()
	const signInUseCase = new SignInUseCase(signGateway,appStorage)
	return <SignUp signUpUseCase={singUpUseCase} signInUseCase={signInUseCase} />
}

export default MakeSingUp