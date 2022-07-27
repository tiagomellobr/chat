import CreateConversation from "../../application/CreateConversation";
import CreateMessage from "../../application/CreateMessage";
import FindConversation from "../../application/FindConversation";
import GetAllConversation from "../../application/GetAllConversation";
import GetConversation from "../../application/GetConversation";
import GetMessage from "../../application/GetMessage";
import ConversationRepository from "../../domain/repository/ConversationRepository";
import MessageRepository from "../../domain/repository/MessageRepository";
import HttpServer from "./HttpServer";


export default class Router {
    constructor(readonly httpServer: HttpServer, readonly conversationRepository: ConversationRepository, readonly messageRepository: MessageRepository) { }

    async init() {

        this.httpServer.on("get", "/", async (params: any, body: any) => {
            const getAllConversation = new GetAllConversation(this.conversationRepository);
            const conversations = await getAllConversation.execute();

            let statusCode = 200;
            if (conversations.length === 0) {
                statusCode = 204
            }

            return { output: conversations, statusCode };
        });

        this.httpServer.on("get", "/:userId", async (params: any, body: any) => {
            const getConversation = new GetConversation(this.conversationRepository);
            const conversations = await getConversation.execute(params.userId);
            const output = conversations;

            let statusCode = 200;
            if (conversations.length === 0) {
                statusCode = 204
            }

            return { output, statusCode };
        });

        this.httpServer.on("get", "/:firstUserId/:secondUserId", async (params: any, body: any) => {
            const findConversation = new FindConversation(this.conversationRepository);
            const conversations = await findConversation.execute([params.firstUserId, params.secondUserId]);
            const output = conversations;

            let statusCode = 200;
            if (conversations.length === 0) {
                statusCode = 204
            }

            return { output, statusCode };
        });

        this.httpServer.on("post", "/", async (params: any, body: any) => {
            const createConversation = new CreateConversation(this.conversationRepository);
            const output = await createConversation.execute(body);
            return { output, statusCode: 200 };
        });

        this.httpServer.on("get", "/messages/:conversationId", async (params: any, body: any) => {
            const getMessage = new GetMessage(this.messageRepository);
            const messages = await getMessage.execute(params.conversationId);
            const output = messages;

            let statusCode = 200;
            if (messages.length === 0) {
                statusCode = 204
            }

            return { output, statusCode };
        });

        this.httpServer.on("post", "/messages", async (params: any, body: any) => {
            const createmessage = new CreateMessage(this.messageRepository);
            const output = await createmessage.execute(body);
            return { output, statusCode: 200 };
        });
    }
}