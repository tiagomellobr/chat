import Conversation from "../domain/entity/Conversation";
import ConversationRepository from "../domain/repository/ConversationRepository";

export default class GetAllConversation {
    constructor(readonly conversationRepository: ConversationRepository){}

    async execute(): Promise<Conversation[]> {
        const conversations = await this.conversationRepository.all();
        return conversations;
    }
}