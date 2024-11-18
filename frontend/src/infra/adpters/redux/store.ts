import { configureStore } from '@reduxjs/toolkit'
import {MessagesCacheSlice} from './messages-slice'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { ContactsSlice } from './contacts-slice'

export const store = configureStore({
	reducer:{
		messagesCache:MessagesCacheSlice.reducer,
		contacts:ContactsSlice.reducer
	}
})

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector