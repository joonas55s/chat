import Messenger from "src/domain/messenger";

export default class FakeMessager implements Messenger{

    async deliver(recipient: string, message: string): Promise<void> {
        
    }  
    async collect(callback): Promise<void> {

    } 
}