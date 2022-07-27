import Conversation from "../domain/entity/Conversation";
import ConversationRepository from "../domain/repository/ConversationRepository";

export default class FindConversation {
    constructor(readonly conversationRepository: ConversationRepository){}

    async execute(users: Array<string>): Promise<Conversation[]> {
        const conversation = await this.conversationRepository.find(users);
        return conversation;
    }
}