import Message from "../entity/Message";


export default interface MessageRepository {
    save (message: Message): Promise<void>;
    get (conversationId: string): Promise<Message[]>;
}