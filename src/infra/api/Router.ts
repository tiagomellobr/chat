import CreateConversation from "../../application/CreateConversation";
import GetAllConversation from "../../application/GetAllConversation";
import GetConversation from "../../application/GetConversation";
import ConversationRepository from "../../domain/repository/ConversationRepository";
import HttpServer from "./HttpServer";


export default class Router {
    constructor(readonly httpServer: HttpServer, readonly conversationRepository: ConversationRepository) {}

    async init () {
        
        this.httpServer.on("get", "/", async (params: any, body: any) => {
            const getAllConversation = new GetAllConversation(this.conversationRepository);
            const conversations = await getAllConversation.execute();
            
            let statusCode = 200;
            if(conversations.length === 0) {
                statusCode = 204
            }

            return { output: conversations, statusCode };
        });

        this.httpServer.on("get", "/:userId", async (params: any, body: any) => {
            const getConversation = new GetConversation(this.conversationRepository);
            const conversations = await getConversation.execute(params.userId);
            const output = conversations;
            
            let statusCode = 200;
            if(conversations.length === 0) {
                statusCode = 204
            }
            
            return { output, statusCode };
        });

        this.httpServer.on("post", "/", async (params: any, body: any) => {
            const createConversation = new CreateConversation(this.conversationRepository);
            const output = await createConversation.execute(body);
            return { output, statusCode: 200 };
        });
    }
}