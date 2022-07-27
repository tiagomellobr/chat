export default class Message {
    constructor(readonly conversationId: string, readonly senderId: string, readonly text: string, readonly createdAt: Date){}
}