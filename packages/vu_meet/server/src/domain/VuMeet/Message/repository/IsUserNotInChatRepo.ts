export interface IsUserNotInChatRepo {
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean>;
}
