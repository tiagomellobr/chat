import Message from "../domain/entity/Message";
import MessageRepository from "../domain/repository/MessageRepository";

export default class CreateMessage {
    constructor(readonly messageRepository: MessageRepository){}

    async execute(input: Input): Promise<Message> {
        const message = new Message(input.conversationId, input.senderId, input.text, new Date());
        await this.messageRepository.save(message);
        return message;
    }
}

type Input = {
    conversationId: string,
    senderId: string,
    text: string,
}