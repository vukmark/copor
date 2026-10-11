export interface GetOtherParticipantsInChatRepo {
	load(userId: string, chatId: string): Promise<string[]>
}
