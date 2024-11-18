import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from '@presentation/pages/chat'
import Sing from '@presentation/pages/sing-in/sing'
import { useAuth } from '../context/auth-context'

const Router: React.FC = () => {
	const { authenticated } = useAuth()
	return (
		<BrowserRouter>
			<Routes>
				{!authenticated && <Route path="/" element={<Sing />} />}
				{authenticated && <Route path="/" element={<Chat />} />}
			</Routes>
		</BrowserRouter>
	)
}

export default Router