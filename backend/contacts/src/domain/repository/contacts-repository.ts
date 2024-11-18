import Contacts from '../entities/contacts'

export interface ContactsRepository {
    find(ownerUsername: string): Promise<Contacts | undefined>
    add(ownerUsername: string, contactUsername: string): Promise<void>
}