export interface MarkChatMessagesSeenRepo {
	markChatMessagesRead(chatId: string, userId: string): Promise<void>;
}
