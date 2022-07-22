import Conversation from "../../domain/entity/Conversation";
import ConversationRepository from "../../domain/repository/ConversationRepository";

export default class ConversationMemoryRepository implements ConversationRepository {
    conversations: Conversation[];

    constructor() {
        this.conversations = [];
    }
    
    async save(conversation: Conversation): Promise<void> {
        this.conversations = [...this.conversations, conversation];
    }

    async get(userId: string): Promise<any> {
        const conversations = this.conversations.filter((c) => c.members.includes(userId));
        return conversations;
    }

    async all(): Promise<Conversation[]> {
        return this.conversations;
    }

}