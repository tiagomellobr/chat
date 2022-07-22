import Message from "../../domain/entity/Message";
import MessageRepository from "../../domain/repository/MessageRepository";

export default class MessageMemoryRepository implements MessageRepository {
    messages: Message[];

    constructor() {
        this.messages = [];
    }
    
    async save(message: Message): Promise<void> {
        this.messages = [...this.messages, message];
    }

    async get(conversationId: string): Promise<any> {
        const messages = this.messages.filter((m) => m.conversationId === conversationId);
        return messages;
    }

}