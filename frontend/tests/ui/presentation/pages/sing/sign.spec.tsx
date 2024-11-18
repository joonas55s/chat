import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Sing from '@presentation/pages/sing-in/sing'

describe('Sing',()=>{
	test('De rederizar a pagina de Sing no modo de login', () => {
		const {getByText} = render(<Sing />)
		expect(getByText('BEM VINDO')).toBeInTheDocument()
		expect(getByText('Entrar')).toBeInTheDocument()
		expect(getByText('Email')).toBeInTheDocument()
		expect(getByText('Password')).toBeInTheDocument()
		expect(getByText('Login')).toBeInTheDocument()
		expect(getByText('Cadastrar')).toBeInTheDocument()
	})
  
	test('De rederizar a pagina de Sing no modo de cadastro', () => {
		const {getByText} = render(<Sing />)
		const button = screen.getByText('Cadastrar')
		fireEvent.click(button)
		expect(getByText('BEM VINDO')).toBeInTheDocument()
		expect(getByText('Nome')).toBeInTheDocument()
		expect(getByText('User name')).toBeInTheDocument()
		expect(getByText('E-mail')).toBeInTheDocument()
		expect(getByText('Senha')).toBeInTheDocument()
  
	})
  
	test('De rederizar a pagina de Sing no modo de cadastro e voltar para o modo de login se o botão entrar for clicado', () => {
		const {getByText} = render(<Sing />)
		const buttonCad = screen.getByText('Cadastrar')
		fireEvent.click(buttonCad)
		const buttonEntrar = screen.getByText('Entrar')
		fireEvent.click(buttonEntrar)
		expect(getByText('BEM VINDO')).toBeInTheDocument()
		expect(getByText('Entrar')).toBeInTheDocument()
		expect(getByText('Email')).toBeInTheDocument()
		expect(getByText('Password')).toBeInTheDocument()
		expect(getByText('Login')).toBeInTheDocument()
		expect(getByText('Cadastrar')).toBeInTheDocument()
	})
})
