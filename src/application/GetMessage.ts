import Message from "../domain/entity/Message";
import MessageRepository from "../domain/repository/MessageRepository";


export default class GetMessage {
    constructor(readonly messageRepository: MessageRepository){}

    async execute(conversationId: string): Promise<Message[]> {
        const message = await this.messageRepository.get(conversationId);
        return message;
    }
}