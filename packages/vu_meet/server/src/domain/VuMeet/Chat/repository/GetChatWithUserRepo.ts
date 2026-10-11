export interface GetChatWithUserRepo {
	load(actorId: string, users: string[], uniqueId: string, groupName: string): Promise<string>;
}
