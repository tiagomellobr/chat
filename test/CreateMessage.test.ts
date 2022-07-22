import CreateMessage from "../src/application/CreateMessage";
import MessageMemoryRepository from "../src/infra/repository/MessageMemoryRepository";

test("Must create a message", async () => {
    const input = {
        conversationId: "1234",
        senderId: "1234",
        text: "text"
    }

    const messageRepository = new MessageMemoryRepository();
    const createMessage = new CreateMessage(messageRepository);
    const message = await createMessage.execute(input);

    expect(message).toHaveProperty('conversationId');
    expect(message.senderId).toContain('1234');
    expect(message.text).toContain('text');

});