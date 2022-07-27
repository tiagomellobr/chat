import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import ConversationMemoryRepository from "./infra/repository/ConversationMemoryRepository";
import MessageMemoryRepository from "./infra/repository/MessageMemoryRepository";
import dotenv from "dotenv";
import 'dotenv/config';

dotenv.config({ path: __dirname+'/.env' });

const conversationRepository = new ConversationMemoryRepository();
const messageRepository = new MessageMemoryRepository();

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, conversationRepository, messageRepository);
router.init();

const port = parseInt(process.env.APP_PORT || '8008');

httpServer.listen(port);