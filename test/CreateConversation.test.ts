import CreateConversation from "../src/application/CreateConversation";
import ConversationMemoryRepository from "../src/infra/repository/ConversationMemoryRepository";

test("Must create a conversation", async () => {
    const input = {
        senderId: "1234",
        receiverId: "5678"
    }

    const conversationRepository = new ConversationMemoryRepository();
    const createConversation = new CreateConversation(conversationRepository);
    const conversation = await createConversation.execute(input);
    
    expect(conversation).toHaveProperty('members');
    expect(conversation.members).toContain('1234');
    expect(conversation.members).toContain('5678');

});