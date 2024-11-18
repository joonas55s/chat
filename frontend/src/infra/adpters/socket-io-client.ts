import { AppSocket } from '@domain/appSocket'
import { AppStorage } from '@domain/appStorage'
import { environment } from '@main/config/config'
import { Socket, io } from 'socket.io-client'

import {store} from '@infra/adpters/redux/store'
import { addMessage } from './redux/messages-slice'
import { v4 } from 'uuid'

export default class SocketIoClientAdpter implements AppSocket{
	
	private _socket:Socket | undefined
	private _isConnected = false

	constructor(private appStorage:AppStorage){
		
	}

	get socket(){
		return this._socket
	}

	async connect(){
		const {username} = this.appStorage.getUser()
		if (username){
			if (environment.API_MESSAGER === '') throw new Error('API_MESSAGER not be null')
			this._socket = await io(environment.API_MESSAGER,{
				query:{username:username},
				reconnection:true
			})

			this._socket.on('messages',(data)=>{
				const {message,senderUsername,id,send_at} = data
				store.dispatch(addMessage({username:senderUsername,message,me:false,sendAt: new Date(send_at).getTime(),id:v4()}))
			})
		}
		
	}


	disconect(){
		this._isConnected = false
		this._socket?.disconnect()
	}

	emit(eventname:string, body:any){
		console.log(eventname)
		this._socket?.emit(eventname,body)
	}

	async on(eventname:string,callback:(data:any)=>any){
		this._socket!.on(eventname,(data)=>{
			const {message,senderUsername,id} = data
			//addMessage({message,username: senderUsername})
		})
	}

	get isConnected(){
		return this._isConnected
	}
}