import {db} from '@copor/core/client/AppDataSource';
import {SearchAllMessagesRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/SearchAllMessagesRepo';
import {SearchAllMessagesDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/SearchAllMessagesDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';

interface RawMessageData {
	chatId: string;
	chatName: string | null;
	chatPicture: string | null;
	isPrivate: boolean;
	otherUserId: string | null;
	messageId: string;
	messageContent: string;
	createdAt: Date;
	senderId: string;
}

export class KyselyGetSearchAllMessagesListInteractorRepo implements SearchAllMessagesRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	public async search(
		prompt: string,
		actorId: string
	): Promise<SearchAllMessagesDTO[]> {
		const formattedPrompt = `%${prompt.trim().replace(/\s+/g, '%')}%`;
		const rows = await this.getMessagesQuery(formattedPrompt, actorId);

		const response: SearchAllMessagesDTO[] = [];

		for (const row of rows) {
			const senderData = await this.getUserData(row.senderId);
			const otherUserData = row.isPrivate && row.otherUserId
				? await this.getUserData(row.otherUserId)
				: null;

			response.push({
				chatId: row.chatId,
				chatName: row.isPrivate
					? `${otherUserData?.userFirstName ?? ''} ${otherUserData?.userLastName ?? ''}`.trim()
					: (row.chatName ?? ''),
				chatPicture: row.isPrivate
					? (otherUserData?.profileImagePath ?? (this.appContext.envVariables!.DEFAULT_USER_PROFILE_IMAGE ?? 'default'))
					: (row.chatPicture ?? (this.appContext.envVariables!.DEFAULT_GROUP_CHAT_IMAGE ?? 'default')),
				isPrivate: row.isPrivate,
				messageId: row.messageId,
				senderId: row.senderId,
				senderName: `${senderData.userFirstName} ${senderData.userLastName}`,
				senderPicture: senderData.profileImagePath ?? (this.appContext.envVariables!.DEFAULT_USER_PROFILE_IMAGE ?? 'default'),
				messageContent: row.messageContent,
				createdAt: row.createdAt
			});
		}

		response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

		return response;
	}

	// Every live message (whether the chat is a 2-person "private" chat or an
	// N-person "group" chat) lives in chat/chat_user_map — both are
	// the same chat entity, distinguished only by the isPrivate flag.
	private getMessagesQuery(
		prompt: string,
		actorId: string) {
		return db
			.selectFrom('message as pm')
			.innerJoin('chat as chat', 'chat.id', 'pm.chatId')
			.innerJoin('chatUserMap as myMap', (join) => join
				.onRef('myMap.chatId', '=', 'chat.id')
				.on('myMap.userId', '=', actorId))
			.leftJoin('chatUserMap as otherMap', (join) => join
				.onRef('otherMap.chatId', '=', 'chat.id')
				.on('otherMap.userId', '!=', actorId))
			.select([
				'chat.id as chatId',
				'chat.name as chatName',
				'chat.picture as chatPicture',
				'chat.isPrivate',
				'otherMap.userId as otherUserId',
				'pm.id as messageId',
				'pm.content as messageContent',
				'pm.createdAt',
				'pm.senderId'
			])
			.where('pm.content', 'like', prompt)
			.execute() as Promise<RawMessageData[]>;
	}

	private async getUserData(userId: string) {
		const result = await db
			.selectFrom('user')
			.leftJoin('image', 'image.id', 'user.profileImageId')
			.select([
				'user.firstName as userFirstName',
				'user.lastName as userLastName',
				'image.path as profileImagePath'
			])
			.where('user.id', '=', userId)
			.executeTakeFirst();

		if (result) {
			return result;
		}
		throw new Error(`User data not found for userId: ${userId}`);
	}
}
