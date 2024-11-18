import { userContact } from '@domain/entities/userContact'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface contactsState {
    contacts:userContact[]
}

const initialState:contactsState = {
	contacts:[]
}
interface inputMessage {
	email: string,
	name: string,
	username: string,
	id: string
}
export const ContactsSlice= createSlice({
	name:'contacts',
	initialState,
	reducers:{
		addContact:(state,action:PayloadAction<inputMessage>)=>{
			const {email,name,username,id} = action.payload
			const exist = state.contacts.find(e=>e.username === username)
			if (!exist){
				state.contacts.push({email,id,name,username})
				return
			}
		}
	}
})

export default ContactsSlice.reducer
export const {addContact} = ContactsSlice.actions
