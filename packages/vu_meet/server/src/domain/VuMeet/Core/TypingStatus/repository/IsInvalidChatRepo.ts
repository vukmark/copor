export interface IsInvalidChatRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean>;
}
