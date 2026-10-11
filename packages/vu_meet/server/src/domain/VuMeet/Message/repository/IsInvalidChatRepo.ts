export interface IsInvalidChatRepo {
	isInvalidChat(id: string | undefined): Promise<boolean>;
}
