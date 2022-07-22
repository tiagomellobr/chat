import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import ConversationMemoryRepository from "./infra/repository/ConversationMemoryRepository";
import MessageMemoryRepository from "./infra/repository/MessageMemoryRepository";

const conversationRepository = new ConversationMemoryRepository();
const messageRepository = new MessageMemoryRepository();

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, conversationRepository, messageRepository);
router.init();
httpServer.listen(3000);