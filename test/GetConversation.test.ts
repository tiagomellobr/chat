import CreateConversation from "../src/application/CreateConversation";
import GetAllConversation from "../src/application/GetAllConversation";
import GetConversation from "../src/application/GetConversation";
import ConversationMemoryRepository from "../src/infra/repository/ConversationMemoryRepository";

test("Must get a conversation", async () => {
    
    const conversationRepository = new ConversationMemoryRepository();
    const createConversation = new CreateConversation(conversationRepository);
    await createConversation.execute({senderId: "1234",receiverId: "5678"});
    await createConversation.execute({senderId: "5678",receiverId: "9999"});

    const getAllConversation = new GetAllConversation(conversationRepository);
    const conversations = await getAllConversation.execute();

    const getConversation = new GetConversation(conversationRepository);
    const conversation = await getConversation.execute("9999");

    expect(conversations[0]).toEqual({members:["1234", "5678"]});
    expect(conversations[1]).toEqual({members:["5678", "9999"]});

    expect(conversation).toEqual([{members:["5678", "9999"]}]);
    
});