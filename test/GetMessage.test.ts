import CreateMessage from "../src/application/CreateMessage";
import GetMessage from "../src/application/GetMessage";
import MessageMemoryRepository from "../src/infra/repository/MessageMemoryRepository";

test("Must get a message", async () => {
    
    const messageRepository = new MessageMemoryRepository();
    const createMessage = new CreateMessage(messageRepository);
    
    await createMessage.execute({
        conversationId: "1234",
        senderId: "1234",
        text: "text 1"
    });

    await createMessage.execute({
        conversationId: "1234",
        senderId: "1234",
        text: "text 2"
    });

    const getMessage = new GetMessage(messageRepository);
    const message = await getMessage.execute("1234");

    expect(message[0].conversationId).toEqual("1234");
    expect(message[0].senderId).toEqual("1234");
    expect(message[0].text).toEqual("text 1");
    
});