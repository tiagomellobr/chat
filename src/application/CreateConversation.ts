import Conversation from "../domain/entity/Conversation";
import ConversationRepository from "../domain/repository/ConversationRepository";

export default class CreateConversation {
    constructor(readonly conversationRepository: ConversationRepository){}

    async execute(input: Input): Promise<Conversation> {
        const conversation = new Conversation([input.senderId, input.receiverId]);
        await this.conversationRepository.save(conversation);
        return conversation;
    }
}

type Input = {
    senderId: string,
    receiverId: string,
}