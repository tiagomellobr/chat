import CreateConversation from "../src/application/CreateConversation";
import FindConversation from "../src/application/FindConversation";
import GetAllConversation from "../src/application/GetAllConversation";
import ConversationMemoryRepository from "../src/infra/repository/ConversationMemoryRepository";

test("Must get a conversation", async () => {
    
    const conversationRepository = new ConversationMemoryRepository();
    const createConversation = new CreateConversation(conversationRepository);
    await createConversation.execute({senderId: "1234",receiverId: "5678"});
    await createConversation.execute({senderId: "5678",receiverId: "9999"});

    const getAllConversation = new GetAllConversation(conversationRepository);
    const conversations = await getAllConversation.execute();

    const findConversation = new FindConversation(conversationRepository);
    const conversation = await findConversation.execute(["5678", "9999"]);

    expect(conversations[0].members).toEqual(["1234", "5678"]);
    
    expect(conversation[0].members).toEqual(["5678", "9999"]);
    
});