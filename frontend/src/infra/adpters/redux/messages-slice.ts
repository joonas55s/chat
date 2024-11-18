import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MessagesCache{
    username:string
    messages:Message[]
	lastMessage: Message
	amountOfNewMessages:number
}

interface Message {
	id:string
    me?:boolean
    message:string,
	sendAt:number
}

interface MessagesCacheState {
    chat:MessagesCache[]
}

const initialState:MessagesCacheState = {
	chat:[]
}
interface inputMessage {
	id:string
    username:string
    me?:boolean
    message:any,
	sendAt: number
}
export const MessagesCacheSlice= createSlice({
	name:'messagesCache',
	initialState,
	reducers:{
		addMessage:(state,action:PayloadAction<inputMessage>)=>{
			const {username,message,me,sendAt,id} = action.payload
			const exist = state.chat.find(e=>e.username === username)
			const existisMessage = exist?.messages.find(e=>e.id === id)
			if (existisMessage) return
			if (!exist){
				state.chat.push({
					messages:[{
						message,
						me,
						sendAt,
						id
					}],
					username:username,
					lastMessage:{
						message,
						sendAt,
						me,
						id
					},
					amountOfNewMessages: 1
				})
				return
			}
			exist.messages.push({
				message,
				me,
				sendAt,
				id
			})
			exist.lastMessage = {
				message,
				sendAt,
				me,
				id
			}
			exist.amountOfNewMessages += 1
		},
		resetAmountOfNewMessages:(state,action:PayloadAction<{username:string}>)=>{
			const {username} = action.payload
			const chat =state.chat.find(x=>x.username === username)
			if (chat) chat.amountOfNewMessages = 0
		}
	}
})

export default MessagesCacheSlice.reducer
export const {addMessage,resetAmountOfNewMessages} = MessagesCacheSlice.actions
