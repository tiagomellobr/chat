import Conversation from "../entity/Conversation";

export default interface ConversationRepository {
    save (conversation: Conversation): Promise<void>;
    get (userId: string): Promise<Conversation[]>;
    all (): Promise<Conversation[]>;
    find (users: Array<string>): Promise<Conversation[]>;
}