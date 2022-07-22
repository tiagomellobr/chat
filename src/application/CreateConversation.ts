import Conversation from "../domain/entity/Conversation";
import ConversationRepository from "../domain/repository/ConversationRepository";
import { v4 as uuidv4 } from 'uuid';

export default class CreateConversation {
    constructor(readonly conversationRepository: ConversationRepository){}

    async execute(input: Input): Promise<Conversation> {
        const id = uuidv4();
        const conversation = new Conversation(id, [input.senderId, input.receiverId]);
        await this.conversationRepository.save(conversation);
        return conversation;
    }
}

type Input = {
    senderId: string,
    receiverId: string,
}