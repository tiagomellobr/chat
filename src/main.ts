import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import ConversationMemoryRepository from "./infra/repository/ConversationMemoryRepository";

const conversationRepository = new ConversationMemoryRepository();

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, conversationRepository);
router.init();
httpServer.listen(3000);