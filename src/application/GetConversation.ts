import Conversation from "../domain/entity/Conversation";
import ConversationRepository from "../domain/repository/ConversationRepository";

export default class GetConversation {
    constructor(readonly conversationRepository: ConversationRepository){}

    async execute(userId: string): Promise<Conversation[]> {
        const conversation = await this.conversationRepository.get(userId);
        return conversation;
    }
}