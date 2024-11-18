import React from 'react'
import Exit from '@aplication/usecase/exit/exit'
import SideMenu from '@presentation/pages/chat/components/side-menu'
import SessionStorageAdpter from '@infra/SessionStorageAdpter'

const MakeSideMenu: React.FC = () => {
	const exit = new Exit(new SessionStorageAdpter())
	return <SideMenu exit={exit}/>
}

export default MakeSideMenu