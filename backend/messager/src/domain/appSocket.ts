import { Server } from 'http'

export interface AppSocket {
    start(server:Server):any
}