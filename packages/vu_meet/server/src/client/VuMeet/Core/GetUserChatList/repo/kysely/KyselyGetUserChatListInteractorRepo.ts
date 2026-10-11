import {GetUserChatListRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUserChatListRepo';
import {GetUserChatDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUserChatDTO';
import {sql} from 'kysely';
import {db} from '@copor/core/client/AppDataSource';
import {MessageContentFormatter} from '@copor/vu_meet/client/VuMeet/Core/Helper/MessageContentFormatter';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

interface RawChatData {
	chatId: string;
	createdAt: Date;
	chatName: string;
	lastMessageSentTime: Date;
	isPrivate: boolean;
	lastMessage: string;
	lastMessageType: string;
	lastMessageSentById: string;
	otherUserFirstName: string | null;
	otherUserLastName: string | null;
	pictureName: string | null;
	pictureExtension: string | null;
	numberOfUnseenMessages: number;
	isActive?: boolean;
	otherUserId: string | null;
}

export class KyselyGetUserChatListInteractorRepo implements GetUserChatListRepo {
	public async list(userId: string, prompt: string): Promise<GetUserChatDTO[]> {
		const likePattern = `%${prompt}%`;

		const rows = await db
			.selectFrom('chat as chats')
			.innerJoin('chatUserMap as currentUserMap', 'currentUserMap.chatId', 'chats.id')
			.leftJoin('chatUserMap as otherUserMap', (join) => join
				.onRef('otherUserMap.chatId', '=', 'chats.id')
				.on('otherUserMap.userId', '!=', userId))
			.leftJoin('user as otherUser', 'otherUser.id', 'otherUserMap.userId')
			.leftJoin('image as otherUserImage', 'otherUserImage.id', 'otherUser.profileImageId')
			.where('currentUserMap.userId', '=', userId)
			.where((eb) => eb.or([
				eb('chats.isPrivate', '=', false),
				eb('otherUser.isActive', '=', 1),
				eb('otherUser.id', 'is', null)
			]))
			.$if(prompt !== '', (qb) => qb.where((eb) => {
				const fullName = (alias: string) => sql<string>`CONCAT(
					COALESCE(${sql.ref(`${alias}.firstName`)}, ''), ' ',
					COALESCE(${sql.ref(`${alias}.lastName`)}, '')
				)`;

				return eb.or([
					eb('chats.name', 'like', likePattern),
					eb(fullName('otherUser'), 'like', likePattern)
				]);
			}))
			.select([
				'chats.id as chatId',
				'chats.name as chatName',
				'chats.isPrivate',
				'chats.lastMessageSentTime as lastMessageSentTime',
				'chats.lastMessage as lastMessage',
				'chats.lastMessageType as lastMessageType',
				'chats.lastMessageSentBy as lastMessageSentById'
			])
			.select((eb) => [
				eb.fn.max('otherUser.firstName').as('otherUserFirstName'),
				eb.fn.max('otherUser.lastName').as('otherUserLastName'),
				eb.fn.max('otherUserImage.name').as('pictureName'),
				eb.fn.max('otherUserImage.extension').as('pictureExtension'),
				eb.fn.max('otherUser.id').as('otherUserId'),
				eb.fn.max('otherUser.isActive').as('isActive')
			])
			.select((eb) => eb
				.selectFrom('message as pm')
				.leftJoin('messageSeen as ms', (join) => join
					.onRef('ms.messageId', '=', 'pm.id')
					.on('ms.userId', '=', userId))
				.whereRef('pm.chatId', '=', 'chats.id')
				.where('pm.senderId', '!=', userId)
				.where('ms.messageId', 'is', null)
				.select((innerEb) => innerEb.fn.count('pm.id').as('unseenCount'))
				.as('numberOfUnseenMessages'))
			.groupBy(['chats.id', 'chats.lastMessageSentTime', 'chats.lastMessageSentBy'])
			.orderBy('chats.lastMessageSentTime', 'desc')
			.execute();

		const response = this.prepareDataForResponse(rows as unknown as RawChatData[], userId);

		return Promise.resolve(response);
	}

	private prepareDataForResponse(rawData: RawChatData[], actorId: string): GetUserChatDTO[] {
		return rawData.map((row) => {
			const firstName = row.otherUserFirstName ?? '';
			const lastName = row.otherUserLastName ?? '';
			const nameOfUser = `${firstName} ${lastName}`.trim();

			const formattedLastMessage = MessageContentFormatter.formatContent({
				senderId: row.lastMessageSentById,
				actorId: actorId,
				content: row.lastMessage,
				type: row.lastMessageType as MessageContentType
			});

			const chatDto: GetUserChatDTO = {
				id: row.chatId,
				isPrivate: row.isPrivate,
				name: row.isPrivate ? nameOfUser : row.chatName,
				pictureName: row.isPrivate ? row.pictureName ?? undefined : undefined,
				pictureExtension: row.isPrivate ? row.pictureExtension ?? undefined : undefined,
				otherUserId: row.isPrivate ? row.otherUserId ?? undefined : undefined,
				lastMessage: formattedLastMessage,
				createdAt: row.lastMessageSentTime,
				numberOfUnseenMessages: row.numberOfUnseenMessages,
				isActive: Boolean(row.isActive) ?? false
			};

			return chatDto;
		});
	}
}
